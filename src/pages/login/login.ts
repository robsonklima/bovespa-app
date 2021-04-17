import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController } from 'ionic-angular';
import { StorageData } from '../../models/storage-data';
import { User } from '../../models/user';
import { StorageDataService } from '../../services/storage-data-service';
import { UserService } from '../../services/user-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private storageDataService: StorageDataService
  ) {}

  ngOnInit() {
    
  }

  public login(form: NgForm) {
    const loading = this.loadingCtrl.create({ 
      content: 'Autenticando...'
    }); 
    loading.present();

    let user = {
      email: form.value.email,
      password: form.value.password
    }
    
    this.userService.login(user).subscribe((user: User) => {
      if(user.email) {
        loading.dismiss().then(() => {
          let storageData = new StorageData();
          storageData.user = user;
          this.storageDataService.saveStorageData(storageData);

          this.menuCtrl.enable(true);
          this.navCtrl.setRoot(HomePage);
        });
      } else {
        loading.dismiss().then(() => {
          this.showAlert('Usuario ou senha incorretos');
        });
      }
    },
    err => {
      loading.dismiss().then(() => {
        this.showAlert(err);
      });
    });
  }

  private showAlert(msg: string) {
    const alerta = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }
}
