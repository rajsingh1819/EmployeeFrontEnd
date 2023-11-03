import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ReactiveFormModule } from './reactive-form.module';
import { SnackbarService } from '../service/snackbar.service';
import { GlobalConstantsComponent } from '../global/global-constants/global-constants.component';



@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: ApiService, private snackbar: SnackbarService) { }
  responseMessage: any;
  Default = null;
  getArray: any = [];
  searchText: any;
  formValue !: FormGroup;
  reactiveForm: ReactiveFormModule = new ReactiveFormModule;

  showAdd !: boolean;
  showUpdate !: boolean;

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.maxLength(30), Validators.pattern(GlobalConstantsComponent.emailRegex)]],
      phone: [null, [Validators.required, Validators.pattern(GlobalConstantsComponent.contanctNumberRegex)]],
      gender: [null, [Validators.required]],
      occupation: [null, [Validators.required]],
    })
    this.getData();

  }

  getControl(value: any): AbstractControl | null {
    return this.formValue.get(value);
  }



  submit() {


    console.log(this.formValue.value);


    this.http.postApi(this.formValue.value).subscribe((res: any) => {
      this.responseMessage = res?.message;
      this.snackbar.openSnackBar(this.responseMessage, "");

      let ref = document.getElementById('cancel')
      ref?.click();


      this.formValue.reset();


      this.getData();
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstantsComponent.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstantsComponent.error);
    }
    )


  }



  getData() {
    this.http.getApi().subscribe({
      next: (res) => {
        this.getArray = res;

      },
      error: () => {
        alert("somthing went wrong");
      }
    })
  }

  get fullName() {
    return this.formValue.get("name")
  }


  deleteData(row: any) {


    if (confirm("Press Ok button for delete !!!") == true) {
      this.http.deleteApi(row.id).subscribe({
        next: (res) => {

          this.responseMessage = res?.message;
          this.snackbar.openSnackBar(this.responseMessage, "");

          this.getData();
        }, error: () => {
          alert("somthing went wrong !!")
        }
      }
      )
    }
    else {
      let ref = document.getElementById('cancel')
      ref?.click();
    }

  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  editApi(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.reactiveForm.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['occupation'].setValue(row.occupation);


  }
  UpdateData() {
    this.reactiveForm.name = this.formValue.value.name;
    this.reactiveForm.email = this.formValue.value.email;
    this.reactiveForm.phone = this.formValue.value.phone;
    this.reactiveForm.gender = this.formValue.value.gender;
    this.reactiveForm.occupation = this.formValue.value.occupation;

    this.http.updateApi(this.reactiveForm, this.reactiveForm.id).subscribe((res) => {
      alert("data update successfully");
      let ref = document.getElementById('cancel');   //cancel the page AutoMatic
      ref?.click();
      this.formValue.reset();                   //reset the page
      this.getData();

    })
  }




}
