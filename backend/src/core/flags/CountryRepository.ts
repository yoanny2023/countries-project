/* eslint-disable @typescript-eslint/no-explicit-any */
import Country from "./Country";

export default class CountryRepo{
   static async getFlagsApi(){
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,capital,continents,currencies,languages,population,independent,car,area");
      const countries = await response.json();
      
      const allCountries = countries.map((country:any)=>{
    
      const languageArray = country.languages ? Object.values(country.languages) : [];

      const currencyArray = country.currencies
         ? Object.values(country.currencies).map((c: any) => `${c.name} (${c.symbol})`): [];

        return new Country(
         country.cca3,
         country.name.common,
         country.flags.svg,
         country.flags.alt ?? `${country.name.common} flag`,
         country.independent,
         country.capital[0],
         country.area,
         country.population,
         country.continents[0],
         country.car.side,
         languageArray,
         currencyArray
      ) 
      })
      return allCountries;
   }
   static async getAllFlags(){
      const data = await this.getFlagsApi();
      return data;
   }
}