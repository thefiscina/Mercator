import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Global } from 'src/app/global';
import { ApiService } from 'src/app/service/apiServices';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent implements OnInit {
  global_: any;
  loading: any = false;
  client: any;
  valor: any = 0;
  pagamento: any = false;
  retornoItem: any;
  locationJson: any = {};
  beneficiario: any = {};
  titleAlert:any ="";
  textAlert:any ="";

  constructor(private router: Router,
    public apiService: ApiService,
    private authService: AuthService,
    public sanitizer: DomSanitizer,
    public global: Global,
    public dialogRef: MatDialogRef<ModalAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.global_ = global;
    this.authService.currentUser.subscribe((res: any) => {
      if (res) {
        this.client = res;
      }
    });
    if (data) {
      this.retornoItem = data;
    }
    this.authService.currentLocationJson.subscribe((res: any) => {
      if (res) {
        this.locationJson = res;

      }
    });
  }

  ngOnInit() {
    this.loading = false;
  }

  closeModal() {
    this.dialogRef.close();
  }

}
