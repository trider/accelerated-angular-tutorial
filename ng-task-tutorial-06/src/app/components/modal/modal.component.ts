import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { HttpService } from '@app/services/http-service/http.service';

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
  @Output() addTaskEvent = new EventEmitter<any>();
  title:string = "Add Task";
  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');

  taskForm = new FormGroup({
    user: new FormControl(this.user.userName),
    name: new FormControl('New Task'),
    description: new FormControl('My new task description'),
    status: new FormControl('do'),
  });

  constructor(
    private modalService: NgbModal,
    // private httpService: HttpService
  ) { }
  ngOnInit(): void {
    
  }
  openModal(content:any, title:string, item:any = null) {
    this.title = title;
    this.modalService.open(content, { size: 'sm', scrollable: true })
  }

  onSubmit(){
    this.addTaskEvent.emit(this.taskForm.value)
    this.modalService.dismissAll()
  }

  
}
