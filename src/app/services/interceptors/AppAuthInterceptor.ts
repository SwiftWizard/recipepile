import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppAuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem("user")){
            const authReq = req.clone( 
                {
                    headers: req.headers.set(
                        'Authorization',
                        "Bearer " +(JSON.parse(localStorage.getItem("user")!)).jwt
                    )
                }
            );
            req = authReq;
        }

        return next.handle(req);
    }
} 