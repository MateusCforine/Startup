import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-conta',
  imports: [MenuComponent],
  templateUrl: './conta.html',
  styleUrls: ['./conta.css']
})
export class ContaComponent {
  usuario = {
    nome: 'Sarahh',
    amigos: 13,
    posts: 0,
    status: '',
    foto: '/assets/prints/conta.jpeg',  // Caminho da foto de perfil atualizado para conta.jpeg
    aniversario: '25/06/1995' // Data de aniversário
  };
}
