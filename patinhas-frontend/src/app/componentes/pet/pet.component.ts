import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Pet } from '../../servicos/pet.service';
@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss',
})
export class PetComponent {
  @Input() pet: Pet = {
    id: 0,
    nome: '',
    dt_nascimento: new Date(),
    especie: '',
    id_usuario: 0,
    raca: 'string',
  };

  @Input() ativo = false;

  @Output() deletar = new EventEmitter();
  @Output() editar = new EventEmitter();
  @Output() ativarPet = new EventEmitter();

  inicial = '';

  ngOnInit() {
    this.inicial = this.pet.nome[0];
  }

  enviarDeletar() {
    this.deletar.emit(this.pet);
  }

  enviarEditar() {
    this.editar.emit(this.pet);
  }
  enviarAtivarPet() {
    this.ativarPet.emit(this.pet);
  }
}
