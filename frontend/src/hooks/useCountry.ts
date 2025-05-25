import CountryCollection from "@/core/CountryCollection";
import { useEffect, useState } from "react";

export default function useCountry(initialData: any[] = []){
  const repo = new CountryCollection();
  const [countries, setCountries] = useState<any[]>(initialData ?? []);
  const[isLoading,setIsLoading] = useState(initialData?.length === 0);
  const [search, setSearch] = useState('')
  const [filterContinent, setFilterContinent] = useState('All')
  
   useEffect(() => {
    if (initialData.length === 0) {
      fetchData()
    }
  }, []);
  
  async function fetchData() {
    try {
     const result = await repo.getAll(); 
     setCountries(result)
    } catch (err) {
      console.error('Failed to fetch countries:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    countries,
    isLoading,
    search,
    setSearch,
    filterContinent,
    setFilterContinent,
  }
}
