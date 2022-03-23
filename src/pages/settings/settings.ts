import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Platform} from 'ionic-angular'
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {HomePage} from "../home/home";
import {TranslateService} from '@ngx-translate/core';
import {SettingsModel} from '../../app/models/SettingsModel.ts'
import {Storage} from '@ionic/storage'
import {AutocompletePagePage} from "../autocomplete-page/autocomplete-page";
import {CheckModel} from "../../app/models/CheckModel";
import { Dataservice } from '../../providers/dataservice';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  // @ViewChild('language') languageBox;

  tracks: Array<CheckModel> = [];
  isiOSAndroid:boolean = false;

  show = false;

  backimg:any;

  // language = 'English (US)';


  languageCode = 'EN';
  currencyCode = 'USD';

  kilometerLabel = "";


  // languages = ["English (US)", "Espanol (MX)", "English (CA)", "Francais (CA)",  "Francais"];
  // languageMap = {"English (US)": "en",  "Espanol (MX)":"es", "English (CA)" : "en_ca", "Francais (CA)":"fr_ca", "Francais":"fr_fr"};
  // languageMapReverse = {"en": "English (US)", "es":"Espanol (MX)",  "en_ca": "English (CA)",  "fr_ca": "Francais (CA)", "fr_fr":"Francais"};
  selectedLanguage: string = "";
  selectedCurrency = 'EUR';

  languages = ["English (US)", "English (CA)","English (IN)","English (UK)","English (NA)","English (AIM)", "Francais (CA)", "Francais", "Bulgarian","Czech","Danish","Austria","German","Greek","Mexico","Spanish","Estonian","Finnish","Croatian","Hungarian","Indonesian","Italian","Japanese","Korean","Korean-Adjustment","Latvian","Dutch","Norwegian","Polish","Polski","Portuguese (BR)","Portuguese","Romanian","Russian","Slovak","Slovenian","Serbian","Swedish","Thai","Turkish","Ukrainian","Vietnamese","Chinese (Simplified)","Chinese (Traditional)"];
  languageMapReverse = {"en": "English (US)",  "en-CA": "English (CA)","en-in":"English (IN)" ,"en-UK":"English (UK)","en-NA":"English (NA)","en-AIM":"English (AIM)",  "fr-CA": "Francais (CA)", "fr":"Francais","bg":"Bulgarian","cs":"Czech","da":"Danish","de-AT":"Austria","de":"German","el":"Greek","es-MX":"Spanish (Mexico)","es":"Spanish","et":"Estonian","fi":"Finnish","hr":"Croatian","hu":"Hungarian","id": "Indonesian","it":"Italian","ja":"Japanese","ko":"Korean","ko-ADJ":"Korean-Adjustment","lv":"Latvian","nl":"Dutch","no":"Norwegian","pl":"Polish","polski":"Polski","pt-BR":"Portuguese (BR)","pt":"Portuguese","ro":"Romanian","ru":"Russian","sk":"Slovak","sl":"Slovenian","sr":"Serbian","sv":"Swedish","th":"Thai","tr":"Turkish","uk":"Ukrainian","vi":"Vietnamese","zh-CN":"Chinese (Simplified)","zh-TW":"Chinese (Traditional)"};
  languageMap = {"English (US)": "en",  "English (CA)" : "en-CA","English (IN)": "en-in", "English (UK)": "en-UK","English (NA)": "en-NA","English (AIM)": "en-AIM", "Francais (CA)" : "fr-CA", "Francais":"fr","Bulgarian" : "bg","Czech" : "cs","Danish" : "da","Austria": "de-AT","German":"de","Greek":"el","Spanish (Mexico)":"es-MX","Spanish":"es","Estonian":"et","Finnish":"fi","Croatian":"hr","Hungarian":"hu","Indonesian": "id","Italian":"it","Japanese":"ja","Korean":"ko","Korean-Adjustment":"ko-ADJ","Latvian":"lv","Dutch":"nl","Norwegian":"no","Polish":"pl","Polski":"polski","Portuguese (BR)":"pt-BR","Portuguese":"pt","Romanian":"ro","Russian":"ru","Slovak":"sk","Slovenian":"sl","Serbian":"sr","Swedish":"sv","Thai":"th","Turkish":"tr","Ukrainian":"uk","Vietnamese":"vi","Chinese (Simplified)":"zh-CN","Chinese (Traditional)":"zh-TW"};
  currencyMapByLang = {"English (US)": "USD","English (NA)": "USD","English (AIM)": "USD","English (CA)" : "CAD","English (IN)" : "INR","English (UK)" : "GBP",  "Francais":"EUR", "Francais (CA)": "CAD", "Arabic" : "AED","Bulgarian" : "BGN","Czech" : "CZK","Danish" : "DKK","Austria": "EUR","German":"EUR","Greek":"EUR","Mexico":"MXN","Spanish":"EUR","Estonian":"EUR","Finnish":"EUR","Croatian":"HRK","Hungarian":"HUF","Indonesian":"IDR","Italian":"EUR","Japanese":"JPY","Korean":"KPW","Korean-Adjustment":"KPW","Latvian":"EUR","Dutch":"EUR","Norwegian":"NOK","Polish":"PLN","Polski":"PLN","Portuguese (BR)":"EUR","Portuguese":"EUR","Romanian":"RON","Russian":"RUB","Slovak":"EUR","Slovenian":"EUR","Serbian":"RSD","Swedish":"SEK","Thai":"THB","Turkish":"TRY","Ukrainian":"UAH","Vietnamese":"VND","Chinese (Simplified)":"CNY","Chinese (Traditional)":"CNY"};

  fuel_calculation_toggle = true;
  mileage_calculation_toggle = true;

  weight_savings_toggle = true;
  basic_analysis_toggle = true;
  life_cycle_analysis_toggle = true;

  settingItems = [];

  fleet_name = "";

  count = 1;
  currencyArr = [];
  Countries = [];
  Languages = [];
  CurrencyA = [];
  languageObjects = {}
  selectedCountry = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public thisPlt:Platform, public translateService:TranslateService,  public storage:Storage, private modalCtrl:ModalController,public dataservice : Dataservice) {
    var currentCheckModel = new CheckModel();

    currentCheckModel.name = "Metric Units";
    currentCheckModel.isChecked = true;
    this.tracks.push(currentCheckModel);
    this.backimg = 'assets/img/BIB-MICHELIN.jpg';

    if(this.thisPlt.is('ios') || this.thisPlt.is('android')){
      this.isiOSAndroid = true;
    }

    if(localStorage.getItem('selectedCurrency') != null && localStorage.getItem('selectedCurrency') != undefined){
      this.currencyCode = localStorage.getItem('selectedCurrency');
    }

    this.selectedCurrency =  localStorage.getItem("selectedCurrency") == null ? 'EUR' : localStorage.getItem("selectedCurrency");

    this.currencyArr= [];
    this.countryJsoncall()
    dataservice.getData('assets/api/Currency.json').subscribe((currencyData) => {

      for (var i = 0; i < Object.keys(currencyData).length; i++) {
        this.currencyArr.push(Object.keys(currencyData[i])[0])
        localStorage.setItem(Object.keys(currencyData[i])[0],currencyData[i][Object.keys(currencyData[i])[0]]);
        // localStorage.setItem(currencyData[i][Object.keys(currencyData[i])[0]],Object.keys(currencyData[i])[0]);

      }
    })

    this.weight_savings_toggle = localStorage.getItem('weightSavingToggle') == 'true'? true : false;

    this.tracks[0].isChecked = localStorage.getItem('unit system') == 'metric'?true:false;

    this.translateService.get(['kilometer_calculation', 'mile_calculation']).subscribe(text => {

      if(this.tracks[0].isChecked){
        this.kilometerLabel = text['kilometer_calculation']
      }else{
        this.kilometerLabel = text['mile_calculation']

      }

    });


    this.selectedLanguage = this.languageMapReverse[localStorage.getItem('language')];


       if(this.selectedLanguage == null || this.selectedLanguage == ""){
         this.translateService.setDefaultLang(this.languageMap["English (US)"]);
         this.selectedLanguage = "English (US)";
         //this.selectedCurrency = this.currencyMapByLang[this.selectedLanguage];
        }else{
         this.translateService.setDefaultLang(localStorage.getItem('language'));
         //this.selectedCurrency = this.currencyMapByLang[this.selectedLanguage];
        }
        this.selectedCountry = localStorage.getItem('country');
    
        if (this.selectedCountry == null || this.selectedCountry == undefined || this.selectedCountry == '') {
          this.selectedCountry = 'United States';
        }


    if(localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined){
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }


    if(localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined){
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true :false;
    }


  }

countryJsoncall(){
  this.dataservice.getData('assets/data/Country.json').subscribe((countryData) => {
    this.Countries = [];
    this.Languages = [];
    this.CurrencyA = [];
    this.languageObjects = countryData;
    for (var i = 0; i < countryData.length; i++) {
      // this.Countries.push(countryData[i].Countryregion)
      if (this.Countries.indexOf(countryData[i].Countryregion) == -1) {
        this.Countries.push(countryData[i].Countryregion);
      }
      if (this.Languages.indexOf(countryData[i].Language) == -1) {
        this.Languages.push(countryData[i].Language);
      }
      if (this.CurrencyA.indexOf(countryData[i].Currency) == -1) {
        this.CurrencyA.push(countryData[i].Currency);
      }
    }
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');


    this.count = 1;

    // if(this.selectedLanguage == null || this.selectedLanguage == "" || this.selectedLanguage == undefined){
    //   this.selectedLanguage = "English (US)";
    // }

  }

  onChangeC() {
    for (var i = 0; i < Object.keys(this.languageObjects).length; i++) {
      if(this.languageObjects[i].Countryregion == this.selectedCountry){
        this.selectedLanguage = this.languageObjects[i].Language;
        this.translateService.setDefaultLang(this.languageMap[this.selectedLanguage]);
        this.translateService.use(this.languageMap[this.selectedLanguage]);
        localStorage.setItem('language', this.languageMap[this.selectedLanguage]);
        if (this.languageObjects[i].Countryregion == this.selectedCountry && this.languageObjects[i].Language == this.selectedLanguage ){
          localStorage.setItem("selectedCurrency", this.languageObjects[i].Currency);
          this.selectedCurrency = this.languageObjects[i].Currency;
        }
    
      }
    }
  } 
  onChange(languageValue){
    // console.log(languageValue);
    this.translateService.setDefaultLang(this.languageMap[languageValue]);
    this.translateService.use(this.languageMap[languageValue]);
    // this.storage.set("language", this.languageMap[languageValue]);

    localStorage.setItem('language', this.languageMap[languageValue]);
    // localStorage.setItem('languageValue', languageValue);


  }

  onChangeUnits(units){



  }


  openNext(){

    var unitsSystem = this.tracks[0].isChecked ? "metric" : "us";

    this.navCtrl.setRoot(HomePage, {'language': this.languageMap[this.selectedLanguage], "units":unitsSystem});


    if(this.weight_savings_toggle){
      localStorage.setItem("calculateWeight", 'true');
    }else{
      localStorage.setItem("calculateWeight", 'false');
    }

  }

  ionViewWillLeave() {

    // this.storage.set('weightSavingToggle', this.weight_savings_toggle);
    localStorage.setItem('weightSavingToggle', this.weight_savings_toggle == true?'true':'false');
    // localStorage.setItem('settingparameters', JSON.stringify(settingModel));
    localStorage.setItem('units', this.tracks[0].isChecked?'false':"true");

    localStorage.setItem('fuelCalculation', this.fuel_calculation_toggle == true?'true': 'false');
    localStorage.setItem('mileageCalculation', this.mileage_calculation_toggle == true? 'true' : 'false');


  }


  Swap(dict){
  var ret = {};
  for(var key in dict){
    ret[dict[key]] = key;
  }
  return ret;
}



  showAutocompleteModal (id) {
    switch (id) {
      case 2:
        let modal2 = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.Countries.sort()});
        modal2.onDidDismiss(data => {
          // switch (name) {
          //   case 'language':
          if (data != undefined && data != null)
          {
              this.selectedCountry = data;
              localStorage.setItem("country", this.selectedCountry);
              this.onChangeC();
              // break
           }else
           {
            this.selectedCountry = 'United States';
            this.selectedLanguage = 'English (US)';
            this.selectedCurrency = 'USD';
            localStorage.setItem("selectedCurrency", this.selectedCurrency);
            localStorage.setItem("selectedCountry", this.selectedCountry);
            localStorage.setItem("selectedLanguage", this.selectedLanguage);
            // this.onChange(this.selectedLanguage);
           }
        });
        modal2.present();
        break;
      case 0:
          let modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.Languages.sort()});
          modal.onDidDismiss(data => {
            switch(id) {
              case 0:
              this.selectedLanguage = data;
              this.onChange(this.selectedLanguage);
              // this.selectedCurrency = this.currencyMapByLang[data];
              // localStorage.setItem("selectedCurrency", this.selectedCurrency);
                break
            }
          });
          modal.present();
        break;
      case 1:
        let modal1 = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.CurrencyA.sort()});
        modal1.onDidDismiss(data => {
            switch (id) {
              case 1:
                this.selectedCurrency = data;
                localStorage.setItem("selectedCurrency", this.selectedCurrency);
                break
            }
          });
          modal1.present();
        break;  

    }
   
  }


onUnitsChange(){
    // this.storage.set('units', this.tracks[0].isChecked);
    localStorage.setItem('unit system', this.tracks[0].isChecked?'metric':'us');

  this.translateService.get(['kilometer_calculation', 'mile_calculation']).subscribe(text => {

    // if(this.tracks[0].isChecked){
    //   // alert("kilometer")
    //   // this.kilometerLabel = text['kilometer_calculation']
    //   document.getElementById("kilolabel").innerText = text['kilometer_calculation'];
    // }else{
    //   document.getElementById("kilolabel").innerText = text['mile_calculation']

    // }

  });

  // alert(this.kilometerLabel + "test");
}


resetApp(){


  var accountEmail = localStorage.getItem('accountContactEmail');
  var currencyCode  = localStorage.getItem('selectedCurrency');
  var language = localStorage.getItem("originLanguage");
  // var fleetName = localStorage.getItem('fleetName');
  var userEmail = localStorage.getItem('userEmail');

  this.storage.clear();
  localStorage.clear();
  sessionStorage.clear();

  localStorage.setItem('accountContactEmail', accountEmail);
  this.selectedCurrency = 'EUR';
  this.selectedCountry = "United States"
  localStorage.setItem("selectedCountry", this.selectedCountry);
  localStorage.setItem('selectedCurrency', this.selectedCurrency);
  localStorage.setItem("language", language);
  localStorage.setItem("originLanguage", language);
  // localStorage.setItem('fleetName', fleetName);
  localStorage.setItem('userEmail', userEmail);
  language = (language != null && language != "null") ? language: 'en';
  this.selectedLanguage = this.languageMapReverse[language];
  this.onChange(this.selectedLanguage);
  localStorage.setItem('unit system', this.tracks[0].isChecked?'metric':'us');
  this.translateService.setDefaultLang(language);
  this.tracks[0].isChecked = true;
  localStorage.setItem('unit system', 'metric');

  //Local Currency json..
  this.dataservice.getData('assets/data/Currency.json').subscribe((currencyData) => {
    for (var i = 0; i < Object.keys(currencyData).length; i++) {
    localStorage.setItem(Object.keys(currencyData[i])[0],currencyData[i][Object.keys(currencyData[i])[0]]);
    }
    })
  
}


}



