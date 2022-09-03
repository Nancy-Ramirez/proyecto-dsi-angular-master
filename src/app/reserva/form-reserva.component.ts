import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from './reserva.service';
import {FormBuilder,Validators} from '@angular/forms';
import { Servicio } from './servicio';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css'],
})
export class FormReservaComponent implements OnInit {
  registroForm!: FormGroup;
  reserva: Reserva = new Reserva();
  submitted = false;
  list: any[] = [];
  toppings = new FormControl();
  servi?: Servicio[];

  
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private _formBuilder: FormBuilder
  ) {}

  
  ngOnInit(): void {
    this.cargar();
    this.obtenerServ();
  }

  //Servicios de reserva
  obtenerServ():void{
    this.reservaService
    .getServicio()
    .subscribe((c) => ((this.servi =c ),console.log(c)));
  }
     
  changeServicio(value: string){
    this.list?.push({id: this.list.length, name:value})
    console.log(this.list);
  }

  onOptionsSelected(value: string) {
    console.log('the selected value is ' + value);
  }

  onSubmit(): void {
    this.submitted = true;
  }
  cargar(): void {
    this.activateRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.reservaService
          .get(id)
          .subscribe((es) => ((this.reserva = es), console.log(es)));
      }
    });
  }
  create(): void 
   {
     swal
  .fire({
  position: 'center',
  icon: 'success',
  title: 'Registrado con éxito',
  showConfirmButton: false,
  timer: 1500
  
    })
    this.reservaService
      .create(this.reserva)
      .subscribe((res) => (this.router.navigate(['/reserva']), console.log(res))
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
       this.reservaService
      .update(this.reserva)
      .subscribe((res) => this.router.navigate(['/reserva']));
    swal.fire('Cambios guardados', '', 'success')
  } else if (result.isDenied) {
    swal.fire('Los cambios no han sido guardados', '', 'info')
    this.router.navigate(['/reserva'])
  }
});
}
}
