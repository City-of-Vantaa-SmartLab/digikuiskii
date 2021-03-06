import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';


@IonicPage({
  name: 'userdetails'
})
@Component({
  selector: 'page-userdetails',
  templateUrl: 'userdetails.html',
})
export class UserdetailsPage {
  public first: boolean;
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController, 
    public authProvider: AuthData,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
      this.signupForm = formBuilder.group({
        urheilu: [false],
        musiikki: [false],
        tvohjelmat: [false],
        elokuvat: [false],
        pelit: [false],
        kirjat: [false],
        kotikunta: ['']
      });
    }
    signupUser(){
        let data: string;
        data = this.signupForm.value;
        console.log(this.signupForm.value);
        this.putInfoToFirebase(data);
        

    }

    putInfoToFirebase(userDetailedInfo: string): void {
      const personRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid);
      personRef.set({
        userDetailedInfo
      })
    }
  }
