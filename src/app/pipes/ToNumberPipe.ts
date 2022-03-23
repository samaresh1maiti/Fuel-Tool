import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by hua on 15/05/17.
 */



@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {
  transform(value: string):any {
    let retNumber = Number(value);
    return isNaN(retNumber) ? 0 : retNumber;
  }
}
