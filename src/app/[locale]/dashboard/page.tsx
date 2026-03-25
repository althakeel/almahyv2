'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { User, signOut } from 'firebase/auth';
import Logo from '@/assets/logo/logo.png';
import {
  approveDashboardAccess,
  BLOGS_ONLY_PERMISSIONS,
  DashboardAccessRecord,
  FULL_PERMISSIONS,
  ensurePrimaryAdminAccess,
  ensureDashboardAccessRequest,
  getDashboardAccess,
  getPrimaryAdminEmail,
  listDashboardUsers,
  normalizeEmail,
  revokeDashboardAccess,
} from '@/lib/admin-access';
import {
  BlogPost,
  BlogsBannerCard,
  readBlogsFromStorage,
  readBlogsPageBannerCardFromStorage,
  readBlogsPageBannerFromStorage,
  slugify,
  writeBlogsPageBannerCardToStorage,
  writeBlogsPageBannerToStorage,
  writeBlogsToStorage,
} from '@/lib/blogs';

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'blogs' | 'access'>('dashboard');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [accessRole, setAccessRole] = useState<'admin' | 'editor' | null>(null);
  const [accessUsers, setAccessUsers] = useState<DashboardAccessRecord[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [permissionPreset, setPermissionPreset] = useState<'all' | 'blogs'>('all');
  const [isAccessActionLoading, setIsAccessActionLoading] = useState(false);
  const [accessFeedback, setAccessFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogTitleAr, setBlogTitleAr] = useState('');
  const [blogDate, setBlogDate] = useState('');
  const [blogShortDescription, setBlogShortDescription] = useState('');
  const [blogShortDescriptionAr, setBlogShortDescriptionAr] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogContentAr, setBlogContentAr] = useState('');
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogImage, setBlogImage] = useState('');
  const [blogImageAr, setBlogImageAr] = useState('');
  const [blogBannerImage, setBlogBannerImage] = useState('');
  const [blogBannerImageAr, setBlogBannerImageAr] = useState('');
  const [blogsPageBanner, setBlogsPageBanner] = useState('');
  const [bannerCardTitleEn, setBannerCardTitleEn] = useState('');
  const [bannerCardTitleAr, setBannerCardTitleAr] = useState('');
  const [bannerCardSubEn, setBannerCardSubEn] = useState('');
  const [bannerCardSubAr, setBannerCardSubAr] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingBannerImage, setIsUploadingBannerImage] = useState(false);
  const [isUploadingImageAr, setIsUploadingImageAr] = useState(false);
  const [isUploadingBannerImageAr, setIsUploadingBannerImageAr] = useState(false);
  const [isUploadingPageBanner, setIsUploadingPageBanner] = useState(false);
  const [blogFeedback, setBlogFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [allowedSections, setAllowedSections] = useState({
    dashboard: true,
    blogs: true,
    transactions: false,
    calls: false,
  });
  const primaryAdminEmail = getPrimaryAdminEmail();

  const loadAccessUsers = async () => {
    try {
      const nextUsers = await listDashboardUsers();
      setAccessUsers(nextUsers);
    } catch (error) {
      console.error('Load access users error:', error);
      setAccessFeedback({
        type: 'error',
        message: locale === 'ar' ? 'تعذر تحميل قائمة الصلاحيات.' : 'Unable to load access list.',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser?.email) {
        setUser(null);
        setAccessRole(null);
        setAllowedSections({ dashboard: true, blogs: false, transactions: false, calls: false });
        setAccessDenied(false);
        router.push(`/${locale}/login`);
        setLoading(false);
        return;
      }

      try {
        const email = normalizeEmail(currentUser.email);

        if (email === primaryAdminEmail) {
          setUser(currentUser);
          setAccessRole('admin');
          setAllowedSections({ dashboard: true, blogs: true, transactions: true, calls: true });
          setAccessDenied(false);
          setLoading(false);

          void ensurePrimaryAdminAccess(email)
            .then(() => loadAccessUsers())
            .catch((error) => {
              console.error('Primary admin access sync warning:', error);
            });

          return;
        }

        const access = await ensureDashboardAccessRequest(email);

        if (!access) {
          setUser(currentUser);
          setAccessRole(null);
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        setUser(currentUser);
        setAccessRole(access.role);
        setAllowedSections(access.permissions || { dashboard: true, blogs: true, transactions: false, calls: false });
        setAccessDenied(false);
        setLoading(false);

        if (access.role === 'admin') {
          void loadAccessUsers();
        }
      } catch (error) {
        console.error('Dashboard access error:', error);
        setAccessDenied(true);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, locale, primaryAdminEmail]);

  useEffect(() => {
    setBlogs(readBlogsFromStorage());
    setBlogsPageBanner(readBlogsPageBannerFromStorage());
    const card = readBlogsPageBannerCardFromStorage();
    setBannerCardTitleEn(card.titleEn);
    setBannerCardTitleAr(card.titleAr);
    setBannerCardSubEn(card.subEn);
    setBannerCardSubAr(card.subAr);
  }, []);

  useEffect(() => {
    if (activeSection === 'blogs' && !allowedSections.blogs) {
      setActiveSection('dashboard');
    }
  }, [activeSection, allowedSections.blogs]);

  const handleApproveAccess = async (emailToApprove?: string) => {
    if (!user?.email) {
      return;
    }

    const normalizedInviteEmail = normalizeEmail(emailToApprove || inviteEmail);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedInviteEmail);

    if (!isEmail) {
      setAccessFeedback({
        type: 'error',
        message: locale === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح.' : 'Please enter a valid email address.',
      });
      return;
    }

    try {
      setIsAccessActionLoading(true);
      await approveDashboardAccess(
        normalizedInviteEmail,
        user.email,
        permissionPreset === 'all' ? FULL_PERMISSIONS : BLOGS_ONLY_PERMISSIONS
      );

      const inviteResponse = await fetch('/api/invitations/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedInviteEmail, locale }),
      });
      const inviteResult = await inviteResponse.json();

      setInviteEmail('');
      setAccessFeedback({
        type: inviteResponse.ok && inviteResult?.success ? 'success' : 'error',
        message: inviteResponse.ok && inviteResult?.success
          ? locale === 'ar'
            ? 'تمت الموافقة وإرسال رسالة الدعوة عبر البريد الإلكتروني.'
            : 'Access approved and invitation email sent successfully.'
          : locale === 'ar'
            ? 'تمت الموافقة لكن فشل إرسال البريد. تحقق من إعدادات Resend.'
            : 'Access approved, but invitation email failed to send. Check Resend configuration.',
      });
      await loadAccessUsers();
    } catch (error) {
      console.error('Approve access error:', error);
      setAccessFeedback({
        type: 'error',
        message: locale === 'ar' ? 'تعذر منح الموافقة.' : 'Unable to approve access.',
      });
    } finally {
      setIsAccessActionLoading(false);
    }
  };

  const handleSendInvitation = async () => {
    const normalizedInviteEmail = normalizeEmail(inviteEmail);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedInviteEmail);

    if (!isEmail) {
      setAccessFeedback({
        type: 'error',
        message: locale === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح.' : 'Please enter a valid email address.',
      });
      return;
    }

    try {
      setIsAccessActionLoading(true);
      await ensureDashboardAccessRequest(normalizedInviteEmail);

      const inviteResponse = await fetch('/api/invitations/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedInviteEmail, locale, type: 'invite' }),
      });
      const inviteResult = await inviteResponse.json();

      setAccessFeedback({
        type: inviteResponse.ok && inviteResult?.success ? 'success' : 'error',
        message: inviteResponse.ok && inviteResult?.success
          ? locale === 'ar'
            ? 'تم إرسال دعوة الوصول بنجاح.'
            : 'Access invitation email sent successfully.'
          : locale === 'ar'
            ? 'تعذر إرسال الدعوة. تحقق من إعدادات Resend.'
            : 'Failed to send invitation. Check Resend configuration.',
      });

      await loadAccessUsers();
    } catch (error) {
      console.error('Send invitation error:', error);
      setAccessFeedback({
        type: 'error',
        message: locale === 'ar' ? 'تعذر إرسال الدعوة.' : 'Unable to send invitation.',
      });
    } finally {
      setIsAccessActionLoading(false);
    }
  };

  const handleRevokeAccess = async (email: string) => {
    try {
      await revokeDashboardAccess(email);
      setAccessFeedback({
        type: 'success',
        message: locale === 'ar' ? 'تم سحب الوصول.' : 'Access revoked successfully.',
      });
      await loadAccessUsers();
    } catch (error) {
      console.error('Revoke access error:', error);
      setAccessFeedback({
        type: 'error',
        message:
          locale === 'ar'
            ? 'تعذر سحب الوصول. لا يمكن إزالة البريد الإداري الرئيسي.'
            : 'Unable to revoke access. The primary admin email cannot be removed.',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, target: 'card' | 'banner' | 'cardAr' | 'bannerAr') => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (target === 'card') {
      setIsUploadingImage(true);
    } else if (target === 'banner') {
      setIsUploadingBannerImage(true);
    } else if (target === 'cardAr') {
      setIsUploadingImageAr(true);
    } else {
      setIsUploadingBannerImageAr(true);
    }
    setBlogFeedback(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/imagekit/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result?.success || !result?.url) {
        throw new Error(result?.message || 'Image upload failed');
      }

      if (target === 'card') {
        setBlogImage(result.url);
      } else if (target === 'banner') {
        setBlogBannerImage(result.url);
      } else if (target === 'cardAr') {
        setBlogImageAr(result.url);
      } else {
        setBlogBannerImageAr(result.url);
      }
      setBlogFeedback({
        type: 'success',
        message:
          target === 'card'
            ? locale === 'ar'
              ? 'تم رفع صورة البطاقة بنجاح.'
              : 'Card image uploaded successfully.'
            : target === 'banner'
              ? locale === 'ar'
                ? 'تم رفع صورة البانر بنجاح.'
                : 'Banner image uploaded successfully.'
              : target === 'cardAr'
                ? locale === 'ar'
                  ? 'تم رفع صورة البطاقة العربية بنجاح.'
                  : 'Arabic card image uploaded successfully.'
                : locale === 'ar'
                  ? 'تم رفع صورة البانر العربية بنجاح.'
                  : 'Arabic banner image uploaded successfully.',
      });
    } catch (error) {
      console.error('Image upload error:', error);
      setBlogFeedback({
        type: 'error',
        message: locale === 'ar' ? 'فشل رفع الصورة. تأكد من إعدادات ImageKit.' : 'Image upload failed. Check ImageKit configuration.',
      });
    } finally {
      if (target === 'card') {
        setIsUploadingImage(false);
      } else if (target === 'banner') {
        setIsUploadingBannerImage(false);
      } else if (target === 'cardAr') {
        setIsUploadingImageAr(false);
      } else {
        setIsUploadingBannerImageAr(false);
      }
      event.target.value = '';
    }
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogTitleAr('');
    setBlogDate('');
    setBlogShortDescription('');
    setBlogShortDescriptionAr('');
    setBlogContent('');
    setBlogContentAr('');
    setBlogImage('');
    setBlogImageAr('');
    setBlogBannerImage('');
    setBlogBannerImageAr('');
  };

  const handlePageBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploadingPageBanner(true);
    setBlogFeedback(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/imagekit/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result?.success || !result?.url) {
        throw new Error(result?.message || 'Banner upload failed');
      }

      setBlogsPageBanner(result.url);
      writeBlogsPageBannerToStorage(result.url);
      setBlogFeedback({
        type: 'success',
        message: locale === 'ar' ? 'تم رفع بانر صفحة المدونة بنجاح.' : 'Blogs page banner uploaded successfully.',
      });
    } catch (error) {
      console.error('Blogs page banner upload error:', error);
      setBlogFeedback({
        type: 'error',
        message: locale === 'ar' ? 'فشل رفع بانر الصفحة.' : 'Blogs page banner upload failed.',
      });
    } finally {
      setIsUploadingPageBanner(false);
      event.target.value = '';
    }
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogTitleAr(blog.titleAr || '');
    setBlogDate(blog.date);
    setBlogShortDescription(blog.shortDescription);
    setBlogShortDescriptionAr(blog.shortDescriptionAr || '');
    setBlogContent(blog.content);
    setBlogContentAr(blog.contentAr || '');
    setBlogImage(blog.image);
    setBlogImageAr(blog.imageAr || '');
    setBlogBannerImage(blog.bannerImage || '');
    setBlogBannerImageAr(blog.bannerImageAr || '');
    setBlogFeedback(null);
  };

  const handleDeleteBlog = (blogId: string) => {
    const nextBlogs = blogs.filter((blog) => blog.id !== blogId);
    writeBlogsToStorage(nextBlogs);
    setBlogs(nextBlogs);

    if (editingBlogId === blogId) {
      resetBlogForm();
    }

    setBlogFeedback({
      type: 'success',
      message: locale === 'ar' ? 'تم حذف المقالة.' : 'Blog deleted successfully.',
    });
  };

  const handleCreateBlog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBlogFeedback(null);

    if (!blogTitle.trim() || !blogDate || !blogShortDescription.trim() || !blogContent.trim() || !blogImage || !blogBannerImage) {
      setBlogFeedback({
        type: 'error',
        message:
          locale === 'ar'
            ? 'يرجى تعبئة جميع الحقول ورفع صورة البطاقة وصورة البانر.'
            : 'Please fill all fields and upload both card and banner images.',
      });
      return;
    }

    if (editingBlogId) {
      const nextBlogs = blogs.map((blog) =>
        blog.id === editingBlogId
          ? {
              ...blog,
              title: blogTitle.trim(),
              titleAr: blogTitleAr.trim() || undefined,
              date: blogDate,
              shortDescription: blogShortDescription.trim(),
              shortDescriptionAr: blogShortDescriptionAr.trim() || undefined,
              content: blogContent.trim(),
              contentAr: blogContentAr.trim() || undefined,
              image: blogImage,
              imageAr: blogImageAr || undefined,
              bannerImage: blogBannerImage,
              bannerImageAr: blogBannerImageAr || undefined,
            }
          : blog
      );

      writeBlogsToStorage(nextBlogs);
      setBlogs(nextBlogs);
      resetBlogForm();
      setBlogFeedback({
        type: 'success',
        message: locale === 'ar' ? 'تم تحديث المقالة بنجاح.' : 'Blog updated successfully.',
      });
      return;
    }

    const baseSlug = slugify(blogTitle);
    const slugExists = blogs.some((blog) => blog.slug === baseSlug);
    const finalSlug = slugExists ? `${baseSlug}-${Date.now()}` : baseSlug;

    const newBlog: BlogPost = {
      id: crypto.randomUUID(),
      slug: finalSlug,
      title: blogTitle.trim(),
      titleAr: blogTitleAr.trim() || undefined,
      date: blogDate,
      shortDescription: blogShortDescription.trim(),
      shortDescriptionAr: blogShortDescriptionAr.trim() || undefined,
      content: blogContent.trim(),
      contentAr: blogContentAr.trim() || undefined,
      image: blogImage,
      imageAr: blogImageAr || undefined,
      bannerImage: blogBannerImage,
      bannerImageAr: blogBannerImageAr || undefined,
      createdAt: Date.now(),
    };

    const nextBlogs = [newBlog, ...blogs];
    writeBlogsToStorage(nextBlogs);
    setBlogs(nextBlogs);

    resetBlogForm();
    setBlogFeedback({
      type: 'success',
      message: locale === 'ar' ? 'تم إنشاء المقالة بنجاح.' : 'Blog created successfully.',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1EFF0]">
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl text-gray-600">{locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[#F1EFF0] px-5 py-24">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold text-[#160A0A]">
            {locale === 'ar' ? 'الوصول مرفوض' : 'Access Denied'}
          </h1>
          <p className="mb-4 text-slate-600">
            {locale === 'ar'
              ? 'هذا البريد الإلكتروني لا يملك صلاحية دخول لوحة المدونة بعد. يلزم موافقة البريد الإداري الرئيسي أولاً.'
              : 'This email does not have dashboard access yet. The primary admin must approve it first.'}
          </p>
          <p className="mb-4 rounded-xl border border-[#CECDCB] bg-[#F8F7F7] px-4 py-3 text-sm text-slate-600">
            {locale === 'ar'
              ? `أنت مسجل الدخول بواسطة: ${user?.email || 'غير معروف'}`
              : `Signed in as: ${user?.email || 'Unknown'}`}
          </p>
          <p className="mb-6 rounded-xl border border-[#CECDCB] bg-[#F8F7F7] px-4 py-3 text-sm text-slate-600">
            {locale === 'ar'
              ? `البريد الإداري الرئيسي: ${primaryAdminEmail || 'غير محدد'}`
              : `Primary admin email: ${primaryAdminEmail || 'Not configured'}`}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/login`} className="rounded-xl bg-[#DE3B34] px-5 py-3 font-semibold text-white hover:bg-[#9B0F09] transition-colors">
              {locale === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-[#CECDCB] px-5 py-3 font-semibold text-[#160A0A] hover:bg-[#F1EFF0] transition-colors"
            >
              {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1EFF0]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-72 md:flex md:flex-col bg-[#160A0A] text-white p-6 pt-24">
        <div className="mb-10">
          <Image src={Logo} alt="Almahy Logo" width={150} height={56} className="object-contain" />
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setActiveSection('dashboard')}
            className={`w-full rounded-xl px-4 py-3 font-semibold text-left transition-colors ${
              activeSection === 'dashboard' ? 'bg-[#DE3B34] text-white' : 'text-white/80 hover:bg-white/10'
            }`}
          >
            {locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </button>
          {allowedSections.blogs ? (
            <button
              type="button"
              onClick={() => setActiveSection('blogs')}
              className={`w-full rounded-xl px-4 py-3 font-semibold text-left transition-colors ${
                activeSection === 'blogs' ? 'bg-[#DE3B34] text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {locale === 'ar' ? 'إدارة المدونة' : 'Blogs'}
            </button>
          ) : null}
          {allowedSections.transactions ? (
            <div className="rounded-xl px-4 py-3 text-white/80 pointer-events-none">
              {locale === 'ar' ? 'المعاملات' : 'Transactions'}
            </div>
          ) : null}
        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/30 px-4 py-3 font-semibold hover:bg-white/10 transition-colors"
          >
            {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      <main className="md:ml-72 px-5 pb-5 pt-24 md:px-10 md:pb-10 md:pt-24">
        <div className="md:hidden mb-4 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
          <Image src={Logo} alt="Almahy Logo" width={120} height={45} className="object-contain" />
          <button
            onClick={handleLogout}
            className="rounded-lg bg-[#DE3B34] px-3 py-2 text-sm font-semibold text-white"
          >
            {locale === 'ar' ? 'خروج' : 'Logout'}
          </button>
        </div>

        <div className={`md:hidden mb-4 grid gap-2 ${allowedSections.blogs ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <button
            type="button"
            onClick={() => setActiveSection('dashboard')}
            className={`rounded-xl px-4 py-2.5 font-semibold transition-colors ${
              activeSection === 'dashboard' ? 'bg-[#DE3B34] text-white' : 'bg-white text-[#160A0A]'
            }`}
          >
            {locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </button>
          {allowedSections.blogs ? (
            <button
              type="button"
              onClick={() => setActiveSection('blogs')}
              className={`rounded-xl px-4 py-2.5 font-semibold transition-colors ${
                activeSection === 'blogs' ? 'bg-[#DE3B34] text-white' : 'bg-white text-[#160A0A]'
              }`}
            >
              {locale === 'ar' ? 'المدونة' : 'Blogs'}
            </button>
          ) : null}
        </div>

        {activeSection === 'dashboard' ? (
          <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-[#160A0A] mb-2">
              {locale === 'ar' ? 'مرحبا بعودتك' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600 mb-8">
              {locale === 'ar'
                ? `مرحبا ${user?.email || 'المستخدم'}`
                : `Hello ${user?.email || 'User'}`}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <section className="rounded-xl border border-[#CECDCB] p-5">
                <h2 className="text-lg font-semibold text-[#160A0A] mb-2">
                  {locale === 'ar' ? 'ملخص الحساب' : 'Account Summary'}
                </h2>
                <p className="text-slate-600 text-sm">
                  {locale === 'ar'
                    ? 'عرض حالة حسابك وأحدث النشاطات.'
                    : 'View your account status and latest activity.'}
                </p>
              </section>

              <section className="rounded-xl border border-[#CECDCB] p-5">
                <h2 className="text-lg font-semibold text-[#160A0A] mb-2">
                  {locale === 'ar' ? 'الوصول السريع' : 'Quick Access'}
                </h2>
                <p className="text-slate-600 text-sm">
                  {locale === 'ar'
                    ? 'الوصول إلى الخدمات الأساسية من مكان واحد.'
                    : 'Access core services from one place.'}
                </p>
              </section>
            </div>
          </div>
        ) : activeSection === 'access' ? (
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <h1 className="mb-2 text-2xl md:text-3xl font-bold text-[#160A0A]">
                {locale === 'ar' ? 'إدارة صلاحيات لوحة التحكم' : 'Admin Panel Access'}
              </h1>
              <p className="mb-6 text-sm text-slate-600">
                {locale === 'ar'
                  ? 'يمكن للبريد الإداري الرئيسي فقط الموافقة على المستخدمين وتحديد نوع الصلاحية (وصول كامل أو المدونة فقط).'
                  : 'Only the primary admin can approve users and manually choose access type (Full Access or Blogs Only).'}
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder={locale === 'ar' ? 'أدخل البريد الإلكتروني للموافقة عليه' : 'Enter an email to approve'}
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />
                <select
                  value={permissionPreset}
                  onChange={(event) => setPermissionPreset(event.target.value as 'all' | 'blogs')}
                  className="rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                >
                  <option value="all">{locale === 'ar' ? 'وصول كامل' : 'Full Access'}</option>
                  <option value="blogs">{locale === 'ar' ? 'المدونة فقط' : 'Blogs Only'}</option>
                </select>
                <button
                  type="button"
                  disabled={isAccessActionLoading}
                  onClick={() => void handleSendInvitation()}
                  className="rounded-xl border border-[#CECDCB] bg-white px-6 py-3 font-semibold text-[#160A0A] hover:bg-[#F1EFF0] transition-colors disabled:opacity-60"
                >
                  {locale === 'ar' ? 'إرسال دعوة' : 'Send Invitation'}
                </button>
                <button
                  type="button"
                  disabled={isAccessActionLoading}
                  onClick={() => void handleApproveAccess()}
                  className="rounded-xl bg-[#DE3B34] px-6 py-3 font-semibold text-white hover:bg-[#9B0F09] transition-colors"
                >
                  {isAccessActionLoading
                    ? locale === 'ar'
                      ? 'جارٍ التنفيذ...'
                      : 'Processing...'
                    : locale === 'ar'
                      ? 'منح الموافقة'
                      : 'Approve Access'}
                </button>
              </div>

              {accessFeedback ? (
                <p className={`mt-4 text-sm ${accessFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {accessFeedback.message}
                </p>
              ) : null}

              <div className="mt-6 rounded-xl border border-[#CECDCB] bg-[#F8F7F7] px-4 py-3 text-sm text-slate-600">
                {locale === 'ar'
                  ? `البريد الإداري الرئيسي الحالي: ${primaryAdminEmail || 'غير محدد'}`
                  : `Current primary admin email: ${primaryAdminEmail || 'Not configured'}`}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[#160A0A]">
                  {locale === 'ar' ? 'المستخدمون المصرح لهم' : 'Authorized Users'}
                </h2>
                <button
                  type="button"
                  onClick={() => void loadAccessUsers()}
                  className="text-sm font-semibold text-[#DE3B34] hover:text-[#9B0F09]"
                >
                  {locale === 'ar' ? 'تحديث القائمة' : 'Refresh List'}
                </button>
              </div>

              {accessUsers.length === 0 ? (
                <p className="text-sm text-slate-600">
                  {locale === 'ar' ? 'لا يوجد مستخدمون مصرح لهم بعد.' : 'No authorized users yet.'}
                </p>
              ) : (
                <div className="space-y-3">
                  {accessUsers.map((accessUser) => (
                    <article key={accessUser.email} className="flex flex-col gap-3 rounded-xl border border-[#CECDCB] p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-semibold text-[#160A0A]">{accessUser.email}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {locale === 'ar'
                            ? `${accessUser.role === 'admin' ? 'مدير' : 'محرر'} - ${accessUser.status === 'active' ? 'نشط' : 'بانتظار الموافقة'}`
                            : `${accessUser.role === 'admin' ? 'Admin' : 'Editor'} - ${accessUser.status === 'active' ? 'Active' : 'Pending Approval'}`}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {accessUser.permissions?.transactions || accessUser.permissions?.calls
                            ? locale === 'ar'
                              ? 'الصلاحية: وصول كامل'
                              : 'Permission: Full Access'
                            : locale === 'ar'
                              ? 'الصلاحية: المدونة فقط'
                              : 'Permission: Blogs Only'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {accessUser.role !== 'admin' ? (
                          <>
                            {accessUser.status !== 'active' ? (
                              <button
                                type="button"
                                onClick={() => void handleApproveAccess(accessUser.email)}
                                className="rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                              >
                                {locale === 'ar' ? 'موافقة' : 'Approve'}
                              </button>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => void handleRevokeAccess(accessUser.email)}
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
                            >
                              {locale === 'ar' ? 'سحب الوصول' : 'Revoke Access'}
                            </button>
                          </>
                        ) : (
                          <span className="rounded-lg bg-[#F1EFF0] px-3 py-2 text-xs font-semibold text-slate-600">
                            {locale === 'ar' ? 'الإدارة الرئيسية' : 'Primary Admin'}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-[#160A0A] mb-4">
                {locale === 'ar' ? 'بانر صفحة المدونة' : 'Blogs Page Banner'}
              </h1>
              <p className="text-sm text-slate-600 mb-4">
                {locale === 'ar'
                  ? 'هذا البانر مستقل تمامًا عن المقالات.'
                  : 'This banner is fully separate and not connected to any blog post.'}
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handlePageBannerUpload}
                disabled={isUploadingPageBanner}
                className="w-full md:w-auto rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] disabled:opacity-60"
              />

              {isUploadingPageBanner ? (
                <p className="text-sm text-slate-600 mt-3">
                  {locale === 'ar' ? 'جاري رفع بانر الصفحة...' : 'Uploading blogs page banner...'}
                </p>
              ) : null}

              {blogsPageBanner ? (
                <div className="mt-4 rounded-xl border border-[#CECDCB] p-2 w-fit">
                  <p className="mb-1 text-xs text-slate-500">{locale === 'ar' ? 'معاينة بانر الصفحة' : 'Blogs page banner preview'}</p>
                  <img src={blogsPageBanner} alt="Blogs page banner preview" className="h-[150px] w-[320px] rounded-lg object-cover" />
                </div>
              ) : null}

              {/* Banner card text */}
              <div className="mt-6 border-t border-[#CECDCB] pt-5">
                <p className="text-sm font-semibold text-[#160A0A] mb-3">
                  {locale === 'ar' ? 'نص البطاقة على البانر' : 'Banner Card Text'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Title (English)</p>
                    <input
                      type="text"
                      value={bannerCardTitleEn}
                      onChange={(e) => setBannerCardTitleEn(e.target.value)}
                      placeholder="e.g. Legal Blog"
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">العنوان (عربي)</p>
                    <input
                      type="text"
                      value={bannerCardTitleAr}
                      onChange={(e) => setBannerCardTitleAr(e.target.value)}
                      placeholder="مثال: المدونة القانونية"
                      dir="rtl"
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Subtitle (English)</p>
                    <input
                      type="text"
                      value={bannerCardSubEn}
                      onChange={(e) => setBannerCardSubEn(e.target.value)}
                      placeholder="e.g. Latest legal articles from our team."
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">الوصف (عربي)</p>
                    <input
                      type="text"
                      value={bannerCardSubAr}
                      onChange={(e) => setBannerCardSubAr(e.target.value)}
                      placeholder="مثال: مقالات قانونية حديثة من فريقنا."
                      dir="rtl"
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const card: BlogsBannerCard = {
                      titleEn: bannerCardTitleEn.trim(),
                      titleAr: bannerCardTitleAr.trim(),
                      subEn: bannerCardSubEn.trim(),
                      subAr: bannerCardSubAr.trim(),
                    };
                    writeBlogsPageBannerCardToStorage(card);
                    setBlogFeedback({ type: 'success', message: locale === 'ar' ? 'تم حفظ نص البطاقة.' : 'Banner card text saved.' });
                  }}
                  className="mt-3 rounded-xl bg-[#DE3B34] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9B0F09] transition-colors"
                >
                  {locale === 'ar' ? 'حفظ النص' : 'Save Card Text'}
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-[#160A0A] mb-6">
                {editingBlogId
                  ? locale === 'ar'
                    ? 'تعديل المقالة'
                    : 'Edit Blog Post'
                  : locale === 'ar'
                    ? 'إضافة مقالة جديدة'
                    : 'Create Blog Post'}
              </h1>

              <form className="space-y-4" onSubmit={handleCreateBlog}>
                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'عنوان المقالة' : 'Blog title'}
                  value={blogTitle}
                  onChange={(event) => setBlogTitle(event.target.value)}
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />

                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'عنوان المقالة (عربي - اختياري)' : 'Blog title (Arabic - optional)'}
                  value={blogTitleAr}
                  onChange={(event) => setBlogTitleAr(event.target.value)}
                  dir="rtl"
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="date"
                    value={blogDate}
                    onChange={(event) => setBlogDate(event.target.value)}
                    className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                  />
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      {locale === 'ar' ? 'صورة البطاقة (Grid)' : 'Card Image (Grid)'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, 'card')}
                      disabled={isUploadingImage}
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      {locale === 'ar' ? 'صورة البانر (Featured)' : 'Banner Image (Featured)'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, 'banner')}
                      disabled={isUploadingBannerImage}
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      {locale === 'ar' ? 'صورة البطاقة (العربية)' : 'Card Image (Arabic)'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, 'cardAr')}
                      disabled={isUploadingImageAr}
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      {locale === 'ar' ? 'صورة البانر (العربية)' : 'Banner Image (Arabic)'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, 'bannerAr')}
                      disabled={isUploadingBannerImageAr}
                      className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-[#DE3B34] disabled:opacity-60"
                    />
                  </div>
                </div>

                {isUploadingImage ? (
                  <p className="text-sm text-slate-600">
                    {locale === 'ar' ? 'جاري رفع صورة البطاقة...' : 'Uploading card image...'}
                  </p>
                ) : null}

                {isUploadingBannerImage ? (
                  <p className="text-sm text-slate-600">
                    {locale === 'ar' ? 'جاري رفع صورة البانر...' : 'Uploading banner image...'}
                  </p>
                ) : null}

                {isUploadingImageAr ? (
                  <p className="text-sm text-slate-600">
                    {locale === 'ar' ? 'جاري رفع صورة البطاقة العربية...' : 'Uploading Arabic card image...'}
                  </p>
                ) : null}

                {isUploadingBannerImageAr ? (
                  <p className="text-sm text-slate-600">
                    {locale === 'ar' ? 'جاري رفع صورة البانر العربية...' : 'Uploading Arabic banner image...'}
                  </p>
                ) : null}

                {blogImage || blogBannerImage || blogImageAr || blogBannerImageAr ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {blogImage ? (
                      <div className="rounded-xl border border-[#CECDCB] p-2 w-fit">
                        <p className="mb-1 text-xs text-slate-500">{locale === 'ar' ? 'معاينة صورة البطاقة' : 'Card preview'}</p>
                        <img src={blogImage} alt="Blog card preview" className="h-[140px] w-[220px] rounded-lg object-cover" />
                      </div>
                    ) : null}
                    {blogBannerImage ? (
                      <div className="rounded-xl border border-[#CECDCB] p-2 w-fit">
                        <p className="mb-1 text-xs text-slate-500">{locale === 'ar' ? 'معاينة صورة البانر' : 'Banner preview'}</p>
                        <img src={blogBannerImage} alt="Blog banner preview" className="h-[140px] w-[260px] rounded-lg object-cover" />
                      </div>
                    ) : null}
                    {blogImageAr ? (
                      <div className="rounded-xl border border-[#CECDCB] p-2 w-fit">
                        <p className="mb-1 text-xs text-slate-500">{locale === 'ar' ? 'معاينة صورة البطاقة العربية' : 'Arabic card preview'}</p>
                        <img src={blogImageAr} alt="Blog Arabic card preview" className="h-[140px] w-[220px] rounded-lg object-cover" />
                      </div>
                    ) : null}
                    {blogBannerImageAr ? (
                      <div className="rounded-xl border border-[#CECDCB] p-2 w-fit">
                        <p className="mb-1 text-xs text-slate-500">{locale === 'ar' ? 'معاينة صورة البانر العربية' : 'Arabic banner preview'}</p>
                        <img src={blogBannerImageAr} alt="Blog Arabic banner preview" className="h-[140px] w-[260px] rounded-lg object-cover" />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <textarea
                  placeholder={locale === 'ar' ? 'وصف قصير للمقالة' : 'Short description'}
                  value={blogShortDescription}
                  onChange={(event) => setBlogShortDescription(event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />

                <textarea
                  placeholder={locale === 'ar' ? 'وصف قصير للمقالة (عربي - اختياري)' : 'Short description (Arabic - optional)'}
                  value={blogShortDescriptionAr}
                  onChange={(event) => setBlogShortDescriptionAr(event.target.value)}
                  rows={3}
                  dir="rtl"
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />

                <textarea
                  placeholder={locale === 'ar' ? 'محتوى المقالة الكامل' : 'Full blog content'}
                  value={blogContent}
                  onChange={(event) => setBlogContent(event.target.value)}
                  rows={7}
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />

                <textarea
                  placeholder={locale === 'ar' ? 'محتوى المقالة الكامل (عربي - اختياري)' : 'Full blog content (Arabic - optional)'}
                  value={blogContentAr}
                  onChange={(event) => setBlogContentAr(event.target.value)}
                  rows={7}
                  dir="rtl"
                  className="w-full rounded-xl border border-[#CECDCB] bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#DE3B34]"
                />

                {blogFeedback ? (
                  <p className={`text-sm ${blogFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {blogFeedback.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="rounded-xl bg-[#DE3B34] px-6 py-3 font-semibold text-white hover:bg-[#9B0F09] transition-colors"
                >
                  {editingBlogId
                    ? locale === 'ar'
                      ? 'حفظ التعديلات'
                      : 'Save Changes'
                    : locale === 'ar'
                      ? 'نشر المقالة'
                      : 'Publish Blog'}
                </button>

                {editingBlogId ? (
                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="ml-3 rounded-xl border border-[#CECDCB] px-6 py-3 font-semibold text-[#160A0A] hover:bg-[#F1EFF0] transition-colors"
                  >
                    {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                ) : null}
              </form>
            </section>

            <section className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-xl font-bold text-[#160A0A]">
                  {locale === 'ar' ? 'المقالات المنشورة' : 'Published Blogs'}
                </h2>
                <Link href={`/${locale}/blogs`} className="text-sm font-semibold text-[#DE3B34] hover:text-[#9B0F09]">
                  {locale === 'ar' ? 'عرض صفحة المدونة' : 'View Blogs Page'}
                </Link>
              </div>

              {blogs.length === 0 ? (
                <p className="text-slate-600 text-sm">
                  {locale === 'ar' ? 'لا توجد مقالات بعد.' : 'No blogs yet.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogs.map((blog) => (
                    <article key={blog.id} className="rounded-xl border border-[#CECDCB] p-4">
                      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="overflow-hidden rounded-lg border border-[#CECDCB]">
                          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-[#F1EFF0] text-slate-600">
                            {locale === 'ar' ? 'بانر' : 'Banner'}
                          </p>
                          {!blog.bannerImage ? (
                            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border-t border-[#CECDCB]">
                              {locale === 'ar' ? 'بانر غير مخصص' : 'Missing Banner'}
                            </p>
                          ) : null}
                          <img
                            src={blog.bannerImage || blog.image}
                            alt={`${blog.title} banner`}
                            className="h-28 w-full object-cover"
                          />
                        </div>
                        <div className="overflow-hidden rounded-lg border border-[#CECDCB]">
                          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-[#F1EFF0] text-slate-600">
                            {locale === 'ar' ? 'البطاقة' : 'Card'}
                          </p>
                          <img
                            src={blog.image}
                            alt={`${blog.title} card`}
                            className="h-28 w-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">{blog.date}</p>
                      <h3 className="text-lg font-semibold text-[#160A0A] mb-2 line-clamp-2">
                        {locale === 'ar' ? blog.titleAr || blog.title : blog.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {locale === 'ar' ? blog.shortDescriptionAr || blog.shortDescription : blog.shortDescription}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditBlog(blog)}
                          className="rounded-lg border border-[#CECDCB] px-3 py-2 text-xs font-semibold text-[#160A0A] hover:bg-[#F1EFF0] transition-colors"
                        >
                          {locale === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
                        >
                          {locale === 'ar' ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
