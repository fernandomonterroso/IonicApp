import { Component, OnInit } from '@angular/core';
import { ProjectsPageModule } from 'src/app/projects/projects.module'
import { ModalController } from 'ionic-angular'
import  'rxjs/add/operator/takeUntil'
@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  constructor(public modalController: ModalController) {}


  ngOnInit() {
  }

  async Dialog(){  
    const modal = await this.modalController.create({
      
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}


