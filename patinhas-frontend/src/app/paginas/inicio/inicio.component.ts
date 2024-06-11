import {
  AgendamentoCategorizado,
  AgendamentoService,
} from './../../servicos/agendamento.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaComponent } from '../../componentes/bandeja/bandeja.component';
import { PetComponent } from '../../componentes/pet/pet.component';
import { AgendamentoComponent } from '../../componentes/agendamento/agendamento.component';
import { UsuarioService } from '../../servicos/usuario.service';
import { Router } from '@angular/router';
import { CadastrarPetComponent } from '../../componentes/cadastrar-pet/cadastrar-pet.component';
import { Pet, PetService } from '../../servicos/pet.service';
import { ConfirmarComponent } from '../../componentes/confirmar/confirmar.component';
import { EditarPetComponent } from '../../componentes/editar-pet/editar-pet.component';
import { CadastrarAgendamentoComponent } from '../../componentes/cadastrar-agendamento/cadastrar-agendamento.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, BandejaComponent, PetComponent, AgendamentoComponent],
  providers: [PetService, AgendamentoService],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  pets: Pet[] = [];

  pet_editar?: Pet;

  petSelecionado?: Pet;

  agendamentos?: AgendamentoCategorizado;
  sessao: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private petService: PetService,
    private agendamentoService: AgendamentoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.verificarSessao();
    this.listarPets();
  }

  definirPetAtivo(pet: Pet) {
    this.petSelecionado = pet;
    this.listarAgendamentosPet(pet.id!);
  }

  listarAgendamentosPet(id_pet: number) {
    this.agendamentoService.retornarTodosAgendamentosPet(id_pet).then(
      (data) => {
        this.agendamentos = data;
      },
      (error) => {
        this._snackBar.open(
          'Erro ao recuperar informações de agendamentos para o pet selecionado. Tente novamente',
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

  listarPets() {
    let id_usuario = sessionStorage.getItem('id_usuario');
    if (id_usuario) {
      this.petService.retornarTodosPets(parseInt(id_usuario)).then(
        (data) => {
          this.pets = data as Pet[];
        },
        (error) => {
          this._snackBar.open(
            'Erro ao recuperar informações de pets cadastrados. Tente novamente',
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

  cadastrarPet() {
    const dialogRef = this.dialog.open(CadastrarPetComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.listarPets();
    });
  }

  cadastrarAgendamento() {
    const dialogRef = this.dialog.open(CadastrarAgendamentoComponent, {
      data: this.petSelecionado,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listarAgendamentosPet(this.petSelecionado?.id!);
    });
  }

  atualizarStatusAgendamento(agendamento: any) {
    this.agendamentoService.atualizarStatusAgendamento(agendamento).then(
      (data) => {
        this._snackBar.open('Status atualizados com sucesso', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-success']

        });
        if (this.petSelecionado) {
          this.listarAgendamentosPet(this.petSelecionado.id!);
        }
      },
      (erro) => {
        this._snackBar.open(
          'Erro ao atualizar os status para o agendamento. Tente novamente',
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

  solicitarDeletarPet(pet: Pet) {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      data: {
        titulo: 'Deseja excluir o pet ' + pet.nome,
        mensagem:
          'Ao excluir, todas as informações do pet e seus agendamentos serão apagados definitivamente. Continuar com a exclusão?',
        texto_confirmar: 'Deletar',
        dado_confirmar: pet,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmar) {
        this.deletarPet(result.dados);
        this.listarPets();
      }
    });
  }

  deletarPet(pet: Pet) {
    this.petService.deletarPet(pet).then(
      (data) => {
        this._snackBar.open('Pet deletado com  sucesso', 'Fechar', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-success']

        });
        this.listarPets();
      },
      (error) => {
        this._snackBar.open(
          'Erro ao deletar o pet. Tente novamente',
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

  solicitarEditarPet(pet: Pet) {
    const dialogRef = this.dialog.open(EditarPetComponent, {
      data: pet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listarPets();
    });
  }

  verificarSessao() {
    this.sessao = setInterval(() => {
      let expira_string = sessionStorage.getItem('expira_em');
      if (expira_string) {
        let expira_em = new Date(expira_string);

        if (expira_em < new Date()) {
          this.logout();
        }
      } else {
        this.logout();
      }
    }, 1000);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    clearInterval(this.sessao);
  }
  ngOnDestroy() {
    clearInterval(this.sessao);
  }
}
