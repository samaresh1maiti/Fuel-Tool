import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';
import {ViewChild} from "../../../node_modules/@angular/core/src/metadata/di";
import {asNativeElements} from "../../../node_modules/@angular/core/src/debug/debug_node";
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Storage} from "@ionic/storage";
import * as html2canvas from "../../html2canvas.js";
import { TranslateService } from '@ngx-translate/core';



/*
  Generated class for the Graph page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html'
})
export class GraphPage {

  @ViewChild('barCanvas_steer') barCanvas;
  @ViewChild('barCanvas_graph2') barCanvas_graph2;
  @ViewChild('barCanvas_graph3') barCanvas_graph3;
  @ViewChild('barCanvas_graph4') barCanvas_graph4;
  @ViewChild('barCanvas_graph5') barCanvas_graph5;
  @ViewChild('barCanvas_graph6') barCanvas_graph6;
  @ViewChild('barCanvas_graph7') barCanvas_graph7;

  fleetSizeTrucks: any;




  colors = ['#27509b', '#2AFD80', '#FCE500', '#FD9827', '#FD3A99', '#6F369E', '#FC0D1B', '#9BCDFD', '#6DFE9C', '#FFFE9E'];
    // ['#E9A722', '#2af99b', 'red', '#6f8be8', 'yellow', '#d3d888', '#64682f', '#5288a5', '#b0acb7', '#d67e6d'];
//1072BD replace to 27509b, FFFD38 replace to FCE500

  barChart: any;

  graph:any;

  nativeElement:any;

  nativeElement_graph2: any;

  nativeElement_graph3: any;

  nativeElement_graph4: any;

  nativeElement_graph5: any;

  nativeElement_graph6: any;

  nativeElement_graph7: any;


  barChart2:any;

  barChart3:any;

  barChart4:any;

  barChart5:any;

  barChart6:any;

  barChart7:any;

  barWidthPercentage = 0.1;//0.4

  barChartBase64: any;

   context: any;

   trailerShow = false;
   nondrivenShow = false;

   currencySymbol = '€';

   modelList = [];

   fuelCostDataSet = [];

   fuelCostBackgroundColor = [];

   tireCostDataSet = [];

   tireCostBackgroundColor = [];

   xlabels = [];

   runoutMiles = [];

   runoutMilesSecondLife = [];

   runoutMilesBackground = [];

   runoutMilesBackgrounSecondLife = [];

   itemList = [];

   runoutMilesTitles = [];

   runoutMilesTitlesSecondLife = []

   proposedFuelSaving = [];

   proposedFuelSavingBackgrounColor = [];

   proposedFueltitles = [];

  currentRR = 0;
  steerCon =  parseFloat(localStorage.getItem("steerContribution"));
  driveCon = parseFloat(localStorage.getItem("driveContribution"));
  nondrivenCon = parseFloat(localStorage.getItem("nondrivenContribution"));
  trailerCon = parseFloat(localStorage.getItem("trailerContribution"));
  trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
  trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));

  wheelTireCostsWholeFleet = [];
  wheelTireCostsWholeFleetBackgroundColor = [];
  wheelTireCostsWholeFleetTitles = [];

  wheelTireCostsWholeFleetSecondLife = [];
  wheelTireCostsWholeFleetBackgroundColorSecondLife = [];
  wheelTireCostsWholeFleetTitlesSecondLife = [];


  isFromBasicAnalysis = false;



  steercheckboxnew = false;
  drivecheckboxnew = false;
  nondrivencheckboxnew = false;
  trailercheckboxnew = false;


  fuel_calculation_toggle = true;
  mileage_calculation_toggle = true;

  calculatorUnit = '';
  graphTitle="";


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public translateService:TranslateService) {

    var sum  = 0 ;
    this.steerCon = this.isNullOrNaNCheck(this.steerCon);
    this.driveCon = this.isNullOrNaNCheck(this.driveCon);
    this.nondrivenCon = this.isNullOrNaNCheck(this.nondrivenCon);
    this.trailerCon = this.isNullOrNaNCheck(this.trailerCon);
    this.trailer2Con = this.isNullOrNaNCheck(this.trailer2Con);
    this.trailer3Con = this.isNullOrNaNCheck(this.trailer3Con);

    this.translateService.get(['kilometer','mile','currency']).subscribe(transVal => {
      this.calculatorUnit = localStorage.getItem('unit system') == 'metric' ? transVal['kilometer'] : transVal['mile']
      // this.currencySymbol = transVal['currency']
    });

    let currencyCode =   localStorage.getItem("Currency_Code") == null ? "EUR" : localStorage.getItem("Currency_Code") ;
    this.currencySymbol = localStorage.getItem(currencyCode);


    this.trailerShow = navParams.get('trailerShow');
    this.nondrivenShow = navParams.get('nondrivenShow');

    this.modelList = JSON.parse(localStorage.getItem('resultPageProposedModelList'));
    this.isFromBasicAnalysis = navParams.get('isFromBasicAnalysis');
    this.itemList = navParams.get('data');

    if(this.itemList.length > 5){
      this.barWidthPercentage = 0.1;//0.3
    }


    this.fleetSizeTrucks =   localStorage.getItem('fleetsizetrucks') != null ? parseInt(localStorage.getItem("fleetsizetrucks")) : 0;



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


    if(this.steercheckboxnew) {
      this.graph = "steer";
      this.translateService.get(['steer']).subscribe(titleVal => {
        this.graphTitle = titleVal['steer'];
      });
    }else {

      if(this.drivecheckboxnew){
        this.graph = 'drive';
        this.translateService.get(['drive']).subscribe(titleVal => {
          this.graphTitle = titleVal['drive'];
        });
      }else {

        if(this.trailerShow && this.trailercheckboxnew){
          this.graph = 'trailer';
          this.translateService.get(['trailer']).subscribe(titleVal => {
            this.graphTitle = titleVal['trailer'];
          });
        }else if(this.nondrivenShow && this.nondrivencheckboxnew){
          this.graph = 'nondriven';
          this.translateService.get(['non_driven_axle']).subscribe(titleVal => {
            this.graphTitle = titleVal['non_driven_axle'];
          });
        }

      }

    }

    if(localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined){
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }


    if(localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined){
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true :false;
    }

    if(this.steercheckboxnew){
      sum += this.steerCon;
    }

    if(this.drivecheckboxnew){
      sum += this.driveCon;
    }

    if(this.nondrivenShow && this.nondrivencheckboxnew){
      sum += this.nondrivenCon;
    }

    if(this.trailerShow && this.trailercheckboxnew){
      sum += this.trailerCon + this.trailer2Con + this.trailer3Con;
    }


    this.steerCon = this.steerCon / sum;
    this.driveCon = this.driveCon / sum;
    this.nondrivenCon = this.driveCon / sum;
    this.trailerCon = this.trailerCon/ sum;
    this.trailer2Con = this.trailer2Con /sum;
    this.trailer3Con = this.trailer3Con /sum;



  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GraphPage');
    this.selectItem();
    this.saveGraph();

  }


  // ionViewDidEnter(){
  //
  // }


  // onResize(event){
  //   if(event.target.innerWidth < 420){
  //     this.barWidthPercentage = 0.8;
  //     this.barChart.update();
  //   } // window width
  // }


  selectItem(){
    this.nativeElement = this.barCanvas.nativeElement;
    if(this.fuel_calculation_toggle) {
      this.nativeElement_graph2 = this.barCanvas_graph2.nativeElement;
    }
    if(this.mileage_calculation_toggle) {
      this.nativeElement_graph3 = this.barCanvas_graph3.nativeElement;
      this.nativeElement_graph4 = this.barCanvas_graph4.nativeElement;
      this.nativeElement_graph5 = this.barCanvas_graph5.nativeElement;
      if (!this.isFromBasicAnalysis) {
        this.nativeElement_graph6 = this.barCanvas_graph6.nativeElement;
        this.nativeElement_graph7 = this.barCanvas_graph7.nativeElement;
      }
    }
    this.fuelCostDataSet = [];
    this.tireCostDataSet = [];
    this.xlabels = [];
    this.runoutMiles = [];
    this.fuelCostBackgroundColor = [];
    this.tireCostBackgroundColor = [];
    this.runoutMilesBackground = [];
    this.runoutMilesTitles = [];
    this.proposedFueltitles = [];
    this.proposedFuelSaving = [];
    this.proposedFuelSavingBackgrounColor = [];

    this.runoutMilesSecondLife = [];
    this.runoutMilesTitlesSecondLife = [];
    this.runoutMilesBackgrounSecondLife = [];


    this.wheelTireCostsWholeFleet = [];
    this.wheelTireCostsWholeFleetBackgroundColor = [];
    this.wheelTireCostsWholeFleetTitles = [];


    this.wheelTireCostsWholeFleetSecondLife = [];
    this.wheelTireCostsWholeFleetBackgroundColorSecondLife = [];
    this.wheelTireCostsWholeFleetTitlesSecondLife = [];

    for(var item in this.modelList){
      if(item == '0'){
        this.translateService.get(['current_tire']).subscribe(transVal => {
        this.xlabels.push(transVal['current_tire']);
        });
      }else{
        this.translateService.get(['proposed_tire']).subscribe(transVal => {
          this.xlabels.push(transVal['proposed_tire'] + item);
        });
      }
    }



    switch(this.graph){
      case "steer":
      this.translateService.get(['steer']).subscribe(titleVal => {
        this.graphTitle = titleVal['steer'];
      });
        for(var item in this.modelList){

          var model = this.modelList[item];

          this.fuelCostDataSet.push(Math.round(model.proposedFuelCostsWholeFleet * this.steerCon));
          this.fuelCostBackgroundColor.push('#FCE500');//red

          this.tireCostDataSet.push(Math.round(model.proposedTireCostsWholeFleet * this.steerCon));
          this.tireCostBackgroundColor.push('#27509b');//#6f8be8

          if(this.isFromBasicAnalysis){
            this.runoutMiles.push(this.itemList[item].steerRunoutMiles);
            this.runoutMilesBackground.push(this.colors[item]);
            this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireSteer);
          }else{
            this.runoutMiles.push(this.itemList[item].steerRunoutMiles);
            this.runoutMilesBackground.push(this.colors[item]);
            this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireSteer);

            this.runoutMilesSecondLife.push(this.itemList[item].steerRunoutMilesSecondLife);
            this.runoutMilesBackgrounSecondLife.push(this.colors[item]);
            this.runoutMilesTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireSteerSecondLife);


            this.wheelTireCostsWholeFleetSecondLife.push(model.proposedSteerAnnualTireCostWholeFleetSecondLife);
            this.wheelTireCostsWholeFleetBackgroundColorSecondLife.push(this.colors[item]);
            this.wheelTireCostsWholeFleetTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireSteerSecondLife);


          }

          if(item != '0'){
            this.proposedFuelSaving.push(model.proposedAnnualFuelCostSavingWholeFleet * this.steerCon);
            this.proposedFuelSavingBackgrounColor.push(this.colors[item]);
            this.translateService.get(['steer_proposed_tire','est_fuel_price']).subscribe(transVal => {
              this.proposedFueltitles.push(transVal['steer_proposed_tire'] + item + transVal['est_fuel_price']);
            });
          }

          this.wheelTireCostsWholeFleet.push(model.proposedSteerAnnualTireCostWholeFleet);

          this.wheelTireCostsWholeFleetTitles.push(this.itemList[item].autoCompleteDataTireSteer);


          this.wheelTireCostsWholeFleetBackgroundColor.push(this.colors[item]);

        }



        break;

      case "drive":

      this.translateService.get(['drive']).subscribe(titleVal => {
        this.graphTitle = titleVal['drive'];
      });
        for(var item in this.modelList){

          var model = this.modelList[item];

          this.fuelCostDataSet.push(Math.round(model.proposedFuelCostsWholeFleet * this.driveCon));
          this.fuelCostBackgroundColor.push('#FCE500');
          this.tireCostDataSet.push(Math.round(model.proposedTireCostsWholeFleet * this.driveCon));
          this.tireCostBackgroundColor.push('#27509b');

          if(this.isFromBasicAnalysis){
            this.runoutMiles.push(this.itemList[item].driveRunoutMiles);
            this.runoutMilesBackground.push(this.colors[item]);
            this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireDrive);
          }else{
            this.runoutMiles.push(this.itemList[item].driveRunoutMiles);
            this.runoutMilesBackground.push(this.colors[item]);
            this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireDrive);

            this.runoutMilesSecondLife.push(this.itemList[item].driveRunoutMilesSecondLife);
            this.runoutMilesBackgrounSecondLife.push(this.colors[item]);
            this.runoutMilesTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireDriveSecondLife);


            this.wheelTireCostsWholeFleetSecondLife.push(model.proposedDriveAnnualTireCostWholeFleetSecondLife);
            this.wheelTireCostsWholeFleetBackgroundColorSecondLife.push(this.colors[item]);

            this.wheelTireCostsWholeFleetTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireDriveSecondLife);


          }

          if(item != '0'){
            this.proposedFuelSaving.push(model.proposedAnnualFuelCostSavingWholeFleet * this.driveCon);
            this.proposedFuelSavingBackgrounColor.push(this.colors[item]);
            this.translateService.get(['drive_proposed_tire','est_fuel_price']).subscribe(transVal => {
              this.proposedFueltitles.push(transVal['drive_proposed_tire'] + item + transVal['est_fuel_price']);
            });
          }



          this.wheelTireCostsWholeFleet.push(model.proposedDriveAnnualTireCostWholeFleet);

          this.wheelTireCostsWholeFleetTitles.push(this.itemList[item].autoCompleteDataTireDrive);


          this.wheelTireCostsWholeFleetBackgroundColor.push(this.colors[item]);



        }


        break;

      case "trailer":
      this.translateService.get(['trailer']).subscribe(titleVal => {
        this.graphTitle = titleVal['trailer'];
      });
        if(this.trailerShow){
          for(var item in this.modelList){

            var model = this.modelList[item];

            this.fuelCostDataSet.push(Math.round(model.proposedFuelCostsWholeFleet * (this.trailerCon + this.trailer2Con + this.trailer3Con)));
            this.fuelCostBackgroundColor.push('#FCE500');

            this.tireCostDataSet.push(Math.round(model.proposedTireCostsWholeFleet * (this.trailerCon + this.trailer2Con + this.trailer3Con)));
            this.tireCostBackgroundColor.push('#27509b');

            if(this.isFromBasicAnalysis){
              this.runoutMiles.push(this.itemList[item].trailerRunoutMiles);
              this.runoutMilesBackground.push(this.colors[item]);
              this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireTrailer);

            }else{
              this.runoutMiles.push(this.itemList[item].trailerRunoutMiles);
              this.runoutMilesBackground.push(this.colors[item]);
              this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireTrailer);

              this.runoutMilesSecondLife.push(this.itemList[item].trailerRunoutMilesSecondLife);
              this.runoutMilesBackgrounSecondLife.push(this.colors[item]);
              this.runoutMilesTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireTrailerSecondLife);


              this.wheelTireCostsWholeFleetSecondLife.push(model.proposedTrailerAnnualTireCostWholeFleetSecondLife);
              this.wheelTireCostsWholeFleetBackgroundColorSecondLife.push(this.colors[item]);

              this.wheelTireCostsWholeFleetTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireTrailerSecondLife);



            }


            if(item != '0'){
              this.proposedFuelSaving.push(model.proposedAnnualFuelCostSavingWholeFleet * (this.trailerCon +this.trailer2Con + this.trailer3Con) );
              this.proposedFuelSavingBackgrounColor.push(this.colors[item]);
              this.translateService.get(['trailer_proposed_tire','est_fuel_price']).subscribe(transVal => {
                this.proposedFueltitles.push(transVal['trailer_proposed_tire'] + item + transVal['est_fuel_price']);
              });
            }



            this.wheelTireCostsWholeFleet.push(model.proposedTrailerAnnualTireCostWholeFleet);

            this.wheelTireCostsWholeFleetTitles.push(this.itemList[item].autoCompleteDataTireTrailer);


            this.wheelTireCostsWholeFleetBackgroundColor.push(this.colors[item]);



          }

        }


        break;

      case "nondriven":
      this.translateService.get(['non_driven_axle']).subscribe(titleVal => {
        this.graphTitle = titleVal['non_driven_axle'];
      });
        if(this.nondrivenShow){
          for(var item in this.modelList){

            var model = this.modelList[item];

            this.fuelCostDataSet.push(Math.round(model.proposedFuelCostsWholeFleet * this.nondrivenCon));
            this.fuelCostBackgroundColor.push('#FCE500');

            this.tireCostDataSet.push(Math.round(model.proposedTireCostsWholeFleet * this.nondrivenCon));
            this.tireCostBackgroundColor.push('#27509b');

            if(this.isFromBasicAnalysis){
              this.runoutMiles.push(this.itemList[item].nondrivenRunoutMiles);
              this.runoutMilesBackground.push(this.colors[item]);
              this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireNondriven);

            }else{
              this.runoutMiles.push(this.itemList[item].nondrivenRunoutMiles);
              this.runoutMilesBackground.push(this.colors[item]);
              this.runoutMilesTitles.push(this.itemList[item].autoCompleteDataTireTrailer);
              this.runoutMilesSecondLife.push(this.itemList[item].nondrivenRunoutMilesSecondLife);
              this.runoutMilesBackgrounSecondLife.push(this.colors[item]);
              this.runoutMilesTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireNondrivenSecondLife);


              this.wheelTireCostsWholeFleetSecondLife.push(model.proposedNondrivenAnnualTireCostWholeFleetSecondLife);
              this.wheelTireCostsWholeFleetBackgroundColorSecondLife.push(this.colors[item]);

              this.wheelTireCostsWholeFleetTitlesSecondLife.push(this.itemList[item].autoCompleteDataTireNondrivenSecondLife);


            }

            if(item != '0'){
              this.proposedFuelSaving.push(model.proposedAnnualFuelCostSavingWholeFleet * this.nondrivenCon);
              this.proposedFuelSavingBackgrounColor.push(this.colors[item]);
              this.translateService.get(['nondriven_proposed_tire','est_fuel_price']).subscribe(transVal => {
                this.proposedFueltitles.push(transVal['nondriven_proposed_tire'] + item + transVal['est_fuel_price']);
              });
            }



            this.wheelTireCostsWholeFleet.push(model.proposedNondrivenAnnualTireCostWholeFleet);

            this.wheelTireCostsWholeFleetTitles.push(this.itemList[item].autoCompleteDataTireNondriven);


            this.wheelTireCostsWholeFleetBackgroundColor.push(this.colors[item]);


          }

        }

        break;
    }


    var dataSetTemp = [];


    var resuls = [];
    var tire = "";
    var fuel = "";
    var hr_title = "";
    var annual_title="";
    let currencyCode =   localStorage.getItem("Currency_Code") == null ? "EUR" : localStorage.getItem("Currency_Code") ;
    var currSymb  = localStorage.getItem(currencyCode);

    this.translateService.get(['fuel','tire','proposed_vs_current_annual_fue_and_tire_costs','annual_fuel_savings','currency']).subscribe(transVal => {
      fuel = transVal['fuel'];
      tire = transVal['tire']
      hr_title = transVal['proposed_vs_current_annual_fue_and_tire_costs'];
      annual_title = transVal['annual_fuel_savings'];
      // currSymb = transVal['currency'];

    });

    for(var m = 0; m < this.fuelCostDataSet.length; m++){
      resuls.push(this.fuelCostDataSet[m]);
    }

    for(var n = 0; n < this.tireCostDataSet.length; n++){
      resuls[n] += this.tireCostDataSet[n];
    }

    if(this.fuel_calculation_toggle){
      document.getElementById('fuelColor').style.color = "#FCE500";
      
      dataSetTemp.push({
        label: fuel,
        data: this.fuelCostDataSet,
        backgroundColor: this.fuelCostBackgroundColor,
        borderWidth: 1
      });
    }

    if(this.mileage_calculation_toggle){
      document.getElementById('tireColor').style.color = "#27509b";
      
      dataSetTemp.push({
        label: tire,
        data: this.tireCostDataSet,
        backgroundColor: this.tireCostBackgroundColor,
        borderWidth: 1
      });
    }
  


    this.barChart = new Chart(this.nativeElement, {

      type: 'bar',
      data: {
        labels: this.xlabels,
        datasets: dataSetTemp
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: hr_title +' -' + this.graphTitle,//this.graph.toUpperCase(),
          fontSize: 16,
        },
        legend: {
          display:false,
         
        },
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero:false,
              // max: Math.round(Math.max.apply(null, resuls) * 1.1 ),
              userCallback: function(value, index, values) {
                // Convert the number to a string and splite the string every 3 charaters from the end
                // if(value > Math.max.apply(null, resuls)){
                //   return ' ';
                // }
                value = (Math.round(value)).toString();
                value = value.split(/(?=(?:...)*$)/);

                // Convert the array to a string and format the output
                value = value.join(',');
                return value;
              }
            }
          }],
          xAxes: [{ stacked: true, barPercentage: this.barWidthPercentage }]
        },
        events: false,
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 1,

          onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = "black";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length; i++) {
                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                if(dataset.label == tire){

                    var value = (Math.round(dataset.data[i])).toString();
                    var values = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = values.join(',');

                    var tempStr = localStorage.getItem('units') == 'true'? currSymb + value : currSymb + value;
                      // '€' + value;
                    if(value == '0'){
                      tempStr = "";
                    }

                  if(dataset.data.length > 3) {
                    ctx.fillText(tempStr, model.x+20, model.y + 8); //Added +20 for x , y change - to +
                  }else{
                    ctx.fillText(tempStr, model.x+20, model.y  + 5);//Added +20 for x ,model.y  + 20
                  }

                }else {

                  var value1 = (dataset.data[i]).toString();
                  var values1 = value1.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value1 = values1.join(',');
                  
                  var tempStr1 = localStorage.getItem('units') == 'true'? currSymb + value1 : currSymb + value1;
                    // '€' + value1;
                    if(value1 == '0'){
                      tempStr1 = "";
                    }

                    ctx.fillText(tempStr1, model.x+20, model.y + 15);//Added +20 for x , model.y  + 25
                  }
              }
            });
          }
        }
      }

    });

    var fuelBarRatio = 1;
    if(this.proposedFuelSaving.length <= 1){
      fuelBarRatio = 0.5
    }

if(this.fuel_calculation_toggle) {
  this.barChart2 = new Chart(this.nativeElement_graph2, {

    type: 'bar',
    data: {
      labels: this.proposedFueltitles,
      datasets: [
        // {
        //   label:"graph2_line",
        //   type: 'line',// override the default type
        //   fill: false,
        //   lineTension:0,
        //   borderColor:'#27509b',
        //   backgroundColor:'#27509b',
        //   yAxisID: "y-axis-1",
        //   data: [138, 230, 276],
        //
        // },
        {
          yAxisID: "y-axis-0",
          data: this.proposedFuelSaving,
          backgroundColor: this.proposedFuelSavingBackgrounColor,
          borderWidth: 1
        }

      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: annual_title+' - ' + this.graphTitle,//this.graph.toUpperCase(),
        fontSize: 16,
        padding: 40,
      }
      ,
      scales: {
        yAxes: [{
          position: "left",
          "id": "y-axis-0",
          ticks: {
            beginAtZero: true,
            userCallback: function (value, index, values) {
              // Convert the number to a string and splite the string every 3 charaters from the end


              value = (Math.round(value)).toString();
              value = value.split(/(?=(?:...)*$)/);

              // Convert the array to a string and format the output
              value = value.join(',');
              return value;
            }
          }
          //,
          // }, {
          //   position: "right",
          //   "id": "y-axis-1",
          //   ticks: {
          //     beginAtZero:true
          //   },
        }
        ],
        xAxes: [{stacked: true, barPercentage: this.barWidthPercentage * fuelBarRatio}]
      },
      events: false,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        duration: 1,
        onComplete: function () {
          var ctx = this.chart.ctx;
          ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.fillStyle = "black";
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset) {
            for (var i = 0; i < dataset.data.length; i++) {
              var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

              var value = ((Math.abs(Math.round(dataset.data[i]))).toFixed(0)).toString();
              var values = value.split(/(?=(?:...)*$)/);

              // Convert the array to a string and format the output
              value = values.join(',');

              var sign = dataset.data[i] >= 0 ? '' : "-";

              var tempStr = localStorage.getItem('units') == 'true' ? currSymb + sign + value : currSymb + sign + value;
              // '€' + sign + value;


              if (dataset.label == "graph2_line") {

                ctx.fillText(tempStr, model.x, model.y + 5);

              } else {
                if (dataset.data[i] > 0) {
                  if(dataset.data.length > 3) {
                    ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x , y change - to +
                  }else{
                    ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x
                  }
                } else if (dataset.data[i] < 0) {
                  if(dataset.data.length > 3) {
                    ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x
                  }else{
                    ctx.fillText(tempStr, model.x+25, model.y -10);//Added +25 for x

                  }
                }
              }
            }
          });
        }
      }
    }

  });


}

  var runout = "";
  var comparison = "";
  var fleetAnnualCostComp = "";
  var contributionAnnual="";
  var secondLife = "";
  var cost = "";
  this.translateService.get(['fleet_annual_cost_comparison','runout','comparison','contribution_to_annual_cost','second_life','cost']).subscribe(titleVal => {
    fleetAnnualCostComp = titleVal['fleet_annual_cost_comparison'];
    runout = titleVal['runout']
    contributionAnnual = titleVal['contribution_to_annual_cost'];
    comparison = titleVal['comparison'];
    secondLife = titleVal['second_life'];
    cost = titleVal['cost'];

  });

    if(this.mileage_calculation_toggle) {


      this.barChart3 = new Chart(this.nativeElement_graph3, {

        type: 'bar',
        data: {
          labels: this.runoutMilesTitles,
          datasets: [
            {
              yAxisID: "y-axis-0",
              data: this.runoutMiles,
              backgroundColor: this.runoutMilesBackground,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: runout + this.calculatorUnit +  comparison + ' -' + this.graphTitle,//this.graph.toUpperCase(),
            fontSize: 16,
            padding: 40,
          },
          scales: {
            yAxes: [{
              position: "left",
              "id": "y-axis-0",
              ticks: {
                beginAtZero: true,
                // max: Math.round(Math.max.apply(null, this.runoutMiles) * 1.1),
                userCallback: function (value, index, values) {
                  // Convert the number to a string and splite the string every 3 charaters from the end
                  value = (Math.round(value)).toString();
                  value = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = value.join(',');
                  return value;
                }
              },
            }],
            xAxes: [{barPercentage: this.barWidthPercentage}]
          },
          events: false,
          tooltips: {
            enabled: false
          },
          hover: {
            animationDuration: 0
          },
          animation: {
            duration: 1,
            onComplete: function () {
              var ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = "black";
              ctx.textAlign = 'left';
              ctx.textBaseline = 'bottom';
              this.data.datasets.forEach(function (dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                  var value = (Math.abs(Math.round(dataset.data[i]))).toString();
                  var values = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = values.join(',');

                  var tempStr = value;
                  // '€' + (dataset.data[i] < 0?"-":"") + value;


                  if (dataset.label == "graph2_line") {
                    if(dataset.data.length > 3) {
                      ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x & y change - to +
                    }else{
                      ctx.fillText(tempStr, model.x+25, model.y +20);//Added +25 for x
                    }

                  } else {
                    if(dataset.data.length > 3) {
                      ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                    }else{
                      ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x

                    }

                  }
                }
              });
            }
          }
        }

      });


      if (!this.isFromBasicAnalysis) {
        this.barChart6 = new Chart(this.nativeElement_graph6, {

          type: 'bar',
          data: {
            labels: this.runoutMilesTitlesSecondLife,
            datasets: [
              {
                yAxisID: "y-axis-0",
                data: this.runoutMilesSecondLife,
                backgroundColor: this.runoutMilesBackgrounSecondLife,
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: secondLife + runout  + this.calculatorUnit + comparison + ' -' + this.graphTitle,//this.graph.toUpperCase(),
              fontSize: 16,
              padding: 40,
            },
            scales: {
              yAxes: [{
                position: "left",
                "id": "y-axis-0",
                ticks: {
                  beginAtZero: true,
                  // max: Math.max.apply(null, this.runoutMilesSecondLife),
                  userCallback: function (value, index, values) {
                    // Convert the number to a string and splite the string every 3 charaters from the end
                    value = (Math.round(value)).toString();
                    value = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = value.join(',');
                    return value;
                  }
                },
              }],
              xAxes: [{barPercentage: this.barWidthPercentage}]
            },
            events: false,
            tooltips: {
              enabled: false
            },
            hover: {
              animationDuration: 0
            },
            animation: {
              duration: 1,
              onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "black";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                    var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                    var value = (Math.abs(Math.round(dataset.data[i]))).toString();
                    var values = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = values.join(',');

                    var tempStr =  value;
                    // '€' + value;


                    if (dataset.label == "graph2_line") {
                      if(dataset.data.length > 3) {
                        ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                      }else{
                        ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x 
                      }

                    } else {
                      if(dataset.data.length > 3) {
                        ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                      }else{
                        ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x 
                      }

                    }
                  }
                });
              }
            }
          }

        });
      }


      this.barChart4 = new Chart(this.nativeElement_graph4, {

        type: 'bar',
        data: {
          labels: this.wheelTireCostsWholeFleetTitles,
          datasets: [
            {
              yAxisID: "y-axis-0",
              data: this.wheelTireCostsWholeFleet,
              backgroundColor: this.wheelTireCostsWholeFleetBackgroundColor,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text:  fleetAnnualCostComp+' -' + this.graphTitle,//this.graph.toUpperCase(),
            fontSize: 16,
            padding: 40,
          },
          scales: {
            yAxes: [{
              position: "left",
              "id": "y-axis-0",
              ticks: {
                beginAtZero: true,
                // max: Math.max.apply(null, this.wheelTireCostsWholeFleet),
                userCallback: function (value, index, values) {
                  // Convert the number to a string and splite the string every 3 charaters from the end
                  value = (Math.round(value)).toString();
                  value = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = value.join(',');
                  return value;
                }
              },
            }],
            xAxes: [{barPercentage: this.barWidthPercentage}]
          },
          events: false,
          tooltips: {
            enabled: false
          },
          hover: {
            animationDuration: 0
          },
          animation: {
            duration: 1,
            onComplete: function () {
              var ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = "black";
              ctx.textAlign = 'left';
              ctx.textBaseline = 'bottom';
              this.data.datasets.forEach(function (dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;


                  var value = (Math.round(dataset.data[i])).toString();
                  var values = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = values.join(',');

                  var tempStr = localStorage.getItem('units') == 'true' ? currSymb + value : currSymb + value;
                  //'€' + value;


                  if (dataset.label == "graph2_line") {
                    ctx.fillText(tempStr, model.x+25, model.y + 5);//Added +25 for x &  y change - to +

                  } else {

                    if(dataset.data.length > 3) {
                      ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                    }else{
                      ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x 
                    }
                  }
                }
              });
            }
          }
        }

      });


      if (!this.isFromBasicAnalysis) {
        this.barChart7 = new Chart(this.nativeElement_graph7, {

          type: 'bar',
          data: {
            labels: this.wheelTireCostsWholeFleetTitlesSecondLife,
            datasets: [
              {
                yAxisID: "y-axis-0",
                data: this.wheelTireCostsWholeFleetSecondLife,
                backgroundColor: this.wheelTireCostsWholeFleetBackgroundColorSecondLife,
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: secondLife +fleetAnnualCostComp +' -' + this.graphTitle,//this.graph.toUpperCase(),
              fontSize: 16,
              padding: 40,
            },
            scales: {
              yAxes: [{
                position: "left",
                "id": "y-axis-0",
                ticks: {
                  beginAtZero: true,
                  // max: Math.max.apply(null, this.wheelTireCostsWholeFleetSecondLife),

                  userCallback: function (value, index, values) {
                    // Convert the number to a string and splite the string every 3 charaters from the end
                    value = (Math.round(value)).toString();
                    value = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = value.join(',');
                    return value;
                  }
                },
              }],
              xAxes: [{barPercentage: this.barWidthPercentage}]
            },
            events: false,
            tooltips: {
              enabled: false
            },
            hover: {
              animationDuration: 0
            },
            animation: {
              duration: 1,
              onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "black";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                    var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;


                    var value = (Math.round(dataset.data[i])).toString();
                    var values = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = values.join(',');

                    var tempStr = localStorage.getItem('units') == 'true' ? currSymb + value : currSymb + value;
                    // '€' + value;


                    if (dataset.label == "graph2_line") {
                      ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                      
                    } else {
                      if(dataset.data.length > 3) {
                        ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                      }else{
                        ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x 
                      }
                    }
                  }
                });
              }
            }
          }

        });
      }


      var wheelTireCosts = [];
      var proposedTitles = [];
      for (var j = 0; j < this.wheelTireCostsWholeFleet.length; j++) {
        wheelTireCosts.push(this.wheelTireCostsWholeFleet[j] / this.fleetSizeTrucks);
        if (j == 0) {
          this.translateService.get(['current_tire']).subscribe(text => {
            proposedTitles.push(text['current_tire']);
          });
        } else {
          this.translateService.get(['proposed_tire']).subscribe(text => {
            proposedTitles.push(text['proposed_tire'] + j);
          });
        }
      }

      this.barChart5 = new Chart(this.nativeElement_graph5, {

        type: 'bar',
        data: {
          labels: proposedTitles,
          datasets: [
            {
              yAxisID: "y-axis-0",
              data: wheelTireCosts,
              backgroundColor: this.wheelTireCostsWholeFleetBackgroundColor,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: contributionAnnual+ this.calculatorUnit + cost+' -' + this.graphTitle,//this.graph.toUpperCase(),
            fontSize: 16,
            padding: 40,
          },
          scales: {
            yAxes: [{
              position: "left",
              "id": "y-axis-0",
              ticks: {
                beginAtZero: true,
                // max: Math.max.apply(null, wheelTireCosts),
                userCallback: function (value, index, values) {
                  // Convert the number to a string and splite the string every 3 charaters from the end
                  value = (Math.round(value)).toString();
                  value = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = value.join(',');
                  return value;
                }
              },
            }],
            xAxes: [{barPercentage: this.barWidthPercentage}]
          },
          events: false,
          tooltips: {
            enabled: false
          },
          hover: {
            animationDuration: 0
          },
          animation: {
            duration: 1,
            onComplete: function () {
              var ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(13, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = "black";
              ctx.textAlign = 'left';
              ctx.textBaseline = 'bottom';
              this.data.datasets.forEach(function (dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                  var value = (Math.round(dataset.data[i])).toString();
                  var values = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = values.join(',');

                  var tempStr = localStorage.getItem('units') == 'true' ? currSymb + value : currSymb + value;
                  // '€' + value;

                  if (dataset.label == "graph2_line") {
                    ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                    
                  } else {
                    if(dataset.data.length > 3) {
                      ctx.fillText(tempStr, model.x+25, model.y + 10);//Added +25 for x &  y change - to +
                    }else{
                      ctx.fillText(tempStr, model.x+25, model.y + 20);//Added +25 for x  
                    }
                  }
                }
              });
            }
          }
        }

      });

    }

  }



  saveGraph(){
    // var useHeight1 = document.getElementById('resultGraph').scrollHeight;
    //
    // var useWidth1 = document.getElementById('resultGraph').scrollWidth;



    switch(this.graph){

      case 'steer':
        // html2canvas(document.getElementById("resultGraph"), {width: useWidth1, height: useHeight1 * 1.1}).then
        // (function(canvas) {
        //   var imgData = canvas.toDataURL(
        //     'image/png');
        //
        //   localStorage.setItem('steerGraph', imgData);
        //
        // });

        this.addGraphToLocalStorage('steer');
        localStorage.setItem('steerSaved','true');


        break;

      case 'drive':
        // html2canvas(document.getElementById("resultGraph"), {width: useWidth1, height: useHeight1 * 1.1}).then
        // (function(canvas) {
        //   var imgData = canvas.toDataURL(
        //     'image/png');
        //
        //   localStorage.setItem('driveGraph', imgData);
        //
        // });

        this.addGraphToLocalStorage('drive');
        localStorage.setItem('driveSaved', 'true');
        break;


      case 'nondriven':
        // html2canvas(document.getElementById("resultGraph"), {width: useWidth1, height: useHeight1 * 1.1}).then
        // (function(canvas) {
        //   var imgData = canvas.toDataURL(
        //     'image/png');
        //
        //   localStorage.setItem('nondrivenGraph', imgData);
        //
        // });

        this.addGraphToLocalStorage('nondriven');
        localStorage.setItem('nondrivenSaved', 'true');
        break;


      case 'trailer':
        // html2canvas(document.getElementById("resultGraph"), {width: useWidth1, height: useHeight1 * 1.1}).then
        // (function(canvas) {
        //   var imgData = canvas.toDataURL(
        //     'image/png');
        //
        //   localStorage.setItem('trailerGraph', imgData);
        //
        // });

        this.addGraphToLocalStorage('trailer');
        localStorage.setItem('trailerSaved', 'true');
        break;

    }

  }



  addGraphToLocalStorage(name) {

    setTimeout(()=>{



    let canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
    let canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
    let canvas3 = document.getElementById('canvas3') as HTMLCanvasElement;
    let canvas4 = document.getElementById('canvas4') as HTMLCanvasElement;
    let canvas5 = document.getElementById('canvas5') as HTMLCanvasElement;
    let canvas6:any;
    let canvas7:any;

    if(!this.isFromBasicAnalysis){
      canvas6 = document.getElementById('canvas6') as HTMLCanvasElement;
      canvas7 = document.getElementById('canvas7') as HTMLCanvasElement;
    }



    localStorage.setItem(name + '1', canvas1.toDataURL('image/png'));


if(this.fuel_calculation_toggle) {
  localStorage.setItem(name + '2', canvas2.toDataURL('image/png'));
}


  if(this.mileage_calculation_toggle) {
    localStorage.setItem(name + '3', canvas3.toDataURL('image/png'));
  }


  if(this.mileage_calculation_toggle) {
    localStorage.setItem(name + '4', canvas4.toDataURL('image/png'));
  }

  if(this.mileage_calculation_toggle) {
    localStorage.setItem(name + '5', canvas5.toDataURL('image/png'));
  }

    if(!this.isFromBasicAnalysis){

     if(this.mileage_calculation_toggle) {
       localStorage.setItem(name + '6', canvas6.toDataURL('image/png'));
     }

     if(this.mileage_calculation_toggle) {
       localStorage.setItem(name + '7', canvas7.toDataURL('image/png'));
     }
    }


    }, 300);

  }


  isNullOrNaNCheck(input){
    if(input == null || isNaN(input) ){
      return 0;
    }

    return input;
  }




}
