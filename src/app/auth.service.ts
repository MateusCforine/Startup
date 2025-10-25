import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'sim_users';

  // Check if an email is registered (simulated locally)
  checkUser(email: string): Observable<{ exists: boolean }> {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const exists = users.some((u: any) => u.email === email);
      return of({ exists });
    } catch (e) {
      return of({ exists: false });
    }
  }

  // Register a user in localStorage (simulation)
  register(data: { email: string; password: string; telefone?: string }): Observable<{ success: boolean; message?: string }> {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const existing = users.find((u: any) => u.email === data.email);
      if (existing) {
        return of({ success: false, message: 'Usuário já cadastrado.' });
      }
      users.push({ email: data.email, password: data.password, telefone: data.telefone });
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return of({ success: true });
    } catch (e) {
      return of({ success: false, message: 'Erro ao registrar (simulado).' });
    }
  }

  // Login against localStorage users (simulation)
  login(email: string, password: string): Observable<{ success: boolean; message?: string }> {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const ok = users.some((u: any) => u.email === email && u.password === password);
      return of(ok ? { success: true } : { success: false, message: 'Credenciais inválidas.' });
    } catch (e) {
      return of({ success: false, message: 'Erro ao autenticar (simulado).' });
    }
  }
}
