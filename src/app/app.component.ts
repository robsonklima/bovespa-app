import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StorageDataService } from '../services/storage-data-service';
import { StorageData } from '../models/storage-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  homePage = HomePage;
  loginPage = LoginPage;
  storageData: StorageData;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private storageDataService: StorageDataService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.enable(true);
      this.nav.setRoot(this.loginPage);

      this.storageDataService.getStorageData().then((sd: StorageData) => {
        if (sd) {
          this.storageData = sd;

          if (sd.user) {
            this.menuCtrl.enable(true);
            this.nav.setRoot(this.homePage);
          } else {
            this.nav.setRoot(this.loginPage);
          }
        } else {
          this.nav.setRoot(this.loginPage);
        }
      }).catch();
    });
  }

  public sair() {
    this.storageDataService.deleteStorageData().then(() => {
      this.menuCtrl.close().then(() => {
        this.nav.setRoot(this.loginPage);
      });
    }).catch();
  }
}

