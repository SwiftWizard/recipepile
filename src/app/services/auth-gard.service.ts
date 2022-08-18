import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { NewRecipeComponent } from '../components/new-recipe/new-recipe.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.auth.isAuthenticated()){
      this.router.navigateByUrl("/");
      this.messageService.add({
        severity: "warn",
        summary: "You need to be logged in to view that page!"
      });
      return false;
    }
    return true;
  }
}
