import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Habitacion } from '../reserva/habitacion';
import { HabitacionService } from '../reserva/habitacion.service';
import { LoginService } from '../login/login.service';
import { Reserva } from '../reserva/reserva';
import { ReservaService } from '../reserva/reserva.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  habitaciones!: Habitacion[];
  reservaciones!: Reserva[];
  fechaInicio!: Date;
  fechaFin!: Date;
  habitaciones_disponibles?: any[] = [];
  recibidoDePadre?: number;

  constructor(
    public loginService: LoginService,
    private habitacionService: HabitacionService,
    private reservaService: ReservaService
  ) {}
  ngOnInit(): void {
    this.habitacionService.getAll().subscribe((e) => (this.habitaciones = e));
    this.reservaService.getAll().subscribe((r) => (this.reservaciones = r));
    //metodo que ejecuta a menos de medio segundo para que traiga las habitaciones disponibles

  }

  btnEnviarHijo(item?:number){
    this.recibidoDePadre = item;
  }
  buscar() {
    this.habitaciones_disponibles=[];
    this.obtenerHabitacionesDisponibles(this.fechaInicio, this.fechaFin);
  }
  obtenerHabitacionesDisponibles(fechaInicio: Date, fechaFin: Date) {
    this.habitaciones_disponibles = this.habitaciones;
    console.log(this.habitaciones_disponibles[0].estado_habitacion);
    for(let i =0; i <this.reservaciones?.length; i++){
      let fecha_inicio_reserva: Date = moment(
          this.reservaciones[i].fecha_ingreso
      )?.toDate();
      let fecha_fin_reserva: Date = moment(
        this.reservaciones[i].fecha_salida
      )?.toDate();

      let hora_fin: number = Number(this.reservaciones[i].hora_salida) + 1;

      if(
        (fecha_inicio_reserva >= fechaInicio &&
          fecha_inicio_reserva <= fechaFin) ||
        (fecha_fin_reserva >= fechaInicio && fecha_fin_reserva <= fechaFin)  
      ){
        const element = this.reservaciones[i].id_habitacion;
         //this.habitaciones[Number(element)].estado_habitacion = false;
         this.habitaciones_disponibles[Number(element)].fecha_disponibilidad =
          moment(fecha_fin_reserva).format('DD/MMM');
         this.habitaciones_disponibles[Number(element)].hora_disponibilidad =
          hora_fin;
      }
      this.habitaciones_disponibles = this.habitaciones;

      console.log(this.habitaciones_disponibles);
      console.log(fecha_fin_reserva);
      console.log(hora_fin);    
    }
   
  }
}
