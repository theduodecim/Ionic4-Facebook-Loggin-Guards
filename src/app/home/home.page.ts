import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AuthService } from '../shared/Auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(public authService: AuthService, private navCtrl: NavController) { }

  OnInit() {
    this.authService.loggedIn.subscribe(status => {
      if (!status) {
        this.navCtrl.navigateBack("/login");
      }
    });
  }


  async logOut() {
    this.authService.logout();
  }

}
