import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './conta.html',
  styleUrls: ['./conta.css']
})
export class ContaComponent {
  usuario = {
    nome: 'sarahh',
    status: 'Melancholic :)',
    amigos: 13,
    posts: 0,
    foto: '/assets/prints/p7.jpg'
  };
}
