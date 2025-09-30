import React from 'react'
import Image from 'next/image'
import { useTeamMembers } from '@/hooks/useContentful'
import { useTranslations } from '@/hooks/useTranslations'

interface ContentfulTeamProps {
  className?: string
  maxMembers?: number
  showAll?: boolean
}

export default function ContentfulTeam({ 
  className = '', 
  maxMembers = 10, 
  showAll = false 
}: ContentfulTeamProps) {
  const { teamMembers, loading, error } = useTeamMembers()
  const { language } = useTranslations()

  if (loading) {
    return (
      <div className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-300 rounded-full mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} text-center text-red-600`}>
        Error loading team members: {error}
      </div>
    )
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className={`${className} text-center text-gray-600`}>
        No team members available
      </div>
    )
  }

  const displayMembers = showAll ? teamMembers : teamMembers.slice(0, maxMembers)

  return (
    <div className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
      {displayMembers.map((member) => (
        <TeamMemberCard key={member.sys.id} member={member} language={language} />
      ))}
    </div>
  )
}

interface TeamMemberCardProps {
  member: any
  language: string
}

function TeamMemberCard({ member, language }: TeamMemberCardProps) {
  const name = member.fields.name
  const position = language === 'en' ? member.fields.positionEn : member.fields.position
  const bio = language === 'en' ? member.fields.bioEn : member.fields.bio
  const photo = member.fields.photo

  return (
    <div className="text-center group">
      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
        {photo ? (
          <Image
            src={`https:${photo.fields.file.url}`}
            alt={photo.fields.title || name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-2xl font-bold">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {name}
      </h3>
      
      <p className="text-primary font-medium mb-3">
        {position}
      </p>
      
      {bio && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {bio}
        </p>
      )}
    </div>
  )
}

