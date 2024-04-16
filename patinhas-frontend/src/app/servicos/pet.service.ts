import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  retornarTodosPets(id_usuario: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://127.0.0.1:8000/api/petshop/pet?id_usuario=' + id_usuario)
        .subscribe({
          next: (data: any) => {
            let pets = data.map((pet: Pet) => {
              pet.dt_nascimento = new Date(pet.dt_nascimento);
              return pet;
            });
            console.log(pets);
            return resolve(pets);
          },
          error: (e) => {
            return reject(e);
          },
        });
    });
  }

  cadastrarPet(pet: Pet): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://127.0.0.1:8000/api/petshop/pet', pet).subscribe({
        next: (data) => {
          return resolve(data);
        },
        error: (e) => {
          return reject(e);
        },
      });
    });
  }
  editarPet(pet: Pet): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch('http://127.0.0.1:8000/api/petshop/pet', pet).subscribe({
        next: (data) => {
          return resolve(data);
        },
        error: (e) => {
          return reject(e);
        },
      });
    });
  }
  deletarPet(pet: Pet): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete('http://127.0.0.1:8000/api/petshop/pet?id_pet=' + pet.id)
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

  retornarEspecies(): Promise<Especie[]> {
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8000/api/petshop/especie').subscribe({
        next: (data) => {
          return resolve(data as Especie[]);
        },
        error: (e) => {
          return reject(e);
        },
      });
    });
  }
  retornarRacasPorEspecie(especie: number): Promise<Raca[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get('http://127.0.0.1:8000/api/petshop/raca?id_especie=' + especie)
        .subscribe({
          next: (data) => {
            return resolve(data as Raca[]);
          },
          error: (e) => {
            return reject(e);
          },
        });
    });
  }
}

export interface Pet {
  id?: number;
  nome: string;
  dt_nascimento: Date;
  especie: string;
  id_usuario: number;
  raca: string;
}

export interface Especie {
  id: number;
  especie: string;
}

export interface Raca {
  id: number;
  raca: string;
  especie: number;
}
