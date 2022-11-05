import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = 'http://127.0.0.1:8000/login/';

  private _isLoggedIn$=new BehaviorSubject<boolean>(false);
  isLoggedIn$=this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token=localStorage.getItem('access_token');
    this._isLoggedIn$.next(!!token);

  }

  loginUser(useData: any): Observable<any> {
    return this.http.post(this.url, useData).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.token);
        this._isLoggedIn$.next(true);
        // console.log(response.token);
        //admin=false;
      })
    );
  }

  logOutUser() {
    localStorage.removeItem('access_token');
    this._isLoggedIn$.next(false);
  }

}
