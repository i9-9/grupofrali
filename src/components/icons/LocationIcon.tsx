interface LocationIconProps {
  className?: string
  size?: number
}

export default function LocationIcon({ className = "", size = 16 }: LocationIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path 
        d="M8 0C5.2 0 3 2.2 3 5C3 8.5 8 16 8 16C8 16 13 8.5 13 5C13 2.2 10.8 0 8 0ZM8 7C6.9 7 6 6.1 6 5C6 3.9 6.9 3 8 3C9.1 3 10 3.9 10 5C10 6.1 9.1 7 8 7Z" 
        fill="currentColor"
      />
    </svg>
  )
}

