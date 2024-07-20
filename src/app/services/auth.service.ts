import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { User } from '../interfaces/user';
import { select, Store } from '@ngrx/store';
import { UserState } from '../states/user/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';
  // user$: Observable<User | null>;

  // constructor(private http: HttpClient, private store: Store<UserState>) {
  //   this.user$ = store.pipe(select('user'));
  // }

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          // localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.payload.id,
      fullName: decodedToken.payload.fullName,
      email: decodedToken.payload.email,
      roles: decodedToken.payload.role || [],
    };

    // this.user$.subscribe((user) => {
    //   console.log('Current User:', user);
    // });

    return userDetail;
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  private getToken = (): string | null =>
    localStorage.getItem(this.tokenKey) || '';
}
