import {Component, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams, Tabs} from 'ionic-angular';
import {AccountPage} from "../TiresInfo/account";
import {WeightSavingPage} from "../weight-saving/weight-saving";
import {ScenarioSummaryPage} from "../scenario-summary/scenario-summary";
import {LifeCycleAnalysisPage} from "../LifeCycleAnalysis/lifecycleanalysis";
import {Storage} from '@ionic/storage'

/*
  Generated class for the TabProposedTire page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tab-proposed-tire',
  templateUrl: 'tab-proposed-tire.html'
})
export class TabProposedTirePage {
  @ViewChild(Navbar) navBar:Navbar;

  tab1Root: any = AccountPage;

  basicAnalysis = true;


  proposedTirePramas = {
    passedValue:"not current tire",
    isFromScenarioSummary : false,
    scenarioNumber: 0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    this.basicAnalysis = this.navParams.get("isBasicAnalysis");
    if(!this.basicAnalysis){
      this.tab1Root = LifeCycleAnalysisPage;
    }


    if(navParams.get("isFromScenarioSummary") != null && navParams.get("isFromScenarioSummary") != undefined){
      this.proposedTirePramas = {
        passedValue:"not current tire",
        isFromScenarioSummary:true,
        scenarioNumber: this.navParams.get("scenarioNumber")
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabProposedTirePage');

    if(this.navBar != undefined){
      this.navBar.backButtonClick = (e:UIEvent) => {
        console.log("Back button clicked");
        this.navCtrl.parent.viewCtrl.dismiss();
      };
    }

  }

  openWeightSavingPage(){
    this.navCtrl.push(WeightSavingPage);
  }

}
