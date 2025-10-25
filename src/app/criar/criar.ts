import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';     // ✅ para @if/@for
import { FormsModule } from '@angular/forms';       // ✅ para [(ngModel)]
import { MenuComponent } from '../menu/menu';       // ✅ para <app-menu>

@Component({
  selector: 'app-criar',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './criar.html',
  styleUrls: ['./criar.css']
})
export class CriarComponent {
  descricao = '';
  imagem: string | null = null;

  onFile(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => this.imagem = r.result as string;
    r.readAsDataURL(f);
  }

  publicar() {
    // aqui você envia para o serviço/API; por enquanto, simulação:
    alert('Publicado (simulado)');
    this.descricao = '';
    this.imagem = null;
  }
}
