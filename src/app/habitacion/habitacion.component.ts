import { Component, OnInit } from '@angular/core';
import { HabitacionService } from './habitacion.service';
import { Habitacion } from './habitacion';
import swal from 'sweetalert2';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  habitaciones?: Habitacion[];
  filterHabitacion = '';

  constructor(private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.habitacionService.getAll().subscribe((e) => (this.habitaciones = e));
  }

  delete(habitacion: Habitacion): void {
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
          this.habitacionService
            .delete(habitacion.id)
            .subscribe((res) =>
              this.habitacionService
                .getAll()
                .subscribe((response) => (this.habitaciones = response))
            );
          swal.fire('Eliminado!', 'Habitación Eliminada', 'success');
        }
      });
  }
}
