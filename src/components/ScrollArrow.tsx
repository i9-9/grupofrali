"use client";

import DownArrowIcon from "@/components/icons/DownArrowIcon";

export default function ScrollArrow() {
  const handleClick = () => {
    const nextSection = document.getElementById('desarrollo-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-16 left-0 right-0 z-20 pointer-events-none">
      <div className="w-full mx-auto" style={{ paddingLeft: 'clamp(1rem, 0.4vw, 1.5rem)', paddingRight: 'clamp(1rem, 0.4vw, 1.5rem)' }}>
        <button 
          className="absolute right-6 text-white cursor-pointer hover:opacity-70 transition-opacity duration-300 pointer-events-auto"
          onClick={handleClick}
          aria-label="Desplazarse a la siguiente sección"
        >
          <DownArrowIcon />
        </button>
      </div>
    </div>
  );
}
