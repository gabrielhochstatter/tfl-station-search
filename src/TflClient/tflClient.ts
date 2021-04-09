import axios from "axios";
import {
  ArrivalPrediction,
  GetStopPointsResponse,
  StopPointInfo
} from "./tflClient.types";

export const getStopPoints = async (
  query: string
): Promise<GetStopPointsResponse> => {
  const stopPointsResponse = await axios.get(
    `https://api.tfl.gov.uk/StopPoint/Search?query=${query}`
  );

  return stopPointsResponse.data;
};

export const getStopPointInfo = async (
  stopId: string
): Promise<StopPointInfo> => {
  const stopPointInfoResponse = await axios.get(
    `https://api.tfl.gov.uk/StopPoint/${stopId}`
  );
  console.log(stopPointInfoResponse);

  return stopPointInfoResponse.data;
};

export const getStopPointArrivals = async (
  stopId: string
): Promise<ArrivalPrediction[]> => {
  const stopPointArrivalsResponse = await axios.get(
    `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals`
  );
  console.log(stopPointArrivalsResponse.data);

  return stopPointArrivalsResponse.data;
};
