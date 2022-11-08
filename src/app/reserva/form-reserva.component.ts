import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Habitacion } from './habitacion';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import { HabitacionService } from './habitacion.service';
import { Servicio } from './servicio';
import { InicioComponent } from '../inicio/inicio.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css'],
})

export class FormReservaComponent implements OnInit {
  formReserva!: FormGroup;
  formDatosCliente!: FormGroup;
  reserva: Reserva = new Reserva();
  submitted = false;
  list: any[] = [];
  toppings = new FormControl();
  servi?: Servicio[];
  selected: any[] = [];
  total?:number=0;
  id: number = 1;
  habitac?: Habitacion[];
  fechaInicio!: Date;
  fechaFin!: Date;
  resultado!: string;
  
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private formBuilder: FormBuilder,
    private renderer2:Renderer2,
        ) { }


  ngOnInit(): void {
    this.cargar();
    this.obtenerServ();
    this.obtenerHab();

    this.formReserva = this.formBuilder.group({
      fecha_ingreso:['', [Validators.required]],
      fecha_salida:['', [Validators.required]],       
      hora_ingreso:['', [Validators.required]],
      numero_personas: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
      id_habitacion: ['', [Validators.required]],
    });

    this.formDatosCliente = this.formBuilder.group({
      nombre_completo: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      numero_contacto: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      documento_identidad: ['',[Validators.required, Validators.maxLength(9), Validators.minLength(9) ]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  get form() {
    return this.formReserva.controls;
  }

  onSubmit(): void {
    this.submitted = true;
  }
  onReset() {
    this.submitted = false;
    this.formReserva.reset();
    this.formDatosCliente.reset();
  }

  obtenerHab():void{
    this.reservaService
    .getHabitacion()
    .subscribe((h) => ((this.habitac = h ),
    console.log()
    ));
  }

  //Servicios de reserva
  obtenerServ():void{
    this.reservaService
    .getServicio()
    .subscribe((c) => ((this.servi =c ),
    console.log()
    ));
  }

 suma(): void {
    for (let i = 0; i < this.servi!.length; i++) {
      for (let j = 0; j < this.selected.length; j++) {
        this.total = this.servi![this.selected[j]-1].precio;

      }

    }

    console.log(this.total)
  }


  changeServicio(value: string){
    this.list?.push({id: this.list.length, name:value})
    console.log(this.list);
  }

  onOptionsSelected(value: string) {
    console.log('the selected value is ' + value);
  }

  submit() {
    if (this.formReserva.valid || this.formDatosCliente )
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
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
  
 create(): void {
    console.log(this.reserva);
    this.reservaService.create(this.reserva).subscribe({
      next: (res) => {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registrado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/reserva']);
        console.log(res);
      },
      error: (err) => {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Lo sentimos, no se pudo registrar',
          timer: 1500,
        });
        console.log(err);
      },
    });
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
  const maskConfig: Partial<IConfig> = {
  validation: false,
};
