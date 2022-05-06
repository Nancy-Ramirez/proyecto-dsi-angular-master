import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from './departamento';
import { DepartamentoService } from './departamento.service';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html',
  styleUrls: ['./form-departamento.component.css'],
})
export class FormDepartamentoComponent implements OnInit {
  submitted = false;
  titulo: string = 'Registro de Departamento';
  departamento: Departamento = new Departamento();

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.activateRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.departamentoService
          .get(id)
          .subscribe((es) => ((this.departamento = es), console.log(es)));
      }
    });
  }
  onSubmit(): void {
    this.submitted = true;
  }
  create(): void {
    this.departamentoService
      .create(this.departamento)
      .subscribe((res) => this.router.navigate(['/departamentos']));
  }

  update(): void {
    this.departamentoService
      .update(this.departamento)
      .subscribe((res) => this.router.navigate(['/departamentos']));
  }
}
