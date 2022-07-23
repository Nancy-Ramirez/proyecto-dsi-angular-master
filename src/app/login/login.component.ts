import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

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
        alert(response.message);
        console.log(response.message);
        this.router.navigate(["inicio"]);
      },
      (e) => {
        alert(e.error.error);
        this.input = {
          username: '',
          password: '',
        };
        console.log(e);
      }
    );
  }
}
