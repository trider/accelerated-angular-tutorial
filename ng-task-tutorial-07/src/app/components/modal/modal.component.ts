import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() tableData: any;
  @Input() title:string = "Add Task";
  @Input() item:any = null;
  @Output() taskEvent = new EventEmitter<any>();
  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');
  taskStatus:string[] = [
    "do",
    "doing",
    "done"
  ];

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
  openModal(content:any, title:string) {
    if(this.title === "Edit Task"){
      this.taskForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        status: this.item.status,
      });
    }
    this.modalService.open(content, { size: 'sm', scrollable: true })
  }

  onSubmit(){
    if (this.title==='Add Task'){
      this.sendTask({
        path:'/api/tasks/add',
        data:{
          ...this.taskForm.value,
          added: new Date().toISOString(),
          updated: new Date().toISOString(), 
          taskId: this.tableData.length + 1,
          isActive: true,
          
        }
      })
    }
    else if (this.title==='Edit Task'){
      this.sendTask({
        path:`/api/tasks/update/${this.item.taskId}`,
        data:{
          ...this.taskForm.value,
        }
      })


    }
    
    
  }


  sendTask(payload:any){
    this.taskEvent.emit(payload)
    this.modalService.dismissAll()


  }

  
}
