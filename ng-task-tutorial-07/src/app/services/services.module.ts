import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http-service/http-service.service';


export interface ServicesModuleConfig {
  // Define your configuration properties here
}

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,

  ],
  providers: [ 

   ],
   exports: [

    
   ]


})
export class ServicesModule { 

  constructor(
     public httpService: HttpService,
  ) {

  }


}
