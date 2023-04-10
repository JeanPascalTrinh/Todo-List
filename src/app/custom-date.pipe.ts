import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(timestamp: number, withHour: boolean): string {
    const dateVal: Date = new Date(timestamp);
    let result = `${dateVal.getDate()}/${
      dateVal.getMonth() + 1
    }/${dateVal.getFullYear()}`;
    if (withHour) {
      result += ` ${dateVal.getHours()}:${dateVal.getMinutes()}`;
    }
    return result;
  }
}
