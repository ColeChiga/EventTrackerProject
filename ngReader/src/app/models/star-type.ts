import { Star } from "./star";

export class StarType {
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
  stars:Star[]|null=null,
){
  this.id=id;
  this.name=name;
  this.about=about;
  this.imageUrl=imageUrl;
  this.stars=stars;
  this.enabled=enabled
}

}
