interface HamburgerIconProps {
  className?: string
}

export default function HamburgerIcon({ className = "" }: HamburgerIconProps) {
  return (
    <svg 
      width="20" 
      height="17" 
      viewBox="0 0 20 17" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="19.5801" y1="1.17982" x2="0.253662" y2="1.17982" stroke="white" strokeWidth="1.4639"/>
      <line x1="19.5801" y1="8.49931" x2="0.253662" y2="8.4993" stroke="white" strokeWidth="1.4639"/>
      <line x1="19.5801" y1="15.8188" x2="0.253662" y2="15.8188" stroke="white" strokeWidth="1.4639"/>
    </svg>
  )
} 