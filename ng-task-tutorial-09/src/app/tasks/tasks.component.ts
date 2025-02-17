import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ModalComponent } from '../components/modal/modal.component';
import { HttpService } from '../services/http-service/http-service.service';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    ModalComponent,
  ],
  providers: [
    HttpService
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  tableData:any = null
  tableCols: any = [ 'name', 'description','added','updated','status'];
  user:any = null;

  constructor(
    public httpService:HttpService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
   }
  
  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(){
    this.httpService.getServiceData(`/api/tasks/user/${this.user.userName}`).subscribe((data: any) => {
      this.tableData = data
    });
  }

  deleteTask(item:any){
    this.manageTask({
      path:`/api/tasks/delete`,
      data:{
        taskId:item.taskId
      }
    })
  }

  manageTask(task:any){
    this.httpService.postServiceData(task.path, task.data).subscribe((data: any) => {
      if(data !==null)this.getTasks()
   });
  }

}