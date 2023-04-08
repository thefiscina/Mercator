import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/apiServices';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  client: any = {};
  locationSelected: any = 'Português';
  menuToogle: any = false;
  menuToogle_: any = false;

  constructor(
    private router: Router,
    public apiService: ApiService,
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe((res: any) => {
      if (res) {
        this.client = res;
        console.log(this.client)
      }
    });
    this.authService.toogleMenu.subscribe((res: any) => {
      this.menuToogle = res;
    });
  }

  ngOnInit(): void {
  }

  sair() {
    this.authService.logoutUser();
  }

  toogleMenu() {
    this.menuToogle_ = !this.menuToogle_;
    this.authService.setAtualizarMenu(this.menuToogle_)
  }


}
