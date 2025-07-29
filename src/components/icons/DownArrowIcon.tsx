interface DownArrowIconProps {
  className?: string
}

export default function DownArrowIcon({ className = "" }: DownArrowIconProps) {
  return (
    <svg 
      width="26" 
      height="26" 
      viewBox="0 0 26 26" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.7794 0.663574L12.7794 24.2886" stroke="currentColor" strokeWidth="1.8101"/>
      <path d="M24.9369 12.1955L12.7099 24.2886L1.1157 12.1955" stroke="currentColor" strokeWidth="1.8101"/>
    </svg>
  )
} 