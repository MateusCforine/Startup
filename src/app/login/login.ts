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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get valido(): boolean {
    const emailOk =
      this.email.includes('@') &&
      this.email.includes('.') &&
      this.email.length >= 5;

    const senhaOk = this.senha.length >= 4;

    return emailOk && senhaOk;
  }

  entrar() {
    if (!this.valido) {
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/feed']);
        } else {
          alert(res.message || 'E-mail ou senha inválidos.');
        }
      },
      error: () => {
        alert('Erro ao verificar usuário (e simulação falhou).');
      }
    });
  }

  esqueciSenha() {
    // Aqui você pode depois redirecionar para uma tela de recuperação de senha
    alert('Funcionalidade de recuperação de senha ainda não está disponível.');
  }

  goCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
