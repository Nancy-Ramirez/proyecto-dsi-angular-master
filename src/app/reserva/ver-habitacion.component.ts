import { Component, OnInit } from '@angular/core';
import { Habitacion } from './habitacion';
import { LoginService } from '../login/login.service';
import { HabitacionService } from './habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Caracteristicas } from './caracteristicas';

@Component({
  selector: 'app-ver-habitacion',
  templateUrl: './ver-habitacion.component.html',
  styleUrls: ['./ver-habitacion.component.css']
})
export class VerHabitacionComponent implements OnInit {

  habitacion: Habitacion = new Habitacion();
  caract?: Caracteristicas[];


  constructor(
    public loginService: LoginService,
    private habitacionService: HabitacionService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    
  ) {
    
   }

  ngOnInit(): void {
    this.cargar();
    this.obtenerCarac();
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
   //caracteristica de habitacion
     obtenerCarac(): void {
        this.habitacionService
      .getCaracteristicas()
      .subscribe((c) => ((this.caract = c), console.log(c)));
  }
}
