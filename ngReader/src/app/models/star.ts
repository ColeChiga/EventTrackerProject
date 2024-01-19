import { StarType } from './star-type';
import { Constellation } from './constellation';
import { Planet } from './planet';
export class Star {
  id:number;
  name:string;
  about:string;
  imageUrl:string;
  age:string;
  lifetime:string;
  constellation:Constellation|null;
  starType:StarType|null;
  planets:Planet[]|null;
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
  constellation:Constellation|null,
  starType:StarType|null,
  planets:Planet[]|null,
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
  this.constellation=constellation;
  this.starType=starType;
  this.planets=planets;
  this.solarMasses=solarMasses;
  this.luminosity=luminosity;
  this.radius= radius;
  this.enabled=enabled;
}

}
