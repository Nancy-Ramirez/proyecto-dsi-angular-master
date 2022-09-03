import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { Servicio } from './servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from './servicio.service';
import {FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-servicio',
  templateUrl: './form-servicio.component.html',
  styleUrls: ['./form-servicio.component.css'],
})
export class FormServicioComponent implements OnInit {
  registroForm!: FormGroup;
  servicio: Servicio = new Servicio();
  submitted = false;

  
  
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ServicioService: ServicioService,
    private _formBuilder: FormBuilder
  ) {}

  
  ngOnInit(): void {
    this.cargar();

    this.registroForm = this._formBuilder.group({
      nombre_servicio: ['', [Validators.required, Validators.minLength(3)]],
      capacidad: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  

  onSubmit(): void {
    this.submitted = true;
  }
  cargar(): void {
    this.activateRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.ServicioService
          .get(id)
          .subscribe((es) => ((this.servicio = es), console.log(es)));
      }
    });
  }
  create(): void 
   {
    this.ServicioService
      .create(this.servicio)
      .subscribe((res) => (this.router.navigate(['/servicios']))
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
       this.ServicioService
      .update(this.servicio)
      .subscribe((res) => this.router.navigate(['/servicios']));
    swal.fire('Cambios guardados', '', 'success')
  } else if (result.isDenied) {
    swal.fire('Los cambios no han sido guardados', '', 'info')
    this.router.navigate(['/servicios'])
  }
});
}
}
