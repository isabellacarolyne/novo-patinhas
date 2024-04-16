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
    nome: new FormControl('Bochechela Bochechine Bochechins', [
      Validators.required,
      Validators.minLength(8),
    ]),
    cpf: new FormControl('00000000000', [
      Validators.required,
      Validators.minLength(11),
    ]),
    email: new FormControl('bochechuda@cabecao.com', [
      Validators.required,
      Validators.email,
    ]),
    telefone: new FormControl('999999999', [
      Validators.required,
      Validators.minLength(9),
    ]),
    senha: new FormControl('caebcagigante', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialogo: MatDialogRef<EditarUsuarioComponent>,
    private servico: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.formularioCadastro.patchValue({
    //   nome: this.data.nome,
    //   cpf: this.data.cpf,
    //   email: this.data.email,
    //   telefone: this.data.telefone,
    // });
  }

  editarUsuario() {
    let usuario: any = this.formularioCadastro.value;
    usuario['id'] = this.data.id;

    this.servico.editarUsuario(usuario).then(
      (data) => {
        this._snackBar.open('Usuário editado com sucesso', 'Fechar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogo.close(false);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao editar o usuário. Verifique as informações e tente novamente',
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      }
    );
  }

  deletarUsuario() {
    this.servico.deletarUsuario(this.data.id).then(
      (data) => {
        this._snackBar.open('Usuário deletado com sucesso', 'Fechar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogo.close(true);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao deletar o usuário. Tente novamente',
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      }
    );
  }
}
