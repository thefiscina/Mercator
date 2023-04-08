import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var mercator: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initMercator();
  }

  initMercator() {
    new mercator.DrawMercator({
      divId: "mercatorMap",
      publicKey: "DEV",
      chartKey: "demo.json",
      onExitRequested: () => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }
    }).render();
  }

}
