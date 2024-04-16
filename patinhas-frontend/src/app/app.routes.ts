import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

export const routes: Routes = [
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Cadastro', path: 'cadastro', component: CadastroComponent },
  { title: 'Início', path: '', component: InicioComponent },
];
