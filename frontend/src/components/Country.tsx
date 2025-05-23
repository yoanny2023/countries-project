"use client"
import React from 'react'
import Pagina from './Pagina'
import Image from 'next/image'
import Button from './Button'
import { useRouter } from 'next/router'

interface CountryProps{
  country:any
}

function Country({ country }: CountryProps) {
 console.log("country:",country);
  const languageArray:string[] = country.languages ? Object.values(country.languages) : [];
  const formattedLanguage = languageArray.join(",");

  const currencyArray = country.currencies
         ? Object.values(country.currencies).map((c: any) => `${c.name} (${c.symbol})`): [];
  
  const router = useRouter();
  function goBackButton(){
    router.back();
  }

  return (
    <Pagina >
      <h1 className='mb-5 bg-gradient-to-b from-white to-teal-500 text-transparent bg-clip-text'>Country: {country.name.common}</h1>
      <div className='grid grid-cols-3 gap-3 flex-1 mx-11'>
        <div className='self-start flex flex-col gap-2 text-lg
         mt-7 text-zinc-400 p-5 rounded-lg bg-zinc-900 
         border border-teal-600 shadow-lg shadow-teal-500/40
        transition-transform duration-500 hover:scale-[1.02] hover:bg-black/60
        rotate-12 hover:rotate-0 
        '>
          <span>Capital: {country.capital[0]}</span>
          <span className='text-green-500 break-words whitespace-normal w-full'>
            <strong className="text-zinc-400">Language:</strong> {formattedLanguage}
          </span>
          <span>Population: {country.population}</span>
          <span>Area: {country.area}</span>
          <Button text='Back' onClick={goBackButton} />
        </div>
        <div className='flex flex-col gap-3 justify-center items-center 
        bg-zinc-900 shadow-lg rounded-lg shadow-teal-500/40 p-3
        border border-teal-600 transition-transform duration-500 
        hover:scale-[1.02] hover:bg-black/60'>
         <Image src={country.flags.svg} width={300} priority height={200} alt={`Flag of ${country.name.common}`}
            className='rounded-md'
          style={{height:"auto"}} />
          <span className='text-2xl text-zinc-400'>{country.name.common}</span>
        </div>
        <div className='self-end flex flex-col gap-2
         text-lg mb-7 text-zinc-400 p-5 rounded-lg shadow-lg shadow-teal-500/40
         bg-zinc-900 border border-teal-600
         transition-transform duration-500 hover:scale-[1.02] hover:bg-black/60 
         -rotate-12 hover:rotate-0 
         '>
          <span>Currency: {currencyArray}</span>
          <span>Driving side: {country.car.side}</span>
          <span>Continent: {country.continents}</span>
          <span className={country.independent ? "text-green-500" : "text-red-500"}>
            <strong className='text-zinc-400'>Independent:</strong> {country.independent ? "Yes" :"No"}
          </span> 
        </div> 
    </div>
    </Pagina>
   
  )
}

export default Country
