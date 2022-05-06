import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busCargo',
})
export class BusCargoPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultEmpleados = [];
    console.log(value, arg);
    for (const cargo of value) {
      if (cargo.nombre_cargo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultEmpleados.push(cargo);
      }
    }

    return resultEmpleados;
  }
}
