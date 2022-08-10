import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagecarouselComponent } from './landing-pagecarousel/landing-pagecarousel.component';

import { LoginComponent  } from './login/login.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
 
const routes: Routes = [
  { path: '', component: LandingPagecarouselComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'recipes/new', component: NewRecipeComponent},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
