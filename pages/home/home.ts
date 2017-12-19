import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Users } from "../../shared/models/users";
import 'rxjs/Rx';
import { UserDatabaseProvider } from '../../providers/database/userdatabase';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

declare var google : any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public posts   : any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
   constructor( public navCtrl       : NavController,
                private afAuth       : AngularFireAuth,
                private _LOADER      : PreloaderProvider,
                public geolocation   : Geolocation,
                private modalCtrl    : ModalController,
                public http          : Http,
                private _DB          : UserDatabaseProvider)
   {
   }
  
   ionViewDidEnter()
   {
      this.afAuth.authState.subscribe(auth=>{
        if(auth && auth.email && auth.uid){
        this._LOADER.displayPreloader();
        this.loadAndParsePosts();
        }
      });
     
   }


   loadAndParsePosts()
   {
      this.posts = this._DB.renderPosts();
      
      
      
      this._LOADER.hidePreloader();
   }


   getLocation(lat : any, long : any, name : any)
    {   
        this.navCtrl.push('RoutePage',{lat,long,name});
    }
   
   search()
   {
      let myModal = this.modalCtrl.create('ModalPage',null,{cssClass: 'inset-modal'});
      myModal.present();
    }
    
    addPost()
    {
      let myModal = this.modalCtrl.create('PostModalPage');
      myModal.present();
    }
}