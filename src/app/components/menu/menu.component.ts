import { Component, Injectable, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { NavigationStart, Route, Router } from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { Observable, Subscription, tap } from 'rxjs';
import { UserSlim } from '../../model/user-slim';
import { AuthService } from '../../services/auth.service';


@Injectable({
    providedIn: 'root'
  })
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

    public user: UserSlim | null = null;

    subscription?: Subscription;

    items: MenuItem[] = [];

    constructor(private authService: AuthService, private router: Router){
    }

    ngOnInit(){
        this.authService.getUser().subscribe({
            next: user => {
                this.user = user;
                this.populateMenu();
            }
        });
    }

    populateMenu(){
        this.items = [
            {
                label: 'Home',
                icon: PrimeIcons.HOME,
                routerLink: "/"
            },
            {
                label: 'Recipes',
                icon: PrimeIcons.BOOK,
                items: [
                    {
                        label: "Explore recipes",
                        icon: PrimeIcons.COMPASS,
                        routerLink: "recipes/explore"
                    },
                    {
                      label: "Top rated",
                      icon: PrimeIcons.STAR_FILL
                    },
                    {
                      label: "Most popular",
                      icon: PrimeIcons.CHART_LINE
                    },
                    {
                      label: "Add new recipe",
                      icon: PrimeIcons.PLUS_CIRCLE,
                      visible: this.user != null,
                      routerLink: "recipes/new"
                    }
                ]
            },
            {
                label: 'Categories',
                icon: PrimeIcons.MAP,
                items: [
                    {label: 'Explore categories', icon: PrimeIcons.SEARCH},
                    {label: 'Recomend new category', icon: PrimeIcons.PLUS_CIRCLE}
                ]
            },
            {
                label: 'Users',
                icon: PrimeIcons.USERS,
                items: [
                    {label: 'Find user', icon: PrimeIcons.SEARCH}
              ]
            },
            {
                label: "Register",
                icon: PrimeIcons.USER_PLUS,
                routerLink: "/register",
                visible: this.user == null,
                routerLinkActiveOptions: "active"
            },
            {
                label: "Login",
                icon: PrimeIcons.SIGN_IN,
                visible: this.user == null,
                routerLink: "/login",
                routerLinkActiveOptions: "active"
            },
            {
                label: "My profile",
                icon: PrimeIcons.USER,
                visible: this.user != null,
                items:[
                    {
                        label: 'Manage profile',
                        icon: PrimeIcons.COG,
                        routerLink: "/manageProfile",
                        routerLinkActiveOptions: "active"
                    },
                    {
                        label: 'Give us feedback',
                        icon: PrimeIcons.HEART_FILL,
                        routerLink: "/",
                        routerLinkActiveOptions: "active"
                    },
                    {
                        label: 'Logout',
                        icon: PrimeIcons.POWER_OFF,
                        command: (click) =>{this.authService.logout()}            
                    }
                ]
            }
        ];
    }
}