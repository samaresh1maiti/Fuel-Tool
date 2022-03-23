import {Component, ViewChild} from '@angular/core';
import  {TabStateService} from '../../providers/tab-state-service'
import { AccountPage } from '../TiresInfo/account';
import {LifeCycleAnalysisPage} from '../LifeCycleAnalysis/lifecycleanalysis';
import {NavController, NavParams} from "ionic-angular";
import {ResultPagePage} from "../result-page/result-page";
import {TabsResultPage} from "../tabs-result/tabs-result";
import {WeightSavingPage} from "../weight-saving/weight-saving";
import {ScenarioSummaryPage} from "../scenario-summary/scenario-summary";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AccountPage;
  tab2Root: any = LifeCycleAnalysisPage;
  // tab3Root: any = WeightSavingPage;

  // tab4Root: any = ScenarioSummaryPage;

  showTab2 = false;


  @ViewChild('tabs_one') tabs_one;


  basicAnalysisPramas = {
    passedValue:"",
    trailerShow:true,
    nondrivenShow:true,

  }

  lifeCycleAnalysisPramas = {
    passedValue:"",
    trailerShow: true,
    nondrivenShow: true
  }

  passedValue:string;

  constructor (public navCtrl: NavController,public navParams: NavParams) {
    console.log('enter tabs page');
    this.passedValue = navParams.get("passedValue");

    this.basicAnalysisPramas = {
      passedValue: navParams.get("basicAnalysis"),
      trailerShow: navParams.get("trailerShow"),
      nondrivenShow: navParams.get("nondrivenShow")
    }

    this.lifeCycleAnalysisPramas = {
      passedValue: navParams.get("lifeCycleAnalysis"),
      trailerShow: navParams.get("trailerShow"),
      nondrivenShow: navParams.get("nondrivenShow")
    }

  }

}
