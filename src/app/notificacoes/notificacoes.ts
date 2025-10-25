import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './notificacoes.html',
  styleUrls: ['./notificacoes.css']
})
export class NotificacoesComponent {
  itens = [
    { img: '/assets/prints/p4.jpg', texto: 'John aceitou seu pedido', tempo: '2 mins atrás' },
    { img: '/assets/prints/p5.jpg', texto: 'Edwin enviou uma solicitação', tempo: '45 mins atrás', acao: 'Confirmar' },
    { img: '/assets/prints/p6.jpg', texto: 'Lilly iniciou uma live', tempo: '15 mins atrás', live: true },
    { img: '/assets/prints/thumb.jpg', texto: 'Talvez você goste deste vídeo', tempo: '2 dias atrás' },
  ];
}
