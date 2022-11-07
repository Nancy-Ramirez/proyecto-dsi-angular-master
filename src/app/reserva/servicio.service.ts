import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from './servicio';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private url: string = 'http://127.0.0.1:8000/reserva/servicio/';
  constructor(private http: HttpClient) {}

  // obtiene una lista de Servicios de la base
  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url );
  }

  // metodo que permite crear nuevo Servicio
  create(Servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.url , Servicio);
  }

  // metodo que obtiene un solo Servicio
  get(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(this.url + id);
  }

  // metodo para actualizar Servicio
  update(Servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(
      this.url  + Servicio.id + '/',
     Servicio
    );
  }
  // metodo para eliminar Servicio
  delete(id?: number): Observable<Servicio> {
    return this.http.delete<Servicio>(this.url + id);
  }
}
