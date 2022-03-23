import { Component } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

declare var retrieveContentFromPitcher:any;
/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPagePage {

  constructor(public navCtrl: NavController, navParams: NavParams, public loadingCtrl: LoadingController,) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPagePage');
    //open this part***************************
    let loading = this.loadingCtrl.create({
      content: 'Fetching your details...'
    });
  
   loading.present();
   
  // retrieveContentFromPitcher();


    setTimeout(()=>{
      
      if(localStorage.getItem("previouscountry") == null || localStorage.getItem("previouscountry") == undefined){
        localStorage.setItem("selectedCountry","United States");
        localStorage.setItem("selectedLanguage", "English (US)")
      }else
      {
        localStorage.setItem("selectedCountry",localStorage.getItem("previouscountry"));
        localStorage.setItem("selectedLanguage", localStorage.getItem("previouslanguage"))
      }
    //open this part****************************
     loading.dismiss();
       this.navCtrl.setRoot(HomePage);
      

    }, 2000);
  }
// nextView(){
//   this.navCtrl.setRoot(HomePage);
// }
}
