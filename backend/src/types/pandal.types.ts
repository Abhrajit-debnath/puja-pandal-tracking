export interface LocationCoordinates {
  latitude?: number;
  longitude?: number;
}


export enum CrowdLevelEnum {
  CALM = "CALM",
  BUSY = "BUSY",
  PACKED = "PACKED"
}


export interface NearbyPandal {

  id: string;
  name: string;
  locality: string;
  theme: string;
  description: string;
  latitude: number;
  longitude: number;
  distanceInMeters: number;
  crowdLevelStatus: CrowdLevelEnum;
  totalVotesInLast5Min: number;

}