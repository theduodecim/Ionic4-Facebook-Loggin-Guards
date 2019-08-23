import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../shared/Auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  private loading;
  private logged;
  constructor(private navCtrl: NavController, public authService: AuthService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.showLoading();

    this.authService.loggedIn.subscribe(status => {
      this.loading.dismiss();
      this.logged = status;
      if (status) {
        this.navCtrl.navigateForward("/home");
      }
    });
  }

  async login() {
    await this.showLoading();
    this.authService.login();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Authenticating..."
    });

    this.loading.present();
  }


}
