import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from './users';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users?:Users[];
  filterUsers= '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().subscribe((e) => (this.users = e))
  }

  delete(users: Users): void {
    swal
      .fire({
        title: 'Está seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, desactivarlo!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usersService
            .delete(users.id)
            .subscribe((res) =>
              this.usersService
                .getAll()
                .subscribe((response) => (this.users = response))
            );
          swal.fire('Desactivado!', 'Usuario desactivado', 'success');
        }
      });
  }

}
