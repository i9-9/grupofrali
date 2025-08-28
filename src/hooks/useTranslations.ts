import { useLanguage } from '@/contexts/LanguageContext'

export function useTranslations() {
  const { t, language, setLanguage, getValue, isLoading, isReady } = useLanguage()
  
  return {
    t,
    language,
    setLanguage,
    getValue,
    isLoading,
    isReady,
    isSpanish: language === 'es',
    isEnglish: language === 'en'
  }
}
