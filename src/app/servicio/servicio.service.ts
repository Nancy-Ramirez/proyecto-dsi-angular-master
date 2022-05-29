import { Injectable } from '@angular/core';
import { Servicio} from './servicio';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private url: string = 'http://127.0.0.1:8000/servicio';
  constructor(private http: HttpClient) {}

  // obtiene una lista de Servicios de la base
  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url + '/servicio/');
  }

  // metodo que permite crear nuevo Servicio
  create(Servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.url + '/servicio/', Servicio);
  }

  // metodo que obtiene un solo Servicio
  get(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(this.url + '/servicio/' + id);
  }

  // metodo para actualizar Servicio
  update(Servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(
      this.url + '/servicio/' + Servicio.id + '/',
     Servicio
    );
  }
  // metodo para eliminar Servicio
  delete(id?: number): Observable<Servicio> {
    return this.http.delete<Servicio>(this.url + '/servicio/' + id);
  }
}
