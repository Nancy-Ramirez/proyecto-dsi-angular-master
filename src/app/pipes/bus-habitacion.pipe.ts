import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busHabitacion',
})
export class BusHabitacionPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultEmpleados = [];
    console.log(value, arg);
    for (const habitacion of value) {
      if (
        habitacion.tipo_habitacion.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        habitacion.numero_habitacion.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        habitacion.numero_piso.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultEmpleados.push(habitacion);
      }
    }

    return resultEmpleados;
  }
}
