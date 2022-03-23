/**
 * Created by hua on 16/05/17.
 */
import {Storage} from '@ionic/storage'
import {TireInfoModel} from "./TireInfoModel";


export class TireInfoLifeCycleModel {


  autoCompleteDataSteerBrand="";
  autoCompleteDataDriveBrand="";
  autoCompleteDataTrailerBrand="";
  autoCompleteDataTireSteer="";
  autoCompleteDataTireDrive="";
  autoCompleteDataTireTrailer="";
  autoCompleteDataNondrivenBrand="";
  autoCompleteDataTireNondriven="";


  autoCompleteDataSteerBrandSecondLife="";
  autoCompleteDataDriveBrandSecondLife="";
  autoCompleteDataTrailerBrandSecondLife="";
  autoCompleteDataTireSteerSecondLife="";
  autoCompleteDataTireDriveSecondLife="";
  autoCompleteDataTireTrailerSecondLife="";
  autoCompleteDataNondrivenBrandSecondLife="";
  autoCompleteDataTireNondrivenSecondLife="";


  steerBaseRollingResistance = 100;
  driveBaseRollingResistance = 100;
  trailerBaseRollingResistance = 100;
  nondrivenBaseRollingResistance = 100;

  steerBaseRollingResistanceSecondLife = 100;
  driveBaseRollingResistanceSecondLife = 100;
  trailerBaseRollingResistanceSecondLife = 100;
  nondrivenBaseRollingResistanceSecondLife = 100;



  steerTirePrice = 0;
  driveTirePrice = 0;
  trailerTirePrice = 0;
  nondrivenTirePrice = 0;

  steerTirePriceSecondLife = 0;
  driveTirePriceSecondLife = 0;
  trailerTirePriceSecondLife = 0;
  nondrivenTirePriceSecondLife = 0;

  steerRunoutMiles = 0;
  driveRunoutMiles = 0;
  trailerRunoutMiles = 0;
  nondrivenRunoutMiles = 0;

  steerRunoutMilesSecondLife = 0;
  driveRunoutMilesSecondLife = 0;
  trailerRunoutMilesSecondLife = 0;
  nondrivenRunoutMilesSecondLife = 0;

  totalRollingResistance = 100;
  totalRollingResistanceSecondLife = 100;



  blendedAverageSteerFirstLife:any;
  blendedAverageDriveFirstLife:any;
  blendedAverageTrailerFirstLife:any;
  blendedAverageNondrivenFirstLife:any;

  blendedAverageSteerSecondLife:any;
  blendedAverageDriveSecondLife:any;
  blendedAverageTrailerSecondLife:any;
  blendedAverageNondrivenSecondLife:any;


  constructor(public title: string, public items: any[]) {

  }


  // constructor(public title: string, public items: any[], public storage: Storage) {
  //
  // }

  // addItem(item) {
  //   this.items.push({title: item.title, value: item.value});
  //   this.save();
  // }
  //
  // removeItem(item) {
  //
  //   for (var i = 0; i < this.items.length; i++) {
  //     if (this.items[i] == item) {
  //       this.items.splice(i, 1);
  //       this.save();
  //     }
  //   }
  //
  // }
  //
  //
  // save() {
  //   this.storage.set(this.title, JSON.stringify(this.items));
  // }



  copy(previousModel : TireInfoLifeCycleModel){

    this.autoCompleteDataSteerBrand = previousModel.autoCompleteDataSteerBrand;
    this.autoCompleteDataDriveBrand = previousModel.autoCompleteDataDriveBrand;
    this.autoCompleteDataTrailerBrand = previousModel.autoCompleteDataTrailerBrand;
    this.autoCompleteDataTireSteer = previousModel.autoCompleteDataTireSteer;
    this.autoCompleteDataTireDrive = previousModel.autoCompleteDataTireDrive;
    this.autoCompleteDataTireTrailer = previousModel.autoCompleteDataTireTrailer;
    this.autoCompleteDataNondrivenBrand = previousModel.autoCompleteDataNondrivenBrand;
    this.autoCompleteDataTireNondriven = previousModel.autoCompleteDataTireNondriven;


    this.autoCompleteDataSteerBrandSecondLife = previousModel.autoCompleteDataSteerBrandSecondLife;
    this.autoCompleteDataDriveBrandSecondLife = previousModel.autoCompleteDataDriveBrandSecondLife;
    this.autoCompleteDataTrailerBrandSecondLife = previousModel.autoCompleteDataTrailerBrandSecondLife;
    this.autoCompleteDataTireSteerSecondLife = previousModel.autoCompleteDataTireSteerSecondLife;
    this.autoCompleteDataTireDriveSecondLife = previousModel.autoCompleteDataTireDriveSecondLife;
    this.autoCompleteDataTireTrailerSecondLife = previousModel.autoCompleteDataTireTrailerSecondLife;
    this.autoCompleteDataNondrivenBrandSecondLife = previousModel.autoCompleteDataNondrivenBrandSecondLife;
    this.autoCompleteDataTireNondrivenSecondLife = previousModel.autoCompleteDataTireNondrivenSecondLife;


    this.steerBaseRollingResistance = previousModel.steerBaseRollingResistance;
    this.driveBaseRollingResistance = previousModel.driveBaseRollingResistance;
    this.trailerBaseRollingResistance = previousModel.trailerBaseRollingResistance;
    this.nondrivenBaseRollingResistance = previousModel.nondrivenBaseRollingResistance;


    this.steerBaseRollingResistanceSecondLife = previousModel.steerBaseRollingResistanceSecondLife;
    this.driveBaseRollingResistanceSecondLife = previousModel.driveBaseRollingResistanceSecondLife;
    this.trailerBaseRollingResistanceSecondLife = previousModel.trailerBaseRollingResistanceSecondLife;
    this.nondrivenBaseRollingResistanceSecondLife = previousModel.nondrivenBaseRollingResistanceSecondLife;


    this.steerTirePrice = previousModel.steerTirePrice;
    this.driveTirePrice = previousModel.driveTirePrice;
    this.trailerTirePrice = previousModel.trailerTirePrice;
    this.nondrivenTirePrice = previousModel.nondrivenTirePrice;

    this.steerTirePriceSecondLife = previousModel.steerTirePriceSecondLife;
    this.driveTirePriceSecondLife = previousModel.driveTirePriceSecondLife;
    this.trailerTirePriceSecondLife = previousModel.trailerTirePriceSecondLife;
    this.nondrivenTirePriceSecondLife = previousModel.nondrivenTirePriceSecondLife;



    this.steerRunoutMiles = previousModel.steerRunoutMiles;
    this.driveRunoutMiles = previousModel.driveRunoutMiles;
    this.trailerRunoutMiles = previousModel.trailerRunoutMiles;
    this.nondrivenRunoutMiles = previousModel.nondrivenRunoutMiles;

    this.steerRunoutMilesSecondLife = previousModel.steerRunoutMilesSecondLife;
    this.driveRunoutMilesSecondLife = previousModel.driveRunoutMilesSecondLife;
    this.trailerRunoutMilesSecondLife = previousModel.trailerRunoutMilesSecondLife;
    this.nondrivenRunoutMilesSecondLife = previousModel.nondrivenRunoutMilesSecondLife;


    this.totalRollingResistance = previousModel.totalRollingResistance;

    this.totalRollingResistanceSecondLife = previousModel.totalRollingResistanceSecondLife;


  }


  copyFromBasicAnalysis(previousModel : TireInfoModel) {
    this.autoCompleteDataSteerBrand = previousModel.autoCompleteDataSteerBrand;
    this.autoCompleteDataDriveBrand = previousModel.autoCompleteDataDriveBrand;
    this.autoCompleteDataTrailerBrand = previousModel.autoCompleteDataTrailerBrand;
    this.autoCompleteDataTireSteer = previousModel.autoCompleteDataTireSteer;
    this.autoCompleteDataTireDrive = previousModel.autoCompleteDataTireDrive;
    this.autoCompleteDataTireTrailer = previousModel.autoCompleteDataTireTrailer;
    this.autoCompleteDataNondrivenBrand = previousModel.autoCompleteDataNondrivenBrand;
    this.autoCompleteDataTireNondriven = previousModel.autoCompleteDataTireNondriven;


    this.autoCompleteDataSteerBrandSecondLife = previousModel.autoCompleteDataSteerBrand;
    this.autoCompleteDataDriveBrandSecondLife = previousModel.autoCompleteDataDriveBrand;
    this.autoCompleteDataTrailerBrandSecondLife = previousModel.autoCompleteDataTrailerBrand;
    this.autoCompleteDataTireSteerSecondLife = previousModel.autoCompleteDataTireSteer;
    this.autoCompleteDataTireDriveSecondLife = previousModel.autoCompleteDataTireDrive;
    this.autoCompleteDataTireTrailerSecondLife = previousModel.autoCompleteDataTireTrailer;
    this.autoCompleteDataNondrivenBrandSecondLife = previousModel.autoCompleteDataNondrivenBrand;
    this.autoCompleteDataTireNondrivenSecondLife = previousModel.autoCompleteDataTireNondriven;


    this.steerBaseRollingResistance = previousModel.steerBaseRollingResistance;
    this.driveBaseRollingResistance = previousModel.driveBaseRollingResistance;
    this.trailerBaseRollingResistance = previousModel.trailerBaseRollingResistance;
    this.nondrivenBaseRollingResistance = previousModel.nondrivenBaseRollingResistance;


    this.steerBaseRollingResistanceSecondLife = previousModel.steerBaseRollingResistance;
    this.driveBaseRollingResistanceSecondLife = previousModel.driveBaseRollingResistance;
    this.trailerBaseRollingResistanceSecondLife = previousModel.trailerBaseRollingResistance;
    this.nondrivenBaseRollingResistanceSecondLife = previousModel.nondrivenBaseRollingResistance;


    this.steerTirePrice = previousModel.steerTirePrice;
    this.driveTirePrice = previousModel.driveTirePrice;
    this.trailerTirePrice = previousModel.trailerTirePrice;
    this.nondrivenTirePrice = previousModel.nondrivenTirePrice;

    this.steerTirePriceSecondLife = previousModel.steerTirePrice;
    this.driveTirePriceSecondLife = previousModel.driveTirePrice;
    this.trailerTirePriceSecondLife = previousModel.trailerTirePrice;
    this.nondrivenTirePriceSecondLife = previousModel.nondrivenTirePrice;



    this.steerRunoutMiles = previousModel.steerRunoutMiles;
    this.driveRunoutMiles = previousModel.driveRunoutMiles;
    this.trailerRunoutMiles = previousModel.trailerRunoutMiles;
    this.nondrivenRunoutMiles = previousModel.nondrivenRunoutMiles;

    this.steerRunoutMilesSecondLife = previousModel.steerRunoutMiles;
    this.driveRunoutMilesSecondLife = previousModel.driveRunoutMiles;
    this.trailerRunoutMilesSecondLife = previousModel.trailerRunoutMiles;
    this.nondrivenRunoutMilesSecondLife = previousModel.nondrivenRunoutMiles;


    this.totalRollingResistance = previousModel.totalRollingResistance;

    this.totalRollingResistanceSecondLife = previousModel.totalRollingResistance;

  }
}
