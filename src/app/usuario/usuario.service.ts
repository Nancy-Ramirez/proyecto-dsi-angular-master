import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = 'http://127.0.0.1:8000/usuario';
  constructor(private http: HttpClient) {}

  // obtiene una lista de usuario de la base
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + '/usuario/');
  }

  // metodo que permite crear nuevo usuario
  create(Usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + '/usuario/', Usuario);
  }

  // metodo que obtiene un solo usuario
  get(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + '/usuario/' + id);
  }

  // metodo para actualizar usuario
  update(Usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      this.url + '/usuario/' + Usuario.id + '/',
      Usuario
    );
  }
  // metodo para eliminar usuario
  delete(id?: number): Observable<Usuario> {
    return this.http.delete<Usuario>(this.url + '/usuario/' + id);
  }
}
