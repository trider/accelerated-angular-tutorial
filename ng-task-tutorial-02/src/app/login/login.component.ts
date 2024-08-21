import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  FormsModule,
  ReactiveFormsModule,
  FormGroup, 
  FormControl, 


} from "@angular/forms";
import { Users } from '../common/data/users';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  users:any = Users;
  user:any = null

  loginForm = new FormGroup({
    email: new FormControl('jonnygold@gmail.com'),
    password: new FormControl('1234'),
  });


  constructor(
    private router: Router) { 
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.user = this.users.filter((user:any) => user.email === this.loginForm.value.email && user.password === this.loginForm.value.password)[0];
    if(this.user !== null ){
      alert(this.user.userName + ' logged in')
      console.log('User found\n\n', this.user);
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/home']);

    }
  }

}
