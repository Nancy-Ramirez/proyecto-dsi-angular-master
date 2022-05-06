import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Habitacion } from './habitacion';
import { Empleado } from '../empleado/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionService } from './habitacion.service';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private habitacionService: HabitacionService
  ) {}

  ngOnInit(): void {
    this.cargar();
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
  create(): void {
    this.habitacionService
      .create(this.habitacion)
      .subscribe((res) => this.router.navigate(['/habitaciones']));
  }

  update(): void {
    this.habitacionService
      .update(this.habitacion)
      .subscribe((res) => this.router.navigate(['/habitaciones']));
  }
}
