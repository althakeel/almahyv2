'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Locale } from '@/lib/translations';
import { ensureDashboardAccessRequest, getPrimaryAdminEmail, normalizeEmail } from '@/lib/admin-access';

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (((params?.locale as string) || 'en') === 'ar' ? 'ar' : 'en') as Locale;
  const isArabic = locale === 'ar';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const primaryAdminEmail = getPrimaryAdminEmail();

  const content = {
    en: {
      title: 'Admin / Editor Login',
      subtitle: 'Only the primary admin can open the dashboard immediately. Other users must be approved by admin first.',
      email: 'Email Address',
      password: 'Password',
      forgot: 'Access is managed by admin invitation.',
      login: 'Login',
      register: 'Create Account',
      google: 'Sign in with Google',
      noAccount: 'Need access first?',
      inviteNote: primaryAdminEmail
        ? `Primary admin: ${primaryAdminEmail}`
        : 'Set NEXT_PUBLIC_PRIMARY_ADMIN_EMAIL to define the primary admin.',
      backHome: 'Back to Home',
      denied: 'Your account is waiting for admin approval before dashboard access is granted.',
      inviteOnly: 'Your account was created/sign-in completed, but admin approval is still required.',
      invalid: 'Please enter a valid email address and password.',
    },
    ar: {
      title: 'تسجيل دخول الإدارة / المحررين',
      subtitle: 'يمكن فقط للبريد الإداري الرئيسي فتح اللوحة مباشرة. أما بقية المستخدمين فيحتاجون إلى موافقة المدير أولاً.',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      forgot: 'تتم إدارة الوصول من خلال دعوة إدارية.',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      google: 'تسجيل الدخول عبر Google',
      noAccount: 'تحتاج إلى صلاحية أولاً؟',
      inviteNote: primaryAdminEmail
        ? `البريد الإداري الرئيسي: ${primaryAdminEmail}`
        : 'قم بتعيين NEXT_PUBLIC_PRIMARY_ADMIN_EMAIL لتحديد البريد الإداري الرئيسي.',
      backHome: 'العودة للرئيسية',
      denied: 'حسابك بانتظار موافقة المدير قبل منحك صلاحية دخول لوحة المدونة.',
      inviteOnly: 'تم إنشاء الحساب أو تسجيل الدخول، لكن ما زالت موافقة المدير مطلوبة.',
      invalid: 'يرجى إدخال بريد إلكتروني صالح وكلمة مرور.',
    },
  } as const;

  const t = content[isArabic ? 'ar' : 'en'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.email) {
        return;
      }

      const access = await ensureDashboardAccessRequest(user.email);
      if (access?.status === 'active') {
        router.push(`/${locale}/dashboard`);
        return;
      }

      setFeedback({ type: 'success', message: t.inviteOnly });
    });

    return () => unsubscribe();
  }, [locale, router, t.inviteOnly]);

  const validateInputs = () => {
    const normalizedEmail = normalizeEmail(email);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!isEmail || !password.trim()) {
      setFeedback({ type: 'error', message: t.invalid });
      return null;
    }

    return normalizedEmail;
  };

  const runAuthAction = async (mode: 'login' | 'register') => {
    const normalizedEmail = validateInputs();
    if (!normalizedEmail) {
      return;
    }

    try {
      setLoading(true);
      setFeedback(null);

      if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, normalizedEmail, password);
      }

      const access = await ensureDashboardAccessRequest(normalizedEmail);

      if (access?.status === 'active') {
        setFeedback({ type: 'success', message: isArabic ? 'تم تسجيل الدخول بنجاح.' : 'Logged in successfully.' });
        router.push(`/${locale}/dashboard`);
        return;
      }

      setFeedback({ type: 'success', message: t.inviteOnly });
    } catch (error: any) {
      const code = error?.code as string | undefined;
      let message = isArabic ? 'حدث خطأ غير متوقع.' : 'Unexpected error occurred.';

      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        message = isArabic ? 'بيانات الدخول غير صحيحة.' : 'Invalid login credentials.';
      } else if (code === 'auth/email-already-in-use') {
        message = isArabic ? 'البريد الإلكتروني مستخدم بالفعل.' : 'Email is already in use.';
      } else if (code === 'auth/weak-password') {
        message = isArabic ? 'كلمة المرور ضعيفة. استخدم 6 أحرف على الأقل.' : 'Weak password. Use at least 6 characters.';
      }

      setFeedback({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const runGoogleLogin = async () => {
    try {
      setLoading(true);
      setFeedback(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const signedInEmail = result.user.email ? normalizeEmail(result.user.email) : '';
      const access = signedInEmail ? await ensureDashboardAccessRequest(signedInEmail) : null;

      if (access?.status === 'active') {
        router.push(`/${locale}/dashboard`);
        return;
      }

      setFeedback({ type: 'success', message: t.inviteOnly });
    } catch {
      setFeedback({
        type: 'error',
        message: isArabic ? 'فشل تسجيل الدخول عبر Google.' : 'Google sign-in failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-24">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-amber-200/20 bg-white/[0.03] p-7 md:p-8 shadow-2xl backdrop-blur-sm" dir={isArabic ? 'rtl' : 'ltr'}>
        <h1 className="mb-3 text-center text-3xl font-bold text-white">{t.title}</h1>
        <p className="mb-4 text-center text-sm text-slate-300 md:text-base">{t.subtitle}</p>
        <p className="mb-8 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs text-slate-300">{t.inviteNote}</p>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void runAuthAction('login');
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{t.email}</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{t.password}</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
            />
          </div>

          {feedback ? (
            <p className={`text-sm ${feedback.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {feedback.message}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-300 py-3 font-bold text-slate-900 transition-colors hover:bg-amber-200 disabled:opacity-60"
            >
              {t.login}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => void runAuthAction('register')}
              className="w-full rounded-xl border border-white/15 bg-white/5 py-3 font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
            >
              {t.register}
            </button>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => void runGoogleLogin()}
            className="w-full rounded-xl border border-white/15 py-3 font-semibold text-slate-100 transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            {t.google}
          </button>

          <div className="text-center text-sm text-slate-300">
            <p className="mb-2">{t.noAccount}</p>
            <span className="text-amber-300">{t.forgot}</span>
          </div>
        </form>

        <div className="mt-7 text-center">
          <Link href={`/${locale}`} className="text-sm text-slate-300 transition-colors hover:text-white">
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
