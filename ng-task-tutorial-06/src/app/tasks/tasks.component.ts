import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tasks } from '../data/tasks';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  tasks:any = Tasks;
  tableData:any = null
  tableCols: any = [ 'name', 'description','added','updated','status'];
  user:any = null;

  constructor() { }
  
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.tableData = this.tasks.filter((task:any) => task.user === this.user.userName);
  }

 

}