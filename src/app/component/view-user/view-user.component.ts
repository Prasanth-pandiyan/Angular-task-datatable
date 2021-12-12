import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  viewdata:any;

  constructor(public router: Router, public service: ServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem('viewdata')==null) this.router.navigate(['/view'])
    else this.viewdata = JSON.parse(localStorage.getItem('viewdata'))
  }

}
