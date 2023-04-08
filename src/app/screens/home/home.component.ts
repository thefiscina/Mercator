import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/apiServices';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as moment from "moment";
import { Global } from 'src/app/global';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  listMaps: any = [];

  constructor(
    private router: Router,
    public apiService: ApiService,
    private authService: AuthService,
    public global: Global,
  ) {

  }

  ngOnInit(): void {

  }

}
