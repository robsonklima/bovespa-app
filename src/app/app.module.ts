import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StorageDataService } from '../services/storage-data-service';
import { IonicStorageModule } from '@ionic/storage';
import { UserService } from '../services/user-service';
import { StockService } from '../services/stock-service';
import { StockPage } from '../pages/stocks/stock';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    StockPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    StockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    StorageDataService,
    StockService
  ]
})
export class AppModule {}
