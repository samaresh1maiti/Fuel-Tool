import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../../pages/TiresInfo/account';
import {TabsPage} from "../tabs/tabs";
import {TabProposedTirePage} from "../tab-proposed-tire/tab-proposed-tire";
import {Storage} from '@ionic/storage'
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the ScenarioSummary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scenario-summary',
  templateUrl: 'scenario-summary.html'
})
export class ScenarioSummaryPage {
  items = [];

  isLastPageBasicAnalysis = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public translateService:TranslateService) {
  }


  ionViewWillEnter(){
    this.storage.get('lastPage').then(
      (data) => {

        if(data != null){
          this.isLastPageBasicAnalysis = data == "basicanalysis" ? true : false;

          if(this.isLastPageBasicAnalysis){

            this.items.length = 0;
           for(var i=1; i <=9; i++){

            this.items.length = 0;
            for(var i=1; i<=9; i++){
               this.addBasicScenariosIntoItems(i);
            }
           }

          }else{

            this.items.length = 0;
            for(var j=1; j<=9; j++){
              this.addLifeCycleScenariosIntoItems(j);
            }

          }


        }
      }
    )
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ScenarioSummaryPage');
  }

  removeItem(item){
    for(var i=0; i < this.items.length; i++){
      if(this.items[i] == item){
        this.items.splice(i, 1);
      }
    }
  }


  displayScenario(id){
    switch (id){
      default:
        this.pushtoCorrespondingScenario(id)
        break;
    }
  }



  addLifeCycleScenariosIntoItems(number){
    this.storage.get('proposedTireFirstLifeCycleModel'+number).then(
      (data) => {
        if(data != null){
          this.translateService.get(['proposed_lifecycle_analysis_scenario_summary']).subscribe(text => {
            this.items.push({title: text['proposed_lifecycle_analysis_scenario_summary'] + number, id: number});
          });
        }
      }

    )
  }


  addBasicScenariosIntoItems(number){
    this.storage.get('proposedScenarioBasicAnalysisData'+number).then(
      (data) => {
        if(data != null){
          this.translateService.get(['proposed_basic_analysis_scenario_summary']).subscribe(text => { 
            this.items.push({title: text['proposed_basic_analysis_scenario_summary'] + number, id: number});
          });
        }
      }

    )
  }


  pushtoCorrespondingScenario(index){
    if(this.isLastPageBasicAnalysis) {
      this.navCtrl.parent.parent.push(TabProposedTirePage, {
        passedValue: "not current tire",
        isBasicAnalysis: true,
        isFromScenarioSummary: true,
        scenarioNumber: index
      });
    }else{
      this.navCtrl.parent.parent.push(TabProposedTirePage,
        {passedValue:"not current tire",
          "isBasicAnalysis":false,
          isFromScenarioSummary: true,
          scenarioNumber: index
        });

    }
  }


}
