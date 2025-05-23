import Country from '@/components/Country';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'

export const getStaticPaths:GetStaticPaths = async ()=>{
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,capital,continents,currencies,languages,population,independent,car,area");
    if(!res.ok){
      throw new Error("Failed to fetch countries list")
    }
   const data = await res.json();
   const paths = data.map((country: any) => {
    return {
      params: { 
        countryId: country.cca3
       } 
  }});

   return {
    paths,
    fallback: false,
  }; 

  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths:[],
      fallback: false,
  };
  }
}

export const getStaticProps:GetStaticProps = async (context) => {
  const{countryId} = context.params!;
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`);

    if(!res.ok){
      throw new Error(`Failed to fetch data for country: ${countryId}`)
    }
    const data = await res.json();

    return {
      props: {
        country:data[0],
      }
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error)
    return {
      notFound:true
    };
  }
}

function countryId({ country }: { country: any }) {
  return (
    <div className='text-4xl font-semibold'>
      <Country country={country} />
    </div>
  )
}

export default countryId
