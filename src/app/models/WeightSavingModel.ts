/**
 * Created by hua on 17/05/17.
 */
// import {Storage} from '@ionic/storage'
import {ProposedTireSizeAndWheelTypeModel} from "./ProposedTireSizeAndWheelTypeModel";

export class WeightSavingModel {

  selectedPayload = "";
  revenuePerUnit = 0;
  loadsPerWeek = 0;

  currentDriveTireSize = "";
  currentDriveWheelType = "";
  currentNondrivenTireSize = "";
  currentNondrivenWheelType = "";
  currentTrailerTireSize = "";
  currentTrailerWheelType = "";

  proposedModel1 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel2 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel3 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel4 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel5 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel6 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel7 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel8 = new ProposedTireSizeAndWheelTypeModel();
  proposedModel9 = new ProposedTireSizeAndWheelTypeModel();

  proposedIndexModelObjMap = {1: this.proposedModel1, 2:this.proposedModel2, 3: this.proposedModel3, 4: this.proposedModel4, 5: this.proposedModel5, 6: this.proposedModel6, 7: this.proposedModel7, 8: this.proposedModel8, 9: this.proposedModel9};


  constructor(public title: string) {

  }
}

