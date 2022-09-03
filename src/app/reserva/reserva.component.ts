import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../habitacion/habitacion';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reserva?: Reserva[];
  filterReserva = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getAll().subscribe((e) => (this.reserva = e));
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
          this.reservaService
            .delete(habitacion.id)
            .subscribe((res) =>
              this.reservaService
                .getAll()
                .subscribe((response) => (this.reserva = response))
            );
          swal.fire('Eliminado!', 'Habitación Eliminada', 'success');
        }
      });
  }

}
