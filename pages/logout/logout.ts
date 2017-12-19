import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {
 
  constructor( public navCtrl: NavController, private afAuth : AngularFireAuth, private alertCtrl: AlertController ) {
    
  }
  ionViewDidEnter() 
  {    
      let alert = this.alertCtrl.create({
      title: 'LogOut Comfirmation',
      message: 'Do you want to LOGOUT from this app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            console.log('Items Removed!');
            //Call you API to remove Items here.
            
            this.afAuth.auth.signOut();
            this.navCtrl.setRoot('LoginPage');

          }
        }
      ]
    });

    alert.present();
      
     
   }
}