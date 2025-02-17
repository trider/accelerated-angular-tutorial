import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.scss'
})
export class DetailsTableComponent implements OnInit {
 
  @Input() row:any=null


  constructor() {}

  ngOnInit(): void {
   
  }

  getRowValues(row:any){
    const objectArray = Object.entries(row);
    let data:any = []
    objectArray.forEach(([key, value]) => {
      data.push({key:key, value:JSON.stringify(value)})
    });
    return data
  }




}
