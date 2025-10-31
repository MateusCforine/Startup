import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-procurar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './procurar.html',
  styleUrls: ['./procurar.css']
})
export class ProcurarComponent {
  termo = '';
  tags = ['#Japa', '#receita', '#comida', '#fitness', '#carne', '#receitafacil', '#viral', '#lanche', '#tbt'];

  private API = 'http://localhost:3001/api';

  // Sugestões base e resultados da pesquisa
  sugestoesBase = [
    { titulo: 'Outback', img: '/Outback.jpeg', meta: '53.2K' },
    { titulo: 'Corbucci', img: '/Corbucci.jpeg', meta: '20.1K', play: true },
    { titulo: 'Masterchef', img: '/masterchef.png', meta: '20.1K' },
  ];
  sugestoes = [...this.sugestoesBase];

  resultados: Array<{ titulo: string; img: string; meta?: string }> = [];
  loading = false;

  constructor(private http: HttpClient) {}

  pesquisar() {
    const q = this.termo.trim().toLowerCase();
    // Filtro local nas sugestões
    this.sugestoes = q
      ? this.sugestoesBase.filter((s) => s.titulo.toLowerCase().includes(q))
      : [...this.sugestoesBase];

    // Busca no backend por autor/tag quando houver termo
    this.resultados = [];
    if (!q) return;
    this.loading = true;
    this.http
      .get<any[]>(`${this.API}/posts`, { params: { q } })
      .subscribe({
        next: (items) => {
          this.resultados = (items || []).map((p) => ({
            titulo: p.autor || p.tag || 'Post',
            img: p.img,
            meta: `${p.likes ?? 0} likes`,
          }));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
