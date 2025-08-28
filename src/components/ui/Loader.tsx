import React from 'react'

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-[#EBEBEB] z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="font-baskerville text-[#151714] text-4xl md:text-6xl tracking-[0.2em] animate-scale-slow">
          GRUPO FRALI
        </h1>
      </div>
    </div>
  )
}
