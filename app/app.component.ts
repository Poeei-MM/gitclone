import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Users } from "../shared/models/users";
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public user  	          : any;
  public userImage  	    : any;
  public userName	        : any;
  public myUser           = {} as Users;

  rootPage: any = 'LoginPage';
  pages: Array<{icon: string,title: string, component: any, active: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, private afAuth : AngularFireAuth, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { icon: 'home', title: 'HOME', component: 'HomePage',active : true },
      { icon: 'list-box', title: 'CATEGORY', component: 'FilmPage',active:false },
      { icon: 'link', title: 'PRIVANCY POLICY', component: 'ListPage',active:false },
      { icon: 'heart', title: 'WHISH LIST', component: 'ListPage',active:false },
      { icon: 'cart', title: 'CART', component: 'ListPage',active:false },
      { icon: 'mail', title: 'CONTACT US', component: 'ListPage',active:false },
      { icon: 'log-out', title: 'LOGOUT', component: 'LogoutPage',active:false },
      { icon: 'person', title: 'PROFILE', component: 'ProfilePage',active:false },
      { icon: 'information-circle', title: 'ABOUT', component: 'AboutPage',active:false }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.afAuth.idToken)
      this.afAuth.authState.subscribe(auth=>{
        if(auth && auth.email && auth.uid){
          this.user = firebase.database().ref(`userProfile/${auth.uid}/`);
          this.user.on('value', personSnapshot => {
          this.myUser = personSnapshot.val();
          this.userImage=this.myUser.userImage;
          this.userName=this.myUser.userName;
          });
      }
      });
    }); 
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
