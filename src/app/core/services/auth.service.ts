import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../models/interfaces/CustomJwtPayload';
import { OtpVerifyResponse } from '../models/interfaces/OtpVerify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api/v1';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {
    const token = this.tokenService.getToken();
    const roleId = this.tokenService.getUserRole(); // Ensure this returns a value or null
    if (token) {
      this.loggedInSubject.next(true);
      if (roleId) {
        this.roleSubject.next(roleId);
      }
    }
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', data, {
      withCredentials: true,
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }

  roleId: string  = '66d9ab068a338412b1f38c7c';

  otpVerify(data: any): Observable<OtpVerifyResponse> {
    return this.http.post<OtpVerifyResponse>(this.apiUrl + '/auth/verify-otp', data, {
      withCredentials: true,
    }).pipe(
      tap(response => {
        this.setLoggedIn(true);
        this.tokenService.addToken(response.data.accessToken);
        this.tokenService.setUserRole(response.data.user.roleId);
        this.roleSubject.next(response.data.user.roleId);
      })
    );
  }

  isLoggedIn() {
    return this.loggedInSubject.value;
  }

  isAdmin() {
    return this.roleSubject.value === '66d9ab068a338412b1f38c7c';
  }

  isAuthenticated() {
    return this.tokenService.getToken();
  }

  isNotAuthenticated() {
    return this.tokenService.removeToken();
  }
  logout(): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.tokenService.removeToken();
          this.loggedInSubject.next(false);
          this.roleSubject.next(null);
        })
      );
  }
  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }
}
