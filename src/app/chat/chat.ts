import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';

interface Msg { de: 'eu' | 'ela'; txt: string; enviada?: boolean }

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {
  contato = { nome: 'Noah', visto: 'Visto por último 4:46', img: '/assets/prints/p2.jpg' };
  msgs: Msg[] = [
    { de: 'ela', txt: 'Oi, td bemm?' },
    { de: 'ela', txt: 'onde vc foi ontem???' },
    { de: 'ela', txt: 'achei mto legal a foto' },
    { de: 'eu', txt: 'achei mto legal a foto', enviada: true },
    { de: 'eu', txt: 'Oiii, eu fui no Outback' },
  ];
  campo = '';

  enviar() {
    const t = this.campo.trim();
    if (!t) return;
    this.msgs.push({ de: 'eu', txt: t, enviada: true });
    this.campo = '';
  }
}
