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
import { ElementRef, ViewChild, inject } from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AgendamentoService,
  Servico,
} from '../../servicos/agendamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-agendamento',
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
    MatChipsModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  providers: [AgendamentoService],

  templateUrl: './cadastrar-agendamento.component.html',
  styleUrl: './cadastrar-agendamento.component.scss',
})
export class CadastrarAgendamentoComponent {
  formularioAgendamento = new FormGroup({
    dt_inicial: new FormControl('', [Validators.required]),
    dt_final: new FormControl(''),
    observacao: new FormControl(''),
    id_servico: new FormControl([], [Validators.required]),
    status: new FormControl('agendado'),
  });

  servicos?: Servico[];

  servicosCtrl = new FormControl('');
  servicosFiltrados?: Observable<Servico[]>;
  servicosSelecionados: Servico[] = [];

  tem_hospedagem = false;
  qtde_dias = 0;
  valor_total = 0;

  @ViewChild('servicoInput') servicoInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pet,
    private servico: AgendamentoService,
    private dialogo: MatDialogRef<CadastrarAgendamentoComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listarServicos();
  }

  cadastrarAgendamento() {
    let agendamento: any = { ...this.formularioAgendamento.value };
    agendamento.id_pet = this.data.id;
    agendamento.dt_inicial = new Date(
      agendamento.dt_inicial + 'T00:00:00-03:00'
    );
    if (agendamento.dt_final) {
      agendamento.dt_final = new Date(agendamento.dt_final + 'T00:00:00-03:00');
    }
    this.servico.cadastrarAgendamento(agendamento).then(
      (data) => {
        this._snackBar.open('Agendamento criado com sucesso', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-success']

        });
        this.dialogo.close(true);
      },
      (error) => {
        this._snackBar.open(
          'Erro ao criar o agendamento. Verifique as informações e tente novamente',
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

  recalcularDias() {
    let dados = this.formularioAgendamento.value;
    if (dados.dt_final && dados.dt_inicial && this.tem_hospedagem) {
      const diferenca =
        new Date(dados.dt_final).getTime() -
        new Date(dados.dt_inicial).getTime();
      this.qtde_dias = diferenca / (1000 * 60 * 60 * 24);
      this.recalcularValorTotal();
    }
  }

  recalcularValorTotal() {
    let valor_total = 0;
    for (let servico of this.servicosSelecionados) {
      if (servico.nome != 'Hospedagem Diária') {
        valor_total = valor_total + servico.valor;
      } else {
        valor_total = valor_total + servico.valor * this.qtde_dias;
      }
    }
    this.valor_total = valor_total;
    let ids_servicos: any = this.servicosSelecionados.map(
      (servico) => servico.id
    );
    this.formularioAgendamento.patchValue({ id_servico: ids_servicos });
  }

  listarServicos() {
    this.servico.retornarTodosServicos().then(
      (data) => {
        this.servicos = data;
        this.servicosFiltrados = this.servicosCtrl.valueChanges.pipe(
          startWith(null),
          map((servico: string | null) =>
            servico ? this._filter(servico) : this.servicos!.slice()
          )
        );
      },
      (error) => {
        this._snackBar.open(
          'Erro ao recuperar informações de serviços disponíveis',
          'Splash',
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

  verificarSeTemHospedagem() {
    return (
      this.servicosSelecionados.findIndex((servico) => {
        return servico.nome == 'Hospedagem Diária';
      }) > -1
    );
  }

  remove(servico: Servico): void {
    if (servico.id) {
      const index = this.servicosSelecionados.indexOf(servico);
      if (index >= 0) {
        this.servicosSelecionados.splice(index, 1);

        this.announcer.announce(`O serviço ${servico.nome} foi removido`);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let servico_selecionado: Servico[] = this.servicos!.filter(
      (servico: Servico) => servico.nome == event.option.viewValue
    );
    let servico_existe = this.servicosSelecionados.findIndex((servico) => {
      return servico.id == servico_selecionado[0].id;
    });

    if (servico_existe < 0) {
      this.servicosSelecionados.push(servico_selecionado[0]);
      this.recalcularValorTotal();
    }

    this.servicoInput!.nativeElement.value = '';
    this.servicosCtrl.setValue(null);

    this.tem_hospedagem = this.verificarSeTemHospedagem();
  }

  private _filter(value: string): Servico[] {
    value = value.toString();
    const filterValue = value.toLowerCase();

    return this.servicos!.filter((servico: Servico) =>
      servico.nome.toLowerCase().includes(filterValue)
    );
  }
}
