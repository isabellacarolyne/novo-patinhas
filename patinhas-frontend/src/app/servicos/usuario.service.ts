import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  autenticarUsuario(email: string, senha: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let dados = { email: email, senha: senha };

      this.http
        .post('http://127.0.0.1:8000/api/petshop/autenticar-usuario', dados)
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

  cadastrarUsuario(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://127.0.0.1:8000/api/petshop/usuario', usuario)
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

  editarUsuario(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .patch('http://127.0.0.1:8000/api/petshop/usuario', usuario)
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

  deletarUsuario(id_usuario: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(
          'http://127.0.0.1:8000/api/petshop/usuario?usuario_id=' + id_usuario
        )
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

  getUsuario(id_usuario: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          'http://127.0.0.1:8000/api/petshop/usuario?id_usuario=' + id_usuario
        )
        .subscribe({
          next: (data: any) => {
            return resolve(data);
          },
          error: (e) => {
            return reject(e);
          },
        });
    });
  }
}

export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  telefone: string;
}
