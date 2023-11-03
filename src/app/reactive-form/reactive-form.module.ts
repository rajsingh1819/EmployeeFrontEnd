import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ReactiveFormModule { 
  id:number=0;
  name:string='';
  email:string='';
  phone:string='';
  gender:string='';
  occupation:string='';
}
