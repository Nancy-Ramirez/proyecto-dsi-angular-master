import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from '../cargo/cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  private url: string = 'http://127.0.0.1:8000/empleados';
  constructor(private http: HttpClient) {}

  // obtener cargos
  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.url + '/cargo/');
  }

  // metodo que permite crear nuevo Cargo
  create(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.url + '/cargo/', cargo);
  }

  // metodo que obtiene un solo Cargo
  get(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(this.url + '/cargo/' + id);
  }

  // metodo para actualizar Cargo
  update(cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(this.url + '/cargo/' + cargo.id + '/', cargo);
  }
  // metodo para eliminar Cargo
  delete(id?: number): Observable<Cargo> {
    return this.http.delete<Cargo>(this.url + '/cargo/' + id);
  }
}
