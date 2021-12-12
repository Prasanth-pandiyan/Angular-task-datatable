import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  formdata = [];
  temp = [];
  message = '';
  filterdata = '';

  constructor(public router: Router, public service: ServiceService) {
    if(localStorage.getItem('userlist')!=null) this.service.user_list = JSON.parse(localStorage.getItem('userlist'))
    else this.message = 'No Data Found..!'
    this.formdata = this.service.user_list;
    this.temp = [...this.service.user_list]
  }

  ngOnInit(): void {}

  edit(index){
    localStorage.setItem('editdata',JSON.stringify(this.service.user_list[index]))
    this.router.navigate(['edit'])
  }

  view(index){
    localStorage.setItem('viewdata',JSON.stringify(this.service.user_list[index]))
    this.router.navigate(['view-user'])
  }

  delete(index){
    this.service.user_list.splice(index,1)
    localStorage.setItem('userlist',JSON.stringify(this.service.user_list))
  }

  filter(){
    const val = this.filterdata.toString().toLowerCase();
    const temp = this.temp.filter(function (d) {
        return d.firstname.toString().toLowerCase().indexOf(val) !== -1 || d.mobileno.toString().toLowerCase().indexOf(val) !== -1 || d.email.toString().toLowerCase().indexOf(val) !== -1 || d.address.toString().toLowerCase().indexOf(val) !== -1 || d.country.toString().toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.formdata = temp;
  }

}
