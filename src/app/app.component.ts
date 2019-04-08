import {Component, OnInit} from '@angular/core';
import {HostListener} from '@angular/core';
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
  mouseTool: any;
  toolbar: any;
  selectedArea: any;
  ctrlPressing: boolean;

  constructor(private typhoonService: TyphoonService) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardDownEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      window.console.log('control key down.');
      this.ctrlPressing = true;
      this.mouseTool.rectangle({
        fillColor: 'lightgreen',
        strokeStyle: 'dashed'
      });
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    if (this.ctrlPressing) {
      window.console.log('key is up.');
      this.mouseTool.close(true);
    }
    this.ctrlPressing = false;
  }

  ngOnInit() {
    this.getMap();
  }

  getMap() {
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 9,
      // dragEnable: false,
      center: [111.6, 7.7]
      // center: [ -0.118092, 51.509865]
    });

    this.map.on('complete', () => {
      this.map.plugin(['AMap.MouseTool'], () => {
        this.mouseTool = new AMap.MouseTool(this.map);
        this.mouseTool.on('draw', restData => {
          window.console.log(restData);
          const areaPath = restData.obj.he.path.map(item => {
            return [item.lng, item.lat];
          });
          window.console.log(areaPath);
        });
      });

      this.map.plugin(['AMap.ToolBar'], () => {
        this.toolbar = new AMap.ToolBar();
        this.map.addControl(this.toolbar);
        this.toolbar.show();
      });

      this.map.plugin(['AMap.OverView'], () => {
        const overView = new AMap.OverView({
          visible: true
        });
        this.map.addControl(overView);
        overView.open();
      });
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


    // window.console.log('mouse dragon bound');
    // this.map.on('dragstart', showInfoDragstart);
    // // this.map.on('dragging', showInfoDragging);
    // this.map.on('dragend', showInfoDragend);
    //
    // function showInfoDragstart(e) {
    //   window.console.log('starting draging');  //e.lnglat.getLng() + ',' + e.lnglat.getLat()
    //   window.console.log(e);
    // }
    //
    // function showInfoDragend(e) {
    //   window.console.log('draging finished');
    //   window.console.log(e);
    // }

    // map.on('click', function(ev) {
    //   const lnglat = ev.lnglat;
    //   const marker = new AMap.Marker({
    //     icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    //     position: [lnglat.getLng(), lnglat.getLat()]
    //   });
    //   map.add(marker);
    // });

  }

  public onTyphoonSelection(): void {
    window.console.log('selected path: ' + this.selectedTyphoon.StormName);
    let index = 0;
    for (const detail of this.selectedTyphoon.TyphoonStormDetail) {
      window.console.log('lat=' + detail.Lattitude + ';lng=' + detail.Longitude);
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
        position: [detail.Longitude, detail.Lattitude],
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      });
      this.map.add(marker);
      if (index > 0) {
        const typhonPath = [
          [this.selectedTyphoon.TyphoonStormDetail[index - 1].Longitude, this.selectedTyphoon.TyphoonStormDetail[index - 1].Lattitude],
          [detail.Longitude, detail.Lattitude]
        ];
        let color = 'red';
        if (this.selectedTyphoon.TyphoonStormDetail[index].Class === '1') {
          color = 'green';
        } else if (this.selectedTyphoon.TyphoonStormDetail[index].Class === '2') {
          color = 'lightyellow';
        } else if (this.selectedTyphoon.TyphoonStormDetail[index].Class === '3') {
          color = 'yellow';
        } else if (this.selectedTyphoon.TyphoonStormDetail[index].Class === '4') {
          color = 'pink';
        } else if (this.selectedTyphoon.TyphoonStormDetail[index].Class === '5') {
          color = 'red';
        }
        const polyLine = new AMap.Polyline({
          path: typhonPath,
          strokeColor: color,
          strokeWeight: 2,
        });
        this.map.add(polyLine);
        this.map.add(polyLine);
      } else {
        this.map.setCenter([detail.Longitude, detail.Lattitude]);
        this.map.setZoom(5);
      }

      index++;
    }
  }

  private getTyphoonList(): void {
    window.console.log('getting typhoon list');
    this.typhoonService.getTyphoonList().subscribe(list => {
      this.TyphoonList = list;
      this.selectedTyphoon = list[0];
      // this.draw();
      window.console.log(list);
    });
  }

  // private drawPath(): void {
  //
  // }
}
