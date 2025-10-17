"use client";

import React, { memo } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { StatItem } from '@/components/StatItem'
import type { ContentfulStatistic } from '@/lib/contentful'

interface ContentfulStatsProps {
  className?: string
  maxStats?: number
  startIndex?: number
  statistics?: ContentfulStatistic[]
}

const ContentfulStats = memo(function ContentfulStats({
  className = '',
  maxStats = 6,
  startIndex = 0,
  statistics
}: ContentfulStatsProps) {
  const { language } = useTranslations()
  
  // Si no se pasan estadísticas como props, mostrar loading
  const loading = !statistics
  const error = null

  if (loading) {
    return (
      <div className={`${className} grid grid-cols-2 md:grid-cols-4 gap-6`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} text-center text-red-600`}>
        Error loading statistics: {error}
      </div>
    )
  }

  if (!statistics || statistics.length === 0) {
    return null
  }

  const displayStats = statistics.slice(startIndex, startIndex + maxStats)

  return (
    <div className={`${className} space-y-8`}>
      {displayStats.map((stat, index) => {
        const label = language === 'en' ? stat.fields.labelEn : stat.fields.label
        const unit = language === 'en' ? stat.fields.unitEn : stat.fields.unit
        const value = stat.fields.value

        return (
          <StatItem
            key={stat.sys.id}
            number={value}
            unit={unit}
            label={label}
            delay={`stat-number-delay-${index + 1}`}
            lineDelay={`stat-line-delay-${index + 1}`}
          />
        )
      })}
    </div>
  )
})

export default ContentfulStats
