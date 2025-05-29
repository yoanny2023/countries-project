"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Logout from '@/components/Logout';
import Pagina from '@/components/Pagina'
import Spinner from '@/components/Spinner';
import CountryCollection from '@/core/CountryCollection';
import useCountry from '@/hooks/useCountry';
import { GetStaticProps } from 'next';
import Image from 'next/image'; 
import Link from 'next/link';
import React from 'react'


export const getStaticProps:GetStaticProps = async ()=>{
  const repo = new CountryCollection();
  const countries = await repo.getAll(); 

  if (countries.error) {
  return {
    props: {
      initialCountries: []
    }
  };
}

  return {
    props:{initialCountries:countries}
  }
} 

type Country = {
  id: string;
  name: string;
  flag: string;
  continent: string;
};

function PaginaFlag({initialCountries}:{initialCountries:Country[]}) {
  const {countries,isLoading, search,setSearch, filterContinent, setFilterContinent} = useCountry(initialCountries ?? []);

    const filteredCountries = Array.isArray(countries) ? countries.filter( c => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterContinent === 'All' || c.continent === filterContinent)
    )
  }) : []
  
  function generateCountry(){
    return (filteredCountries?.map((country) => {
      return (
        <li key={country.id} className='flex flex-col gap-2 
          bg-black/10 border border-teal-800 shadow-lg shadow-teal-800/10 hover:shadow-teal-500/40 rounded-xl p-4
          transition-all duration-75 hover:scale-[1.02] hover:border-teal-400 hover:bg-teal-700/10
          '>
          <Link href={`/flags/${country.id}`} className='flex flex-col justify-center items-center cursor-pointer'>
          <div className="relative w-[100px] aspect-[100/50]">
            <Image
              src={country.flag}
              alt={`${country.name} flag`}
              fill
              className="object-contain"
              priority
              sizes="100px"
            />
          </div>
          <p className='text-lg font-bold text-white/80 drop-shadow-md text-center'>
            {country.name}
          </p>
          </Link>
        </li>
      )
    }))
  }

  return (
  <Pagina>
    <div className='z-0 relative mt-64 flex flex-col justify-center items-center md:px-12 gap-5'>
      <div className='z-10 fixed top-12 inset-x-0 px-4 sm:px-12 max-w-screen-sm mx-auto flex flex-col justify-center items-center w-full mb-3
       bg-black/70 pb-3 rounded-xl'>
        <div className='self-end'>
          <Logout />
        </div>
        <div className='flex flex-col justify-center items-center gap-3'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-center
          bg-gradient-to-b from-white to-teal-500 text-transparent bg-clip-text
          '> All countries flags
          </h1>
          <div className='flex flex-col sm:flex sm:flex-row gap-3 justify-center items-center
          '>
            <input
              type='text'
              placeholder='Search by country'
              className='p-2 inline-block rounded bg-zinc-800 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-600 '
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className='p-2 inline-block rounded bg-zinc-800 text-zinc-200 
              border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-600 '
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
            >
              <option value='All'>All Continents</option>
              <option value='Africa'>Africa</option>
              <option value='Asia'>Asia</option>
              <option value='Europe'>Europe</option>
              <option value='North America'>North America</option>
              <option value='South America'>South America</option>
              <option value='Oceania'>Oceania</option>
            </select>  
          </div>
        </div>
      </div>
      
      <div>     
        {isLoading ? <Spinner /> 
        : (
           filteredCountries.length === 0 && !isLoading ? (
            <p className="text-center text-zinc-300 mt-4">
              No countries match your search.
            </p>
          ) : (
          <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
            {generateCountry()}
          </ul>)
        )
        }
      </div>
    </div>
  </Pagina>
  )
}

export default PaginaFlag;
