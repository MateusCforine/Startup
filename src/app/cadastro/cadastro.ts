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
            alert('Conta criada com sucesso!');
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
}
