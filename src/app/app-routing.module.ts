import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/countries/countries.component';
import { DetailComponent } from './components/detail/detail.component';


const routes: Routes =  [
  {path : '' , component : HomeComponent},
  {path : 'detail/:name/:compare' , component : DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
