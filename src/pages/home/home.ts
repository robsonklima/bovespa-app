import { Component } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { StorageData } from '../../models/storage-data';
import { User } from '../../models/user';
import { StorageDataService } from '../../services/storage-data-service';
import { UserService } from '../../services/user-service';
import { StockPage } from '../stocks/stock';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  storageData: StorageData;
  user: User;

  constructor(
    private storageDataService: StorageDataService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.updateUser();
  }

  public pushUpdate(refresher) {
    this.storageDataService.getStorageData().then((sd: StorageData) => {
      this.storageData = sd;

      this.userService.getUser(sd.user).subscribe((user: User) => {
        this.user = user;
        if (refresher) refresher.complete();
      }, err => {
        setTimeout(() => { if (refresher) refresher.complete() }, 2000);
      });
    }).catch();
  }

  private updateUser() {
    this.storageDataService.getStorageData().then((sd: StorageData) => {
      this.storageData = sd;

      const loading = this.loadingCtrl.create({ 
        content: 'Carregando...'
      }); 
      loading.present();

      this.userService.getUser(sd.user).subscribe((user: User) => {
        this.user = user;
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }).catch();
  }

  public toStockPage() {
    const modal = this.modalCtrl.create(StockPage, { user: this.user });
    modal.present();
    modal.onDidDismiss((user: User) => {
      this.updateUser();
    });
  }
}