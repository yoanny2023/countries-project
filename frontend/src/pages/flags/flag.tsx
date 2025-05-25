"use client"
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
  // Return empty data or redirect as needed
  return {
    props: {
      initialCountries: []
    },
  };
}
  return {
    props:{initialCountries:countries}
  }
} 

function paginaFlag({initialCountries}:{initialCountries:any[]}) {
  const {countries,isLoading, search, setSearch, filterContinent, setFilterContinent} = useCountry(initialCountries);

    const filteredCountries = countries?.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterContinent === 'All' || c.continent === filterContinent)
    )
  })

  function generateCountry(){
    return (filteredCountries?.map((country) => {
      return (
        <li key={country.id} className='flex flex-col gap-2 justify-center items-center
          bg-zinc-900 border border-teal-600 shadow-lg rounded-xl p-4
          transition-transform duration-500 hover:bg-black/40 hover:scale-[1.02] hover:shadow-teal-500/40
          '>
          <Link href={`/flags/${country.id}`} className='flex flex-col justify-center items-center cursor-pointer'>
          <Image 
          src={country.flag} 
          width={100} height={50}   
          alt={`${country.name} flag`}
          priority style={{ height: 'auto',width: '100px' }}
          />
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
    <div className='flex flex-col justify-center items-center gap-5 px-12 py-4'>
      <h1 className='text-4xl font-semibold text-center
      bg-gradient-to-b from-white to-teal-500 text-transparent bg-clip-text
      '>
        All countries flags
      </h1>
          <div className='flex gap-4 items-center'>
          <input
            type='text'
            placeholder='Search by country name'
            className='p-2 rounded bg-zinc-800 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-600 '
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className='p-2 rounded bg-zinc-800 text-zinc-200 
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

      {isLoading ? <Spinner />: (
      <ul className='grid grid-cols-4 gap-2'>
        {generateCountry()}
      </ul>
      )}
    </div>
  </Pagina>
  )
}

export default paginaFlag;
