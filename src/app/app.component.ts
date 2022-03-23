import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
// import { TabsPage } from '../pages/tabs/tabs';

import { SettingsPage } from '../pages/settings/settings';
// import { AccountPage } from '../pages/TiresInfo/account';
import {ScenarioSummaryPage} from "../pages/scenario-summary/scenario-summary";
import {HomePage} from "../pages/home/home";
import { LandingPagePage } from '../pages/landing/landing';
// import {ResultPagePage} from "../pages/result-page/result-page";
import { AlertController } from 'ionic-angular';
import {WeightSavingPage} from "../pages/weight-saving/weight-saving";
import {TabsResultPage} from "../pages/tabs-result/tabs-result"
import {ResultPagePage} from "../pages/result-page/result-page";
import {ConfigurationPage} from "../pages/configuration/configuration";
import {GraphPage} from "../pages/graph/graph";
import {TabsPage} from "../pages/tabs/tabs";
import {AccountPage} from "../pages/TiresInfo/account";
import { TranslateService } from '@ngx-translate/core';
import { Dataservice } from '../providers/dataservice';

declare var closeModal: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage = HomePage;

   rootPage = LandingPagePage;
  // rootPage = SettingsPage;
 
  pages: Array<{title: string, component: any}>;
  resultPageTitle = "";
  // languageMapReversed = {"en": "English (US)",  "en-CA": "English (CA)","en-in":"English (IN)", "en-UK":"English (UK)","fr-CA": "Francais (CA)", "fr":"Francais","bg":"Bulgarian","cs":"Czech","da":"Danish","de-AT":"Austria","de":"German","el":"Greek","es-MX":"Mexico","es":"Spanish","et":"Estonian","fi":"Finnish","hr":"Croatian","hu":"Hungarian","it":"Italian","ja":"Japanese","ko":"Korean","ko-ADJ":"Korean-Adjustment","lv":"Latvian","nl":"Dutch","no":"Norwegian","pl":"Polish","pt-BR":"Portuguese (BR)","pt":"Portuguese","ro":"Romanian","ru":"Russian","sk":"Slovak","sl":"Slovenian","sr":"Serbian","sv":"Swedish","th":"Thai","tr":"Turkish","uk":"Ukrainian","vi":"Vietnamese","zh-CN":"Chinese (Simplified)","zh-TW":"Chinese (Traditional)"};
  // currencyMapByLangs = {"English (US)": "USD","English (CA)" : "CAD","English (IN)" : "INR","English (UK)" : "GBP","Francais":"EUR", "Francais (CA)": "CAD", "Arabic" : "AED","Bulgarian" : "BGN","Czech" : "CZK","Danish" : "DKK","Austria": "EUR","German":"EUR","Greek":"EUR","Mexico":"MXN","Spanish":"EUR","Estonian":"EUR","Finnish":"EUR","Croatian":"HRK","Hungarian":"HUF","Indonesian":"IDR","Italian":"EUR","Japanese":"JPY","Korean":"KPW","Korean-Adjustment":"KPW","Latvian":"EUR","Dutch":"EUR","Norwegian":"NOK","Polish":"PLN","Portuguese (BR)":"EUR","Portuguese":"EUR","Romanian":"RON","Russian":"RUB","Slovak":"EUR","Slovenian":"EUR","Serbian":"RSD","Swedish":"SEK","Thai":"THB","Turkish":"TRY","Ukrainian":"UAH","Vietnamese":"VND","Chinese (Simplified)":"CNY","Chinese (Traditional)":"CNY"};
  languageArr = {"en":"en","fr":"fr","cafr":"fr-CA","ar":"ar","bu":"bg","cz":"cs","dan":"da","ausde":"de-AT","de":"de","el":"el","esmx":"es-MX","es":"es","est":"et",
                  "fi":"fi", "hr":"hr","hu":"","it":"it","jp":"ja","ko":"ko","ko-ADJ":"ko","let":"lv","nl":"nl","no":"no","po":"pl","BR":"pt-BR","prt":"pt","ro":"ro","ru":"ru","sk":"sk",
                  "sl":"sl","sr":"sr","sw":"sv","th":"th","tr":"tr","ua":"uk","vi":"vi","sch":"zh-CN","tch":"zh-TW","pat":"pat","en-e2a":"en-e2a"};
                  currencyMapByLangs = {
                    "English (E2A)": "AUD",
                    "English (US)": "USD",
                    "English (CA)": "USD",
                    "Francais (CA)": "EUR",
                    "Francais": "EUR",
                    "Arabic": "AED",
                    "Bulgarian": "BGN",
                    "Czech": "CZK",
                    "Danish": "DKK",
                    "Austria": "ATS",
                    "German": "EUR",
                    "Greek": "EUR",
                    "Mexico": "MXN",
                    "Spanish": "EUR",
                    "Estonian": "EUR",
                    "Finnish": "EUR",
                    "Croatian": "HRK",
                    "Hungarian": "HUF",
                    "Italian": "EUR",
                    "Japanese": "JPY",
                    "Korean": "KPW",
                    "Latvian": "EUR",
                    "Dutch": "EUR",
                    "Norwegian": "NOK",
                    "Polish": "PLN",
                    "Portuguese (BR)": "EUR",
                    "Portuguese": "EUR",
                    "Romanian": "RON",
                    "Russian": "RUB",
                    "Slovak": "EUR",
                    "Slovenian": "EUR",
                    "Serbian": "RSD",
                    "Swedish": "SEK",
                    "Thai": "THB",
                    "Turkish": "TRY",
                    "Ukrainian": "UAH",
                    "Vietnamese": "VND",
                    "Chinese (Simplified)": "CNY",
                    "Chinese (Traditional)": "CNY",
                    "Patois":"USD"
                  };
                  languageMapReversed = {
                    "en-e2a": "English (E2A)",
                    "en": "English (US)",
                    "en-CA": "English (CA)",
                    "fr-CA": "Francais (CA)",
                    "fr": "Francais",
                    "ar": "Arabic",
                    "bg": "Bulgarian",
                    "cs": "Czech",
                    "da": "Danish",
                    "de-AT": "Austria",
                    "de": "German",
                    "Greek": "el",
                    "es-MX": "Spanish (Mexico)",
                    "es": "Spanish",
                    "et": "Estonian",
                    "fi": "Finnish",
                    "hr": "Croatian",
                    "hu": "Hungarian",
                    "it": "Italian",
                    "ja": "Japanese",
                    "ko": "Korean",
                    "lv": "Latvian",
                    "nl": "Dutch",
                    "no": "Norwegian",
                    "pl": "Polish",
                    "pt-BR": "Portuguese (BR)",
                    "pt": "Portuguese",
                    "ro": "Romanian",
                    "ru": "Russian",
                    "sk": "Slovak",
                    "sl": "Slovenian",
                    "sr": "Serbian",
                    "sv": "Swedish",
                    "th": "Thai",
                    "tr": "Turkish",
                    "uk": "Ukrainian",
                    "vi": "Vietnamese",
                    "zh-CN": "Chinese (Simplified)",
                    "zh-TW": "Chinese (Traditional)",
                    "pat":"Patois"
                  };
                  
languageMap = {"English (E2A)": "en-e2a","English (US)": "en",  "English (CA)" : "en-CA","English (IN)": "en-in", "English (UK)": "en-UK","English (NA)": "en-NA","English (AIM)": "en-AIM", "Francais (CA)" : "fr-CA", "Francais":"fr","Bulgarian" : "bg","Czech" : "cs","Danish" : "da","Austria": "de-AT","German":"de","Greek":"el","Spanish (Mexico)":"es-MX","Spanish":"es","Estonian":"et","Finnish":"fi","Croatian":"hr","Hungarian":"hu","Indonesian": "id","Italian":"it","Japanese":"ja","Korean":"ko","Korean-Adjustment":"ko-ADJ","Latvian":"lv","Dutch":"nl","Norwegian":"no","Polish":"pl","Polski":"polski","Portuguese (BR)":"pt-BR","Portuguese":"pt","Romanian":"ro","Russian":"ru","Slovak":"sk","Slovenian":"sl","Serbian":"sr","Swedish":"sv","Thai":"th","Turkish":"tr","Ukrainian":"uk","Vietnamese":"vi","Chinese (Simplified)":"zh-CN","Chinese (Traditional)":"zh-TW"};
          


  constructor(public platform: Platform,private translate: TranslateService, public alertCtrl:AlertController,private translateService:TranslateService,public dataservice:Dataservice) {
    // alert("origin lang"+localStorage.getItem("originLanguage"));
    setTimeout(() => {
      /*converting to metric untis logic */
      console.log("unit", (localStorage.getItem("measurementUnit") == "km" ?'metric':'us'));
      localStorage.setItem('unit_system', (localStorage.getItem("measurementUnit") == "km" ?'metric':'us'));

      if(localStorage.getItem("usercountry") != null && localStorage.getItem("usercountry") != "undefined"){
        localStorage.setItem('unit_system', (localStorage.getItem("usercountry") === "US" ?'us':'metric'));
      }
/* END converting to metric untis logic */
    if(localStorage.getItem("selectedLanguage")!=null && localStorage.getItem("selectedLanguage")!="" && this.languageArr[localStorage.getItem("selectedLanguage")] != null && this.languageArr[localStorage.getItem("selectedLanguage")] != "")
    {
      // alert("testif"+localStorage.getItem("originLanguage"));
      // alert("this.languageArr[localStorage.getItem('originLanguage')]"+ this.languageArr[localStorage.getItem("originLanguage")]);

      this.translate.setDefaultLang(this.languageArr[localStorage.getItem("selectedLanguage")]);
      this.translate.use(this.languageArr[localStorage.getItem("selectedLanguage")]);
      localStorage.setItem("language",this.languageArr[localStorage.getItem("selectedLanguage")]);
      localStorage.setItem("selectedCurrency", this.currencyMapByLangs[this.languageMapReversed[this.languageArr[localStorage.getItem("selectedLanguage")]]]);
     }else{
   
     if (localStorage.getItem('selectedLanguage') == null || localStorage.getItem('selectedLanguage') == undefined){
      console.log("english defualt lang test");
      this.translate.use('en');
      this.translate.setDefaultLang('en');
     }else{
      this.translate.use(this.languageMap[localStorage.getItem("selectedLanguage")]);
      this.translate.setDefaultLang(this.languageMap[localStorage.getItem("selectedLanguage")]);


     }
  
      localStorage.setItem("country",'United States');
      localStorage.setItem("language",'en');
      localStorage.setItem("selectedCurrency", 'EUR');}
  
      this.dataservice.getData('assets/data/Currency.json').subscribe((currencyData) => {
 
        for (var i = 0; i < Object.keys(currencyData).length; i++) {
        localStorage.setItem(Object.keys(currencyData[i])[0],currencyData[i][Object.keys(currencyData[i])[0]]);
        }
        })
    this.initializeApp();

    translateService.get(['results']).subscribe(text => {
      this.resultPageTitle = text['results'];
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'fleet_details', component: HomePage },
      { title: 'options_settings', component: SettingsPage }
      // { title: 'Scenario Analysis', component: TabsPage},
      // { title: 'Results', component:TabsResultPage}
    ];
  }, 500);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if(page.title == this.resultPageTitle){
      // let alert = this.alertCtrl.create({
      //   subTitle: 'Do you want to consider weight saving',
      //   buttons: [{
      //     text: 'OK',
      //     handler: () => {
      //       this.nav.setRoot(WeightSavingPage);
      //     }
      //   }, {
      //     text: 'Cancel',
      //     handler: () => {
      //       this.nav.setRoot(page.component);
      //     }
      //   }]
      // });
      // alert.present();

      this.nav.setRoot(WeightSavingPage);


    }else{
      this.nav.setRoot(page.component);
    }


  }

  exitFuelApp(){
    
    closeModal();

    // localStorage.removeItem('fleetName');
    // localStorage.removeItem('userEmail');
    // localStorage.removeItem('accountContactEmail');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // if (localStorage.getItem('language') == null) {
      //   alert("lang"+ localStorage.getItem('language'));
      //   this.translate.setDefaultLang('en');
      //   this.translate.use('en');
      // }else{
      //   alert("lang");
      //   this.translate.setDefaultLang(localStorage.getItem('language'));
      //   this.translate.use(localStorage.getItem('language'));
      // }

    
    

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


}
