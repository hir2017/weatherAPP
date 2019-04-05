export class Typhoon {
  typhoonId: number;
  regionId: number;
  urlLink: string;
  birthDay: string;
  EndDay: string;
  DurationInSecond: number;
  minPressure: string;
  maxPressure: string;
  name: string;
  path: TyphoonPath[];
}

export class TyphoonPath {
  pathId: number;
  typhoonId: number;
  reportDate: string;
  lat: string;
  long: string;
  pressure: string;
  wind: string;
  category: number;
}
