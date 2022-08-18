import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserSlim } from '../model/user-slim';
import { AuthenticationRequest } from '../model/authentication-request';
import { DataWithMessages } from '../model/data-with-messages';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.backend.baseURL;
}
