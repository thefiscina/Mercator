import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/apiServices';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Global } from 'src/app/global';
import { MatDialog } from '@angular/material';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  client: any = {};
  loading: any = false;
  locationJson: any = {};
  locationSelected: any = 'Português';
  constructor(
    private router: Router,
    public apiService: ApiService,
    private authService: AuthService,
    public global: Global,
    public dialog: MatDialog

  ) {

  }

  ngOnInit(): void {
  }


  login() {
    if (this.loading) {
      return;
    }

    if (!this.client.usuario) {

      var objAlert = {
        title: `Erro`,
        msg: 'Favor preencher o login',
        tipo: 2
      }
      alert('Favor preencher o login')
      // this.showAlert(objAlert);

      return;
    }

    if (!this.client.senha) {

      var objAlert = {
        title: `Erro`,
        msg: 'Favor preencher a senha',
        tipo: 2
      }
      alert('Favor preencher a senha')
      // this.showAlert(objAlert);
      return;
    }

    this.authUser(this.client);
  }

  authUser(user: any) {
    this.loading = true;
    this.apiService.PostPublic('autenticar/usuario-admin', user).then((res: any) => {
      if (this.router['rawUrlTree'].queryParams.returnUrl != null) {
        this.authService.loginUser(res['token'], this.router['rawUrlTree'].queryParams.returnUrl);
      } else {
        this.authService.loginUser(res['token']);
      }
    }).catch((err) => {
      var objAlert = {
        title: `Erro`,
        msg: err.error.message,
        tipo: 2
      }
      alert(err.error.message)
      // this.showAlert(objAlert);
      this.loading = false;
    });
  }


  showAlert(item: any) {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      width: 'auto',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
