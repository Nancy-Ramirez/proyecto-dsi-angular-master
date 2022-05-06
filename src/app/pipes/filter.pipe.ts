import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultEmpleados = [];
    console.log(value, arg);
    for (const empleado of value) {
      if (
        empleado.nombres.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        empleado.apellidos.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultEmpleados.push(empleado);
      }
    }

    return resultEmpleados;
  }
}
