import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './conta.html',
  styleUrls: ['./conta.css']
})
export class ContaComponent implements OnInit {
  usuario = {
    nome: 'Sarahh',
    amigos: 13,
    posts: 0,
    status: '',
    foto: '/assets/prints/conta.jpeg',
    aniversario: '25/06/1995'
  };

  editando = false;
  seusPosts: Array<{ img: string; autor: string; tag?: string; likes?: number }> = [];
  private API = 'http://localhost:3001/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    try {
      const raw = localStorage.getItem('perfil_usuario');
      if (raw) this.usuario = { ...this.usuario, ...JSON.parse(raw) };
    } catch {}
  }

  ngOnInit(): void {
    this.carregarSeusPosts();
  }

  salvar() {
    this.persistPerfil();
    this.showAutoDismissNotice('Perfil atualizado!');
    this.editando = false;
  }

  confirmarNome() {
    const nome = (this.usuario.nome || '').trim();
    if (!nome) {
      this.showAutoDismissNotice('Aviso: informe um nome antes de confirmar.');
      return;
    }
    this.usuario.nome = nome;
    this.persistPerfil();
    this.showAutoDismissNotice('Aviso: nome atualizado!');
  }

  confirmarDescricao() {
    const descricao = (this.usuario.status || '').trim();
    this.usuario.status = descricao;
    this.persistPerfil();
    this.showAutoDismissNotice(descricao ? 'Aviso: descricao atualizada!' : 'Aviso: descricao removida!');
  }

  trocarFoto(input: HTMLInputElement) {
    const f = input.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    this.usuario.foto = url;
  }

  private carregarSeusPosts() {
    const nome = this.usuario.nome;
    this.seusPosts = [];

    this.http
      .get<any[]>(`${this.API}/posts`, { params: { q: nome } })
      .subscribe({
        next: (items: any[]) => {
          const arr = (items || []).filter((p: any) => p.autor === nome);
          this.seusPosts = arr.map((p: any) => ({
            img: p.img,
            autor: p.autor,
            tag: p.tag,
            likes: p.likes
          }));
          this.usuario.posts = this.seusPosts.length;
        },
        error: () => {},
      });
  }

  sair() {
    this.showAutoDismissNotice('Voce saiu da conta.');
    this.router.navigate(['/']);
    // Se for '/login', use:
    // this.router.navigate(['/login']);
  }

  private persistPerfil() {
    try {
      localStorage.setItem('perfil_usuario', JSON.stringify(this.usuario));
    } catch {}
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
