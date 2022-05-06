import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { Departamento } from '../departamento/departamento';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private url: string = 'http://127.0.0.1:8000/empleados';

  constructor(private http: HttpClient) {}

  // obtiene una lista de empleados de la base
  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url + '/empleados/');
  }

  // metodo que permite crear nuevo empleado
  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.url + '/empleados/', empleado);
  }

  // metodo que obtiene un solo empleado
  get(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(this.url + '/empleados/' + id);
  }

  // metodo para actualizar empleado
  update(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(
      this.url + '/empleados/' + empleado.id + '/',
      empleado
    );
  }
  // metodo para eliminar empleado
  delete(id?: number): Observable<Empleado> {
    return this.http.delete<Empleado>(this.url + '/empleados/' + id);
  }

  // obtener dep
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url + '/departamento/');
  }
}
