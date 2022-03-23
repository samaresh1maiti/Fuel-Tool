import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LifeCycleAnalysisPage } from '../pages/LifeCycleAnalysis/lifecycleanalysis';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/TiresInfo/account';
import { JsonData } from '../providers/json-data';
import { IonicStorageModule } from '@ionic/storage';
import { ScenarioSummaryPage } from '../pages/scenario-summary/scenario-summary'
import { ResultPagePage } from "../pages/result-page/result-page";
import { WeightSavingPage } from "../pages/weight-saving/weight-saving";
import { TabsResultPage } from "../pages/tabs-result/tabs-result";
import { GraphPage } from "../pages/graph/graph";
import { ConfigurationPage } from "../pages/configuration/configuration";
import { AutocompletePagePage } from "../pages/autocomplete-page/autocomplete-page";
import { TabStateService } from "../providers/tab-state-service";
import { TabProposedTirePage } from "../pages/tab-proposed-tire/tab-proposed-tire";
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { ToNumberPipe } from "../app/pipes/ToNumberPipe"
import { HelpPage } from "../pages/help/help";
import { Dataservice } from '../providers/dataservice';
import { FontadjustmentProvider } from '../Provider/fontadjustment/fontadjustment';
import { LandingPagePage } from '../pages/landing/landing';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    LandingPagePage,
    HomePage,
    LifeCycleAnalysisPage,
    ContactPage,
    TabsPage,
    SettingsPage,
    AccountPage,
    ScenarioSummaryPage,
    ResultPagePage,
    WeightSavingPage,
    TabsResultPage,
    GraphPage,
    ConfigurationPage,
    AutocompletePagePage,
    TabProposedTirePage,
    ToNumberPipe,
    HelpPage,

  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPagePage,
    HomePage,
    LifeCycleAnalysisPage,
    ContactPage,
    TabsPage,
    AccountPage,
    SettingsPage,
    ScenarioSummaryPage,
    ResultPagePage,
    WeightSavingPage,
    TabsResultPage,
    GraphPage,
    ConfigurationPage,
    AutocompletePagePage,
    TabProposedTirePage,
    HelpPage
  ],
  providers: [Dataservice,
    FontadjustmentProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    JsonData,
    TabStateService,
    TranslateService]
})
export class AppModule { }
