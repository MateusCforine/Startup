import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';

type TipoMidia = 'foto' | 'video';

@Component({
  selector: 'app-criar',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './criar.html',
  styleUrls: ['./criar.css']
})
export class CriarComponent {
  tipo: TipoMidia = 'foto'; // Define o tipo padrão como foto
  descricao = '';
  previewUrl: string | null = null;
  midiaFile: File | null = null;
  isDragging = false;

  // Define o tipo de arquivo aceito de acordo com a mídia selecionada
  get accept(): string {
    return this.tipo === 'foto' ? 'image/*' : 'video/*';
  }

  // Troca entre foto e vídeo
  trocarTipo(t: TipoMidia) {
    if (this.tipo === t) return;
    this.tipo = t;
    this.removerMidia(); // Limpa a pré-visualização se o tipo for trocado
  }

  // Lida com a seleção de arquivos
  onFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    this.carregarArquivo(file || null);
  }

  // Função de arrastar e soltar arquivos
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(ev: DragEvent) {
    ev.preventDefault();
    this.isDragging = false;
    const file = ev.dataTransfer?.files?.[0] ?? null;
    this.carregarArquivo(file);
  }

  private carregarArquivo(file: File | null) {
    if (!file) { this.removerMidia(); return; }
    // Validação simples de tipo
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (this.tipo === 'foto' && !isImage) return;
    if (this.tipo === 'video' && !isVideo) return;

    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.midiaFile = file;
    this.previewUrl = URL.createObjectURL(file);
  }

  // Remove a mídia e limpa a pré-visualização
  removerMidia() {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;
    this.midiaFile = null;
  }

  // Limpa os campos
  limpar() {
    this.descricao = '';
    this.removerMidia();
    this.tipo = 'foto';
  }

  // Simula a publicação
  publicar() {
    if (!this.descricao.trim() || !this.midiaFile) return;
    console.log('Publicação:', {
      tipo: this.tipo,
      descricao: this.descricao,
      arquivo: this.midiaFile?.name
    });
    this.limpar();
    alert('Publicação enviada!');
  }
}
