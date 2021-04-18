import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { Stock } from '../../models/stock';
import { User } from '../../models/user';
import { StockService } from '../../services/stock-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {
  user: User;
  stocks: Stock[] = [];

  constructor(
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private stockService: StockService,
    private loadingCtrl: LoadingController,
    private userService: UserService
  ) {
    this.user = this.navParams.get('user');
  }

  ionViewWillEnter() {
    this.getSymbols();
  }

  public getSymbols() {
    const loading = this.loadingCtrl.create({ 
      content: 'Carregando...'
    }); 
    loading.present();

    this.stockService.getAll().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

  public save(form: NgForm) {
    const loading = this.loadingCtrl.create({ 
      content: 'Salvando...'
    }); 
    loading.present();
    
    this.user.stocks.push({ name: form.value.stock.name })
    
    this.userService.postUser(this.user).subscribe((user: User) => {
      loading.dismiss().then((user: User) => {
        this.closeModal();
      });
    },
    err => {
      loading.dismiss();

      this.showAlert('Não foi possível inserir o registro');
    });
  }

  private showAlert(msg: string) {
    const alerta = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });

    alerta.present();
  }

  public closeModal() {
    this.viewCtrl.dismiss(this.user);
  }
}
