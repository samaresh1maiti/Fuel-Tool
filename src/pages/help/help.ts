import { Component } from '@angular/core';
import {NavController, NavParams, ViewController,LoadingController} from 'ionic-angular';
import * as html2canvas from "../../html2canvas.js";
/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  pageHelp = true;
  baseRolling = false;

  unit = 'kilometers'

  constructor( public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
     public viewCtrl:ViewController) {

    this.pageHelp = true;
    if(navParams.get("passedinData") == "rollingResistance"){
      this.baseRolling = true;
      this.pageHelp = false;
    }

    this.unit = localStorage.getItem('unit system') == 'metric' ? 'kilometers' : 'miles'


  }
  createScreenShot(){
    let loading = this.loadingCtrl.create({
      content: 'Preparing..'
    });
    loading.present();
    var useHeight = document.getElementById('explaination').scrollHeight;
    var useWidth = document.getElementById('explaination').scrollWidth;
    html2canvas(document.getElementById("explaination"), {width: useWidth, height: useHeight * 1.2}).then
    (function(canvas) {
        var imgData = canvas.toDataURL(
            'image/png');
        localStorage.setItem('explaination', imgData);
        setTimeout(() => {
          loading.dismiss();
        }, 100);
    
        
    });

  }
  ionViewDidLoad() {
    this.createScreenShot();
    console.log('ionViewDidLoad HelpPage');
  }

  closeModal(){
    
    this.navCtrl.pop();
}

}
