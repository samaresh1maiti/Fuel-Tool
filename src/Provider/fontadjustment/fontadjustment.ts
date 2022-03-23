import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FontadjustmentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FontadjustmentProvider {

  constructor(public http: Http) {
    console.log('Hello FontadjustmentProvider Provider');
  }



  calculateFontSize(elementname){
    console.log(document.getElementById(elementname));
    var width = document.getElementById(elementname).offsetWidth;
    var textlength = document.getElementById(elementname).innerText.length;
    var height = document.getElementById(elementname).offsetHeight;
    var scrollheight = document.getElementById(elementname).scrollHeight;
    var fontSize = parseInt(window.getComputedStyle(document.getElementById(elementname), null).getPropertyValue('font-size').slice(0, -2));
    return Math.ceil(fontSize * (height/scrollheight)) + window.getComputedStyle(document.getElementById(elementname), null).getPropertyValue('font-size').slice(-2);
  }
}
