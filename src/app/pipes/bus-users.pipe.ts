import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busUsers',
})
export class BusUsersPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultusers = [];
    console.log(value, arg);
    for (const users of value) {
      if (
        users.username.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        users.name.toLowerCase().indexOf(arg.toLowerCase()) >
          -1 ||
        users.last_name.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultusers.push(users);
      }
    }

    return resultusers;
  }
}
