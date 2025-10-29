import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-conversas',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './conversa.html',
  styleUrls: ['./conversa.css']
})
export class ConversasComponent {
  chats = [
    { nome: 'Rosie', img: 'avatar.png', resumo: '3 novas mensagens', tempo: '2 m atrás', nova: true },
    { nome: 'Noah', img: 'avatar.png', resumo: '1 nova mensagem', tempo: '1 h atrás', nova: true },
    { nome: 'CEO', img: 'avatar.png', resumo: 'Mensagem enviada', tempo: 'Terça-feira • 01:16' },
  ];
}
