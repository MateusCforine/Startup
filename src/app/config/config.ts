import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './config.html',
  styleUrls: ['./config.css']
})
export class ConfigComponent {
  temaEscuro = false;
  privacidade = 'pública';
}
