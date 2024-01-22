import { Planet } from "./planet";

export class Satellite {
  id:number;
  name:string;
  about:string;
  imageUrl:string;
  natural:boolean;
  orbitRadius:number;
  orbitCircumferance:number;
  planet:Planet|null;
  enabled:boolean;

constructor(
  id:number=0,
  name:string='',
  about:string='',
  imageUrl:string='',
  natural:boolean=false,
  orbitalRadius:number=0,
  orbitalCircumferance:number=0,
  planet:Planet|null=null,
  enabled:boolean=false
){
  this.id=id;
  this.name=name;
  this.about=about;
  this.imageUrl=imageUrl;
  this.natural=natural;
  this.orbitRadius=orbitalRadius;
  this.orbitCircumferance=orbitalCircumferance;
  this.planet=planet;
  this.enabled=enabled;
}

}
