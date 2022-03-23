import {Component, ViewChild} from '@angular/core';
import {App, Navbar, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {Platform, ActionSheetController } from 'ionic-angular'
import {AlertController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {AutocompletePagePage} from "../autocomplete-page/autocomplete-page";
import {TabProposedTirePage} from "../tab-proposed-tire/tab-proposed-tire";
import {TranslateService} from "@ngx-translate/core";
import {TireInfoModel} from "../../app/models/TireInfoModel";
import {BlendedAverageModel} from "../../app/models/BlendedAverageModel";
import {Http, Response} from '@angular/http'
import { Events } from 'ionic-angular';
import {HelpPage} from "../help/help";
import {TireInfoLifeCycleModel} from "../../app/models/TireInfoLifeCycleModel";
import {WeightSavingPage} from "../weight-saving/weight-saving";
import {TabsResultPage} from "../tabs-result/tabs-result";


/*
 Generated class for the Account page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-account',
  templateUrl: 'lifecycleanalysis.html'
})
export class LifeCycleAnalysisPage {

  @ViewChild(Navbar) navBar:Navbar;


  showAddButton = true;

  trailerShow:boolean = true;
  nondrivenShow:boolean = true;

  currentTireInfoModel = new TireInfoLifeCycleModel('currentTireLifeCycleInfoModel', []);
  proposedTireInfoModel1 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData1', []);
  items=[0, 1];
  titles = [];
  modelListLifeCycle = [];

  percentages = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"];

  percentageMap={"10%": "90%", "20%":"80%", "30%":"70%", "40%":"60%", "50%":"50%", "60%":"40%", "70%":"30%", "80%":"20%", "90%":"10%"};

  imgSrcString:String = "assets/img/diagram1-steer.png";

  showMenu = true;
  language:string;

  fuel_calculation_toggle = true;
  mileage_calculation_toggle = true;

  proposedTireInfoModel2 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData2', []);
  proposedTireInfoModel3 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData3', []);
  proposedTireInfoModel4 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData4', []);
  proposedTireInfoModel5 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData5', []);
  proposedTireInfoModel6 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData6', []);
  proposedTireInfoModel7 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData7', []);
  proposedTireInfoModel8 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData8', []);
  proposedTireInfoModel9 = new TireInfoLifeCycleModel('proposedScenarioLifeCycleAnalysisData9', []);

  steercheckboxlifecyclenew = true;
  drivecheckboxlifecyclenew  = true;
  nondrivencheckboxlifecyclenew = true;
  trailercheckboxlifecyclenew = true;
  steercheckboxlifecyclenewsecondlife = true;
  drivecheckboxlifecyclenewsecondlife = true;
  nondrivencheckboxlifecyclenewsecondlife = true;
  trailercheckboxlifecyclenewsecondlife = true;



  proposedScenarioMap={};


  basicAnalysisModelList = [];


  results = {mfg: [], size: [], tread: [], rim: [], rr:[], weight:[], xone:[]};


  brandTreadMap = {};

  treadRRMap = {};


  columns = "4";

  previousTab = 1;


  vehicleConfigurationMap: any;


  lifeCycle :String;


  currentTab = 1;

  currencySymbol  ='€';



  passedValue:any;

  scenario_title:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public actionSheetCtrl:ActionSheetController, public platform:Platform
    , public alertCtrl:AlertController, private modalCtrl:ModalController, public translateService : TranslateService, public http:Http, public events:Events, private myApp:App) {


    this.lifeCycle = 'firstLife';
    this.translateService.get(['life_cycle_current_tire', 'life_cycle_proposed_tire','currency']).subscribe(text => {
      this.titles.push(text['life_cycle_current_tire']);
      this.titles.push(text['life_cycle_proposed_tire']+"1");
      // this.currencySymbol = text['currency'];

    })
    let currencyCode =   localStorage.getItem("selectedCurrency") == null ? "EUR" : localStorage.getItem("selectedCurrency") ;
    this.currencySymbol = localStorage.getItem(currencyCode);


    this.basicAnalysisModelList =  JSON.parse(localStorage.getItem("basicAnalysisList"));

    this.trailerShow = navParams.get("trailerShow");
    this.nondrivenShow = navParams.get("nondrivenShow");

    // this.storage.get('selectedVehicleImg').then((img) => {
    //   if (img != null){
    //     this.imgSrcString = img;
    //   }else{
    //     this.imgSrcString = "assets/img/diagram" + (1) + "-"+"steer.png";
    //   }
    // })


    if(localStorage.getItem('selectedVehicleImg') != null){
      this.imgSrcString = localStorage.getItem('selectedVehicleImg');
    }else{
      this.imgSrcString = "assets/img/diagram" + (1) + "-"+"steer.png";
    }

    // if(localStorage.getItem('language') != null) {
    //   this.translateService.setDefaultLang(localStorage.getItem('language'));
    // }else {
    //   this.translateService.setDefaultLang("en");
    // }



    // this.storage.get("language").then((data) => {
    //
    //   if (data != undefined && data != null) {
    //     this.language = data;
    //   } else {
    //     this.language = 'en';
    //   }
    //
    //   this.translateService.setDefaultLang(this.language);
    //
    // });




    this.passedValue = navParams.get("passedValue");

    // this.storage.get("brandTreadMap").then(
    //   (data) =>{
    //     if(data != null){
    //       this.brandTreadMap = JSON.parse(data);
    //     }
    //   }
    // )

    if(localStorage.getItem("brandTreadMap") != null){
      this.brandTreadMap = JSON.parse(localStorage.getItem("brandTreadMap"));
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

    var dataFromStorage = this.navParams.get("passedValue");

    if(dataFromStorage != undefined){
      this.loadData(dataFromStorage);
    }else{
      if(this.basicAnalysisModelList != null ) {
        this.currentTireInfoModel.copyFromBasicAnalysis(this.basicAnalysisModelList[0]);
      }
      this.modelListLifeCycle.push(this.currentTireInfoModel);
      if(this.basicAnalysisModelList != null) {
        this.proposedTireInfoModel1.copyFromBasicAnalysis(this.basicAnalysisModelList[1]);
      }
      this.modelListLifeCycle.push(this.proposedTireInfoModel1);


      if(this.basicAnalysisModelList != null && this.basicAnalysisModelList.length > 2){

        for(var id = 2; id < this.basicAnalysisModelList.length; id++){

          this.proposedScenarioMap["proposedTireInfoModel"+id].copyFromBasicAnalysis(this.basicAnalysisModelList[id]);

          this.modelListLifeCycle.push( this.proposedScenarioMap["proposedTireInfoModel"+id]);
          this.items.push(id);
          this.translateService.get(['proposed_tire']).subscribe(text => {
            this.titles.push(text['proposed_tire']+id);
          });
          // var title = "Proposed Tire"+id;
          // this.titles.push(title);

        }
      }
    }


    // this.storage.get("rrjsonresults").then(
    //   (data) => {
    //     if(data != null){
    //       this.results = JSON.parse(data);
    //     }
    //   }
    // )

    if(localStorage.getItem('rrjsonresults') != null){

      this.results = JSON.parse(localStorage.getItem('rrjsonresults'));

    }





    // this.storage.get("treadRRMap").then(
    //   (data) => {
    //     if(data != null){
    //       this.treadRRMap = JSON.parse(data);
    //     }
    //   }
    // )

    if(localStorage.getItem('treadRRMap') != null){

      this.treadRRMap = JSON.parse(localStorage.getItem('treadRRMap'));

    }



    if(this.modelListLifeCycle[0].blendedAverageSteerSecondLife == null || this.modelListLifeCycle[0].blendedAverageSteerSecondLife == "" || this.modelListLifeCycle[0].blendedAverageSteerSecondLife == undefined){
      this.modelListLifeCycle[0].blendedAverageSteerSecondLife = "50%";
    }


    if(this.modelListLifeCycle[0].blendedAverageSteerFirstLife == null || this.modelListLifeCycle[0].blendedAverageSteerFirstLife == "" || this.modelListLifeCycle[0].blendedAverageSteerFirstLife == undefined){
      this.modelListLifeCycle[0].blendedAverageSteerFirstLife = "50%";
    }


    if(this.modelListLifeCycle[0].blendedAverageDriveSecondLife == null || this.modelListLifeCycle[0].blendedAverageDriveSecondLife == "" || this.modelListLifeCycle[0].blendedAverageDriveSecondLife == undefined){
      this.modelListLifeCycle[0].blendedAverageDriveSecondLife = "50%";
    }


    if(this.modelListLifeCycle[0].blendedAverageDriveFirstLife == null || this.modelListLifeCycle[0].blendedAverageDriveFirstLife == "" || this.modelListLifeCycle[0].blendedAverageDriveFirstLife == undefined){
      this.modelListLifeCycle[0].blendedAverageDriveFirstLife = "50%";
    }


    if(this.trailerShow){
      if(this.modelListLifeCycle[0].blendedAverageTrailerSecondLife == null || this.modelListLifeCycle[0].blendedAverageTrailerSecondLife == "" || this.modelListLifeCycle[0].blendedAverageTrailerSecondLife == undefined){
        this.modelListLifeCycle[0].blendedAverageTrailerSecondLife = "50%";
      }


      if(this.modelListLifeCycle[0].blendedAverageTrailerFirstLife == null || this.modelListLifeCycle[0].blendedAverageTrailerFirstLife == "" || this.modelListLifeCycle[0].blendedAverageTrailerFirstLife == undefined){
        this.modelListLifeCycle[0].blendedAverageTrailerFirstLife = "50%";
      }
    }

    if(this.nondrivenShow){
      if(this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife == null || this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife == "" || this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife == undefined){
        this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife = "50%";
      }


      if(this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife == null || this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife == "" || this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife == undefined){
        this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife = "50%";
      }
    }


    if(localStorage.getItem('steercheckboxlifecyclenew') != null && localStorage.getItem('steercheckboxlifecyclenew') != undefined){
      this.steercheckboxlifecyclenew = localStorage.getItem('steercheckboxlifecyclenew') == 'true' ? true: false;
    }


    if(localStorage.getItem('drivecheckboxlifecyclenew') != null && localStorage.getItem('drivecheckboxlifecyclenew') != undefined){
      this.drivecheckboxlifecyclenew = localStorage.getItem('drivecheckboxlifecyclenew') == 'true' ? true: false;
    }


    if(this.nondrivenShow) {
      if (localStorage.getItem('nondrivencheckboxlifecyclenew') != null && localStorage.getItem('nondrivencheckboxlifecyclenew') != undefined) {
        this.nondrivencheckboxlifecyclenew = localStorage.getItem('nondrivencheckboxlifecyclenew') == 'true' ? true : false;
      }
    }


    if(this.trailerShow){
      if(localStorage.getItem('trailercheckboxlifecyclenew') != null && localStorage.getItem('trailercheckboxlifecyclenew') != undefined){
        this.trailercheckboxlifecyclenew = localStorage.getItem('trailercheckboxlifecyclenew') == 'true' ? true: false;
      }

    }



    if(localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined){
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }


    if(localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined){
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true :false;
    }


  }




  showAutocompleteModal (id, item) {

    let modal:any;
    if(id < 4){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.results.mfg});
    }else{
      var tempPassedInValue:any;
      switch (id){
        case 4:

          if(this.currentTab == 1){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataSteerBrand] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataSteerBrand];
            }
          }else if(this.currentTab == 2){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife];
            }

          }

          break
        case 5:

          if(this.currentTab == 1){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataDriveBrand] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataDriveBrand];
            }
          }else if (this.currentTab == 2){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife];
            }
          }


          break;
        case 6:
          if(this.currentTab == 1){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand];
            }
          }else if(this.currentTab == 2){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife];
            }
          }
          break;
        case 7:
          if(this.currentTab == 1){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataTrailerBrand] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataTrailerBrand];
            }
          }else if(this.currentTab == 2){
            if(this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife] == null){
              tempPassedInValue = [];
            }else{
              tempPassedInValue = this.brandTreadMap[this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife];
            }
          }

          break;

      }



      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: tempPassedInValue});
    }




    modal.onDidDismiss(data => {

      var steerCon =  parseFloat(localStorage.getItem("steerContribution"));
      var driveCon = parseFloat(localStorage.getItem("driveContribution"));
      var nondrivenCon = parseFloat(localStorage.getItem("nondrivenContribution"));
      var trailerCon = parseFloat(localStorage.getItem("trailerContribution"));
      var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
      var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));
      switch(id) {
        case 0:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataSteerBrand = data;
            this.modelListLifeCycle[item].autoCompleteDataTireSteer = "";
            document.getElementById(this.titles[item]+this.lifeCycle+"steerBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataSteerBrand? 'white' : 'red';

          }else if (this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife = data;
            this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife = "";
            document.getElementById(this.titles[item]+this.lifeCycle+"steerBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife? 'white' : 'red';

          }
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"steer.png";
          break
        case 1:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataDriveBrand = data;
            this.modelListLifeCycle[item].autoCompleteDataTireDrive = "";
            document.getElementById(this.titles[item]+this.lifeCycle+ "driveBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataDriveBrand? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife = data;
            this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife = "";
            document.getElementById(this.titles[item]+this.lifeCycle + "driveBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife? 'white' : 'red';

          }

          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"drive.png";
          break;
        case 2:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand = data;
            this.modelListLifeCycle[item].autoCompleteDataTireNondriven = "";
            document.getElementById(this.titles[item]+this.lifeCycle+"nondrivenBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife = data;
            this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife = "";
            document.getElementById(this.titles[item]+this.lifeCycle + "nondrivenBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife? 'white' : 'red';

          }
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"nondriven.png";
          break;
        case 3:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataTrailerBrand = data;
            this.modelListLifeCycle[item].autoCompleteDataTireTrailer = "";
            document.getElementById(this.titles[item]+this.lifeCycle+"trailerBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataTrailerBrand? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife = data;
            this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife = "";
            document.getElementById(this.titles[item]+this.lifeCycle+"trailerBrand").style.background =  this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife? 'white' : 'red';

          }

          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"trailer.png";
          break;
        case 4:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataTireSteer = data;
            if(item != '0'){
              this.modelListLifeCycle[item].steerBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireSteer]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireSteer]) * 100);
            }
            else if(item == '0'){

              for (var i = 0 ; i < this.items.length ; i++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireSteer != undefined || this.modelListLifeCycle[i].autoCompleteDataTireSteer != "" || this.modelListLifeCycle[i].autoCompleteDataTireSteer != null) ){

                  this.modelListLifeCycle[i].steerBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireSteer]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireSteer]) * 100);



                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"steerTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireSteer? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife = data;
            if(item != '0'){
              this.modelListLifeCycle[item].steerBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireSteerSecondLife]) * 100);
            }else if(item == '0'){

              for (var i = 0; i < this.items.length; i++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireSteerSecondLife != undefined || this.modelListLifeCycle[i].autoCompleteDataTireSteerSecondLife != "" || this.modelListLifeCycle[i].autoCompleteDataTireSteerSecondLife != null) ){

                  this.modelListLifeCycle[i].steerBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireSteerSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireSteerSecondLife]) * 100);



                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"steerTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife? 'white' : 'red';

          }

          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"steer.png";

          break;

        case 5:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataTireDrive = data;
            if(item != '0'){
              this.modelListLifeCycle[item].driveBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireDrive]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireDrive]) * 100);
            }else if(item == '0'){

              for (var i = 0; i < this.items.length; i++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireDrive != undefined || this.modelListLifeCycle[i].autoCompleteDataTireDrive != "" || this.modelListLifeCycle[i].autoCompleteDataTireDrive != null) ){

                  this.modelListLifeCycle[i].driveBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireDrive]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireDrive]) * 100);


                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"driveTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireDrive? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife = data;
            if(item != '0'){
              this.modelListLifeCycle[item].driveBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireDriveSecondLife]) * 100);
            }else if(item == '0'){

              for (var i = 0; i < this.items.length; i ++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireDriveSecondLife != undefined || this.modelListLifeCycle[i].autoCompleteDataTireDriveSecondLife != "" || this.modelListLifeCycle[i].autoCompleteDataTireDriveSecondLife != null) ){

                  this.modelListLifeCycle[i].driveBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireDriveSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireDriveSecondLife]) * 100);



                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"driveTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife? 'white' : 'red';

          }
          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"drive.png";


          break;

        case 6:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataTireNondriven = data;
            if(item != '0'){
              this.modelListLifeCycle[item].nondrivenBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireNondriven]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireNondriven]) * 100);
            }
              else if(item == '0'){

              for (var i =0; i < this.items.length; i++){

                if( i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireNondriven != undefined || this.modelListLifeCycle[i].autoCompleteDataTireNondriven != "" || this.modelListLifeCycle[i].autoCompleteDataTireNondriven != null) ){

                  this.modelListLifeCycle[i].nondrivenBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireNondriven]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireNondriven]) * 100);



                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"nondrivenTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireNondriven ? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife = data;
            if(item != '0'){
              this.modelListLifeCycle[item].nondrivenBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireNondrivenSecondLife]) * 100);
            }
            else if(item == '0'){

              for (var i =0; i < this.items.length; i++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireNondrivenSecondLife != undefined || this.modelListLifeCycle[i].autoCompleteDataTireNondrivenSecondLife != "" || this.modelListLifeCycle[i].autoCompleteDataTireNondrivenSecondLife!= null) ){

                  this.modelListLifeCycle[i].nondrivenBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireNondrivenSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireNondrivenSecondLife]) * 100);



                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"nondrivenTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife ? 'white' : 'red';

          }

          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"nondriven.png";


          break;

        case 7:
          if(this.currentTab == 1){
            this.modelListLifeCycle[item].autoCompleteDataTireTrailer = data;
            if(item != '0'){
              this.modelListLifeCycle[item].trailerBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireTrailer]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireTrailer]) * 100);
            }
            else if(item == '0'){

              for (var i = 0; i < this.items.length; i++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireTrailer != undefined || this.modelListLifeCycle[i].autoCompleteDataTireTrailer != "" || this.modelListLifeCycle[i].autoCompleteDataTireTrailer != null) ){

                  this.modelListLifeCycle[i].tireTrailerBaseRollingResistance = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireTrailer]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireTrailer]) * 100);

                }

              }

            }
            document.getElementById(this.titles[item]+this.lifeCycle+"trailerTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireTrailer? 'white' : 'red';

          }else if(this.currentTab == 2){
            this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife = data;
            if(item != '0'){
              this.modelListLifeCycle[item].trailerBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireTrailerSecondLife]) * 100);
            }
            else if(item == '0'){

              for (var i = 0; i < this.items.length; i++){

                if(i > 0 && (this.modelListLifeCycle[i].autoCompleteDataTireTrailerSecondLife != undefined || this.modelListLifeCycle[i].autoCompleteDataTireTrailerSecondLife != "" || this.modelListLifeCycle[i].autoCompleteDataTireTrailerSecondLife!= null) ){

                  this.modelListLifeCycle[i].tireTrailerBaseRollingResistanceSecondLife = Math.round((this.treadRRMap[this.modelListLifeCycle[i].autoCompleteDataTireTrailerSecondLife]/this.treadRRMap[this.modelListLifeCycle[0].autoCompleteDataTireTrailerSecondLife]) * 100);

                }

              }


            }
            document.getElementById(this.titles[item]+this.lifeCycle+"trailerTire").style.background =  this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife? 'white' : 'red';

          }

          this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"trailer.png";

          break;


      }


      if(this.currentTab == 1){
        if(item > 0) {

          this.modelListLifeCycle[item].totalRollingResistance = 0;
          if(this.steercheckboxlifecyclenew){
            this.modelListLifeCycle[item].totalRollingResistance += this.modelListLifeCycle[item].steerBaseRollingResistance * steerCon;
          }

          if(this.drivecheckboxlifecyclenew) {
            this.modelListLifeCycle[item].totalRollingResistance += this.modelListLifeCycle[item].driveBaseRollingResistance * driveCon;
          }

          if (this.nondrivenShow  && this.nondrivencheckboxlifecyclenew) {
            this.modelListLifeCycle[item].totalRollingResistance += this.modelListLifeCycle[item].nondrivenBaseRollingResistance * nondrivenCon;
          }

          if (this.trailerShow && this.trailercheckboxlifecyclenew) {
            this.modelListLifeCycle[item].totalRollingResistance += this.modelListLifeCycle[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
          }

          this.modelListLifeCycle[item].totalRollingResistance = Math.round(this.modelListLifeCycle[item].totalRollingResistance);
        }else if (item == 0){


          for(var j = 1; j < this.items.length; j++){

            this.modelListLifeCycle[j].totalRollingResistance = 0;

            if(this.steercheckboxlifecyclenew){
              this.modelListLifeCycle[j].totalRollingResistance += this.modelListLifeCycle[j].steerBaseRollingResistance * steerCon;
            }

            if(this.drivecheckboxlifecyclenew){
              this.modelListLifeCycle[j].totalRollingResistance += this.modelListLifeCycle[j].driveBaseRollingResistance * driveCon;
            }

            if (this.nondrivenShow && this.nondrivencheckboxlifecyclenew) {
              this.modelListLifeCycle[j].totalRollingResistance += this.modelListLifeCycle[j].nondrivenBaseRollingResistance * nondrivenCon;
            }

            if (this.trailerShow && this.trailercheckboxlifecyclenew) {
              this.modelListLifeCycle[j].totalRollingResistance += this.modelListLifeCycle[j].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con);
            }

            this.modelListLifeCycle[j].totalRollingResistance = Math.round(this.modelListLifeCycle[j].totalRollingResistance);

          }


        }
      }else if(this.currentTab == 2) {

        if (item > 0) {

          this.modelListLifeCycle[item].totalRollingResistanceSecondLife = 0;

          if(this.steercheckboxlifecyclenew){
            this.modelListLifeCycle[item].totalRollingResistanceSecondLife += this.modelListLifeCycle[item].steerBaseRollingResistanceSecondLife * steerCon;
          }

          if(this.drivecheckboxlifecyclenew){
            this.modelListLifeCycle[item].totalRollingResistanceSecondLife += this.modelListLifeCycle[item].driveBaseRollingResistanceSecondLife * driveCon;
          }


          if (this.nondrivenShow && this.nondrivencheckboxlifecyclenew) {
            this.modelListLifeCycle[item].totalRollingResistanceSecondLife += this.modelListLifeCycle[item].nondrivenBaseRollingResistanceSecondLife * nondrivenCon;
          }

          if (this.trailerShow && this.trailercheckboxlifecyclenew) {
            this.modelListLifeCycle[item].totalRollingResistanceSecondLife += this.modelListLifeCycle[item].trailerBaseRollingResistanceSecondLife * (trailerCon + trailer2Con + trailer3Con);
          }

          this.modelListLifeCycle[item].totalRollingResistanceSecondLife = Math.round(this.modelListLifeCycle[item].totalRollingResistanceSecondLife);
        }
        else{
          for(var j = 1; j < this.items.length; j++){

            this.modelListLifeCycle[j].totalRollingResistanceSecondLife = 0;


            if(this.steercheckboxlifecyclenew){
              this.modelListLifeCycle[j].totalRollingResistanceSecondLife += this.modelListLifeCycle[j].steerBaseRollingResistanceSecondLife * steerCon;
            }

            if(this.drivecheckboxlifecyclenew){
              this.modelListLifeCycle[j].totalRollingResistanceSecondLife += this.modelListLifeCycle[j].driveBaseRollingResistanceSecondLife * driveCon;

            }

            if (this.nondrivenShow && this.nondrivencheckboxlifecyclenew) {
              this.modelListLifeCycle[j].totalRollingResistanceSecondLife += this.modelListLifeCycle[j].nondrivenBaseRollingResistanceSecondLife * nondrivenCon;
            }

            if (this.trailerShow && this.trailercheckboxlifecyclenew) {
              this.modelListLifeCycle[j].totalRollingResistanceSecondLife += this.modelListLifeCycle[j].trailerBaseRollingResistanceSecondLife * (trailerCon + trailer2Con + trailer3Con);
            }

            this.modelListLifeCycle[j].totalRollingResistanceSecondLife = Math.round(this.modelListLifeCycle[j].totalRollingResistanceSecondLife);


          }


        }

      }

    });
    modal.present();
  }

  ionViewDidLoad() {
    // this.navBar.backButtonClick = (e:UIEvent) => {
    //
    //   if(!this.checkAllFields()){
    //     this.presentAlertForIncompleteScenario();
    //     return;
    //   }
    //
    //
    //   this.saveInfo();
    //
    //   this.navCtrl.parent.viewCtrl.dismiss();
    // };
  }


  navigateToScenario(){
    // this.saveInfo()


    if(this.modelListLifeCycle.length >= 10)
    {
      this.translateService.get(['maximum_scenario_alert','dismiss']).subscribe(text => {
        let alert = this.alertCtrl.create({
          subTitle: text['maximum_scenario_alert'],
          buttons: [text['dismiss']]
        });
        alert.present();
      })
      return
    }


    if(!this.checkValidScenario(this.currentTab)){
      this.handleAddScenario();
      return;
    }


    var modelListNum = this.modelListLifeCycle.length;
    var previousModelNum = modelListNum - 1;
    var key = "proposedTireInfoModel"+modelListNum;

    var newModel = this.proposedScenarioMap[key];
    newModel.copy(this.modelListLifeCycle[previousModelNum])

    this.modelListLifeCycle.push(newModel);
    this.items.push(modelListNum);
    this.translateService.get(['proposed_tire','dismiss']).subscribe(text => {
      this.titles.push(text['proposed_tire']+modelListNum);
    });

    this.lifeCycle = 'firstLife';


    setTimeout(()=>{
      this.translateService.get(['proposed_tire','dismiss']).subscribe(text => {
      document.getElementById(text['proposed_tire']+modelListNum+ this.lifeCycle + 'steerBrand').scrollIntoView();
      });
    }, 100);



  }


  saveTireSegmentInfo($event, name1:string, name2:string) {

    var previousTabNum = this.currentTab;

    var tempTabNum = 0;

    if(name1 == "secondLife" && name2 == "blendedAverage"){

      tempTabNum = 1;

      setTimeout(()=>{
        this.addBackgroundColorToFirstLifeWhenDataisIncomplete()
      }, 50);

    }else if(name1 == "firstLife" && name2 == "blendedAverage"){

      tempTabNum = 2;

    }else if (name1 == "firstLife" && name2 == "secondLife"){


      tempTabNum = 3;

    }

    if(this.steercheckboxlifecyclenew == false && this.drivecheckboxlifecyclenew == false && (this.trailerShow == false || (this.trailerShow && this.trailercheckboxlifecyclenew == false ))  && (this.nondrivenShow == false || (this.nondrivenShow && this.nondrivencheckboxlifecyclenew == false))){

      this.translateService.get(['select_wheel_alert','dismiss']).subscribe(text => {

        let alert = this.alertCtrl.create({
          subTitle: text['select_wheel_alert'],
          buttons: [text['dismiss']]
        });
        alert.present();
      });

      return;
    }



    if (tempTabNum > previousTabNum){
      if((previousTabNum  == 1 || previousTabNum == 2) && !this.checkValidScenario(previousTabNum)){
        setTimeout(()=>{
          this.handleIncompleteScenarioForSegmentSwitch(previousTabNum)
        }, 5);
        return;

      }else if (previousTabNum == 1 && tempTabNum == 3 && !this.checkValidScenario(2)){
        setTimeout(()=>{
          this.currentTab = 2;
          this.handleIncompleteScenarioForSegmentSwitch(2)
        }, 5);
        return;
      }
      else if(previousTabNum == 3 && !this.checkValidBlendedAverage()){
        setTimeout(()=>{
          this.handleIncompleteScenarioForSegmentSwitch(previousTabNum)
        }, 5);
        return;
      }

    }


    this.currentTab = tempTabNum


    switch(this.currentTab){
      case 1:
        this.lifeCycle = 'firstLife';
        break;
      case 2:
        this.lifeCycle = 'secondLife';
        break;
      case 3:
        this.lifeCycle = 'blendedAverage';
        break;
    }


    setTimeout(()=>{
      if(this.currentTab == 2 || this.currentTab == 1){
        document.getElementById(this.titles[0]+this.lifeCycle+"steerBrand").scrollIntoView();
      }
    }, 100);



   // this.getTabName(this.currentTab);

  }


  // getTabName(tabIndex){
  //   switch(tabIndex){
  //     case 1:
  //       return this.storage.set("currentTabIndex", "firstLife");
  //     case 2:
  //       return this.storage.set("currentTabIndex", "secondLife");
  //     case 3:
  //       return this.storage.set("currentTabIndex", "blendedAverage");
  //   }
  //
  // }


  ionViewWillLeave(){
    console.log("ion view will leave tab");
    this.saveInfo();
  }

  ionViewWillEnter(){
    // this.storage.set("lastPage", "lifecycleanalysis");
  }

  ngOnDestroy(){

  }


  saveInfo() {
    // this.storage.set("lifeCycleAnalysis", JSON.stringify(this.modelListLifeCycle));
    localStorage.setItem("lifeCycleAnalysisList", JSON.stringify(this.modelListLifeCycle));


    localStorage.setItem('steercheckboxlifecyclenew', this.steercheckboxlifecyclenew == true? 'true':'false');
    localStorage.setItem('drivecheckboxlifecyclenew', this.drivecheckboxlifecyclenew == true?'true':'false');
    if(this.nondrivenShow){
      localStorage.setItem('nondrivencheckboxlifecyclenew', this.nondrivencheckboxlifecyclenew == true? 'true':'false');

    }

    if(this.trailerShow){
      localStorage.setItem('trailercheckboxlifecyclenew', this.trailercheckboxlifecyclenew == true? 'true' : 'false');
    }



  }


  onChange($event, name, item){
    switch (name) {
      case "steerRunoutMiles":
      case "steerRunoutMilesSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].steerRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle+"steerRunout").style.background = this.modelListLifeCycle[item].steerRunoutMiles? 'white' : 'red';
        }else if (this.currentTab == 2){
          this.modelListLifeCycle[item].steerRunoutMilesSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle+"steerRunout").style.background = this.modelListLifeCycle[item].steerRunoutMilesSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"steer.png";

        break;
      case "driveRunoutMiles":
      case "driveRunoutMilesSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].driveRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "driveRunout").style.background = this.modelListLifeCycle[item].driveRunoutMiles? 'white' : 'red';

        }else if(this.currentTab == 2){
          this.modelListLifeCycle[item].driveRunoutMilesSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "driveRunout").style.background = this.modelListLifeCycle[item].driveRunoutMilesSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"drive.png";

        break;
      case "trailerRunoutMiles":
      case "trailerRunoutMilesSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].trailerRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "trailerRunout").style.background = this.modelListLifeCycle[item].trailerRunoutMiles? 'white' : 'red';

        }else if (this.currentTab == 2){
          this.modelListLifeCycle[item].trailerRunoutMilesSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "trailerRunout").style.background = this.modelListLifeCycle[item].trailerRunoutMilesSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"trailer.png";

        break;
      case "steerTirePrice":
      case "steerTirePriceSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].steerTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "steerTirePrice").style.background = this.modelListLifeCycle[item].steerTirePrice? 'white' : 'red';

        }else if(this.currentTab == 2){
          this.modelListLifeCycle[item].steerTirePriceSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "steerTirePrice").style.background = this.modelListLifeCycle[item].steerTirePriceSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"steer.png";

        break;
      case "driveTirePrice":
      case "driveTirePriceSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].driveTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "driveTirePrice").style.background = this.modelListLifeCycle[item].driveTirePrice? 'white' : 'red';

        }else if (this.currentTab == 2){
          this.modelListLifeCycle[item].driveTirePriceSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "driveTirePrice").style.background = this.modelListLifeCycle[item].driveTirePriceSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"drive.png";

        break;
      case "trailerTirePrice":
      case "trailerTirePriceSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].trailerTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "trailerTirePrice").style.background = this.modelListLifeCycle[item].trailerTirePrice? 'white' : 'red';

        }else if(this.currentTab == 2){
          this.modelListLifeCycle[item].trailerTirePriceSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "trailerTirePrice").style.background = this.modelListLifeCycle[item].trailerTirePriceSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"trailer.png";

        break;
      case "nondrivenRunoutMiles":
      case "nondrivenRunoutMilesSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].nondrivenRunoutMiles = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "nondrivenRunout").style.background = this.modelListLifeCycle[item].nondrivenRunoutMiles? 'white' : 'red';

        }else if (this.currentTab == 2){
          this.modelListLifeCycle[item].nondrivenRunoutMilesSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle +"nondrivenRunout").style.background = this.modelListLifeCycle[item].nondrivenRunoutMilesSecondLife? 'white' : 'red';

        }

        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"nondriven.png";

        break;
      case "nondrivenTirePrice":
      case "nondrivenTirePriceSecondLife":
        if(this.currentTab == 1){
          this.modelListLifeCycle[item].nondrivenTirePrice = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "nondrivenTirePrice").style.background = this.modelListLifeCycle[item].nondrivenTirePrice? 'white' : 'red';

        }else if(this.currentTab == 2){
          this.modelListLifeCycle[item].nondrivenTirePriceSecondLife = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
          document.getElementById(this.titles[item]+this.lifeCycle + "nondrivenTirePrice").style.background = this.modelListLifeCycle[item].nondrivenTirePriceSecondLife? 'white' : 'red';

        }
        this.imgSrcString = this.imgSrcString.split("-")[0] + "-"+"nondriven.png";

        break;
    }
  }




  // onCheckboxChange($event){
  //   // this.saveInfo();
  // }


  checkValidScenario(tabNum){

    if(tabNum == 1){

      for(var item in this.items) {
        if((this.steercheckboxlifecyclenew && (this.modelListLifeCycle[item].autoCompleteDataSteerBrand == "" || this.modelListLifeCycle[item].autoCompleteDataSteerBrand == undefined || this.modelListLifeCycle[item].autoCompleteDataTireSteer == "" || this.modelListLifeCycle[item].autoCompleteDataTireSteer == undefined ||  (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].steerRunoutMiles == 0 || this.modelListLifeCycle[item].steerTirePrice == 0))))|| (this.drivecheckboxlifecyclenew && (this.modelListLifeCycle[item].autoCompleteDataDriveBrand == ""
       || this.modelListLifeCycle[item].autoCompleteDataDriveBrand == undefined    ||this.modelListLifeCycle[item].autoCompleteDataTireDrive == "" ||
          this.modelListLifeCycle[item].autoCompleteDataTireDrive == undefined  || (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].driveRunoutMiles == 0  || this.modelListLifeCycle[item].driveTirePrice == 0))))
          || (this.trailercheckboxlifecyclenew && this.trailerShow && (this.modelListLifeCycle[item].autoCompleteDataTrailerBrand == undefined || this.modelListLifeCycle[item].autoCompleteDataTrailerBrand == ""
          || this.modelListLifeCycle[item].autoCompleteDataTireTrailer == undefined || this.modelListLifeCycle[item].autoCompleteDataTireTrailer == "" || (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].trailerTirePrice == 0 || this.modelListLifeCycle[item].trailerRunoutMiles == 0))))
          || (this.nondrivencheckboxlifecyclenew && this.nondrivenShow && (this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand == ""|| this.modelListLifeCycle[item].autoCompleteDataTireNondriven == "" ||
          (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].nondrivenTirePrice == 0|| this.modelListLifeCycle[item].nondrivenRunoutMiles == 0)) || this.modelListLifeCycle[item].autoCompleteDataTireNondriven == undefined || this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand == undefined))){


          return false;
        }

      }

    }else if (tabNum == 2){

      for(var item in this.items) {

        if ((this.steercheckboxlifecyclenew && (this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife == undefined || this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife == undefined  || (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].steerRunoutMilesSecondLife == 0 || this.modelListLifeCycle[item].steerTirePriceSecondLife == 0)) ))
          || (this.drivecheckboxlifecyclenew && ( this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife == undefined  || this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife == "" ||
          this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife == undefined || (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].driveRunoutMilesSecondLife == 0  || this.modelListLifeCycle[item].driveTirePriceSecondLife == 0)) ))
          || (this.trailercheckboxlifecyclenew && this.trailerShow && (this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife == undefined || this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife == ""
          || this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife == undefined || this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife == "" || (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].trailerTirePriceSecondLife == 0 || this.modelListLifeCycle[item].trailerRunoutMilesSecondLife == 0)) ))
          || (this.nondrivencheckboxlifecyclenew && this.nondrivenShow && (this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife == "" ||
          (this.mileage_calculation_toggle && (this.modelListLifeCycle[item].nondrivenTirePriceSecondLife == 0 || this.modelListLifeCycle[item].nondrivenRunoutMilesSecondLife == 0)) || this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife == undefined || this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife == undefined))) {



          return false;
        }

      }


    }

    return true;

  }


  handleIncompleteScenarioForSegmentSwitch(tabNumber){
    switch(tabNumber){
      case 1:
        this.lifeCycle = 'firstLife';
        break;
      case 2:
        this.lifeCycle = 'secondLife';
        break;
      case 3:
        this.lifeCycle = 'blendedAverage';
        break;
    }
    this.translateService.get(['complete_page_alert','dismiss','cancel']).subscribe(text => {

      let alert = this.alertCtrl.create({
        subTitle: text['complete_page_alert'],
        buttons: [ {
          text: text['dismiss'],
          role: text['cancel'],
          handler: () => {
             if(tabNumber == 2){
               this.addBackgroundColorToSecondLifeWhenDataisIncomplete()
             }else if(tabNumber == 1){
               this.addBackgroundColorToFirstLifeWhenDataisIncomplete()
             }
          }
        },]
      });
      alert.present();
    });

    
  }


  checkValidBlendedAverage(){
    // for(var item in this.items) {
      if (this.modelListLifeCycle[0].blendedAverageSteerFirstLife == undefined || this.modelListLifeCycle[0].blendedAverageDriveFirstLife == undefined ||
        this.modelListLifeCycle[0].blendedAverageSteerSecondLife == undefined ||
        this.modelListLifeCycle[0].blendedAverageDriveSecondLife == undefined
        || (this.trailerShow && (this.modelListLifeCycle[0].blendedAverageTrailerFirstLife == undefined || this.modelListLifeCycle[0].blendedAverageTrailerSecondLife == undefined))
        || (this.nondrivenShow && (this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife == undefined || this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife == undefined))
      ) {

        return false;
      }

    // }

    return true;

  }


  // checkAllFields(){
  //
  //   for(var item in this.items) {
  //     if (this.modelListLifeCycle[item].autoCompleteDataSteerBrand == "" || this.modelListLifeCycle[item].autoCompleteDataDriveBrand == ""
  //       || this.modelListLifeCycle[item].autoCompleteDataTireSteer == "" || this.modelListLifeCycle[item].autoCompleteDataTireDrive == "" ||
  //       this.modelListLifeCycle[item].steerRunoutMiles == 0 || this.modelListLifeCycle[item].driveRunoutMiles == 0 || this.modelListLifeCycle[item].steerTirePrice == 0 || this.modelListLifeCycle[item].driveTirePrice == 0
  //       || this.modelListLifeCycle[item].autoCompleteDataSteerBrand == undefined || this.modelListLifeCycle[item].autoCompleteDataDriveBrand == undefined ||
  //       this.modelListLifeCycle[item].autoCompleteDataTireSteer == undefined || this.modelListLifeCycle[item].autoCompleteDataTireDrive == undefined ||
  //       this.modelListLifeCycle[item].blendedAverageSteerFirstLife == undefined || this.modelListLifeCycle[item].blendedAverageDriveFirstLife == undefined ||
  //       this.modelListLifeCycle[item].blendedAverageSteerSecondLife == undefined ||
  //       this.modelListLifeCycle[item].blendedAverageDriveSecondLife == undefined
  //         || this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife == undefined ||
  //         this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife == undefined ||
  //         this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife == undefined ||
  //         this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife == "" || this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife == undefined ||
  //         this.modelListLifeCycle[item].steerRunoutMilesSecondLife == 0 || this.modelListLifeCycle[item].driveRunoutMilesSecondLife == 0 ||  this.modelListLifeCycle[item].steerRunoutMilesSecondLife == 0
  //         || this.modelListLifeCycle[item].driveRunoutMilesSecondLife == 0
  //
  //       || (this.trailerShow && (this.modelListLifeCycle[item].blendedAverageTrailerFirstLife == undefined || this.modelListLifeCycle[item].blendedAverageTrailerSecondLife == undefined))
  //
  //       || (this.nondrivenShow && (this.modelListLifeCycle[item].blendedAverageNondrivenFirstLife == undefined || this.modelListLifeCycle[item].blendedAverageNondrivenSecondLife == undefined))
  //
  //       || (this.trailerShow && (this.modelListLifeCycle[item].autoCompleteDataTrailerBrand == undefined || this.modelListLifeCycle[item].autoCompleteDataTrailerBrand == ""
  //         || this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife == undefined || this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife == ""
  //        || this.modelListLifeCycle[item].autoCompleteDataTireTrailer == undefined || this.modelListLifeCycle[item].autoCompleteDataTireTrailer == "" || this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife == "" ||
  //       this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife == undefined
  //       || this.modelListLifeCycle[item].trailerTirePrice == 0 || this.modelListLifeCycle[item].trailerTirePriceSecondLife == 0 ||this.modelListLifeCycle[item].trailerRunoutMiles == 0 || this.modelListLifeCycle[item].trailerRunoutMilesSecondLife == 0))
  //
  //
  //       || (this.nondrivenShow && (this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand == "" || this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife == "" ||this.modelListLifeCycle[item].autoCompleteDataTireNondriven == "" || this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife == "" ||
  //       this.modelListLifeCycle[0].nondrivenTirePrice == 0 || this.modelListLifeCycle[0].nondrivenTirePriceSecondLife == 0 || this.modelListLifeCycle[0].nondrivenRunoutMiles == 0 || this.modelListLifeCycle[0].nondrivenRunoutMilesSecondLife == 0 || this.modelListLifeCycle[0].autoCompleteDataTireNondriven == undefined || this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand == undefined || this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife == undefined || this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife == undefined))
  //     ) {
  //       return false;
  //     }
  //
  //   }
  //   return true;
  //
  // }


  handleAddScenario(){

    this.translateService.get(['complete_scenario_alert','dismiss','cancel']).subscribe(text => {

      let alert = this.alertCtrl.create({
        subTitle: text['complete_scenario_alert'],
        buttons: [ {
          text: text['dismiss'],
          role: text['cancel'],
          handler: () => {
            if(this.currentTab == 2){
              this.addBackgroundColorToSecondLifeWhenDataisIncomplete()
            }else if(this.currentTab == 1){
              this.addBackgroundColorToFirstLifeWhenDataisIncomplete()
            }
          }
        },]
      });
      alert.present();
    });
   
  }




  showHelpModal(){

    var modal = this.modalCtrl.create(HelpPage);
    modal.present();

  }


  openWeightSavingPage(){

    if(!this.checkValidBlendedAverage()){
      this.handleAddScenario();
      return;
    }

    this.saveInfo();

    localStorage.removeItem('steerSaved');
    localStorage.removeItem('driveSaved');
    localStorage.removeItem('nondrivenSaved');
    localStorage.removeItem('trailerSaved');

    var jumpWeightSavingPage = true;

    var treadSizeMap = JSON.parse(localStorage.getItem('treadSizeMap'));



    for(var item in this.modelListLifeCycle){

      if( treadSizeMap[this.modelListLifeCycle[item].autoCompleteDataTireDrive] == null){
        jumpWeightSavingPage = true;
        break;
      }

      if(this.modelListLifeCycle[item].autoCompleteDataTireDrive.toUpperCase().indexOf('X ONE') != -1){
        jumpWeightSavingPage = false;
        break;
      }


      if(this.trailerShow){


        if( treadSizeMap[this.modelListLifeCycle[item].autoCompleteDataTireTrailer] == null){
          jumpWeightSavingPage = true;
          break;
        }


        if(this.modelListLifeCycle[item].autoCompleteDataTireTrailer.toUpperCase().indexOf('X ONE') != -1){
          jumpWeightSavingPage = false;
          break;
        }

      }

      if(this.nondrivenShow){

        if(this.modelListLifeCycle[item].autoCompleteDataTireNondriven == null){
          jumpWeightSavingPage = true;

          break;
        }

        if(this.modelListLifeCycle[item].autoCompleteDataTireNondriven.toUpperCase().indexOf('X ONE') != -1){

          jumpWeightSavingPage = false;

          break;

        }


      }


    }



    if(this.drivecheckboxlifecyclenew == false && (this.nondrivenShow == false || (this.nondrivenShow && this.nondrivencheckboxlifecyclenew == false)) && (this.trailerShow == false || (this.trailerShow && this.trailercheckboxlifecyclenew == false)))
    {

      jumpWeightSavingPage = true;

    }





    if( localStorage.getItem("weightSavingToggle") != null){

      var data = localStorage.getItem("weightSavingToggle") == 'true' ? true :false;

      if(data == false){
        this.myApp.getRootNav().setRoot(TabsResultPage, {trailerShow: this.trailerShow, nondrivenShow:this.nondrivenShow, proposedNum: this.items.length, isFromBasicAnalysis:false, data:this.modelListLifeCycle});
      }else{

        jumpWeightSavingPage = true;

        if(!jumpWeightSavingPage) {

          this.navCtrl.push(WeightSavingPage, {
            weightSaving: localStorage.getItem("weightSaving"),
            trailerShow: this.trailerShow,
            nondrivenShow: this.nondrivenShow,
            proposedNum: this.items.length,
            isFromBasicAnalysis: false,
            data: this.modelListLifeCycle
          });

          localStorage.setItem('wightSavingReceivedData', JSON.stringify(this.modelListLifeCycle));


        }else{
          localStorage.setItem("calculateWeight", 'false');
          this.myApp.getRootNav().setRoot(TabsResultPage, {trailerShow: this.trailerShow, nondrivenShow:this.nondrivenShow, proposedNum: this.items.length, isFromBasicAnalysis:false, data:this.modelListLifeCycle});
        }
      }
    }



    // this.storage.get("weightSavingToggle").then(
    //   (data) => {
    //     if(data == false){
    //       this.myApp.getRootNav().setRoot(TabsResultPage, {trailerShow: this.trailerShow, nondrivenShow:this.nondrivenShow, proposedNum: this.items.length, isFromBasicAnalysis:false, data:this.modelListLifeCycle})
    //     }else{
    //       this.storage.get("weightSaving").then(
    //         (data)=>{
    //           if(jumpWeightSavingPage == false) {
    //
    //             this.navCtrl.push(WeightSavingPage, {
    //               weightSaving: data,
    //               trailerShow: this.trailerShow,
    //               nondrivenShow: this.nondrivenShow,
    //               proposedNum: this.items.length,
    //               isFromBasicAnalysis: false,
    //               data: this.modelListLifeCycle
    //             });
    //           }else{
    //             localStorage.setItem("calculateWeight", 'false');
    //             this.myApp.getRootNav().setRoot(TabsResultPage, {trailerShow: this.trailerShow, nondrivenShow:this.nondrivenShow, proposedNum: this.items.length, isFromBasicAnalysis:false, data:this.modelListLifeCycle});
    //           }
    //         }
    //       )
    //     }
    //   }
    // )

  }

  showTotalBaseRollingResistance(){
    var modal = this.modalCtrl.create(HelpPage, {passedinData: "rollingResistance"});
    modal.present();
  }


  addBackgroundColorToSecondLifeWhenDataisIncomplete(){

    for(var item in this.items) {


      if(this.steercheckboxlifecyclenew){

        document.getElementById(this.titles[item] +this.lifeCycle+ "steerBrand").style.background = (this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataSteerBrandSecondLife != undefined) ? 'white' : 'red';
        this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "steerBrand");
        document.getElementById(this.titles[item] +this.lifeCycle+ "steerTire").style.background = (this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife != undefined) ? 'white' : 'red';
        this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "steerTire");
        if(this.mileage_calculation_toggle) {
          document.getElementById(this.titles[item] + this.lifeCycle + "steerRunout").style.background = (this.modelListLifeCycle[item].steerRunoutMilesSecondLife != 0) ? 'white' : 'red';
          this.scrolltoPosition(this.titles[item] + this.lifeCycle + "steerRunout");
          document.getElementById(this.titles[item] + this.lifeCycle + "steerTirePrice").style.background = (this.modelListLifeCycle[item].steerTirePriceSecondLife != 0) ? 'white' : 'red';
          this.scrolltoPosition(this.titles[item] + this.lifeCycle + "steerTirePrice");
        }
        // if(this.fuel_calculation_toggle) {
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'steerRollingResistance').style.background = (this.modelListLifeCycle[item].steerBaseRollingResistanceSecondLife != 0) ? 'white' : 'red';
        //   this.scrolltoPosition(this.titles[item] + this.lifeCycle + 'steerRollingResistance');
        // }

      }


     if(this.drivecheckboxlifecyclenew){

       document.getElementById(this.titles[item] +this.lifeCycle+ "driveBrand").style.background = (this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataDriveBrandSecondLife != undefined) ? 'white' : 'red';
       this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "driveBrand");

       document.getElementById(this.titles[item] +this.lifeCycle+ "driveTire").style.background = (this.modelListLifeCycle[item].autoCompleteDataTireDriveSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataTireSteerSecondLife != undefined) ? 'white' : 'red';
       this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "driveTire");


       if(this.mileage_calculation_toggle) {
         document.getElementById(this.titles[item] + this.lifeCycle + "driveRunout").style.background = (this.modelListLifeCycle[item].driveRunoutMilesSecondLife != 0) ? 'white' : 'red';
         this.scrolltoPosition(this.titles[item] + this.lifeCycle + "driveRunout");


         document.getElementById(this.titles[item] + this.lifeCycle + "driveTirePrice").style.background = (this.modelListLifeCycle[item].driveTirePriceSecondLife != 0) ? 'white' : 'red';
         this.scrolltoPosition(this.titles[item] + this.lifeCycle + "driveTirePrice");
       }

       // if(this.fuel_calculation_toggle) {
       //   document.getElementById(this.titles[item] + this.lifeCycle + 'driveRollingResistance').style.background = (this.modelListLifeCycle[item].driveBaseRollingResistanceSecondLife != 0) ? 'white' : 'red';
       //   this.scrolltoPosition(this.titles[item] + this.lifeCycle + 'driveRollingResistance');
       // }


     }


      // document.getElementById(this.titles[item] +this.lifeCycle+ 'totalRollingResistance').style.background = (this.modelListLifeCycle[item].totalRollingResistanceSecondLife != 0) ? 'white' : 'red';

      this.scrolltoPosition(this.titles[item] +this.lifeCycle+ 'totalRollingResistance');


      if (this.nondrivencheckboxlifecyclenew && this.nondrivenShow) {
        document.getElementById(this.titles[item] +this.lifeCycle +  "nondrivenBrand").style.background = (this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataNondrivenBrandSecondLife != null) ? 'white' : 'red';

        this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "nondrivenBrand");

        document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenTire").style.background = (this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataTireNondrivenSecondLife != null) ? 'white' : 'red';

        this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "nondrivenTire");

        if(this.mileage_calculation_toggle) {

          document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenRunout").style.background = (this.modelListLifeCycle[item].nondrivenRunoutMilesSecondLife != 0) ? 'white' : 'red';

          this.scrolltoPosition(this.titles[item] + this.lifeCycle + "nondrivenRunout");

          document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenTirePrice").style.background = (this.modelListLifeCycle[item].nondrivenTirePriceSecondLife != 0) ? 'white' : 'red';

          this.scrolltoPosition(this.titles[item] + this.lifeCycle + "nondrivenTirePrice");
        }

        // if(this.fuel_calculation_toggle) {
        //
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'nondrivenRollingResistance').style.background = (this.modelListLifeCycle[item].nondrivenBaseRollingResistanceSecondLife != 0) ? 'white' : 'red';
        //
        //   this.scrolltoPosition(this.titles[item] + this.lifeCycle + 'nondrivenRollingResistance');
        // }
      }


      if (this.trailercheckboxlifecyclenew && this.trailerShow) {
        document.getElementById(this.titles[item] + this.lifeCycle +  "trailerBrand").style.background = (this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataTrailerBrandSecondLife != undefined) ? 'white' : 'red';

        this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "trailerBrand");

        document.getElementById(this.titles[item] + this.lifeCycle + "trailerTire").style.background = (this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife != "" && this.modelListLifeCycle[item].autoCompleteDataTireTrailerSecondLife != undefined) ? 'white' : 'red';

        this.scrolltoPosition(this.titles[item] +this.lifeCycle+ "trailerTire");

        if(this.mileage_calculation_toggle) {

          document.getElementById(this.titles[item] + this.lifeCycle + "trailerRunout").style.background = (this.modelListLifeCycle[item].trailerRunoutMilesSecondLife != 0) ? 'white' : 'red';

          this.scrolltoPosition(this.titles[item] + this.lifeCycle + "trailerRunout");

          document.getElementById(this.titles[item] + this.lifeCycle + "trailerTirePrice").style.background = (this.modelListLifeCycle[item].trailerTirePriceSecondLife != 0) ? 'white' : 'red';

          this.scrolltoPosition(this.titles[item] + this.lifeCycle + "trailerTirePrice");
        }

        // if(this.fuel_calculation_toggle) {
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'trailerRollingResistance').style.background = (this.modelListLifeCycle[item].trailerBaseRollingResistanceSecondLife != 0) ? 'white' : 'red';
        //
        //   this.scrolltoPosition(this.titles[item] + this.lifeCycle + 'trailerRollingResistance');
        // }

      }
    }

  }


  addBackgroundColorToFirstLifeWhenDataisIncomplete(){

    for(var item in this.items) {

      if(this.steercheckboxlifecyclenew){
        document.getElementById(this.titles[item] + this.lifeCycle + "steerBrand").style.background = (this.modelListLifeCycle[item].autoCompleteDataSteerBrand != "" && this.modelListLifeCycle[item].autoCompleteDataSteerBrand != undefined) ? 'white' : 'red';
        document.getElementById(this.titles[item] + this.lifeCycle + "steerTire").style.background = (this.modelListLifeCycle[item].autoCompleteDataTireSteer != "" && this.modelListLifeCycle[item].autoCompleteDataTireSteer != undefined) ? 'white' : 'red';

        if(this.mileage_calculation_toggle) {
          document.getElementById(this.titles[item] + this.lifeCycle + "steerRunout").style.background = (this.modelListLifeCycle[item].steerRunoutMiles != 0) ? 'white' : 'red';
          document.getElementById(this.titles[item] + this.lifeCycle + "steerTirePrice").style.background = (this.modelListLifeCycle[item].steerTirePrice != 0) ? 'white' : 'red';
        }

        // if(this.fuel_calculation_toggle) {
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'steerRollingResistance').style.background = this.modelListLifeCycle[item].steerBaseRollingResistance ? 'white' : 'red';
        // }


      }

      if(this.drivecheckboxlifecyclenew){

        document.getElementById(this.titles[item] + this.lifeCycle + "driveBrand").style.background = (this.modelListLifeCycle[item].autoCompleteDataDriveBrand != "" && this.modelListLifeCycle[item].autoCompleteDataDriveBrand != undefined) ? 'white' : 'red';
        document.getElementById(this.titles[item] + this.lifeCycle + "driveTire").style.background = (this.modelListLifeCycle[item].autoCompleteDataTireDrive != "" && this.modelListLifeCycle[item].autoCompleteDataTireDrive != undefined) ? 'white' : 'red';

        if(this.mileage_calculation_toggle) {
          document.getElementById(this.titles[item] + this.lifeCycle + "driveRunout").style.background = (this.modelListLifeCycle[item].driveRunoutMiles != 0) ? 'white' : 'red';
          document.getElementById(this.titles[item] + this.lifeCycle + "driveTirePrice").style.background = (this.modelListLifeCycle[item].driveTirePrice != 0) ? 'white' : 'red';
        }

        // if(this.fuel_calculation_toggle) {
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'driveRollingResistance').style.background = this.modelListLifeCycle[item].driveBaseRollingResistance ? 'white' : 'red';
        // }


      }


      // document.getElementById(this.titles[item] + this.lifeCycle + 'totalRollingResistance').style.background = this.modelListLifeCycle[item].totalRollingResistance ? 'white' : 'red';


      if (this.nondrivencheckboxlifecyclenew && this.nondrivenShow) {
        document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenBrand").style.background = this.modelListLifeCycle[item].autoCompleteDataNondrivenBrand ? 'white' : 'red';
        document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenTire").style.background = this.modelListLifeCycle[item].autoCompleteDataTireNondriven ? 'white' : 'red';

        if(this.mileage_calculation_toggle) {
          document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenRunout").style.background = this.modelListLifeCycle[item].nondrivenRunoutMiles ? 'white' : 'red';
          document.getElementById(this.titles[item] + this.lifeCycle + "nondrivenTirePrice").style.background = this.modelListLifeCycle[item].nondrivenTirePrice ? 'white' : 'red';
        }

        // if(this.fuel_calculation_toggle) {
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'nondrivenRollingResistance').style.background = this.modelListLifeCycle[item].nondrivenBaseRollingResistance ? 'white' : 'red';
        // }

      }


      if (this.trailercheckboxlifecyclenew && this.trailerShow) {
        document.getElementById(this.titles[item] + this.lifeCycle + "trailerBrand").style.background = this.modelListLifeCycle[item].autoCompleteDataTrailerBrand ? 'white' : 'red';
        document.getElementById(this.titles[item] + this.lifeCycle + "trailerTire").style.background = this.modelListLifeCycle[item].autoCompleteDataTireTrailer ? 'white' : 'red';

        if(this.mileage_calculation_toggle) {
          document.getElementById(this.titles[item] + this.lifeCycle + "trailerRunout").style.background = this.modelListLifeCycle[item].trailerRunoutMiles ? 'white' : 'red';
          document.getElementById(this.titles[item] + this.lifeCycle + "trailerTirePrice").style.background = this.modelListLifeCycle[item].trailerTirePrice ? 'white' : 'red';
        }

        // if(this.fuel_calculation_toggle) {
        //   document.getElementById(this.titles[item] + this.lifeCycle + 'trailerRollingResistance').style.background = this.modelListLifeCycle[item].trailerBaseRollingResistance ? 'white' : 'red';
        // }

      }

    }
  }


  loadData(data){
    if(data != null && data != undefined){

      this.modelListLifeCycle = JSON.parse(data);

      for(var i = 0; i < this.modelListLifeCycle.length; i++){
        if(i > 1){
          this.items.push(i);
          this.translateService.get(['proposed_tire']).subscribe(text => {
            this.titles.push(text['proposed_tire']+i);
          })

        }
      }
    }
  }

  onChangeAverage($event, name){
    switch(name){
      case "steerFirstLife":
        for(var i = 0 ; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageSteerSecondLife = this.percentageMap[$event];
          }else if (i > 0){
            this.modelListLifeCycle[i].blendedAverageSteerSecondLife = this.modelListLifeCycle[0].blendedAverageSteerSecondLife;
            this.modelListLifeCycle[i].blendedAverageSteerFirstLife = this.modelListLifeCycle[0].blendedAverageSteerFirstLife;
          }
        }
        break;
      case "steerSecondLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageSteerFirstLife = this.percentageMap[$event];
          }else if( i > 0){
            this.modelListLifeCycle[i].blendedAverageSteerFirstLife = this.modelListLifeCycle[0].blendedAverageSteerFirstLife;
            this.modelListLifeCycle[i].blendedAverageSteerSecondLife = this.modelListLifeCycle[0].blendedAverageSteerSecondLife;
          }
        }
        break;
      case "driveFirstLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageDriveSecondLife = this.percentageMap[$event];
          }else if (i > 0){
            this.modelListLifeCycle[i].blendedAverageDriveSecondLife = this.modelListLifeCycle[0].blendedAverageDriveSecondLife;
            this.modelListLifeCycle[i].blendedAverageDriveFirstLife = this.modelListLifeCycle[0].blendedAverageDriveFirstLife;

          }
        }
        break;
      case "driveSecondLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageDriveFirstLife = this.percentageMap[$event];
          }else if(i > 0){
            this.modelListLifeCycle[i].blendedAverageDriveFirstLife = this.modelListLifeCycle[0].blendedAverageDriveFirstLife;
            this.modelListLifeCycle[i].blendedAverageDriveSecondLife = this.modelListLifeCycle[0].blendedAverageDriveSecondLife;
          }
        }
        break;

      case "nondrivenFirstLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageNondrivenSecondLife = this.percentageMap[$event];
          }else if(i > 0){
            this.modelListLifeCycle[i].blendedAverageNondrivenSecondLife  = this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife;
            this.modelListLifeCycle[i].blendedAverageNondrivenFirstLife  = this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife;
          }
        }
        break;
      case "nondrivenSecondLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageNondrivenFirstLife = this.percentageMap[$event];
          }else if(i > 0){
            this.modelListLifeCycle[i].blendedAverageNondrivenFirstLife = this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife;
            this.modelListLifeCycle[i].blendedAverageNondrivenSecondLife = this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife;
          }
        }
        break;
      case "trailerFirstLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageTrailerSecondLife = this.percentageMap[$event];
          }else if (i > 0){
            this.modelListLifeCycle[i].blendedAverageTrailerSecondLife = this.modelListLifeCycle[0].blendedAverageTrailerSecondLife;
            this.modelListLifeCycle[i].blendedAverageTrailerFirstLife = this.modelListLifeCycle[0].blendedAverageTrailerFirstLife;
          }
        }
        break;
      case "trailerSecondLife":
        for(var i = 0; i < this.items.length; i++){
          if(i == 0){
            this.modelListLifeCycle[i].blendedAverageTrailerFirstLife = this.percentageMap[$event];
          }else if (i > 0){
            this.modelListLifeCycle[i].blendedAverageTrailerFirstLife = this.modelListLifeCycle[0].blendedAverageTrailerFirstLife;
            this.modelListLifeCycle[i].blendedAverageTrailerSecondLife = this.modelListLifeCycle[0].blendedAverageTrailerSecondLife;
          }
        }
        break;

    }




  }

  scrolltoPosition(name){
    if(document.getElementById(name).style.background == 'red'){
      document.getElementById(name).scrollIntoView();
    }
  }



  showAutocompleteModalPercentage(value, name){

    let modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.percentages});

    modal.onDidDismiss(data => {
        if(name == 'steerFirstLife'){
          this.modelListLifeCycle[0].blendedAverageSteerFirstLife = data;
          this.modelListLifeCycle[0].blendedAverageSteerSecondLife = this.percentageMap[data];

        }

        if(name == 'steerSecondLife'){
          this.modelListLifeCycle[0].blendedAverageSteerSecondLife = data;
          this.modelListLifeCycle[0].blendedAverageSteerFirstLife = this.percentageMap[data];
        }



      if(name == 'driveFirstLife'){
        this.modelListLifeCycle[0].blendedAverageDriveFirstLife = data;
        this.modelListLifeCycle[0].blendedAverageDriveSecondLife = this.percentageMap[data];

      }

      if(name == 'driveSecondLife'){
        this.modelListLifeCycle[0].blendedAverageDriveSecondLife = data;
        this.modelListLifeCycle[0].blendedAverageDriveFirstLife = this.percentageMap[data];
      }


      if(name == 'trailerFirstLife'){
        this.modelListLifeCycle[0].blendedAverageTrailerFirstLife = data;
        this.modelListLifeCycle[0].blendedAverageTrailerSecondLife = this.percentageMap[data];

      }

      if(name == 'trailerSecondLife'){
        this.modelListLifeCycle[0].blendedAverageTrailerSecondLife = data;
        this.modelListLifeCycle[0].blendedAverageTrailerFirstLife = this.percentageMap[data];
      }

      if(name == 'nondrivenFirstLife'){
        this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife = data;
        this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife = this.percentageMap[data];

      }

      if(name == 'nondrivenSecondLife'){
        this.modelListLifeCycle[0].blendedAverageNondrivenSecondLife = data;
        this.modelListLifeCycle[0].blendedAverageNondrivenFirstLife = this.percentageMap[data];
      }


    });


    modal.present();


    }



  onCheckboxChange($event, name){
    // this.saveInfo();

    switch (name){
      case 'steer':
        for(var item in this.items){
          document.getElementById(this.titles[item]+ 'firstLife' + "steerBrand").style.background =  'white';
          document.getElementById(this.titles[item]+'firstLife' +"steerTire").style.background =  'white' ;

          if(this.mileage_calculation_toggle) {
            document.getElementById(this.titles[item] + 'firstLife' + "steerRunout").style.background = 'white';
            document.getElementById(this.titles[item] + 'firstLife' + "steerTirePrice").style.background = 'white';
          }

          if(this.fuel_calculation_toggle) {
            document.getElementById(this.titles[item] + 'firstLife' + 'steerRollingResistance').style.background = 'white';
          }


          // document.getElementById(this.titles[item] +'secondLife'+ "steerBrand").style.background =  'white' ;
          // document.getElementById(this.titles[item] +'secondLife'+ "steerTire").style.background = 'white' ;
          // document.getElementById(this.titles[item] +'secondLife'+ "steerRunout").style.background =  'white';
          // document.getElementById(this.titles[item] +'secondLife'+ "steerTirePrice").style.background =  'white';
          // document.getElementById(this.titles[item] + 'secondLife'+ 'steerRollingResistance').style.background = 'white';


        }
        break;

      case 'drive':
        for(var item in this.items){
          document.getElementById(this.titles[item]+'firstLife' +"driveBrand").style.background = 'white';
          document.getElementById(this.titles[item]+'firstLife' +"driveTire").style.background =  'white';

          if(this.mileage_calculation_toggle) {
            document.getElementById(this.titles[item] + 'firstLife' + "driveRunout").style.background = 'white';
            document.getElementById(this.titles[item] + 'firstLife' + "driveTirePrice").style.background = 'white';
          }

          if(this.fuel_calculation_toggle) {
            document.getElementById(this.titles[item] + 'firstLife' + 'driveRollingResistance').style.background = 'white';
          }




          // document.getElementById(this.titles[item] +'secondLife'+ "driveBrand").style.background =  'white' ;
          // document.getElementById(this.titles[item] +'secondLife'+ "driveTire").style.background =  'white' ;
          // document.getElementById(this.titles[item] +'secondLife'+ "driveRunout").style.background = 'white' ;
          // document.getElementById(this.titles[item] +'secondLife'+ "driveTirePrice").style.background = 'white' ;
          // document.getElementById(this.titles[item] +'secondLife'+ 'driveRollingResistance').style.background =  'white';




        }

        break;

      case 'nondriven':
        if(this.nondrivenShow){

          for (var item in this.items){

            document.getElementById(this.titles[item]+'firstLife' +"nondrivenBrand").style.background =  'white' ;
            document.getElementById(this.titles[item]+'firstLife' +"nondrivenTire").style.background ='white';

            if(this.mileage_calculation_toggle) {
              document.getElementById(this.titles[item] + 'firstLife' + "nondrivenRunout").style.background = 'white';
              document.getElementById(this.titles[item] + 'firstLife' + "nondrivenTirePrice").style.background = 'white';
            }

            if(this.fuel_calculation_toggle) {
              document.getElementById(this.titles[item] + 'firstLife' + 'nondrivenRollingResistance').style.background = 'white';
            }



            // document.getElementById(this.titles[item] +'secondLife' +  "nondrivenBrand").style.background =  '#EEEEEE' ;
            // document.getElementById(this.titles[item] + 'secondLife' + "nondrivenTire").style.background = '#EEEEEE';
            // document.getElementById(this.titles[item] + 'secondLife' +  "nondrivenRunout").style.background =  '#EEEEEE';
            // document.getElementById(this.titles[item] + 'secondLife' + "nondrivenTirePrice").style.background = '#EEEEEE';
            // document.getElementById(this.titles[item] + 'secondLife' +  'nondrivenRollingResistance').style.background = '#EEEEEE';
          }




        }

        break;

      case 'trailer':
        if(this.trailerShow){

          for(var item in this.items){

            document.getElementById(this.titles[item]+'firstLife' +"trailerBrand").style.background =   'white' ;
            document.getElementById(this.titles[item]+'firstLife' +"trailerTire").style.background =  'white' ;

            if(this.mileage_calculation_toggle) {
              document.getElementById(this.titles[item] + 'firstLife' + "trailerRunout").style.background = 'white';
              document.getElementById(this.titles[item] + 'firstLife' + "trailerTirePrice").style.background = 'white';
            }

            if(this.fuel_calculation_toggle) {
              document.getElementById(this.titles[item] + 'firstLife' + 'trailerRollingResistance').style.background = 'white';
            }




            // document.getElementById(this.titles[item] + 'secondLife' +  "trailerBrand").style.background = '#EEEEEE' ;
            // document.getElementById(this.titles[item] + 'secondLife' + "trailerTire").style.background =  '#EEEEEE';
            // document.getElementById(this.titles[item] + 'secondLife' + "trailerRunout").style.background =  '#EEEEEE';
            // document.getElementById(this.titles[item] + 'secondLife' + "trailerTirePrice").style.background = '#EEEEEE';
            // document.getElementById(this.titles[item] + 'secondLife' + 'trailerRollingResistance').style.background = '#EEEEEE';

          }



        }
        break;
    }

  }


  removeLifecycleScenario(){
    if (this.modelListLifeCycle.length > 2)
    {
        this.modelListLifeCycle.pop();
        this.items.pop();
    }
  }


}



