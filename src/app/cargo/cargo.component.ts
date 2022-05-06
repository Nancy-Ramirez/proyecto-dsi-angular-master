import { Component, OnInit } from '@angular/core';
import { Cargo } from '../cargo/cargo';
import { CargoService } from '../cargo/cargo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styles: [],
})
export class CargoComponent implements OnInit {
  cargos?: Cargo[];
  busCargoCargo = '';

  constructor(private cargoService: CargoService) {}

  ngOnInit(): void {
    this.cargoService.getCargos().subscribe((c) => (this.cargos = c));
  }

  delete(cargo: Cargo): void {
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
          this.cargoService
            .delete(cargo.id)
            .subscribe((res) =>
              this.cargoService
                .getCargos()
                .subscribe((response) => (this.cargos = response))
            );
          swal.fire('Eliminado!', 'Cargo Eliminado', 'success');
        }
      });
  }
}
