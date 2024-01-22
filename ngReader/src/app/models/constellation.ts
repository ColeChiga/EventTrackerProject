import { Star } from "./star";

export class Constellation {

  id:number;
  name:string;
  about:string;
  imageUrl:string;
  enabled:boolean;
  stars:Star[]|null;

constructor(
  id:number=0,
  name:string='',
  about:string='',
  imageUrl:string='',
  enabled:boolean=false,
  stars:Star[]|null=null
){
  this.id=id;
  this.name=name;
  this.about=about;
  this.imageUrl=imageUrl;
  this.enabled=enabled
  this.stars=stars;
}
}
