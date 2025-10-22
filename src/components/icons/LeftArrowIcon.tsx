interface LeftArrowIconProps {
  className?: string
  width?: number
  height?: number
  strokeWidth?: number
}

export default function LeftArrowIcon({ 
  className = "", 
  width = 24, 
  height = 24,
  strokeWidth = 2 
}: LeftArrowIconProps) {
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
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}


