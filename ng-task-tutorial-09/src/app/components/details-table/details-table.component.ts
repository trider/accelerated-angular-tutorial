import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';



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
  @Input() logRow:boolean = false
  @Input() rowName:string = 'rowData'
  @Input() showForm:boolean = false
  @Input() isCurrency:boolean = false
  @Input() showButton:boolean = true
  @Input() showHeader:boolean = true
  @Input() showPreferences:boolean = false
  @Input() showPrefix:boolean = false
  rowData:string = ''
  preference:any = ''
  rows:any=null
  isCollapsed:boolean=true



  constructor() {}

  ngOnInit(): void {
    if(this.row != null)this.rows = this.getRowValues(this.row)

   
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
