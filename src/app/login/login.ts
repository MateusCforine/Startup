import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  titulo = 'Onde o sabor\nune pessoas';
  subtitulo = 'Aproveite seu tempo livre com nos';

  email = '';
  senha = '';
  mostrarSenha = false;

  recuperando = false;
  modoRecuperacao: 'email' | 'celular' = 'email';
  emailRecuperacao = '';
  celularRecuperacao = '';

  constructor(private authService: AuthService, private router: Router) {}

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
      next: () => {
        this.showAutoDismissNotice('Login realizado com sucesso!');
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        const message = err?.error?.message || 'E-mail ou senha invalidos.';
        alert(message);
      },
    });
  }

  private showAutoDismissNotice(message: string) {
    if (typeof document === 'undefined') {
      console.log(message);
      return;
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '16px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 20px';
    toast.style.background = '#323232';
    toast.style.color = '#fff';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Abrir fluxo de recuperacao por e-mail (senha)
  esqueciSenha() {
    this.recuperando = true;
    this.modoRecuperacao = 'email';
    this.emailRecuperacao = this.email;
    this.celularRecuperacao = '';
  }

  // Abrir fluxo de recuperacao por celular (caso esqueceu e-mail)
  esqueciEmail() {
    this.recuperando = true;
    this.modoRecuperacao = 'celular';
    this.celularRecuperacao = '';
  }

  enviarRecuperacao() {
    if (this.modoRecuperacao === 'email') {
      if (
        !this.emailRecuperacao ||
        !this.emailRecuperacao.includes('@') ||
        !this.emailRecuperacao.includes('.')
      ) {
        alert('Digite um e-mail de recuperacao valido.');
        return;
      }

      alert(`Link de recuperacao enviado para o e-mail: ${this.emailRecuperacao}`);
    } else {
      const soDigitos = this.celularRecuperacao.replace(/\D/g, '');
      if (soDigitos.length < 10) {
        alert('Digite um numero de celular valido com DDD.');
        return;
      }

      alert(`Codigo de recuperacao enviado para o celular: ${this.celularRecuperacao}`);
    }

    this.recuperando = false;
  }

  goCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
