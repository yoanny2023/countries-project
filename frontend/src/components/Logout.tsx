import React from 'react'
import Button from './Button'
import CountryCollection from '@/core/CountryCollection'

function Logout() {

  function handleLogut(){
    CountryCollection.logoutHandler();
  }

  return (
   <Button text='Logout' className='bg-red-600 hover:bg-red-700' onClick={handleLogut} />
  )
}

export default Logout
