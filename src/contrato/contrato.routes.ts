import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { Contrato } from './contrato';
import { Cadastro } from '../cadastro/cadastro';
import { RecuperarSenha } from '../recuperar-senha/recuperar-senha';
import { autenticacaoGuard } from './autenticacao.guard';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Entrar | Nobe Estágios' },
  { path: 'cadastro', component: Cadastro, title: 'Criar conta | Nobe Estágios' },
  { path: 'esqueci-senha', component: RecuperarSenha, title: 'Recuperar senha | Nobe Estágios' },
  { path: 'contrato', component: Contrato, canActivate: [autenticacaoGuard], title: 'Contratos | Nobe Estágios' },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
