import { Locale } from './translations';

export function isValidLocale(locale: string): locale is Locale {
  return locale === 'en' || locale === 'ar';
}

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
