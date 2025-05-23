import React from 'react'

interface PaginaProps{
  children?:any
}

function Pagina(props:PaginaProps) {
  return (
    <div className={`flex flex-col justify-center items-center p-4 
      bg-gradient-to-b from-black via-teal-700/50 to-black min-h-screen text-white 
    `}>
      {props.children} 
    </div>
  )
}

export default Pagina;
