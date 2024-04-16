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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-pet',
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
  ],
  providers: [PetService],
  templateUrl: './cadastrar-pet.component.html',
  styleUrl: './cadastrar-pet.component.scss',
})
export class CadastrarPetComponent {
  formularioPet = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dt_nascimento: new FormControl(new Date(), [Validators.required]),
    especie: new FormControl(undefined, [Validators.required]),
    id_usuario: new FormControl(0, [Validators.required]),
    id_raca: new FormControl(undefined, [Validators.required]),
  });

  especies: Especie[] = [];
  racas: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pet,
    private servico: PetService,
    private dialogo: MatDialogRef<CadastrarPetComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    let id_usuario = sessionStorage.getItem('id_usuario');
    if (id_usuario) {
      this.formularioPet.patchValue({ id_usuario: parseInt(id_usuario) });
    }
    this.listarEspecies();
  }

  cadastrarPet() {
    let pet: any = this.formularioPet.value;
    pet.dt_nascimento = new Date(pet.dt_nascimento + 'T00:00:00-03:00');
    this.servico.cadastrarPet(pet).then(
      (data) => {
        this._snackBar.open('Pet cadastrado com sucesso', 'Fechar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogo.close();
      },
      (error) => {
        this._snackBar.open(
          'Erro ao cadastrar o pet. Verifique as informações e tente novamente',
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      }
    );
  }

  listarEspecies() {
    this.servico.retornarEspecies().then(
      (data) => {
        this.especies = data;
      },
      (error) => {
        this._snackBar.open(
          'Erro ao recuperar informações de espécies. Tente novamente',
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
      }
    );
  }

  listarRacaPorEspecie(id_especie: any) {
    if (id_especie) {
      this.servico.retornarRacasPorEspecie(id_especie).then(
        (data) => {
          this.racas = data;
        },
        (error) => {
          this._snackBar.open(
            'Erro ao recuperar informações de raças. Tente novamente',
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
}
