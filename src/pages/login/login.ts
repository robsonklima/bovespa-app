import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { LoginService } from '../../services/login-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  constructor(
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController
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
    
    this.loginService.login(user).subscribe((user: User) => {
      if(user.email) {
        loading.dismiss().then(() => {
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
