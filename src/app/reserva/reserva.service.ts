import { Injectable } from '@angular/core';
import { Reserva } from './reserva';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../habitacion/habitacion';
import { Servicio } from './servicio';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private url: string = 'http://127.0.0.1:8000/reserva';
   private url2: string = 'http://127.0.0.1:8000/reserva/servicio';
  constructor(private http: HttpClient) {}

  // obtiene una lista de reserva de la base
  getAll(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url + '/reserva/');
  }

  getServicio(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.url2);
  }

  // metodo que permite crear nueva Reserva
  create(Reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.url + '/reserva/', Reserva);
  }

  // metodo que obtiene un solo Reserva
  get(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(this.url + '/reserva/' + id);
  }

  // metodo para actualizar Reserva
  update(Reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(
      this.url + '/reserva/' + Reserva.id + '/',
      Reserva
    );
  }
  // metodo para eliminar Reserva
  delete(id?: number): Observable<Reserva> {
    return this.http.delete<Reserva>(this.url + '/reserva/' + id);
  }
}
