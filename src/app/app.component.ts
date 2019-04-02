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
    const map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 9,
      center: [116.407394, 39.904202]
      // center: [ -0.118092, 51.509865]
    });
    map.on('complete', function() {
      this.marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [116.405467, 39.907761]
      });
      this.circle = new AMap.Circle({
        center: new AMap.LngLat('116.403322', '39.920255'), // 圆心位置
        radius: 1000,
        strokeColor: '#F33',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#ee2200',
        fillOpacity: 0.35
      });
      map.add(this.marker);
      map.add([this.marker, this.circle]);
    });

    map.on('click', function(ev) {
      const lnglat = ev.lnglat;
      const marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [lnglat.getLng(), lnglat.getLat()]
      });
      map.add(marker);
    });
  }
}
