import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Usuario, UsuarioService } from '../../servicos/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [UsuarioService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private service: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  autenticar() {
    let dados: Autenticacao = this.formularioLogin.value as Autenticacao;
    this.service.autenticarUsuario(dados.email, dados.senha).then(
      (data) => {
        let usuario: Usuario = data['detalhes'];
        sessionStorage.setItem('id_usuario', usuario.id.toString());
        sessionStorage.setItem('autenticado_em', new Date().toString());

        var t = new Date();
        t.setMinutes(t.getMinutes() + 30);

        sessionStorage.setItem('expira_em', t.toString());

        this.router.navigate(['/inicio']);
      },
      (error) => {
        this._snackBar.open(
          'Ocorreu um erro ao autenticar. Por favor, verifique o usuário e a senha digitados',
          'Fechar',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['mat-error']

          }
        );
      }
    );
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}

interface Autenticacao {
  email: string;
  senha: string;
}
