import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';

interface Msg { de: 'eu' | 'ela'; txt: string; enviada?: boolean; hora?: string }

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements AfterViewInit {
  contato = { nome: 'Noah', visto: 'Visto por último 4:46', img: '/assets/prints/mega.png' };
  msgs: Msg[] = [
    { de: 'ela', txt: 'Oi, td bemm?' },
    { de: 'ela', txt: 'onde vc foi ontem???' },
    { de: 'ela', txt: 'achei mto legal a foto' },
    { de: 'eu', txt: 'achei mto legal a foto', enviada: true },
    { de: 'eu', txt: 'Oiii, eu fui no Outback' },
  ];
  campo = '';
  digitando = false;
  @ViewChild('area') area!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    setTimeout(() => this.scrollBottom(), 0);
  }

  enviar() {
    const t = this.campo.trim();
    if (!t) return;
    this.msgs.push({ de: 'eu', txt: t, enviada: true, hora: this.horaAgora() });
    this.campo = '';
    this.scrollBottom();
    this.digitando = true;
    setTimeout(() => {
      this.msgs.push({ de: 'ela', txt: 'Hummm, que delícia!', hora: this.horaAgora() });
      this.digitando = false;
      this.scrollBottom();
    }, 1000);
  }

  private scrollBottom() {
    const el = this.area?.nativeElement;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }

  private horaAgora() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

