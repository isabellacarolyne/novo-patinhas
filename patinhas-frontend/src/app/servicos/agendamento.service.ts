import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  constructor(private http: HttpClient) {}

  retornarTodosAgendamentosPet(
    id_pet: number
  ): Promise<AgendamentoCategorizado> {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://127.0.0.1:8000/api/petshop/agendamento?id_pet=' + id_pet)
        .subscribe({
          next: (data) => {
            let dados: AgendamentoCategorizado =
              data as AgendamentoCategorizado;
            let agendamentos: AgendamentoCategorizado = {
              ativos: [],
              historico: [],
            };
            agendamentos.ativos = dados.ativos.map((agendamento) => {
              if (agendamento.dt_final) {
                agendamento.dt_final = new Date(agendamento.dt_final);
              }
              agendamento.dt_inicial = new Date(agendamento.dt_inicial);

              return agendamento;
            });

            agendamentos.historico = dados.historico.map((agendamento) => {
              if (agendamento.dt_final) {
                agendamento.dt_final = new Date(agendamento.dt_final);
              }
              agendamento.dt_inicial = new Date(agendamento.dt_inicial);

              return agendamento;
            });
            return resolve(agendamentos);
          },
          error: (e) => {
            return reject(e);
          },
        });
    });
  }

  retornarTodosServicos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8000/api/petshop/servicos').subscribe({
        next: (data) => {
          return resolve(data);
        },
        error: (e) => {
          return reject(e);
        },
      });
    });
  }

  cadastrarAgendamento(agendamento: Agendamento): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://127.0.0.1:8000/api/petshop/agendamento', agendamento)
        .subscribe({
          next: (data) => {
            return resolve(data);
          },
          error: (e) => {
            return reject(e);
          },
        });
    });
  }

  atualizarStatusAgendamento(agendamento: Agendamento): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .patch('http://127.0.0.1:8000/api/petshop/agendamento', agendamento)
        .subscribe({
          next: (data) => {
            return resolve(data);
          },
          error: (e) => {
            return reject(e);
          },
        });
    });
  }
}

export interface AgendamentoCategorizado {
  ativos: Agendamento[];
  historico: Agendamento[];
}

export interface Agendamento {
  dt_final: Date;
  dt_inicial: Date;
  id?: number;
  observacao: string;
  pet: string;
  status: string;
  valor_total: number;
  id_servico: any;
}

export interface Servico {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
}
