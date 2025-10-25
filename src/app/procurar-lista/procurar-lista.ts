import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';   // ✅ importe o menu

@Component({
  selector: 'app-procurar-lista',
  standalone: true,
  imports: [MenuComponent, FormsModule],         // ✅ inclua aqui
  templateUrl: './procurar-lista.html',
  styleUrls: ['./procurar-lista.css']
})
export class ProcurarListaComponent {
  termo = 'Ja';
  resultados = [
    { nome:'Jaws', img:'/assets/prints/jaws.png', verificado:true, acoes:['Enviar mensagem','Seguir'] },
    { nome:'Jamile', img:'/assets/prints/jamile.jpg', verificado:false, acoes:['Enviar mensagem','Pedir para seguir'] },
    { nome:'Jaws', img:'/assets/prints/jaws.png', verificado:true, acoes:['Enviar mensagem','Seguir'] },
  ];
}
