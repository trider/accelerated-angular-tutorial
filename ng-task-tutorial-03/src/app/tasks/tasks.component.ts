import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tasks } from '../data/tasks';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

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