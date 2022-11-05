import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  input: any;
  registroForm!: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.input = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    this.loginService.loginUser(this.input).subscribe(
      (response) => {
        swal.fire('Inicio de sesión exitoso!', response.message, 'success');
        // alert(response.message);
        // console.log(response.message);
        // console.log(response.token);
        console.log(response);
        this.router.navigate(["inicio"]);
      },
      (e) => {
        // alert(e.error.error);
        swal.fire('Inicio de sesión no exitoso!', e.error.error, 'warning');
        this.input = {
          username: '',
          password: '',
        };
        console.log(e);
      }
    );
  }

  refreskToken(){
    // this.loginService.refreshToken();
  }

  logout(){
    this.loginService.logOutUser();
  }
}
