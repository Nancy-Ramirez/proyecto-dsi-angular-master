import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from './cargo';
import { CargoService } from './cargo.service';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css'],
})
export class FormCargoComponent implements OnInit {
  submitted = false;
  titulo: string = 'Registro de Cargo';
  cargo: Cargo = new Cargo();

  constructor(
    private cargoService: CargoService,
    private router: Router,
    private activateRoute: ActivatedRoute
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
        this.cargoService
          .get(id)
          .subscribe((es) => ((this.cargo = es), console.log(es)));
      }
    });
  }

  create(): void {
    this.cargoService
      .create(this.cargo)
      .subscribe((res) => this.router.navigate(['/cargos']));
    console.log(this.cargo);
  }

  update(): void {
    this.cargoService
      .update(this.cargo)
      .subscribe((res) => this.router.navigate(['/cargos']));
  }
}
