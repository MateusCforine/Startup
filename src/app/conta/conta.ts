import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu';

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

  salvar() {
    localStorage.setItem('perfil_usuario', JSON.stringify(this.usuario));
    this.editando = false;
  }

  trocarFoto(input: HTMLInputElement) {
    const f = input.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    this.usuario.foto = url;
  }

  constructor(private http: HttpClient) {
    try {
      const raw = localStorage.getItem('perfil_usuario');
      if (raw) this.usuario = { ...this.usuario, ...JSON.parse(raw) };
    } catch {}
  }

  ngOnInit(): void {
    this.carregarSeusPosts();
  }

  private carregarSeusPosts() {
    const nome = this.usuario.nome;
    this.seusPosts = [];
    // Busca por termo e filtra autor exato
    this.http
      .get<any[]>(`${this.API}/posts`, { params: { q: nome } })
      .subscribe({
        next: (items: any[]) => {
          const arr = (items || []).filter((p: any) => p.autor === nome);
          this.seusPosts = arr.map((p: any) => ({ img: p.img, autor: p.autor, tag: p.tag, likes: p.likes }));
          this.usuario.posts = this.seusPosts.length;
        },
        error: () => {},
      });
  }
}
