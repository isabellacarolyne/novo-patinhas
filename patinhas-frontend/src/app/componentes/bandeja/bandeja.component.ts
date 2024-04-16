import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-bandeja',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './bandeja.component.html',
  styleUrl: './bandeja.component.scss',
})
export class BandejaComponent {
  @Input() titulo = 'Exemplo';
  @Input() nomeAcao = 'Exemplo';
  @Input() temVoltar = false;

  @Output() acao = new EventEmitter();

  dispararAcao() {
    this.acao.emit();
  }
}
