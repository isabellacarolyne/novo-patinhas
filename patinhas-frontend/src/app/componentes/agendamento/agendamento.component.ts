import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Agendamento } from '../../servicos/agendamento.service';
import { ConfirmarComponent } from '../confirmar/confirmar.component';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
  ],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.scss',
})
export class AgendamentoComponent {
  @Input() agendamento: Agendamento = {
    dt_final: new Date(),
    dt_inicial: new Date(),
    id: 0,
    observacao: '',
    pet: '',
    status: '',
    valor_total: 0,
    id_servico: [],
  };

  @Output() atualizarStatus = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  enviarAtualizarStatus(novo_status: string) {
    let status_string = '';
    switch (novo_status) {
      case 'finalizado':
        status_string = 'Finalizado';
        break;
      case 'nao_finalizado':
        status_string = 'Não finalizado';
        break;
      case 'cancelado':
        status_string = 'Cancelado';
        break;
    }
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      data: {
        titulo: `Deseja atualizar os status do agendamento para "${status_string}"`,
        mensagem:
          'Ao atualizar os status, só será possível reagendar criando um novo agendamento. Sujeito a disponibilidade de agenda.',
        texto_confirmar: 'Atualizar',
        dado_confirmar: this.agendamento,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmar) {
        this.agendamento.status = novo_status;
        this.atualizarStatus.emit(this.agendamento);
      }
    });
  }
}
