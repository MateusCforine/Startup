import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

type TipoMidia = 'foto' | 'video';

@Component({
  selector: 'app-criar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './criar.html',
  styleUrls: ['./criar.css']
})
export class CriarComponent {
  tipo: TipoMidia = 'foto';
  descricao = '';
  previewUrl: string | null = null;
  midiaFile: File | null = null;
  isDragging = false;

  private API = 'http://localhost:3001/api';
  constructor(private http: HttpClient, private router: Router) {}

  get accept(): string {
    return this.tipo === 'foto' ? 'image/*' : 'video/*';
  }

  trocarTipo(t: TipoMidia) {
    if (this.tipo === t) return;
    this.tipo = t;
    this.removerMidia();
  }

  onFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    this.carregarArquivo(file || null);
  }

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    this.isDragging = true;
  }
  onDragLeave() { this.isDragging = false; }
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    this.isDragging = false;
    const file = ev.dataTransfer?.files?.[0] ?? null;
    this.carregarArquivo(file);
  }

  private carregarArquivo(file: File | null) {
    if (!file) { this.removerMidia(); return; }
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (this.tipo === 'foto' && !isImage) return;
    if (this.tipo === 'video' && !isVideo) return;
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.midiaFile = file;
    this.previewUrl = URL.createObjectURL(file);
  }

  removerMidia() {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;
    this.midiaFile = null;
  }

  limpar() {
    this.descricao = '';
    this.removerMidia();
    this.tipo = 'foto';
  }

  publicar() {
    if (!(this.descricao.trim() || this.midiaFile)) return;
    // Recupera nome do perfil salvo (se existir)
    let autor = 'Você';
    try {
      const raw = localStorage.getItem('perfil_usuario');
      if (raw) {
        const perfil = JSON.parse(raw);
        if (perfil?.nome) autor = String(perfil.nome);
      }
    } catch {}
    const tag = this.descricao.trim()
      ? (this.descricao.includes('#') ? this.descricao : '#gusto')
      : '#gusto';

    const enviarPost = (imgUrl: string) => {
      this.http.post(`${this.API}/posts`, { autor, tag, img: imgUrl }).subscribe({
        next: () => {
          this.limpar();
          alert('Publicação enviada!');
          this.router.navigateByUrl('/conta');
        },
        error: () => {
          alert('Não foi possível publicar agora.');
        },
      });
    };

    if (this.midiaFile) {
      const fd = new FormData();
      fd.append('file', this.midiaFile);
      this.http.post<{ url: string; path: string }>(`${this.API}/upload`, fd).subscribe({
        next: (res) => enviarPost(res?.url || res?.path || '/gusto.jpg'),
        error: () => enviarPost('/gusto.jpg'),
      });
    } else {
      enviarPost('/gusto.jpg');
    }
  }
}
