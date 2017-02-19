import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { CharacterPage } from "../character/character";


@Component({
  selector: 'page-train',
  templateUrl: 'train.html'
})
export class TrainPage {

  trainingForm: any = this.fb.group({
    characters: ['一二三', Validators.required],
    goal: [5],
    showOutline: [3]
  });

  startTraining = () => {
    let formData = this.trainingForm.value;

    this.navCtrl.push(CharacterPage, {
      characterList: formData.characters.split(''),
      options: {
        goal: formData.goal || 5,
        showOutline: formData.showOutline || 3
      }
    });
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
  }

}
