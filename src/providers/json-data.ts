import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the JsonData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JsonData {

  data;

  constructor(public http: Http) {
    console.log('Hello JsonData Provider');
  }


  getData() {
    return this.http.get('data/config.json')
 .map((res:Response) => res.json());
  }

}
