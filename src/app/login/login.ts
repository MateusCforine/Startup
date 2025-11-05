import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  recuperando = false;
  emailRecuperacao = '';

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
    if (!this.valido) return;

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
        alert('Erro ao verificar usuário.');
      }
    });
  }

  esqueciSenha() {
    this.recuperando = true;
    this.emailRecuperacao = this.email;
  }

  enviarRecuperacao() {
    if (
      !this.emailRecuperacao ||
      !this.emailRecuperacao.includes('@') ||
      !this.emailRecuperacao.includes('.')
    ) {
      alert('Digite um e-mail de recuperação válido.');
      return;
    }

    alert(
      `Se este fosse o sistema real, enviaríamos um link de recuperação para: ${this.emailRecuperacao}`
    );
    this.recuperando = false;
  }

  goCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
