import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { StarTypesComponent } from './components/star-types/star-types.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConstellationsComponent } from './components/constellations/constellations.component';
import { SatellitesComponent } from './components/satellites/satellites.component';


export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'starTypes', component: StarTypesComponent},
  {path: 'starTypes/:starTypeId', component: StarTypesComponent},
  {path: 'planets', component: PlanetsComponent},
  {path: 'home/:starId', component: HomeComponent},
  {path: 'planets/:planetId', component: PlanetsComponent},
  {path: 'constellations', component: ConstellationsComponent},
  {path: 'constellations/:constellationId', component: ConstellationsComponent},
  {path: 'satellites', component: SatellitesComponent},
  {path: 'satellites/:satellitesId', component: SatellitesComponent},
  {path: '**', component: NotFoundComponent},
];
