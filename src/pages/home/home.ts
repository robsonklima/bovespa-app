import { Component } from '@angular/core';
import { StorageData } from '../../models/storage-data';
import { User } from '../../models/user';
import { StorageDataService } from '../../services/storage-data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: User;

  constructor(
    private storageDataService: StorageDataService
  ) {}

  ionViewWillEnter() {
    this.storageDataService.getStorageData().then((sd: StorageData) => {
      this.user = sd.user;
    }).catch();
  }
}
