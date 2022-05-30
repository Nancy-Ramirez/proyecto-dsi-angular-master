import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios?:Usuario[];
  filterUsuario = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((e) => (this.usuarios = e))
  }

  delete(usuario: Usuario): void {
    swal
      .fire({
        title: 'Está seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuarioService
            .delete(usuario.id)
            .subscribe((res) =>
              this.usuarioService
                .getAll()
                .subscribe((response) => (this.usuarios = response))
            );
          swal.fire('Eliminado!', 'Usuario Eliminado', 'success');
        }
      });
  }

}
