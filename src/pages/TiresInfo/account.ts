import { Component, ViewChild, Input } from '@angular/core';
import { App, Navbar, NavController, NavParams, ViewController, List } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { Platform, ActionSheetController } from 'ionic-angular'
import { ModalController } from 'ionic-angular';
import { AutocompletePagePage } from "../autocomplete-page/autocomplete-page";
import { ScenarioSummaryPage } from "../scenario-summary/scenario-summary";
import { TabsPage } from "../tabs/tabs";
import { TabProposedTirePage } from "../tab-proposed-tire/tab-proposed-tire";
import { SettingsPage } from "../settings/settings";
import { TranslateService } from "@ngx-translate/core";
import { TireInfoModel } from "../../app/models/TireInfoModel";
import { Http, Response } from '@angular/http'
import { AlertController } from 'ionic-angular';
import { HelpPage } from "../help/help";
import { WeightSavingPage } from "../weight-saving/weight-saving";
import { TabsResultPage } from "../tabs-result/tabs-result";
import { Promise } from 'es6-promise';
import { FontadjustmentProvider } from '../../Provider/fontadjustment/fontadjustment';
import * as XLSX from 'xlsx';
import { UrlResolver, componentModuleUrl } from '@angular/compiler';
import { HomePage } from '../home/home';
declare var closeModal: any;
declare var closeModal: any;
declare var saveContent: any;
declare var retrieveContentFromPitcher: any;
declare var Ti: any;
/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var closeModal: any;

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {



  @ViewChild(Navbar) navBar: Navbar;

  BrandName: String;
  BrandSize: String;
  BrandTrial: String;
  BrandRes = [];
  trailerShow: boolean = true;
  nondrivenShow: boolean = true;
  imgSrcString: String = "assets/img/diagram1-steer1.png";

  currentTireInfoModel = new TireInfoModel('currentTireInfoModel', []);
  proposedTireInfoModel1 = new TireInfoModel('proposedScenarioBasicAnalysisData1', []);
  items = [0, 1];
  titles = [];
  modelsList = [];



  fuel_calculation_toggle = true;
  mileage_calculation_toggle = true;

  RRTotalCoefficient = (1 + 0 / 2);



  proposedTireInfoModel2 = new TireInfoModel('proposedScenarioBasicAnalysisData2', []);
  proposedTireInfoModel3 = new TireInfoModel('proposedScenarioBasicAnalysisData3', []);
  proposedTireInfoModel4 = new TireInfoModel('proposedScenarioBasicAnalysisData4', []);
  proposedTireInfoModel5 = new TireInfoModel('proposedScenarioBasicAnalysisData5', []);
  proposedTireInfoModel6 = new TireInfoModel('proposedScenarioBasicAnalysisData6', []);
  proposedTireInfoModel7 = new TireInfoModel('proposedScenarioBasicAnalysisData7', []);
  proposedTireInfoModel8 = new TireInfoModel('proposedScenarioBasicAnalysisData8', []);
  proposedTireInfoModel9 = new TireInfoModel('proposedScenarioBasicAnalysisData9', []);
  proposedTireInfoModel10 = new TireInfoModel('proposedScenarioBasicAnalysisData10', []);
  proposedTireInfoModel11 = new TireInfoModel('proposedScenarioBasicAnalysisData11', []);
  proposedTireInfoModel12 = new TireInfoModel('proposedScenarioBasicAnalysisData12', []);
  proposedTireInfoModel13 = new TireInfoModel('proposedScenarioBasicAnalysisData13', []);


  steercheckboxnew = true;
  drivecheckboxnew = true;
  nondrivencheckboxnew = true;
  trailercheckboxnew = true;


  proposedScenarioMap = {};

  title = "";

  language: string;

  showAddButton = true;

  currencySymbol = '€';
  selector = [];
  currencyPostion = 'P'
  currencySeparator = ''

  selectedCountry;
  results = { mfg: [], size: [], tread: [], rim: [], rr: [], weight: [], xone: [] };


  brandTreadMap = {};
  treadSizeMap = {};
  sizeRRMap = {};

  treadRRMap = {};

  //checkbox
  steercheckbox = true;
  drivecheckbox = true;

  columns = "4";


  vehicleConfigurationMap: any;

  passedValue: any;

  scenario_title: any;

  showMenu = true;
  // backShowCtrl=true;

  unit = "";

  excelToJson;

  //Added New Tire Value
  tireSelected = "";
  rrObj = "assets/api/rr.json"
  constructor(public fontAdjustmentService: FontadjustmentProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public actionSheetCtrl: ActionSheetController, public platform: Platform
    , public alertCtrl: AlertController, private modalCtrl: ModalController, public translateService: TranslateService, public http: Http, private myApp: App) {
      // alert(localStorage.getItem("steerContribution")+" "+localStorage.getItem("driveContribution"));

    // this.storage.clear();
    if (localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined) {
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }


    if (localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined) {
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true : false;
    }

    this.translateService.get(['kilometers', 'miles', 'current_tire', 'proposed_tire', 'currency']).subscribe(text => {
      this.unit = localStorage.getItem('unit system') == 'metric' ? 'kilometers' : 'miles'
      this.titles.push(text['current_tire']);
      this.titles.push(text['proposed_tire'] + "1");
      this.title = text['current_tire'];
      // this.currencySymbol = text['currency'];

    })
    let currencyCode = localStorage.getItem("selectedCurrency") == null ? "EUR" : localStorage.getItem("selectedCurrency");
    this.currencyPostion = localStorage.getItem("selectedPosition") == null ? "P" : localStorage.getItem("selectedPosition");
    this.currencySymbol = localStorage.getItem("selectedCurrencySymbol");
    this.currencySeparator = localStorage.getItem("selectedSeparator");

    var dataFromStorage = this.navParams.get("passedValue");

    if (dataFromStorage != undefined) {
      this.loadData(dataFromStorage);
    } else {
      this.modelsList.push(this.currentTireInfoModel);
      this.modelsList.push(this.proposedTireInfoModel1);

      if (this.modelsList[0].autoCompleteDataSteerBrand == "" && this.steercheckboxnew) {
        this.modelsList[0].autoCompleteDataSteerBrand = 'MICHELIN';
      }

      if (this.modelsList[0].autoCompleteDataTireSteer == "" && this.steercheckboxnew) {
        this.modelsList[0].autoCompleteDataTireSteer = "";
        this.modelsList[0].autoCompleteDataSizeSteer = "";
      }

      if (this.modelsList[0].autoCompleteDataDriveBrand == "" && this.drivecheckboxnew) {
        this.modelsList[0].autoCompleteDataDriveBrand = 'MICHELIN';
      }

      if (this.modelsList[0].autoCompleteDataTireDrive == "" && this.drivecheckboxnew) {
        this.modelsList[0].autoCompleteDataTireDrive = "";
        this.modelsList[0].autoCompleteDataSizeDrive = "";
      }

      if (this.nondrivencheckboxnew && this.nondrivenShow && this.modelsList[0].autoCompleteDataNondrivenBrand == "") {
        this.modelsList[0].autoCompleteDataNondrivenBrand = 'MICHELIN';
      }

      if (this.nondrivencheckboxnew && this.nondrivenShow && this.modelsList[0].autoCompleteDataTireNondriven == "") {
        this.modelsList[0].autoCompleteDataTireNondriven = "";
        this.modelsList[0].autoCompleteDataSizeNonDrive = "";

      }

      if (this.trailercheckboxnew && this.trailerShow && this.modelsList[0].autoCompleteDataTrailerBrand == "") {
        this.modelsList[0].autoCompleteDataTrailerBrand = 'MICHELIN';
      }

      if (this.trailercheckboxnew && this.trailerShow && this.modelsList[0].autoCompleteDataTireTrailer == "") {
        this.modelsList[0].autoCompleteDataTireTrailer = '';
        this.modelsList[0].autoCompleteDataSizeTrailer = "";
      }


      if (this.modelsList[1].autoCompleteDataSteerBrand == "" && this.steercheckboxnew) {
        this.modelsList[1].autoCompleteDataSteerBrand = 'MICHELIN';
      }

      if (this.modelsList[1].autoCompleteDataTireSteer == "" && this.steercheckboxnew) {
        this.modelsList[1].autoCompleteDataTireSteer = '';
        this.modelsList[1].steerBaseRollingResistance = 0;

      }

      if (this.modelsList[1].autoCompleteDataDriveBrand == "" && this.drivecheckboxnew) {
        this.modelsList[1].autoCompleteDataDriveBrand = 'MICHELIN';
      }



      if (this.modelsList[1].autoCompleteDataTireDrive == "" && this.drivecheckboxnew) {
        this.modelsList[1].autoCompleteDataTireDrive = '';
        this.modelsList[1].driveBaseRollingResistance = 0;
      }

      if (this.nondrivencheckboxnew && this.nondrivenShow && this.modelsList[1].autoCompleteDataNondrivenBrand == "") {
        this.modelsList[1].autoCompleteDataNondrivenBrand = 'MICHELIN';
      }

      if (this.nondrivencheckboxnew && this.nondrivenShow && this.modelsList[1].autoCompleteDataTireNondriven == "") {
        this.modelsList[1].autoCompleteDataTireNondriven = '';
        this.modelsList[1].nondrivenBaseRollingResistance = 0;
      }

      if (this.trailercheckboxnew && this.trailerShow && this.modelsList[1].autoCompleteDataTrailerBrand == "") {
        this.modelsList[1].autoCompleteDataTrailerBrand = 'MICHELIN';
      }

      if (this.trailercheckboxnew && this.trailerShow && this.modelsList[1].autoCompleteDataTireTrailer == "") {
        this.modelsList[1].autoCompleteDataTireTrailer = '';
        this.modelsList[1].trailerBaseRollingResistance = 0
      }

      var steerCon = parseFloat(localStorage.getItem("steerContribution"));
      var driveCon = parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));



      this.modelsList[1].totalRollingResistance = 0;
      if (this.steercheckboxnew ) {
        this.modelsList[1].totalRollingResistance += this.modelsList[1].steerBaseRollingResistance * steerCon;
      
      }

      if (this.drivecheckboxnew) {
        this.modelsList[1].totalRollingResistance += this.modelsList[1].driveBaseRollingResistance * driveCon;
      }

      if (this.nondrivenShow && this.nondrivencheckboxnew) {
        this.modelsList[1].totalRollingResistance += this.modelsList[1].nondrivenBaseRollingResistance * nondrivenCon;
      }

      if (this.trailerShow && this.trailercheckboxnew) {
        this.modelsList[1].totalRollingResistance += this.modelsList[1].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      }

      this.modelsList[1].totalRollingResistance = Math.round(this.modelsList[1].totalRollingResistance * this.RRTotalCoefficient);
      localStorage.setItem("basicAnalysisList", JSON.stringify(this.modelsList))

      this.modelsList[1].totalRollingResistance = 0;

    }



    if (localStorage.getItem('steercheckboxnewbasic') != null && localStorage.getItem('steercheckboxnewbasic') != undefined) {
      this.steercheckboxnew = localStorage.getItem('steercheckboxnewbasic') == 'true' ? true : false;
    }


    if (localStorage.getItem('drivecheckboxnewbasic') != null && localStorage.getItem('drivecheckboxnewbasic') != undefined) {
      this.drivecheckboxnew = localStorage.getItem('drivecheckboxnewbasic') == 'true' ? true : false;
    }

    if (this.nondrivenShow) {
      if (localStorage.getItem('nondrivencheckboxnewbasic') != null && localStorage.getItem('nondrivencheckboxnewbasic') != undefined) {
        this.nondrivencheckboxnew = localStorage.getItem('nondrivencheckboxnewbasic') == 'true' ? true : false;
      }
    }


    if (this.trailerShow) {
      if (localStorage.getItem('trailercheckboxnewbasic') != null && localStorage.getItem('trailercheckboxnewbasic') != undefined) {
        this.trailercheckboxnew = localStorage.getItem('trailercheckboxnewbasic') == 'true' ? true : false;
      }
    }





    this.proposedScenarioMap["currentTireInfoModel"] = this.currentTireInfoModel;
    this.proposedScenarioMap["proposedTireInfoModel1"] = this.proposedTireInfoModel1;
    this.proposedScenarioMap["proposedTireInfoModel2"] = this.proposedTireInfoModel2;
    this.proposedScenarioMap["proposedTireInfoModel3"] = this.proposedTireInfoModel3;
    this.proposedScenarioMap["proposedTireInfoModel4"] = this.proposedTireInfoModel4;
    this.proposedScenarioMap["proposedTireInfoModel5"] = this.proposedTireInfoModel5;
    this.proposedScenarioMap["proposedTireInfoModel6"] = this.proposedTireInfoModel6;
    this.proposedScenarioMap["proposedTireInfoModel7"] = this.proposedTireInfoModel7;
    this.proposedScenarioMap["proposedTireInfoModel8"] = this.proposedTireInfoModel8;
    this.proposedScenarioMap["proposedTireInfoModel9"] = this.proposedTireInfoModel9;
    this.proposedScenarioMap["proposedTireInfoModel10"] = this.proposedTireInfoModel10;
    this.proposedScenarioMap["proposedTireInfoModel11"] = this.proposedTireInfoModel11;
    this.proposedScenarioMap["proposedTireInfoModel12"] = this.proposedTireInfoModel12;
    this.proposedScenarioMap["proposedTireInfoModel13"] = this.proposedTireInfoModel13;

    // alert(this.currentTireInfoModel+" " +this.proposedTireInfoModel1)
    var accountObj = this;
    if (localStorage.getItem('selectedRegion') == null || localStorage.getItem('selectedRegion') == undefined) {
      this.rrObj = "assets/api/rr.json"
      localStorage.setItem("SelectedRegionData", "ALL");
    } else if (localStorage.getItem("selectedCountry") == "India") {
      this.rrObj = "assets/api/rr_AIM.json"
      localStorage.setItem("SelectedRegionData", "AIM");

    } else if (localStorage.getItem("selectedCountry") == "Bangladesh" || localStorage.getItem("selectedCountry") == "Bhutan" || localStorage.getItem("selectedCountry") == "British Indian Ocean Territory" || localStorage.getItem("selectedCountry") == "Sri Lanka" || localStorage.getItem("selectedCountry") == "Maldives" || localStorage.getItem("selectedCountry") == "Nepal" || localStorage.getItem("selectedCountry") == "United Arab Emirates" || localStorage.getItem("selectedCountry") == "Afghanistan" || localStorage.getItem("selectedCountry") == "Bahrain" || localStorage.getItem("selectedCountry") == "Egypt" || localStorage.getItem("selectedCountry") == "Iraq" || localStorage.getItem("selectedCountry") == "Iran, Islamic Republic of" || localStorage.getItem("selectedCountry") == "Jordan" || localStorage.getItem("selectedCountry") == "Kuwait" || localStorage.getItem("selectedCountry") == "Lebanon" || localStorage.getItem("selectedCountry") == "Oman" || localStorage.getItem("selectedCountry") == "Pakistan" || localStorage.getItem("selectedCountry") == "Qatar" || localStorage.getItem("selectedCountry") == "Saudi Arabia" || localStorage.getItem("selectedCountry") == "Sudan" || localStorage.getItem("selectedCountry") == "Syrian Arab Republic" || localStorage.getItem("selectedCountry") == "Yemen" || localStorage.getItem("selectedCountry") == "Algeria" || localStorage.getItem("selectedCountry") == "Gibraltar" || localStorage.getItem("selectedCountry") == "Israel" || localStorage.getItem("selectedCountry") == "Libyan Arab Jamahiriya" || localStorage.getItem("selectedCountry") == "Morocco" || localStorage.getItem("selectedCountry") == "Mauritania" || localStorage.getItem("selectedCountry") == "Tunisia" || localStorage.getItem("selectedCountry") == "Angola" || localStorage.getItem("selectedCountry") == "Bouvet Island" || localStorage.getItem("selectedCountry") == "Botswana" || localStorage.getItem("selectedCountry") == "Heard Island and McDonald Islands" || localStorage.getItem("selectedCountry") == "Lesotho" || localStorage.getItem("selectedCountry") == "Malawi" || localStorage.getItem("selectedCountry") == "Mozambique" || localStorage.getItem("selectedCountry") == "Namibia" || localStorage.getItem("selectedCountry") == "Swaziland" || localStorage.getItem("selectedCountry") == "South Africa" || localStorage.getItem("selectedCountry") == "Zambia" || localStorage.getItem("selectedCountry") == "Zimbabwe" || localStorage.getItem("selectedCountry") == "Burkina Faso" || localStorage.getItem("selectedCountry") == "Burundi" || localStorage.getItem("selectedCountry") == "Benin" || localStorage.getItem("selectedCountry") == "Congo, the Democratic Republic of the" || localStorage.getItem("selectedCountry") == "Central African Republic" || localStorage.getItem("selectedCountry") == "Congo" || localStorage.getItem("selectedCountry") == "Côte d'Ivoire" || localStorage.getItem("selectedCountry") == "Cameroon" || localStorage.getItem("selectedCountry") == "Cape Verde" || localStorage.getItem("selectedCountry") == "Djibouti" || localStorage.getItem("selectedCountry") == "Western Sahara" || localStorage.getItem("selectedCountry") == "Eritrea" || localStorage.getItem("selectedCountry") == "Ethiopia" || localStorage.getItem("selectedCountry") == "Gabon" || localStorage.getItem("selectedCountry") == "Ghana" || localStorage.getItem("selectedCountry") == "Gambia" || localStorage.getItem("selectedCountry") == "Guinea" || localStorage.getItem("selectedCountry") == "Equatorial Guinea" || localStorage.getItem("selectedCountry") == "Guinea-Bissau" || localStorage.getItem("selectedCountry") == "Comoros" || localStorage.getItem("selectedCountry") == "Madagascar" || localStorage.getItem("selectedCountry") == "Mauritius" || localStorage.getItem("selectedCountry") == "Nigeria" || localStorage.getItem("selectedCountry") == "Rwanda" || localStorage.getItem("selectedCountry") == "Saint Helena, Ascension and Tristan Da Cunha" || localStorage.getItem("selectedCountry") == "Senegal" || localStorage.getItem("selectedCountry") == "Sao Tome and Principe" || localStorage.getItem("selectedCountry") == "Togo" || localStorage.getItem("selectedCountry") == "Kenya" || localStorage.getItem("selectedCountry") == "Liberia" || localStorage.getItem("selectedCountry") == "Mali" || localStorage.getItem("selectedCountry") == "Niger" || localStorage.getItem("selectedCountry") == "Reunion" || localStorage.getItem("selectedCountry") == "Seychelles" || localStorage.getItem("selectedCountry") == "Sierra Leone" || localStorage.getItem("selectedCountry") == "Somalia, Federal Republic of" || localStorage.getItem("selectedCountry") == "Chad" || localStorage.getItem("selectedCountry") == "Tanzania, United Repulic of" || localStorage.getItem("selectedCountry") == 'Uganda' || localStorage.getItem("selectedCountry") == 'Mayotte') {
      this.rrObj = "assets/api/rr_AFMO.json"
      localStorage.setItem("SelectedRegionData", "AFMO");
    }
    else if (localStorage.getItem("selectedCountry") == "Argentina" || localStorage.getItem("selectedCountry") == "Brazil" || localStorage.getItem("selectedCountry") == "Bolívia" || localStorage.getItem("selectedCountry") == "Chile" || localStorage.getItem("selectedCountry") == "Ecuador" || localStorage.getItem("selectedCountry") == "Peru" || localStorage.getItem("selectedCountry") == "Colombia" || localStorage.getItem("selectedCountry") == "Paraguay" || localStorage.getItem("selectedCountry") == "Uruguay" || localStorage.getItem("selectedCountry") == "Venezuela") {
      this.rrObj = "assets/api/rr_AMS.json"
      localStorage.setItem("SelectedRegionData", "AMS");
    } else if (localStorage.getItem("selectedCountry") == 'China mainland') {
      this.rrObj = "assets/api/rr_CN.json";
      localStorage.setItem("SelectedRegionData", "CN");
    }
    else if (localStorage.getItem("selectedCountry") == 'Taiwan') {
      this.rrObj = "assets/api/rr_TW.json";
      localStorage.setItem("SelectedRegionData", "CN");
    }
    else if (localStorage.getItem("selectedCountry") == "Australia" || localStorage.getItem("selectedCountry") == "Malaysia" || localStorage.getItem("selectedCountry") == "Indonesia" || localStorage.getItem("selectedCountry") == "Japan" || localStorage.getItem("selectedCountry") == "South Korea" || localStorage.getItem("selectedCountry") == "Thailand" || localStorage.getItem("selectedCountry") == "Vietnam") {
      this.rrObj = "assets/api/rr_ETOA.json";
      localStorage.setItem("SelectedRegionData", "E2A");
    }
    else {
      localStorage.setItem("SelectedRegionData", "ALL");
    }
    this.http.get(this.rrObj).map((res: Response) => res.json()).subscribe(
      res => {
        this.BrandRes = [];
        this.BrandRes = res;
        let keys = Array.from(res.values());
        localStorage.setItem("rrMapValues", JSON.stringify(this.BrandRes));
        for (var i = 0; i < res.length; i++) {
          //console.log(res);
          //console.log(JSON.stringify(res));
          // if(this.results.tread.indexOf(res[i].tread) == -1){
          //  this.results.tread.push(res[i].tread);
          //brandTreadMap

          //TreadSizeMap
          // console.log(res[i].tread );
          // if(res[i].tread == "XZY"){
          //   console.log(JSON.stringify(tempTreadArr));
          //   console.log(res[i].size);
          // }
          if (this.treadSizeMap[res[i].mfg] != null) {
            var tempTreadArr = this.treadSizeMap[res[i].mfg];

            // if(res[i].tread == "XZY"){
            //   console.log(JSON.stringify(tempTreadArr));
            //   console.log(res[i].size);
            // }
            console.log("The tread map:" + tempTreadArr.indexOf(res[i].size))
            if (tempTreadArr.indexOf(res[i].size) == -1) {
              this.treadSizeMap[res[i].mfg].push(res[i].size);
            }
          } else {
            // if(res[i].tread == "XZY"){
            //   console.log(JSON.stringify(tempTreadArr));
            //   console.log(res[i].size);
            // }

            this.treadSizeMap[res[i].mfg] = [];
            this.treadSizeMap[res[i].mfg].push(res[i].size);
          }

          var obj = {};
          //CG5
          if (this.brandTreadMap[res[i].mfg] != null) {
            var tempSizes = this.brandTreadMap[res[i].mfg];
            const tempfound = tempSizes.find(element => element[res[i].size]);
            if (tempfound != undefined) {
              console.log("the find value", tempfound[res[i].size]);
            }
            if (tempfound != undefined) {
              var temptread = tempfound[res[i].size];
              if (temptread.indexOf(res[i].tread) == -1) {
                temptread.push(res[i].tread);
                // obj[res[i].size].push(res[i].tread)
                // temptread.push(res[i].tread);
                // var size = this.brandTreadMap[res[i].mfg];
                // var tread = size[res[i].size];
                // tread.push(res[i].tread)
                // this.brandTreadMap[res[i].mfg].push(obj);
              }
            } else {
              obj[res[i].size] = [];
              obj[res[i].size].push(res[i].tread);
              this.brandTreadMap[res[i].mfg].push(obj);
            }
          } else {
            this.brandTreadMap[res[i].mfg] = [];
            obj[res[i].size] = [];
            obj[res[i].size].push(res[i].tread);
            this.brandTreadMap[res[i].mfg].push(obj);
          }

          /*if(this.brandTreadMap[res[i].size] != null){
            var tempTreadArr = this.brandTreadMap[res[i].size];
            if(tempTreadArr.indexOf(res[i].tread) == -1){
             this.brandTreadMap[res[i].size].push(res[i].tread);
            }
          }else{
            this.brandTreadMap[res[i].size] = [];
            this.brandTreadMap[res[i].size].push(res[i].tread);
          }*/

          //SizeRRMap
          if (this.sizeRRMap[res[i].tread] != null) {
            var tempTreadArr = this.sizeRRMap[res[i].size];
            if (tempTreadArr.indexOf(res[i].rr) == -1) {
              this.sizeRRMap[res[i].size].push(res[i].rr);
            }
          } else {
            this.sizeRRMap[res[i].size] = [];
            this.sizeRRMap[res[i].size].push(res[i].rr);
          }
          // }

          if (accountObj.results.mfg != null && res[i].mfg != null && accountObj.results.mfg.indexOf(res[i].mfg) == -1) {
            accountObj.results.mfg.push(res[i].mfg);
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


        var tempMFG = Object.assign([], this.results.mfg);


        this.results.mfg = [];
        //  this.results.mfg.push('MICHELIN','MRF', 'BFG');
        this.results.mfg.push('MICHELIN');
        for (var l = 0; l < tempMFG.length; l++) {
          if (tempMFG[l] != 'MICHELIN' && tempMFG[l] != 'MRF' && tempMFG[l] != 'BFG' && tempMFG[l] != 'OLIVER' && tempMFG[l] != 'MegaMile') {
            this.results.mfg.push(tempMFG[l]);
          }
        }



        this.storage.set("brandTreadMap", JSON.stringify(this.brandTreadMap));
        this.storage.set("rrjsonresults", JSON.stringify(this.results));
        this.storage.set("treadSizeMap", JSON.stringify(this.treadSizeMap));
        this.storage.set("sizeRRMap", JSON.stringify(this.sizeRRMap));
        this.storage.set("treadRRMap", JSON.stringify(this.treadRRMap));

        localStorage.setItem("brandTreadMap", JSON.stringify(this.brandTreadMap));
        localStorage.setItem("rrjsonresults", JSON.stringify(this.results));
        localStorage.setItem("treadRRMap", JSON.stringify(this.treadRRMap));
        localStorage.setItem("treadSizeMap", JSON.stringify(this.treadSizeMap));

        localStorage.setItem("sizeRRMap", JSON.stringify(this.sizeRRMap));
        console.log("sizeRRMap", this.sizeRRMap);
      }

    );


    this.passedValue = navParams.get("passedValue");
    this.trailerShow = navParams.get("trailerShow");
    this.nondrivenShow = navParams.get("nondrivenShow");

    console.log(navParams);

    // if(localStorage.getItem('language') != null) {
    //   this.translateService.setDefaultLang(localStorage.getItem('language'));
    // }else {
    //   this.translateService.setDefaultLang("en");
    // }

    if (localStorage.getItem('selectedVehicleImg') != null) {
      this.imgSrcString = localStorage.getItem('selectedVehicleImg');
    } else {
      this.imgSrcString = "assets/img/diagram" + (1) + "-" + "steer1.png";
    }




  }



  loadData(data) {
    if (data != null && data != undefined) {

      this.modelsList = JSON.parse(data);

      for (var i = 0; i < this.modelsList.length; i++) {
        if (i > 1) {
          this.items.push(i);
          this.translateService.get(['proposed_tire']).subscribe(text => {
            this.titles.push(text['proposed_tire'] + i);
          });
        }
      }

    }
  }


  showAutocompleteModal(id, item) {
    console.log("The Item Value is" + item);

    //CG1
    let modal: any;
    if (id < 4) {
      modal = this.modalCtrl.create(AutocompletePagePage, { passedinData: this.results.mfg.sort(), type: "brand" });
    } else {
      var tempPassedInValue: any;
      switch (id) {
        case 4:
          var steerbrand = this.brandTreadMap[this.modelsList[item].autoCompleteDataSteerBrand];
          var steerSize = steerbrand != undefined ? steerbrand.find(element => element[this.modelsList[item].autoCompleteDataSizeSteer]) : undefined;
          if (steerSize == null || steerSize == undefined) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = steerSize[this.modelsList[item].autoCompleteDataSizeSteer];
            // alert(tempPassedInValue);
          }
          break

        case 5:
          var drivebrand = this.brandTreadMap[this.modelsList[item].autoCompleteDataDriveBrand];
          const driveSize = drivebrand != undefined ? drivebrand.find(element => element[this.modelsList[item].autoCompleteDataSizeDrive]) : undefined;
          if (driveSize == null || driveSize == undefined) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = driveSize[this.modelsList[item].autoCompleteDataSizeDrive];
          }
          break;
        case 6:
          var sizeNondriveB = this.brandTreadMap[this.modelsList[item].autoCompleteDataNondrivenBrand];
          const sizeNonDrive = sizeNondriveB != undefined ? sizeNondriveB.find(element => element[this.modelsList[item].autoCompleteDataSizeNonDrive]) : undefined;
          if (sizeNonDrive == null || sizeNonDrive == undefined) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = sizeNonDrive[this.modelsList[item].autoCompleteDataSizeNonDrive];
          }
          break;

        case 7:
          var sizeTrailerB = this.brandTreadMap[this.modelsList[item].autoCompleteDataTrailerBrand];
          const sizetrailer = sizeTrailerB != undefined ? sizeTrailerB.find(element => element[this.modelsList[item].autoCompleteDataSizeTrailer]) : undefined;
          if (sizetrailer == null || sizetrailer == undefined) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = sizetrailer[this.modelsList[item].autoCompleteDataSizeTrailer];
          }
          break;
        // logic for size
        case 8:
          if (this.treadSizeMap[this.modelsList[item].autoCompleteDataSteerBrand] == null) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = this.treadSizeMap[this.modelsList[item].autoCompleteDataSteerBrand];
          }
          break;

        case 9:
          if (this.treadSizeMap[this.modelsList[item].autoCompleteDataDriveBrand] == null) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = this.treadSizeMap[this.modelsList[item].autoCompleteDataDriveBrand];
          }
          break;

        case 10:
          if (this.treadSizeMap[this.modelsList[item].autoCompleteDataNondrivenBrand] == null) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = this.treadSizeMap[this.modelsList[item].autoCompleteDataNondrivenBrand];
          }
          break;

        case 11:
          if (this.treadSizeMap[this.modelsList[item].autoCompleteDataTrailerBrand] == null) {
            tempPassedInValue = [];
          } else {
            tempPassedInValue = this.treadSizeMap[this.modelsList[item].autoCompleteDataTrailerBrand];
          }
          break;

      }
      modal = this.modalCtrl.create(AutocompletePagePage, { passedinData: tempPassedInValue, type: "Size" });
    }




    modal.onDidDismiss(data => {
      var totalnumTire = 0.0;
      if (this.steercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("steerNum"));
      }
      if (this.drivecheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("driveNum"));
      }
      if (this.nondrivencheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("nondrivenNum"));
      }
      if (this.trailercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("trailerNum"));
      }

      var steerCon = (parseFloat(localStorage.getItem("steerNum")) / totalnumTire);
      var driveCon = (parseFloat(localStorage.getItem("driveNum")) / totalnumTire);//parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = (parseFloat(localStorage.getItem("nondrivenNum")) / totalnumTire);//parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = (parseFloat(localStorage.getItem("trailerNum")) / totalnumTire);//parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));
      this.tireSelected = "";

      var numtotalTire = parseInt(localStorage.getItem("numoftotaltire"));
      var numSteerWheel = parseInt(localStorage.getItem("numofsteers"));
      var numDriveWheel = parseInt(localStorage.getItem("numofdrive"));
      var numtrailerWheel = parseInt(localStorage.getItem("numoftrailer_wheels"));
      var numNontrailerWheel = parseInt(localStorage.getItem("numofnondriven_wheels"));
      //CG2 
      switch (id) {
        case 0:
          this.modelsList[item].autoCompleteDataSteerBrand = data;
          this.modelsList[item].autoCompleteDataTireSteer = "";
          // document.getElementById(this.titles[item] + "steerBrand").style.border = this.modelsList[item].autoCompleteDataSteerBrand ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "steer.png";

          if (this.treadSizeMap[data] != null && this.treadSizeMap[data].length > 0) {
            var tempList = [];
            tempList.push(null);
            tempList.concat(this.treadSizeMap[data][0]);
            this.modelsList[item].autoCompleteDataSizeSteer = tempList;

            if (this.brandTreadMap[this.treadSizeMap[data][0]] != null && this.brandTreadMap[this.treadSizeMap[data][0]].length > 0) {
              var tempList2 = [];
              tempList2.push(null);
              tempList2.concat(this.brandTreadMap[this.treadSizeMap[data][0]][0]);
              this.modelsList[item].autoCompleteDataTireSteer = tempList2;
              // this.modelsList[item].autoCompleteDataSizeSteer = this.treadSizeMap[this.brandTreadMap[data][0]][0];
              //rolling logic
              if (item != 0) {
                this.modelsList[item].steerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]) * 100);
              } else {
                for (var j = 0; j < this.items.length; j++) {
                  if ((this.modelsList[j].autoCompleteDataTireSteer != undefined || this.modelsList[j].autoCompleteDataTireSteer != "" || this.modelsList[j].autoCompleteDataTireSteer != null)) {
                    this.modelsList[j].steerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]) * 100);
                  }
                }
              }
            } else {
              this.modelsList[item].autoCompleteDataSizeSteer = null;
              this.modelsList[item].steerBaseRollingResistance = null;
            }
          } else {
            this.modelsList[item].autoCompleteDataTireSteer = null;
            this.modelsList[item].autoCompleteDataSizeSteer = null;
            this.modelsList[item].steerBaseRollingResistance = null;
          }
          document.getElementById(this.titles[item] + "steerBrand").style.border = this.modelsList[item].autoCompleteDataSteerBrand ? 'white' : '2px solid red';
          break
        case 1:
          this.modelsList[item].autoCompleteDataDriveBrand = data;
          this.modelsList[item].autoCompleteDataTireDrive = "";
          // document.getElementById(this.titles[item] + "driveBrand").style.border = this.modelsList[item].autoCompleteDataDriveBrand ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "drive.png";

          if (this.treadSizeMap[data] != null && this.treadSizeMap[data].length > 0) {
            var tempList = [];
            tempList.push(null);
            tempList.concat(this.treadSizeMap[data][0]);
            this.modelsList[item].autoCompleteDataSizeDrive = tempList;
            if (this.brandTreadMap[this.treadSizeMap[data][0]] != null && this.brandTreadMap[this.treadSizeMap[data][0]].length > 0) {
              var tempList2 = [];
              tempList2.push(null);
              tempList2.concat(this.brandTreadMap[this.treadSizeMap[data][0]][0]);
              this.modelsList[item].autoCompleteDataTireDrive = tempList2;
              //rolling logic
              if (item != 0) {
                this.modelsList[item].driveBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
              } else {
                for (var j = 0; j < this.items.length; j++) {
                  if ((this.modelsList[j].autoCompleteDataTireDrive != undefined || this.modelsList[j].autoCompleteDataTireDrive != "" || this.modelsList[j].autoCompleteDataTireDrive != null)) {
                    this.modelsList[j].driveBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
                  }
                }
              }
            } else {
              this.modelsList[item].autoCompleteDataTireDrive = null;
              this.modelsList[item].driveBaseRollingResistance = null;
            }
          } else {
            this.modelsList[item].autoCompleteDataTireDrive = null;
            this.modelsList[item].autoCompleteDataSizeDrive = null;
            this.modelsList[item].driveBaseRollingResistance = null;
          }
          document.getElementById(this.titles[item] + "driveBrand").style.border = this.modelsList[item].autoCompleteDataDriveBrand ? 'white' : '2px solid red';
          break;
        case 2:
          this.modelsList[item].autoCompleteDataNondrivenBrand = data;
          this.modelsList[item].autoCompleteDataTireNondriven = "";
          // document.getElementById(this.titles[item] + "nondrivenBrand").style.border = this.modelsList[item].autoCompleteDataNondrivenBrand ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "nondriven.png";

          if (this.treadSizeMap[data] != null && this.treadSizeMap[data].length > 0) {
            var tempList = [];
            tempList.push(null);
            tempList.concat(this.treadSizeMap[data][0]);
            this.modelsList[item].autoCompleteDataSizeNonDrive = tempList;
            if (this.brandTreadMap[this.treadSizeMap[data][0]] != null && this.brandTreadMap[this.treadSizeMap[data][0]].length > 0) {
              var tempList2 = [];
              tempList2.push(null);
              tempList2.concat(this.brandTreadMap[this.treadSizeMap[data][0]][0]);
              this.modelsList[item].autoCompleteDataTireNondriven = tempList2;
              //rolling logic
              if (item != 0) {
                this.modelsList[item].nondrivenBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeNondrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNondrive]) * 100);
              } else {
                for (var j = 0; j < this.items.length; j++) {
                  if ((this.modelsList[j].autoCompleteDataTireNondriven != undefined || this.modelsList[j].autoCompleteDataTireNondriven != "" || this.modelsList[j].autoCompleteDataTireNondriven != null)) {
                    this.modelsList[j].nondrivenBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeNonDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNonDrive]) * 100);
                  }
                }
              }
            } else {
              this.modelsList[item].autoCompleteDataTireNondriven = null;
              this.modelsList[item].nondrivenBaseRollingResistance = null;
            }
          } else {
            this.modelsList[item].autoCompleteDataTireNondriven = null;
            this.modelsList[item].autoCompleteDataSizeNonDrive = null;
            this.modelsList[item].nondrivenBaseRollingResistance = null;
          }
          document.getElementById(this.titles[item] + "nondrivenBrand").style.border = this.modelsList[item].autoCompleteDataNondrivenBrand ? 'white' : '2px solid red';
          break;
        case 3:
          this.modelsList[item].autoCompleteDataTrailerBrand = data;
          this.modelsList[item].autoCompleteDataTireTrailer = "";
          // document.getElementById(this.titles[item] + "trailerBrand").style.border = this.modelsList[item].autoCompleteDataTrailerBrand ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "trailer.png";

          if (this.treadSizeMap[data] != null && this.treadSizeMap[data].length > 0) {
            var tempList = [];
            tempList.push(null);
            tempList.concat(this.treadSizeMap[data][0]);
            this.modelsList[item].autoCompleteDataSizeTrailer = tempList;
            if (this.brandTreadMap[this.treadSizeMap[data][0]] != null && this.brandTreadMap[this.treadSizeMap[data][0]].length > 0) {
              var tempList2 = [];
              tempList2.push(null);
              tempList2.concat(this.brandTreadMap[this.treadSizeMap[data][0]][0]);
              this.modelsList[item].autoCompleteDataTireTrailer = tempList2;
              //rolling logic
              if (item != 0) {

                //
                this.modelsList[item].trailerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
              } else {
                for (var j = 0; j < this.items.length; j++) {
                  if ((this.modelsList[j].autoCompleteDataTireTrailer != undefined || this.modelsList[j].autoCompleteDataTireTrailer != "" || this.modelsList[j].autoCompleteDataTireTrailer != null)) {
                    this.modelsList[j].trailerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
                  }
                }
              }
            } else {
              this.modelsList[item].autoCompleteDataSizeTrailer = null;
              this.modelsList[item].trailerBaseRollingResistance = null;
            }
          } else {
            this.modelsList[item].autoCompleteDataTireTrailer = null;
            this.modelsList[item].autoCompleteDataSizeTrailer = null;
            this.modelsList[item].trailerBaseRollingResistance = null;
          }
          document.getElementById(this.titles[item] + "trailerBrand").style.border = this.modelsList[item].autoCompleteDataTrailerBrand ? 'white' : '2px solid red';
          break;
        //CG4
        case 4:
          this.modelsList[item].autoCompleteDataTireSteer = data;
          // document.getElementById(this.titles[item] + "steerTire").style.border = this.modelsList[item].autoCompleteDataTireSteer ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "steer.png";
          //set size
          var tempList = [];
          tempList.push(null);
          tempList.concat(this.treadSizeMap[data]);
          //51 Commented            
          // this.modelsList[item].autoCompleteDataSizeSteer = tempList;
          //set rolling resistence
          // if (item != 0) {
          //   this.modelsList[item].steerBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[item].autoCompleteDataTireSteer] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireSteer]) * 100);
          // } else {
          //   for (var j = 0; j < this.items.length; j++) {
          //     if (j > 0 && (this.modelsList[j].autoCompleteDataTireSteer != undefined || this.modelsList[j].autoCompleteDataTireSteer != "" || this.modelsList[j].autoCompleteDataTireSteer != null)) {
          //       this.modelsList[j].steerBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[j].autoCompleteDataTireSteer] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireSteer]) * 100);
          //     }
          //   }
          // }

          //MAPING....

          if (item != 0) {
            // this.modelsList[item].steerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]) * 100);
            var rrValueproposed = this.BrandRes.filter(brand => ((brand.size == this.modelsList[item].autoCompleteDataSizeSteer) && (brand.mfg == this.modelsList[item].autoCompleteDataSteerBrand) && (brand.tread == this.modelsList[item].autoCompleteDataTireSteer)));
            var rrValueCurrent = this.BrandRes.filter(brand => ((brand.size == this.modelsList[0].autoCompleteDataSizeSteer) && (brand.mfg == this.modelsList[0].autoCompleteDataSteerBrand) && (brand.tread == this.modelsList[0].autoCompleteDataTireSteer)));
            if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
              this.tireSelected = "true";
              this.modelsList[item].steerBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
            } else {
              this.modelsList[item].steerBaseRollingResistance = "";
            }
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireSteer != undefined || this.modelsList[j].autoCompleteDataTireSteer != "" || this.modelsList[j].autoCompleteDataTireSteer != null)) {
                let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[j].autoCompleteDataSizeSteer && brand.mfg == this.modelsList[j].autoCompleteDataSteerBrand && brand.tread == this.modelsList[j].autoCompleteDataTireSteer));
                let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeSteer && brand.mfg == this.modelsList[0].autoCompleteDataSteerBrand && brand.tread == this.modelsList[0].autoCompleteDataTireSteer));
                if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
                  this.tireSelected = "true";
                  this.modelsList[j].steerBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
                } else {
                  this.modelsList[j].steerBaseRollingResistance = "";
                }
                console.log("Current", rrValueproposed, rrValueproposed, numDriveWheel, numNontrailerWheel)
              }
            }
          }
          document.getElementById(this.titles[item] + "steerTire").style.border = this.modelsList[item].autoCompleteDataTireSteer ? 'white' : '2px solid red';
          break;
        case 5:
          this.modelsList[item].autoCompleteDataTireDrive = data;
          // document.getElementById(this.titles[item] + "driveTire").style.border = this.modelsList[item].autoCompleteDataTireDrive ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "drive.png";
          var tempList = [];
          tempList.push(null);
          tempList.concat(this.treadSizeMap[data]);
          ////51 Commented           
          //this.modelsList[item].autoCompleteDataSizeDrive = tempList;
          // if (item != 0) {
          //   this.modelsList[item].driveBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[item].autoCompleteDataTireDrive] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireDrive]) * 100);
          // } else {
          //   for (var j = 0; j < this.items.length; j++) {
          //     if (j > 0 && (this.modelsList[j].autoCompleteDataTireDrive != undefined || this.modelsList[j].autoCompleteDataTireDrive != "" || this.modelsList[j].autoCompleteDataTireDrive != null)) {
          //       this.modelsList[j].driveBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[j].autoCompleteDataTireDrive] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireDrive]) * 100);

          //     }
          //   }
          // }
          //rolling logic
          if (item != 0) {
            //  this.modelsList[item].driveBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
            let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[item].autoCompleteDataSizeDrive && brand.mfg == this.modelsList[item].autoCompleteDataDriveBrand && brand.tread == this.modelsList[item].autoCompleteDataTireDrive));
            let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeDrive && brand.mfg == this.modelsList[0].autoCompleteDataDriveBrand && brand.tread == this.modelsList[0].autoCompleteDataTireDrive));
            if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
              this.tireSelected = "true";
              this.modelsList[item].driveBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
            } else {
              this.modelsList[item].driveBaseRollingResistance = "";
            }
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireDrive != undefined || this.modelsList[j].autoCompleteDataTireDrive != "" || this.modelsList[j].autoCompleteDataTireDrive != null)) {
                // this.modelsList[j].driveBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
                let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[j].autoCompleteDataSizeDrive && brand.mfg == this.modelsList[j].autoCompleteDataDriveBrand && brand.tread == this.modelsList[j].autoCompleteDataTireDrive));
                let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeDrive && brand.mfg == this.modelsList[0].autoCompleteDataDriveBrand && brand.tread == this.modelsList[0].autoCompleteDataTireDrive));
                if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
                  this.tireSelected = "true";
                  this.modelsList[j].driveBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
                } else {
                  this.modelsList[j].driveBaseRollingResistance = "";
                }
              }
            }
          }
          document.getElementById(this.titles[item] + "driveTire").style.border = this.modelsList[item].autoCompleteDataTireDrive ? 'white' : '2px solid red';
          break;
        case 6:
          this.modelsList[item].autoCompleteDataTireNondriven = data;
          // document.getElementById(this.titles[item] + "nondrivenTire").style.border = this.modelsList[item].autoCompleteDataTireNondriven ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "nondriven.png";
          var tempList = [];
          tempList.push(null);
          tempList.concat(this.treadSizeMap[data]);
          //51 Commented               
          // this.modelsList[item].autoCompleteDataSizeNondrive = tempList;

          // if (item != 0) {
          //   this.modelsList[item].nondrivenBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[item].autoCompleteDataTireNondriven] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireNondriven]) * 100);

          // } else {


          //   for (var j = 0; j < this.items.length; j++) {


          //     if (j > 0 && (this.modelsList[j].autoCompleteDataTireNondriven != undefined || this.modelsList[j].autoCompleteDataTireNondriven != "" || this.modelsList[j].autoCompleteDataTireNondriven != null)) {

          //       this.modelsList[j].nondrivenBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[j].autoCompleteDataTireNondriven] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireNondriven]) * 100);


          //     }
          //   }

          // }
          //rolling logic
          if (item != 0) {
            // this.modelsList[item].nondrivenBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeNondrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNondrive]) * 100);
            let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[item].autoCompleteDataSizeNonDrive && brand.mfg == this.modelsList[item].autoCompleteDataNondrivenBrand && brand.tread == this.modelsList[item].autoCompleteDataTireNondriven));
            let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeNonDrive && brand.mfg == this.modelsList[0].autoCompleteDataNondrivenBrand && brand.tread == this.modelsList[0].autoCompleteDataTireNondriven));
            if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
              this.tireSelected = "true";
              this.modelsList[item].nondrivenBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
            } else {
              this.modelsList[item].nondrivenBaseRollingResistance = "";
            }
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireNondriven != undefined || this.modelsList[j].autoCompleteDataTireNondriven != "" || this.modelsList[j].autoCompleteDataTireNondriven != null)) {
                //  this.modelsList[j].nondrivenBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeNonDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNonDrive]) * 100);
                let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[j].autoCompleteDataSizeNonDrive && brand.mfg == this.modelsList[j].autoCompleteDataNondrivenBrand && brand.tread == this.modelsList[j].autoCompleteDataTireNondriven));
                let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeNonDrive && brand.mfg == this.modelsList[0].autoCompleteDataNondrivenBrand && brand.tread == this.modelsList[0].autoCompleteDataTireNondriven));
                if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
                  this.tireSelected = "true";
                  this.modelsList[j].nondrivenBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
                } else {
                  this.modelsList[j].nondrivenBaseRollingResistance = "";
                }
              }
            }
          }
          document.getElementById(this.titles[item] + "nondrivenTire").style.border = this.modelsList[item].autoCompleteDataTireNondriven ? 'white' : '2px solid red';
          break;
        case 7:
          this.modelsList[item].autoCompleteDataTireTrailer = data;
          // document.getElementById(this.titles[item] + "trailerTire").style.border = this.modelsList[item].autoCompleteDataTireTrailer ? 'white' : '2px solid red';
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "trailer.png";
          var tempList = [];
          tempList.push(null);
          tempList.concat(this.treadSizeMap[data]);
          //51 Commented              
          //this.modelsList[item].autoCompleteDataSizeTrailer = tempList;
          // if (item != 0) {
          //   this.modelsList[item].trailerBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[item].autoCompleteDataTireTrailer] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireTrailer]) * 100);

          // } else {

          //   for (var j = 0; j < this.items.length; j++) {

          //     if (j > 0 && (this.modelsList[j].autoCompleteDataTireTrailer != undefined || this.modelsList[j].autoCompleteDataTireTrailer != "" || this.modelsList[j].autoCompleteDataTireTrailer != null)) {

          //       this.modelsList[j].trailerBaseRollingResistance = Math.round((this.treadRRMap[this.modelsList[j].autoCompleteDataTireTrailer] / this.treadRRMap[this.modelsList[0].autoCompleteDataTireTrailer]) * 100);

          //     }

          //   }
          //rolling logic
          if (item != 0) {
            //this.modelsList[item].trailerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
            let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[item].autoCompleteDataSizeTrailer && brand.mfg == this.modelsList[item].autoCompleteDataTrailerBrand && brand.tread == this.modelsList[item].autoCompleteDataTireTrailer));
            let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeTrailer && brand.mfg == this.modelsList[0].autoCompleteDataTrailerBrand && brand.tread == this.modelsList[0].autoCompleteDataTireTrailer));
            if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
              this.tireSelected = "true";
              this.modelsList[item].trailerBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
            } else {
              this.modelsList[item].trailerBaseRollingResistance = "";
            }
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireTrailer != undefined || this.modelsList[j].autoCompleteDataTireTrailer != "" || this.modelsList[j].autoCompleteDataTireTrailer != null)) {
                //  this.modelsList[j].trailerBaseRollingResistance = Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
                let rrValueproposed = this.BrandRes.filter(brand => (brand.size == this.modelsList[j].autoCompleteDataSizeTrailer && brand.mfg == this.modelsList[j].autoCompleteDataTrailerBrand && brand.tread == this.modelsList[j].autoCompleteDataTireTrailer));
                let rrValueCurrent = this.BrandRes.filter(brand => (brand.size == this.modelsList[0].autoCompleteDataSizeTrailer && brand.mfg == this.modelsList[0].autoCompleteDataTrailerBrand && brand.tread == this.modelsList[0].autoCompleteDataTireTrailer));
                if (rrValueproposed.length != 0 && rrValueCurrent.length != 0) {
                  this.tireSelected = "true";
                  this.modelsList[j].trailerBaseRollingResistance = (parseFloat(rrValueproposed[0].rr) / parseFloat(rrValueCurrent[0].rr) * 100);
                } else {
                  this.modelsList[j].trailerBaseRollingResistance = "";
                }
              }
            }
          }

          document.getElementById(this.titles[item] + "trailerTire").style.border = this.modelsList[item].autoCompleteDataTireTrailer ? 'white' : '2px solid red';

          break;

        case 8:
          this.modelsList[item].autoCompleteDataSizeSteer = data;
          this.modelsList[item].autoCompleteDataTireSteer = "";
          // let resultValues = this.BrandRes.filter(brand => (brand.size == this.modelsList[item].autoCompleteDataSizeSteer && brand.mfg == this.modelsList[item].autoCompleteDataSteerBrand)).map(officer => officer.rr[0]);
          let resultValues = this.BrandRes.filter(brand => (brand.size == this.modelsList[item].autoCompleteDataSizeSteer && brand.mfg == this.modelsList[item].autoCompleteDataSteerBrand));
          const officersIds = resultValues.map(officer => officer.rr);
          console.log("after divide", this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]);
          console.log("after roudning", (this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]) * 100);
          if (item != 0) {
            this.modelsList[item].steerBaseRollingResistance = ""; //Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]) * 100);
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireSteer != undefined || this.modelsList[j].autoCompleteDataTireSteer != "" || this.modelsList[j].autoCompleteDataTireSteer != null)) {
                this.modelsList[j].steerBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeSteer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeSteer]) * 100);
              }
            }
          }
          //  document.getElementById(this.titles[item] + "steerSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeSteer ? 'white' : '2px solid red';
          var tempPassedInValuedrive: any;
          if (this.treadSizeMap[this.modelsList[item].autoCompleteDataDriveBrand] == null) {
            tempPassedInValuedrive = [];
          } else {
            tempPassedInValuedrive = this.treadSizeMap[this.modelsList[item].autoCompleteDataDriveBrand];
          }
          //var tempPassedInValuedrive = this.treadSizeMap[this.modelsList[item].autoCompleteDataDriveBrand];
          if (tempPassedInValuedrive.indexOf(data) > -1) {
            this.modelsList[item].autoCompleteDataSizeDrive = data;
            this.modelsList[item].autoCompleteDataTireDrive = "";
            if (item != 0) {
              this.modelsList[item].driveBaseRollingResistance = ""; //Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
            } else {
              for (var j = 0; j < this.items.length; j++) {
                if ((this.modelsList[j].autoCompleteDataTireDrive != undefined || this.modelsList[j].autoCompleteDataTireDrive != "" || this.modelsList[j].autoCompleteDataTireDrive != null)) {
                  this.modelsList[j].driveBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
                }
              }
            }
            //  document.getElementById(this.titles[item] + "driveSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeDrive ? 'white' : '2px solid red';
          }

          if (this.nondrivenShow) {
            var tempPassedInValuenondriven: any;
            if (this.treadSizeMap[this.modelsList[item].autoCompleteDataNondrivenBrand] == null) {
              tempPassedInValuenondriven = [];
            } else {
              tempPassedInValuenondriven = this.treadSizeMap[this.modelsList[item].autoCompleteDataNondrivenBrand];
            }
            if (tempPassedInValuenondriven.indexOf(data) > -1) {
              this.modelsList[item].autoCompleteDataSizeNonDrive = data;
              this.modelsList[item].autoCompleteDataTireNondriven = "";
              if (item != 0) {
                this.modelsList[item].nondrivenBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeNondrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNondrive]) * 100);
              } else {
                for (var j = 0; j < this.items.length; j++) {
                  if ((this.modelsList[j].autoCompleteDataTireNondriven != undefined || this.modelsList[j].autoCompleteDataTireNondriven != "" || this.modelsList[j].autoCompleteDataTireNondriven != null)) {
                    this.modelsList[j].nondrivenBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeNonDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNonDrive]) * 100);
                  }
                }
              }
              //  document.getElementById(this.titles[item] + "nondrivenSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeNonDrive ? 'white' : '2px solid red';
            }
          }

          if (this.trailerShow) {
            var tempPassedInValuetrailer: any;
            if (this.treadSizeMap[this.modelsList[item].autoCompleteDataTrailerBrand] == null) {
              tempPassedInValuetrailer = [];
            } else {
              tempPassedInValuetrailer = this.treadSizeMap[this.modelsList[item].autoCompleteDataTrailerBrand];
            }
            if (tempPassedInValuetrailer.indexOf(data) > -1) {
              this.modelsList[item].autoCompleteDataSizeTrailer = data;
              this.modelsList[item].autoCompleteDataTireTrailer = "";

              if (item != 0) {
                this.modelsList[item].trailerBaseRollingResistance = "";// Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
              } else {
                for (var j = 0; j < this.items.length; j++) {
                  if ((this.modelsList[j].autoCompleteDataTireTrailer != undefined || this.modelsList[j].autoCompleteDataTireTrailer != "" || this.modelsList[j].autoCompleteDataTireTrailer != null)) {
                    this.modelsList[j].trailerBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
                  }
                }
              }
              //  document.getElementById(this.titles[item] + "trailerSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeTrailer ? 'white' : '2px solid red';

            }
          }
          //  document.getElementById(this.titles[item] + "steerSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeSteer ? 'white' : '2px solid red';

          break;

        case 9:
          this.modelsList[item].autoCompleteDataSizeDrive = data;
          this.modelsList[item].autoCompleteDataTireDrive = "";
          if (item != 0) {
            this.modelsList[item].driveBaseRollingResistance = ""; //Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireDrive != undefined || this.modelsList[j].autoCompleteDataTireDrive != "" || this.modelsList[j].autoCompleteDataTireDrive != null)) {
                this.modelsList[j].driveBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeDrive]) * 100);
              }
            }
          }
          document.getElementById(this.titles[item] + "driveSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeDrive ? 'white' : '2px solid red';
          break;

        case 10:
          this.modelsList[item].autoCompleteDataSizeNonDrive = data;
          this.modelsList[item].autoCompleteDataTireNondriven = "";
          if (item != 0) {
            this.modelsList[item].nondrivenBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeNondrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNondrive]) * 100);
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireNondriven != undefined || this.modelsList[j].autoCompleteDataTireNondriven != "" || this.modelsList[j].autoCompleteDataTireNondriven != null)) {
                this.modelsList[j].nondrivenBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeNonDrive] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeNonDrive]) * 100);
              }
            }
          }
          document.getElementById(this.titles[item] + "nondrivenSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeNonDrive ? 'white' : '2px solid red';
          break;

        case 11:
          this.modelsList[item].autoCompleteDataSizeTrailer = data;
          this.modelsList[item].autoCompleteDataTireTrailer = "";

          if (item != 0) {
            this.modelsList[item].trailerBaseRollingResistance = "";// Math.round((this.sizeRRMap[this.modelsList[item].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
          } else {
            for (var j = 0; j < this.items.length; j++) {
              if ((this.modelsList[j].autoCompleteDataTireTrailer != undefined || this.modelsList[j].autoCompleteDataTireTrailer != "" || this.modelsList[j].autoCompleteDataTireTrailer != null)) {
                this.modelsList[j].trailerBaseRollingResistance = "";//Math.round((this.sizeRRMap[this.modelsList[j].autoCompleteDataSizeTrailer] / this.sizeRRMap[this.modelsList[0].autoCompleteDataSizeTrailer]) * 100);
              }
            }
          }
          // document.getElementById(this.titles[item] + "nondrivenSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeNonDrive ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "trailerSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeTrailer ? 'white' : '2px solid red';
          //  document.getElementById(this.titles[item] + "driveSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeDrive ? 'white' : '2px solid red';
          break;
      }


      if (this.tireSelected != "") {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;

            if (this.steercheckboxnew) {
              //this.modelsList[j].totalRollingResistance  += this.modelsList[j].steerBaseRollingResistance * steerCon
              if (this.modelsList[j].steerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].steerBaseRollingResistance * steerCon;
              }
            }
            if (this.drivecheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              if (this.modelsList[j].driveBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              }
            }
            if (this.nondrivenShow && this.nondrivencheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              } else {
                this.modelsList[j].nondrivenBaseRollingResistance = 0;
              }
            }
            if (this.trailerShow && this.trailercheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              if (this.modelsList[j].trailerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              } else {
                this.modelsList[j].totalRollingResistance = 0;
              }
            }

            this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;

          if (this.steercheckboxnew) {
            if (this.modelsList[item].steerBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
            }

          }

          if (this.drivecheckboxnew) {
            if (this.modelsList[item].driveBaseRollingResistance != "") {
              //  this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
            }
          }


          if (this.nondrivenShow && this.nondrivencheckboxnew) {
            if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
              console.log("The Icon NON", nondrivenCon, (numNontrailerWheel / numtotalTire));
              this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
            }
          }

          if (this.trailerShow && this.trailercheckboxnew) {
            if (this.modelsList[item].trailerBaseRollingResistance != "") {
              console.log("The Icon trailer", (trailerCon + trailer2Con + trailer3Con), (numtrailerWheel / numtotalTire));

              // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
            } else {
              // this.modelsList[item].totalRollingResistance = 0;
            }
          }

          this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
        }

      } else {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;
        }
      }

    });
    modal.present();
  }
  steerchecked(event: any, item) {
    if (this.steercheckboxnew != event.checked) {
      this.steercheckboxnew = event.checked;
      var totalnumTire = 0.0;
      if (this.steercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("steerNum"));
      }
      if (this.drivecheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("driveNum"));
      }

      if (this.nondrivencheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("nondrivenNum"));
      }
      if (this.trailercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("trailerNum"));
      }

      var steerCon = (parseFloat(localStorage.getItem("steerNum")) / totalnumTire);
      var driveCon = (parseFloat(localStorage.getItem("driveNum")) / totalnumTire);//parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = (parseFloat(localStorage.getItem("nondrivenNum")) / totalnumTire);//parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = (parseFloat(localStorage.getItem("trailerNum")) / totalnumTire);//parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));

      // if (item == 0) {
      //   for (var j = 1; j < this.items.length; j++) {
      //     //this.modelsList[j].totalRollingResistance = 0;

      //       if (this.steercheckboxnew) {
      //         //this.modelsList[j].totalRollingResistance  += this.modelsList[j].steerBaseRollingResistance * steerCon
      //         if (this.modelsList[j].steerBaseRollingResistance != "") {
      //           this.modelsList[j].totalRollingResistance += this.modelsList[j].steerBaseRollingResistance * steerCon;
      //         }
      //       }else{
      //         if (this.modelsList[j].steerBaseRollingResistance != "") {
      //           this.modelsList[j].totalRollingResistance -= this.modelsList[j].steerBaseRollingResistance * steerCon;
      //         }
      //       }

      //     this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
      //   }
      // } else {
      //   //this.modelsList[item].totalRollingResistance = 0;

      //     if (this.steercheckboxnew) {
      //       // this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
      //       if (this.modelsList[item].steerBaseRollingResistance != ''){
      //       this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
      //       }

      //     }else{
      //       if (this.modelsList[item].steerBaseRollingResistance != ''){
      //       this.modelsList[item].totalRollingResistance -= this.modelsList[item].steerBaseRollingResistance * steerCon;
      //       }
      //     }

      //   this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
      // }
      for (var j = 1; j < this.items.length; j++) {
        if (this.modelsList[j].steerBaseRollingResistance != "" || this.modelsList[j].driveBaseRollingResistance != "" || this.modelsList[j].nondrivenBaseRollingResistance != "" || this.modelsList[j].trailerBaseRollingResistance != "") {
          this.tireSelected = "true";
        }
      }
      if (this.tireSelected != "") {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;

            if (this.steercheckboxnew) {
              //this.modelsList[j].totalRollingResistance  += this.modelsList[j].steerBaseRollingResistance * steerCon
              if (this.modelsList[j].steerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].steerBaseRollingResistance * steerCon;
              }
            }
            if (this.drivecheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              if (this.modelsList[j].driveBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              }
            }
            if (this.nondrivenShow && this.nondrivencheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              } else {
                this.modelsList[j].nondrivenBaseRollingResistance = 0;
              }
            }
            if (this.trailerShow && this.trailercheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              if (this.modelsList[j].trailerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              } else {
                this.modelsList[j].totalRollingResistance = 0;
              }
            }

            this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;

          if (this.steercheckboxnew) {
            if (this.modelsList[item].steerBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
            }

          }

          if (this.drivecheckboxnew) {
            if (this.modelsList[item].driveBaseRollingResistance != "") {
              //  this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
            }
          }


          if (this.nondrivenShow && this.nondrivencheckboxnew) {
            if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;

              this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
            }
          }

          if (this.trailerShow && this.trailercheckboxnew) {
            if (this.modelsList[item].trailerBaseRollingResistance != "") {


              // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
            } else {
              this.modelsList[item].totalRollingResistance = 0;
            }
          }

          this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
        }

      } else {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;
        }
      }
    }
  }
  drivechecked(event: any, item) {
    if (this.drivecheckboxnew != event.checked) {
      this.drivecheckboxnew = event.checked;
      var totalnumTire = 0.0;
      if (this.steercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("steerNum"));
      }
      if (this.drivecheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("driveNum"));
      }

      if (this.nondrivencheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("nondrivenNum"));
      }
      if (this.trailercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("trailerNum"));
      }

      var steerCon = (parseFloat(localStorage.getItem("steerNum")) / totalnumTire);
      var driveCon = (parseFloat(localStorage.getItem("driveNum")) / totalnumTire);//parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = (parseFloat(localStorage.getItem("nondrivenNum")) / totalnumTire);//parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = (parseFloat(localStorage.getItem("trailerNum")) / totalnumTire);//parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));


      // if (item == 0) {
      //   for (var j = 1; j < this.items.length; j++) {
      //     //this.modelsList[j].totalRollingResistance = 0;

      //       if (this.drivecheckboxnew) {
      //         // this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
      //         if (this.modelsList[j].driveBaseRollingResistance != ''){
      //         this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
      //         }
      //       }else
      //       {
      //         if (this.modelsList[j].driveBaseRollingResistance != ''){
      //           this.modelsList[j].totalRollingResistance -= this.modelsList[j].driveBaseRollingResistance * driveCon;
      //           }
      //       }

      //     this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
      //   }
      // } else {
      //   //this.modelsList[item].totalRollingResistance = 0;


      //     // console.log(this.modelsList[item].steerBaseRollingResistance);
      //     if (this.drivecheckboxnew) {
      //       //  this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
      //       if (this.modelsList[item].driveBaseRollingResistance != ''){
      //       this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
      //       }
      //     }else {
      //       if (this.modelsList[item].driveBaseRollingResistance != ''){
      //         this.modelsList[item].totalRollingResistance -= this.modelsList[item].driveBaseRollingResistance * driveCon;
      //         }

      //     }

      //   this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
      // }
      for (var j = 1; j < this.items.length; j++) {
        if (this.modelsList[j].steerBaseRollingResistance != "" || this.modelsList[j].driveBaseRollingResistance != "" || this.modelsList[j].nondrivenBaseRollingResistance != "" || this.modelsList[j].trailerBaseRollingResistance != "") {
          this.tireSelected = "true";
        }
      }
      if (this.tireSelected != "") {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;

            if (this.steercheckboxnew) {
              //this.modelsList[j].totalRollingResistance  += this.modelsList[j].steerBaseRollingResistance * steerCon
              if (this.modelsList[j].steerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].steerBaseRollingResistance * steerCon;
              }
            }
            if (this.drivecheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              if (this.modelsList[j].driveBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              }
            }
            if (this.nondrivenShow && this.nondrivencheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              } else {
                this.modelsList[j].nondrivenBaseRollingResistance = 0;
              }
            }
            if (this.trailerShow && this.trailercheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              if (this.modelsList[j].trailerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              } else {
                this.modelsList[j].totalRollingResistance = 0;
              }
            }

            this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;

          if (this.steercheckboxnew) {
            if (this.modelsList[item].steerBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
            }

          }

          if (this.drivecheckboxnew) {
            if (this.modelsList[item].driveBaseRollingResistance != "") {
              //  this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
            }
          }


          if (this.nondrivenShow && this.nondrivencheckboxnew) {
            if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;

              this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
            }
          }

          if (this.trailerShow && this.trailercheckboxnew) {
            if (this.modelsList[item].trailerBaseRollingResistance != "") {


              // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
            } else {
              this.modelsList[item].totalRollingResistance = 0;
            }
          }

          this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
        }

      } else {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;
        }
      }
    }
  }
  nondrivenchecked(event: any, item) {
    if (this.nondrivencheckboxnew != event.checked) {
      this.nondrivencheckboxnew = event.checked;
      var totalnumTire = 0.0;
      if (this.steercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("steerNum"));
      }
      if (this.drivecheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("driveNum"));
      }

      if (this.nondrivencheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("nondrivenNum"));
      }
      if (this.trailercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("trailerNum"));
      }

      var steerCon = (parseFloat(localStorage.getItem("steerNum")) / totalnumTire);
      var driveCon = (parseFloat(localStorage.getItem("driveNum")) / totalnumTire);//parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = (parseFloat(localStorage.getItem("nondrivenNum")) / totalnumTire);//parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = (parseFloat(localStorage.getItem("trailerNum")) / totalnumTire);//parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));

      // if (item == 0) {
      //   for (var j = 1; j < this.items.length; j++) {
      //     //this.modelsList[j].totalRollingResistance = 0;


      //       if (this.nondrivenShow && this.nondrivencheckboxnew) {
      //         // this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
      //         if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
      //           this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
      //         } 
      //       }else {
      //         if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
      //           this.modelsList[j].totalRollingResistance -= this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
      //         }

      //       }

      //     this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
      //   }
      // } else {
      //   //this.modelsList[item].totalRollingResistance = 0;


      //     // console.log(this.modelsList[item].steerBaseRollingResistance);


      //     if (this.nondrivenShow && this.nondrivencheckboxnew) {
      //       if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
      //         // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
      //         this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
      //       } 
      //     }else {
      //       if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
      //         // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
      //         this.modelsList[item].totalRollingResistance -= this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
      //       } 
      //     }


      //   this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
      // }
      for (var j = 1; j < this.items.length; j++) {
        if (this.modelsList[j].steerBaseRollingResistance != "" || this.modelsList[j].driveBaseRollingResistance != "" || this.modelsList[j].nondrivenBaseRollingResistance != "" || this.modelsList[j].trailerBaseRollingResistance != "") {
          this.tireSelected = "true";
        }
      }
      if (this.tireSelected != "") {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;

            if (this.steercheckboxnew) {
              //this.modelsList[j].totalRollingResistance  += this.modelsList[j].steerBaseRollingResistance * steerCon
              if (this.modelsList[j].steerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].steerBaseRollingResistance * steerCon;
              }
            }
            if (this.drivecheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              if (this.modelsList[j].driveBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              }
            }
            if (this.nondrivenShow && this.nondrivencheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              } else {
                this.modelsList[j].nondrivenBaseRollingResistance = 0;
              }
            }
            if (this.trailerShow && this.trailercheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              if (this.modelsList[j].trailerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              } else {
                this.modelsList[j].totalRollingResistance = 0;
              }
            }

            this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;

          if (this.steercheckboxnew) {
            if (this.modelsList[item].steerBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
            }

          }

          if (this.drivecheckboxnew) {
            if (this.modelsList[item].driveBaseRollingResistance != "") {
              //  this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
            }
          }


          if (this.nondrivenShow && this.nondrivencheckboxnew) {
            if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;

              this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
            }
          }

          if (this.trailerShow && this.trailercheckboxnew) {
            if (this.modelsList[item].trailerBaseRollingResistance != "") {


              // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
            } else {
              this.modelsList[item].totalRollingResistance = 0;
            }
          }

          this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
        }

      } else {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;
        }
      }
    }
  }
  trailerchecked(event: any, item) {
    if (this.trailercheckboxnew != event.checked) {
      this.trailercheckboxnew = event.checked;
      var totalnumTire = 0.0;
      if (this.steercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("steerNum"));
      }
      if (this.drivecheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("driveNum"));
      }

      if (this.nondrivencheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("nondrivenNum"));
      }
      if (this.trailercheckboxnew) {
        totalnumTire += parseFloat(localStorage.getItem("trailerNum"));
      }
      var steerCon = (parseFloat(localStorage.getItem("steerNum")) / totalnumTire);
      var driveCon = (parseFloat(localStorage.getItem("driveNum")) / totalnumTire);//parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = (parseFloat(localStorage.getItem("nondrivenNum")) / totalnumTire);//parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = (parseFloat(localStorage.getItem("trailerNum")) / totalnumTire);//parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));

      // if (item == 0) {
      //   for (var j = 1; j < this.items.length; j++) {
      //     //this.modelsList[j].totalRollingResistance = 0;

      //       if (this.trailerShow && this.trailercheckboxnew) {
      //         // this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //         if (this.modelsList[j].trailerBaseRollingResistance != "") {
      //           this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //         } 
      //       }else
      //       {
      //         if (this.modelsList[j].trailerBaseRollingResistance != "") {
      //           this.modelsList[j].totalRollingResistance -= this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //         } 
      //       }

      //     this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
      //   }
      // } else {
      //   //this.modelsList[item].totalRollingResistance = 0;
      //  ;


      //     if (this.trailerShow && this.trailercheckboxnew) {
      //       if (this.modelsList[item].trailerBaseRollingResistance != "") {


      //         // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //         this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //       } 
      //     }else{
      //       if (this.modelsList[item].trailerBaseRollingResistance != "") {


      //         // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //         this.modelsList[item].totalRollingResistance -= this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
      //       } 
      //     }



      //   this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
      // }
      for (var j = 1; j < this.items.length; j++) {
        if (this.modelsList[j].steerBaseRollingResistance != "" || this.modelsList[j].driveBaseRollingResistance != "" || this.modelsList[j].nondrivenBaseRollingResistance != "" || this.modelsList[j].trailerBaseRollingResistance != "") {
          this.tireSelected = "true";
        }
      }

      if (this.tireSelected != "") {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;

            if (this.steercheckboxnew) {
              //this.modelsList[j].totalRollingResistance  += this.modelsList[j].steerBaseRollingResistance * steerCon
              if (this.modelsList[j].steerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].steerBaseRollingResistance * steerCon;
              }
            }
            if (this.drivecheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              if (this.modelsList[j].driveBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].driveBaseRollingResistance * driveCon;
              }
            }
            if (this.nondrivenShow && this.nondrivencheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              if (this.modelsList[j].nondrivenBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].nondrivenBaseRollingResistance * nondrivenCon;
              } else {
                this.modelsList[j].nondrivenBaseRollingResistance = 0;
              }
            }
            if (this.trailerShow && this.trailercheckboxnew) {
              // this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              if (this.modelsList[j].trailerBaseRollingResistance != "") {
                this.modelsList[j].totalRollingResistance += this.modelsList[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              } else {
                this.modelsList[j].totalRollingResistance = 0;
              }
            }

            this.modelsList[j].totalRollingResistance = Math.round(this.modelsList[j].totalRollingResistance * this.RRTotalCoefficient);
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;

          if (this.steercheckboxnew) {
            if (this.modelsList[item].steerBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].steerBaseRollingResistance * steerCon;
            }

          }

          if (this.drivecheckboxnew) {
            if (this.modelsList[item].driveBaseRollingResistance != "") {
              //  this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
              this.modelsList[item].totalRollingResistance += this.modelsList[item].driveBaseRollingResistance * driveCon;
            }
          }


          if (this.nondrivenShow && this.nondrivencheckboxnew) {
            if (this.modelsList[item].nondrivenBaseRollingResistance != "") {
              // this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;

              this.modelsList[item].totalRollingResistance += this.modelsList[item].nondrivenBaseRollingResistance * nondrivenCon;
            }
          }

          if (this.trailerShow && this.trailercheckboxnew) {
            if (this.modelsList[item].trailerBaseRollingResistance != "") {


              // this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
              this.modelsList[item].totalRollingResistance += this.modelsList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
            } else {
              this.modelsList[item].totalRollingResistance = 0;
            }
          }

          this.modelsList[item].totalRollingResistance = Math.round(this.modelsList[item].totalRollingResistance * this.RRTotalCoefficient);
        }

      } else {
        if (item == 0) {
          for (var j = 1; j < this.items.length; j++) {
            this.modelsList[j].totalRollingResistance = 0;
          }
        } else {
          this.modelsList[item].totalRollingResistance = 0;
        }
      }
    }
  }
  ionViewDidLoad() {
    if (localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined) {
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }
    if (localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined) {
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true : false;
    }

    this.navBar.backButtonClick = (e: UIEvent) => {


      this.saveInfo();
      this.navCtrl.parent.viewCtrl.dismiss();


    };

    sessionStorage.removeItem('firstLife');
    sessionStorage.removeItem('fleetDetails');
    sessionStorage.removeItem('secondLife');
    sessionStorage.removeItem('tableresult');

    localStorage.removeItem('drive1');
    localStorage.removeItem('drive2');
    localStorage.removeItem('drive3');
    localStorage.removeItem('drive4');
    localStorage.removeItem('drive5');

    localStorage.removeItem('image6');
    localStorage.removeItem('image7');

    localStorage.removeItem('steer1');
    localStorage.removeItem('steer2');
    localStorage.removeItem('steer3');
    localStorage.removeItem('steer4');
    localStorage.removeItem('steer5');

    localStorage.removeItem('trailer1');
    localStorage.removeItem('trailer2');
    localStorage.removeItem('trailer3');
    localStorage.removeItem('trailer4');
    localStorage.removeItem('trailer5');

    localStorage.removeItem('nondriven1');
    localStorage.removeItem('nondriven2');
    localStorage.removeItem('nondriven3');
    localStorage.removeItem('nondriven4');
    localStorage.removeItem('nondriven5');



  }


  ionViewWillEnter() {
    // this.storage.set("lastPage", "basicanalysis");
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  // test1($event, name: string){
  //   if (name == "numberOfBreakdownsPerMonth") {
  //     this.modelsList[item].autoCompleteDataSteerBrand = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
  //     this.numberOfProposedBreakdownsPerMonth = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));//numberOfProposedBreakdownsPerMonth
  //   }
  //   if (name == "numberOfProposedBreakdownsPerMonth") {
  //     this.numberOfProposedBreakdownsPerMonth = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));//numberOfProposedBreakdownsPerMonth
  //   }

  // }


  addANewScenario() {

    if (this.modelsList.length >= 3) {
      this.translateService.get(['maximum_scenario_alert', 'dismiss']).subscribe(text => {
        let alert = this.alertCtrl.create({
          subTitle: text['maximum_scenario_alert'],
          buttons: [text['dismiss']]
        });
        alert.present();
      })

      return
    }

    if (!this.checkValidScenario()) {
      this.handleIncompleteScenarioForAddingScenario();
      return;
    }



    var modelListNum = this.modelsList.length;
    var previousNum = this.modelsList.length - 1;
    var key = "proposedTireInfoModel" + modelListNum;
    var newModel = this.proposedScenarioMap[key];
    newModel.copy(this.modelsList[previousNum])
    this.modelsList.push(newModel);
    //this.modelsList[2].totalRollingResistance = 0;
    this.items.push(modelListNum);
    this.translateService.get(['proposed_tire']).subscribe(text => {
      var title = text['proposed_tire'] + modelListNum;
      this.titles.push(title);
    });

    setTimeout(() => {
      document.getElementById(this.titles[modelListNum]).scrollIntoView();
    }, 100);


  }


  onChange($event, name, item) {
    switch (name) {
      case "steerRunoutMiles":
        this.modelsList[item].steerRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "steerRunout").style.border = this.modelsList[item].steerRunoutMiles ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "steer.png";
        break;
      case "driveRunoutMiles":
        this.modelsList[item].driveRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "driveRunout").style.border = this.modelsList[item].driveRunoutMiles ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "drive.png";
        break;
      case "trailerRunoutMiles":
        this.modelsList[item].trailerRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "trailerRunout").style.border = this.modelsList[item].trailerRunoutMiles ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "trailer.png";

        break;
      case "steerTirePrice":
        this.modelsList[item].steerTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "steerTirePrice").style.border = this.modelsList[item].steerTirePrice ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "steer.png";
        break;
      case "driveTirePrice":
        this.modelsList[item].driveTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "driveTirePrice").style.border = this.modelsList[item].driveTirePrice ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "drive.png";

        break;
      case "trailerTirePrice":
        this.modelsList[item].trailerTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "trailerTirePrice").style.border = this.modelsList[item].trailerTirePrice ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "trailer.png";

        break;
      case "nondrivenRunoutMiles":
        this.modelsList[item].nondrivenRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "nondrivenRunout").style.border = this.modelsList[item].nondrivenRunoutMiles ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "nondriven.png";

        break;
      case "nondrivenTirePrice":
        this.modelsList[item].nondrivenTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        document.getElementById(this.titles[item] + "nondrivenTirePrice").style.border = this.modelsList[item].nondrivenTirePrice ? 'white' : '2px solid red';
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-" + "nondriven.png";

        break;
    }
  }


  ngOnDestroy() {

    this.saveInfo();

  }

  saveInfo() {
    // this.storage.set("basicAnalysis", JSON.stringify(this.modelsList));
    localStorage.setItem("treadRRMap", JSON.stringify(this.treadRRMap));
    localStorage.setItem("basicAnalysisList", JSON.stringify(this.modelsList))
    var tempJson = {};
    tempJson["treadRRMap"] = JSON.stringify(this.treadRRMap);
    tempJson["basicAnalysisList"] = JSON.stringify(this.modelsList);
    // 
    localStorage.setItem('steercheckboxnewbasic', this.steercheckboxnew == true ? 'true' : 'false');
    localStorage.setItem('drivecheckboxnewbasic', this.drivecheckboxnew == true ? 'true' : 'false');
    tempJson["steercheckboxnewbasic"] = this.steercheckboxnew == true ? 'true' : 'false';
    tempJson["drivecheckboxnewbasic"] = this.drivecheckboxnew == true ? 'true' : 'false';
    tempJson["SelectedRegionData"] = localStorage.getItem("SelectedRegionData");
    if (this.nondrivenShow) {
      localStorage.setItem('nondrivencheckboxnewbasic', this.nondrivencheckboxnew == true ? 'true' : 'false');
      tempJson["nondrivencheckboxnewbasic"] = this.nondrivencheckboxnew == true ? 'true' : 'false';

    }

    if (this.trailerShow) {
      localStorage.setItem('trailercheckboxnewbasic', this.trailercheckboxnew == true ? 'true' : 'false');
      tempJson["trailercheckboxnewbasic"] = this.trailercheckboxnew == true ? 'true' : 'false';

    }
    // saveContent(tempJson, "InfoDB");

  }



  onCheckboxChange($event, name) {
    // this.saveInfo();
    /*
        switch (name){
          case 'steer':
            for(var item in this.items){
              document.getElementById(this.titles[item]+"steerBrand").style.border =  'white';
              document.getElementById(this.titles[item]+"steerTire").style.border =  'white' ;
              document.getElementById(this.titles[item]+"steerSizeTire").style.border = 'white' ;
    
              if(this.mileage_calculation_toggle) {
                document.getElementById(this.titles[item] + "steerRunout").style.border = 'white';
                document.getElementById(this.titles[item] + "steerTirePrice").style.border = 'white';
              }
    
              if(this.fuel_calculation_toggle) {
               // document.getElementById(this.titles[item] + 'steerRollingResistance').style.background = 'white';
              }
            }
            break;
    
         case 'drive':
            for(var item in this.items){
              document.getElementById(this.titles[item]+"driveBrand").style.border = 'white';
              document.getElementById(this.titles[item]+"driveTire").style.border =  'white';
              document.getElementById(this.titles[item]+"driveSizeTire").style.border = 'white'; 
    
              if(this.mileage_calculation_toggle) {
                document.getElementById(this.titles[item] + "driveRunout").style.border = 'white';
                document.getElementById(this.titles[item] + "driveTirePrice").style.border = 'white';
              }
    
              if(this.fuel_calculation_toggle) {
               // document.getElementById(this.titles[item] + 'driveRollingResistance').style.background = 'white';
              }
            }
    
            break;
    
          case 'nondriven':
            if(this.nondrivenShow){
    
              for (var item in this.items){
    
                document.getElementById(this.titles[item]+"nondrivenBrand").style.border =  'white' ;
                document.getElementById(this.titles[item]+"nondrivenTire").style.border ='white';
                document.getElementById(this.titles[item]+"nondrivenSizeTire").style.border = 'white';
                if(this.mileage_calculation_toggle) {
                  document.getElementById(this.titles[item] + "nondrivenRunout").style.border = 'white';
                  document.getElementById(this.titles[item] + "nondrivenTirePrice").style.border = 'white';
                }
    
                if(this.fuel_calculation_toggle) {
                 // document.getElementById(this.titles[item] + 'nondrivenRollingResistance').style.background = 'white';
                }
    
    
              }
         }
    
            break;
    
          case 'trailer':
            if(this.trailerShow){
    
              for(var item in this.items){
    
                document.getElementById(this.titles[item]+"trailerBrand").style.border =   'white' ;
                document.getElementById(this.titles[item]+"trailerTire").style.border =  'white' ;
                document.getElementById(this.titles[item] + "trailerSizeTire").style.border = 'white'
                if(this.mileage_calculation_toggle) {
                  document.getElementById(this.titles[item] + "trailerRunout").style.border = 'white';
                  document.getElementById(this.titles[item] + "trailerTirePrice").style.border = 'white';
                }
    
                if(this.fuel_calculation_toggle) {
                 // document.getElementById(this.titles[item] + 'trailerRollingResistance').style.background = 'white';
                }
    
              }
    
            }
            break;
        }
        */
  }


  checkValidScenario() {

    for (var item in this.items) {

      if ((this.steercheckboxnew && (this.modelsList[item].autoCompleteDataSteerBrand == "" || this.modelsList[item].autoCompleteDataSteerBrand == undefined || this.modelsList[item].autoCompleteDataTireSteer == "" || this.modelsList[item].autoCompleteDataTireSteer == undefined
        || (this.mileage_calculation_toggle && (this.modelsList[item].steerRunoutMiles == 0 || this.modelsList[item].steerTirePrice == 0))))
        || (this.drivecheckboxnew && (this.modelsList[item].autoCompleteDataDriveBrand == "" || this.modelsList[item].autoCompleteDataDriveBrand == undefined
          || this.modelsList[item].autoCompleteDataTireDrive == "" || this.modelsList[item].autoCompleteDataTireDrive == undefined || (this.mileage_calculation_toggle && (this.modelsList[item].driveRunoutMiles == 0 || this.modelsList[item].driveTirePrice == 0)))) || (this.nondrivencheckboxnew && this.nondrivenShow && (this.modelsList[item].autoCompleteDataNondrivenBrand == "" || this.modelsList[item].autoCompleteDataNondrivenBrand == undefined || this.modelsList[item].autoCompleteDataTireNondriven == "" ||
            this.modelsList[item].autoCompleteDataTireNondriven == undefined ||
            (this.mileage_calculation_toggle && (this.modelsList[item].nondrivenTirePrice == 0 || this.modelsList[item].nondrivenRunoutMiles == 0)))) || (this.trailercheckboxnew && this.trailerShow
              && (this.modelsList[item].autoCompleteDataTireTrailer == "" || this.modelsList[item].autoCompleteDataTireTrailer == undefined || this.modelsList[item].autoCompleteDataTrailerBrand == "" || this.modelsList[item].autoCompleteDataTrailerBrand == undefined || (this.mileage_calculation_toggle && (this.modelsList[item].trailerTirePrice == 0 || this.modelsList[item].trailerRunoutMiles == 0))))) {


        if (this.steercheckboxnew) {

          document.getElementById(this.titles[item] + "steerBrand").style.border = this.modelsList[item].autoCompleteDataSteerBrand ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "steerTire").style.border = this.modelsList[item].autoCompleteDataTireSteer ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "steerSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeSteer ? 'white' : '2px solid red';
          if (this.mileage_calculation_toggle) {
            document.getElementById(this.titles[item] + "steerRunout").style.border = this.modelsList[item].steerRunoutMiles ? 'white' : '2px solid red';
            document.getElementById(this.titles[item] + "steerTirePrice").style.border = this.modelsList[item].steerTirePrice ? 'white' : '2px solid red';
          }

        }


        if (this.drivecheckboxnew) {

          document.getElementById(this.titles[item] + "driveBrand").style.border = this.modelsList[item].autoCompleteDataDriveBrand ? 'white' : '2px solid red';


          document.getElementById(this.titles[item] + "driveTire").style.border = this.modelsList[item].autoCompleteDataTireDrive ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "driveSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeDrive ? 'white' : '2px solid red';

          if (this.mileage_calculation_toggle) {
            document.getElementById(this.titles[item] + "driveRunout").style.border = this.modelsList[item].driveRunoutMiles ? 'white' : '2px solid red';
            document.getElementById(this.titles[item] + "driveTirePrice").style.border = this.modelsList[item].driveTirePrice ? 'white' : '2px solid red';
          }

        }



        if (this.nondrivencheckboxnew && this.nondrivenShow) {
          document.getElementById(this.titles[item] + "nondrivenBrand").style.border = this.modelsList[item].autoCompleteDataNondrivenBrand ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "nondrivenTire").style.border = this.modelsList[item].autoCompleteDataTireNondriven ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "nondrivenSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeNonDrive ? 'white' : '2px solid red';

          if (this.mileage_calculation_toggle) {
            document.getElementById(this.titles[item] + "nondrivenRunout").style.border = this.modelsList[item].nondrivenRunoutMiles ? 'white' : '2px solid red';
            document.getElementById(this.titles[item] + "nondrivenTirePrice").style.border = this.modelsList[item].nondrivenTirePrice ? 'white' : '2px solid red';
          }
        }

        if (this.trailercheckboxnew && this.trailerShow) {
          document.getElementById(this.titles[item] + "trailerBrand").style.border = this.modelsList[item].autoCompleteDataTrailerBrand ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "trailerTire").style.border = this.modelsList[item].autoCompleteDataTireTrailer ? 'white' : '2px solid red';
          document.getElementById(this.titles[item] + "trailerSizeTire").style.border = this.modelsList[item].autoCompleteDataSizeTrailer ? 'white' : '2px solid red';

          if (this.mileage_calculation_toggle) {
            document.getElementById(this.titles[item] + "trailerRunout").style.border = this.modelsList[item].trailerRunoutMiles ? 'white' : '2px solid red';
            document.getElementById(this.titles[item] + "trailerTirePrice").style.border = this.modelsList[item].trailerTirePrice ? 'white' : '2px solid red';
          }

        }
        return false;
      }
    }

    return true;

  }


  presentAlertForIncompleteScenario() {
    this.translateService.get(['scenario_incomplete_alert', 'complete_scenario', 'cancel', 'discard']).subscribe(transVal => {

      let alert = this.alertCtrl.create({
        message: transVal['scenario_incomplete_alert'],
        buttons: [
          {
            text: transVal['complete_scenario'],
            role: transVal['cancel'],
            handler: () => {

            }
          },
          {
            text: transVal['discard'],
            handler: () => {
              this.storage.get("proposedScenarioCount").then(
                (data) => {
                  if (data != null && this.showAddButton != false) {
                    console.log(this.showAddButton);
                    data -= 1;
                    this.storage.set("proposedScenarioCount", data);

                  }
                }
              )
              this.navCtrl.parent.viewCtrl.dismiss();
            }
          }
        ]
      });
      alert.present();
    });
  }


  handleIncompleteScenarioForAddingScenario() {
    this.translateService.get(['complete_scenario_proceeding_alert', 'dismiss']).subscribe(text => {

      let alert = this.alertCtrl.create({
        subTitle: text['complete_scenario_proceeding_alert'],
        buttons: [text['dismiss']]
      });
      alert.present();
    });
  }


  showHelpModal() {

    var modal = this.modalCtrl.create(HelpPage);
    modal.present();

  }


  showTotalBaseRollingResistance() {
    var modal = this.modalCtrl.create(HelpPage, { passedinData: "rollingResistance" });


    modal.present();
  }

  getSteerBrandModel(item) {
    if (item == 0) {
      return "autoCompleteDataSteerBrand";
    } else {
      return "autoCompleteDataSteerBrand" + item;
    }
  }

  ionViewWillLeave() {
    this.saveInfo();
  }


  openWeightSavingPage() {

    if (!this.checkValidScenario()) {
      this.handleIncompleteScenarioForAddingScenario();
      return;
    }

    this.saveInfo();


    var jumpWeightSavingPage = true;

    var treadSizeMap = JSON.parse(localStorage.getItem('treadSizeMap'));


    localStorage.removeItem('steerSaved');
    localStorage.removeItem('driveSaved');
    localStorage.removeItem('nondrivenSaved');
    localStorage.removeItem('trailerSaved');






    for (var item in this.modelsList) {

      if (treadSizeMap[this.modelsList[item].autoCompleteDataTireDrive] == null) {
        jumpWeightSavingPage = true;
        break;
      }

      if (this.drivecheckboxnew && this.modelsList[item].autoCompleteDataTireDrive.toUpperCase().indexOf('X ONE') != -1) {
        jumpWeightSavingPage = false;
        break;
      }



      if (this.trailerShow && this.trailercheckboxnew) {

        if (treadSizeMap[this.modelsList[item].autoCompleteDataTireTrailer] == null) {
          jumpWeightSavingPage = true;
          break;
        }


        if (this.modelsList[item].autoCompleteDataTireTrailer.toUpperCase().indexOf('X ONE') != -1) {
          jumpWeightSavingPage = false;
          break;
        }

      }

      if (this.nondrivenShow && this.nondrivencheckboxnew) {


        if (this.modelsList[item].autoCompleteDataTireNondriven == null) {
          jumpWeightSavingPage = true;

          break;
        }

        if (this.modelsList[item].autoCompleteDataTireNondriven.toUpperCase().indexOf('X ONE') != -1) {

          jumpWeightSavingPage = false;

          break;

        }


      }


    }


    if (this.drivecheckboxnew == false && (this.nondrivenShow == false || (this.nondrivenShow && this.nondrivencheckboxnew == false)) && (this.trailerShow == false || (this.trailerShow && this.trailercheckboxnew == false))) {

      jumpWeightSavingPage = true;

    }


    if (this.steercheckboxnew == false && this.drivecheckboxnew == false && (this.trailerShow == false || (this.trailerShow && this.trailercheckboxnew == false)) && (this.nondrivenShow == false || (this.nondrivenShow && this.nondrivencheckboxnew == false))) {

      this.translateService.get(['select_wheel_alert', 'dismiss']).subscribe(text => {

        let alert = this.alertCtrl.create({
          subTitle: text['select_wheel_alert'],
          buttons: [text['dismiss']]
        });
        alert.present();
      });

      return;
    }




    if (localStorage.getItem("weightSavingToggle") != null) {
      var data = localStorage.getItem("weightSavingToggle") == 'true' ? true : false;




      if (data == false) {
        this.myApp.getRootNav().setRoot(TabsResultPage, { trailerShow: this.trailerShow, nondrivenShow: this.nondrivenShow, proposedNum: this.items.length, isFromBasicAnalysis: true, data: this.modelsList })
      } else {

        jumpWeightSavingPage = true;

        if (!jumpWeightSavingPage) {
          this.navCtrl.push(WeightSavingPage, {
            weightSaving: localStorage.getItem('weightSaving'),
            trailerShow: this.trailercheckboxnew && this.trailerShow,
            nondrivenShow: this.nondrivencheckboxnew && this.nondrivenShow,
            proposedNum: this.items.length,
            isFromBasicAnalysis: true,
            data: this.modelsList
          });

          localStorage.setItem('wightSavingReceivedData', JSON.stringify(this.modelsList));


        } else {
          localStorage.setItem("calculateWeight", 'false');
          this.myApp.getRootNav().setRoot(TabsResultPage, { trailerShow: this.trailerShow, nondrivenShow: this.nondrivenShow, proposedNum: this.items.length, isFromBasicAnalysis: true, data: this.modelsList });
        }


      }

    }
  }

  openPreviousPage() {
  
    // this.saveInfo();
    this.myApp.getRootNav().setRoot(HomePage, {})
  }

  removeScenario() {
    if (this.modelsList.length > 2) {
      this.modelsList.pop();
      this.items.pop();
    }

  }
  exitFuelApp() {

    closeModal();


  }

}



