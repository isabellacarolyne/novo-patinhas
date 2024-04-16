import { MatButtonModule } from '@angular/material/button';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.scss',
})
export class ConfirmarComponent {
  titulo = '';
  mensagem = '';
  texto_confirmar = '';

  dado_confirmar: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmarInterface,
    private dialogo: MatDialogRef<ConfirmarComponent>
  ) {}

  ngOnInit() {
    this.titulo = this.data.titulo;
    this.mensagem = this.data.mensagem;
    this.texto_confirmar = this.data.texto_confirmar;
    this.dado_confirmar = this.data.dado_confirmar;
  }

  enviarConfirmar() {
    this.dialogo.close({ confirmar: true, dados: this.dado_confirmar });
  }

  cancelar() {
    this.dialogo.close({ confirmar: false, dados: undefined });
  }
}

export interface ConfirmarInterface {
  titulo: string;
  mensagem: string;
  texto_confirmar: string;
  dado_confirmar: any;
}
