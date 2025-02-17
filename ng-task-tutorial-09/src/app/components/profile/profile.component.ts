import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgbAlertModule,
    ModalComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() user:any = null;

  showProfile(){
    alert(JSON.stringify(this.user))
  }
}
