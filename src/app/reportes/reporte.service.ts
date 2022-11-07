import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../empleado/empleado';
import { Habitacion } from '../reserva/habitacion';
import { Reserva } from '../reserva/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private url: string = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url + 'reserva/reserva/');
  }

  getHabitaciones(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.url + 'habitacion/habitacion/');
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url + 'empleados/empleados/');
  }

  getCargos(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url + 'empleados/cargo/');
  }

  getDepartamentos(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url + 'empleados/departamento/');
  }
}
