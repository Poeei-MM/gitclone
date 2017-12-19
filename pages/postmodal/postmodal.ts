import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { UserDatabaseProvider } from '../../providers/database/userdatabase';
import * as firebase from 'firebase';
import { Users } from "../../shared/models/users";

@IonicPage()
@Component({
  selector: 'page-postmodal',
  templateUrl: 'postmodal.html'
})

export class PostModalPage {
    
  public profile_picture: string;
  public form             : any;
  public user  	          : any;
  public userImage  	    : any;
  public image  	        : any;
  public myUser           = {} as Users;
  public userName         : any     = '';
  public gender           : any     = [];
  public dateofbirth;
  public contact          : any     = '';
  public userId           : string  = '';
  public isEditable       : boolean = false;
  public myDate           : String = new Date().toISOString();
  
  
  placeholder_picture = "assets/logos/dhouse6.jpg";
  
  constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : ImageProvider,
      public viewCtrl       : ViewController,
      private _LOADER       : PreloaderProvider,
      private _DB           : UserDatabaseProvider
   )
   {
      this.form 		      = _FB.group({
         'userName' 		  : ['', Validators.required],
         'gender'	        : ['', Validators.required],
         'userImage'		  : ['', Validators.required],
         'contact'	      : ['', Validators.required],
         'dateofbirth' 	  : ['', Validators.required]
      });
    
     

      if(params.get('isEdited'))
      {
          this.userId=params.get('stringId');
          this.user = firebase.database().ref(`userProfile/${this.userId}/`);
          this.user.on('value', personSnapshot => {
          this.myUser = personSnapshot.val();
          this.userImage=this.myUser.userImage;
          this.userName=this.myUser.userName;
          this.gender=this.myUser.gender;
          this.contact=this.myUser.contact;
          this.dateofbirth=this.myUser.dateofbirth;
          });
          this.isEditable      = true;
      }
      else
      {
          this.userId=params.get('stringId');
          this.user=firebase.database().ref(`userProfile/${this.userId}/`);
          this.user.on('value', personSnapshot => {
          this.myUser = null;
          });
      }
   }

   
   saveProfile(val)
   {
      this._LOADER.displayPreloader();

   let  userName	      : string	  = this.form.controls["userName"].value,
  		  gender        	: any		    = this.form.controls["gender"].value,
  		  contact       	: any		    = this.form.controls["contact"].value,
  		  dateofbirth    	: any		    = this.form.controls["dateofbirth"].value,
  		  image           : string    = this.userImage;
        
      if(this.isEditable)
      {
         if(image !== this.userImage)
         {
           
            this._DB.uploadImage(this.userId,image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.userId,
               {
	              userName      : userName,
	              userImage     : uploadedImage,
	              gender        : gender,
	              dateofbirth   : dateofbirth,
	              contact       : contact
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.userId,
           {
	            userName      : userName,
              gender        : gender,
              dateofbirth   : dateofbirth,
              contact       : contact
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(this.userId, image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
	            userName      : userName,
              userImage     : uploadedImage,
              gender        : gender,
              dateofbirth   : dateofbirth,
              contact       : contact
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }

  closeModal(val = null){
      this.viewCtrl.dismiss(val);
   }


  selectImage()
   {
   this._IMG.selectImage()
      .then((data) =>
      {
         this.userImage = data;
      });
   }

}
