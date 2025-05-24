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

/* constructor(name:string,flag:string,alt:string, independent?:boolean,
  language?:string[], currency?:string[], population?:number,
  capital?:string, area?:string , car_side?:string,
  continent?:string ){
    this.id = ID.newId();  
    this.name = name;
    this.flag = flag;
    this.alt = alt;
    this.independent = independent;
    this.language = language;
    this.currency = currency;
    this.population = population;
    this.capital = capital;
    this.area = area;
    this.car_side = car_side;
    this.continent = continent 
  } */
 
  /*   this.independent = independent;
    this.language = language;
    this.currency = currency;
    this.population = population;
    this.capital = capital;
    this.area = area;
    this.car_side = car_side;
    this.continent = continent */