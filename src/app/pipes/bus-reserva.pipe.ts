import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busReserva',
})
export class BusReservaPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultReserva = [];
    console.log(value, arg);
    for (const reserva of value) {
      if (
        reserva.id_habitacion.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        reserva.nombre_completo.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        reserva.id.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultReserva.push(reserva);
      }
    }

    return resultReserva;
  }
}
