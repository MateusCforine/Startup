import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-procurar',
  standalone: true,
  imports: [FormsModule,MenuComponent ],
  templateUrl: './procurar.html',
  styleUrls: ['./procurar.css']
})
export class ProcurarComponent {
  termo = '';
  tags = ['#Japa', '#receita', '#comida', '#fitness', '#carne', '#receitafacil', '#viral', '#lanche', '#tbt'];

  sugestoes = [
    { titulo:'Outback', img:'/assets/prints/outback.jpg', meta:'53.2K' },
    { titulo:'Corbucci', img:'/assets/prints/corbucci.jpg', meta:'20.1K', play:true },
    { titulo:'Masterchef', img:'/assets/prints/masterchef.jpg', meta:'20.1K' },
  ];

  pesquisar(){ /* hook para filtrar/conectar serviço */ }
}
