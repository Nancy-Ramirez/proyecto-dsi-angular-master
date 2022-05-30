import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busUsuario',
})
export class BusUsuarioPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultusuario = [];
    console.log(value, arg);
    for (const usuario of value) {
      if (
        usuario.username.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        usuario.name.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        usuario.last_name.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultusuario.push(usuario);
      }
    }

    return resultusuario;
  }
}
