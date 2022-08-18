import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagecarouselComponent } from './components/landing-pagecarousel/landing-pagecarousel.component';
import { LoginComponent } from './components/login/login.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGardService as AuthGard } from './services/auth-gard.service';


 
const routes: Routes = [
  { path: '', component: LandingPagecarouselComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'recipes/new', component: NewRecipeComponent, canActivate: [AuthGard]},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
