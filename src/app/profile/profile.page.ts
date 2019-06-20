import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name:string = "";
  image:string = "";
  username:string = "";
  constructor(private actionSheetCtrl: ActionSheetController) { 
    this.image = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
  }

  async Options(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Photo Options',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Upload new',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Take photo',
        icon: 'camera',
        handler: () => {
          console.log('Play clicked');
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
