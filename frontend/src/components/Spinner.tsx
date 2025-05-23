import React from 'react'

function Spinner() {
  return (
    <div className='flex justify-center items-center mt-3 '>
      <div className="w-40 h-40 rounded-full 
        border-t border-teal-500 animate-spin">
      </div>
    </div>
  )
}

export default Spinner
