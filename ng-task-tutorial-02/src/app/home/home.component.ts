import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tasks } from '../common/data/tasks';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  tasks:any = Tasks;
  tableData:any = null
  showNav: boolean = false;
  tableCols: any = [
    'name',
    'description',
    'added',
    'updated',
    'status',
  ];
  currentYear!: number;
  user:any = null;

  constructor() { }
  
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.tableData = this.tasks.filter((task:any) => task.user === this.user.userName);
  }

}
