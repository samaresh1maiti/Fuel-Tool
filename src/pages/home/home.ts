import { Component, NgModule, NgZone } from '@angular/core';

import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { JsonData } from '../../providers/json-data'
import { ModalController } from 'ionic-angular';

import { AutocompletePagePage } from "../autocomplete-page/autocomplete-page";
import { TabsPage } from "../tabs/tabs";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { FleetDetailsModel } from "../../app/models/FleetDetailsModel.ts";
import { Http, Response } from '@angular/http'
import { Dataservice } from '../../providers/dataservice';
import { CheckModel } from "../../app/models/CheckModel";

declare var closeModal: any;
declare var closeModal: any;
declare var saveContent: any;
declare var retrieveInfoFromPitcher: any;
declare var Ti: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  tracks: Array<CheckModel> = [];
  Countries = [];
  Languages = [];
  CurrencyA = [];
  languageObjects = {}
  validation = true;
  validateemail = false;
  selectedMetricUnit = "United States"
  company = "";
  customerPhone = "";
  customerFullName = "";
  customerMail = "";
  selectedRegione2a = "";


  configs: any;
  configureName: any;
  indexValue = 0;
  focus: String = "steer";
  dataDesc = [];
  dataDesc1 = [];
  units: string = "us";
  showTrailerField: boolean = true
  mxMiles = 0;

  validfleet = {
    trucks: true,
    trailers: true,
    miles: true,
    fuelcost: true,
    mpg: true
  };

  longhaul = 0;
  regional = 0;
  urban = 0;
  totalvalue = 0;

  annualBills1;
  annualBill = '0';

  fleetsizetrucks = 0;
  fleetsizetrailers = 0;
  annualmilespervehicle = 0;
  currentpriceoffuel = 0;
  annualmpgpervehicle = 0;

  autoCompleteData = "4X2 STRAIGHT TRUCK >= 5500 KG";
  percentageOfFuelSaving = 0;
  percentageFuelSavingData = [];
  potentialFuelSaving = '0';
  potentialCOSaving = '0';

  settingItems: [{ title: string, value: any }];

  detailItems: [{ title: string, value: any }];

  vehicleTrailerNondrivenMap = {};

  vehicleConfigurationMap: any;

  annualaverageloadoftruck = 0;



  // languageArr = ['en', 'es', 'en_ca', 'fr_ca', 'fr_fr'];
  languageArr = ['en-e2a','en', 'en-CA', 'en-in', 'en-UK', 'fr-CA', 'fr', 'bg', 'cs', 'da', 'de-AT', 'de', 'el', 'es-MX', 'es', 'et', 'fi', 'hr', 'hu', 'it', 'ja', 'ko', 'ko-ADJ', 'lv', 'nl', 'no', 'pl', 'pt-BR', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tr', 'uk', 'vi', 'zh-CN', 'zh-TW', 'fr-QU', 'de-ch', 'it-ch', 'fr-ch'];

  trailerShow = true;
  nondrivenShow = true;


  results = { mfg: [], size: [], tread: [], rim: [], rr: [], weight: [], xone: [] };


  brandTreadMap = {};

  treadRRMap = {};


  treadSizeWeightMap = {};

  sizeArray = [];

  fuel_calculation_toggle = true;

  mileage_calculation_toggle = true;

  treadSizeMap = {};

  fleet_name = '';

  test = '';
  selectedCountry = '';
  selectedLanguage = '';
  selectedCurrencyS = '';
  currencyPostion = 'P';
  currencySeparator = ''
  langhaulValue = 10
  urbanValue = 10
  regionalValue = 10
  selectedRegion = '';
  tireTypesArr = ["Single tires", "Dual tires"];
  currencySymbol = "$";
  languageMapReverse = { "lo": "Loas", "co": "Combodia", "ph": "Philippines", "ma": "Mayanmar", "en-e2a": "English (E2A)", "en": "English (US)", "en-CA": "English (CA)", "en-in": "English (IN)", "en-UK": "English (UK)", "en-NA": "English (NA)", "en-AIM": "English (AIM)", "fr-CA": "Francais (CA)", "fr": "Francais", "bg": "Bulgarian", "cs": "Czech", "da": "Danish", "de-AT": "Austria", "de": "German", "el": "Greek", "es-MX": "Mexico", "es": "Spanish", "et": "Estonian", "fi": "Finnish", "hr": "Croatian", "hu": "Hungarian", "id": "Indonesian", "it": "Italian", "ja": "Japanese", "ko": "Korean", "ko-ADJ": "Korean-Adjustment", "lv": "Latvian", "nl": "Dutch", "no": "Norwegian", "polski": "Polish", "pt-BR": "Portuguese (BR)", "pt": "Portuguese", "ro": "Romanian", "ru": "Russian", "sk": "Slovak", "sl": "Slovenian", "sr": "Serbian", "sv": "Swedish", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian", "vi": "Vietnamese", "zh-CN": "Chinese (Simplified)", "zh-TW": "Chinese (Traditional)", "fr-ch": "French(CH)", "it-ch": "Italian(CH)", "de-ch": "German(CH)", "pat": "Patois" };
  currencyMapByLang = { "English (US)": "USD", "English (NA)": "USD", "English (AIM)": "USD", "English (CA)": "CAD", "English (IN)": "INR", "English (UK)": "GBP", "Francais": "EUR", "Francais (CA)": "CAD", "Arabic": "AED", "Bulgarian": "BGN", "Czech": "CZK", "Danish": "DKK", "Austria": "EUR", "German": "EUR", "Greek": "EUR", "Mexico": "MXN", "Spanish": "EUR", "Estonian": "EUR", "Finnish": "EUR", "Croatian": "HRK", "Hungarian": "HUF", "Indonesian": "IDR", "Italian": "EUR", "Japanese": "JPY", "Korean": "KPW", "Korean-Adjustment": "KPW", "Latvian": "EUR", "Dutch": "EUR", "Norwegian": "NOK", "Polish": "PLN", "Polski": "PLN", "Portuguese (BR)": "EUR", "Portuguese": "EUR", "Romanian": "RON", "Russian": "RUB", "Slovak": "EUR", "Slovenian": "EUR", "Serbian": "RSD", "Swedish": "SEK", "Thai": "THB", "Turkish": "TRY", "Ukrainian": "UAH", "Vietnamese": "VND", "Chinese (Simplified)": "CNY", "Chinese (Traditional)": "CNY", "German(CH)": "CHF", "French(CH)": "CHF", "Italian(CH)": "CHF", "Patois": "USD" };
  languages = ["Laos", "Combodia", "Philippines", "Mayanmar", "English (US)", "English (CA)", "English (IN)", "English (UK)", "English (NA)", "English (AIM)", "Francais (CA)", "Francais", "Bulgarian", "Czech", "Danish", "Austria", "German", "Greek", "Mexico", "Spanish", "Estonian", "Finnish", "Croatian", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Korean-Adjustment", "Latvian", "Dutch", "Norwegian", "Polish", "Polski", "Portuguese (BR)", "Portuguese", "Romanian", "Russian", "Slovak", "Slovenian", "Serbian", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese", "Chinese (Simplified)", "Chinese (Traditional)", "German(CH)", "Italian(CH)", "French(CH)", "Patois"];
  languageMap = { "Loas": "lo", "Combodia": "co", "Philippines": "ph", "Mayanmar": "ma", "English (E2A)": "en-e2a","English (US)": "en", "English (CA)": "en-CA", "English (IN)": "en-in", "English (UK)": "en-UK", "English (NA)": "en-NA", "English (AIM)": "en-AIM", "Francais (CA)": "fr-CA", "Francais": "fr", "Bulgarian": "bg", "Czech": "cs", "Danish": "da", "Austria": "de-AT", "German": "de", "Greek": "el", "Mexico": "es-MX", "Spanish": "es", "Estonian": "et", "Finnish": "fi", "Croatian": "hr", "Hungarian": "hu", "Indonesian": "id", "Italian": "it", "Japanese": "ja", "Korean": "ko", "Korean-Adjustment": "ko-ADJ", "Latvian": "lv", "Dutch": "nl", "Norwegian": "no", "German(CH)": "de-ch", "Italian(CH)": "it-ch", "French(CH)": "fr-ch", "Polish": "pl", "Polski": "polski", "Portuguese (BR)": "pt-BR", "Portuguese": "pt", "Romanian": "ro", "Russian": "ru", "Slovak": "sk", "Slovenian": "sl", "Serbian": "sr", "Swedish": "sv", "Thai": "th", "Turkish": "tr", "Ukrainian": "uk", "Vietnamese": "vi", "Chinese (Simplified)": "zh-CN", "Chinese (Traditional)": "zh-TW", "Patois": "pat" };
  localStr = "en-US";
  languageCodeArray;
  slectedLangCode = "en-US";
  constructor(public navCtrl: NavController, public jsonData: JsonData, public storage: Storage, private modalCtrl: ModalController,
    public translateService: TranslateService, navParams: NavParams, public alertCtrl: AlertController,
    public http: Http, public dataservice: Dataservice, public loadingCtrl: LoadingController,) {

    this.getVehicleList();
    var currentCheckModel = new CheckModel();
    currentCheckModel.name = "Metric Units";
    currentCheckModel.isChecked = true;
    this.tracks.push(currentCheckModel);

    this.dataservice.getData('assets/data/Currency.json').subscribe((currencyData) => {
      for (var i = 0; i < Object.keys(currencyData).length; i++) {
        localStorage.setItem(Object.keys(currencyData[i])[0], currencyData[i][Object.keys(currencyData[i])[0]]);
      }
    })

    if (localStorage.getItem('fleetName') != null && localStorage.getItem('fuelCalculation') != undefined) {
      this.fleet_name = localStorage.getItem('fleetName');
    } else {
      this.fleet_name = "";
    }
    let currencyCode = localStorage.getItem("selectedCurrency") == null ? "EUR" : localStorage.getItem("selectedCurrency");

    this.currencySymbol = localStorage.getItem(currencyCode);
    if (this.currencySymbol == null) {
      this.currencySymbol = "$";
    }
    this.countryJsoncall()


    if (localStorage.getItem('fuelCalculation') == null || localStorage.getItem('fuelCalculation') == undefined) {
      localStorage.setItem('fuelCalculation', 'true');
    } else {
      // if (localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined) {
      //   this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
      // }

    }




    if (localStorage.getItem('mileageCalculation') == null || localStorage.getItem('mileageCalculation') == undefined) {
      localStorage.setItem('mileageCalculation', 'true');
    } else {

      // if (localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined) {
      //   this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true : false;
      // }

    }


    if (localStorage.getItem("calculateWeight") == null || localStorage.getItem("calculateWeight") == undefined) {
      localStorage.setItem("calculateWeight", 'true');
    }


    if (localStorage.getItem('weightSavingToggle') == null || localStorage.getItem('weightSavingToggle') == undefined) {
      localStorage.setItem('weightSavingToggle', 'true');
    }

    if (localStorage.getItem('unit system') == null || localStorage.getItem('unit system') == undefined) {
      localStorage.setItem('unit system', 'metric');
    }

    if (localStorage.getItem('settingparameters') != null) {

      var data = localStorage.getItem('settingparameters');
      this.settingItems = JSON.parse(data);
      for (var itemNo in this.settingItems) {
        if (this.settingItems[itemNo]["title"] == "fuel_calculation") {
          console.log(this.settingItems[itemNo]["value"]);
        }
        // else if (this.settingItems[itemNo]["title"] == "language"){
        //   // this.tranlateService.setDefaultLang(this.settingItems[itemNo]["value"]);
        // }
      }

    }



    if (localStorage.getItem('unit system') != null) {
      this.units = this.selectedCountry == 'United States' ? 'us' : 'metric'
    } else {
      this.units = 'us';

    }


  }
  initialiazeValues() {

    if (localStorage.getItem("company") != undefined && localStorage.getItem("company") != null) {
      this.company = localStorage.getItem("company") == "null" ? "" : localStorage.getItem("company");
    }
    if (localStorage.getItem("customerPhone") != undefined && localStorage.getItem("customerPhone") != null) {
      this.customerPhone = localStorage.getItem("customerPhone") == "null" ? "" : localStorage.getItem("customerPhone");
    }
    if (localStorage.getItem("customerFullName") != undefined && localStorage.getItem("customerFullName") != null) {
      this.customerFullName = localStorage.getItem("customerFullName") == "null" ? "" : localStorage.getItem("customerFullName");
    }
    if (localStorage.getItem("customerMail") != undefined && localStorage.getItem("customerMail") != null) {
      this.customerMail = localStorage.getItem("customerMail") == "null" ? "" : localStorage.getItem("customerMail");
    }

    this.selectedRegion = localStorage.getItem("selectedRegion");
    if (this.selectedRegion == null || this.selectedRegion == undefined || this.selectedRegion == '') {
      this.selectedRegion = 'ALL';
    }
    this.selectedCountry = localStorage.getItem('selectedCountry');
    this.units = (this.selectedCountry == "United States") ? 'us' : 'metric'
    this.selectedMetricUnit = this.selectedCountry == "United States" ? this.selectedCountry : "Other"

    if (this.selectedCountry == null || this.selectedCountry == undefined || this.selectedCountry == '') {
      this.selectedCountry = 'United States';
      this.currencySymbol = '$'
      this.units = (this.selectedCountry == "United States") ? 'us' : 'metric'
    }
    if (this.selectedCountry == 'Malaysia' || this.selectedCountry == 'Indonesia' || this.selectedCountry == 'Japan' || this.selectedCountry == 'South Korea' || this.selectedCountry == 'Thailand' || this.selectedCountry == 'Vietnam' || this.selectedCountry == 'Mayanmar' || this.selectedCountry == 'Philippines' || this.selectedCountry == 'Cambodia' || this.selectedCountry == 'Laos') {
      this.selectedRegione2a = 'E2A1'
    }
    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    if (this.selectedLanguage == null || this.selectedLanguage == undefined || this.selectedLanguage == '') {
      this.selectedLanguage = 'English (US)';
    }
    this.slectedLangCode = this.languageCodeArray[this.selectedLanguage];
    localStorage.setItem("languageCode", this.slectedLangCode);
    this.translateService.setDefaultLang(this.languageMap[this.selectedLanguage]);
    this.translateService.use(this.languageMap[this.selectedLanguage]);

    localStorage.setItem('language', this.languageMap[this.selectedLanguage]);
    localStorage.setItem("selectedLanguage", this.selectedLanguage);
    this.selectedCurrencyS = localStorage.getItem('selectedCurrency');
    if (this.selectedCurrencyS == null || this.selectedCurrencyS == undefined || this.selectedCurrencyS == '') {
      this.selectedCurrencyS = 'USD';
    }
    this.dataservice.getData('assets/data/Country.json').subscribe((countryData) => {
      for (var i = 0; i < countryData.length; i++) {

        // if( this.selectedCurrencyS == countryData[i].Currency){
        //   this.currencyPostion = countryData[i].Symbol_Pos
        //   localStorage.setItem("selectedPosition", this.currencyPostion);
        // }

        if (this.selectedCountry == countryData[i].Countryregion) {

          // if (countryData[i].Region == "AMS" || countryData[i].Region == "AIM") {
          //   localStorage.setItem("selectedRegion", countryData[i].Region);
          // } else {
          //   localStorage.setItem("selectedRegion", "ALL");
          // }

          if (localStorage.getItem("selectedCountry") == "India") {

            localStorage.setItem("selectedRegion", "AIM");

          } else if (localStorage.getItem("selectedCountry") == "Bangladesh" || localStorage.getItem("selectedCountry") == "Bhutan" || localStorage.getItem("selectedCountry") == "British Indian Ocean Territory" || localStorage.getItem("selectedCountry") == "Sri Lanka" || localStorage.getItem("selectedCountry") == "Maldives" || localStorage.getItem("selectedCountry") == "Nepal" || localStorage.getItem("selectedCountry") == "United Arab Emirates" || localStorage.getItem("selectedCountry") == "Afghanistan" || localStorage.getItem("selectedCountry") == "Bahrain" || localStorage.getItem("selectedCountry") == "Egypt" || localStorage.getItem("selectedCountry") == "Iraq" || localStorage.getItem("selectedCountry") == "Iran, Islamic Republic of" || localStorage.getItem("selectedCountry") == "Jordan" || localStorage.getItem("selectedCountry") == "Kuwait" || localStorage.getItem("selectedCountry") == "Lebanon" || localStorage.getItem("selectedCountry") == "Oman" || localStorage.getItem("selectedCountry") == "Pakistan" || localStorage.getItem("selectedCountry") == "Qatar" || localStorage.getItem("selectedCountry") == "Saudi Arabia" || localStorage.getItem("selectedCountry") == "Sudan" || localStorage.getItem("selectedCountry") == "Syrian Arab Republic" || localStorage.getItem("selectedCountry") == "Yemen" || localStorage.getItem("selectedCountry") == "Algeria" || localStorage.getItem("selectedCountry") == "Gibraltar" || localStorage.getItem("selectedCountry") == "Israel" || localStorage.getItem("selectedCountry") == "Libyan Arab Jamahiriya" || localStorage.getItem("selectedCountry") == "Morocco" || localStorage.getItem("selectedCountry") == "Mauritania" || localStorage.getItem("selectedCountry") == "Tunisia" || localStorage.getItem("selectedCountry") == "Angola" || localStorage.getItem("selectedCountry") == "Bouvet Island" || localStorage.getItem("selectedCountry") == "Botswana" || localStorage.getItem("selectedCountry") == "Heard Island and McDonald Islands" || localStorage.getItem("selectedCountry") == "Lesotho" || localStorage.getItem("selectedCountry") == "Malawi" || localStorage.getItem("selectedCountry") == "Mozambique" || localStorage.getItem("selectedCountry") == "Namibia" || localStorage.getItem("selectedCountry") == "Swaziland" || localStorage.getItem("selectedCountry") == "South Africa" || localStorage.getItem("selectedCountry") == "Zambia" || localStorage.getItem("selectedCountry") == "Zimbabwe" || localStorage.getItem("selectedCountry") == "Burkina Faso" || localStorage.getItem("selectedCountry") == "Burundi" || localStorage.getItem("selectedCountry") == "Benin" || localStorage.getItem("selectedCountry") == "Congo, the Democratic Republic of the" || localStorage.getItem("selectedCountry") == "Central African Republic" || localStorage.getItem("selectedCountry") == "Congo" || localStorage.getItem("selectedCountry") == "Côte d'Ivoire" || localStorage.getItem("selectedCountry") == "Cameroon" || localStorage.getItem("selectedCountry") == "Cape Verde" || localStorage.getItem("selectedCountry") == "Djibouti" || localStorage.getItem("selectedCountry") == "Western Sahara" || localStorage.getItem("selectedCountry") == "Eritrea" || localStorage.getItem("selectedCountry") == "Ethiopia" || localStorage.getItem("selectedCountry") == "Gabon" || localStorage.getItem("selectedCountry") == "Ghana" || localStorage.getItem("selectedCountry") == "Gambia" || localStorage.getItem("selectedCountry") == "Guinea" || localStorage.getItem("selectedCountry") == "Equatorial Guinea" || localStorage.getItem("selectedCountry") == "Guinea-Bissau" || localStorage.getItem("selectedCountry") == "Comoros" || localStorage.getItem("selectedCountry") == "Madagascar" || localStorage.getItem("selectedCountry") == "Mauritius" || localStorage.getItem("selectedCountry") == "Nigeria" || localStorage.getItem("selectedCountry") == "Rwanda" || localStorage.getItem("selectedCountry") == "Saint Helena, Ascension and Tristan Da Cunha" || localStorage.getItem("selectedCountry") == "Senegal" || localStorage.getItem("selectedCountry") == "Sao Tome and Principe" || localStorage.getItem("selectedCountry") == "Togo" || localStorage.getItem("selectedCountry") == "Kenya" || localStorage.getItem("selectedCountry") == "Liberia" || localStorage.getItem("selectedCountry") == "Mali" || localStorage.getItem("selectedCountry") == "Niger" || localStorage.getItem("selectedCountry") == "Reunion" || localStorage.getItem("selectedCountry") == "Seychelles" || localStorage.getItem("selectedCountry") == "Sierra Leone" || localStorage.getItem("selectedCountry") == "Somalia, Federal Republic of" || localStorage.getItem("selectedCountry") == "Chad" || localStorage.getItem("selectedCountry") == "Tanzania, United Repulic of" || localStorage.getItem("selectedCountry") == 'Uganda' || localStorage.getItem("selectedCountry") == 'Mayotte') {

            localStorage.setItem("selectedRegion", "AFMO");
          }
          else if (localStorage.getItem("selectedCountry") == "Argentina" || localStorage.getItem("selectedCountry") == "Brazil" || localStorage.getItem("selectedCountry") == "Bolívia" || localStorage.getItem("selectedCountry") == "Chile" || localStorage.getItem("selectedCountry") == "Ecuador" || localStorage.getItem("selectedCountry") == "Peru" || localStorage.getItem("selectedCountry") == "Colombia" || localStorage.getItem("selectedCountry") == "Paraguay" || localStorage.getItem("selectedCountry") == "Uruguay" || localStorage.getItem("selectedCountry") == "Venezuela") {

            localStorage.setItem("selectedRegion", "AMS");
          } else if (localStorage.getItem("selectedCountry") == 'China mainland') {

            localStorage.setItem("selectedRegion", "CN");
          }
          else if (localStorage.getItem("selectedCountry") == 'Taiwan') {

            localStorage.setItem("selectedRegion", "CN");
          }
          else if (localStorage.getItem("selectedCountry") == "Australia" || localStorage.getItem("selectedCountry") == "Malaysia" || localStorage.getItem("selectedCountry") == "Indonesia" || localStorage.getItem("selectedCountry") == "Japan" || localStorage.getItem("selectedCountry") == "South Korea" || localStorage.getItem("selectedCountry") == "Thailand" || localStorage.getItem("selectedCountry") == "Vietnam") {

            localStorage.setItem("selectedRegion", "E2A");
          }
          else {
            if (countryData[i].Region == "AMS" || countryData[i].Region == "AIM") {
              localStorage.setItem("selectedRegion", countryData[i].Region);
            } else {
              localStorage.setItem("selectedRegion", "ALL");
            }
          }

          this.currencySeparator = countryData[i].Separator
          this.localStr = this.currencySeparator == "C" ? "en-US" : "fi-fi";
          if (this.selectedCountry == "Germany" || this.selectedCountry == "Austria" || this.selectedCountry == "Norway") {
            this.localStr = "de-DE";
          }
          if (this.selectedCountry == "Switzerland") {
            this.localStr = "de-CH";
          }
          localStorage.setItem("selectedSeparator", this.currencySeparator);

          this.currencyPostion = countryData[i].Symbol_Pos
          localStorage.setItem("selectedPosition", this.currencyPostion);


          if (localStorage.getItem("fleetsizetrucks") != "0") {
            if (localStorage.getItem('annualBillAmount') != null) {
              var an = localStorage.getItem('annualBillAmount');

              this.annualBill = Number(an).toLocaleString(this.localStr);
            }


            if (localStorage.getItem('potentialFuelSaving') != null) {
              var an = localStorage.getItem('potentialFuelSaving');

              this.potentialFuelSaving = Number(an).toLocaleString(this.localStr);

            }

            if (localStorage.getItem('potentialCo2Saving') != null) {
              var an = localStorage.getItem('potentialCo2Saving');

              this.potentialCOSaving = Number(an).toLocaleString(this.localStr);

            }
          }
        }

        if (this.selectedCountry == countryData[i].Countryregion) {
          this.currencySymbol = countryData[i].Symbol
          localStorage.setItem("selectedCurrencySymbol", this.currencySymbol);
          localStorage.setItem("selectedCurrency", countryData[i].Currency);

        }
        // localStorage.setItem(Object.keys(currencyData[i])[0],currencyData[i][Object.keys(currencyData[i])[0]]);
      }
    })
  }
  //   isNumberKey(evt){
  //     var charCode = (evt.which) ? evt.which : event.keyCode
  //     if (charCode > 31 && (charCode < 48 || charCode > 57))
  //         return false;
  //     return true;
  // }

  countryJsoncall() {
    this.dataservice.getData('assets/data/Country.json').subscribe((countryData) => {
      this.Countries = [];
      this.Languages = [];
      this.CurrencyA = [];
      this.languageCodeArray = { String: String };
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
        this.languageCodeArray[countryData[i][Object.keys(countryData[i])[2]]] = countryData[i][Object.keys(countryData[i])[7]];
      }
      this.initialiazeValues();
    })
  }

  getVehicleList() {
    if (localStorage.getItem('selectedCountry') != null && localStorage.getItem('selectedCountry') != undefined && localStorage.getItem('selectedCountry') == 'Italie') {
      this.dataservice.getData('data/config-it.json').subscribe((data) => {

        this.configs = data;
        this.configureName = data[0].desc;
        for (var i in data) {
          this.vehicleTrailerNondrivenMap[data[i].desc] = {
            trailer: data[i].trailer_wheels, nondriven: data[i].nondriven_wheels, steer: data[i].steer_wheels, drive: data[i].drive_wheels, aero: data[i].aero, steerCon: data[i].steerContribution, driveCon: data[i].driveContribution, nondrivenCon: data[i].nondrivenContribution
            , trailerCon: data[i].trailerContribution, trailer2Con: data[i].trailer2Contribution, trailer3Con: data[i].trailer3Contribution, totaltirev: data[i].totalTire
          }
        }
        this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
        if (localStorage.getItem("selectedVehicleImgIndex") != null) {
          this.indexValue = parseInt(localStorage.getItem("selectedVehicleImgIndex"));
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
            // this.configs.sort((a, b) => a.localeCompare(b, 'es', {sensitivity: 'base'}));
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        } else {
          this.indexValue = 1;
          localStorage.setItem("selectedVehicleImgIndex", "1");
          localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        }

      });

    }
    // Fetch config file for Portugese
    else if (localStorage.getItem('selectedCountry') != null && localStorage.getItem('selectedCountry') != undefined && localStorage.getItem('selectedCountry') == 'Portugal') {
      this.dataservice.getData('data/config-pt.json').subscribe((data) => {

        this.configs = data;
        this.configureName = data[0].desc;
        for (var i in data) {
          this.vehicleTrailerNondrivenMap[data[i].desc] = {
            trailer: data[i].trailer_wheels, nondriven: data[i].nondriven_wheels, steer: data[i].steer_wheels, drive: data[i].drive_wheels, aero: data[i].aero, steerCon: data[i].steerContribution, driveCon: data[i].driveContribution, nondrivenCon: data[i].nondrivenContribution
            , trailerCon: data[i].trailerContribution, trailer2Con: data[i].trailer2Contribution, trailer3Con: data[i].trailer3Contribution, totaltirev: data[i].totalTire
          }
        }
        this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
        if (localStorage.getItem("selectedVehicleImgIndex") != null) {
          this.indexValue = parseInt(localStorage.getItem("selectedVehicleImgIndex"));
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
            // this.configs.sort((a, b) => a.localeCompare(b, 'es', {sensitivity: 'base'}));
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        } else {
          this.indexValue = 1;
          localStorage.setItem("selectedVehicleImgIndex", "1");
          localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
          this.autoCompleteData = this.configs[this.indexValue].desc;
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        }

      });

    }
    // Fetch config file for Japan
    else if (localStorage.getItem('selectedCountry') != null && localStorage.getItem('selectedCountry') != undefined && localStorage.getItem('selectedCountry') == 'Japan') {
      this.dataservice.getData('data/config-ja.json').subscribe((data) => {

        this.configs = data;
        this.configureName = data[0].desc;
        for (var i in data) {
          this.vehicleTrailerNondrivenMap[data[i].desc] = {
            trailer: data[i].trailer_wheels, nondriven: data[i].nondriven_wheels, steer: data[i].steer_wheels, drive: data[i].drive_wheels, aero: data[i].aero, steerCon: data[i].steerContribution, driveCon: data[i].driveContribution, nondrivenCon: data[i].nondrivenContribution
            , trailerCon: data[i].trailerContribution, trailer2Con: data[i].trailer2Contribution, trailer3Con: data[i].trailer3Contribution, totaltirev: data[i].totalTire
          }
        }
        this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
        if (localStorage.getItem("selectedVehicleImgIndex") != null) {
          this.indexValue = parseInt(localStorage.getItem("selectedVehicleImgIndex"));
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
            // this.configs.sort((a, b) => a.localeCompare(b, 'es', {sensitivity: 'base'}));
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        } else {
          this.indexValue = 1;
          localStorage.setItem("selectedVehicleImgIndex", "1");
          localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        }

      });

    }
    // Fetch config file for Spain
    else if (localStorage.getItem('selectedCountry') != null && localStorage.getItem('selectedCountry') != undefined && localStorage.getItem('selectedCountry') == 'Spain') {
      this.dataservice.getData('data/config-es.json').subscribe((data) => {

        this.configs = data;
        this.configureName = data[0].desc;
        for (var i in data) {
          this.vehicleTrailerNondrivenMap[data[i].desc] = {
            trailer: data[i].trailer_wheels, nondriven: data[i].nondriven_wheels, steer: data[i].steer_wheels, drive: data[i].drive_wheels, aero: data[i].aero, steerCon: data[i].steerContribution, driveCon: data[i].driveContribution, nondrivenCon: data[i].nondrivenContribution
            , trailerCon: data[i].trailerContribution, trailer2Con: data[i].trailer2Contribution, trailer3Con: data[i].trailer3Contribution, totaltirev: data[i].totalTire
          }
        }
        this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
        if (localStorage.getItem("selectedVehicleImgIndex") != null) {
          this.indexValue = parseInt(localStorage.getItem("selectedVehicleImgIndex"));
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
            // this.configs.sort((a, b) => a.localeCompare(b, 'es', {sensitivity: 'base'}));
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        } else {
          this.indexValue = 1;
          localStorage.setItem("selectedVehicleImgIndex", "1");
          localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        }

      });

    }
    else if (localStorage.getItem('selectedCountry') != null && localStorage.getItem('selectedCountry') != undefined && localStorage.getItem('selectedCountry') == 'Turkey') {
      this.dataservice.getData('data/config-tr.json').subscribe((data) => {

        this.configs = data;
        this.configureName = data[0].desc;
        for (var i in data) {
          this.vehicleTrailerNondrivenMap[data[i].desc] = {
            trailer: data[i].trailer_wheels, nondriven: data[i].nondriven_wheels, steer: data[i].steer_wheels, drive: data[i].drive_wheels, aero: data[i].aero, steerCon: data[i].steerContribution, driveCon: data[i].driveContribution, nondrivenCon: data[i].nondrivenContribution
            , trailerCon: data[i].trailerContribution, trailer2Con: data[i].trailer2Contribution, trailer3Con: data[i].trailer3Contribution, totaltirev: data[i].totalTire
          }
        }
        this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
        if (localStorage.getItem("selectedVehicleImgIndex") != null) {
          this.indexValue = parseInt(localStorage.getItem("selectedVehicleImgIndex"));
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
            // this.configs.sort((a, b) => a.localeCompare(b, 'es', {sensitivity: 'base'}));
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        } else {
          this.indexValue = 1;
          localStorage.setItem("selectedVehicleImgIndex", "1");
          localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        }

      });

    }
    else {
      this.dataservice.getData('data/config.json').subscribe((data) => {

        this.configs = data;
        this.configureName = data[0].desc;
        for (var i in data) {
          this.vehicleTrailerNondrivenMap[data[i].desc] = {
            trailer: data[i].trailer_wheels, nondriven: data[i].nondriven_wheels, steer: data[i].steer_wheels, drive: data[i].drive_wheels, aero: data[i].aero, steerCon: data[i].steerContribution, driveCon: data[i].driveContribution, nondrivenCon: data[i].nondrivenContribution
            , trailerCon: data[i].trailerContribution, trailer2Con: data[i].trailer2Contribution, trailer3Con: data[i].trailer3Contribution, totaltirev: data[i].totalTire
          }
        }
        this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
        if (localStorage.getItem("selectedVehicleImgIndex") != null) {
          this.indexValue = parseInt(localStorage.getItem("selectedVehicleImgIndex"));
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
            // this.configs.sort((a, b) => a.localeCompare(b, 'es', {sensitivity: 'base'}));
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        } else {
          this.indexValue = 1;
          localStorage.setItem("selectedVehicleImgIndex", "1");
          localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
          this.autoCompleteData = this.configs[this.indexValue].desc;
          localStorage.setItem("vehicleName", this.configs[this.indexValue].desc);
          this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
          if (this.configs[this.indexValue].trailer_wheels == "0") {
            document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
            this.fleetsizetrailers = 0
          } else {
            document.getElementById("fleetsizeTrailer").style.background = 'white';
          }
        }

      });
    }
  }


  ionViewDidLoad() {

    //this.initialiazeValues();



    this.fleetsizetrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
    this.fleetsizetrucks = localStorage.getItem('fleetsizetrucks') != null ? parseInt(localStorage.getItem("fleetsizetrucks")) : 0;
    this.fleet_name = localStorage.getItem("fleetName");
    //   localStorage.setItem("company", this.company);
    //   localStorage.setItem("customerPhone", this.customerPhone);
    //   localStorage.setItem("customerFullName", this.customerFullName);
    //   localStorage.setItem("customerMail", this.customerMail);
    //   var tempJson = {};
    //  this.company = localStorage.getItem("company");
    //  this.customerPhone = localStorage.getItem("customerPhone");
    //  this.customerFullName = localStorage.getItem("customerFullName");
    //  this.customerMail = localStorage.getItem("customerMail");
    //   tempJson["customerMail"] = this.customerMail;


    if (localStorage.getItem("fleetsizetrucks") != "0") {
      //   this.currencyPostion = localStorage.getItem("selectedPosition");
      // this.currencySymbol = localStorage.getItem("selectedCurrencySymbol");
      this.currencySeparator = localStorage.getItem("selectedSeparator")
      this.localStr = this.currencySeparator == "C" ? "en-US" : "fi-fi";
      if (this.selectedCountry == "Germany" || this.selectedCountry == "Austria" || this.selectedCountry == "Norway") {
        this.localStr = "de-DE";
      }
      if (this.selectedCountry == "Switzerland") {
        this.localStr = "de-CH";
      }
      if (localStorage.getItem('annualBillAmount') != null) {
        var an = localStorage.getItem('annualBillAmount');

        this.annualBill = Number(an).toLocaleString(this.localStr);

      }
      if (localStorage.getItem('potentialFuelSaving') != null) {
        var an = localStorage.getItem('potentialFuelSaving');

        this.potentialFuelSaving = Number(an).toLocaleString(this.localStr);

      }
      if (localStorage.getItem('potentialCo2Saving') != null) {
        var an = localStorage.getItem('potentialCo2Saving');

        this.potentialCOSaving = Number(an).toLocaleString(this.localStr);

      }
    }

    if (localStorage.getItem('fleetName') == "null") {
      document.getElementById("fleetname").style.border = '#EEEEEE';
    } else {
      document.getElementById("fleetname").style.border = 'white';
    }

    this.fleet_name = localStorage.getItem("fleetName") != null ? localStorage.getItem("fleetName") : "";
    this.annualmilespervehicle = localStorage.getItem("annualmilespervehicle") != null ? parseInt(localStorage.getItem("annualmilespervehicle")) : 0;
    this.currentpriceoffuel = localStorage.getItem("currentpriceoffuel") ? parseFloat(localStorage.getItem("currentpriceoffuel")) : 0;
    this.annualmpgpervehicle = localStorage.getItem("annualmpgpervehicle") ? parseFloat(localStorage.getItem("annualmpgpervehicle")) : 0;
    this.percentageOfFuelSaving = localStorage.getItem("percentageOfFuelSaving") ? parseFloat(localStorage.getItem("percentageOfFuelSaving")) : 0;


    this.longhaul = localStorage.getItem('longhaul') != null ? parseInt(localStorage.getItem('longhaul')) : 0;
    this.regional = localStorage.getItem('regional') != null ? parseInt(localStorage.getItem('regional')) : 0;
    this.urban = localStorage.getItem('urban') != null ? parseInt(localStorage.getItem('urban')) : 0;
    this.annualaverageloadoftruck = localStorage.getItem('annualaverageloadoftruck') != null ? parseFloat(localStorage.getItem("annualaverageloadoftruck")) : 0;


    this.http.get('assets/api/rr.json').map((res: Response) => res.json()).subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {

          if (this.results.tread.indexOf(res[i].tread) == -1) {
            this.results.tread.push(res[i].tread);

            if (this.brandTreadMap[res[i].mfg] != null) {
              var tempTreadArr = this.brandTreadMap[res[i].mfg];

              if (tempTreadArr.indexOf(res[i].tread) == -1) {
                this.brandTreadMap[res[i].mfg].push(res[i].tread);
              }
            } else {
              this.brandTreadMap[res[i].mfg] = [];
              this.brandTreadMap[res[i].mfg].push(res[i].tread);
            }

          }

          if (this.results.mfg.indexOf(res[i].mfg) == -1) {
            this.results.mfg.push(res[i].mfg);
          }

          if (this.results.rim.indexOf(res[i].rim) == -1) {
            this.results.rim.push(res[i].rim);
          }

          if (this.results.rr.indexOf(res[i].rr) == -1) {
            this.results.rr.push(res[i].rr);
          }


          this.treadRRMap[res[i].tread] = res[i].rr;



          if (this.results.size.indexOf(res[i].size) == -1) {
            this.results.size.push(res[i].size);
          }

          if (this.results.weight.indexOf(res[i].weight) == -1) {
            this.results.weight.push(res[i].weight);
          }

          if (this.results.xone.indexOf(res[i].xone) == -1) {
            this.results.xone.push(res[i].xone);
          }

        }

        localStorage.setItem("brandTreadMap", JSON.stringify(this.brandTreadMap));
        localStorage.setItem("rrjsonresults", JSON.stringify(this.results));
        localStorage.setItem("treadRRMap", JSON.stringify(this.treadRRMap));
      }

    );



    this.http.get('assets/api/treadSpec.json').map((res: Response) => res.json()).subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {

          this.treadSizeWeightMap[res[i].tread.toUpperCase() + ' ' + res[i].size.toUpperCase()] = res[i].weight;
          if (this.treadSizeMap[res[i].tread.toUpperCase()] == null) {
            this.treadSizeMap[res[i].tread.toUpperCase()] = [];
            this.treadSizeMap[res[i].tread.toUpperCase()].push(res[i].size);
          } else {
            if (this.treadSizeMap[res[i].tread.toUpperCase()].indexOf(res[i].size) == -1) {
              this.treadSizeMap[res[i].tread.toUpperCase()].push(res[i].size);
            }
          }


          if (this.sizeArray.indexOf(res[i].size) == -1) {
            this.sizeArray.push(res[i].size);
          }



        }
        // console.log(this.sizeArray);

        localStorage.setItem("treadSizeWeightMap", JSON.stringify(this.treadSizeWeightMap));

        localStorage.setItem('treadSizeMap', JSON.stringify(this.treadSizeMap));

      }

    );
    // has to be opened
    //     let loading = this.loadingCtrl.create({
    //       spinner: 'bubbles',
    //     content: 'Fetching your details...'

    //   });


    //   loading.present();
    //   setTimeout(() => {
    //     loading.dismiss();
    //   }, 5000);


    //  retrieveContentFromPitcher();


  }


  selectedImg(index: number) {

    this.indexValue = index;
    var tempUrl = "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + ".png";
    this.storage.set("selectedImage", tempUrl);
    localStorage.setItem("selectedImage", tempUrl);

    this.storage.set("selectedImageName", this.dataDesc[this.indexValue]);
    localStorage.setItem("selectedImageName", this.dataDesc[this.indexValue])

  }


  showAutocompleteModal(id) {
    if (id == 0) {

      this.dataDesc = [];
      this.configs.forEach((key: any) => {
        this.dataDesc.push(key.desc);


      });
      let modal = this.modalCtrl.create(AutocompletePagePage, { passedinData: this.dataDesc });
      modal.onDidDismiss(data => {
        switch (id) {
          case 0:
            this.autoCompleteData = data;
            localStorage.setItem("vehicleName", data);
            // alert(data);
            if (data != undefined) {
              localStorage.removeItem('basicAnalysisList');
              //Added Total Tire Value..
              this.configs.forEach((key: any) => {
                if (key.desc == data) {
                  if (key.trailer_wheels == '0') {
                    this.showTrailerField = true;
                    this.fleetsizetrailers = 0
                    document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
                  } else {
                    this.showTrailerField = false;
                    document.getElementById("fleetsizeTrailer").style.background = 'white';
                  }
                  localStorage.setItem("numoftotaltire", key.totalTire);
                  localStorage.setItem("numofsteers", key.steer_wheels);
                  localStorage.setItem("numofdrive", key.drive_wheels);
                  localStorage.setItem("numoftrailer_wheels", key.trailer_wheels);
                  localStorage.setItem("numofnondriven_wheels", key.nondriven_wheels);
                }
              });
              console.log("The Toatal tire Value" + localStorage.getItem("numoftotaltire"));
              console.log("The num of steer wheels" + localStorage.getItem("numofsteers"));

              this.selectedImg(this.dataDesc.indexOf(data));
              this.indexValue = this.dataDesc.indexOf(data);
              console.log(this.indexValue);
              // this.storage.set("selectedVehicleImgIndex", this.indexValue);
              localStorage.setItem("selectedVehicleImgIndex", this.indexValue.toString());
              // this.storage.set("selectedVehicleImg", "assets/img/diagram"+(this.indexValue + 1)+"-"+this.focus+ ".png");
              localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
              document.getElementById("autoFleetConfiguration").style.border = this.autoCompleteData ? '#EEEEEE' : '1px solid red';


            } else {
              this.autoCompleteData = "";
              document.getElementById("autoFleetConfiguration").style.border = this.autoCompleteData ? '#EEEEEE' : '1px solid red';
              this.selectedImg(0);
            }
            break
        }
      });
      modal.present();
    } else if (id == 1) {
      let modal2 = this.modalCtrl.create(AutocompletePagePage, { passedinData: this.Countries.sort() });
      modal2.onDidDismiss(data => {
        if (data != undefined && data != null) {
          this.selectedCountry = data;
          localStorage.setItem("country", this.selectedCountry);
          localStorage.setItem("selectedCountry", this.selectedCountry);

          this.units = (this.selectedCountry == "United States") ? 'us' : 'metric'

          this.onChangeC();
        } else {
          this.selectedCountry = 'United States';
          this.selectedLanguage = 'English (US)';
          this.slectedLangCode = this.languageCodeArray[this.selectedLanguage];
          localStorage.setItem("languageCode", this.slectedLangCode);
          this.selectedCurrencyS = 'USD';
          this.currencySymbol = "$"
          localStorage.setItem("selectedCurrency", this.selectedCurrencyS);
          localStorage.setItem("selectedCountry", this.selectedCountry);
          localStorage.setItem("country", this.selectedCountry);
          localStorage.setItem("selectedLanguage", this.selectedLanguage);
          this.slectedLangCode = this.languageCodeArray[this.selectedLanguage];
          localStorage.setItem("languageCode", this.slectedLangCode);
          this.units = (this.selectedCountry == "United States") ? 'us' : 'metric'
          localStorage.setItem("selectedRegion", "ALL");

          this.onChangeC()
          // this.onChange(this.selectedLanguage);
        }
        this.getVehicleList();
      });
      modal2.present();
    } else if (id == 2) {
      let modal = this.modalCtrl.create(AutocompletePagePage, { passedinData: this.Languages.sort() });
      modal.onDidDismiss(data => {
        if (data != undefined && data != null) {
          this.selectedLanguage = data;
          this.onChangeL(this.selectedLanguage);
          var tempJson = {};
          tempJson["previouscountry"] = this.selectedCountry;
          tempJson["previouslanguage"] = this.selectedLanguage;
          // saveContent(tempJson, "countryDB");

        } else {
          this.selectedLanguage = 'English (US)';
          this.onChangeL(this.selectedLanguage);
          var tempJson = {};
          tempJson["previouscountry"] = this.selectedCountry;
          tempJson["previouslanguage"] = this.selectedLanguage;
          // saveContent(tempJson, "countryDB");

        }
      }
      );
      modal.present();
    }
  }
  onChangeC() {


    for (var i = 0; i < Object.keys(this.languageObjects).length; i++) {
      if (this.languageObjects[i].Countryregion == this.selectedCountry) {
        this.selectedLanguage = this.languageObjects[i].Language;
        this.translateService.setDefaultLang(this.languageMap[this.selectedLanguage]);
        this.translateService.use(this.languageMap[this.selectedLanguage]);
        this.currencySymbol = this.languageObjects[i].Symbol;
        this.currencyPostion = this.languageObjects[i].Symbol_Pos
        this.currencySeparator = this.languageObjects[i].Separator
        this.localStr = this.currencySeparator == "C" ? "en-US" : "fi-fi";
        if (this.selectedCountry == "Germany" || this.selectedCountry == "Austria" || this.selectedCountry == "Norway") {
          this.localStr = "de-DE";
        }
        if (this.selectedCountry == "Switzerland") {
          this.localStr = "de-CH";
        }
        this.selectedMetricUnit = this.selectedCountry == "United States" ? this.selectedCountry : "Other"
        localStorage.setItem('language', this.languageMap[this.selectedLanguage]);
        localStorage.setItem("selectedRegionPdf", this.languageObjects[i].Region);
        // alert(this.languageObjects[i].Region+"check");
     

        if (this.languageObjects[i].Region == "AMS" || this.languageObjects[i].Region == "AIM") {
          localStorage.setItem("selectedRegion", this.languageObjects[i].Region);
        } else {
          localStorage.setItem("selectedRegion", "ALL");
        }
        localStorage.setItem("selectedLanguage", this.selectedLanguage);
        if (this.languageObjects[i].Countryregion == this.selectedCountry && this.languageObjects[i].Language == this.selectedLanguage) {
          localStorage.setItem("selectedCurrency", this.languageObjects[i].Currency);
          localStorage.setItem("selectedCurrencySymbol", this.languageObjects[i].Symbol);
          this.currencySymbol = this.languageObjects[i].Symbol;
          localStorage.setItem("selectedPosition", this.languageObjects[i].Symbol_Pos);
          localStorage.setItem("selectedSeparator", this.languageObjects[i].Separator);
        }

        var tempJson = {};
        tempJson["previouscountry"] = this.selectedCountry;
        tempJson["previouslanguage"] = this.selectedLanguage;
        // saveContent(tempJson, "countryDB");
        //this.onChangeC();
        this.onFleetDetailsChange()

      }

    }
    this.slectedLangCode = this.languageCodeArray[this.selectedLanguage];
    localStorage.setItem("languageCode", this.slectedLangCode);

  }
  onChangeL(languageValue) {
    this.translateService.setDefaultLang(this.languageMap[languageValue]);
    this.translateService.use(this.languageMap[languageValue]);
    localStorage.setItem('language', this.languageMap[languageValue]);
    localStorage.setItem("selectedLanguage", this.selectedLanguage);
    this.slectedLangCode = this.languageCodeArray[this.selectedLanguage];
    localStorage.setItem("languageCode", this.slectedLangCode);
  }


  openNext() {

    if (!this.checkCompletion()) {
      this.handleIncompleteScenarioForFleetDetails();
      return;
    }


    var temp = 100 - this.longhaul - this.urban - this.regional;
    if (temp != 0) {

      this.showAlertView();
      return;
    }


    this.saveDataWhenLeavePage();
    this.saveVehicleTireNumber();


    if (localStorage.getItem('basicAnalysisList') != null) {

      if (localStorage.getItem('SelectedRegionData') != localStorage.getItem("selectedRegion")) {
        localStorage.removeItem("basicAnalysisList")
      }

      if (localStorage.getItem("lifeCycleAnalysisList") != null) {

        this.trailerShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer > 0 ? true : false;
        this.nondrivenShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondriven > 0 ? true : false;
        this.navCtrl.push(TabsPage, {
          "basicAnalysis": localStorage.getItem('basicAnalysisList'),
          "lifeCycleAnalysis": localStorage.getItem("lifeCycleAnalysisList"),
          "trailerShow": this.trailerShow,
          "nondrivenShow": this.nondrivenShow
        });
      } else {


        this.trailerShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer > 0 ? true : false;
        this.nondrivenShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondriven > 0 ? true : false;
        this.navCtrl.push(TabsPage, {
          "basicAnalysis": localStorage.getItem("basicAnalysisList"),
          "trailerShow": this.trailerShow,
          "nondrivenShow": this.nondrivenShow
        });
      }


    } else {

      if (localStorage.getItem('SelectedRegionData') != localStorage.getItem("selectedRegion")) {
        localStorage.removeItem("basicAnalysisList")
      }
      this.trailerShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer > 0 ? true : false;
      this.nondrivenShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondriven > 0 ? true : false;
      this.navCtrl.push(TabsPage, {
        "trailerShow": this.trailerShow,
        "nondrivenShow": this.nondrivenShow
      });
    }


  }

  ionViewWillLeave() {

    // this.saveDataWhenLeavePage();

  }



  onChange($event, name) {
    switch (name) {
      //   case "company":
      //    document.getElementById("inputF").style.borderColor = ($event == "" || $event == null) ? 'red' : 'grey';
      //     this.company = $event;
      //     break;
      //  case "customer_full_name":
      //   document.getElementById("inputs").style.borderColor =  ($event == "" || $event == null) ? 'red' : 'grey';
      //      this.customerFullName = $event;
      //       break;
      //  case "customer_mail":
      //     document.getElementById("inputss").style.borderColor = ($event == "" || $event == null) ? 'red' : 'grey';
      //    this.customerMail = $event;
      //         break;
      //   case "customer_phone_number":
      //     document.getElementById("inputsss").style.borderColor = ($event == "" || $event == null) ? '1px solid red' : 'grey';
      //     this.customerPhone = $event;
      //      break;
      case "fleet_name":
        document.getElementById("fleetname").style.border = ($event == "" || $event == null) ? '1px solid red' : '#EEEEEE';
        this.fleet_name = $event;
        break;
      case "fleetsizetruck":
        this.fleetsizetrucks = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById("fleetSize").style.border = this.fleetsizetrucks ? '#EEEEEE' : '1px solid red';
        this.onFleetDetailsChange();
        break;
      case "annualmpg":
        this.annualmpgpervehicle = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById("annualMilesMPG").style.border = this.annualmpgpervehicle ? '#EEEEEE' : '1px solid red';
        this.onFleetDetailsChange();
        break;
      case "fleetsizetrailer":
        this.fleetsizetrailers = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        // document.getElementById("fleetsizeTrailer").style.background = this.fleetsizetrailers? '#EEEEEE' : 'red';

        this.onFleetDetailsChange();
        break;
      case "annualmilespervehicle":
        this.annualmilespervehicle = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById("annualMiles").style.border = this.annualmilespervehicle ? '#EEEEEE' : '1px solid red';
        this.onFleetDetailsChange();
        break;
      case "currentpriceoffuel":
        this.currentpriceoffuel = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById("fuelPrice").style.border = this.currentpriceoffuel ? '#EEEEEE' : '1px solid red';

        this.onFleetDetailsChange();
        break;
      case "mxMiles":
        this.mxMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        break;
      //gpr
      case "longhaul":
        console.log("summarizeValueAutoPopulate aaalonghaul")

        if ($event <= 0) {
          this.longhaul = 0
          this.langhaulValue = 0
          //this.summarizeValueAutoPopulate('aa');
        }
        this.longhaul = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        this.totalvalue = this.longhaul + this.regional + this.urban

        if (this.longhaul > 100 || this.longhaul < 0) {
          this.totalvalue = 0;
          this.longhaul = 0
          var thisObj = this;
          var fn = function () {
            thisObj.longhaul = 0;
          };
          this.handValueOutOfRangeErrorMessage(fn);
          break
        }
        if (this.totalvalue > 100) {

          var thisObjJ = this;
          var fn = function () {
            thisObjJ.longhaul = 0;
          };
          this.handValueOutOfSumMessage(fn)
        }
        break;

      case "regional":
        console.log("summarizeValueAutoPopulate aaaaregional")

        if ($event <= 0) {
          this.regional = 0
          this.regionalValue = 0

        }

        this.regional = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        this.totalvalue = this.regional + this.longhaul + this.urban

        if (this.regional > 100 || this.regional < 0) {
          this.totalvalue = 0
          this.regional = 0

          var thisObj1 = this;
          var fn1 = function () {
            thisObj1.regional = 0;
          };
          this.handValueOutOfRangeErrorMessage(fn1);
          // this.showAlertView();
          break
        }
        if (this.totalvalue > 100) {
          var thisObjJ = this;
          var fn = function () {
            thisObjJ.regional = 0;
          };
          this.handValueOutOfSumMessage(fn)

        }
        break;

      case "urban":
        console.log("summarizeValueAutoPopulate aaaaaurban")

        if ($event <= 0) {
          this.urban = 0
          this.urbanValue = 0

        }
        this.urban = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        this.totalvalue = this.urban + this.longhaul + this.regional

        if (this.urban > 100 || this.urban < 0) {
          this.totalvalue = 0
          this.urban = 0

          var thisObj1 = this;
          var fn1 = function () {
            thisObj1.urban = 0;
          };
          this.handValueOutOfRangeErrorMessage(fn1);
          break
        }
        if (this.totalvalue > 100) {
          var thisObjJ = this;
          var fn = function () {
            thisObjJ.urban = 0;
          };
          this.handValueOutOfSumMessage(fn)
        }

        break;

      case "annualaverageloadoftruck":
        this.annualaverageloadoftruck = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById("annualaverageloadoftruck").style.border = this.annualaverageloadoftruck ? '#EEEEEE' : '1px solid red';
        break;
      case "percentageOfFuelSaving":
        this.percentageOfFuelSaving = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        if (this.percentageOfFuelSaving >= 21 || this.percentageOfFuelSaving < 0) {
          this.potentialFuelSaving = '0'
          this.potentialCOSaving = '0'

          var thisObjs = this;
          var fn = function () {
            thisObjs.percentageOfFuelSaving = 0;

          };
          this.handValueOutOfRangeErrorMessagePotentialSaving(fn);
        } else {
          this.onFleetDetailsChange()
        }
      //document.getElementById("percentageOfFuelSaving").style.background = this.percentageOfFuelSaving ? '#EEEEEE' : 'red';

    }
  }
  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  //for india.This part for annual fuel bill part
  onFleetDetailsChange() {
    var annualFuelBillTotal = 0
    // this.units = (this.selectedCountry == "United States") ? "metric":"non"

    if ((!!this.fleetsizetrucks && this.fleetsizetrucks != 0) && (!!this.currentpriceoffuel && this.currentpriceoffuel != 0) && (!!this.annualmpgpervehicle && this.annualmpgpervehicle != 0) && (!!this.annualmilespervehicle && this.annualmilespervehicle != 0)) {
      //(!!this.fleetsizetrailers && this.fleetsizetrailers != 0) &&
      if (this.units == 'metric') {
        var annualBills2;
        if(this.selectedCountry=='Australia' || this.selectedCountry=='Malaysia' || this.selectedCountry=='Indonesia' || this.selectedCountry=='Japan' || this.selectedCountry=='South Korea' || this.selectedCountry=='Thailand' || this.selectedCountry=='Vietnam' || this.selectedCountry=='Mexico' || this.selectedCountry=='Belice' || this.selectedCountry=='Guatemala' || this.selectedCountry=='Honduras' || this.selectedCountry=='Nicaragua' || this.selectedCountry=='Costa Rica' || this.selectedCountry=='Panama' || this.selectedCountry=='El Salvador' || this.selectedCountry=='Dominican Republic' || this.selectedCountry=='Jamaica' || this.selectedCountry=='Curazao' || this.selectedCountry=='Haiti' || this.selectedCountry=='Argentina' || this.selectedCountry=='Brazil' || this.selectedCountry=='Bolívia' || this.selectedCountry=='Chile' || this.selectedCountry=='Ecuador' || this.selectedCountry=='Peru' || this.selectedCountry=='Colombia' || this.selectedCountry=='Paraguay' || this.selectedCountry=='Uruguay' || this.selectedCountry=='Venezuela' || this.selectedCountry=='Bangladesh' || this.selectedCountry=='Bhutan' || this.selectedCountry=='India' || this.selectedCountry=='British Indian Ocean Territory' || this.selectedCountry=='Sri Lanka' || this.selectedCountry=='Maldives' || this.selectedCountry=='Nepal' || this.selectedCountry=='United Arab Emirates' || this.selectedCountry=='Afghanistan' || this.selectedCountry=='Bahrain' || this.selectedCountry=='Egypt' || this.selectedCountry=='Iraq' || this.selectedCountry==' Jordan' || this.selectedCountry=='Kuwait' || this.selectedCountry=='Lebanon' || this.selectedCountry=='Oman' || this.selectedCountry=='Pakistan' || this.selectedCountry=='Qatar' || this.selectedCountry=='Saudi Arabia' || this.selectedCountry=='Sudan' || this.selectedCountry=='Yemen' || this.selectedCountry=='Israel' || this.selectedCountry=='South Africa' || this.selectedCountry=='Zimbabwe' || this.selectedCountry=='Kenya' || this.selectedCountry=='Uganda' || this.selectedCountry=='Nigeria' || this.selectedCountry=='Madagascar' || this.selectedCountry=='Ethiopia'){
          annualBills2 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * (this.annualmilespervehicle / this.annualmpgpervehicle)));
        }
        // if(this.selectedCountry=='Bangladesh' || this.selectedCountry=='Bhutan' || this.selectedCountry=='India' || this.selectedCountry=='British Indian Ocean Territory' || this.selectedCountry=='Sri Lanka' || this.selectedCountry=='Maldives' || this.selectedCountry=='Nepal' || this.selectedCountry=='United Arab Emirates' || this.selectedCountry=='Afghanistan' || this.selectedCountry=='Bahrain' || this.selectedCountry=='Egypt' || this.selectedCountry=='Iraq' || this.selectedCountry==' Jordan' || this.selectedCountry=='Kuwait' || this.selectedCountry=='Lebanon' || this.selectedCountry=='Oman' || this.selectedCountry=='Pakistan' || this.selectedCountry=='Qatar' || this.selectedCountry=='Saudi Arabia' || this.selectedCountry=='Sudan' || this.selectedCountry=='Yemen' || this.selectedCountry=='Israel' || this.selectedCountry=='South Africa' || this.selectedCountry=='Zimbabwe' || this.selectedCountry=='Kenya' || this.selectedCountry=='Uganda' || this.selectedCountry=='Nigeria' || this.selectedCountry=='Madagascar' || this.selectedCountry=='Ethiopia'){
        //   annualBills2 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * (this.annualmilespervehicle / this.annualmpgpervehicle)));
        // }
        if(this.selectedCountry!='Australia' && this.selectedCountry!='Malaysia' && this.selectedCountry!='Indonesia' && this.selectedCountry!='Japan' && this.selectedCountry!='South Korea' && this.selectedCountry!='Thailand' && this.selectedCountry!='Vietnam' && this.selectedCountry!='Mexico' && this.selectedCountry!='Belice' && this.selectedCountry!='Guatemala' && this.selectedCountry!='Honduras' && this.selectedCountry!='Nicaragua' && this.selectedCountry!='Costa Rica' && this.selectedCountry!='Panama' && this.selectedCountry!='El Salvador' && this.selectedCountry!='Dominican Republic' && this.selectedCountry!='Jamaica' && this.selectedCountry!='Curazao' && this.selectedCountry!='Haiti' && this.selectedCountry!='Argentina' && this.selectedCountry!='Brazil' && this.selectedCountry!='Bolívia' && this.selectedCountry!='Chile' && this.selectedCountry!='Ecuador' && this.selectedCountry!='Peru' && this.selectedCountry!='Colombia' && this.selectedCountry!='Paraguay' && this.selectedCountry!='Uruguay' && this.selectedCountry!='Venezuela' && this.selectedCountry!='Bangladesh' && this.selectedCountry!='Bhutan' && this.selectedCountry!='India' && this.selectedCountry!='British Indian Ocean Territory' && this.selectedCountry!='Sri Lanka' && this.selectedCountry!='Maldives' && this.selectedCountry!='Nepal' && this.selectedCountry!='United Arab Emirates' && this.selectedCountry!='Afghanistan' && this.selectedCountry!='Bahrain' && this.selectedCountry!='Egypt' && this.selectedCountry!='Iraq' && this.selectedCountry!=' Jordan' && this.selectedCountry!='Kuwait' && this.selectedCountry!='Lebanon' && this.selectedCountry!='Oman' && this.selectedCountry!='Pakistan' && this.selectedCountry!='Qatar' && this.selectedCountry!='Saudi Arabia' && this.selectedCountry!='Sudan' && this.selectedCountry!='Yemen' && this.selectedCountry!='Israel' && this.selectedCountry!='South Africa' && this.selectedCountry!='Zimbabwe' && this.selectedCountry!='Kenya' && this.selectedCountry!='Uganda' && this.selectedCountry!='Nigeria' && this.selectedCountry!='Madagascar' && this.selectedCountry!='Ethiopia'){
          annualBills2 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * ((this.annualmilespervehicle * this.annualmpgpervehicle) / 100)));
        }
        // if ((localStorage.getItem("selectedRegionPdf") == 'AIM') || (localStorage.getItem("selectedRegionPdf") == 'E2A') || (localStorage.getItem("selectedRegionPdf") == 'AMS') || (localStorage.getItem("selectedRegionPdf") == 'AMC')) {
         
          // alert(localStorage.getItem("selectedRegionPdf"));
        // }
        // if ((localStorage.getItem("selectedRegionPdf") != 'AIM') && (localStorage.getItem("selectedRegionPdf") != 'E2A') && (localStorage.getItem("selectedRegionPdf") != 'AMS') && (localStorage.getItem("selectedRegionPdf") != 'AMC')) {
        //   annualBills2 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * ((this.annualmilespervehicle * this.annualmpgpervehicle) / 100)));
     
        // }

        //  annualBills2 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * ((this.annualmilespervehicle * this.annualmpgpervehicle) / 100)))
        annualFuelBillTotal = annualBills1;
        localStorage.setItem('annualBillAmount', annualBills2.toString());
        this.annualBill = annualBills2.toLocaleString(this.localStr);

      } else {
        // alert("hi");
        var annualBills4 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * (this.annualmilespervehicle / this.annualmpgpervehicle)))
        annualFuelBillTotal = annualBills4;
        localStorage.setItem('annualBillAmount', annualBills4.toString());
        this.annualBill = annualBills4.toLocaleString(this.localStr);

      }

      // this.storage.set('annualBillAmount', this.annualBill);


    } else {

      this.annualBill = "0";
      this.potentialFuelSaving = '0'
      this.potentialCOSaving = '0'

      if (!!this.fleetsizetrucks && this.fleetsizetrucks != 0) {
        this.validfleet.trucks = true;
      }

      if (!!this.fleetsizetrailers && this.fleetsizetrailers != 0) {
        this.validfleet.trailers = true;
      }

      if (!!this.annualmilespervehicle && this.annualmilespervehicle != 0) {
        this.validfleet.miles = true;
      }

      if (!!this.currentpriceoffuel && this.currentpriceoffuel != 0) {
        this.validfleet.fuelcost = true;
      }

      if (!!this.annualmpgpervehicle && this.annualmpgpervehicle != 0) {
        this.validfleet.mpg = true;
      }

    }
    //For india we need to update this
    //should be 100/annualmpgpervehicle//this is for potential fuel saving
    if ((annualFuelBillTotal != 0) && (!!this.percentageFuelSavingData && this.percentageOfFuelSaving != 0)) {
      var annualBills1;
      if ((localStorage.getItem("selectedRegionPdf") == 'AIM') || (localStorage.getItem("selectedRegionPdf") == 'E2A') || (localStorage.getItem("selectedRegionPdf") == 'AMS') || (localStorage.getItem("selectedRegionPdf") == 'AMC')) {
        annualBills1 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * (this.annualmilespervehicle / this.annualmpgpervehicle)));
        // alert(localStorage.getItem("selectedRegionPdf"));
      }
      if ((localStorage.getItem("selectedRegionPdf") != 'AIM') && (localStorage.getItem("selectedRegionPdf") != 'AMS') && (localStorage.getItem("selectedRegionPdf") != 'E2A') && (localStorage.getItem("selectedRegionPdf") != 'AMC')) {
        annualBills1 = Math.round((this.fleetsizetrucks * this.currentpriceoffuel * ((this.annualmilespervehicle * this.annualmpgpervehicle) / 100)))
      }

      var fuelSaved = annualBills1 * (this.percentageOfFuelSaving / 100);
      localStorage.setItem('potentialFuelSaving', Math.round(fuelSaved).toString());

      this.potentialFuelSaving = Math.round(fuelSaved).toLocaleString(this.localStr);

      // var co2Savings= Math.round((this.percentageOfFuelSaving)/100 * this.annualmilespervehicle * 2661 * this.fleetsizetrucks);
      var co2Savings = Math.round(((fuelSaved / this.currentpriceoffuel) * 3.24) / 1000);
      localStorage.setItem('potentialCo2Saving', Math.round(co2Savings).toString());


      this.potentialCOSaving = Math.round(co2Savings).toLocaleString(this.localStr);

    } else {
      this.potentialFuelSaving = '0'
      this.potentialCOSaving = '0'

    }


  }

  saveDataWhenLeavePage() {
    localStorage.setItem("company", this.company);
    localStorage.setItem("customerPhone", this.customerPhone);
    localStorage.setItem("customerFullName", this.customerFullName);
    localStorage.setItem("customerMail", this.customerMail);
    // this.getData1()
    this.units = (this.selectedCountry == "United States") ? 'us' : 'metric'
    localStorage.setItem("selectedCountry", this.selectedCountry)
    localStorage.setItem('unit system', this.units);
    localStorage.setItem('fleetName', this.fleet_name);
    localStorage.setItem('vehicleConfiguration', JSON.stringify(this.vehicleTrailerNondrivenMap));
    localStorage.setItem("fleetsizetrucks", this.fleetsizetrucks.toString());
    localStorage.setItem("fleetsizetrailer", this.fleetsizetrailers.toString());
    localStorage.setItem("annualmilespervehicle", this.annualmilespervehicle.toString());
    localStorage.setItem("currentpriceoffuel", this.currentpriceoffuel.toString());
    localStorage.setItem("annualmpgpervehicle", this.annualmpgpervehicle.toString());


    localStorage.setItem("percentageOfFuelSaving", this.percentageOfFuelSaving.toString());
    localStorage.setItem('longhaul', this.longhaul.toString());
    localStorage.setItem('regional', this.regional.toString());
    localStorage.setItem('urban', this.urban.toString());
    localStorage.setItem('annualaverageloadoftruck', this.annualaverageloadoftruck.toString());
    localStorage.setItem('fuelCalculation', this.fuel_calculation_toggle == true ? 'true' : 'false');
    localStorage.setItem('mileageCalculation', this.mileage_calculation_toggle == true ? 'true' : 'false');
    var tempJson = {};
    tempJson["unit system"] = this.units;
    tempJson["fleetName"] = localStorage.getItem("fleetName");
    tempJson["vehicleConfiguration"] = JSON.stringify(this.vehicleTrailerNondrivenMap);
    tempJson["fleetsizetrucks"] = this.fleetsizetrucks.toString();
    tempJson["fleetsizetrailer"] = this.fleetsizetrailers.toString();
    tempJson["annualmilespervehicle"] = this.annualmilespervehicle.toString();
    tempJson["currentpriceoffuel"] = this.currentpriceoffuel.toString();
    tempJson["annualmpgpervehicle"] = this.annualmpgpervehicle.toString();
    tempJson["percentageOfFuelSaving"] = this.percentageOfFuelSaving.toString();
    tempJson["longhaul"] = this.longhaul.toString();
    tempJson["regional"] = this.regional.toString();
    tempJson["urban"] = this.urban.toString();
    tempJson["annualaverageloadoftruck"] = this.annualaverageloadoftruck.toString();
    tempJson["fuelCalculation"] = this.fuel_calculation_toggle == true ? 'true' : 'false';
    tempJson["mileageCalculation"] = this.mileage_calculation_toggle == true ? 'true' : 'false';
    tempJson["company"] = this.company == null ? "" : this.company;
    tempJson["customerPhone"] = this.customerPhone == null ? "" : this.customerPhone;
    tempJson["customerFullName"] = this.customerFullName == null ? "" : this.customerFullName;
    tempJson["customerMail"] = this.customerMail == null ? "" : this.customerMail;
    tempJson["selectedRegion"] = localStorage.getItem("selectedRegion");
    tempJson["annualBillAmount"] = localStorage.getItem("annualBillAmount");
    tempJson["potentialFuelSaving"] = localStorage.getItem("potentialFuelSaving");
    tempJson["potentialCo2Saving"] = localStorage.getItem("potentialCo2Saving");
    tempJson["numoftotaltire"] = localStorage.getItem("numoftotaltire");
    tempJson["numofsteers"] = localStorage.getItem("numofsteers");
    tempJson["numofdrive"] = localStorage.getItem("numofdrive");
    tempJson["numoftrailer_wheels"] = localStorage.getItem("numoftrailer_wheels");
    tempJson["numofnondriven_wheels"] = localStorage.getItem("numofnondriven_wheels");
    tempJson["selectedVehicleImgIndex"] = localStorage.getItem("selectedVehicleImgIndex");
    tempJson["selectedVehicleImg"] = localStorage.getItem("selectedVehicleImg");
    tempJson["previouscountry"] = this.selectedCountry;
    tempJson["previouslanguage"] = this.selectedLanguage;
    tempJson["selectedRegionPdf"]=localStorage.getItem("selectedRegionPdf");
    // saveContent(tempJson, "homeInfoDB");
  }


  saveVehicleTireNumber() {
    localStorage.setItem("steerNum", this.vehicleTrailerNondrivenMap[this.autoCompleteData].steer);
    localStorage.setItem("driveNum", this.vehicleTrailerNondrivenMap[this.autoCompleteData].drive);
    localStorage.setItem("nondrivenNum", this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondriven);
    localStorage.setItem("trailerNum", this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer);
    localStorage.setItem("aero", this.vehicleTrailerNondrivenMap[this.autoCompleteData].aero);
    localStorage.setItem("steerContribution", this.vehicleTrailerNondrivenMap[this.autoCompleteData].steerCon);
    localStorage.setItem("driveContribution", this.vehicleTrailerNondrivenMap[this.autoCompleteData].driveCon);
    localStorage.setItem("nondrivenContribution", this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondrivenCon);
    localStorage.setItem("trailerContribution", this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailerCon);
    localStorage.setItem("trailer2Contribution", this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer2Con);
    localStorage.setItem("trailer3Contribution", this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer3Con);

    localStorage.setItem("numoftotaltire", this.vehicleTrailerNondrivenMap[this.autoCompleteData].totaltirev);
    localStorage.setItem("numofsteers", this.vehicleTrailerNondrivenMap[this.autoCompleteData].steer);
    localStorage.setItem("numofdrive", this.vehicleTrailerNondrivenMap[this.autoCompleteData].drive);
    localStorage.setItem("numoftrailer_wheels", this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer);
    localStorage.setItem("numofnondriven_wheels", this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondriven);

  }

  // validateEmail(email) {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }
  checkCompletion() {


    // this.validateemail =  this.validateEmail(this.customerMail);

    if (this.fleetsizetrucks == 0 || this.annualmilespervehicle == 0 || this.currentpriceoffuel == 0 || this.annualmpgpervehicle == 0 || this.annualaverageloadoftruck == 0 || this.fleet_name == "" || this.autoCompleteData == "") {
      //  document.getElementById("inputF").style.borderColor = this.company? 'grey' : ' red';
      //  document.getElementById("inputs").style.borderColor = this.customerPhone? 'grey' : 'red';
      //  document.getElementById("inputss").style.borderColor = this.validateemail? 'grey' : 'red';
      //  document.getElementById("inputsss").style.borderColor = this.customerPhone? 'grey' : 'red';

      document.getElementById("fleetSize").style.border = this.fleetsizetrucks ? '#EEEEEE' : '1px solid red';
      //document.getElementById("fleetsizeTrailer").style.background = this.fleetsizetrailers? '#EEEEEE' : 'red';
      document.getElementById("annualMiles").style.border = this.annualmilespervehicle ? '#EEEEEE' : '1px solid red';
      document.getElementById("fuelPrice").style.border = this.currentpriceoffuel ? '#EEEEEE' : '1px solid red';


      document.getElementById("annualMilesMPG").style.border = this.annualmpgpervehicle ? '#EEEEEE' : '1px solid red';
      document.getElementById("annualaverageloadoftruck").style.border = this.annualaverageloadoftruck ? '#EEEEEE' : '1px solid red';
      document.getElementById("fleetname").style.border = (this.fleet_name == "" || this.fleet_name == null) ? '1px solid red' : '#EEEEEE';
      document.getElementById("autoFleetConfiguration").style.border = this.autoCompleteData ? '#EEEEEE' : '1px solid red';
      return false;
    }
    //  if(this.validateemail == false){
    //   document.getElementById("inputss").style.borderColor = this.validateemail? 'grey' : 'red';
    //   return false;
    //  }

    return true;


  }


  handleIncompleteScenarioForFleetDetails() {

    this.translateService.get(['home_alert_msg', 'dismiss', 'cancel']).subscribe(text => {


      let alert = this.alertCtrl.create({
        message: text['home_alert_msg'],
        buttons: [
          {
            text: text['dismiss'],
            role: 'cancel',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
    });
  }


  handValueOutOfRangeErrorMessagePotentialSaving(resetFunction) {
    this.translateService.get(['Input value should between 0 and 20', 'dismiss', 'cancel']).subscribe(text => {
      let alert = this.alertCtrl.create({
        message: text['Input value should between 0 and 20'],
        buttons: [
          {
            text: text['dismiss'],
            role: 'cancel',
            handler: () => {
              resetFunction();
            }
          }
        ]
      });
      alert.present();
    });
  }

  handValueOutOfSumMessage(resetFunction) {
    this.translateService.get(['regional_urban_val', 'dismiss', 'cancel']).subscribe(text => {
      let alert = this.alertCtrl.create({
        message: text['regional_urban_val'],
        buttons: [
          {
            text: text['dismiss'],
            role: 'cancel',
            handler: () => {
              resetFunction();
            }
          }
        ]
      });
      alert.present();
    });

  }
  handValueOutOfRangeErrorMessage(resetFunction) {
    this.translateService.get(['out_of_range_alert_msg', 'dismiss']).subscribe(text => {

      let alert = this.alertCtrl.create({
        subTitle: text['out_of_range_alert_msg'],
        buttons: [text['dismiss']]
      });
      alert.present();
    });

  }


  addZeroes(num) {

    // If there is no decimal, or the decimal is less than 2 digits, toFixed
    if (num.split(".").length < 2) {
      num = num + '.00';
    } else if (num.split(".")[1].length < 2) {
      num = num + '0';
    } else if (num.split(".")[1].length >= 2) {
      num = parseFloat(num).toFixed(2);
    }
    // Return the number
    return num;
  }

  showAlertView() {
    this.translateService.get(['regional_urban_val', 'dismiss']).subscribe(text => {

      let alert = this.alertCtrl.create({
        subTitle: text['regional_urban_val'],
        buttons: [text['dismiss']]
      });
      alert.present();
    });
  }
  summarizeValueAutoPopulate(eventval) {
    console.log("summarizeValueAutoPopulatessAAA " + eventval)
    if (this.longhaul != 0 && this.regional != 0 && this.urban == 0) {
      var temp = 100 - this.longhaul - this.regional;
      if (temp < 0) {
        this.showAlertView();
        return;
      } else {
        if (this.urbanValue != 0) {
          this.urban = temp;
          this.urbanValue = 10
        }
      }
    } else if (this.longhaul == 0 && this.regional != 0 && this.urban != 0) {
      var temp = 100 - this.regional - this.urban;
      if (temp < 0) {

        this.showAlertView();
        return;
      } else {
        if (this.langhaulValue != 0) {
          this.longhaul = temp;
          this.langhaulValue = 10
        }
      }

    } else if (this.longhaul != 0 && this.regional == 0 && this.urban != 0) {

      var temp = 100 - this.longhaul - this.urban
      if (temp < 0) {

        this.showAlertView();
        return;
      } else {
        if (this.regionalValue != 0) {
          this.regional = temp;
          this.regionalValue = 10
        }
      }

    } else if (this.longhaul != 0 && this.regional != 0 && this.urban != 0) {


      var temp = 100 - this.longhaul - this.urban - this.regional;
      if (temp != 0) {
        //this.showAlertView();
        return;
      }
    }

  }

  sumvalue(value) {

    if ("longhaul" == value) {
      if (this.urban != 0 && this.regional != 0) {
        this.longhaul = (0 < 100 - this.urban - this.regional) ? (100 - this.urban - this.regional) : 0
      }
    }

    if ("urban" == value) {
      if (this.longhaul != 0 && this.regional != 0) {
        this.urban = (0 < 100 - this.longhaul - this.regional) ? 100 - this.longhaul - this.regional : 0
      }
    }
    if ("regional" == value) {
      if (this.longhaul != 0 && this.urban != 0) {
        this.regional = (0 < 100 - this.longhaul - this.urban) ? 100 - this.longhaul - this.urban : 0;
      }
    }

  }

  resetApp() {

    this.storage.clear();
    localStorage.clear();
    sessionStorage.clear();
    this.currencyPostion = 'P'
    this.currencySymbol = "$"
    this.selectedCountry = "United States"
    this.selectedMetricUnit = this.selectedCountry == "United States" ? "United States" : "other"
    this.selectedCountry = 'United States';
    this.selectedLanguage = 'English (US)';
    this.slectedLangCode = this.languageCodeArray[this.selectedLanguage];
    localStorage.setItem("languageCode", this.slectedLangCode);
    this.units = (this.selectedCountry == "United States") ? 'us' : 'metric'
    this.selectedCurrencyS = 'USD';
    this.translateService.use(this.languageMap[this.selectedLanguage]);
    this.translateService.setDefaultLang(this.languageMap[this.selectedLanguage]);
    this.company = ""
    this.fleet_name = ""
    this.customerPhone = "";
    this.customerFullName = "";
    this.customerMail = "";
    this.fuel_calculation_toggle = true;
    this.mileage_calculation_toggle = true;
    this.annualBill = '0';

    this.fleetsizetrucks = 0;
    this.fleetsizetrailers = 0;
    this.annualmilespervehicle = 0;
    this.currentpriceoffuel = 0;
    this.annualmpgpervehicle = 0;
    this.annualaverageloadoftruck = 0

    this.percentageOfFuelSaving = 0;
    this.percentageFuelSavingData = [];
    this.potentialFuelSaving = '0';
    this.potentialCOSaving = '0';
    this.indexValue = 1;

    this.indexValue = 1;
    localStorage.setItem("selectedVehicleImgIndex", "1");
    localStorage.setItem("selectedVehicleImg", "assets/img/diagram" + (this.indexValue + 1) + "-" + this.focus + "1.png");
    this.autoCompleteData = this.configs[this.indexValue].desc;
    this.showTrailerField = this.configs[this.indexValue].trailer_wheels == "0" ? true : false
    if (this.configs[this.indexValue].trailer_wheels == "0") {
      document.getElementById("fleetsizeTrailer").style.background = '#EEEEEE';
      this.fleetsizetrailers = 0
    } else {
      document.getElementById("fleetsizeTrailer").style.background = 'white';
    }

    this.longhaul = 0;
    this.regional = 0;
    this.urban = 0;
    this.totalvalue = 0;

    localStorage.setItem("selectedCurrency", this.selectedCurrencyS);
    localStorage.setItem("selectedCountry", this.selectedCountry);
    localStorage.setItem("selectedLanguage", this.selectedLanguage);
    //this.translateService.setDefaultLang("en");
    var tempJson = {};
    tempJson["previouscountry"] = this.selectedCountry;
    tempJson["previouslanguage"] = this.selectedLanguage;
    // saveContent(tempJson, "countryDB");
    var tempIdStrHome = "default_NCO_fuel_HomeDB";
    Ti.App.fireEvent('deleteFromHTML', {
      'id': tempIdStrHome,
    });
    var tempIdStrinfo = "default_NCO_fuel_infoDB";
    Ti.App.fireEvent('deleteFromHTML', {
      'id': tempIdStrinfo,
    });

  }

  exitFuelApp() {

    closeModal();


  }

}
