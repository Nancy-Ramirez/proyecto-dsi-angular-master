import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Habitacion } from './habitacion';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionService } from './habitacion.service';
import {FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { Caracteristicas } from './caracteristicas';

@Component({
  selector: 'app-form-habitacion',
  templateUrl: './form-habitacion.component.html',
  styleUrls: ['./form-habitacion.component.css'],
})
export class FormHabitacionComponent implements OnInit {
  registroForm!: FormGroup;
  habitacion: Habitacion = new Habitacion();
  titulo: string = 'Registro de Habitacion';
  submitted = false;
  caract?: Caracteristicas[];
  list: any[] = [];
  toppings = new FormControl();

  
  
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private habitacionService: HabitacionService,
    private _formBuilder: FormBuilder
  ) {}

  
  ngOnInit(): void {
    this.cargar();
    this.obtenerCarac();

    this.registroForm = this._formBuilder.group({
      numero_de_habitacion: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      numero_de_piso: ['', [Validators.required]],
      tipo_habitacion: ['', Validators.required],
      descripcion_habitacion: ['', Validators.required],
      direccion: ['', [Validators.required]],
      max_personas: ['', [Validators.required]],
    });
  }

     //caracteristica de habitacion
     obtenerCarac(): void {
        this.habitacionService
      .getCaracteristicas()
      .subscribe((c) => ((this.caract = c), console.log(c)));
  }

   //Caracteristicas():void{
    //this.habitacionService.getCaracteristicas().subscribe(c =>( (this.caract = c), console.log(c)))
  //}

  changeCaracteristica(value: string){
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
        this.habitacionService
          .get(id)
          .subscribe((es) => ((this.habitacion = es), console.log(es)));
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
    this.habitacionService
      .create(this.habitacion)
      .subscribe((res) => (this.router.navigate(['/habitaciones']), console.log(res))
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
       this.habitacionService
      .update(this.habitacion)
      .subscribe((res) => this.router.navigate(['/habitaciones']));
    swal.fire('Cambios guardados', '', 'success')
  } else if (result.isDenied) {
    swal.fire('Los cambios no han sido guardados', '', 'info')
    this.router.navigate(['/habitaciones'])
  }
});
}
}
