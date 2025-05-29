/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface PaginaProps{
  children?:any
}

function Pagina(props:PaginaProps) {
  return (
    <div className={`flex flex-col justify-center items-center p-4 overflow-x-hidden 
      bg-gradient-to-b from-zinc-900 via-teal-700/40 to-zinc-950 min-h-screen text-white 
    `}>
      {props.children} 
    </div>
  )
}

export default Pagina;
