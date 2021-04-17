import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Config } from '../../models/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  acoes = [];
  
  constructor(public navCtrl: NavController) {
    this.acoes = Config.ACOES;
  }
}
