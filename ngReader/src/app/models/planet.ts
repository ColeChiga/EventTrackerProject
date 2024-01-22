import { Satellite } from "./satellite";
import { Star } from "./star";

export class Planet {
  id:number;
  name:string;
  about:string;
  imageUrl:string;
  mass:string;
  orbitRadius:number;
  orbitCircumferance:number;
  star:Star|null;
  enabled:boolean;
  satellites:Satellite[];
  radius:number;

constructor(
  id:number=0,
  name:string='',
  about:string='',
  imageUrl:string='',
  mass:string='',
  orbitalRadius:number=0,
  orbitalCircumferance:number=0,
  star:Star|null=null,
  satellites:Satellite[]=[],
  enabled:boolean=false,
  radius:number=0
){
  this.id=id;
  this.name=name;
  this.about=about;
  this.imageUrl=imageUrl;
  this.mass=mass;
  this.orbitRadius=orbitalRadius;
  this.orbitCircumferance=orbitalCircumferance;
  this.star=star;
  this.satellites=satellites;
  this.radius= radius;
  this.enabled=enabled;
}

}
