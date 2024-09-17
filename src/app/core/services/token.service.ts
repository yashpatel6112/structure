import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  addToken(accessToken: string): boolean {
    localStorage.setItem('accessToken', accessToken);
    return true;
  }
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  removeToken(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleId');
  }
  getUserRole(): string | null {
    return localStorage.getItem('roleId');
  }
  setUserRole(roleId: string): void {
    localStorage.setItem('roleId', roleId);
  }
}
