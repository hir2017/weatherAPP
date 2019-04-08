export class Typhoon {
  TyphoonStormId: number;
  RegionId: number;
  Year: number;
  Number: number;
  UrlLink: string;
  StormName: string;
  StormRegion: string;
  BirthYMDHM: string;
  DeathYMDHM: string;
  Duration: string;
  MinPressure: string;
  InsertDate: string;
  InsertedBy: string;
  UpdateDate: string;
  UpdatedBy: string;
  TyphoonStormDetail: TyphoonStormDetail[];
}

export class TyphoonStormDetail {
  TyphoonStormDetailId: number;
  TyphoonStormId: number;
  Year: string;
  Month: string;
  Day: string;
  Hour: string;
  Lattitude: string;
  Longitude: string;
  Pressure: string;
  Wind: string;
  Class: string;
  InsertDate: string;
  InsertedBy: string;
  UpdateDate: string;
  UpdatedBy: string;
}
