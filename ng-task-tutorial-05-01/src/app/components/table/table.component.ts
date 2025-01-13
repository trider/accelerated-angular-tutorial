import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe, DecimalPipe } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() tableData: any;
  @Input() tableCols: any;
  title:string = "Add Task";
  item:any = null;
  taskStatus:string[] = [
    "do",
    "doing",
    "done"
  ];
  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');

  taskForm = new FormGroup({
    user: new FormControl(this.user.userName),
    name: new FormControl('New Task'),
    description: new FormControl('My new task description'),
    status: new FormControl('do'),
  });

  constructor(
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
  }
  openModal(content:any, title:string, item:any = null) {
    this.title = title;
    if(this.title === "Edit Task"){
      this.item = item;
      this.taskForm.patchValue({
        name: item.name,
        description: item.description,
        status: item.status,
      
      });
    }
    this.modalService.open(content, { size: 'sm', scrollable: true })
  }

  onSubmit(){
    if(this.title === "Add Task"){
      let taskId:number = this.tableData.length + 1;
      this.tableData=[
        ...this.tableData,
        {
          id: Math.random().toString(36),
          name: this.taskForm.value.name,
          description: this.taskForm.value.description,
          user: this.taskForm.value.user,
          added: new Date().toISOString(),
          updated: new Date().toISOString(),
          status: this.taskForm.value.status,
          taskId: taskId,
          isActive: true,
        
        }
      
      ];
    }
    else if(this.title === "Edit Task"){
     this.tableData = this.tableData.map((item:any) => {
       if(item.id === this.item.id){
         return {
           ...item,
           name: this.taskForm.value.name,
           description: this.taskForm.value.description,
           status: this.taskForm.value.status,
           updated: new Date().toISOString(),
         }
       }
       return item;
     })
    }
    this.modalService.dismissAll();
  }

  deleteItem(item:any){
    this.tableData = this.tableData.filter((i:any) => i !== item);
    
  }



}
