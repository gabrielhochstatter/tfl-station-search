export interface GetStopPointsMatch {
  icsId: string;
  topMostParentId: string;
  modes: string[];
  zone: string;
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface GetStopPointsResponse {
  query: string;
  total: number;
  matches: GetStopPointsMatch[];
}

export interface StopPointInfo {
  naptanId: string;
  modes: string[];
  icsCode: string;
  stopType: string;
  stationNaptan: string;
  lines: any[];
  status: true;
  id: string;
  commonName: string;
  placeType: string;
  lat: number;
  lon: number;
}

export interface ArrivalPrediction {
  id: string;
  operationType: number;
  vehicleId: string;
  naptanId: string;
  stationName: string;
  lineId: string;
  lineName: string;
  platformName: string;
  direction: string;
  bearing: string;
  destinationNaptanId: string;
  destinationName: string;
  timestamp: string;
  timeToStation: number;
  currentLocation: string;
  towards: string;
  expectedArrival: string;
  timeToLive: string;
  modeName: string;
}
