import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { StorageData } from '../../models/storage-data';
import { User } from '../../models/user';
import { StorageDataService } from '../../services/storage-data-service';
import { UserService } from '../../services/user-service';

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
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.storageDataService.getStorageData().then((sd: StorageData) => {
      this.storageData = sd;

      const loading = this.loadingCtrl.create({ 
        content: 'Carregando...'
      }); 
      loading.present();

      this.userService.getUser(sd.user).subscribe((user: User) => {
        this.user = user;
        console.log(user);
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }).catch();
  }

  public pushUpdate(refresher) {
    this.storageDataService.getStorageData().then((sd: StorageData) => {
      this.storageData = sd;

      this.userService.getUser(sd.user).subscribe((user: User) => {
        this.user = user;
        console.log(user);
        if (refresher) refresher.complete();
      }, err => {
        setTimeout(() => { if (refresher) refresher.complete() }, 2000);
      });
    }).catch();
  }
}