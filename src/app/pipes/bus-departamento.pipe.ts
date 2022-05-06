import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busDepartamento',
})
export class BusDepartamentoPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultEmpleados = [];
    console.log(value, arg);
    for (const departamento of value) {
      if (
        departamento.nombre_departamento
          .toLowerCase()
          .indexOf(arg.toLowerCase()) > -1
      ) {
        resultEmpleados.push(departamento);
      }
    }

    return resultEmpleados;
  }
}
