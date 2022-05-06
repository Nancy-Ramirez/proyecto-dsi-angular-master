import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { Cargo } from '../cargo/cargo';
import { Departamento } from '../departamento/departamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from '../cargo/cargo.service';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css'],
})
export class FormEmpleadoComponent implements OnInit {
  registroForm!: FormGroup;
  submitted = false;

  empleado: Empleado = new Empleado();
  cargo?: Cargo[];
  departamento?: Departamento[];

  titulo: string = 'Registro de Empleado';

  constructor(
    private empleadoService: EmpleadoService,
    private cargoService: CargoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargos();
    this.departamentos();

    this.registroForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(200)]],
      apellidos: ['', [Validators.required, Validators.maxLength(200)]],
      fecha_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      dui: [
        '',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      isss: [
        '',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      nup: [
        '',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_contratacion: ['', Validators.required],
      id_cargo: ['', Validators.required],
      id_departamento: ['', Validators.required],
    });
  }
  get form() {
    return this.registroForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
  }
  onReset() {
    this.submitted = false;
    this.registroForm.reset();
  }
  cargar(): void {
    this.activateRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.empleadoService
          .get(id)
          .subscribe((es) => ((this.empleado = es), console.log(es)));
      }
    });
  }

  create(): void {
    this.empleadoService
      .create(this.empleado)
      .subscribe((res) => this.router.navigate(['/empleados']));
  }

  update(): void {
    this.empleadoService
      .update(this.empleado)
      .subscribe((res) => this.router.navigate(['/empleados']));
  }

  cargos(): void {
    this.cargoService.getCargos().subscribe((c) => (this.cargo = c));
  }

  changeCargo(e: any) {
    console.log(e.target.value);
  }

  departamentos(): void {
    this.empleadoService
      .getDepartamentos()
      .subscribe((d) => (this.departamento = d));
  }
}
