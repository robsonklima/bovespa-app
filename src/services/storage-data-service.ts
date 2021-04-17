import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { StorageData } from '../models/storage-data';
import 'rxjs/Rx';

@Injectable()
export class StorageDataService {
  storageData: StorageData;

  constructor(
    private storage: Storage
  ) { }

  saveStorageData(storageData: StorageData): Promise<StorageData> {
    return new Promise((resolve, reject) => {
      this.storageData = storageData;

      this.storage.set('StorageData', this.storageData).then(() => {
        resolve(this.storageData);
      }).catch();
    });
  }

  getStorageData(): Promise<StorageData> {
    return new Promise((resolve, reject) => {
      this.storage.get('StorageData')
      .then((sd: StorageData) => {
        this.storageData = sd != null ? sd : null;
        resolve(this.storageData);
      }).catch(err => reject());
    });
  }

  deleteStorageData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.set('StorageData', null)
        .then((res) => {
          resolve(res);
        })
        .catch();
    });
  }
}