/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Country{
  id:string
  name:string
  flag:string
  alt:string
  independent:boolean
  capital:string
  area:string
  population:string
  continent:string
  car_side:string
  language?:any[]
  currency?: any[];

  constructor(id:string,name:string,flag:string,alt:string,independent:boolean,capital:string,
    area:string,population:string,continent:string,car_side:string,language?:any[],
    currency?: any[]
  ){
    this.id = id;  
    this.name = name;
    this.flag = flag;
    this.alt = alt;
    this.independent = independent
    this.capital = capital
    this.area = area
    this.population = population
    this.continent = continent ?? "Unknown"
    this.car_side = car_side
    this.language = language
    this.currency = currency
  }
}
