import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  titulo = 'Onde o sabor\nune pessoas';
  subtitulo = 'Aproveite seu tempo livre com nós';

  email = '';
  senha = '';
  mostrarSenha = false;

  constructor(private authService: AuthService, private router: Router) {}

  get valido() {
    return this.email.includes('@') && this.senha.length >= 4;
  }

  entrar() {
    // Prefer backend login (checks email+senha). If backend is unreachable, fallback to localStorage simulation.
    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        if (res.success) {
          alert(`Login de: ${this.email}`);
          this.router.navigate(['/feed']);
        } else {
          alert('Credenciais inválidas.');
        }
      },
      error: (err) => {
        // fallback simulation: check localStorage 'sim_users'
        try {
          const users = JSON.parse(localStorage.getItem('sim_users') || '[]');
          const ok = users.some((u: any) => u.email === this.email && u.password === this.senha);
          if (ok) {
            alert('Login (simulado) bem-sucedido');
            this.router.navigate(['/feed']);
            return;
          }
        } catch (e) {
          // ignore
        }
        alert('Erro ao verificar usuário (e simulação falhou).');
      }
    });
  }

  goCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
