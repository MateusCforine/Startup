import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
})
export class CadastroComponent {
  email = '';
  telefone = '';
  senha = '';
  confirma = '';
  mostrar1 = false;
  mostrar2 = false;

  constructor(private auth: AuthService, private router: Router) {}

  get ok(): boolean {
    return (
      this.email.includes('@') &&
      this.telefone.length >= 8 &&
      this.senha.length >= 4 &&
      this.senha === this.confirma
    );
  }

  criarConta() {
    if (!this.ok) return;
    this.auth
      .register({ email: this.email, password: this.senha, telefone: this.telefone })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.showAutoDismissNotice('Conta criada com sucesso!');
            this.router.navigate(['/feed']);
          } else {
            alert(res.message || 'Nao foi possivel criar a conta.');
          }
        },
        error: (err) => {
          console.error(err);
          const message = err?.error?.message || 'Erro ao criar conta. Tente novamente.';
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
}
