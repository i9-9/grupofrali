import React from 'react'

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#151714]"></div>
        <p className="text-[#151714] font-archivo">Cargando...</p>
      </div>
    </div>
  )
}
