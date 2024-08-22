import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('jonnygold@gmail.com'),
    password: new FormControl('1234'),
  });

  constructor() { }
  ngOnInit(): void {}
  onSubmit(){}

}
