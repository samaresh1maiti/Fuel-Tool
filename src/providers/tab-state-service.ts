import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the TabStateService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TabStateService {

  constructor(public http: Http) {
    console.log('Hello TabStateService Provider');
  }

  public states: { [s: string]: any } = {};

  setState(tab: string, enabled: boolean) {
    this.states[tab] = enabled;
  }

}
