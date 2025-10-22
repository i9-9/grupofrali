interface RightArrowIconProps {
  className?: string
  width?: number
  height?: number
  strokeWidth?: number
}

export default function RightArrowIcon({ 
  className = "", 
  width = 24, 
  height = 24,
  strokeWidth = 2 
}: RightArrowIconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}


