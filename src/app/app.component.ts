import {Component, OnInit} from '@angular/core';
import {Typhoon} from './typhoon';
import {TyphoonService} from './typhoon.service';

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
  map: any;
  selectedTyphoon: Typhoon;
  TyphoonList: Typhoon[];

  constructor(private typhoonService: TyphoonService) {
  }

  ngOnInit() {
    this.getMap();
  }

  getMap() {
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 9,
      center: [111.6, 7.7]
      // center: [ -0.118092, 51.509865]
    });

    this.map.on('complete', () => {
      this.getTyphoonList();

      // const marker = new AMap.Marker({
      //   icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //   position: [116.405467, 7.7]
      // });
      // const circle = new AMap.Circle({
      //   center: new AMap.LngLat('116.403322', '7.7'), // 圆心位置
      //   radius: 1000,
      //   strokeColor: '#F33',
      //   strokeOpacity: 1,
      //   strokeWeight: 3,
      //   fillColor: 'green',
      //   fillOpacity: 0.35
      // });
      // const circle2 = new AMap.Circle({
      //   center: new AMap.LngLat('117.403322', '7.7'), // 圆心位置
      //   radius: 10000,
      //   strokeColor: '#F33',
      //   strokeOpacity: 1,
      //   strokeWeight: 3,
      //   fillColor: 'red',
      //   fillOpacity: 0.35
      // });
      //
      // this.map.add(marker);
      // this.map.add([marker, circle, circle2]);

    });

    // map.on('click', function(ev) {
    //   const lnglat = ev.lnglat;
    //   const marker = new AMap.Marker({
    //     icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    //     position: [lnglat.getLng(), lnglat.getLat()]
    //   });
    //   map.add(marker);
    // });

  }

  private draw(): void {
    window.console.log('selected path: ' + this.selectedTyphoon);
    let index = 0;
    for (const detail of this.selectedTyphoon.path) {
      window.console.log('lat=' + detail.lat + ';lng=' + detail.long);
      // const lngX = parseFloat(detail.long);
      // const latY = parseFloat(detail.lat);
      // const arr_dongHua = GPS.gcj_encrypt(latY, lngX);
      // lngX = arr_dongHua.lon.toFixed(6);
      // latY = arr_dongHua.lat.toFixed(6);
      // lineArr.push(new AMap.LngLat(lngX, latY));
      // var getTime = item.dTime; //截取时间
      // getTime = getTime.substring(getTime.length - 5, getTime.length);
      // //加上带有时间的图标标记
      const marker = new AMap.Marker({
        position: [detail.long, detail.lat],
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      });
      this.map.add(marker);
      if (index > 0) {
        const typhonPath = [
          [this.selectedTyphoon.path[index - 1].long, this.selectedTyphoon.path[index - 1].lat],
          [this.selectedTyphoon.path[index].long, this.selectedTyphoon.path[index].lat]
        ];
        const polyLine = new AMap.Polyline({
          path: typhonPath,
          strokeColor: 'red',
          strokeWeight: 2,
        });
        this.map.add(polyLine);
      }
      index++;
    }
  }

  private getTyphoonList(): void {
    window.console.log('getting typhoon list');
    this.typhoonService.getTyphoonList().subscribe(list => {
      this.TyphoonList = list;
      this.selectedTyphoon = list[0];
      this.draw();
      window.console.log(list);
    });
  }

  // private drawPath(): void {
  //
  // }
}
