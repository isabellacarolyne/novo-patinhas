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
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  providers: [UsuarioService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  formularioCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(11),
    ]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    receber_notificacoes: new FormControl(false, [Validators.required]),
  });

  constructor(
    private service: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  cadastrar() {
    if (this.formularioCadastro.valid) {
      let dados: Usuario = this.formularioCadastro.value as Usuario;
      this.service.cadastrarUsuario(dados).then(
        (data) => {
          this._snackBar.open(
            'Usuário cadastrado com sucesso. Agora é só fazer o login ;)',
            'Fechar',
            {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['mat-success']

            }
          );
          this.router.navigate(['/login']);
        },
        (error) => {
          this._snackBar.open(
            'Erro ao cadastrar o usuário. Verifique as informações e tente novamente',
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
    } else {
      this._snackBar.open(
        'Erro ao cadastrar o usuário. Verifique as informações e tente novamente',
        'Fechar',
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-error']

        }
      );
    }
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
