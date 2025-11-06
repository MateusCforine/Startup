import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  checkUser(email: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.API}/check-user`, { email });
  }

  register(data: { email: string; password: string; telefone?: string }): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(`${this.API}/register`, data);
  }

  login(email: string, password: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(`${this.API}/login`, { email, password });
  }
}
