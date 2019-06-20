import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  projects = [
  ]
  constructor() { 
    this.InitElements();
  }

  ngOnInit() {
  }

  InitElements(){
    this.projects = [
      {name: 'Mobile App', description: 'Ionic App project', image: 'http://tech.tribalyte.eu/wp-content/uploads/2018/05/ionic.png'},
      {name: 'Web App', description: 'Angular web project', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'}
    ]
  }

  Search($event:any){
    this.InitElements()
    this.projects = this.projects.filter((project) => {
      return (project.name.toLowerCase().indexOf($event.target.value.toLowerCase())> -1);
    })
  }

}
