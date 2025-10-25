import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { CadastroComponent } from './cadastro/cadastro';
import { FeedComponent } from './feed/feed';

import { ProcurarComponent } from './procurar/procurar';
import { ProcurarListaComponent } from './procurar-lista/procurar-lista';
import { ConversasComponent } from './conversas/conversa';
import { ChatComponent } from './chat/chat';
import { NotificacoesComponent } from './notificacoes/notificacoes';
import { ContaComponent } from './conta/conta';
import { ConfigComponent } from './config/config';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },

  { path: 'feed', component: FeedComponent },
  { path: 'procurar', component: ProcurarComponent },
  { path: 'procurar/lista', component: ProcurarListaComponent },
  { path: 'conversas', component: ConversasComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'notificacoes', component: NotificacoesComponent },
  { path: 'conta', component: ContaComponent },
  { path: 'config', component: ConfigComponent },

  { path: '**', redirectTo: '' },
];
