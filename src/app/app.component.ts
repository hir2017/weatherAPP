import {Component, OnInit} from '@angular/core';

declare var AMap: any;


@Component({
  // selector: 'app-root',
  selector: 'app-map',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// export class AppComponent {
//   title = 'map';
// }

export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    this.getMap();
  }

  getMap() {

    // const map = new AMap.Map('iCenter');
    // let geolocation;
    // map.plugin('AMap.Geolocation', function() {
    //   geolocation = new AMap.Geolocation();
    // });

    // geolocation.getCityInfo((status, result) => {
    //   this.city = result;
    //   this.city.name = result.city;
    // });

    const map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 9,
      // center: [116.407394, 39.904202]
      center: [ -0.118092, 51.509865]
    });
  }
}
