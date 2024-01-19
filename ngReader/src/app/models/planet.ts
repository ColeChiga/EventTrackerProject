import { Star } from "./star";

export class Planet {
  id:number;
  name:string;
  about:string;
  imageUrl:string;
  age:string;
  lifetime:string;
  star:Star[]|null;
  enabled:boolean;
  solarMasses:number;
  luminosity:number;
  radius:number;

constructor(
  id:number=0,
  name:string='',
  about:string='',
  imageUrl:string='',
  age:string='',
  lifetime:string='',
  star:Star[]|null,
  solarMasses:number=0,
  enabled:boolean,
  luminosity:number=0,
  radius:number=0
){
  this.id=id;
  this.name=name;
  this.about=about;
  this.imageUrl=imageUrl;
  this.age=age;
  this.lifetime=lifetime;
  this.star=star;
  this.solarMasses=solarMasses;
  this.luminosity=luminosity;
  this.radius= radius;
  this.enabled=enabled;
}

}
