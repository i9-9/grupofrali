'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="font-medium text-sm hover:opacity-70 transition-opacity duration-200"
      aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'Spanish'}`}
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
