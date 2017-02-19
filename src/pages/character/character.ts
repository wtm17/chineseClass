import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare const HanziWriter:any;

@Component({
  selector: 'page-character',
  templateUrl: 'character.html'
})
export class CharacterPage {

  writer: any;
  count: number = 0;
  done: boolean = false;
  characterList: String[] = this.navParams.get('characterList');
  options: any = this.navParams.get('options');
  goal: number = this.options.goal;
  characterIndex: number = 0;
  character: any = this.characterList[0];

  animate = () => {
    this.writer.animateCharacter({
      onComplete: this.reset
    })
  };

  reset = () => {
    this.writer.cancelQuiz();
    if (this.count >= this.goal) {
      this.characterIndex++;
      if (this.characterIndex >= this.characterList.length) {
        this.done = true;
      } else {
        this.character = this.characterList[this.characterIndex];
        this.writer.setCharacter(this.character);
        this.writer.showOutline();
        this.count = 0;
      }
    } else if (this.count >= this.options.showOutline) {
      this.writer.hideOutline();
    }
    if (this.characterIndex < this.characterList.length) {
      this.startQuiz();
    }
  };

  startQuiz = () => {
    this.writer.quiz({
      onComplete: () => {
        this.count++;
        this.reset();
      }
    })
  };

  back = () => {
    this.navCtrl.pop();
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.writer = new HanziWriter('character-writer', this.character, {
      width: 300,
      height: 300
    });
    this.reset();
  }

}
