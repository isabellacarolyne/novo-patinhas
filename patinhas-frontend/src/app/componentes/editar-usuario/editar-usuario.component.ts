import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Especie, Pet, PetService } from '../../servicos/pet.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Usuario, UsuarioService } from '../../servicos/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSelectModule,
    HttpClientModule,
    MatSlideToggleModule,
  ],
  providers: [UsuarioService],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss',
})
export class EditarUsuarioComponent {
  formularioCadastro = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    receber_notificacoes: new FormControl(false),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialogo: MatDialogRef<EditarUsuarioComponent>,
    private servico: UsuarioService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    console.log("data", this.data)
    this.formularioCadastro.patchValue({
      nome: this.data.nome,
      cpf: this.data.cpf,
      email: this.data.email,
      telefone: this.data.telefone,
      receber_notificacoes: this.data.receber_notificacoes,
    });
  }

  editarUsuario() {
    let usuario: any = this.formularioCadastro.value;
    usuario['id'] = this.data.id;

    this.servico.editarUsuario(usuario).then(
      (data) => {
        this._snackBar.open('Usuário editado com sucesso', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-success']

        });
        this.dialogo.close(false);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao editar o usuário. Verifique as informações e tente novamente',
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

  deletarUsuario() {
    this.servico.deletarUsuario(this.data.id).then(
      (data) => {
        this._snackBar.open('Usuário deletado com sucesso', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-success']

        });
        this.dialogo.close(true);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao deletar o usuário. Tente novamente',
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
}
