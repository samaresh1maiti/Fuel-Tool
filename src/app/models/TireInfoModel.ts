/**
 * Created by hua on 16/05/17.
 */
import {Storage} from '@ionic/storage'


export class TireInfoModel {


  autoCompleteDataSteerBrand="";
  autoCompleteDataDriveBrand="";
  autoCompleteDataTrailerBrand="";
  autoCompleteDataTireSteer="";
  autoCompleteDataSizeSteer="";
  autoCompleteDataSizeDrive="";
  autoCompleteDataSizeTrailer="";
  autoCompleteDataSizeNonDrive="";

  autoCompleteDataTireDrive="";
  autoCompleteDataTireTrailer="";
  autoCompleteDataNondrivenBrand="";
  autoCompleteDataTireNondriven="";

  steerBaseRollingResistance = 100;
  driveBaseRollingResistance = 100;
  trailerBaseRollingResistance = 100;
  nondrivenBaseRollingResistance = 100;

  steerTirePrice = 0;
  driveTirePrice = 0;
  trailerTirePrice = 0;
  nondrivenTirePrice = 0;

  steerRunoutMiles = 0;
  driveRunoutMiles = 0;
  trailerRunoutMiles = 0;
  nondrivenRunoutMiles = 0;

  totalRollingResistance = 100;


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
  //

  copy(previousModel : TireInfoModel){

    this.autoCompleteDataSteerBrand = previousModel.autoCompleteDataSteerBrand;
    this.autoCompleteDataDriveBrand = previousModel.autoCompleteDataDriveBrand;
    this.autoCompleteDataTrailerBrand = previousModel.autoCompleteDataTrailerBrand;
    this.autoCompleteDataTireSteer = previousModel.autoCompleteDataTireSteer;
    this.autoCompleteDataTireDrive = previousModel.autoCompleteDataTireDrive;
    this.autoCompleteDataTireTrailer = previousModel.autoCompleteDataTireTrailer;
    this.autoCompleteDataNondrivenBrand = previousModel.autoCompleteDataNondrivenBrand;
    this.autoCompleteDataTireNondriven = previousModel.autoCompleteDataTireNondriven;

    this.autoCompleteDataSizeSteer=previousModel.autoCompleteDataSizeSteer;
    this.autoCompleteDataSizeDrive=previousModel.autoCompleteDataSizeDrive;
    this.autoCompleteDataSizeTrailer=previousModel.autoCompleteDataSizeTrailer;
    this.autoCompleteDataSizeNonDrive=previousModel.autoCompleteDataSizeNonDrive;
    this.steerBaseRollingResistance = previousModel.steerBaseRollingResistance;
    this.driveBaseRollingResistance = previousModel.driveBaseRollingResistance;
    this.trailerBaseRollingResistance = previousModel.trailerBaseRollingResistance;
    this.nondrivenBaseRollingResistance = previousModel.nondrivenBaseRollingResistance;



    this.steerTirePrice = previousModel.steerTirePrice;
    this.driveTirePrice = previousModel.driveTirePrice;
    this.trailerTirePrice = previousModel.trailerTirePrice;
    this.nondrivenTirePrice = previousModel.nondrivenTirePrice;



    this.steerRunoutMiles = previousModel.steerRunoutMiles;
    this.driveRunoutMiles = previousModel.driveRunoutMiles;
    this.trailerRunoutMiles = previousModel.trailerRunoutMiles;
    this.nondrivenRunoutMiles = previousModel.nondrivenRunoutMiles;


    this.totalRollingResistance = previousModel.totalRollingResistance;

  }


}
