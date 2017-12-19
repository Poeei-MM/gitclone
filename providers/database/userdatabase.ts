import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';


@Injectable()
export class UserDatabaseProvider {

   constructor(public http: Http)
   {
   }

  

   renderPosts() : Observable<any>
   {

      return new Observable(observer =>
   {
      let posts : any = [];
      firebase.database().ref('posts/').orderByKey().once('value', (items : any) =>
      {
         items.forEach((item) =>
         {
            posts.push({
               postId       : item.key,
               postImage    : item.val().postImage,
               lat          : item.val().lat,
               long         : item.val().long,
               userId       : item.val().userId,
               userName     : item.val().userName,
               userImage    : item.val().userImage,
               date_time    : item.val().date_time,
               price        : item.val().price,
               discount     : item.val().discount,
               description  : item.val().description

	    });
         });

         observer.next(posts);
         observer.complete();
      },
      (error) =>
      {
         console.log("Observer error: ", error);
         console.dir(error);
         observer.error(error);
      });

   });
}

addToDatabase(userObj) : Promise<any>
   {
        return new Promise((resolve) =>
        {
            let addRef = firebase.database().ref('userProfile/');
            addRef.push(userObj);
            resolve(true);
        });
    }

updateDatabase(id, userObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('userProfile/').child(id);
	      updateRef.update(userObj);
         resolve(true);
      });
   }



   uploadImage(id, imageString) : Promise<any>
   {
      let image       : string  = 'user-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('pictures/'+id+'/userPhotos/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }

   
}