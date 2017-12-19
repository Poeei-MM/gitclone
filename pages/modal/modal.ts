import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, IonicPage, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  myParam: string;
  public postList:Array<any>;
  public loadedPostList:Array<any>;
  public postRef:firebase.database.Reference;
   

constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController, public params: NavParams, public navParams: NavParams) {
  this.myParam = navParams.get('cssClass');
  this.postRef = firebase.database().ref('/posts');
  this.postRef.on('value', postList => {
  let posts = [];
  postList.forEach( post => {
    posts.push(post.val());
    return false;
  });

  this.postList = posts;
  this.loadedPostList = posts;
});
  
}

initializeItems(): void {
  this.postList = this.loadedPostList;
}

dismiss() {
    this.viewCtrl.dismiss();
  }

search(searchbar) 
  {
        // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.target.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.postList = this.postList.filter((v) => {
      if(v.userName && v.description && q) {
        if ((v.userName.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.description.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.postList.length);
        
  }

}

