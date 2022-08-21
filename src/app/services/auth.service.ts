import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../model/authentication-request';
import { DataWithMessages } from '../model/data-with-messages';
import { UserPost } from '../model/user-post';
import { UserSlim } from '../model/user-slim';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private user?: UserSlim;
  private userSource: Subject<UserSlim | null> = new Subject();

  private apiUrl = environment.backend.baseURL;

  private loginUrl: string = "/api/auth/login";
  private registerUrl: string = "/api/auth/register";

  constructor(private httpClient: HttpClient, private messageService: MessageService, private router: Router){
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        this.setUser(this.user!);
      }
    });
  }

  isAuthenticated(): Boolean{
    return this.user != null;
  }

  public getUser(): Observable<UserSlim | null>{
    if(!this.user && localStorage.getItem("user")){
      this.user = JSON.parse(localStorage.getItem("user")!);
    }
    return this.userSource.asObservable();
  }

  private setUser(user: UserSlim | null){
    this.userSource.next(user);
  }

  register(newUser: UserPost){
    let observableData = this.httpClient.post<DataWithMessages<UserSlim, string[]>>(`${this.apiUrl}${this.registerUrl}`, newUser);

    observableData.subscribe({
      next: data => {this.handleSuccessfullRegistration(data)},
      error: error => {this.handleFaildRegistration(error)}
    });
  }

  private handleSuccessfullRegistration(data: DataWithMessages<UserSlim, string[]>){
    this.messageService.addAll(data.messages!.map(function(msgString :string){
      return {
        severity: 'info',
        summary: msgString
      }
    }));

    this.router.navigateByUrl("/");
  }

  private handleFaildRegistration(data: any){
    this.messageService.addAll(data.error.messages!.map(function(msgString: string){
      return {
        severity: 'error',
        summary: msgString
      }
    }));
  }
  
  login(authenticationRequest: AuthenticationRequest){
    let observableData =  this.httpClient.post<DataWithMessages<UserSlim, string[]>>(`${this.apiUrl}${this.loginUrl}`, authenticationRequest);
    
    observableData.subscribe({
      next: data => {
        this.handleSuccessfullLogin(data);
      },
      error: error => {
        this.handleFaildLogin(error)
      }
    });
  }

  logout(){
    this.messageService.add({
      severity: "info",
      summary: "Logging out. We will miss you " + this.user?.name
    });

    this.setUser(null);
    localStorage.clear();

    this.router.navigateByUrl("/");
  }

  private handleSuccessfullLogin(data: DataWithMessages<UserSlim, string[]>){
    this.setUser(data.data!);
    this.user = data.data;
    localStorage.setItem('user', JSON.stringify(data.data));

    this.messageService.addAll(data.messages!.map(function(msgString :string){
      return {
        severity: 'info',
        summary: msgString
      }
    }));

    this.router.navigateByUrl("/");
  }

  private handleFaildLogin(data: any){
    this.messageService.addAll(data.error.messages!.map(function(msgString: string){
      return {
        severity: 'error',
        summary: msgString
      }
    }));

    this.setUser(null);
  }
}