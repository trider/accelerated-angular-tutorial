import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import { Users } from '../data/users';
import { HttpService } from '../services/http-service/http-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  providers: [
    HttpService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  users:any = Users;
  user:any = null

  loginForm = new FormGroup({
    email: new FormControl('jonnygold@gmail.com'),
    password: new FormControl('1234'),
  });


  constructor( 
    private router: Router,
    public httpService: HttpService
  ) { }

  onSubmit(){
    this.httpService.postServiceData('/api/users/login', this.loginForm.value).subscribe((data: any) => {
      if(data !==null){
        this.user = data
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/tasks']);
      }
    });
  }

}
