import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Dataservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dataservice {

  constructor(public http: Http) {
    console.log('Hello Dataservice Provider');
  }

  getData(path){
    return this.http.get(path).map((res:Response) => res.json());
  }

}
