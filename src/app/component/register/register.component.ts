import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

declare let google: any;

export interface DialogData {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  country = []
  state = []
  city = []
  lat: number = 0;
  lng: number = 0;
  edit = false;

  constructor(public form: FormBuilder, public service: ServiceService, public router: Router,public route: ActivatedRoute) {

    if(localStorage.getItem('userlist')!=null) this.service.user_list = JSON.parse(localStorage.getItem('userlist'))
    this.RegisterForm = this.form.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: [''],
      mobileno: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      lat: [''],
      lng: [''],
    })
    if (navigator && navigator.geolocation) {
      const position = (pos) => {
        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;

      };
      const error = (error) => {
        alert(JSON.stringify(error));
      };
      navigator.geolocation.watchPosition(position, error);

    }
  }

  ngOnInit(): void {
    if(this.route.snapshot['_urlSegment'].segments.length!=0) {
      if(localStorage.getItem('editdata')==null) this.router.navigate(['/view'])
      this.edit = true;
      var editdata = JSON.parse(localStorage.getItem('editdata'))
      this.RegisterForm.controls['firstname'].setValue(editdata.firstname);
      this.RegisterForm.controls['lastname'].setValue(editdata.lastname);      
      this.RegisterForm.controls['mobileno'].setValue(editdata.mobileno);
      this.RegisterForm.controls['email'].setValue(editdata.email);      
      this.RegisterForm.controls['address'].setValue(editdata.address);
      this.RegisterForm.controls['city'].setValue(editdata.city);
      this.RegisterForm.controls['state'].setValue(editdata.state);
      this.RegisterForm.controls['country'].setValue(editdata.country);
      this.RegisterForm.controls['id'].setValue(editdata.id);
      this.RegisterForm.controls['lat'].setValue(editdata.lat);
      this.RegisterForm.controls['lng'].setValue(editdata.lng);
      this.getlocation();
    }else this.getcountry()

    // const uluru = { lat: -25.344, lng: 131.036 };
    // const map = new google.maps.Map(
    //   document.getElementById("map") as HTMLElement,
    //   {
    //     zoom: 4,
    //     center: uluru,
    //   }
    // );
    // const marker = new google.maps.Marker({
    //   position: uluru,
    //   map: map,
    // });

  }

  getlocation(){
    this.service.post('countries/').subscribe(res => {
      this.country = res;
    })
    this.service.post('states/' + this.RegisterForm.value.country).subscribe(res => {
      this.state = res;
    })
    this.service.post('cities/' + this.RegisterForm.value.state).subscribe(res => {
      this.city = res;
    })
  }

  getcountry() {
    this.service.post('countries/').subscribe(res => {
      this.country = res;
      this.state = [];
      this.city = [];
      this.RegisterForm.controls['state'].setValue('');
      this.RegisterForm.controls['city'].setValue('');
      this.RegisterForm.controls['state'].setErrors(null);
      this.RegisterForm.controls['city'].setErrors(null);
    }, error => {
      console.log(error)
    })
  }

  getstate() {
    this.service.post('states/' + this.RegisterForm.value.country).subscribe(res => {
      this.state = res;
      this.city = [];
      this.RegisterForm.controls['city'].setValue('');
      this.RegisterForm.controls['city'].setErrors(null);
    }, error => {
      console.log(error)
    })
  }

  getcities() {
    this.service.post('cities/' + this.RegisterForm.value.state).subscribe(res => {
      this.city = res
    }, error => {
      console.log(error)
    })
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {lat: this.lat, lng: this.lng},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed',result);
  //   });
  // }

  handleAddressChange(event){
    console.log(event)
  }

  formsubmit() {
    this.RegisterForm.controls['lat'].setValue(this.lat);
    this.RegisterForm.controls['lng'].setValue(this.lng);
    if(this.edit==false){
      this.RegisterForm.controls['id'].setValue(this.service.user_list.length);
      this.service.user_list.push(this.RegisterForm.value)
      localStorage.setItem('userlist',JSON.stringify(this.service.user_list))
      this.router.navigate(['/view'])
    }else{
      this.service.user_list.forEach((element, index) => {
        if(element.id==this.RegisterForm.value.id){
          this.service.user_list.splice(index,1);
          this.service.user_list.push(this.RegisterForm.value)
          localStorage.setItem('userlist',JSON.stringify(this.service.user_list))
          this.router.navigate(['/view'])
        }
      });
    }

  }

}
