import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from  '@ionic/storage'
import * as html2canvas from "../../html2canvas.js";
import {first} from "rxjs/operator/first";
import { TranslateService } from '@ngx-translate/core';
import { FontadjustmentProvider } from '../../Provider/fontadjustment/fontadjustment';

declare var sendPdf :any;

/*
  Generated class for the Configuration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  mxMiles = 0;

  firstLife = true;

  secondLife = false;

  fleetConfiguration:any;

  fleetSizeTrucks: any;

  annualMilesPerVehicle: any;

  annualMpgPerVehicle: any;

  currentPriceOfFuel: any;

  annualFuelBill: any;

  fleetSizeTrailers: any;

  lifeCycleAnalysis = false;

  lifeSegment: any;

  itemList = [];

  currentSymbol = '€';

  trailerShow = false;
  nondrivenShow = false;
  proposedNum = 1;
  isFromBasicAnalysis = false;

  titles = [];
  items = [0, 1];

  isenabled = true;


  fuel_calculation_toggle = true;
  mileage_calculation_toggle = true;

  steercheckboxnew = false;
  drivecheckboxnew = false;
  nondrivencheckboxnew = false;
  trailercheckboxnew = false;

  unit ="Kilometers";

  unitMPG = "MPG"

  perUnit = "per liter";


  constructor(public fontAdjustmentService: FontadjustmentProvider,public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public translateService:TranslateService,public alertController:AlertController) {

    this.lifeSegment = 'firstLife';


    this.unit = localStorage.getItem('unit system') == 'metric' ? 'Kilometers' : 'Miles'
    this.unitMPG = localStorage.getItem('unit system') == 'metric' ? 'KPL' : 'MPG';
    this.perUnit = localStorage.getItem('unit system') == 'metric' ? 'per liter' : 'per Gal';
    this.translateService.get(['current_tire', 'proposed_tire','currency']).subscribe(text => {
      // this.unit = localStorage.getItem('unit system') == 'metric' ? text['kilometers'] : text['miles']
      this.titles.push(text['current_tire']);
      this.titles.push(text['proposed_tire']+"1");
      // this.currentSymbol = text['currency'];
    });
    let currencyCode =   localStorage.getItem("Currency_Code") == null ? "EUR" : localStorage.getItem("Currency_Code") ;
    this.currentSymbol = localStorage.getItem(currencyCode);

    // this.storage.get("selectedImageName").then(
    //   (data) =>{
    //     if(data != null){
    //       this.fleetConfiguration = data;
    //     }else{
    //       this.fleetConfiguration = "4X2 straight truck < 5500 kg";
    //     }
    //
    //   }
    // );

    if(localStorage.getItem("selectedImageName") != null){
      this.fleetConfiguration = localStorage.getItem("selectedImageName");
    }else{
      this.fleetConfiguration = "4X2 pulling 3 axle trailer";
    }




    this.fleetSizeTrucks =   localStorage.getItem('fleetsizetrucks') != null ? parseInt(localStorage.getItem("fleetsizetrucks")) : 0;


    this.fleetSizeTrailers = localStorage.getItem("fleetsizetrailer") != null ? parseInt(localStorage.getItem("fleetsizetrailer")) : 0;
    this.annualMilesPerVehicle = localStorage.getItem("annualmilespervehicle") != null ? parseInt(localStorage.getItem("annualmilespervehicle")) : 0;
    this.currentPriceOfFuel = localStorage.getItem("currentpriceoffuel") ? this.addZeroes(localStorage.getItem("currentpriceoffuel")): '0.00';
    this.annualMpgPerVehicle = localStorage.getItem("annualmpgpervehicle") ?  parseInt(localStorage.getItem("annualmpgpervehicle")) : 0;




    // if(localStorage.getItem('fleetdetailparameters') != null){
    //
    //
    //   var tempFleetDetails = JSON.parse(localStorage.getItem('fleetdetailparameters')).items;
    //
    //   for(var index in tempFleetDetails){
    //
    //     var item = tempFleetDetails[index];
    //
    //     switch(item["title"]){
    //       case "fleetsizetrucks":
    //         this.fleetSizeTrucks = item['value'];
    //         break;
    //       case "fleetsizetrailer":
    //         this.fleetSizeTrailers = item['value'];
    //         break;
    //       case "annualmilespervehicle":
    //         this.annualMilesPerVehicle = item['value'];
    //         break;
    //       case "currentpriceoffuel":
    //         this.currentPriceOfFuel = item['value'];
    //         break;
    //       case "annualmpgpervehicle":
    //         this.annualMpgPerVehicle = item['value'];
    //         break;
    //     }
    //   }
    //
    //
    // }

    // this.storage.get('fleetdetailparameters').then(
    //
    //   (data) => {
    //
    //     if(data != null){
    //
    //       var tempFleetDetails = JSON.parse(data);
    //
    //       for(var index in tempFleetDetails){
    //
    //         var item = tempFleetDetails[index];
    //
    //         switch(item["title"]){
    //           case "fleetsizetrucks":
    //             this.fleetSizeTrucks = item['value'];
    //             break;
    //           case "fleetsizetrailer":
    //             this.fleetSizeTrailers = item['value'];
    //             break;
    //           case "annualmilespervehicle":
    //             this.annualMilesPerVehicle = item['value'];
    //             break;
    //           case "currentpriceoffuel":
    //             this.currentPriceOfFuel = item['value'];
    //             break;
    //           case "annualmpgpervehicle":
    //             this.annualMpgPerVehicle = item['value'];
    //             break;
    //         }
    //       }
    //
    //       }
    //     }
    // );

    //
    // this.storage.get('annualBillAmount').then(
    //   (data) => {
    //     if(data != null){
    //       this.annualFuelBill = data;
    //     }
    //   }
    // );

    if(localStorage.getItem('annualBillAmount') != null){

      this.annualFuelBill = parseFloat(localStorage.getItem('annualBillAmount'));


    }



    this.trailerShow = navParams.get('trailerShow');
    this.nondrivenShow = navParams.get('nondrivenShow');
    this.proposedNum = navParams.get('proposedNum');
    this.isFromBasicAnalysis = navParams.get('isFromBasicAnalysis');
    this.itemList = navParams.get('data');


    if(this.proposedNum > 1){
      for(var i = 2; i < this.proposedNum; i++){

        this.items.push(i);
        this.translateService.get(['proposed_tire']).subscribe(text => {
          this.titles.push(text['proposed_tire']+i);
        });

      }
    }




    if(this.isFromBasicAnalysis){

      this.steercheckboxnew =  localStorage.getItem('steercheckboxnewbasic') == 'true'? true :false;
      this.drivecheckboxnew =  localStorage.getItem('drivecheckboxnewbasic') == 'true'? true : false;

      if(this.nondrivenShow){
        this.nondrivencheckboxnew = localStorage.getItem('nondrivencheckboxnewbasic') == 'true' ? true : false;
      }

      if(this.trailerShow){
        this.trailercheckboxnew = localStorage.getItem('trailercheckboxnewbasic') == 'true' ? true :false;
      }

    }


    if(!this.isFromBasicAnalysis){

      this.steercheckboxnew = localStorage.getItem('steercheckboxlifecyclenew') == 'true' ? true :false;
      this.drivecheckboxnew = localStorage.getItem('drivecheckboxlifecyclenew') == 'true' ? true :false;
      this.nondrivencheckboxnew = localStorage.getItem('nondrivencheckboxlifecyclenew') == 'true' ? true :false;
      this.trailercheckboxnew = localStorage.getItem('trailercheckboxlifecyclenew') == 'true' ? true : false;

    }



    if(localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined){
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }


    if(localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined){
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true :false;
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
    this.saveConfigurationInfo();

  }




  ionViewWillLeave(){
    console.log('leave configuration page');
  }




  testPdf() {
  
    var htmlStr = "";

    var heightCal = Math.round(     parseFloat(localStorage.getItem('tableresultHeight')) / (parseFloat(localStorage.getItem('tableresultWidth'))/8.5));

    var firstLifeHeight = Math.round(parseFloat(localStorage.getItem('firstLifeHeight')) / (parseFloat(localStorage.getItem('tableresultWidth'))/8.5));

    var usedHeight = (heightCal >= firstLifeHeight) ? heightCal : firstLifeHeight

    if(usedHeight < 11.5){
      usedHeight = 11.5
    }

      htmlStr += "<!DOCTYPE html><html><head><style>@page { size:" + " 8.5in" + " " + usedHeight +"in" + " }</style></head>"


      htmlStr += "<body>";

      // htmlStr += "<div style='text-align: center'>";
      //
      // htmlStr += "<h4><b>RESULT SUMMARY</b></h4>"
      //
      // htmlStr += "</div>"

      if (sessionStorage.getItem('tableresult') != null && sessionStorage.getItem('tableresult') != undefined) {


        if (usedHeight >= heightCal){
          htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%;  page-break-after: always' src='" + sessionStorage.getItem('tableresult') + "'>";
          htmlStr += "<div>&nbsp;</div>";
        }else{
          htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%' src='" + sessionStorage.getItem('tableresult') + "'>";
        }

        // sessionStorage.removeItem('tableresult');

      }


      // if(sessionStorage.getItem('weighttable') != null && sessionStorage.getItem('weighttable') != undefined){
      //
      //   htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%' src='"+sessionStorage.getItem('weighttable')+"'>"
      //
      //
      // }


      // if(localStorage.getItem('steerGraph') != null && localStorage.getItem('steerGraph') != undefined) {
      //
      //   htmlStr += "<img alt='Embedded Image' style='width: 100%' src='"+localStorage.getItem('steerGraph')+"'>";
      //
      //   console.log(localStorage.getItem('steerGraph'));
      //
      // }

      if (this.steercheckboxnew) {
        htmlStr += this.addGraphStr('steer');
      }

      if (this.drivecheckboxnew) {
        htmlStr += this.addGraphStr('drive');
      }

      if (this.nondrivenShow && this.nondrivencheckboxnew) {
        htmlStr += this.addGraphStr('nondriven');
      }

      if (this.trailerShow && this.trailercheckboxnew) {
        htmlStr += this.addGraphStr('trailer');
      }


      // if(localStorage.getItem('driveGraph') != null && localStorage.getItem('driveGraph') != undefined) {
      //
      //   htmlStr += "<img alt='Embedded Image' style='width: 100%' src='"+localStorage.getItem('driveGraph')+"'>";
      //
      // }
      //
      //
      // if(this.nondrivenShow) {
      //   if (localStorage.getItem('nondrivenGraph') != null && localStorage.getItem('nondrivenGraph') != undefined) {
      //
      //     htmlStr += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem('nondrivenGraph') + "'>";
      //
      //   }
      //
      // }
      //
      // if(this.trailerShow){
      //
      //   if (localStorage.getItem('trailer') != null && localStorage.getItem('trailerGraph') != undefined) {
      //
      //     htmlStr += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem('trailer') + "'>";
      //
      //   }
      //
      // }

      htmlStr += "<div style='margin-top: 40px;'></div>";

      htmlStr += "<img alt='Embedded Image' style='width: 100%' src='" + sessionStorage.getItem('fleetDetails') + "'>";
      htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%;' src='" + sessionStorage.getItem('firstLife') + "'>";
      // localStorage.removeItem('firstLife');
      if (!this.isFromBasicAnalysis) {
        htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%;' src='" + sessionStorage.getItem('secondLife') + "'>";
        // localStorage.removeItem('secondLife');
      }


      htmlStr += "<div style='margin-top: 20px;'></div>";

      this.translateService.get(['config_text']).subscribe(text => {
        htmlStr += "<p>"+text['config_text']+"</p>" 
      })
      // htmlStr += "<p>The fuel and mileage savings calculations shown are estimates for comparison purposes only. Rolling resistance numbers are determined using drum tests according to ISO 28580 procedures. Actual fuel consumption and mileage performance will vary due to factors such as air pressure maintenance, vehicle components, driver techniques, climate and road conditions and aerodynamics. For more information, see your Michelin Truck Tire Representative.</p>"

      htmlStr += "</body>";

      var timeStamp = this.getTimestamp().toString();

      var emails = [];
      // emails.push("testemailhua2016@gmail.com");

      if (localStorage.getItem('userEmail') != null && localStorage.getItem('userEmail') != undefined && localStorage.getItem('userEmail') != '') {
        emails.push(localStorage.getItem('userEmail'));
      }
      //
      if (localStorage.getItem('accountContactEmail') != null && localStorage.getItem('accountContactEmail') != undefined && localStorage.getItem('accountContactEmail') != '') {
        // alert(localStorage.getItem('accountContactEmail'));

        emails.push(localStorage.getItem('accountContactEmail'));
      }
      if (localStorage.getItem('customerMail') != null && localStorage.getItem('customerMail') != undefined && localStorage.getItem('customerMail') != '') {

        emails.push(localStorage.getItem('customerMail'));
      }

      var obj = this;
      // var evPar = {
      //   "html": htmlStr,
      //   "body": "E-mail body",
      //   "fromName": "From name",
      //   "emailSubject": "Email subject",
      //   "filename": "Test.pdf",
      //   "toAddresses": emails
      // };

      // ,"john.lew@michelin.com"
      // this.storage.set("report", JSON.stringify(evPar));
      // localStorage.setItem("report", JSON.stringify(evPar));


      // var isoImg1 = new Image;
      //
      // isoImg1.crossOrigin = 'Anonymous';
      // isoImg1.src = htmlStr;
      // document.getElementById("wrapper").appendChild(isoImg1);


      obj.isenabled = true;

      var defaultAlertInputValue =  "";
      if(emails.length != 0){
        defaultAlertInputValue = emails.join(";") + ";";
      }
  
  
      let alert = this.alertController.create({
        title: this.translateService.instant("addtional_email_input"),
        cssClass: 'custom-alert',
        inputs: [
          {
            name: this.translateService.instant("email_address"),
            placeholder: this.translateService.instant("email_address"),
            value: defaultAlertInputValue,
            type: 'text'
          }
        ],
        buttons: [
          {
            text: this.translateService.instant("cancel"),
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.translateService.instant("send_report"),
            handler: data => {
  
              var dataArr = data[obj.translateService.instant("email_address")].split(";");
  
              var filteredDataArr = dataArr.map(element => {
                if(element != null){
                  return element.trim();
                }
              }).filter(elem => elem != null && elem != '');
  
  
              for(var elem of filteredDataArr){
                if(!obj.validateEmail(elem)){
                  alert.setMessage(obj.translateService.instant('email_incorrect'));
                  return false;
                }
              };
  
  
              emails = [];
              emails.push(...filteredDataArr);
  
              console.log(emails);
  
              var evPar = {
                "uniqueTimeStamp": timeStamp,
                "html": htmlStr,
                "body": obj.translateService.instant("fuel_report_attached"),
                "fromName": obj.translateService.instant("from_Michelin"),
                "emailSubject": obj.translateService.instant("fuel_report"),
                "filename": obj.translateService.instant("report_pdf"),
                "toAddresses": emails,
                "addAtachment" : true,
                "sfdcID" : localStorage.getItem("accountId")
              };
              localStorage.setItem("report", JSON.stringify(evPar));
  
               sendPdf();
  
            }
          }
        ]
      });
      alert.present().then(() => {
        const firstInput: any = document.querySelector('ion-alert input');
        firstInput.focus();
        firstInput.setSelectionRange(1000,1001);
        return;
      });
  
  
  
    }
  
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  getTimestamp() {
    try {
      var thisTimeStamp = new Date().getTime();
      return thisTimeStamp;
    }
    catch (e) {
      alert(e);
    }
  }



  


  saveConfigurationInfo(){

    if(this.lifeSegment == 'firstLife'){

      var useHeight1 = document.getElementById('analysisData').scrollHeight;

      var useWidth1 = document.getElementById('analysisData').scrollWidth;

      var context = this;

      html2canvas(document.getElementById("analysisData"), {width: useWidth1, height: useHeight1 * 1.2}).then
      (function(canvas) {
        var imgData = canvas.toDataURL(
          'image/png');

        sessionStorage.setItem('firstLife', imgData);



        var image = new Image();
        image.src = imgData;
        image.onload = function () {
          var imgWidth = image.naturalWidth,
            imgHeight = image.naturalHeight;
          // alert(imgWidth + " " + imgHeight);
        };










      });




      var useHeight2 = document.getElementById('fleetDetails').scrollHeight;

      var useWidth2 = document.getElementById('fleetDetails').scrollWidth;




      html2canvas(document.getElementById("fleetDetails"), {width: useWidth2, height: useHeight2 * 1.1}).then
      (function(canvas) {
        var imgData = canvas.toDataURL(
          'image/png');

        sessionStorage.setItem('fleetDetails', imgData);


      });


    }
  }


  saveSecondLife(){


      var useHeight1 = document.getElementById('analysisData').scrollHeight;

      var useWidth1 = document.getElementById('analysisData').scrollWidth;




      html2canvas(document.getElementById("analysisData"), {width: useWidth1, height: useHeight1 * 1.2}).then
      (function(canvas) {
        var imgData = canvas.toDataURL(
          'image/png');

        sessionStorage.setItem('secondLife', imgData);


      });

  }


  addGraphStr(name){


    var strTemp = "";

    strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 1) + "'>";

    // localStorage.removeItem(name + 1);



    // var isoImg = new Image;
    // isoImg.src = localStorage.getItem(name+1);
    // isoImg.crossOrigin = 'Anonymous';
    //
    //
    // document.getElementById("wrapper").appendChild(isoImg);


    if(this.fuel_calculation_toggle) {
      strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 2) + "'>";
      // localStorage.removeItem(name+2);
    }


    if(this.mileage_calculation_toggle) {
      strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 3) + "'>";

      // localStorage.removeItem(name + 3);

      if (!this.isFromBasicAnalysis) {
        strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 6) + "'>";

        // localStorage.removeItem(name + 6);

      }

      strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 4) + "'>";

      // localStorage.removeItem(name + 4);

      if (!this.isFromBasicAnalysis) {
        strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 7) + "'>";

        // localStorage.removeItem(name + 7);
      }

      strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 5) + "'>";

      // localStorage.removeItem(name + 5);
    }

    console.log(strTemp);
    return strTemp;
  }

  addZeroes( num ) {

    // If there is no decimal, or the decimal is less than 2 digits, toFixed
    if (num.split(".").length < 2 ){
      num = num + '.00';
    }else if(num.split(".")[1].length < 2 ){
      num = num + '0';
    }else if(num.split(".")[1].length >= 2){
      num = parseFloat(num).toFixed(2);
    }
    // Return the number
    return num;
  }


  isInt = function(n) { if(parseInt(n.toString()) === n){
    return '.00';
  }else{
    if(n.toString().split(".")[1].length < 2 ){
      return '0';
    }
  }

  };



}
