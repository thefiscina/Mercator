import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  client: any = {};
  locationJson: any = {};
  menuToogle: any = false;
  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {
    this.authService.toogleMenu.subscribe((res: any) => {
      this.menuToogle = res;
    });
  }

  ngOnInit(): void {
  }

}
