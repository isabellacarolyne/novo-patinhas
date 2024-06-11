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
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-editar-pet',
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
  templateUrl: './editar-pet.component.html',
  styleUrl: './editar-pet.component.scss',
})
export class EditarPetComponent {
  formularioPet = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dt_nascimento: new FormControl('', [Validators.required]),
    especie: new FormControl(0, [Validators.required]),
    id_usuario: new FormControl(0, [Validators.required]),
    id_raca: new FormControl(0, [Validators.required]),
  });

  especies: Especie[] = [];
  racas: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pet,
    private servico: PetService,
    private dialogo: MatDialogRef<EditarPetComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let data_formatada = this.data.dt_nascimento.toISOString().split('T')[0];
    this.formularioPet.patchValue({
      nome: this.data.nome,
      dt_nascimento: data_formatada,
    });

    let id_usuario = sessionStorage.getItem('id_usuario');
    if (id_usuario) {
      this.formularioPet.patchValue({ id_usuario: parseInt(id_usuario) });
    }
    this.listarEspecies();
  }

  editarPet() {
    let pet: any = this.formularioPet.value;

    pet.dt_nascimento = new Date(pet.dt_nascimento + 'T00:00:00-03:00');
    pet['id'] = this.data.id;

    this.servico.editarPet(pet).then(
      (data) => {
        this._snackBar.open('Pet editado com sucesso!', 'Fechar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-success']

        });
        this.dialogo.close();
      },
      (error) => {
        this._snackBar.open(
          'Erro ao editar o pet. Verifique as informações e tente novamente',
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

  definirEspecieSelecionada() {
    let especie = this.especies.find((especie) => {
      if (especie.especie == this.data.especie) {
        return especie;
      }
      return false;
    });
    if (especie) {
      this.formularioPet.patchValue({ especie: especie.id });
      this.listarRacaPorEspecie(especie.id);
    }
  }

  definirRacaSelecionada() {
    let raca = this.racas.find((raca: any) => {
      if (raca.raca == this.data.raca) {
        return raca;
      }
      return false;
    });
    if (raca) {
      this.formularioPet.patchValue({ id_raca: raca.id });
    }
  }

  listarEspecies() {
    this.servico.retornarEspecies().then(
      (data) => {
        this.especies = data;
        this.definirEspecieSelecionada();
      },
      (error) => {
        this._snackBar.open(
          'Erro ao recuperar informações de espécies. Tente novamente',
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

  listarRacaPorEspecie(id_especie: any) {
    if (id_especie) {
      this.servico.retornarRacasPorEspecie(id_especie).then(
        (data) => {
          this.racas = data;
          this.definirRacaSelecionada();
        },
        (error) => {
          this._snackBar.open(
            'Erro ao recuperar informações de raças. Tente novamente',
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
}
