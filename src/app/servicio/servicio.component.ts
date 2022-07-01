import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Servicio } from './servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from './servicio.service';
import {FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicio?: Servicio[];
  filterServicio = '';

  
  constructor(private ServicioService: ServicioService) { }

  ngOnInit(): void {
    this.ServicioService.getAll().subscribe((e) => (this.servicio = e));
  }

  delete(servicio: Servicio): void {
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
          this.ServicioService
            .delete(servicio.id)
            .subscribe((res) =>
              this.ServicioService
                .getAll()
                .subscribe((response) => (this.servicio = response))
            );
          swal.fire('Eliminado!', 'Servicio Eliminado', 'success');
        }
      });
  }
  

}
