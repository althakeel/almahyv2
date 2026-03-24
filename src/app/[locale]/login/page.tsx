import Link from "next/link";
import { Locale } from "@/lib/translations";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const isArabic = lang === "ar";

  const content = {
    en: {
      title: "Login / Register",
      subtitle: "Access your account to manage your legal services quickly and securely.",
      email: "Email Address",
      password: "Password",
      remember: "Remember me",
      forgot: "Forgot password?",
      login: "Login",
      register: "Create Account",
      noAccount: "Don’t have an account yet?",
      backHome: "Back to Home",
    },
    ar: {
      title: "تسجيل الدخول / إنشاء حساب",
      subtitle: "قم بالدخول إلى حسابك لإدارة خدماتك القانونية بسرعة وأمان.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      remember: "تذكرني",
      forgot: "نسيت كلمة المرور؟",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      noAccount: "ليس لديك حساب بعد؟",
      backHome: "العودة للرئيسية",
    },
  };

  const t = content[lang];

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-24">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-amber-200/20 bg-white/[0.03] p-7 md:p-8 shadow-2xl backdrop-blur-sm" dir={isArabic ? "rtl" : "ltr"}>
        <h1 className="text-3xl font-bold text-white mb-3 text-center">{t.title}</h1>
        <p className="text-slate-300 text-sm md:text-base text-center mb-8">{t.subtitle}</p>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{t.email}</label>
            <input
              type="email"
              placeholder={isArabic ? "example@email.com" : "example@email.com"}
              className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">{t.password}</label>
            <input
              type="password"
              className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition-colors focus:border-amber-300"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="accent-amber-300" />
              {t.remember}
            </label>
            <button type="button" className="text-amber-300 hover:text-amber-200 transition-colors">
              {t.forgot}
            </button>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-amber-300 py-3 font-bold text-slate-900 transition-colors hover:bg-amber-200"
          >
            {t.login}
          </button>

          <div className="rounded-xl border border-white/15 p-4 text-center text-sm text-slate-300">
            <p className="mb-2">{t.noAccount}</p>
            <button type="button" className="font-semibold text-amber-300 hover:text-amber-200 transition-colors">
              {t.register}
            </button>
          </div>
        </form>

        <div className="mt-7 text-center">
          <Link href={`/${lang}`} className="text-slate-300 hover:text-white text-sm transition-colors">
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
