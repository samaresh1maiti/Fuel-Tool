import {Component, ViewChild} from '@angular/core';
import {ResultPagePage} from "../result-page/result-page";
import {GraphPage} from "../graph/graph";
import {ConfigurationPage} from "../configuration/configuration";
import {NavController, NavParams, Tabs} from "ionic-angular";
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'tabs-result.html'
})
export class TabsResultPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ResultPagePage;
  tab2Root: any = GraphPage;
  tab3Root: any = ConfigurationPage;


  steercheckboxnew = false;
  drivecheckboxnew = false;
  nondrivencheckboxnew = false;
  trailercheckboxnew = false;

  isFromBasicAnalysis = true;
  nondrivenShow = false;
  trailerShow =false;

  @ViewChild('myTabs') tabRef: Tabs;

  paramas = {
    isFromBasicAnalysis:false,
    trailerShow:false,
    nondrivenShow:false,
     proposedNum:1,
    data:[],
    weightSavings: false
  }

  constructor(public navCtrl: NavController,public navParams: NavParams,public translateService:TranslateService) {

    var isBasic = navParams.get('isFromBasicAnalysis');
     this.isFromBasicAnalysis = isBasic;
     this.trailerShow = navParams.get('trailerShow');
     this.nondrivenShow = navParams.get('nondrivenShow');
     this.paramas={
       isFromBasicAnalysis: isBasic,
       trailerShow: navParams.get('trailerShow'),
       nondrivenShow: navParams.get('nondrivenShow'),
       proposedNum: navParams.get('proposedNum'),
       data: navParams.get('data'),
       weightSavings: (navParams.get('weightSavings') != null && navParams.get('weightSavings') != undefined)? true: false
     }
  }


  proceedOrReturn(name){

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


    if(this.tabRef.previousTab(false).index == 0) {


      var canProceed = true;

      if(this.steercheckboxnew){
        if(localStorage.getItem('steerSaved') == null){
          canProceed = false;
        }
      }

      if(this.drivecheckboxnew){
        if(localStorage.getItem('driveSaved') == null){
          canProceed = false;
        }
      }

      if(this.trailerShow && this.trailercheckboxnew){
        if(localStorage.getItem('trailerSaved') == null){
          canProceed = false;
        }
      }

      if(this.nondrivenShow && this.nondrivencheckboxnew){
        if(localStorage.getItem('nondrivenSaved') == null){
          canProceed = false;
        }
      }

      if(canProceed == false) {
        this.translateService.get(['graph_page_alert']).subscribe(text => {
          alert(text['graph_page_alert']);
        });
        this.tabRef.select(0, {});
      }
    }else if(this.tabRef.previousTab(false).index == 1){


      var canProceed = true;

      if(this.drivecheckboxnew){
        if(localStorage.getItem('driveSaved') == null){
          canProceed = false;
        }
      }

      if(this.trailerShow && this.trailercheckboxnew){
        if(localStorage.getItem('trailerSaved') == null){
          canProceed = false;
        }
      }

      if(this.nondrivenShow && this.nondrivencheckboxnew){
        if(localStorage.getItem('nondrivenSaved') == null){
          canProceed = false;
        }
      }

      if(canProceed == false) {
        this.translateService.get(['graph_page_go_overall_pages_alert']).subscribe(text => {
          alert(text['graph_page_go_overall_pages_alert']);
        });
        this.tabRef.select(1, {});
      }
    }

  }
 
}
