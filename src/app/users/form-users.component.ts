import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { Users } from './users';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './users.service';
import {FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css'],
})
export class FormUsersComponent implements OnInit {
  registroForm!: FormGroup;
  users: Users = new Users();
  submitted = false;
  hide = true;
  
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private UserService: UsersService,
    private _formBuilder: FormBuilder
  ) {}

  
  ngOnInit(): void {
    this.cargar();

    this.registroForm = this._formBuilder.group({
     username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }  

  onSubmit(): void {
    this.submitted = true;
  }
  cargar(): void {
    this.activateRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.UserService
          .get(id)
          .subscribe((es) => ((this.users = es), console.log(es)));
      }
    });
  }
  create(): void 
   {
    this.UserService
      .create(this.users)
      .subscribe((res) => (this.router.navigate(['/users']))
      );
  }

  update(): void {
    swal.
  fire({
  title: '¿Desea guardar los cambios?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Guardar',
  denyButtonText: `No guardar`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
       this.UserService
      .update(this.users)
      .subscribe((res) => this.router.navigate(['/users']));
    swal.fire('Cambios guardados', '', 'success')
  } else if (result.isDenied) {
    swal.fire('Los cambios no han sido guardados', '', 'info')
    this.router.navigate(['/users'])
  }
});
}
}
