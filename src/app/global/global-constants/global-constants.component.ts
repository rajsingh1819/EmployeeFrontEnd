import { Component } from '@angular/core';

@Component({
  selector: 'app-global-constants',
  template: `
    <p>
      global-constants works!
    </p>
  `,
  styles: [
  ]
})
export class GlobalConstantsComponent {

  // ng g m global/global-constants.ts --inline-style --inline-template


  //Message
  public static genericError: string = "something went wrong. Please try again later";
  public static unauthorized: string = "You are not authorized person to access this page.";
  public static productExistError: string = "Product already exist.";
  public static productAdded: string = "Product Added Successfully.";

  //Regex 
  public static nameRegex: string = '[a-zA-Z0-9]*';
  public static emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z-0-9._%-]+\\.[a-z]{2,3}';
  public static contanctNumberRegex: string = '^[e0-9]{10,10}$';

  //Variable
  public static error: string = 'error';
}


