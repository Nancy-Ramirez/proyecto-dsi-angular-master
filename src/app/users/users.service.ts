import { Injectable } from '@angular/core';
import { Users } from './users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'http://127.0.0.1:8000/users';
  constructor(private http: HttpClient) {}

  // obtiene una lista de usuario de la base
  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }

  // metodo que permite crear nuevo usuario
  create(Users: Users): Observable<Users> {
    return this.http.post<Users>(this.url + '/', Users);
  }

  // metodo que obtiene un solo usuario
  get(id: number): Observable<Users> {
    return this.http.get<Users>(this.url + '/' + id);
  }

  // metodo para actualizar usuario
  update(Users: Users): Observable<Users> {
    return this.http.put<Users>(
      this.url + '/' + Users.id + '/',
      Users
    );
  }
  // metodo para eliminar usuario
  delete(id?: number): Observable<Users> {
    return this.http.delete<Users>(this.url + '/' + id);
  }
}
