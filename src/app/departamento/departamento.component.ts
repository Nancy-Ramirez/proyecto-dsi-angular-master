import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { DepartamentoService } from '../departamento/departamento.service';
import { Departamento } from './departamento';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent implements OnInit {
  departamentos?: Departamento[];
  filterDepartamento = '';
  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {
    this.departamentoService
      .getDepartamentos()
      .subscribe((c) => (this.departamentos = c));
  }

  delete(departamento: Departamento): void {
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
          this.departamentoService
            .delete(departamento.id)
            .subscribe((res) =>
              this.departamentoService
                .getDepartamentos()
                .subscribe((response) => (this.departamentos = response))
            );
          swal.fire('Eliminado!', 'Departamento Eliminado', 'success');
        }
      });
  }
}
