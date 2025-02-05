import { Component } from '@angular/core';
import { GlobalVariables } from '../../data/global-variables';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  currentYear!: number;
  appVersion:string = GlobalVariables.appVersion;
  constructor() {
    this.currentYear = Date.now();
  }

}
