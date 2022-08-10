import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AuthenticationRequest } from '../model/authentication-request';
import { DataWithMessages } from '../model/data-with-messages';
import { UserSlim } from '../model/user-slim';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private user?: UserSlim | null = null;
  private userSource: Subject<UserSlim | null> = new Subject();

  private loginUrl: string = "api/auth/login";
  private registerUrl: string = "api/auth/register";

  constructor(private httpClient: HttpClient, private messageService: MessageService, private router: Router){}

  public getUser(): Observable<UserSlim | null>{
    return this.userSource.asObservable();
  }

  private setUser(user: UserSlim | null){
    this.userSource.next(user);
  }
  
  login(authenticationRequest: AuthenticationRequest){
    let observableData =  this.httpClient.post<DataWithMessages<UserSlim, string[]>>(this.loginUrl, authenticationRequest);
    
    observableData.subscribe({
      next: data => {
        this.handleSuccessfullLogin(data);
        localStorage.setItem("user", JSON.stringify(data.data));
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
  }

  private handleSuccessfullLogin(data: DataWithMessages<UserSlim, string[]>){
    localStorage.setItem('currentUser', JSON.stringify(data.data))
    this.messageService.addAll(data.messages!.map(function(msgString :string){
      return {
        severity: 'info',
        summary: msgString
      }
    }));

    this.user = data.data;
    this.setUser(data.data!);

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