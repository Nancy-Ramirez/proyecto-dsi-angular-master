import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { Cargo } from '../cargo/cargo';
import { EmpleadoService } from './empleado.service';
import { CargoService } from '../cargo/cargo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  titulo: string = 'Lista de Empleados';
  empleados?: Empleado[];
  cargo?: Cargo[];
  filterEmpleado = '';

  constructor(
    private empleadoService: EmpleadoService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.empleadoService.getAll().subscribe((e) => (this.empleados = e));
    this.cargos();
  }

  delete(empleado: Empleado): void {
    swal
      .fire({
        title: '¿Desea eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.empleadoService
            .delete(empleado.id)
            .subscribe((res) =>
              this.empleadoService
                .getAll()
                .subscribe((response) => (this.empleados = response))
            );
          swal.fire('Eliminado!', 'Empleado Eliminado', 'success');
        }
      });
  }

  cargos(): void {
    this.cargoService.getCargos().subscribe((c) => (this.cargo = c));
  }
}
