import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busServicio',
})
export class BusServicioPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultServicio = [];
    console.log(value, arg);
    for (const servicio of value) {
      if (servicio.nombre_servicio.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultServicio.push(servicio);
      }
    }

    return resultServicio;
  }
}