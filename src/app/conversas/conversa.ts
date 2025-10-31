import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-conversas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MenuComponent],
  templateUrl: './conversa.html',
  styleUrls: ['./conversa.css']
})
export class ConversasComponent {
  filtro = '';
  chats = [
    { nome: 'Rosie', img: '/avatar.png', resumo: '3 novas mensagens', tempo: '2 m atrás', nova: true },
    { nome: 'Noah', img: '/avatar.png', resumo: '1 nova mensagem', tempo: '1 h atrás', nova: true },
    { nome: 'CEO', img: '/avatar.png', resumo: 'Mensagem enviada', tempo: 'Terça • 01:16', nova: false },
  ];

  get filtradas() {
    const q = this.filtro.trim().toLowerCase();
    if (!q) return this.chats;
    return this.chats.filter(c => c.nome.toLowerCase().includes(q) || c.resumo.toLowerCase().includes(q));
  }

  marcarTodasLidas() {
    this.chats.forEach(c => (c.nova = false));
  }
}

