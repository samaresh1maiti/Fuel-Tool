import { Component } from '@angular/core';
import {AlertController, App, ModalController, NavController, NavParams} from 'ionic-angular';
import {TabsResultPage} from "../tabs-result/tabs-result";
import {WeightSavingModel} from "../../app/models/WeightSavingModel";
import {Storage} from '@ionic/storage';
import {Http, Response} from '@angular/http'
import {AutocompletePagePage} from "../autocomplete-page/autocomplete-page";
import { TranslateService } from '@ngx-translate/core';


/*
  Generated class for the WeightSaving page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weight-saving',
  templateUrl: 'weight-saving.html'
})
export class WeightSavingPage {

  payLoadNames = [ 'Gasoine(average) - 6.19 lbs'];
  selectedPayLoad = this.payLoadNames[0];


  weightSavingObj :WeightSavingModel;
  trailerShow = true;
  nondrivenShow = true;


  weightChoice = 'false';

  proposedNum = 1;

  revenuePerUnit = 0;
  loadsPerWeek = 0;

  items = [1];

  isFromBasicAnalysis

  isCheckValidScenario = false;

  data=[];

  tireSizeCurrentDrive = ['Select a size', '275/80R22.5',  '287/70R19.5'];
  tireSizeCurrentNondriven = ['Select a size', '275/80R22.5', '275/80R24.5', '11R22.5', '11R24.5', '12R22.5'];
  tireSizeCurrentTrailer = ['Select a size', '275/80R22.5', '275/80R24.5', '11R22.5', '11R24.5'];

  tireSizeProposed = ['Select a size','445/50r22.5'];

  wheelType225 = ['Select a wheel', '12.25" x 22.5" alum', '12.25" x 22.5" steel', '13.00" x 22.5" alum', '13.00" x 22.5" steel', '14.00" x 22.5" alum',
  '14.00" x 22.5" alum. lightweight', '14.00" x 22.5" steel', '8.25" x 22.5" alum', '8.25" x 22.5" steel', '9.00" x 22.5" alum', '9.00" x 22.5" steel'];

  wheelType195 = ['Select a wheel', '7.50" x 19.5" alum', '7.50" x 19.5" steel', '8.25" x 19.5" alum', '8.25" x 19.5" steel'];

  wheelType245 = ['Select a wheel', '8.25" x 24.5" alum', '8.25" x 24.5" steel'];

  tireWheelTypeDic = {};

  wheelWeight = {};

  treadSizeWeightMap = {};

  sizeArray = [];



  treadSizeMap = {};

  modelList = [];

  drivecheckboxnew = true;
  nondrivencheckboxnew = true;
  trailercheckboxnew = true;

  totalColumnNum = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public alertCtrl:AlertController, private app:App, public http:Http, private modalCtrl:ModalController,public translateService : TranslateService) {

    this.weightSavingObj = JSON.parse(navParams.get("weightSaving"));
    this.tireWheelTypeDic['275/80R22.5'] = this.wheelType225;
    this.tireWheelTypeDic['11R22.5'] = this.wheelType225;
    this.tireWheelTypeDic['445/50R22.5'] = this.wheelType225;
    this.tireWheelTypeDic['287/70R19.5'] = this.wheelType195;
    this.tireWheelTypeDic['275/80R24.5'] = this.wheelType245;
    this.tireWheelTypeDic['11R24.5'] = this.wheelType245;
    this.tireWheelTypeDic['12R22.5'] = this.wheelType225;
    this.tireWheelTypeDic['255/70R22.5'] = this.wheelType225;
    this.tireWheelTypeDic['285/70R19.5'] = this.wheelType195;
    this.tireWheelTypeDic['Select a size'] = ['Select a wheel type'];




    if(this.weightSavingObj == undefined || this.weightSavingObj == null){
      this.weightSavingObj = new WeightSavingModel("weightSaving");
    }




    this.trailerShow = navParams.get("trailerShow");
    this.nondrivenShow = navParams.get("nondrivenShow");
    this.proposedNum = navParams.get("proposedNum");
    this.isFromBasicAnalysis = navParams.get('isFromBasicAnalysis');
    this.data = navParams.get('data');


    if(localStorage.getItem('drivecheckboxnewbasic') != null && localStorage.getItem('drivecheckboxnewbasic') != undefined){
      this.drivecheckboxnew = localStorage.getItem('drivecheckboxnewbasic') == 'true' ? true: false;
    }

    if(this.nondrivenShow){
      if(localStorage.getItem('nondrivencheckboxnewbasic') != null && localStorage.getItem('nondrivencheckboxnewbasic') != undefined){
        this.nondrivencheckboxnew = localStorage.getItem('nondrivencheckboxnewbasic') == 'true' ? true: false;
      }
    }


    if(this.trailerShow){
      if(localStorage.getItem('trailercheckboxnewbasic') != null && localStorage.getItem('trailercheckboxnewbasic') != undefined){
        this.trailercheckboxnew = localStorage.getItem('trailercheckboxnewbasic') == 'true' ? true: false;
      }
    }


    if(this.drivecheckboxnew){
      this.totalColumnNum += 1;
    }

    if(this.nondrivenShow && this.nondrivencheckboxnew){
      this.totalColumnNum += 1;
    }

    if(this.trailercheckboxnew && this.trailerShow){
      this.totalColumnNum += 1;
    }



    console.log(this.data);

    for (var i = 2; i < this.proposedNum; i++){
      this.items.push(i);
    }


    this.wheelWeight['12.25" x 22.5" alum'] = 67;
    this.wheelWeight['12.25" x 22.5" steel'] = 126;
    this.wheelWeight['13.00" x 22.5" alum'] = 68;
    this.wheelWeight['13.00" x 22.5" steel'] = 129;
    this.wheelWeight['14.00" x 22.5" alum'] = 71;
    this.wheelWeight['14.00" x 22.5" alum. lightweight'] = 52;
    this.wheelWeight['14.00" x 22.5" steel'] = 125;
    this.wheelWeight['7.50" x 19.5" alum'] = 38;
    this.wheelWeight['7.50" x 19.5" steel']  = 65;
    this.wheelWeight['8.25" x 19.5" alum'] = 39;
    this.wheelWeight['8.25" x 19.5" steel'] = 74;
    this.wheelWeight['8.25" x 22.5" alum'] = 47;
    this.wheelWeight['8.25" x 22.5" steel'] = 82;
    this.wheelWeight['8.25" x 24.5" alum'] = 55;
    this.wheelWeight['8.25" x 24.5" steel'] = 91;
    this.wheelWeight['9.00" x 22.5" alum'] = 62;
    this.wheelWeight['9.00" x 22.5" steel'] = 107;


    localStorage.setItem('wheelWeightDict', JSON.stringify(this.wheelWeight));




    this.http.get('assets/api/treadSpec.json').map((res: Response) => res.json()).subscribe(
      res => {
        for(var i = 0; i < res.length; i++) {

          this.treadSizeWeightMap[res[i].tread.toUpperCase() + ' ' + res[i].size.toUpperCase()] = res[i].weight;
          if(this.treadSizeMap[res[i].tread.toUpperCase()] == null){
            this.treadSizeMap[res[i].tread.toUpperCase()] = [];
            this.treadSizeMap[res[i].tread.toUpperCase()].push(res[i].size);
          }else{
            if(this.treadSizeMap[res[i].tread.toUpperCase()].indexOf(res[i].size) == -1){
              this.treadSizeMap[res[i].tread.toUpperCase()].push(res[i].size);
            }
          }


          if(this.sizeArray.indexOf(res[i].size) == -1){
            this.sizeArray.push(res[i].size);
          }



        }
        console.log(this.sizeArray);

        localStorage.setItem("treadSizeWeightMap", JSON.stringify(this.treadSizeWeightMap));



      }

    );



    this.http.get('assets/api/payload.json').map((res: Response) => res.json()).subscribe(
      res => {
        for(var i = 0; i < res.length; i++) {

          this.payLoadNames.push(res[i].name);
        }

        localStorage.setItem("payloadNames", JSON.stringify(this.payLoadNames));

      }

    );




    setTimeout(()=>{


      // console.log(this.weightSavingObj);

      this.data =  JSON.parse(localStorage.getItem('wightSavingReceivedData'));

      if(this.weightSavingObj.selectedPayload == ""){
        this.weightSavingObj.selectedPayload = this.payLoadNames[0];
      }


      this.treadSizeMap = JSON.parse(localStorage.getItem('treadSizeMap'));

      if(this.weightSavingObj.currentDriveTireSize == "" && this.data[0].autoCompleteDataTireDrive == 'XDN2'){
        this.weightSavingObj.currentDriveTireSize = '275/80R22.5';
        this.weightSavingObj.currentDriveWheelType = '8.25" x 22.5" steel';
      } else if(this.weightSavingObj.currentDriveTireSize == "") {
        if( this.treadSizeMap[this.data[0].autoCompleteDataTireDrive] != null) {
          this.weightSavingObj.currentDriveTireSize = this.treadSizeMap[this.data[0].autoCompleteDataTireDrive][0];
        }else{
          this.weightSavingObj.currentDriveTireSize = this.tireSizeCurrentDrive[1];
        }
      }else if (this.weightSavingObj.currentDriveTireSize != "") {
        if(this.treadSizeMap[this.data[0].autoCompleteDataTireDrive].indexOf(this.weightSavingObj.currentDriveTireSize) == -1){
          if( this.treadSizeMap[this.data[0].autoCompleteDataTireDrive] != null) {
            this.weightSavingObj.currentDriveTireSize = this.treadSizeMap[this.data[0].autoCompleteDataTireDrive][0];
          }else{
            this.weightSavingObj.currentDriveTireSize = this.tireSizeCurrentDrive[1];
          }
        }

      }


      for(var item in this.items){

        if( this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize == "" && this.data[this.items[item]].autoCompleteDataTireDrive == 'X ONE LINE ENERGY D'){
          this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize = '445/50R22.5';
          this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveWheelType = '14.00" x 22.5" alum. lightweight';
        }

        else if( this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize == "") {
          if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireDrive] != null) {
            this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize = this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireDrive][0];
          }else{
            this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize =  this.tireSizeCurrentDrive[1];
          }

        }else if (this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize != "") {
          if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireDrive].indexOf(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize) == -1){
            if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireDrive] != null) {
              this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize = this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireDrive][0];
            }else{
              this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedDriveTireSize =  this.tireSizeCurrentDrive[1];
            }
          }

        }




        }

      if(this.trailerShow){
        console.log(this.data[0]);
        if(this.weightSavingObj.currentTrailerTireSize == "" && this.data[0].autoCompleteDataTireTrailer == 'X LINE ENERGY T'){
          this.weightSavingObj.currentTrailerTireSize = '275/80R22.5';
          this.weightSavingObj.currentTrailerWheelType = '8.25" x 22.5" steel';
        }else if(this.weightSavingObj.currentTrailerTireSize == "") {
          if(this.treadSizeMap[this.data[0].autoCompleteDataTireTrailer] != null) {
            this.weightSavingObj.currentTrailerTireSize = this.treadSizeMap[this.data[0].autoCompleteDataTireTrailer][0];
          }else{
            this.weightSavingObj.currentTrailerTireSize = this.tireSizeCurrentTrailer[1];
          }
        }else if (this.weightSavingObj.currentTrailerTireSize != "") {
          if(this.treadSizeMap[this.data[0].autoCompleteDataTireTrailer].indexOf(this.weightSavingObj.currentTrailerTireSize) == -1){
            if( this.treadSizeMap[this.data[0].autoCompleteDataTireTrailer] != null) {
              this.weightSavingObj.currentTrailerTireSize = this.treadSizeMap[this.data[0].autoCompleteDataTireTrailer][0];
            }else{
              this.weightSavingObj.currentTrailerTireSize = this.tireSizeCurrentTrailer[1];
            }
          }

        }


        for(var item in this.items){
          if(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize == "" && this.data[this.items[item]].autoCompleteDataTireTrailer == 'X ONE LINE ENERGY T'){
            this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize = '445/50R22.5';
            this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerWheelType = '14.00" x 22.5" alum. lightweight';
          }
         else if(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize == "") {
            if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireTrailer] != null) {
              this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize = this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireTrailer][0];
            }else{
              this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize = this.tireSizeCurrentTrailer[1];
            }
          }else if (this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize != "") {
            if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireTrailer].indexOf(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize) == -1){
              if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireTrailer] != null) {
                this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize = this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireTrailer][0];
              }else{
                this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedTrailerTireSize =  this.tireSizeCurrentTrailer[1];
              }
            }

          }
        }
      }

      if(this.nondrivenShow){
        if(this.weightSavingObj.currentNondrivenTireSize == "" && this.data[0].autoCompleteDataTireNondriven == 'XDN2'){
          this.weightSavingObj.currentNondrivenTireSize = '275/80R22.5';
          this.weightSavingObj.currentNondrivenWheelType = '8.25" x 22.5" steel';
        }else if(this.weightSavingObj.currentNondrivenTireSize == "") {
          if(this.treadSizeMap[this.data[0].autoCompleteDataTireNondriven] != null) {
            this.weightSavingObj.currentNondrivenTireSize = this.treadSizeMap[this.data[0].autoCompleteDataTireNondriven][0];
          }else{
            this.weightSavingObj.currentNondrivenTireSize = this.tireSizeCurrentNondriven[1];
          }
        }else if (this.weightSavingObj.currentNondrivenTireSize != "") {
          if(this.treadSizeMap[this.data[0].autoCompleteDataTireNondriven].indexOf(this.weightSavingObj.currentNondrivenTireSize) == -1){
            if( this.treadSizeMap[this.data[0].autoCompleteDataTireNondriven] != null) {
              this.weightSavingObj.currentNondrivenTireSize = this.treadSizeMap[this.data[0].autoCompleteDataTireNondriven][0];
            }else{
              this.weightSavingObj.currentNondrivenTireSize = this.tireSizeCurrentNondriven[1];
            }
          }

        }




        for(var item in this.items){

          if(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize == "" && this.data[this.items[item]].autoCompleteDataTireNondriven == 'X ONE LINE ENERGY D'){
            this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize = '445/50R22.5';
            this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenWheelType= '14.00" x 22.5" alum. lightweight';
          }
          else if(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize == "") {

            if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireNondriven] != null) {
              this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize = this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireNondriven][0];
            }else{
              this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize = this.tireSizeCurrentNondriven[1];
            }
          }else if (this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize != "") {
            if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireNondriven].indexOf(this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize) == -1){
              if(this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireNondriven] != null) {
                this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize = this.treadSizeMap[this.data[this.items[item]].autoCompleteDataTireNondriven][0];
              }else{
                this.weightSavingObj.proposedIndexModelObjMap[this.items[item]].proposedNondrivenTireSize =  this.tireSizeCurrentNondriven[1];
              }
            }

          }




        }
      }

    }, 100);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeightSavingPage');

  }


  ionViewWillEnter(){
    this.isCheckValidScenario = false;
  }



  openNextPage(){
    var saveSuccess = this.saveInfo('next');

    if(saveSuccess == false){
      return;
    }
    this.app.getRootNav().setRoot(TabsResultPage, {isFromBasicAnalysis:this.isFromBasicAnalysis, trailerShow: this.trailerShow, nondrivenShow:this.nondrivenShow, proposedNum: this.proposedNum, data:this.data, weightSavings:true});
    // this.navCtrl.setRoot(TabsResultPage);
  }

  ionViewWillLeave(){
    this.saveInfo('previous')
  }

  saveInfo(id){

    if(id == 'next') {
      if (this.weightChoice != 'false') {
        if (!this.checkValidScenario()) {
          this.fillAllfieldsBeforeProceeding();
          return false;
        }
      }
    }

    this.storage.set("weightSaving", JSON.stringify(this.weightSavingObj));
    localStorage.setItem("weightSaving", JSON.stringify(this.weightSavingObj));

    localStorage.setItem("weightSavingObj", JSON.stringify(this.weightSavingObj));
    if(this.weightChoice == 'true'){
      localStorage.setItem("calculateWeight", "true");
    }else{
      localStorage.setItem('calculateWeight', 'false');
    }



    return true;

  }

  checkValidScenario(){

    this.isCheckValidScenario = true;

    if(this.weightSavingObj.selectedPayload == "" || this.weightSavingObj.selectedPayload == undefined || this.weightSavingObj.revenuePerUnit == 0
    || this.weightSavingObj.loadsPerWeek == 0 || (this.drivecheckboxnew && (this.weightSavingObj.currentDriveWheelType == "" || this.weightSavingObj.currentDriveWheelType == undefined ||
    this.weightSavingObj.currentDriveTireSize == "" || this.weightSavingObj.currentDriveWheelType == "" || this.weightSavingObj.currentDriveWheelType == "Select a wheel")) || (this.nondrivenShow && this.nondrivencheckboxnew && (this.weightSavingObj.currentNondrivenTireSize == "" || this.weightSavingObj.currentNondrivenWheelType == ""|| this.weightSavingObj.currentNondrivenWheelType == "Select a wheel" || this.weightSavingObj.currentNondrivenTireSize == undefined || this.weightSavingObj.currentNondrivenWheelType == undefined)) ||
      (this.trailerShow && this.trailercheckboxnew &&  (this.weightSavingObj.currentTrailerTireSize == "" || this.weightSavingObj.currentTrailerTireSize == undefined || this.weightSavingObj.currentTrailerWheelType == "" || this.weightSavingObj.currentTrailerWheelType == undefined || this.weightSavingObj.currentTrailerWheelType == "Select a wheel"))){

      return false;

    }


    for(var index in this.items){
      var item = this.items[index]
      if((this.drivecheckboxnew && (this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveTireSize == "" || this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveTireSize == undefined || this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveWheelType == "" || this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveWheelType == undefined ))||(this.nondrivenShow && this.nondrivencheckboxnew && (this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenTireSize == "" ||
        this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenTireSize == undefined || this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenWheelType == "" || this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenWheelType == undefined))  || (this.trailerShow && this.trailercheckboxnew && (this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerTireSize == "" || this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerTireSize == undefined ||
        this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerWheelType == "" || this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerWheelType == undefined)) ){


        return false;
      }
    }

    return true;



  }

  fillAllfieldsBeforeProceeding() {
    this.translateService.get(['complete_scenario_proceeding_alert','dismiss']).subscribe(text => {

      let alert = this.alertCtrl.create({
        subTitle: text['complete_scenario_proceeding_alert'],
        buttons: [text['dismiss']]
      });
      this.addBackgroundColor('', 0);
      alert.present();
    });
   
  }


  onChange($event, name){

    switch (name){

      case "revenuePerUnit":
        this.weightSavingObj.revenuePerUnit = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        this.addBackgroundColor('', 0);
        break;
      case "loadsPerWeek":
        this.weightSavingObj.loadsPerWeek = isNaN(parseFloat($event.replace(/,/g, ''))) ? 0 : parseFloat($event.replace(/,/g, ''));
        this.addBackgroundColor('', 0);
        break;

    }

}

 addBackgroundColor(name, idx) {


    switch(name){
      case 'currentDriveTireSize':
        this.weightSavingObj.currentDriveWheelType = "";
        break;

      case 'currentNondriven':
       this.weightSavingObj.currentNondrivenWheelType = "";
       break;

      case 'currentTrailerSize':
        this.weightSavingObj.currentTrailerWheelType = "";
        break;

      case 'proposedTrailer':
        this.weightSavingObj.proposedIndexModelObjMap[idx].proposedTrailerWheelType = "";
        break;

      case 'proposedNondriven':
        this.weightSavingObj.proposedIndexModelObjMap[idx].proposedNondrivenWheelType = "";
        break;

      case 'proposedDrive':
        this.weightSavingObj.proposedIndexModelObjMap[idx].proposedDriveWheelType = "";
        break;

    }






   if (this.isCheckValidScenario) {
     document.getElementById("selectedPayload").style.background = (this.weightSavingObj.selectedPayload != "" && this.weightSavingObj.selectedPayload != undefined) ? '#EEEEEE' : 'red';
     document.getElementById("selectedPayloadSelect").style.background = (this.weightSavingObj.selectedPayload != "" && this.weightSavingObj.selectedPayload != undefined) ? '#EEEEEE' : 'red';

     document.getElementById("revenuePerUnit").style.background = (this.weightSavingObj.revenuePerUnit != 0) ? '#EEEEEE' : 'red';
     document.getElementById("revenuePerUnitInput").style.background = (this.weightSavingObj.revenuePerUnit != 0) ? '#EEEEEE' : 'red';

     document.getElementById("loadsPerWeek").style.background = (this.weightSavingObj.loadsPerWeek != 0) ? '#EEEEEE' : 'red';
     document.getElementById("loadsPerWeekInput").style.background = (this.weightSavingObj.loadsPerWeek != 0) ? '#EEEEEE' : 'red';


     document.getElementById("currentDriveTireSize").style.background = (this.weightSavingObj.currentDriveTireSize != "" && this.weightSavingObj.currentDriveTireSize != undefined) ? '#EEEEEE' : 'red';
     document.getElementById("currentDriveWheelType").style.background = (this.weightSavingObj.currentDriveWheelType != "" && this.weightSavingObj.currentDriveWheelType != undefined && this.weightSavingObj.currentDriveWheelType  != 'Select a wheel') ? '#EEEEEE' : 'red';

     if (this.nondrivenShow) {

       document.getElementById("currentNondrivenTireSize").style.background = (this.weightSavingObj.currentNondrivenTireSize != "" && this.weightSavingObj.currentNondrivenTireSize != undefined) ? '#EEEEEE' : 'red';
       document.getElementById("currentNondrivenWheelType").style.background = (this.weightSavingObj.currentNondrivenWheelType != "" && this.weightSavingObj.currentNondrivenWheelType != undefined && this.weightSavingObj.currentNondrivenWheelType != 'Select a wheel') ? '#EEEEEE' : 'red';

     }

     if (this.trailerShow) {

       document.getElementById("currentTrailerTireSize").style.background = (this.weightSavingObj.currentTrailerTireSize != "" && this.weightSavingObj.currentTrailerTireSize != undefined) ? '#EEEEEE' : 'red';
       document.getElementById("currentTrailerWheelType").style.background = (this.weightSavingObj.currentTrailerWheelType != "" && this.weightSavingObj.currentTrailerWheelType != undefined && this.weightSavingObj.currentTrailerWheelType != 'Select a wheel') ? '#EEEEEE' : 'red';

     }


     for (var index in this.items) {
       var item = this.items[index]
       document.getElementById('proposedDriveTireSize' + item).style.background = (this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveTireSize != "" && this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveTireSize != undefined) ? '#eeeeee' : 'red';
       document.getElementById('proposedDriveWheelType' + item).style.background = (this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveWheelType != "" && this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveWheelType != undefined && this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveWheelType != 'Select a wheel') ? '#eeeeee' : 'red';


       if (this.nondrivenShow) {
         document.getElementById('proposedNondrivenTireSize' + item).style.background = (this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenTireSize != "" && this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenTireSize != undefined) ? '#eeeeee' : 'red';
         document.getElementById('proposedNondrivenWheelType' + item).style.background = (this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenWheelType != "" && this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenWheelType != undefined && this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenWheelType != 'Select a wheel') ? '#eeeeee' : 'red';
       }

       if (this.trailerShow) {
         document.getElementById('proposedTrailerTireSize' + item).style.background = (this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerTireSize != "" && this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerTireSize != undefined) ? '#eeeeee' : 'red';
         document.getElementById('proposedTrailerWheelType' + item).style.background = (this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerWheelType != "" && this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerWheelType != undefined && this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerWheelType != 'Select a wheel') ? '#eeeeee' : 'red';
       }
     }

   }
 }



  showAutocompleteModal (name, id) {

    let modal : any;

    if(id == -1){
       modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.payLoadNames});
    }

    if(name == 'currentDriveTireSize' && id == 0){
       modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.treadSizeMap[this.data[0].autoCompleteDataTireDrive]});
    }

    if(name == 'currentDriveWheelType' && id == 0){
       modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.tireWheelTypeDic[this.weightSavingObj.currentDriveTireSize] == null? this.wheelType225 : this.tireWheelTypeDic[this.weightSavingObj.currentDriveTireSize]});
    }

    if(name == 'proposedDriveTireSize' && id > 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.treadSizeMap[this.data[id].autoCompleteDataTireDrive]});
    }

    if(name == 'proposedDriveWheelType' && id > 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.tireWheelTypeDic[this.weightSavingObj.proposedIndexModelObjMap[id].proposedDriveTireSize] == null ? this.wheelType225 : this.tireWheelTypeDic[this.weightSavingObj.proposedIndexModelObjMap[id].proposedDriveTireSize]});
    }



    if(name == 'currentNondrivenTireSize' && id == 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.treadSizeMap[this.data[0].autoCompleteDataTireNondriven]});
    }

    if(name == 'currentNondrivenWheelType' && id == 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.tireWheelTypeDic[this.weightSavingObj.currentNondrivenTireSize] == null ? this.wheelType225 : this.tireWheelTypeDic[this.weightSavingObj.currentNondrivenTireSize]});
    }


    if(name == 'proposedNondrivenTireSize' && id > 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.treadSizeMap[this.data[id].autoCompleteDataTireNondriven]});
    }


    if(name == 'proposedNondrivenWheelType' && id > 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.tireWheelTypeDic[this.weightSavingObj.proposedIndexModelObjMap[id].proposedNondrivenTireSize] == null ? this.wheelType225 : this.tireWheelTypeDic[this.weightSavingObj.proposedIndexModelObjMap[id].proposedNondrivenTireSize]});
    }


    if(name == 'currentTrailerTireSize' && id == 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.treadSizeMap[this.data[0].autoCompleteDataTireTrailer]});
    }

    if(name == 'currentTrailerWheelType' && id == 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData:this.tireWheelTypeDic[this.weightSavingObj.currentTrailerTireSize] == null ? this.wheelType225 : this.tireWheelTypeDic[this.weightSavingObj.currentTrailerTireSize]});
    }

    if(name == 'proposedTrailerTireSize' && id > 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.treadSizeMap[this.data[id].autoCompleteDataTireTrailer]});
    }


    if(name == 'proposedTrailerWheelType' && id > 0){
      modal = this.modalCtrl.create(AutocompletePagePage, {passedinData: this.tireWheelTypeDic[this.weightSavingObj.proposedIndexModelObjMap[id].proposedTrailerTireSize] == null ? this.wheelType225 : this.tireWheelTypeDic[this.weightSavingObj.proposedIndexModelObjMap[id].proposedTrailerTireSize]});
    }


    modal.onDidDismiss(data => {

      if(id == -1){
        this.weightSavingObj.selectedPayload = data;
      }

      if(name == 'currentDriveTireSize' && id == 0){
        this.weightSavingObj.currentDriveTireSize = data;
        this.addBackgroundColor('currentDriveTireSize', 0)
      }

      if(name == 'currentDriveWheelType' && id == 0){
        this.weightSavingObj.currentDriveWheelType = data;
        this.addBackgroundColor('', 0)
      }

      if(name == 'proposedDriveTireSize' && id > 0) {
        this.weightSavingObj.proposedIndexModelObjMap[id].proposedDriveTireSize = data;
        this.addBackgroundColor('proposedDrive', id);
      }

      if(name == 'proposedDriveWheelType' && id > 0){

        this.weightSavingObj.proposedIndexModelObjMap[id].proposedDriveWheelType = data;
        this.addBackgroundColor('', id);
      }

      if(name == 'currentNondrivenTireSize' && id == 0){

        this.weightSavingObj.currentNondrivenTireSize = data;
        this.addBackgroundColor('currentNondriven', 0)
      }

      if(name == 'currentNondrivenWheelType' && id == 0) {
        this.weightSavingObj.currentNondrivenWheelType = data;
        this.addBackgroundColor('', 0);
      }


      if(name == 'proposedNondrivenTireSize' && id > 0) {
        this.weightSavingObj.proposedIndexModelObjMap[id].proposedNondrivenTireSize = data;
        this.addBackgroundColor('proposedNondriven', id);
      }

      if(name == 'proposedNondrivenWheelType' && id > 0) {
        this.weightSavingObj.proposedIndexModelObjMap[id].proposedNondrivenWheelType = data;
        this.addBackgroundColor('', id);
      }


      if(name == 'currentTrailerTireSize' && id == 0) {
        this.weightSavingObj.currentTrailerTireSize = data;
        this.addBackgroundColor('currentTrailerSize', 0)
      }

      if(name == 'currentTrailerWheelType' && id == 0) {
        this.weightSavingObj.currentTrailerWheelType = data;
        this.addBackgroundColor('', 0);
      }

      if(name == 'proposedTrailerTireSize' && id > 0) {
        this.weightSavingObj.proposedIndexModelObjMap[id].proposedTrailerTireSize = data;
        this.addBackgroundColor('proposedNondriven', id);
      }


      if(name == 'proposedTrailerWheelType' && id > 0) {
        this.weightSavingObj.proposedIndexModelObjMap[id].proposedTrailerWheelType = data;
        this.addBackgroundColor('', id);
      }


      });
    modal.present();
  }


}
