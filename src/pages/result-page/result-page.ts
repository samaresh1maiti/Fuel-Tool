import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ProposedScenarioCalculationResult } from "../../app/models/ProposedScenariosCalculationResult";
import { WeightSavingModel } from "../../app/models/WeightSavingModel";
import * as html2canvas from "../../html2canvas.js";
import { max } from "rxjs/operator/max";
import { TranslateService } from '@ngx-translate/core';
import { FontadjustmentProvider } from '../../Provider/fontadjustment/fontadjustment';
import { TabsPage } from '../tabs/tabs';
import { Chart } from 'chart.js';
import { ModalController } from 'ionic-angular';
import { HelpPage } from "../help/help";
import { Screenshot } from 'ionic-native';
import { Doughnut } from "react-chartjs-2";

declare var sendPdf: any;


/*
  Generated class for the ResultPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var closeModal: any;

@Component({
  selector: 'page-result-page',
  templateUrl: 'result-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ResultPagePage {
  @ViewChild('barCanvas_steer') barCanvas;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  doughnutChart: any;

  steerBrandCurr; steerBrandProp1; steerBrandProp2;
  driveBrandCurr; driveBrandProp1; driveBrandProp2;
  nondriveBrandCurr; nondriveBrandProp1; nondriveBrandProp2;
  trailerBrandCurr; trailerBrandProp1; trailerBrandProp2;

  steerSizeCurr; steerSizeProp1; steerSizeProp2;
  driveSizeCurr; driveSizeProp1; driveSizeProp2;
  nondriveSizeCurr; nondriveSizeProp1; nondriveSizeProp2;
  trailerSizeCurr; trailerSizeProp1; trailerSizeProp2;

  steerTradeCurr; steerTradeProp1; steerTradeProp2;
  driveTradeCurr; driveTradeProp1; driveTradeProp2;
  nondriveTradeCurr; nondriveTradeProp1; nondriveTradeProp2;
  trailerTradeCurr; trailerTradeProp1; trailerTradeProp2;

  steerMilesCurr; steerMilesProp1; steerMilesProp2;
  driveMilesCurr; driveMilesProp1; driveMilesProp2;
  nondriveMilesCurr; nondriveMilesProp1; nondriveMilesProp2;
  trailerMilesCurr; trailerMilesProp1; trailerMilesProp2;

  steerPriceCurr; steerPriceProp1; steerPriceProp2;
  drivePriceCurr; drivePriceProp1; drivePriceProp2;
  nondrivePriceCurr; nondrivePriceProp1; nondrivePriceProp2;
  trailerPriceCurr; trailerPriceProp1; trailerPriceProp2;

  totalRR1;
  totalRR2;
  fleetName; fleetSizeTruck; fleetSizeTrailer; longHaul1; urban1; regional1; annualLoad; annualMiles; currentPrice; annualMpg; fuelSavePercentage;
  distanceUnit;
  vehicleName;
  co2emissionFuelCurr; co2emissionFuelProp; co2gap; co2gapPercentage;
  tempCOEF: number;
  showcalculation = false;
  results: any;
  totalSavings = 215.53;
  bars: any;
  colorArray: any;
  itemList = [];
  weightUnit = ' lbs';
  trailerShow = false;
  nondrivenShow = false;
  proposedNum = 1;
  isFromBasicAnalysis = false;
  titles = [];
  items = [0, 1];
  weightSaving = false;
  proposedItems = [2];
  unit = 'gal'
  maximumPotentialValue = 0;
  maximumPotentialId = 0;
  fleetsizetrucks = 1;
  fleetsizetrailers = 1;
  annualmilespervehicle = 1;
  currentpriceoffuel = 1;
  annualmpgpervehicle = 1;
  currentTireFuelConsumed = 0;
  currentTireFuelConsumedWholeFleet = 0;
  currentTireFuelConsumedWholeFleets = '0';
  currentFuelCosts = 0;
  currentFuelCostsWholeFleet = 0;
  currentFuelCostsWholeFleets = '0';
  currentTireCosts = 0;
  currentTireCostsWholeFleet = 0;
  currentTireCostsWholeFleets = '0';
  currentFuelAndTireAnnualCosts = 0;
  currentFuelAndTireAnnualCostsWholeFleet = 0;
  currentFuelAndTireAnnualCostsWholeFleets = '0';
  modelList = [];
  proposedModelList = [];
  treadSizeWeightMap = {};
  weightSavingObj: WeightSavingModel;
  wheelWeightsDict = {};
  currency = '€';
  currencyPostion = 'P'
  currencySeparator = ''
  // driveLoad = [];
  fuel_calculation_toggle = true;
  mileage_calculation_toggle = true;

  driveTireWeights = [];
  nondrivenTireWeights = [];
  trailerTireWeights = [];
  driveWheelWeights = [];
  nondrivenWheelWeights = [];
  trailerWheelWeights = [];

  driveTireSecondLifeWeights = [];
  nondrivenTireSecondLifeWeights = [];
  trailerTireSecondLifeWeights = [];

  driveTireRatio = [];
  nondrivenTireRatio = [];
  trailerTireRatio = [];

  driveTireRatioSecondLife = [];
  nondrivenTireRatioSecondLife = [];
  trailerTireRatioSecondLife = [];

  steercheckboxnewbasic = false;
  drivecheckboxnewbasic = false;
  nondrivencheckboxnewbasic = false;
  trailercheckboxnewbasic = false;


  steercheckboxlifecyclenew = false;
  drivecheckboxlifecyclenew = false;
  nondrivencheckboxlifecyclenew = false;
  trailercheckboxlifecyclenew = false;

  fleetNameInfo = "";

  annualaverageloadoftruck = 0;
  longhaul = 0;
  regional = 0;
  urban = 0;
  //totalRRCoef = 1 + 0.35/2;
  totalRRCoef = 0.82//1 - 0.35/2;
  rrBrandRes = [];

  verticeleLineText = "MICHELIN and the graphic representation of the Michelin Man are the property of the Compagnie Générale des Etablissements Michelin."
  imprintvariable1 = "Imprint :"
  imprintvariable2 = "For Germany and Austria:"
  imprintvariable3 = "Michelin Reifenwerke AG & Co. KGaA · Michelinstraße 4 · 76185 Karlsruhe/Deutschland"
  imprintvariable4 = "For Switzerland: "
  imprintvariable5 = "Michelin Suisse SA · Route Jo Siffert 36 · CH-1762 Givisiez"
  imprintvariable6 = "Date :"
  legalVariable = "This document and its contents are not legally binding. The hypothetical savings calculated in this report were determined by data subject to tests conducted by Michelin and/or provided by the customer. Actual savings are affected by many factors beyond Michelin's control (such as road conditions, driving style, tire pressure) and all data regarding savings are hypothetically calculated data only, while every effort is made to ensure it is accurate. Actual savings may vary; Michelin makes no guarantee that the hypothetically calculated savings will be achieved."
  companyName = "";
  customerName = "";
  customerEmail = "";
  customerMobile = "";
  selectedCountry = "";
  selectedRegione2a = "";
  selectedLanguage = ""
  date;
  month;
  year;
  nowDate;
  today = Date.now();
  selectedRegion = "AIM";
  selectedRegion1 = '';
  pdfShareInfo = "no";

  //bar charts
  fuelHorizontalBarChart: any;
  tiresCostHorizontalBarChart: any;
  nativeElement;
  xlabels = [];
  steercheckboxnew = false;
  drivecheckboxnew = false;
  nondrivencheckboxnew = false;
  trailercheckboxnew = false;
  isenabled = true;
  screenshot = "";
  tableData = "";
  localStr = "en-US";
  languageCode = "en-US"
  @ViewChild('mychart_variable') mychart_variable;
  @ViewChild("barChart") barChart;
  @ViewChild("barChartCo2") barChartCo2;

  arrLabels;

  canvas: any;

  canvasNativeElement: any;
  avgtirePriceCurrent = 0;
  avgtirePriceProp1 = 0;
  avgtirePriceProp2 = 0;
  currentCo2Tire = 0;
  proposedCo2Tire1 = 0;
  proposedCo2Tire2 = 0;
  co2Totalgappercentage1 = 0;
  co2Totalgappercentage2 = 0;
  co2Totalcurrent = 0;
  co2Totalprop1 = 0;
  co2Totalprop2 = 0;
  currentCo2SaveTire = 0;
  currentCo2SaveFuel = 0;
  propCo2SaveTire1 = 0;
  propCo2SaveFuel1 = 0;
  propCo2SaveTire2 = 0;
  propCo2SaveFuel2 = 0;
  co2FuelGap1 = 0;
  co2TireGap1 = 0;
  co2FuelGap2 = 0;
  co2TireGap2 = 0;

  ngAfterViewInit() {

    this.doughnutChartMethod();

  }

  constructor(public fontAdjustmentService: FontadjustmentProvider,
    public navCtrl: NavController, private modalCtrl: ModalController,
    public navParams: NavParams, public storage: Storage, public translateService: TranslateService, public alertController: AlertController, public loadingController: LoadingController) {
    this.selectedCountry = localStorage.getItem("selectedCountry") == null ? " " : localStorage.getItem("selectedCountry");
    this.selectedLanguage = localStorage.getItem("selectedLanguage") == null ? "notSelected" : localStorage.getItem("selectedLanguage");
    this.results = "steer";
    var locale = "en-us";
    this.nowDate = new Date();
    this.month = this.nowDate.toLocaleString(locale, { month: "long" });
    //     this.nowDate = new Date();
    this.date = this.nowDate.getDate()
    //     this.month = new Date().toLocaleString("en-us", { month: "long" });
    this.year = new Date().getFullYear();
    this.languageCode = localStorage.getItem("languageCode");
    this.selectedRegion = localStorage.getItem("selectedRegionPdf")
    //  this.selectedRegion1=localStorage.getItem("selectedRegion");
    if (this.selectedRegion == "EUN") {
      this.selectedRegion = "Europe"
    } else {
      this.selectedRegion = "Other"
    }
    this.fleetName = localStorage.getItem("fleetName");
    this.fleetSizeTruck = localStorage.getItem("fleetsizetrucks");
    this.fleetSizeTrailer = localStorage.getItem("fleetsizetrailer");
    this.longHaul1 = localStorage.getItem('longhaul');
    this.regional1 = localStorage.getItem('regional');
    this.urban1 = localStorage.getItem('urban');
    this.annualLoad = localStorage.getItem('annualaverageloadoftruck');
    this.annualMiles = localStorage.getItem("annualmilespervehicle");
    this.currentPrice = localStorage.getItem("currentpriceoffuel");
    this.annualMpg = localStorage.getItem("annualmpgpervehicle");
    this.fuelSavePercentage = localStorage.getItem("percentageOfFuelSaving");
    this.distanceUnit = (this.selectedCountry == "United States") ? 'us' : 'metric'
    this.vehicleName = localStorage.getItem("vehicleName");

    this.companyName = localStorage.getItem("company") == null ? " " : localStorage.getItem("company");
    this.customerName = localStorage.getItem("customerFullName") == null ? " " : localStorage.getItem("customerFullName");
    this.customerMobile = localStorage.getItem("customerPhone") == null ? " " : localStorage.getItem("customerPhone");
    this.customerEmail = localStorage.getItem("customerMail") == null ? " " : localStorage.getItem("customerMail");
    // this.companyName=localStorage.getItem("company");
    // this.customerEmail=localStorage.getItem("customerMail");
    // this.customerName=localStorage.getItem("customerFullName");
    // this.customerMobile=localStorage.getItem("customerPhone");


    this.trailerShow = navParams.get('trailerShow');
    this.nondrivenShow = navParams.get('nondrivenShow');
    this.proposedNum = navParams.get('proposedNum');
    this.isFromBasicAnalysis = navParams.get('isFromBasicAnalysis');
    this.itemList = navParams.get('data');

    this.weightSaving = localStorage.getItem("calculateWeight") == 'true' ? true : false;


    if (localStorage.getItem("fleetName") != null && localStorage.getItem("fleetName") != undefined && localStorage.getItem("fleetName") != "null" && localStorage.getItem("fleetName") != '') {
      this.fleetNameInfo = localStorage.getItem('fleetName');
    }


    if (this.isFromBasicAnalysis) {
      this.steercheckboxnewbasic = localStorage.getItem('steercheckboxnewbasic') == 'true' ? true : false;
      this.drivecheckboxnewbasic = localStorage.getItem('drivecheckboxnewbasic') == 'true' ? true : false;

      if (this.nondrivenShow) {
        this.nondrivencheckboxnewbasic = localStorage.getItem('nondrivencheckboxnewbasic') == 'true' ? true : false;
      }

      if (this.trailerShow) {
        this.trailercheckboxnewbasic = localStorage.getItem('trailercheckboxnewbasic') == 'true' ? true : false;
      }

    }


    if (!this.isFromBasicAnalysis) {

      this.steercheckboxlifecyclenew = localStorage.getItem('steercheckboxlifecyclenew') == 'true' ? true : false;
      this.drivecheckboxlifecyclenew = localStorage.getItem('drivecheckboxlifecyclenew') == 'true' ? true : false;
      this.nondrivencheckboxlifecyclenew = localStorage.getItem('nondrivencheckboxlifecyclenew') == 'true' ? true : false;
      this.trailercheckboxlifecyclenew = localStorage.getItem('trailercheckboxlifecyclenew') == 'true' ? true : false;

    }



    if (this.weightSaving) {
      this.weightSavingObj = JSON.parse(localStorage.getItem("weightSavingObj"));
    }

    this.unit = localStorage.getItem('unit system') == 'metric' ? 'liters' : 'gal';

    this.weightUnit = localStorage.getItem('unit system') == 'metric' ? ' kg' : ' lbs';

    this.translateService.get(['current_tire', 'proposed_tire', 'currency']).subscribe(text => {
      this.titles.push(text['current_tire']);
      this.titles.push(text['proposed_tire'] + "1");
      // this.currency = text['currency'];

    });
    let currencyCode = localStorage.getItem("selectedCurrency") == null ? "EUR" : localStorage.getItem("selectedCurrency");
    this.currency = localStorage.getItem(currencyCode);

    this.currencyPostion = localStorage.getItem("selectedPosition");
    this.currency = localStorage.getItem("selectedCurrencySymbol");
    this.currencySeparator = localStorage.getItem("selectedSeparator");
    this.localStr = this.currencySeparator == "C" ? "en-US" : "fi-fi";
    if (this.selectedCountry == "Germany" || this.selectedCountry == "Austria" || this.selectedCountry == "Norway") {
      this.localStr = "de-DE";
    }
    if (this.selectedCountry == "Switzerland") {
      this.localStr = "de-CH";
    }
    if (this.selectedCountry == 'Malaysia' || this.selectedCountry == 'Indonesia' || this.selectedCountry == 'Japan' || this.selectedCountry == 'South Korea' || this.selectedCountry == 'Thailand' || this.selectedCountry == 'Vietnam' || this.selectedCountry == 'Mayanmar' || this.selectedCountry == 'Philippines' || this.selectedCountry == 'Cambodia' || this.selectedCountry != 'Laos') {
      this.selectedRegione2a = 'E2A1'
    }
    if (this.proposedNum > 1) {
      for (var i = 2; i < this.proposedNum; i++) {

        this.items.push(i);
        this.translateService.get(['proposed_tire']).subscribe(text => {
          this.titles.push(text['proposed_tire'] + i);
        });
        this.proposedItems.push(i + 1);

      }
    }

    this.modelList = this.itemList;

    this.wheelWeightsDict = JSON.parse(localStorage.getItem('wheelWeightDict'));


    this.treadSizeWeightMap = JSON.parse(localStorage.getItem("treadSizeWeightMap"));



    this.fleetsizetrucks = parseInt(localStorage.getItem("fleetsizetrucks"));
    this.fleetsizetrailers = parseInt(localStorage.getItem("fleetsizetrailer"));
    this.annualmilespervehicle = parseInt(localStorage.getItem("annualmilespervehicle"));
    this.currentpriceoffuel = parseFloat(localStorage.getItem("currentpriceoffuel"));
    if (localStorage.getItem("selectedRegion") == 'AIM' || localStorage.getItem("selectedRegion") == 'AMS' || localStorage.getItem("selectedRegion") == 'E2A') {
      if (localStorage.getItem("selectedCountry") == 'Australia') {
        this.annualmpgpervehicle = parseFloat(localStorage.getItem("annualmpgpervehicle"));
      }
      else if (localStorage.getItem("selectedCountry") != 'Australia') {
        this.annualmpgpervehicle = 100 / parseFloat(localStorage.getItem("annualmpgpervehicle"));
      }
    }
    else if (localStorage.getItem("selectedRegion") != 'AIM' && localStorage.getItem("selectedRegion") != 'AMS' && localStorage.getItem("selectedRegion") != 'E2A') {
      this.annualmpgpervehicle = parseFloat(localStorage.getItem("annualmpgpervehicle"));
    }
    // this.annualmpgpervehicle = parseInt(localStorage.getItem("annualmpgpervehicle"));
    this.annualaverageloadoftruck = parseInt(localStorage.getItem('annualaverageloadoftruck'));
    this.longhaul = parseInt(localStorage.getItem('longhaul'));
    this.regional = parseInt(localStorage.getItem('regional'));
    this.urban = parseInt(localStorage.getItem('urban'));
    this.rrBrandRes = JSON.parse(localStorage.getItem("rrMapValues"));

    if (localStorage.getItem('fuelCalculation') != null && localStorage.getItem('fuelCalculation') != undefined) {
      this.fuel_calculation_toggle = localStorage.getItem('fuelCalculation') == 'true' ? true : false;
    }


    if (localStorage.getItem('mileageCalculation') != null && localStorage.getItem('mileageCalculation') != undefined) {
      this.mileage_calculation_toggle = localStorage.getItem('mileageCalculation') == 'true' ? true : false;
    }

    this.loadValues();
    // this.generateCharts();
    if (localStorage.getItem("explaination") != null && localStorage.getItem("explaination") != undefined && localStorage.getItem("explaination") != "") {
      this.showcalculation = true;
    } else {
      this.showcalculation = false;
    }
  }


  getTranslateText() {

    this.translateService.get(['fule_costs', 'tire_costs', 'fuel_tire_costs_current_tires', 'current_scenario', 'proposed_scenario', 'proposed_scenario', 'app_loading_message', 'co2_emissions_tire', 'co2_emissions_fuel', 'co2_emissions_total']).subscribe(text => {
      this.arrLabels = text;
    });
  }
  createChart() {
    this.getTranslateText();
    var labels;
    var fuelValues;
    var tireCostValues;
    var fuelandtirevalues;

    console.log("list size", this.proposedModelList.length);
    if (this.proposedModelList.length == 3) {
      labels = [this.arrLabels['current_scenario'], this.arrLabels['proposed_scenario_1'], this.arrLabels['proposed_scenario_2']];
      fuelValues = [this.currentFuelCostsWholeFleet, this.proposedModelList[1].proposedFuelCostsWholeFleet, this.proposedModelList[2].proposedFuelCostsWholeFleet];
      tireCostValues = [this.currentTireCostsWholeFleet, this.proposedModelList[1].proposedTireCostsWholeFleet, this.proposedModelList[2].proposedTireCostsWholeFleet];
      fuelandtirevalues = [this.currentFuelAndTireAnnualCostsWholeFleet, this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet, this.proposedModelList[2].proposedFuelAndTireAnnualCostsWholeFleet];

    } else {
      labels = [this.arrLabels['current_scenario'], this.arrLabels['proposed_scenario_1']];
      fuelValues = [this.currentFuelCostsWholeFleet, this.proposedModelList[1].proposedFuelCostsWholeFleet];
      tireCostValues = [this.currentTireCostsWholeFleet, this.proposedModelList[1].proposedTireCostsWholeFleet];
      fuelandtirevalues = [this.currentFuelAndTireAnnualCostsWholeFleet, this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet];

    }
    var ctx = (<any>document.getElementById('canvas-chart')).getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',
      // The data for our dataset
      data: {
        labels: labels,
        datasets: [{
          label: this.arrLabels['fule_costs'],
          backgroundColor: ['rgba(252, 229, 0)', 'rgba(39, 80, 155)'],
          borderColor: ['rgba(252, 229, 0)', 'rgba(39, 80, 155)'],
          data: fuelValues,
          borderWidth: 2
        }]
      }
    });

    var ctx = (<any>document.getElementById('canvas-chart1')).getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',
      // The data for our dataset
      data: {
        labels: labels,
        datasets: [{
          label: this.arrLabels['tire_costs'],
          backgroundColor: ['rgba(252, 229, 0)', 'rgba(39, 80, 155)'],
          borderColor: ['rgba(252, 229, 0)', 'rgba(39, 80, 155)'],
          data: tireCostValues,
          borderWidth: 2
        }]
      }
    });

    var ctx = (<any>document.getElementById('canvas-chart2')).getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',
      // The data for our dataset
      data: {
        labels: labels,
        datasets: [{
          label: this.arrLabels['fuel_tire_costs_current_tires'],
          backgroundColor: ['rgba(252, 229, 0)', 'rgba(39, 80, 155)'],
          borderColor: ['rgba(252, 229, 0)', 'rgba(39, 80, 155)'],
          data: fuelandtirevalues,
          borderWidth: 2,
        }]
      },

    });
  }


  createBarChartCo2() {
    var objself = this;
    // Chart.defaults.global.showTooltips = false;
    this.getTranslateText();
    var currentValuesco2;
    var ProposedValuesco2;
    var ProposedValuesdefco2;
    var currentDataValuesco2;
    var porposedDataValuesco2;

    currentValuesco2 = [100, 100, 100];
    var value1 = (this.propCo2SaveFuel1 / this.currentCo2SaveFuel) * 100;
    var value2 = (this.propCo2SaveTire1 / this.currentCo2SaveTire) * 100;
    var value3 = (this.co2Totalprop1 / this.co2Totalcurrent) * 100;

    ProposedValuesco2 = [parseFloat(value1.toString()).toFixed(1), parseFloat(value2.toString()).toFixed(1), parseFloat(value3.toString()).toFixed(1)];

    ProposedValuesdefco2 = [value1.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), value2.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), value3.toLocaleString(objself.localStr, { maximumFractionDigits: 1 })];
    currentDataValuesco2 = [this.currentCo2SaveFuel, this.currentCo2SaveTire, this.co2Totalcurrent];
    porposedDataValuesco2 = [this.propCo2SaveFuel1, this.propCo2SaveTire1, this.co2Totalprop1];

    // if (this.selectedCountry == 'Japan') {
    //   ProposedValuesco2 = [parseFloat(value1.toString()).toFixed(0), parseFloat(value2.toString()).toFixed(0), parseFloat(value3.toString()).toFixed(0)];

    //   ProposedValuesdefco2 = [value1.toLocaleString(objself.localStr, { maximumFractionDigits: 0 }), value2.toLocaleString(objself.localStr, { maximumFractionDigits: 0 }), value3.toLocaleString(objself.localStr, { maximumFractionDigits: 0 })];
    //   currentDataValuesco2 = [Number(this.currentCo2SaveFuel.toFixed(0)), Number(this.currentCo2SaveTire.toFixed(0)), Number(this.co2Totalcurrent.toFixed(0))];

    //   porposedDataValuesco2 = [this.propCo2SaveFuel1, this.propCo2SaveTire1, this.co2Totalprop1];
    // }


    // currentDataValuesco2 = [this.currentCo2SaveFuel, this.currentCo2SaveTire, this.co2Totalcurrent];
    // porposedDataValuesco2 = [this.propCo2SaveFuel1, this.propCo2SaveTire1, this.co2Totalprop1];

    Chart.Legend.prototype.afterFit = function () {
      this.height = this.height + 10;
    };

    this.bars = new Chart(this.barChartCo2.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: [this.arrLabels['co2_emissions_fuel'], this.arrLabels['co2_emissions_tire'], this.arrLabels['co2_emissions_total']],
        datasets: [
          {
            label: this.arrLabels['current_scenario'],
            data: currentValuesco2,
            backgroundColor: 'rgba(252,229,0,1)',
          },
          {
            label: this.arrLabels['proposed_scenario'],
            data: ProposedValuesco2,
            backgroundColor: 'rgba(39,80,155,0.9)',
          }
        ],
      },
      options: {

        legend: {
          display: true,
          labels: {
            boxWidth: 30,
            fontColor: 'black',
            fontSize: 15,
            height: 30,
            backgroundColor: 'rgba(32,32,24,1)',
          }
        },
        tooltips: false,
        /* tooltips: {
         callbacks: {
         label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(currentValue);         
          return percentage + "%";
         }
         },
         },*/
        hover: false,
        animation: {
          duration: 0,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = "end";
            ctx.textBaseline = "center";
            ctx.font = "bold 17px 'Helvetica Neue', sans-serif";
            //ctx.textBaseline = "top";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data;
                // if (objself.selectedCountry == 'Japan') {
                //   data = (i == 0) ? currentDataValuesco2[index].toFixed(0) : porposedDataValuesco2[index].toFixed(0)
                // }

                data = (i == 0) ? currentDataValuesco2[index].toFixed(1) : porposedDataValuesco2[index].toFixed(1)



                if (i == 0) {
                  ctx.fillStyle = "rgba(39,80,155,0.9)";
                  ctx.fillText(data.toLocaleString(objself.localStr) + "  " + "100%", bar._model.x + 50, bar._model.y);
                }
                if (i == 1) {
                  // data=data*100;
                  ctx.fillStyle = "rgba(252,229,0,1)";
                  ctx.fillText(data.toLocaleString(objself.localStr) + "  " + ProposedValuesdefco2[index] + "%", bar._model.x + (ProposedValuesco2[index] < 100 ? 50 : 67), bar._model.y);
                }

              });
            });
          },

        },
        scales: {

          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                position: "right",
                lineWidth: 0.5,
                color: 'rgba(0,0,0,0.5)',
                zeroLineColor: 'rgba(0,0,0,1)',
                zeroLineWidth: 1,

              },
              ticks: {
                fontSize: 15,
                padding: 0,
                fontColor: "#000000",
                textAlign: "center",
                fontStyle: "bold",
                min: 0,
                max: 200,
                stepSize: 100,
              },

              scaleLabel: {
                display: true,
                fontSize: 14,
                fontColor: "#000000",
              },
            },
          ],
          yAxes: [
            {
              barPercentage: 0.7,
              categoryPercentage: 0.8,
              display: true,
              gridLines: {
                display: false,
                position: "right",
                lineWidth: 0.5,
                color: 'rgba(0, 0, 0, 0.5)',
                zeroLineColor: 'rgba(0,0,0,1)',
                zeroLineWidth: 1,
              },
              scaleLabel: {
                display: true,
                labelString: "Percentage(%)",
                fontColor: "#000000",
                textAlign: "center",
                //fontStyle: "bold",
                fontSize: 17,
              },

              ticks: {
                tickMarkLength: 15,
                fontStyle: "bold",
                fontSize: 15,
                padding: 30,
                fontColor: "#000000",
                textAlign: "right",
                beginAtZero: true,
              },
            },
          ],
        },
      },
      plugins: [{
        beforeInit: function (chart) {
          chart.data.labels.forEach(function (e, i, a) {
            if (/\n/.test(e)) {
              a[i] = e.split(/\n/);
            }
          });
        }
      }],

    });
  }
  createBarChart() {
    var objself = this;
    // Chart.defaults.global.showTooltips = false;
    this.getTranslateText();
    var currentValues;
    var ProposedValues;
    var ProposedValuesdef;
    var currentDataValues;
    var porposedDataValues;
    var valdeff;
    var value1;
    currentValues = [100, 100, 100];
    if (localStorage.getItem("selectedRegionPdf") == 'AIM' || localStorage.getItem("selectedRegionPdf") == 'AMS') {
      value1 = ((this.proposedModelList[1].proposedFuelCostsWholeFleet / this.currentFuelCostsWholeFleet) * 100);
    }
    else if (localStorage.getItem("selectedRegionPdf") != 'AIM' && localStorage.getItem("selectedRegionPdf") != 'AMS') {
      value1 = (this.proposedModelList[1].proposedFuelCostsWholeFleet / this.currentFuelCostsWholeFleet) * 100;
    }

    var value2 = (this.proposedModelList[1].proposedTireCostsWholeFleet / this.currentTireCostsWholeFleet) * 100;
    var value3 = (this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet / this.currentFuelAndTireAnnualCostsWholeFleet) * 100;
    var value11 = (this.proposedModelList[1].proposedFuelCostsWholeFleet * 100 / this.currentFuelCostsWholeFleet) * 100;
    // ProposedValues = [value1,value2,value3]
    // ProposedValues =[100 + this.proposedModelList[1].proposedFuelConsumptionSavingPercentage, 100 + this.proposedModelList[1].proposedTireCostDifferencePercentage, 100 + this.proposedModelList[1].proposedFuelandNetSavingPercentage] 
    //need to work on this portion
    // if (this.selectedCountry == 'Japan') {
    //   ProposedValues = [parseFloat(value1.toString()).toFixed(0), parseFloat(value2.toString()).toFixed(0), parseFloat(value3.toString()).toFixed(0)]

    //   ProposedValuesdef = [value1.toLocaleString(objself.localStr, { maximumFractionDigits: 0 }), value2.toLocaleString(objself.localStr, { maximumFractionDigits: 0 }), value3.toLocaleString(objself.localStr, { maximumFractionDigits: 0 })]
    // }

    ProposedValues = [parseFloat(value1.toString()).toFixed(1), parseFloat(value2.toString()).toFixed(1), parseFloat(value3.toString()).toFixed(1)]

    ProposedValuesdef = [value1.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), value2.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), value3.toLocaleString(objself.localStr, { maximumFractionDigits: 1 })]


    currentDataValues = [this.currentFuelCostsWholeFleet, this.currentTireCostsWholeFleet, this.currentFuelAndTireAnnualCostsWholeFleet]
    valdeff = [(value1 - 100).toFixed(1), (value2 - 100).toFixed(1), (value3 - 100).toFixed(1)];
    if (localStorage.getItem("selectedRegionPdf") == 'AIM' || localStorage.getItem("selectedRegionPdf") == 'AMS') {
      porposedDataValues = [this.proposedModelList[1].proposedFuelCostsWholeFleet, this.proposedModelList[1].proposedTireCostsWholeFleet, this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet]
    }
    else if (localStorage.getItem("selectedRegionPdf") != 'AIM' && localStorage.getItem("selectedRegionPdf") != 'AMS') {
      porposedDataValues = [this.proposedModelList[1].proposedFuelCostsWholeFleet, this.proposedModelList[1].proposedTireCostsWholeFleet, this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet]
    }

    Chart.Legend.prototype.afterFit = function () {
      this.height = this.height + 10;
    };

    this.bars = new Chart(this.barChart.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: [this.arrLabels['fule_costs'], this.arrLabels['tire_costs'], this.arrLabels['fuel_tire_costs_current_tires']],
        datasets: [
          {
            label: this.arrLabels['current_scenario'],
            data: currentValues,
            backgroundColor: 'rgba(252,229,0,1)',
          },
          {
            label: this.arrLabels['proposed_scenario'],
            data: ProposedValues,

            backgroundColor: 'rgba(60, 124, 241, 0.9)',
          }
        ],
      },
      options: {

        legend: {
          display: true,
          labels: {
            boxWidth: 30,
            fontColor: 'black',
            fontSize: 15,
            height: 30,
            backgroundColor: 'rgba(32,32,24,1)',
          }
        },

        tooltips: false,
        /* tooltips: {
         callbacks: {
         label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(currentValue);         
          return percentage + "%";
         }
         },
         },*/
        hover: false,
        animation: {
          duration: 0,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = "end";
            //ctx.textBaseline = "center";
            ctx.font = "bold 17px 'Helvetica Neue', sans-serif";
            //ctx.textBaseline = "top";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = (i == 0) ? Math.round(currentDataValues[index]) : Math.round(porposedDataValues[index])
                if (i == 0) {
                  ctx.fillStyle = "rgba(39,80,155,0.9)";
                  ctx.fillText(data.toLocaleString(objself.localStr), bar._model.x, bar._model.y);
                }
                if (i == 1) {

                  ctx.fillStyle = "rgba(252,229,0,1)"
                  const img = new Image();
                  img.src = "assets/img/back_button_thumnail_hover.jpg";
                  ctx.fillStyle = valdeff[index] < 0 ? "#007500" : "rgb(255, 0, 0)";
                  // ctx.fillText.fillStyle = "rgb(255, 0, 0)"
                  ctx.fillText(data.toLocaleString(objself.localStr) + "  " + valdeff[index] + "%", bar._model.x + (ProposedValues[index] < 100 ? 45 : 40), bar._model.y);
                }

              });
            });
          },

        },
        scales: {

          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                position: "right",
                lineWidth: 0.5,
                color: 'rgba(0,0,0,0.5)',
                zeroLineColor: 'rgba(0,0,0,1)',
                zeroLineWidth: 1,

              },
              ticks: {
                fontSize: 15,
                padding: 0,
                fontColor: "#000000",
                textAlign: "center",
                fontStyle: "bold",
                min: 0,
                max: 200,
                stepSize: 100,
              },

              scaleLabel: {
                display: true,
                fontSize: 14,
                fontColor: "#000000",
              },
            },
          ],
          yAxes: [
            {
              barPercentage: 0.7,
              categoryPercentage: 0.8,
              display: true,
              gridLines: {
                display: false,
                position: "right",
                lineWidth: 0.5,
                color: 'rgba(0, 0, 0, 0.5)',
                zeroLineColor: 'rgba(0,0,0,1)',
                zeroLineWidth: 1,
              },
              scaleLabel: {
                display: true,
                labelString: "Percentage(%)",
                fontColor: "#000000",
                textAlign: "center",
                //fontStyle: "bold",
                fontSize: 17,
              },

              ticks: {
                tickMarkLength: 15,
                fontStyle: "bold",
                fontSize: 15,
                padding: 30,
                fontColor: "#000000",
                textAlign: "right",
                beginAtZero: true,
              },
            },
          ],
        },
      },

      plugins: [
        {
          beforeInit: function (chart) {
            chart.data.labels.forEach(function (e, i, a) {
              if (/\n/.test(e)) {
                a[i] = e.split(/\n/);
              }
            });
          },

        },

      ],

    });
  }

  create3BarChartCo2() {
    var objself = this;
    // Chart.defaults.global.showTooltips = false;
    this.getTranslateText();
    var currentValuesco2;
    var ProposedValuesco2;
    var ProposedValuesdefco2;
    var currentDataValuesco2;
    var porposedDataValuesco2;
    var ProposedValues1;
    var ProposedValuesdef1
    var porposedDataValues1;

    currentValuesco2 = [100, 100, 100];
    var value1 = (this.propCo2SaveFuel1 / this.currentCo2SaveFuel) * 100;
    var value2 = (this.propCo2SaveTire1 / this.currentCo2SaveTire) * 100;
    var value3 = (this.co2Totalprop1 / this.co2Totalcurrent) * 100;

    var valueP1 = (this.propCo2SaveFuel2 / this.currentCo2SaveFuel) * 100;
    var valueP2 = (this.propCo2SaveTire2 / this.currentCo2SaveTire) * 100;
    var valueP3 = (this.co2Totalprop2 / this.co2Totalcurrent) * 100;



    ProposedValuesco2 = [parseFloat(value1.toString()).toFixed(1), parseFloat(value2.toString()).toFixed(1), parseFloat(value3.toString()).toFixed(1)];

    ProposedValuesdefco2 = [value1.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), value2.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), value3.toLocaleString(objself.localStr, { maximumFractionDigits: 1 })];
    currentDataValuesco2 = [this.currentCo2SaveFuel, this.currentCo2SaveTire, this.co2Totalcurrent];
    porposedDataValuesco2 = [this.propCo2SaveFuel1, this.propCo2SaveTire1, this.co2Totalprop1];

    ProposedValues1 = [parseFloat(valueP1.toString()).toFixed(1), parseFloat(valueP2.toString()).toFixed(1), parseFloat(valueP3.toString()).toFixed(1)];
    ProposedValuesdef1 = [valueP1.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), valueP2.toLocaleString(objself.localStr, { maximumFractionDigits: 1 }), valueP3.toLocaleString(objself.localStr, { maximumFractionDigits: 1 })];
    porposedDataValues1 = [this.propCo2SaveFuel2, this.propCo2SaveTire2, this.co2Totalprop2];

    Chart.Legend.prototype.afterFit = function () {
      this.height = this.height + 10;
    };

    this.bars = new Chart(this.barChartCo2.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: [this.arrLabels['co2_emissions_fuel'], this.arrLabels['co2_emissions_tire'], this.arrLabels['co2_emissions_total']],
        datasets: [
          {
            label: this.arrLabels['current_scenario'],
            data: currentValuesco2,
            backgroundColor: 'rgba(252,229,0,1)',
          },
          {
            label: this.arrLabels['proposed_scenario'] + "1",
            data: ProposedValuesco2,
            backgroundColor: 'rgba(39,80,155,0.9)',
          },
          {
            label: this.arrLabels['proposed_scenario'] + "2",
            data: ProposedValues1,
            backgroundColor: 'rgba(155, 194, 230,1)',
          }
        ],
      },
      options: {

        legend: {
          display: true,
          labels: {
            boxWidth: 30,
            fontColor: 'black',
            fontSize: 15,
            height: 30,
            backgroundColor: 'rgba(32,32,24,1)',
          }
        },
        tooltips: false,
        /* tooltips: {
         callbacks: {
         label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(currentValue);         
          return percentage + "%";
         }
         },
         },*/
        hover: false,
        animation: {
          duration: 0,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = "end";
            ctx.textBaseline = "center";
            ctx.font = "bold 17px 'Helvetica Neue', sans-serif";
            //ctx.textBaseline = "top";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = (i == 0) ? currentDataValuesco2[index].toFixed(1) : (i == 1) ? porposedDataValuesco2[index].toFixed(1) : porposedDataValues1[index].toFixed(1)
                if (i == 0) {
                  ctx.fillStyle = "rgba(39,80,155,0.9)";
                  ctx.fillText(data.toLocaleString(objself.localStr) + "  " + "100%", bar._model.x + 50, bar._model.y);
                }
                if (i == 1) {
                  // data=data*100;
                  ctx.fillStyle = "rgba(252,229,0,1)";
                  ctx.fillText(data.toLocaleString(objself.localStr) + "  " + ProposedValuesdefco2[index] + "%", bar._model.x + (ProposedValuesco2[index] < 100 ? 50 : 67), bar._model.y);
                }

                if (i == 2) {
                  // data=data*100;
                  ctx.fillStyle = "rgba(0,0,0,1)";
                  ctx.fillText(data.toLocaleString(objself.localStr) + "  " + ProposedValuesdef1[index] + "%", bar._model.x + (ProposedValues1[index] < 100 ? 50 : 67), bar._model.y);
                }

              });
            });
          },

        },
        scales: {

          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                position: "right",
                lineWidth: 0.5,
                color: 'rgba(0,0,0,0.5)',
                zeroLineColor: 'rgba(0,0,0,1)',
                zeroLineWidth: 1,

              },
              ticks: {
                fontSize: 15,
                padding: 0,
                fontColor: "#000000",
                textAlign: "center",
                fontStyle: "bold",
                min: 0,
                max: 200,
                stepSize: 100,
              },

              scaleLabel: {
                display: true,
                fontSize: 14,
                fontColor: "#000000",
              },
            },
          ],
          yAxes: [
            {
              barPercentage: 0.7,
              categoryPercentage: 0.8,
              display: true,
              gridLines: {
                display: false,
                position: "right",
                lineWidth: 0.5,
                color: 'rgba(0, 0, 0, 0.5)',
                zeroLineColor: 'rgba(0,0,0,1)',
                zeroLineWidth: 1,
              },
              scaleLabel: {
                display: true,
                labelString: "Percentage(%)",
                fontColor: "#000000",
                textAlign: "center",
                //fontStyle: "bold",
                fontSize: 17,
              },

              ticks: {
                tickMarkLength: 15,
                fontStyle: "bold",
                fontSize: 15,
                padding: 30,
                fontColor: "#000000",
                textAlign: "right",
                beginAtZero: true,
              },
            },
          ],
        },
      },
      plugins: [{
        beforeInit: function (chart) {
          chart.data.labels.forEach(function (e, i, a) {
            if (/\n/.test(e)) {
              a[i] = e.split(/\n/);
            }
          });
        }
      }],

    });
  }
  createBarChart3() {
    var objSelf = this;
    this.getTranslateText();
    var currentValues;
    var ProposedValues;
    var ProposedValuesdef;
    var ProposedValues1;
    var ProposedValuesdef1
    var currentDataValues;
    var porposedDataValues;
    var porposedDataValues1;
    currentValues = [100, 100, 100];
    var value1 = (this.proposedModelList[1].proposedFuelCostsWholeFleet / this.currentFuelCostsWholeFleet) * 100;
    var value2 = (this.proposedModelList[1].proposedTireCostsWholeFleet / this.currentTireCostsWholeFleet) * 100;
    var value3 = (this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet / this.currentFuelAndTireAnnualCostsWholeFleet) * 100;
    var valueP1 = (this.proposedModelList[2].proposedFuelCostsWholeFleet / this.currentFuelCostsWholeFleet) * 100;
    var valueP2 = (this.proposedModelList[2].proposedTireCostsWholeFleet / this.currentTireCostsWholeFleet) * 100;
    var valueP3 = (this.proposedModelList[2].proposedFuelAndTireAnnualCostsWholeFleet / this.currentFuelAndTireAnnualCostsWholeFleet) * 100;
    // ProposedValues =[100 + this.proposedModelList[1].proposedFuelConsumptionSavingPercentage, 100 + this.proposedModelList[1].proposedTireCostDifferencePercentage, 100 + this.proposedModelList[1].proposedFuelandNetSavingPercentage] 
    ProposedValues = [parseFloat(value1.toLocaleString(objSelf.localStr)).toFixed(1), parseFloat(value2.toLocaleString(objSelf.localStr)).toFixed(1), parseFloat(value3.toLocaleString(objSelf.localStr)).toFixed(1)]
    ProposedValuesdef = [value1.toLocaleString(objSelf.localStr, { maximumFractionDigits: 1 }), value2.toLocaleString(objSelf.localStr, { maximumFractionDigits: 1 }), value3.toLocaleString(objSelf.localStr, { maximumFractionDigits: 1 })]
    //ProposedValues1 =[100 + this.proposedModelList[2].proposedFuelConsumptionSavingPercentage, 100 + this.proposedModelList[2].proposedTireCostDifferencePercentage, 100 + this.proposedModelList[2].proposedFuelandNetSavingPercentage] 
    ProposedValues1 = [parseFloat(valueP1.toLocaleString(objSelf.localStr)).toFixed(1), parseFloat(valueP2.toLocaleString(objSelf.localStr)).toFixed(1), parseFloat(valueP3.toLocaleString(objSelf.localStr)).toFixed(1)]
    ProposedValuesdef1 = [valueP1.toLocaleString(objSelf.localStr, { maximumFractionDigits: 1 }), valueP2.toLocaleString(objSelf.localStr, { maximumFractionDigits: 1 }), valueP3.toLocaleString(objSelf.localStr, { maximumFractionDigits: 1 })]
    currentDataValues = [this.currentFuelCostsWholeFleet, this.currentTireCostsWholeFleet, this.currentFuelAndTireAnnualCostsWholeFleet]
    porposedDataValues = [this.proposedModelList[1].proposedFuelCostsWholeFleet, this.proposedModelList[1].proposedTireCostsWholeFleet, this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet];
    porposedDataValues1 = [this.proposedModelList[2].proposedFuelCostsWholeFleet, this.proposedModelList[2].proposedTireCostsWholeFleet, this.proposedModelList[2].proposedFuelAndTireAnnualCostsWholeFleet];

    Chart.Legend.prototype.afterFit = function () {
      //this.height = this.height;
    };
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: [this.arrLabels['fule_costs'], this.arrLabels['tire_costs'], "Fuel & Tire \n Annual Costs"],
        datasets: [
          {
            label: this.arrLabels['current_scenario'],
            data: currentValues,
            backgroundColor: 'rgba(252, 229, 0,1)',

          },
          {
            label: this.arrLabels['proposed_scenario'] + "1",
            data: ProposedValues,
            backgroundColor: 'rgba(39, 80, 155,0.9)',
          },
          {
            label: this.arrLabels['proposed_scenario'] + "2",
            data: ProposedValues1,
            backgroundColor: 'rgba(155, 194, 230,1)'
          }
        ],
      },
      options: {
        tooltips: false,
        hover: false,
        /* tooltips: {
        callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(currentValue);         
          return percentage + "%";
        }
      }},*/
        legend: {
          display: true,
          labels: {
            boxWidth: 30,
            fontColor: 'black',
            fontSize: 15,
          }
        },
        animation: {
          duration: 0,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = "end";
            ctx.font = "bold 17px 'Helvetica Neue', sans-serif";
            //ctx.textBaseline = "top";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = (i == 0) ? Math.round(currentDataValues[index]) : (i == 1) ? Math.round(porposedDataValues[index]) : Math.round(porposedDataValues1[index])
                if (i == 0) {
                  ctx.fillStyle = "rgba(39,80,155,0.9)";
                  ctx.fillText(data.toLocaleString(objSelf.localStr) + "  " + "100%", bar._model.x + 50, bar._model.y);
                }
                if (i == 1) {
                  ctx.fillStyle = "rgba(252,229,0,1)";
                  ctx.fillText(data.toLocaleString(objSelf.localStr) + "  " + (ProposedValuesdef[index]).toLocaleString(objSelf.localStr) + "%", bar._model.x + (ProposedValues[index] < 100 ? 57 : 67), bar._model.y);
                }
                if (i == 2) {
                  ctx.fillStyle = "rgba(0,0,0,1)";
                  ctx.fillText(data.toLocaleString(objSelf.localStr) + "  " + (ProposedValuesdef1[index]).toLocaleString(objSelf.localStr) + "%", bar._model.x + (ProposedValues1[index] < 100 ? 57 : 67), bar._model.y);
                }

              });
            });
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                position: "right",
                //drawOnChartArea: false,
                //drawBorder: false,
                lineWidth: 0.5,
                color: 'rgba(0, 0, 0, 0.5)',
                zeroLineColor: 'rgba(0,0,0,0.5)',
                zeroLineWidth: 1,
              },
              ticks: {
                fontSize: 17,
                padding: 0,
                fontColor: "#000000",
                textAlign: "center",
                fontStyle: "bold",
                min: 0,
                max: 200,
                stepSize: 100
              },
              display: true,

              scaleLabel: {
                display: true,
              },
            },
          ],
          yAxes: [{
            barPercentage: 0.7,
            categoryPercentage: 0.8,
            display: true,
            gridLines: {
              // borderColor:'rgba(143,143,143,1)',
              // borderWidth: 10,
              // drawBorder: false,
              display: false,
              position: "right",
              lineWidth: 0.5,
              color: 'rgba(0,0,0,0.5)',
              zeroLineColor: 'rgba(0,0,0,1)',
              zeroLineWidth: 1,
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage(%)",
              fontColor: "#000000",
              textAlign: "center",
              fontStyle: "bold",
              fontSize: 17,
            },

            ticks: {
              fontStyle: "bold",
              fontSize: 17,
              padding: 20,
              fontColor: "#000000",
              textAlign: "right",
            },
          },
          ],
        },
      },
      plugins: [{
        beforeInit: function (chart) {
          chart.data.labels.forEach(function (e, i, a) {
            if (/\n/.test(e)) {
              a[i] = e.split(/\n/);
            }
          });
        }
      }]
    });
  }
  doughnutChartMethod() {

    var currentDataValues = [Math.round(this.currentFuelCostsWholeFleet - this.proposedModelList[1].proposedFuelCostsWholeFleet),Math.round( this.currentTireCostsWholeFleet - this.proposedModelList[1].proposedTireCostsWholeFleet), Math.round(this.currentFuelAndTireAnnualCostsWholeFleet - this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet),Math.round (this.currentCo2SaveFuel - this.propCo2SaveFuel1), Math.round(this.currentCo2SaveTire - this.propCo2SaveTire1), Math.round(this.co2Totalcurrent - this.co2Totalprop1)]
    var val1 = this.currentFuelCostsWholeFleet - this.proposedModelList[1].proposedFuelCostsWholeFleet;
    var val2 = this.currentTireCostsWholeFleet - this.proposedModelList[1].proposedTireCostsWholeFleet;
  //  alert(val2)
    var val3 = this.currentFuelAndTireAnnualCostsWholeFleet - this.proposedModelList[1].proposedFuelAndTireAnnualCostsWholeFleet;
    var val4 = this.currentCo2SaveFuel - this.propCo2SaveFuel1;
    var val5 = this.currentCo2SaveTire - this.propCo2SaveTire1;
    var val6 = this.co2Totalcurrent - this.co2Totalprop1;
    var total = currentDataValues.reduce((a, v) => a + v);
var inPercent =(currentDataValues.map(v => Math.round(Math.max(v / total * 50, 1))));
Chart.defaults.global.tooltips.enabled = false
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    
      type: 'doughnut',
      
      data: {
        labels: ['Fuel Cost', 'Tire Cost', 'Total Fuel and Tire Cost', 'CO2 for Tire', 'CO2 for Fuel', 'Total CO2 for Tire and Fuel'],
        datasets: [{
          // label: '# of Votes',
          // data: [30, 29, 25, 10, 17,20],
          // data: [val1,val2*100,val3,val4,val5,val6],
          data:inPercent,
          backgroundColor: [
            'black',
            'red',
            'green',
            '#285085',
            'blue',
            'yellow'
          ],
          polyline: {
            color: "red",
            labelColor: "red",
            formatter: (value) => `${value}`
          }
          // hoverBackgroundColor: [
          //   'black',
          //   'red',
          //   'green',
          //   '#285085',
          //   'blue',
          //   'yellow'
          // ]
        }],
        plugins:[this.plugin]
    },
 
    });

    
  }
   getSuitableY = (y, yArray = [], direction) => {
    let result = y;
    yArray.forEach((existedY) => {
      if (existedY - 14 < result && existedY + 14 > result) {
        if (direction === "right") {
          result = existedY + 14;
        } else {
          result = existedY - 14;
        }
      }
    });
  
    return result;
  };
  
   plugin = [
    {
      afterDraw: (chart) => {
        const ctx = chart.chart.ctx;
        ctx.save();
        ctx.font = "10px 'Averta Std CY'";
        const leftLabelCoordinates = [];
        const rightLabelCoordinates = [];
        const chartCenterPoint = {
          x:
            (chart.chartArea.right - chart.chartArea.left) / 2 +
            chart.chartArea.left,
          y:
            (chart.chartArea.bottom - chart.chartArea.top) / 2 +
            chart.chartArea.top
        };
        chart.config.data.labels.forEach((label, i) => {
          const meta = chart.getDatasetMeta(0);
          const arc = meta.data[i];
          const dataset = chart.config.data.datasets[0];
  
          // Prepare data to draw
          // important point 1
          const centerPoint = arc.getCenterPoint();
          const model = arc._model;
          let color = model.borderColor;
          let labelColor = model.borderColor;
          if (dataset.polyline && dataset.polyline.color) {
            color = dataset.polyline.color;
          }
  
          if (dataset.polyline && dataset.polyline.labelColor) {
            labelColor = dataset.polyline.labelColor;
          }
  
          const angle = Math.atan2(
            centerPoint.y - chartCenterPoint.y,
            centerPoint.x - chartCenterPoint.x
          );
          // important point 2, this point overlapsed with existed points
          // so we will reduce y by 14 if it's on the right
          // or add by 14 if it's on the left
          const point2X =
            chartCenterPoint.x + Math.cos(angle) * (model.outerRadius + 15);
          let point2Y =
            chartCenterPoint.y + Math.sin(angle) * (model.outerRadius + 15);
  
          let suitableY;
          if (point2X < chartCenterPoint.x) {
            // on the left
            suitableY = this.getSuitableY(point2Y, leftLabelCoordinates, "left");
          } else {
            // on the right
  
            suitableY = this.getSuitableY(point2Y, rightLabelCoordinates, "right");
          }
  
          point2Y = suitableY;
  
          let value = dataset.data[i];
          if (dataset.polyline && dataset.polyline.formatter) {
            value = dataset.polyline.formatter(value);
          }
          let edgePointX = point2X < chartCenterPoint.x ? 10 : chart.width - 10;
  
          if (point2X < chartCenterPoint.x) {
            leftLabelCoordinates.push(point2Y);
          } else {
            rightLabelCoordinates.push(point2Y);
          }
          //DRAW CODE
          // first line: connect between arc's center point and outside point
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.moveTo(centerPoint.x, centerPoint.y);
          ctx.lineTo(point2X, point2Y);
          ctx.stroke();
          // second line: connect between outside point and chart's edge
          ctx.beginPath();
          ctx.moveTo(point2X, point2Y);
          ctx.lineTo(edgePointX, point2Y);
          ctx.stroke();
          //fill custom label
          const labelAlignStyle =
            edgePointX < chartCenterPoint.x ? "left" : "right";
          const labelX = edgePointX;
          const labelY = point2Y;
          ctx.textAlign = labelAlignStyle;
          ctx.textBaseline = "bottom";
  
          ctx.fillStyle = labelColor;
          ctx.fillText(value, labelX, labelY);
        });
        ctx.restore();
      }
    }
  ];

  ionViewDidLoad() {
    setTimeout(
      () => {
        // this.createChart();
        if (this.proposedModelList.length == 3) {
          this.createBarChart3();
          this.create3BarChartCo2();
        } else {
          this.createBarChart();
          this.createBarChartCo2();
          this.doughnutChartMethod();
        }
      }, 300
    )
    //pdf create page..
    /* let TIME_IN_MS = 6000;
      let graphLoading = setTimeout( () => {
       this.saveTable();
     }, TIME_IN_MS);*/
    //Spinner added..
    // this.getTranslateText();
    this.presentLoading()
  }

  presentLoading() {
    // let loading = this.loadingController.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    // setTimeout(() => {
    // this.saveTableData();
    // this.saveTable();

    //   loading.dismiss();
    // }, 6000);
  }

  generateCharts() {

    var ctx = document.getElementById('myChart');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }]
      },

      // Configuration options go here
      options: {}
    });
  }


  ionViewWillEnter() {

  }

  //CGL 

  loadValues() {
    var steerNum = parseInt(localStorage.getItem('steerNum'));
    var driveNum = parseInt(localStorage.getItem('driveNum'));
    var nondrivenNum = parseInt(localStorage.getItem('nondrivenNum'));
    var trailerNum = parseInt(localStorage.getItem('trailerNum'));
    var treadRRMap = JSON.parse(localStorage.getItem("treadRRMap"));
    var currentSteerRollingResistance = 0;
    var currentDriveRollingResistance = 0;
    var currentNondrivenRollingResistance = 0;
    var currentTrailerRollingResistance = 0;



    var blendedSteerFirstLife = this.modelList[0].blendedAverageSteerFirstLife;
    var blendedSteerFirstLifeNum = parseFloat(blendedSteerFirstLife) / 100;

    var blendedSteerSecondLife = this.modelList[0].blendedAverageSteerSecondLife;
    var blendedSteerSecondLifeNum = parseFloat(blendedSteerSecondLife) / 100;


    var blendedDriveFirstLife = this.modelList[0].blendedAverageDriveFirstLife;
    var blendedDriveFirstLifeNum = parseFloat(blendedDriveFirstLife) / 100;

    var blendedDriveSecondLife = this.modelList[0].blendedAverageDriveSecondLife;
    var blendedDriveSecondLifeNum = parseFloat(blendedDriveSecondLife) / 100;


    var blendedNondrivenFirstLife = "";
    var blendedNondrivenSecondLife = "";
    var blendedNondrivenFirstLifeNum = 0;
    var blendedNondrivenSecondLifeNum = 0;

    if (this.nondrivenShow) {
      blendedNondrivenFirstLife = this.modelList[0].blendedAverageNondrivenFirstLife;
      blendedNondrivenFirstLifeNum = parseFloat(blendedNondrivenFirstLife) / 100;


      blendedNondrivenSecondLife = this.modelList[0].blendedAverageNondrivenSecondLife;
      blendedNondrivenSecondLifeNum = parseFloat(blendedNondrivenSecondLife) / 100;

    }


    var blendedTrailerFirstLife = "";
    var blendedTrailerSecondLife = "";
    var blendedTrailerFirstLifeNum = 0;
    var blendedTrailerSecondLifeNum = 0;

    if (this.trailerShow) {
      blendedTrailerFirstLife = this.modelList[0].blendedAverageTrailerFirstLife;
      blendedTrailerFirstLifeNum = parseFloat(blendedTrailerFirstLife) / 100;


      blendedTrailerSecondLife = this.modelList[0].blendedAverageTrailerSecondLife;
      blendedTrailerSecondLifeNum = parseFloat(blendedTrailerSecondLife) / 100;

    }


    for (var item in this.modelList) {


      if (parseInt(item) == 0) {

        if (this.unit == 'liters') {
          // alert(this.selectedRegion);
          // if (localStorage.getItem("selectedRegionPdf") == 'AIM' || localStorage.getItem("selectedRegionPdf") == 'AMS' || localStorage.getItem("selectedRegionPdf")=='E2A'){
          // if(localStorage.getItem("selectedCountry")=='Australia'){
          this.currentTireFuelConsumed = this.annualmilespervehicle * (this.annualmpgpervehicle / 100);
          // }
          // else if(localStorage.getItem("selectedCountry") !='Australia'){
          // this.currentTireFuelConsumed = this.annualmilespervehicle /this.annualmpgpervehicle;
          // }

          // this.currentTireFuelConsumed = this.annualmilespervehicle * (this.annualmpgpervehicle / 100);
          // }
          // else if(localStorage.getItem("selectedRegionPdf") != 'AIM' && localStorage.getItem("selectedRegionPdf") != 'AMS' && localStorage.getItem("selectedRegionPdf")!='E2A') {
          //   this.currentTireFuelConsumed = this.annualmilespervehicle * (this.annualmpgpervehicle / 100);
          // }

        } else {
          this.currentTireFuelConsumed = (this.annualmilespervehicle / 100) * (this.annualmpgpervehicle);
        }


        this.currentTireFuelConsumedWholeFleet = this.currentTireFuelConsumed * this.fleetsizetrucks;


        this.currentFuelCosts = this.currentTireFuelConsumed * this.currentpriceoffuel;
        this.currentFuelCostsWholeFleet = this.currentFuelCosts * this.fleetsizetrucks;

        var tempSteerRatio = 1;
        var tempDriveRatio = 1;
        var tempNonDrivenRatio = 1;
        var tempTrailerRatio = 1;


        if (this.modelList[0].autoCompleteDataTireSteer.toUpperCase().indexOf('X ONE') != -1) {
          tempSteerRatio = 0.5;
        }

        if (this.modelList[0].autoCompleteDataTireDrive.toUpperCase().indexOf('X ONE') != -1) {
          tempDriveRatio = 0.5;
        }

        if (this.modelList[0].autoCompleteDataTireNondriven.toUpperCase().indexOf('X ONE') != -1) {
          tempNonDrivenRatio = 0.5;
        }

        if (this.modelList[0].autoCompleteDataTireTrailer.toUpperCase().indexOf('X ONE') != -1) {
          tempTrailerRatio = 0.5;
        }


        if (this.weightSavingObj != null) {

          var treadSizeKey = this.modelList[0].autoCompleteDataTireDrive + ' ' + this.weightSavingObj.currentDriveTireSize.toUpperCase();

          this.driveTireWeights.push(parseInt(this.treadSizeWeightMap[treadSizeKey]));

          if (treadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
            this.driveTireRatio.push(0.5);
          } else {
            this.driveTireRatio.push(1);
          }

          this.driveWheelWeights.push(parseInt(this.wheelWeightsDict[this.weightSavingObj.currentDriveWheelType]))


          if (this.nondrivenShow) {
            var nondrivenTreadSizeKey = this.modelList[item].autoCompleteDataTireNondriven + ' ' + this.weightSavingObj.currentNondrivenTireSize.toUpperCase();
            this.nondrivenTireWeights.push(parseInt(this.treadSizeWeightMap[nondrivenTreadSizeKey]));
            this.nondrivenWheelWeights.push(parseInt(this.wheelWeightsDict[this.weightSavingObj.currentNondrivenWheelType]));


            if (nondrivenTreadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
              this.nondrivenTireRatio.push(0.5);
            } else {
              this.nondrivenTireRatio.push(1);
            }

          }

          if (this.trailerShow) {
            var trailerTreadSizeKey = this.modelList[item].autoCompleteDataTireTrailer + ' ' + this.weightSavingObj.currentTrailerTireSize.toUpperCase();
            this.trailerTireWeights.push(parseInt(this.treadSizeWeightMap[trailerTreadSizeKey]));
            this.trailerWheelWeights.push(parseInt(this.wheelWeightsDict[this.weightSavingObj.currentTrailerWheelType]));


            if (trailerTreadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
              this.trailerTireRatio.push(0.5);
            } else {
              this.trailerTireRatio.push(1);
            }


          }

        }


        var proposedResultModel = new ProposedScenarioCalculationResult();

        proposedResultModel.proposedFuelConsumpted = this.currentTireFuelConsumed;
        proposedResultModel.proposedFuelConsumptionFleet = this.currentTireFuelConsumedWholeFleet;
        // alert(this.currentTireFuelConsumedWholeFleet)
        proposedResultModel.proposedFuelCosts = this.currentFuelCosts;
        proposedResultModel.proposedFuelCostsWholeFleet = this.currentFuelCostsWholeFleet;

        this.currentTireCosts = 0;


        if (this.isFromBasicAnalysis) {

          if (this.steercheckboxnewbasic) {

            this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].steerRunoutMiles) * this.modelList[0].steerTirePrice * steerNum * tempSteerRatio;
            // alert(this.currentTireCosts)
          }
          if (this.drivecheckboxnewbasic) {
            this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].driveRunoutMiles) * this.modelList[0].driveTirePrice * driveNum * tempDriveRatio;
            // alert(this.currentTireCosts)
          }
          if (this.steercheckboxnewbasic) {
            proposedResultModel.proposedSteerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].steerRunoutMiles) * this.modelList[0].steerTirePrice * steerNum * tempSteerRatio * this.fleetsizetrucks);
          }
          if (this.drivecheckboxnewbasic) {
            proposedResultModel.proposedDriveAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].driveRunoutMiles) * this.modelList[0].driveTirePrice * driveNum * tempDriveRatio * this.fleetsizetrucks);
          }
          if (this.trailerShow) {
            if (this.trailercheckboxnewbasic) {
              this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].trailerRunoutMiles) * this.modelList[0].trailerTirePrice * trailerNum * tempTrailerRatio;
              // alert(trailerNum)
              //currentTrailerRollingResistance = treadRRMap[this.modelList[0].autoCompleteDataTireTrailer];
              let rrValueTrailerCurrent = this.rrBrandRes.filter(brand => (brand.size == this.modelList[0].autoCompleteDataSizeTrailer && brand.mfg == this.modelList[0].autoCompleteDataTrailerBrand && brand.tread == this.modelList[0].autoCompleteDataTireTrailer));
              currentTrailerRollingResistance = rrValueTrailerCurrent[0].rr;
              proposedResultModel.proposedTrailerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].trailerRunoutMiles) * this.modelList[0].trailerTirePrice * trailerNum * this.fleetsizetrucks * tempTrailerRatio);
            }
          }
          if (this.nondrivenShow) {
            if (this.nondrivencheckboxnewbasic) {
              this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].nondrivenRunoutMiles) * this.modelList[0].nondrivenTirePrice * nondrivenNum * tempNonDrivenRatio;

              //currentNondrivenRollingResistance = treadRRMap[this.modelList[0].autoCompleteDataTireNondriven];
              let rrValueNonDrivenCurrent = this.rrBrandRes.filter(brand => (brand.size == this.modelList[0].autoCompleteDataSizeNonDrive && brand.mfg == this.modelList[0].autoCompleteDataNondrivenBrand && brand.tread == this.modelList[0].autoCompleteDataTireNondriven));
              currentNondrivenRollingResistance = rrValueNonDrivenCurrent[0].rr;
              proposedResultModel.proposedNondrivenAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].nondrivenRunoutMiles) * this.modelList[0].nondrivenTirePrice * nondrivenNum * this.fleetsizetrucks * tempNonDrivenRatio);
            }
          }
          proposedResultModel.proposedTireCosts = this.returnZeroIfNaN(parseFloat(this.currentTireCosts.toFixed(2)));
        } else {

          var tempSteerRatioSecondLife = 1;
          var tempDriveRatioSecondLife = 1;
          var tempNonDrivenRatioSecondLife = 1;
          var tempTrailerRatioSecondLife = 1;

          if (this.modelList[0].autoCompleteDataTireSteerSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempSteerRatioSecondLife = 0.5;
          }

          if (this.modelList[0].autoCompleteDataTireDriveSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempDriveRatioSecondLife = 0.5;
          }

          if (this.modelList[0].autoCompleteDataTireNondrivenSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempNonDrivenRatioSecondLife = 0.5;
          }

          if (this.modelList[0].autoCompleteDataTireTrailerSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempTrailerRatioSecondLife = 0.5;
          }


          if (this.steercheckboxlifecyclenew) {

            this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].steerRunoutMiles) * this.modelList[0].steerTirePrice * steerNum * blendedSteerFirstLifeNum * tempSteerRatio
              + (this.annualmilespervehicle / this.modelList[0].steerRunoutMilesSecondLife) * this.modelList[0].steerTirePriceSecondLife * steerNum * blendedSteerSecondLifeNum * tempSteerRatioSecondLife;

          }

          if (this.steercheckboxlifecyclenew) {

            proposedResultModel.proposedSteerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].steerRunoutMiles) * this.modelList[0].steerTirePrice * steerNum * blendedSteerFirstLifeNum * this.fleetsizetrucks * tempSteerRatio);
            proposedResultModel.proposedSteerAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].steerRunoutMilesSecondLife) * this.modelList[0].steerTirePriceSecondLife * steerNum * blendedSteerSecondLifeNum * this.fleetsizetrucks * tempSteerRatioSecondLife);

          }


          if (this.drivecheckboxlifecyclenew) {

            this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].driveRunoutMiles) * this.modelList[0].driveTirePrice * driveNum * blendedDriveFirstLifeNum * tempDriveRatio
              + (this.annualmilespervehicle / this.modelList[0].driveRunoutMilesSecondLife) * this.modelList[0].driveTirePriceSecondLife * driveNum * blendedDriveSecondLifeNum * tempDriveRatioSecondLife;
          }

          if (this.drivecheckboxlifecyclenew) {
            proposedResultModel.proposedDriveAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].driveRunoutMiles) * this.modelList[0].driveTirePrice * driveNum * blendedDriveFirstLifeNum * this.fleetsizetrucks * tempDriveRatio);
            proposedResultModel.proposedDriveAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].driveRunoutMilesSecondLife) * this.modelList[0].driveTirePriceSecondLife * driveNum * blendedDriveSecondLifeNum * this.fleetsizetrucks * tempDriveRatioSecondLife);
          }

          if (this.trailerShow) {

            if (this.trailercheckboxlifecyclenew) {
              this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].trailerRunoutMiles) * this.modelList[0].trailerTirePrice * trailerNum * blendedTrailerFirstLifeNum * tempTrailerRatio
                + (this.annualmilespervehicle / this.modelList[0].trailerRunoutMilesSecondLife) * this.modelList[0].trailerTirePriceSecondLife * trailerNum * blendedTrailerSecondLifeNum * tempTrailerRatioSecondLife;

              currentTrailerRollingResistance = treadRRMap[this.modelList[0].autoCompleteDataTireTrailer];
              proposedResultModel.proposedTrailerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].trailerRunoutMiles) * this.modelList[0].trailerTirePrice * trailerNum * blendedTrailerFirstLifeNum * this.fleetsizetrucks * tempTrailerRatio);
              proposedResultModel.proposedTrailerAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].trailerRunoutMilesSecondLife) * this.modelList[0].trailerTirePriceSecondLife * trailerNum * blendedTrailerSecondLifeNum * this.fleetsizetrucks * tempTrailerRatioSecondLife);
            }

          }


          if (this.nondrivenShow) {

            if (this.nondrivencheckboxlifecyclenew) {
              this.currentTireCosts += (this.annualmilespervehicle / this.modelList[0].nondrivenRunoutMiles) * this.modelList[0].nondrivenTirePrice * nondrivenNum * blendedNondrivenFirstLifeNum * tempNonDrivenRatio
                + (this.annualmilespervehicle / this.modelList[0].nondrivenRunoutMilesSecondLife) * this.modelList[0].nondrivenTirePriceSecondLife * nondrivenNum * blendedNondrivenSecondLifeNum * tempNonDrivenRatioSecondLife;
              currentNondrivenRollingResistance = treadRRMap[this.modelList[0].autoCompleteDataTireNondriven];

              proposedResultModel.proposedNondrivenAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].nondrivenRunoutMiles) * this.modelList[0].nondrivenTirePrice * nondrivenNum * blendedNondrivenFirstLifeNum * this.fleetsizetrucks * tempNonDrivenRatio);
              proposedResultModel.proposedNondrivenAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[0].nondrivenRunoutMilesSecondLife) * this.modelList[0].nondrivenTirePriceSecondLife * nondrivenNum * blendedNondrivenSecondLifeNum * this.fleetsizetrucks * tempNonDrivenRatioSecondLife);
            }


          }

          proposedResultModel.proposedTireCosts = this.returnZeroIfNaN(parseFloat(this.currentTireCosts.toFixed(2)));



          if (this.weightSavingObj != null) {

            var treadSizeKeySecondLife = this.modelList[0].autoCompleteDataTireDriveSecondLife + ' ' + this.weightSavingObj.currentDriveTireSize.toUpperCase();

            this.driveTireSecondLifeWeights.push(parseInt(this.treadSizeWeightMap[treadSizeKeySecondLife]));

            if (treadSizeKeySecondLife.toUpperCase().indexOf('X ONE') != -1) {
              this.driveTireRatioSecondLife.push(0.5);
            } else {
              this.driveTireRatioSecondLife.push(1);
            }



            if (this.nondrivenShow) {
              var nondrivenTreadSizeKeySecondLife = this.modelList[item].autoCompleteDataTireNondrivenSecondLife + ' ' + this.weightSavingObj.currentNondrivenTireSize.toUpperCase();
              this.nondrivenTireSecondLifeWeights.push(parseInt(this.treadSizeWeightMap[nondrivenTreadSizeKeySecondLife]));


              if (nondrivenTreadSizeKeySecondLife.toUpperCase().indexOf('X ONE') != -1) {
                this.nondrivenTireRatioSecondLife.push(0.5);
              } else {
                this.nondrivenTireRatioSecondLife.push(1);
              }

            }

            if (this.trailerShow) {
              var trailerTreadSizeKeySecondLife = this.modelList[item].autoCompleteDataTireTrailerSecondLife + ' ' + this.weightSavingObj.currentTrailerTireSize.toUpperCase();
              this.trailerTireSecondLifeWeights.push(parseInt(this.treadSizeWeightMap[trailerTreadSizeKeySecondLife]));


              if (trailerTreadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
                this.trailerTireRatioSecondLife.push(0.5);
              } else {
                this.trailerTireRatioSecondLife.push(1);
              }


            }

          }

        }



        this.currentTireCosts = parseFloat(this.currentTireCosts.toFixed(2));
        // alert(this.currentTireCosts)

        this.currentTireCostsWholeFleet = this.currentTireCosts * this.fleetsizetrucks;
        this.currentFuelAndTireAnnualCosts = this.currentFuelCosts + this.currentTireCosts;
        this.currentFuelAndTireAnnualCostsWholeFleet = this.currentTireCostsWholeFleet + this.currentFuelCostsWholeFleet;


        proposedResultModel.proposedTireCostsWholeFleet = this.returnZeroIfNaN(this.currentTireCostsWholeFleet);
        proposedResultModel.proposedFuelAndTireAnnualCosts = this.returnZeroIfNaN(this.currentFuelAndTireAnnualCosts);
        proposedResultModel.proposedFuelAndTireAnnualCostsWholeFleet = this.returnZeroIfNaN(this.currentFuelAndTireAnnualCostsWholeFleet);
        this.proposedModelList.push(proposedResultModel);


        if ((this.isFromBasicAnalysis && this.steercheckboxnewbasic) || (this.isFromBasicAnalysis == false && this.steercheckboxlifecyclenew)) {
          // currentSteerRollingResistance = treadRRMap[this.modelList[0].autoCompleteDataTireSteer];
          var rrValueSteerCurrent = this.rrBrandRes.filter(brand => ((brand.size == this.modelList[0].autoCompleteDataSizeSteer) && (brand.mfg == this.modelList[0].autoCompleteDataSteerBrand) && (brand.tread == this.modelList[0].autoCompleteDataTireSteer)));
          currentSteerRollingResistance = rrValueSteerCurrent[0].rr;
        }

        if ((this.isFromBasicAnalysis && this.drivecheckboxnewbasic) || (this.isFromBasicAnalysis == false && this.drivecheckboxlifecyclenew)) {
          //currentDriveRollingResistance = treadRRMap[this.modelList[0].autoCompleteDataTireDrive];
          var rrValueDrivenCurrent = this.rrBrandRes.filter(brand => (brand.size == this.modelList[0].autoCompleteDataSizeDrive && brand.mfg == this.modelList[0].autoCompleteDataDriveBrand && brand.tread == this.modelList[0].autoCompleteDataTireDrive));
          currentDriveRollingResistance = rrValueDrivenCurrent[0].rr;
        }


        //Space Symbol.
        //have to work on this
        this.currentTireFuelConsumedWholeFleets = Math.round(this.currentTireFuelConsumedWholeFleet).toLocaleString(this.localStr);

        console.log()

        this.currentFuelCostsWholeFleets = Math.round(this.currentFuelCostsWholeFleet).toLocaleString(this.localStr);
        this.currentTireCostsWholeFleets = Math.round(this.currentTireCostsWholeFleet).toLocaleString(this.localStr);
        this.currentFuelAndTireAnnualCostsWholeFleets = Math.round(this.currentFuelAndTireAnnualCostsWholeFleet).toLocaleString(this.localStr);



      } else {

        var currentRR = 0;
        var steerCon = parseFloat(localStorage.getItem("steerContribution"));
        var driveCon = parseFloat(localStorage.getItem("driveContribution"));
        var nondrivenCon = parseFloat(localStorage.getItem("nondrivenContribution"));
        var trailerCon = parseFloat(localStorage.getItem("trailerContribution"));
        var trailer2Con = parseFloat(localStorage.getItem("trailer2Contribution"));
        var trailer3Con = parseFloat(localStorage.getItem("trailer3Contribution"));
        var totalTire = parseFloat(localStorage.getItem("numoftotaltire"));


        var tempSteerRatio = 1;
        var tempDriveRatio = 1;
        var tempNonDrivenRatio = 1;
        var tempTrailerRatio = 1;


        if (this.modelList[item].autoCompleteDataTireSteer.toUpperCase().indexOf('X ONE') != -1) {
          tempSteerRatio = 0.5;
        }

        if (this.modelList[item].autoCompleteDataTireDrive.toUpperCase().indexOf('X ONE') != -1) {
          tempDriveRatio = 0.5;
        }

        if (this.modelList[item].autoCompleteDataTireNondriven.toUpperCase().indexOf('X ONE') != -1) {
          tempNonDrivenRatio = 0.5;
        }

        if (this.modelList[item].autoCompleteDataTireTrailer.toUpperCase().indexOf('X ONE') != -1) {
          tempTrailerRatio = 0.5;
        }

        if (this.weightSavingObj != null) {
          var treadSizeKey = this.modelList[item].autoCompleteDataTireDrive + ' ' + this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveTireSize.toUpperCase();

          if (treadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
            this.driveTireRatio.push(0.5);
          } else {
            this.driveTireRatio.push(1);
          }

          this.driveTireWeights.push(parseInt(this.treadSizeWeightMap[treadSizeKey]));
          this.driveWheelWeights.push(parseInt(this.wheelWeightsDict[this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveWheelType]));

          if (this.nondrivenShow) {
            var nondrivenTreadSizeKey = this.modelList[item].autoCompleteDataTireNondriven + ' ' + this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenTireSize.toUpperCase();
            this.nondrivenTireWeights.push(parseInt(this.treadSizeWeightMap[nondrivenTreadSizeKey]));
            this.nondrivenWheelWeights.push(parseInt(this.wheelWeightsDict[this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenWheelType]));


            if (nondrivenTreadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
              this.nondrivenTireRatio.push(0.5);
            } else {
              this.nondrivenTireRatio.push(1);
            }
          }

          if (this.trailerShow) {
            var trailerTreadSizeKey = this.modelList[item].autoCompleteDataTireTrailer + ' ' + this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerTireSize.toUpperCase();
            this.trailerWheelWeights.push(parseInt(this.wheelWeightsDict[this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerWheelType]));
            this.trailerTireWeights.push(parseInt(this.treadSizeWeightMap[trailerTreadSizeKey]));

            if (trailerTreadSizeKey.toUpperCase().indexOf('X ONE') != -1) {
              this.trailerTireRatio.push(0.5);
            } else {
              this.trailerTireRatio.push(1);
            }

          }


        }

        if ((this.isFromBasicAnalysis && this.steercheckboxnewbasic) || (this.isFromBasicAnalysis == false && this.steercheckboxlifecyclenew)) {
          currentRR += currentSteerRollingResistance * (steerCon);

        }

        if ((this.isFromBasicAnalysis && this.drivecheckboxnewbasic) || (this.isFromBasicAnalysis == false && this.drivecheckboxlifecyclenew)) {
          currentRR += currentDriveRollingResistance * (driveCon);
        }

        if (this.nondrivenShow) {
          if ((this.isFromBasicAnalysis && this.nondrivencheckboxnewbasic) || (this.isFromBasicAnalysis == false && this.nondrivencheckboxlifecyclenew)) {
            currentRR += currentNondrivenRollingResistance * (nondrivenCon);
          }
        }

        if (this.trailerShow) {
          if ((this.isFromBasicAnalysis && this.trailercheckboxnewbasic) || (this.isFromBasicAnalysis == false && this.trailercheckboxlifecyclenew)) {
            currentRR += currentTrailerRollingResistance * (trailerCon + trailer2Con + trailer3Con);
          }
          // alert(proposedRR+"  "+currentRR)
        }
        // currentRR = currentRR * (1 - 0.35 / 2)

        if (this.isFromBasicAnalysis) {
          var proposedRR = 0;
          var typeTireCount = 0;
          var totalTirePriceCurrent = 0;
          var totalTirePriceProp1 = 0;
          var totalTirePriceProp2 = 0
          if (this.steercheckboxnewbasic) {
            this.steerBrandCurr = this.modelList[0].autoCompleteDataSteerBrand;
            this.steerBrandProp1 = this.modelList[1].autoCompleteDataSteerBrand;
            this.steerSizeCurr = this.modelList[0].autoCompleteDataSizeSteer;
            this.steerSizeProp1 = this.modelList[1].autoCompleteDataSizeSteer;
            this.steerTradeCurr = this.modelList[0].autoCompleteDataTireSteer;
            this.steerTradeProp1 = this.modelList[1].autoCompleteDataTireSteer;
            this.steerMilesCurr = this.modelList[0].steerRunoutMiles;
            this.steerMilesProp1 = this.modelList[1].steerRunoutMiles;
            this.steerPriceCurr = this.modelList[0].steerTirePrice;
            this.steerPriceProp1 = this.modelList[1].steerTirePrice;
            this.totalRR1 = this.modelList[1].totalRollingResistance;


            totalTirePriceCurrent += this.modelList[0].steerTirePrice;
            totalTirePriceProp1 += this.modelList[1].steerTirePrice;
            typeTireCount += 1;

            if (this.proposedItems.length == 2) {
              this.steerBrandProp2 = this.modelList[2].autoCompleteDataSteerBrand;
              this.steerSizeProp2 = this.modelList[2].autoCompleteDataSizeSteer
              this.steerTradeProp2 = this.modelList[2].autoCompleteDataTireSteer;
              this.steerMilesProp2 = this.modelList[2].steerRunoutMiles;
              this.steerPriceProp2 = this.modelList[2].steerTirePrice;
              this.totalRR2 = this.modelList[2].totalRollingResistance;
              totalTirePriceProp2 += this.modelList[2].steerTirePrice;
            }
            //  proposedRR += this.modelList[item].steerBaseRollingResistance * steerCon * (currentSteerRollingResistance / 100);
            var rrValueSteerProposed = this.rrBrandRes.filter(brand => ((brand.size == this.modelList[item].autoCompleteDataSizeSteer) && (brand.mfg == this.modelList[item].autoCompleteDataSteerBrand) && (brand.tread == this.modelList[item].autoCompleteDataTireSteer)));
            proposedRR += rrValueSteerProposed[0].rr * (steerCon)
          }
          if (!this.steercheckboxnewbasic) {
            this.steerBrandCurr = '-';
            this.steerBrandProp1 = '-';
            this.steerSizeCurr = '-';
            this.steerSizeProp1 = '-';
            this.steerTradeCurr = '-';
            this.steerTradeProp1 = '-';
            this.steerMilesCurr = 0;
            this.steerMilesProp1 = 0;
            this.steerPriceCurr = 0;
            this.steerPriceProp1 = 0;
            this.totalRR1 = this.modelList[1].totalRollingResistance;
            if (this.proposedItems.length == 2) {
              this.steerBrandProp2 = '-';
              this.steerSizeProp2 = '-';
              this.steerTradeProp2 = '-';
              this.steerMilesProp2 = 0;
              this.steerPriceProp2 = 0;
              this.totalRR2 = this.modelList[2].totalRollingResistance;
            }
          }

          if (this.drivecheckboxnewbasic) {
            this.driveBrandCurr = this.modelList[0].autoCompleteDataDriveBrand;
            this.driveBrandProp1 = this.modelList[1].autoCompleteDataDriveBrand;
            this.driveSizeCurr = this.modelList[0].autoCompleteDataSizeDrive;
            this.driveSizeProp1 = this.modelList[1].autoCompleteDataSizeDrive
            this.driveTradeCurr = this.modelList[0].autoCompleteDataTireDrive;
            this.driveTradeProp1 = this.modelList[1].autoCompleteDataTireDrive
            this.driveMilesCurr = this.modelList[0].driveRunoutMiles;
            this.driveMilesProp1 = this.modelList[1].driveRunoutMiles;
            this.drivePriceCurr = this.modelList[0].driveTirePrice
            this.drivePriceProp1 = this.modelList[1].driveTirePrice

            totalTirePriceCurrent += this.modelList[0].driveTirePrice;
            totalTirePriceProp1 += this.modelList[1].driveTirePrice;
            typeTireCount += 1;

            if (this.proposedItems.length == 2) {
              this.driveBrandProp2 = this.modelList[2].autoCompleteDataDriveBrand;
              this.driveSizeProp2 = this.modelList[2].autoCompleteDataSizeDrive;
              this.driveTradeProp2 = this.modelList[2].autoCompleteDataTireDrive;
              this.driveMilesProp2 = this.modelList[2].driveRunoutMiles;
              this.drivePriceProp2 = this.modelList[2].driveTirePrice
              totalTirePriceProp2 += this.modelList[1].driveTirePrice;
            }
            // proposedRR += this.modelList[item].driveBaseRollingResistance * driveCon * (currentDriveRollingResistance / 100);
            let rrValueDriveProposed = this.rrBrandRes.filter(brand => (brand.size == this.modelList[item].autoCompleteDataSizeDrive && brand.mfg == this.modelList[item].autoCompleteDataDriveBrand && brand.tread == this.modelList[item].autoCompleteDataTireDrive));
            proposedRR += rrValueDriveProposed[0].rr * (driveCon)
          }
          if (!this.drivecheckboxnewbasic) {
            this.driveBrandCurr = '-';
            this.driveBrandProp1 = '-';
            this.driveSizeCurr = '-';
            this.driveSizeProp1 = '-';
            this.driveTradeCurr = '-';
            this.driveTradeProp1 = '-';
            this.driveMilesCurr = 0;
            this.driveMilesProp1 = 0;
            this.drivePriceCurr = 0;
            this.drivePriceProp1 = 0;
            if (this.proposedItems.length == 2) {
              this.driveBrandProp2 = '-';
              this.driveSizeProp2 = '-';
              this.driveTradeProp2 = '-';
              this.driveMilesProp2 = 0;
              this.drivePriceProp2 = 0;
            }
          }

          if (this.nondrivenShow && this.nondrivencheckboxnewbasic) {
            this.nondriveBrandCurr = this.modelList[0].autoCompleteDataNondrivenBrand;
            this.nondriveBrandProp1 = this.modelList[1].autoCompleteDataNondrivenBrand;
            this.nondriveSizeCurr = this.modelList[0].autoCompleteDataSizeNonDrive;
            this.nondriveSizeProp1 = this.modelList[1].autoCompleteDataSizeNonDrive;
            this.nondriveTradeCurr = this.modelList[0].autoCompleteDataTireNondriven;
            this.nondriveTradeProp1 = this.modelList[1].autoCompleteDataTireNondriven;
            this.nondriveMilesCurr = this.modelList[0].nondrivenRunoutMiles;
            this.nondriveMilesProp1 = this.modelList[1].nondrivenRunoutMiles;
            this.nondrivePriceCurr = this.modelList[0].nondrivenTirePrice;
            this.nondrivePriceProp1 = this.modelList[1].nondrivenTirePrice;

            totalTirePriceCurrent += this.modelList[0].nondrivenTirePrice;
            totalTirePriceProp1 += this.modelList[1].nondrivenTirePrice;
            typeTireCount += 1;

            if (this.proposedItems.length == 2) {
              this.nondriveBrandProp2 = this.modelList[2].autoCompleteDataNondrivenBrand;
              this.nondriveSizeProp2 = this.modelList[2].autoCompleteDataSizeNonDrive;
              this.nondriveTradeProp2 = this.modelList[2].autoCompleteDataTireNondriven;
              this.nondriveMilesProp2 = this.modelList[2].nondrivenRunoutMiles;
              this.nondrivePriceProp2 = this.modelList[2].nondrivenTirePrice;
              totalTirePriceProp2 += this.modelList[1].nondrivenTirePrice;
            }
            // proposedRR += this.modelList[item].nondrivenBaseRollingResistance * nondrivenCon * (currentNondrivenRollingResistance / 100);
            let rrValueNondriven = this.rrBrandRes.filter(brand => (brand.size == this.modelList[item].autoCompleteDataSizeNonDrive && brand.mfg == this.modelList[item].autoCompleteDataNondrivenBrand && brand.tread == this.modelList[item].autoCompleteDataTireNondriven));
            proposedRR += rrValueNondriven[0].rr * (nondrivenCon)
          }
          if (!this.nondrivenShow || !this.nondrivencheckboxnewbasic) {
            this.nondriveBrandCurr = '-';
            this.nondriveBrandProp1 = '-';
            this.nondriveSizeCurr = '-';
            this.nondriveSizeProp1 = '-';
            this.nondriveTradeCurr = '-';
            this.nondriveTradeProp1 = '-';
            this.nondriveMilesCurr = 0;
            this.nondriveMilesProp1 = 0;
            this.nondrivePriceCurr = 0;
            this.nondrivePriceProp1 = 0;
            if (this.proposedItems.length == 2) {
              this.nondriveBrandProp2 = '-';
              this.nondriveSizeProp2 = '-';
              this.nondriveTradeProp2 = '-';
              this.nondriveMilesProp2 = 0;
              this.nondrivePriceProp2 = 0;
            }
          }
          if (this.trailerShow && this.trailercheckboxnewbasic) {
            this.trailerBrandCurr = this.modelList[0].autoCompleteDataTrailerBrand;
            this.trailerBrandProp1 = this.modelList[1].autoCompleteDataTrailerBrand;
            this.trailerSizeCurr = this.modelList[0].autoCompleteDataSizeTrailer;
            this.trailerSizeProp1 = this.modelList[1].autoCompleteDataSizeTrailer;
            this.trailerTradeCurr = this.modelList[0].autoCompleteDataTireTrailer;
            this.trailerTradeProp1 = this.modelList[1].autoCompleteDataTireTrailer;
            this.trailerMilesCurr = this.modelList[0].trailerRunoutMiles;
            this.trailerMilesProp1 = this.modelList[1].trailerRunoutMiles;
            this.trailerPriceCurr = this.modelList[0].trailerTirePrice;
            this.trailerPriceProp1 = this.modelList[1].trailerTirePrice;

            totalTirePriceCurrent += this.modelList[0].trailerTirePrice;
            totalTirePriceProp1 += this.modelList[1].trailerTirePrice;
            typeTireCount += 1;

            if (this.proposedItems.length == 2) {
              this.trailerBrandProp2 = this.modelList[2].autoCompleteDataTrailerBrand;
              this.trailerSizeProp2 = this.modelList[2].autoCompleteDataSizeTrailer;
              this.trailerTradeProp2 = this.modelList[2].autoCompleteDataTireTrailer;
              this.trailerMilesProp2 = this.modelList[2].trailerRunoutMiles;
              this.trailerPriceProp2 = this.modelList[2].trailerTirePrice;
              totalTirePriceProp2 += this.modelList[1].trailerTirePrice;
            }
            // proposedRR += this.modelList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con) * (currentTrailerRollingResistance / 100);
            let rrValueTrailerproposed = this.rrBrandRes.filter(brand => (brand.size == this.modelList[item].autoCompleteDataSizeTrailer && brand.mfg == this.modelList[item].autoCompleteDataTrailerBrand && brand.tread == this.modelList[item].autoCompleteDataTireTrailer));
            proposedRR += rrValueTrailerproposed[0].rr * (trailerCon + trailer2Con + trailer3Con)
          }

          this.avgtirePriceCurrent = totalTirePriceCurrent / typeTireCount;
          this.avgtirePriceProp1 = totalTirePriceProp1 / typeTireCount;

          if (this.proposedItems.length == 2) {
            this.avgtirePriceProp2 = totalTirePriceProp2 / typeTireCount;
          }


          if (!this.trailerShow || !this.trailercheckboxnewbasic) {
            this.trailerBrandCurr = '-';
            this.trailerBrandProp1 = '-';
            this.trailerSizeCurr = '-';
            this.trailerSizeProp1 = '-';
            this.trailerTradeCurr = '-';
            this.trailerTradeProp1 = '-';
            this.trailerMilesCurr = 0;
            this.trailerMilesProp1 = 0;
            this.trailerPriceCurr = 0;
            this.trailerPriceProp1 = 0;
            if (this.proposedItems.length == 2) {
              this.trailerBrandProp2 = '-';
              this.trailerSizeProp2 = '-';
              this.trailerTradeProp2 = '-';
              this.trailerMilesProp2 = 0;
              this.trailerPriceProp2 = 0;
            }
          }

          //proposedRR = proposedRR * (1 - 0.35 / 2)
          //To be updated after getting data
          if (this.selectedCountry == 'India') {
            this.tempCOEF = 0.045 * (this.longhaul / 100) + 0.045 * (this.regional / 100) + 0.035 * (this.urban / 100);
          }
          else {
            this.tempCOEF = 0.055 * (this.longhaul / 100) + 0.045 * (this.regional / 100) + 0.035 * (this.urban / 100);
          }

          // var coefficient = ((currentRR - proposedRR) / currentRR) / parseInt(localStorage.getItem('aero'));
          //this coefficient is the same as fuel advantage in the PLE MyAccount tool updated formula, the reason for keeping the name as coefficient is to be consistent with the Fuel & Mileage app North American version name
          //Also needs to check whether to use the formula in the doc or update it since the current formula in the doc does not seem right
          // alert(proposedRR);
          var coefficient = -(((currentRR * this.totalRRCoef) - (proposedRR * this.totalRRCoef)) * (this.annualaverageloadoftruck * this.tempCOEF)).toFixed(2);
          var oneVehicleFuelCon = this.annualmpgpervehicle + coefficient;
          // alert(coefficient+ "  "+(this.annualaverageloadoftruck * this.tempCOEF)+ " "+(currentRR)+ " "+(proposedRR));
          var coefficientFuelConsumption = (this.annualmilespervehicle / 100) * oneVehicleFuelCon;

          var proposedResultModel = new ProposedScenarioCalculationResult();
          //CMC proposedResultModel.proposedFuelConsumpted = this.returnZeroIfNaN(parseFloat((this.currentTireFuelConsumed - coefficient).toFixed()));
          //CMC proposedResultModel.proposedFuelConsumptionFleet = this.returnZeroIfNaN(parseFloat((this.currentTireFuelConsumedWholeFleet - coefficient * this.fleetsizetrucks).toFixed()));
          proposedResultModel.proposedFuelConsumpted = this.returnZeroIfNaN(parseFloat((coefficientFuelConsumption).toFixed()));
          //have to check this part
          proposedResultModel.proposedFuelConsumptionFleet = this.returnZeroIfNaN(parseFloat((coefficientFuelConsumption * this.fleetsizetrucks).toFixed()));
          // alert(coefficientFuelConsumption +"samaresh")
          proposedResultModel.proposedFuelCosts = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelConsumpted * this.currentpriceoffuel).toFixed(2)));
          proposedResultModel.proposedFuelCostsWholeFleet = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts * this.fleetsizetrucks).toFixed(2)));

          if (this.steercheckboxnewbasic) {
            proposedResultModel.proposedTireCosts = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].steerRunoutMiles) * this.modelList[item].steerTirePrice * steerNum * tempSteerRatio);
          }

          if (this.drivecheckboxnewbasic) {
            proposedResultModel.proposedTireCosts += this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].driveRunoutMiles) * this.modelList[item].driveTirePrice * driveNum * tempDriveRatio);
          }
          if (this.steercheckboxnewbasic) {
            proposedResultModel.proposedSteerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].steerRunoutMiles) * this.modelList[item].steerTirePrice * steerNum * this.fleetsizetrucks * tempSteerRatio);
          }

          if (this.drivecheckboxnewbasic) {
            proposedResultModel.proposedDriveAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].driveRunoutMiles) * this.modelList[item].driveTirePrice * driveNum * this.fleetsizetrucks * tempDriveRatio);
          }

          if (this.nondrivenShow && this.nondrivencheckboxnewbasic) {
            proposedResultModel.proposedTireCosts += this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].nondrivenRunoutMiles) * this.modelList[item].nondrivenTirePrice * nondrivenNum * tempNonDrivenRatio);
            proposedResultModel.proposedNondrivenAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].nondrivenRunoutMiles) * this.modelList[item].nondrivenTirePrice * nondrivenNum * this.fleetsizetrucks * tempNonDrivenRatio);
          }

          if (this.trailerShow && this.trailercheckboxnewbasic) {
            proposedResultModel.proposedTireCosts += this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].trailerRunoutMiles) * this.modelList[item].trailerTirePrice * trailerNum * tempTrailerRatio);
            proposedResultModel.proposedTrailerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].trailerRunoutMiles) * this.modelList[item].trailerTirePrice * trailerNum * this.fleetsizetrucks * tempTrailerRatio);
          }


          proposedResultModel.proposedTireCosts = this.returnZeroIfNaN(parseFloat(proposedResultModel.proposedTireCosts.toFixed(2)));
          proposedResultModel.proposedTireCostsWholeFleet = this.returnZeroIfNaN(proposedResultModel.proposedTireCosts * this.fleetsizetrucks);

          proposedResultModel.proposedFuelAndTireAnnualCosts = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts + proposedResultModel.proposedTireCosts).toFixed(2)));
          proposedResultModel.proposedFuelAndTireAnnualCostsWholeFleet = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelAndTireAnnualCosts * this.fleetsizetrucks).toFixed(2)));



        } else {


          var tempSteerRatioSecondLife = 1;
          var tempDriveRatioSecondLife = 1;
          var tempNonDrivenRatioSecondLife = 1;
          var tempTrailerRatioSecondLife = 1;

          if (this.modelList[item].autoCompleteDataTireSteerSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempSteerRatioSecondLife = 0.5;
          }

          if (this.modelList[item].autoCompleteDataTireDriveSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempDriveRatioSecondLife = 0.5;
          }


          if (this.modelList[item].autoCompleteDataTireNondrivenSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempNonDrivenRatioSecondLife = 0.5;
          }

          if (this.modelList[item].autoCompleteDataTireTrailerSecondLife.toUpperCase().indexOf('X ONE') != -1) {
            tempTrailerRatioSecondLife = 0.5;
          }


          var currentRR = 0;

          var proposedRR = 0;

          if (this.steercheckboxlifecyclenew) {
            currentRR += this.modelList[0].steerBaseRollingResistance * steerCon * (currentSteerRollingResistance / 100) * blendedSteerFirstLifeNum + this.modelList[0].steerBaseRollingResistanceSecondLife * blendedSteerSecondLifeNum * (treadRRMap[this.modelList[0].autoCompleteDataTireSteerSecondLife] / 100) * steerCon;
            proposedRR += this.modelList[item].steerBaseRollingResistance * steerCon * (currentSteerRollingResistance / 100) * blendedSteerFirstLifeNum + this.modelList[item].steerBaseRollingResistanceSecondLife * blendedSteerSecondLifeNum * (treadRRMap[this.modelList[0].autoCompleteDataTireSteerSecondLife] / 100) * steerCon

          }

          if (this.drivecheckboxlifecyclenew) {
            currentRR += this.modelList[0].driveBaseRollingResistance * driveCon * (currentDriveRollingResistance / 100) * blendedDriveFirstLifeNum + this.modelList[0].driveBaseRollingResistanceSecondLife * blendedDriveSecondLifeNum * (treadRRMap[this.modelList[0].autoCompleteDataTireDriveSecondLife] / 100) * driveCon;
            proposedRR += this.modelList[item].driveBaseRollingResistance * driveCon * (currentDriveRollingResistance / 100) * blendedDriveFirstLifeNum + this.modelList[item].driveBaseRollingResistanceSecondLife * blendedDriveSecondLifeNum * (treadRRMap[this.modelList[0].autoCompleteDataTireDriveSecondLife] / 100) * driveCon;
          }
          if (this.nondrivenShow && this.nondrivencheckboxlifecyclenew) {
            currentRR += this.modelList[0].nondrivenBaseRollingResistance * nondrivenCon * (currentNondrivenRollingResistance / 100) * blendedNondrivenFirstLifeNum
              + this.modelList[0].nondrivenBaseRollingResistanceSecondLife * nondrivenCon * (treadRRMap[this.modelList[0].autoCompleteDataTireNondrivenSecondLife] / 100) * blendedNondrivenSecondLifeNum;

            proposedRR += this.modelList[item].nondrivenBaseRollingResistance * nondrivenCon * (currentNondrivenRollingResistance / 100) * blendedNondrivenFirstLifeNum
              + this.modelList[item].nondrivenBaseRollingResistanceSecondLife * nondrivenCon * (treadRRMap[this.modelList[0].autoCompleteDataTireNondrivenSecondLife] / 100) * blendedNondrivenSecondLifeNum;
          }

          if (this.trailerShow && this.trailercheckboxlifecyclenew) {

            currentRR += this.modelList[0].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con) * (currentTrailerRollingResistance / 100) * blendedTrailerFirstLifeNum
              + this.modelList[0].trailerBaseRollingResistanceSecondLife * (trailerCon + trailer2Con + trailer3Con) * (treadRRMap[this.modelList[0].autoCompleteDataTireTrailerSecondLife] / 100) * blendedTrailerSecondLifeNum;

            proposedRR += this.modelList[item].trailerBaseRollingResistance * (trailerCon + trailer2Con + trailer3Con) * (currentTrailerRollingResistance / 100) * blendedTrailerFirstLifeNum
              + this.modelList[item].trailerBaseRollingResistanceSecondLife * (trailerCon + trailer2Con + trailer3Con) * (treadRRMap[this.modelList[0].autoCompleteDataTireTrailerSecondLife] / 100) * blendedTrailerSecondLifeNum;
          }
          // alert(proposedRR);


          // var coefficient = ((currentRR - proposedRR) / currentRR) / parseInt(localStorage.getItem('aero'));
          //To be updated after getting data
          if (this.selectedCountry == 'India') {
            this.tempCOEF = 0.045 * this.longhaul / 100 + 0.045 * this.regional / 100 + 0.035 * this.urban / 100;
          }
          else {
            this.tempCOEF = 0.055 * this.longhaul / 100 + 0.045 * this.regional / 100 + 0.035 * this.urban / 100;
          }


          var coefficient = ((((currentRR - proposedRR) * this.totalRRCoef) / (this.annualaverageloadoftruck * this.tempCOEF)) / 100) * this.annualmilespervehicle;

          var proposedResultModel = new ProposedScenarioCalculationResult();
          proposedResultModel.proposedFuelConsumpted = this.returnZeroIfNaN(parseFloat((this.currentTireFuelConsumed - coefficient).toFixed()));
          proposedResultModel.proposedFuelConsumptionFleet = this.returnZeroIfNaN(parseFloat((this.currentTireFuelConsumedWholeFleet - this.fleetsizetrucks * coefficient).toFixed(2)));

          // alert(this.fleetsizetrucks * coefficient)
          // console.log(proposedResultModel.proposedFuelConsumptionFleet+"testReverse")
          proposedResultModel.proposedFuelCosts = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelConsumpted * this.currentpriceoffuel).toFixed(2)));
          proposedResultModel.proposedFuelCostsWholeFleet = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts * this.fleetsizetrucks).toFixed(2)));


          if (this.steercheckboxlifecyclenew) {
            proposedResultModel.proposedTireCosts = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].steerRunoutMiles) * this.modelList[item].steerTirePrice * steerNum * blendedSteerFirstLifeNum * tempSteerRatio
              + (this.annualmilespervehicle / this.modelList[item].steerRunoutMilesSecondLife) * this.modelList[item].steerTirePriceSecondLife * steerNum * blendedSteerSecondLifeNum * tempSteerRatioSecondLife);


          }

          if (this.drivecheckboxlifecyclenew) {
            proposedResultModel.proposedTireCosts += this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].driveRunoutMiles) * this.modelList[item].driveTirePrice * driveNum * blendedDriveFirstLifeNum * tempDriveRatio
              + (this.annualmilespervehicle / this.modelList[item].driveRunoutMilesSecondLife) * this.modelList[item].driveTirePriceSecondLife * driveNum * blendedDriveSecondLifeNum * tempDriveRatioSecondLife);
          }

          if (this.steercheckboxlifecyclenew) {
            proposedResultModel.proposedSteerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].steerRunoutMiles) * this.modelList[item].steerTirePrice * steerNum * blendedSteerFirstLifeNum * this.fleetsizetrucks * tempSteerRatio);
            proposedResultModel.proposedSteerAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].steerRunoutMilesSecondLife) * this.modelList[item].steerTirePriceSecondLife * steerNum * blendedSteerSecondLifeNum * this.fleetsizetrucks * tempSteerRatioSecondLife);
          }

          if (this.drivecheckboxlifecyclenew) {
            proposedResultModel.proposedDriveAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].driveRunoutMiles) * this.modelList[item].driveTirePrice * driveNum * blendedDriveFirstLifeNum * this.fleetsizetrucks * tempDriveRatio);
            proposedResultModel.proposedDriveAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].driveRunoutMilesSecondLife) * this.modelList[item].driveTirePriceSecondLife * driveNum * blendedDriveSecondLifeNum * this.fleetsizetrucks * tempDriveRatioSecondLife);
          }



          if (this.nondrivenShow && this.nondrivencheckboxlifecyclenew) {
            proposedResultModel.proposedTireCosts += this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].nondrivenRunoutMiles) * this.modelList[item].nondrivenTirePrice * nondrivenNum * blendedNondrivenFirstLifeNum * tempNonDrivenRatio
              + (this.annualmilespervehicle / this.modelList[item].nondrivenRunoutMilesSecondLife) * this.modelList[item].nondrivenTirePriceSecondLife * nondrivenNum * blendedNondrivenSecondLifeNum * tempNonDrivenRatioSecondLife);


            proposedResultModel.proposedNondrivenAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].nondrivenRunoutMiles) * this.modelList[item].nondrivenTirePrice * nondrivenNum * blendedNondrivenFirstLifeNum * this.fleetsizetrucks * tempNonDrivenRatio);
            proposedResultModel.proposedNondrivenAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].nondrivenRunoutMilesSecondLife) * this.modelList[item].nondrivenTirePriceSecondLife * nondrivenNum * blendedNondrivenSecondLifeNum * this.fleetsizetrucks * tempNonDrivenRatioSecondLife);
          }

          if (this.trailerShow && this.trailercheckboxlifecyclenew) {
            proposedResultModel.proposedTireCosts += this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].trailerRunoutMiles) * this.modelList[item].trailerTirePrice * trailerNum * blendedTrailerFirstLifeNum * tempTrailerRatio
              + (this.annualmilespervehicle / this.modelList[item].trailerRunoutMilesSecondLife) * this.modelList[item].trailerTirePriceSecondLife * trailerNum * blendedTrailerSecondLifeNum * tempTrailerRatioSecondLife);


            proposedResultModel.proposedTrailerAnnualTireCostWholeFleet = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].trailerRunoutMiles) * this.modelList[item].trailerTirePrice * trailerNum * blendedTrailerFirstLifeNum * this.fleetsizetrucks * tempTrailerRatio);
            proposedResultModel.proposedTrailerAnnualTireCostWholeFleetSecondLife = this.returnZeroIfNaN((this.annualmilespervehicle / this.modelList[item].trailerRunoutMilesSecondLife) * this.modelList[item].trailerTirePriceSecondLife * trailerNum * blendedTrailerSecondLifeNum * this.fleetsizetrucks * tempTrailerRatioSecondLife);

          }

          proposedResultModel.proposedTireCosts = this.returnZeroIfNaN(parseFloat(proposedResultModel.proposedTireCosts.toFixed(2)));

          proposedResultModel.proposedTireCostsWholeFleet = this.returnZeroIfNaN(proposedResultModel.proposedTireCosts * this.fleetsizetrucks);

          proposedResultModel.proposedFuelAndTireAnnualCosts = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts + proposedResultModel.proposedTireCosts).toFixed(2)));

          proposedResultModel.proposedFuelAndTireAnnualCostsWholeFleet = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelAndTireAnnualCosts * this.fleetsizetrucks).toFixed(2)));



          if (this.weightSavingObj != null) {
            var treadSizeKeySecondLife = this.modelList[item].autoCompleteDataTireDriveSecondLife + ' ' + this.weightSavingObj.proposedIndexModelObjMap[item].proposedDriveTireSize.toUpperCase();

            if (treadSizeKeySecondLife.toUpperCase().indexOf('X ONE') != -1) {
              this.driveTireRatioSecondLife.push(0.5);
            } else {
              this.driveTireRatioSecondLife.push(1);
            }

            this.driveTireSecondLifeWeights.push(parseInt(this.treadSizeWeightMap[treadSizeKeySecondLife]));

            if (this.nondrivenShow) {
              var nondrivenTreadSizeKeySecondLife = this.modelList[item].autoCompleteDataTireNondrivenSecondLife + ' ' + this.weightSavingObj.proposedIndexModelObjMap[item].proposedNondrivenTireSize.toUpperCase();
              this.nondrivenTireSecondLifeWeights.push(parseInt(this.treadSizeWeightMap[nondrivenTreadSizeKeySecondLife]));
              if (nondrivenTreadSizeKeySecondLife.toUpperCase().indexOf('X ONE') != -1) {
                this.nondrivenTireRatioSecondLife.push(0.5);
              } else {
                this.nondrivenTireRatioSecondLife.push(1);
              }
            }

            if (this.trailerShow) {
              var trailerTreadSizeKeySecondLife = this.modelList[item].autoCompleteDataTireTrailerSecondLife + ' ' + this.weightSavingObj.proposedIndexModelObjMap[item].proposedTrailerTireSize.toUpperCase();
              this.trailerTireSecondLifeWeights.push(parseInt(this.treadSizeWeightMap[trailerTreadSizeKeySecondLife]));

              if (trailerTreadSizeKeySecondLife.toUpperCase().indexOf('X ONE') != -1) {
                this.trailerTireRatioSecondLife.push(0.5);
              } else {
                this.trailerTireRatioSecondLife.push(1);
              }
            }
          }

        }
        //cgd
        proposedResultModel.proposedFuelConsumptionSaving = this.returnZeroIfNaN(parseFloat((this.currentTireFuelConsumed - proposedResultModel.proposedFuelConsumpted).toFixed(2)));
        // if(localStorage.getItem("selectedRegionPdf")=='AIM' || localStorage.getItem("selectedRegionPdf")=='AMS'){
        //   proposedResultModel.proposedFuelConsumptionSavingWholeFleet = this.returnZeroIfNaN(parseFloat(((proposedResultModel.proposedFuelConsumptionFleet - this.currentTireFuelConsumedWholeFleet).toFixed(2))));
        //   proposedResultModel.proposedAnnualFuelCostSaving = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts - this.currentFuelCosts).toFixed(2)));
        // }
        // else{


        proposedResultModel.proposedFuelConsumptionSavingWholeFleet = this.returnZeroIfNaN(parseFloat(((proposedResultModel.proposedFuelConsumptionFleet - this.currentTireFuelConsumedWholeFleet).toFixed(2))));
        proposedResultModel.proposedAnnualFuelCostSaving = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts - this.currentFuelCosts).toFixed(2)));
        console.log(proposedResultModel.proposedFuelConsumptionFleet + "hello");
        // }



        proposedResultModel.proposedAnnualFuelCostSavingWholeFleet = this.returnZeroIfNaN(proposedResultModel.proposedAnnualFuelCostSaving * this.fleetsizetrucks);



        proposedResultModel.proposedAnnualCostDifference = this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedTireCosts - this.currentTireCosts).toFixed(2)));
        proposedResultModel.proposedAnnualCostDifferenceWholeFleet = this.returnZeroIfNaN(proposedResultModel.proposedAnnualCostDifference * this.fleetsizetrucks);

        if (this.fuel_calculation_toggle) {
          proposedResultModel.proposedFuelandTireCostSaving += this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedFuelCosts - this.currentFuelCosts).toFixed(2)));
          console.log("THE FUEL")
        }

        if (this.mileage_calculation_toggle) {
          console.log("THE FUEL M")

          proposedResultModel.proposedFuelandTireCostSaving += this.returnZeroIfNaN(parseFloat((proposedResultModel.proposedTireCosts - this.currentTireCosts).toFixed(2)));
        }

        proposedResultModel.proposedFuelandTireCostSavingWholeFleet = this.returnZeroIfNaN(proposedResultModel.proposedFuelandTireCostSaving * this.fleetsizetrucks);
        //proposedFuelConsumptionFleet
        proposedResultModel.proposedFuelConsumptionSavingPercentage = this.returnZeroIfNaN(parseFloat(((proposedResultModel.proposedAnnualFuelCostSaving / this.currentFuelCosts) * 100).toFixed(1)));
        proposedResultModel.proposedTireCostDifferencePercentage = this.returnZeroIfNaN(parseFloat(((proposedResultModel.proposedAnnualCostDifference / this.currentTireCosts) * 100).toFixed(1)));
        proposedResultModel.proposedFuelandNetSavingPercentage = this.returnZeroIfNaN(parseFloat(((proposedResultModel.proposedFuelandTireCostSaving / this.currentFuelAndTireAnnualCosts) * 100).toFixed(1)));

        if (this.weightSaving && this.weightSavingObj != null) {

          var nondrivenOriginal = 0;
          var nondrivenProposed = 0;
          var nondrivenNumCurrentRatio = 0;
          var nondrivenNumberProposedRatio = 0;
          var nondrivenNumcurrentRatioSecondLife = 0;
          var nondrivenNumproposedRatioSecondLife = 0;
          if (this.nondrivenShow) {
            nondrivenOriginal = this.nondrivenWheelWeights[0] + this.nondrivenTireWeights[0];
            nondrivenProposed = this.nondrivenWheelWeights[item] + this.nondrivenTireWeights[item];
            if (this.nondrivenTireRatio[0] != null) {
              nondrivenNumCurrentRatio = this.nondrivenTireRatio[0];
            }

            if (this.nondrivenTireRatio[item] != null) {
              nondrivenNumberProposedRatio = this.nondrivenTireRatio[item];
            }

            if (!this.isFromBasicAnalysis) {
              if (this.nondrivenTireRatioSecondLife[0] != null) {
                nondrivenNumcurrentRatioSecondLife = this.nondrivenTireRatioSecondLife[0];
              }

              if (this.nondrivenTireRatioSecondLife[item] != null) {
                nondrivenNumproposedRatioSecondLife = this.nondrivenTireRatioSecondLife[item];
              }
            }

          }


          // if(this.isFromBasicAnalysis) {
          var driveOriginal = this.driveTireWeights[0] + this.driveWheelWeights[0];
          var driveProposed = (this.driveTireWeights[item] + this.driveWheelWeights[item]);

          if ((this.isFromBasicAnalysis && this.drivecheckboxnewbasic) || (!this.isFromBasicAnalysis && this.drivecheckboxlifecyclenew == true)) {
            proposedResultModel.driveLoad = this.returnZeroIfNaN((driveOriginal * driveNum * this.driveTireRatio[0] - driveProposed * driveNum * this.driveTireRatio[item]));
          }

          if ((this.isFromBasicAnalysis && this.nondrivencheckboxnewbasic) || (!this.isFromBasicAnalysis && this.nondrivencheckboxlifecyclenew == true)) {
            proposedResultModel.driveLoad += this.returnZeroIfNaN((nondrivenOriginal * nondrivenNumCurrentRatio * nondrivenNum - nondrivenProposed * nondrivenNum * nondrivenNumberProposedRatio));
          }

          var trailerOriginal = 0;
          var trailerProposed = 0;
          var currentTrailerRatio = 0;
          var proposedTrailerRatio = 0;

          if (this.trailerShow) {

            if (this.trailerTireRatio[0] != null) {
              currentTrailerRatio = this.trailerTireRatio[0];
            }


            if (this.trailerTireRatio[item] != null) {
              proposedTrailerRatio = this.trailerTireRatio[item];
            }

            if ((this.isFromBasicAnalysis && this.trailercheckboxnewbasic) || (!this.isFromBasicAnalysis && this.trailercheckboxlifecyclenew)) {
              proposedResultModel.trailerLoad = this.returnZeroIfNaN((this.trailerWheelWeights[0] + this.trailerTireWeights[0]) * trailerNum * currentTrailerRatio - (this.trailerTireWeights[item] + this.trailerWheelWeights[item]) * trailerNum * proposedTrailerRatio);
            }
          }



          var fractions = 0;
          var numerators = 0;


          if ((this.isFromBasicAnalysis && this.drivecheckboxnewbasic) || (!this.isFromBasicAnalysis && this.drivecheckboxlifecyclenew)) {
            fractions = driveProposed * driveNum * this.driveTireRatio[item];

            numerators = driveOriginal * driveNum * this.driveTireRatio[0];
          }

          if ((this.isFromBasicAnalysis && this.nondrivencheckboxnewbasic) || (!this.isFromBasicAnalysis && this.nondrivencheckboxlifecyclenew)) {
            fractions += nondrivenNum * nondrivenProposed * nondrivenNumberProposedRatio;

            numerators += nondrivenOriginal * nondrivenNum * nondrivenNumCurrentRatio;
          }

          if ((this.isFromBasicAnalysis && this.trailercheckboxnewbasic) || (!this.isFromBasicAnalysis && this.trailercheckboxlifecyclenew)) {
            fractions += (this.trailerTireWeights[item] + this.trailerWheelWeights[item]) * trailerNum * proposedTrailerRatio;

            numerators += (this.trailerWheelWeights[0] + this.trailerTireWeights[0]) * trailerNum * currentTrailerRatio;
          }



          proposedResultModel.difference = this.returnZeroIfNaN(parseFloat(((1 - (fractions) / (numerators)) * 100).toFixed(1)));

          proposedResultModel.protentialWeightSavings = this.returnZeroIfNaN(proposedResultModel.trailerLoad + proposedResultModel.driveLoad);

          if (this.weightSavingObj.selectedPayload.split("-").length > 0) {
            proposedResultModel.additionalUnitsPerload = this.returnZeroIfNaN(parseInt((proposedResultModel.protentialWeightSavings / parseFloat(this.weightSavingObj.selectedPayload.split('-')[1].trim().split(' ')[0])).toFixed(2)));
          }

          proposedResultModel.additionalRevenuePerload = this.returnZeroIfNaN(parseFloat((proposedResultModel.additionalUnitsPerload * this.weightSavingObj.revenuePerUnit).toFixed(2)));

          proposedResultModel.loadsPerYear = this.returnZeroIfNaN(this.weightSavingObj.loadsPerWeek * 52);

          proposedResultModel.additionalRevenusPerMonth = this.returnZeroIfNaN(parseFloat((proposedResultModel.loadsPerYear / 12 * (proposedResultModel.additionalRevenuePerload)).toFixed(2)));

          proposedResultModel.additionalRevenuePerYear = this.returnZeroIfNaN(proposedResultModel.additionalRevenusPerMonth * 12);

          proposedResultModel.WholeFleetAdditionalRevenuePerYear = this.returnZeroIfNaN(proposedResultModel.additionalRevenuePerYear * this.fleetsizetrucks);
        }
        // if (localStorage.getItem("selectedRegionPdf") == 'AIM' || localStorage.getItem("selectedRegionPdf") == 'AMS') {
        //   proposedResultModel.proposedFuelConsumptionFleets = Math.round(proposedResultModel.proposedFuelConsumptionFleet).toLocaleString(this.localStr);
        //   proposedResultModel.proposedFuelCostsWholeFleets = Math.round(proposedResultModel.proposedFuelCostsWholeFleet).toLocaleString(this.localStr);
        // }
        // else {
        //have to work on this
        proposedResultModel.proposedFuelConsumptionFleets = Math.round(proposedResultModel.proposedFuelConsumptionFleet).toLocaleString(this.localStr);
        proposedResultModel.proposedFuelCostsWholeFleets = Math.round(proposedResultModel.proposedFuelCostsWholeFleet).toLocaleString(this.localStr);
        // }


        proposedResultModel.proposedTireCostsWholeFleets = Math.round(proposedResultModel.proposedTireCostsWholeFleet).toLocaleString(this.localStr);
        proposedResultModel.proposedFuelAndTireAnnualCostsWholeFleets = Math.round(proposedResultModel.proposedFuelAndTireAnnualCostsWholeFleet).toLocaleString(this.localStr);

        proposedResultModel.proposedFuelConsumptionSavingWholeFleets = Math.round(proposedResultModel.proposedFuelConsumptionSavingWholeFleet).toLocaleString(this.localStr);
        proposedResultModel.proposedAnnualFuelCostSavingWholeFleets = Math.round(proposedResultModel.proposedAnnualFuelCostSavingWholeFleet).toLocaleString(this.localStr);
        proposedResultModel.proposedAnnualCostDifferenceWholeFleets = Math.round(proposedResultModel.proposedAnnualCostDifferenceWholeFleet).toLocaleString(this.localStr);
        proposedResultModel.proposedFuelandTireCostSavingWholeFleets = Math.round(proposedResultModel.proposedFuelandTireCostSavingWholeFleet).toLocaleString(this.localStr);

        this.proposedModelList.push(proposedResultModel);



      }

    }



    var totalSaings = [];
    var maxId = 1;
    var maxValue = this.proposedModelList[1].proposedFuelandTireCostSavingWholeFleet
    for (var idNum = 1; idNum < this.proposedModelList.length; idNum++) {
      if (this.proposedModelList[idNum].proposedFuelandTireCostSavingWholeFleet > maxValue) {
        maxValue = this.proposedModelList[idNum].proposedFuelandTireCostSavingWholeFleet;
        maxId = idNum;
      }
    }

    this.maximumPotentialId = maxId;
    this.maximumPotentialValue = maxValue;


    //= ((((((this.currentFuelCostsWholeFleet/this.currentpriceoffuel)*50)/1000) - (((this.proposedModelList[1].proposedFuelCostsWholeFleet /this.currentpriceoffuel)*50)/1000)) + ((((this.currentTireCostsWholeFleet/this.avgtirePriceCurrent)*1.21*50)/1000) - (((this.proposedModelList[1].proposedTireCostsWholeFleet/this.avgtirePriceProp1)*1.21*50)/1000))/((((this.currentFuelCostsWholeFleet/this.currentpriceoffuel)*50)/1000)+(((this.currentTireCostsWholeFleet/this.avgtirePriceCurrent)*1.21*50)/1000))));
    this.currentCo2SaveTire = ((((this.currentTireCostsWholeFleet / this.avgtirePriceCurrent) * 2.3 * 50) / 1000));
    this.currentCo2SaveFuel = ((((this.currentFuelCostsWholeFleet / this.currentpriceoffuel) * 3.24) / 1000));
    this.co2Totalcurrent = this.currentCo2SaveTire + this.currentCo2SaveFuel;
    this.propCo2SaveTire1 = ((((this.proposedModelList[1].proposedTireCostsWholeFleet / this.avgtirePriceProp1) * 2.3 * 50) / 1000));
    this.propCo2SaveFuel1 = ((((this.proposedModelList[1].proposedFuelCostsWholeFleet / this.currentpriceoffuel) * 3.24) / 1000));
    if (this.proposedModelList.length > 2) {
      this.propCo2SaveTire2 = (((this.proposedModelList[2].proposedTireCostsWholeFleet / this.avgtirePriceProp2) * 2.3 * 50) / 1000);
      this.propCo2SaveFuel2 = (((this.proposedModelList[2].proposedFuelCostsWholeFleet / this.currentpriceoffuel) * 3.24) / 1000);
    }
    this.co2Totalprop1 = this.propCo2SaveTire1 + this.propCo2SaveFuel1
    this.co2Totalprop2 = this.propCo2SaveTire2 + this.propCo2SaveFuel2
    this.co2FuelGap1 = -this.currentCo2SaveFuel + this.propCo2SaveFuel1;
    this.co2TireGap1 = -this.currentCo2SaveTire + this.propCo2SaveTire1;
    this.co2FuelGap2 = -this.currentCo2SaveFuel + this.propCo2SaveFuel2;
    this.co2TireGap2 = -this.currentCo2SaveTire + this.propCo2SaveTire2;
    this.co2Totalgappercentage1 = ((-this.co2Totalcurrent + this.co2Totalprop1) / this.co2Totalcurrent) * 100;
    this.co2Totalgappercentage2 = ((-this.co2Totalcurrent + this.co2Totalprop2) / this.co2Totalcurrent) * 100;

  }



  ionViewWillLeave() {

    console.log("leave result page")
    localStorage.setItem('resultPageProposedModelList', JSON.stringify(this.proposedModelList));

  }



  saveTable() {
    let loading = this.loadingController.create({
      content: 'Preparing..'
    });
    loading.present();
    var obj = this;
    var useHeight1 = document.getElementById('tableresult').scrollHeight;
    var useWidth1 = document.getElementById('tableresult').scrollWidth * 1.5;

    html2canvas(document.getElementById("tableresult"), { width: useWidth1, height: useHeight1 * 2.5 }).then
      (function (canvas) {
        var imgData = canvas.toDataURL(
          'image/png');
        obj.screenshot = imgData;
        var image = new Image();
        image.src = imgData;

        image.onload = function () {

          var imgWidth = image.naturalWidth,
            imgHeight = image.naturalHeight;
          // alert(imgWidth + " " + imgHeight);
          localStorage.removeItem('tableresultHeight');
          localStorage.removeItem('tableresultWidth');
          localStorage.setItem('tableresultHeight', imgHeight.toString());
          localStorage.setItem('tableresultWidth', imgWidth.toString());
        };

        var useHeight = document.getElementById('tabledata').scrollHeight;
        var useWidth = document.getElementById('tabledata').scrollWidth * 1.5;
        html2canvas(document.getElementById("tabledata"), { width: useWidth, height: useHeight * 2.5 }).then
          (function (canvas) {
            var imgData = canvas.toDataURL(
              'image/png');
            localStorage.setItem('tableData', imgData);

            loading.dismiss();
            obj.testPdfs();


          });

      });




  }


  saveTableData() {



  }


  saveTableOne() {
    localStorage.removeItem('tableresultOne');
    var useHeight1 = document.getElementById('tableresultOne').scrollHeight;
    var useWidth1 = document.getElementById('tableresultOne').scrollWidth;
    html2canvas(document.getElementById("tableresultOne"), { width: useWidth1, height: useHeight1 * 1.1 }).then
      (function (canvas) {
        var imgData = canvas.toDataURL(
          'image/png');
        var image = new Image();
        image.src = imgData;
        image.onload = function () {
          var imgWidth = image.naturalWidth,
            imgHeight = image.naturalHeight;
          // alert(imgWidth + " " + imgHeight);
          localStorage.removeItem('tableresultHeightone');
          localStorage.removeItem('tableresultWidthone');


        };

      });

    //this.saveTableTwo();

  }

  saveTableTwo() {
    localStorage.removeItem('tableresultTwo');
    var useHeight1 = document.getElementById('tableresultTwo').scrollHeight;
    var useWidth1 = document.getElementById('tableresultTwo').scrollWidth;
    html2canvas(document.getElementById("tableresultTwo"), { width: useWidth1, height: useHeight1 * 1.1 }).then
      (function (canvas) {
        var imgData = canvas.toDataURL(
          'image/png');
        var image = new Image();
        image.src = imgData;
        image.onload = function () {
          var imgWidth = image.naturalWidth,
            imgHeight = image.naturalHeight;
          // alert(imgWidth + " " + imgHeight);
          localStorage.removeItem('tableresultHeighttwo');
          localStorage.removeItem('tableresultWidthtwo');

        };

      });
  }
  isInt = function (n) {
    // console.log(n);
    if (!isNaN(n)) {
      if (parseInt(n.toFixed(2)) === parseFloat(n.toFixed(2))) {
        // return '.00';
      } else {
        if (n.toString().split(".")[1].length < 2) {
          //   return '0';
        }
      }
    }

  };

  isIntTenthDecimal = function (n) {
    if (parseInt(n.toString()) === n) {
      // return '.0';
    }
  };


  returnZeroIfNaN(input) {
    if (isNaN(input)) {
      return 0;
    }

    return input
  }


  getParseInt(input) {
    if (input == null || isNaN(input)) {
      return 0;
    }

    return Math.round(input)
  }


  goBack() {

    // if(localStorage.getItem('basicAnalysisList') != null){
    //   if(localStorage.getItem("lifeCycleAnalysisList") != null){
    //       this.navCtrl.push(TabsPage, {
    //       "basicAnalysis": localStorage.getItem('basicAnalysisList'),
    //       "lifeCycleAnalysis": localStorage.getItem("lifeCycleAnalysisList"),
    //       "trailerShow": this.trailerShow,
    //       "nondrivenShow": this.nondrivenShow
    //     });
    //   }else{
    //       this.navCtrl.push(TabsPage, {
    //       "basicAnalysis": localStorage.getItem("basicAnalysisList"),
    //       "trailerShow": this.trailerShow,
    //       "nondrivenShow": this.nondrivenShow
    //     });
    //   }
    // }else{
    //     this.navCtrl.push(TabsPage, {
    //     "trailerShow": this.trailerShow,
    //     "nondrivenShow": this.nondrivenShow
    //   });
    // }

    //new code 

    if (localStorage.getItem('basicAnalysisList') != null) {

      if (localStorage.getItem("lifeCycleAnalysisList") != null) {

        this.navCtrl.push(TabsPage, {
          "basicAnalysis": localStorage.getItem('basicAnalysisList'),
          "lifeCycleAnalysis": localStorage.getItem("lifeCycleAnalysisList"),
          "trailerShow": this.trailerShow,
          "nondrivenShow": this.nondrivenShow
        });
      } else {


        this.navCtrl.push(TabsPage, {
          "basicAnalysis": localStorage.getItem("basicAnalysisList"),
          "trailerShow": this.trailerShow,
          "nondrivenShow": this.nondrivenShow
        });
      }


    }
    // else{
    //   this.trailerShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].trailer > 0 ? true : false;
    //   this.nondrivenShow = this.vehicleTrailerNondrivenMap[this.autoCompleteData].nondriven > 0 ? true : false;
    //   this.navCtrl.push(TabsPage, {
    //     "trailerShow": this.trailerShow,
    //     "nondrivenShow": this.nondrivenShow
    //   });
    // }
  }
  testPdf() {
    this.presentLoadings();
  }

  presentLoadings() {
    // this.saveTableData();
    this.saveTable();

    // let loading = this.loadingController.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    // setTimeout(() => {
    //   this.testPdfs();
    //   loading.dismiss();
    // }, 8000);
  }

  testPdfs() {
    //gpr..
    var htmlStr = "";
    var height = parseFloat(localStorage.getItem('tableresultHeight'));
    var width = parseFloat(localStorage.getItem('tableresultWidth'));
    var heightCal = Math.round(parseFloat(localStorage.getItem('tableresultHeight')) / (parseFloat(localStorage.getItem('tableresultWidth')) / 8.5));
    if (!this.isFromBasicAnalysis) {
      var firstLifeHeight = Math.round(parseFloat(localStorage.getItem('firstLifeHeight')) / (parseFloat(localStorage.getItem('tableresultWidth')) / 8.5));
    }
    var usedHeight = heightCal; //(heightCal >= firstLifeHeight) ? heightCal : firstLifeHeight
    if (usedHeight < 11.5) {
      usedHeight = 11.5
    }
    htmlStr += "<!DOCTYPE html><html><head><style>@page { size:" + " 11.7in" + " " + "8.27in" + "; margin:" + " 0.2in" + " " + " 0in" + " " + " 0in" + " " + " 0.2in" + "}</style></head>";
    htmlStr += "<body style='background-color: #FFFFFF'>";


    //if (usedHeight >= heightCal) {
    if (!this.showcalculation) {

      htmlStr += "<header justify-content-center style='width: 100%;text-align: center;'><h3>" + "FleetName : " + this.fleetNameInfo + "</h3></header><img alt='Embedded Image' style='width: 100%; height: 100%;  page-break-after: always' src='" + this.screenshot + "'><footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>1 of 2</footer>";

      htmlStr += "<header justify-content-center style='width: 100%;text-align: center;'><h3>" + this.translateService.instant("fleet_details") + "</h3></header><img alt='Embedded Image' style='width: 100%; height: 100%;  page-break-after: always' src='" + localStorage.getItem('tableData') + "'><footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>2 of 2</footer>";


    } else {

      htmlStr += "<header justify-content-center style='width: 100%;text-align: center;'><h3>" + "FleetName : " + this.fleetNameInfo + "</h3></header><img alt='Embedded Image' style='width: 100%; height: 100%;  page-break-after: always' src='" + this.screenshot + "'><footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>1 of 3</footer>";
      htmlStr += "<header justify-content-center style='width: 100%;text-align: center;'><h3>" + this.translateService.instant("fleet_details") + "</h3></header><img alt='Embedded Image' style='width: 100%; height: 100%;  page-break-after: always' src='" + localStorage.getItem('tableData') + "'><footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>2 of 3</footer>";
      htmlStr += "<header justify-content-center style='width: 100%;text-align: center;'><h3>" + this.translateService.instant("page_header") + "</h3></header><img alt='Embedded Image' style='width: 100%; height: 100%;  page-break-after: always' src='" + localStorage.getItem('explaination') + "'><footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>3 of 3</footer>";

    }
    //htmlStr += "<div>&nbsp;</div>";

    // } else {
    //   if (this.showcalculation) {
    //     htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%' page-break-after: always' src='" + this.screenshot + "'>" //<footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>1 of 3</footer>";
    //     htmlStr += "<div style='margin-top:10px'>";
    //     htmlStr+= "<br> <br> <h6>1 of 3</h6>";
    //     htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%' page-break-after: always' src='" + localStorage.getItem('tableData') + "'>"// <footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>2 of 3</footer>";
    //     htmlStr+= "<br> <br> <h6>2 of 3</h6>";
    //   } else {
    //     htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%' page-break-after: always' src='" + this.screenshot + "'>" //<footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>1 of 2</footer>";
    //     htmlStr += "<div style='margin-top:10px'>";
    //     htmlStr+= "<br> <br> <h6>1 of 2</h6>";
    //     htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%' page-break-after: always' src='" + localStorage.getItem('tableData') + "'>"// <footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>2 of 2</footer>";
    //     htmlStr+= "<br> <br> <h6>2 of 2</h6>";
    //   }
    // }

    /*clS if (!this.isFromBasicAnalysis) {
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
     }
 
     if (!this.isFromBasicAnalysis) {
       htmlStr += "<div style='margin-top: 40px;'></div>";
       htmlStr += "<img alt='Embedded Image' style='width: 100%' src='" + sessionStorage.getItem('fleetDetails') + "'>";
       htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%;' src='" + sessionStorage.getItem('firstLife') + "'>";
       htmlStr += "<img alt='Embedded Image' style='width: 100%; height: 100%;' src='" + sessionStorage.getItem('secondLife') + "'>";
       htmlStr += "<footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%'>1 of 2</footer>"
 
       // localStorage.removeItem('secondLife');
     }
     if (this.showcalculation) {
       htmlStr += "<div style='margin-top: 500px;'></div>";
       htmlStr += "<br> <br>"
       htmlStr += "<h3 style ='text-align: center'>" + this.translateService.instant("page_header") + "<h3>";
 
       htmlStr += "<hr>";
       htmlStr += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem('explaination') + "'>";
       htmlStr+= "<br> <br> <h6>3 of 3</h6>";
       // htmlStr += "<footer justify-content-center style='width: 100%;text-align: center; bottom: 0;display: flex;position: fixed;font-size:1em;margin-left:45%;font-weight:normal'>3 of 3</footer>"
     }
     if (this.pdfShareInfo == "yes") {
       htmlStr += "<div style='margin-top: 5px;'></div>";
       this.translateService.get(['rolling_explanation']).subscribe(text => {
         htmlStr += "<p style ='font-size:16px'>" + text['rolling_explanation'] + "</p>"
       })
 
       htmlStr += "<div style='margin-top: 5px;'></div>";
       this.translateService.get(['tire_price_explanation']).subscribe(text => {
         htmlStr += "<p style ='font-size:16px'>" + text['tire_price_explanation'] + "</p>"
       })
 
       htmlStr += "<div style='margin-top: 5px;'></div>";
       this.translateService.get(['tire_runout_miles_explanation']).subscribe(text => {
         htmlStr += "<p style ='font-size:16px'>" + text['tire_runout_miles_explanation'] + "</p>"
       })
     }
 
 
     htmlStr += "<div style='margin-top: 20px;'></div>";
 */
    //   if(this.selectedRegion != "Europe")
    //   {
    //   this.translateService.get(['config_text']).subscribe(text => {
    //     htmlStr += "<p style ='font-size:16px'>"+text['config_text']+"</p>" 
    //   })
    // }
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

    var defaultAlertInputValue = "";
    if (emails.length != 0) {
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
              if (element != null) {
                return element.trim();
              }
            }).filter(elem => elem != null && elem != '');


            for (var elem of filteredDataArr) {
              if (!obj.validateEmail(elem)) {
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
              //               "filename": obj.translateService.instant("report_pdf"),
              "filename": obj.translateService.instant("fuel_report") + this.nowDate.toLocaleString(this.languageCode, { day: "numeric", year: "numeric", month: "long" }) + this.companyName + "_" + obj.translateService.instant("report.pdf"),
              "toAddresses": emails,
              "addAtachment": true,
              "sfdcID": localStorage.getItem("accountId")
            };
            localStorage.setItem("report", JSON.stringify(evPar));
            // console.log("THE TEST",evPar.html);
            sendPdf();

          }
        }
      ]
    });
    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      firstInput.setSelectionRange(1000, 1001);
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
  addGraphStr(name) {


    var strTemp = "";

    strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 1) + "'>";

    // localStorage.removeItem(name + 1);



    // var isoImg = new Image;
    // isoImg.src = localStorage.getItem(name+1);
    // isoImg.crossOrigin = 'Anonymous';
    //
    //
    // document.getElementById("wrapper").appendChild(isoImg);


    if (this.fuel_calculation_toggle) {
      strTemp += "<img alt='Embedded Image' style='width: 100%' src='" + localStorage.getItem(name + 2) + "'>";
      // localStorage.removeItem(name+2);
    }


    if (this.mileage_calculation_toggle) {
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

  exitFuelApp() {
    closeModal();
  }

  checkBoxFuelApp(event) {
    if (event.target.checked == true) {
      this.pdfShareInfo = "yes";
    } else {
      this.pdfShareInfo = "no";
    }

  }
  showHelpModal() {
    var modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }
  openGDPRPage(event: any) {
    if (event.checked) {
      var modal: any;
      modal = this.modalCtrl.create(HelpPage);
      modal.present();
    } else {
      localStorage.removeItem("explaination");
    }
    this.showcalculation = event.checked;

  }
}
