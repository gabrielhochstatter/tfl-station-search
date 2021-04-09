import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styled from "styled-components";

import { getStopPointInfo, getStopPointArrivals } from "./TflClient/tflClient";
import {
  GetStopPointsMatch,
  StopPointInfo,
  ArrivalPrediction
} from "./TflClient/tflClient.types";

import TransportIcon from "./TransportIcon";

dayjs.extend(relativeTime);

const CardContainer = styled.div`
  padding: 0px 16px;
  border-left: 5px solid black;
  margin-bottom: 8px;
`;

const StationName = styled.h2`
  margin-bottom: 8px;
`;

const StationInfo = styled.section`
  display: flex;
`;

const StationInfoSection = styled.section`
  margin-right: 16px;
  height: 100%;
`;

const StationDetailsSection = styled.section`
  display: flex;
  flex-flow: wrap;
  max-width: 500px;

  p {
    margin-right: 8px;
  }
`;

const ZoneNumber = styled.p`
  font-size: 28px;
  margin: 0;
`;

const ModesSection = styled.div`
  display: flex;
  align-items: center;
`;

const MoreInfoButton = styled.button`
  display: block;
  margin: 8px 0;
  padding: 8px 0;

  background: white;
  border: none;

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorNotification = styled.p`
  color: red;
  font-weight: 600;
`;

interface StationCardProps {
  station: GetStopPointsMatch;
}

const StationCard = ({ station }: StationCardProps) => {
  const [details, setDetails] = useState<StopPointInfo>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [predictedArrivals, setPredictedArrivals] = useState<
    ArrivalPrediction[]
  >([]);
  const [showArrivalsList, setShowArrivalsList] = useState<boolean>(false);
  const [noArrivalsNotification, setNoArrivalsNotification] = useState<string>(
    ""
  );
  const handleInfoClick = async () => {
    if (details) {
      setIsExpanded(!isExpanded);
    } else {
      const stopPointDetails = await getStopPointInfo(station?.id);
      setDetails(stopPointDetails);
      setIsExpanded(true);
    }
  };

  const handleShowArrivalsClick = async () => {
    if (showArrivalsList) {
      return setShowArrivalsList(false);
    }

    const arrivals = await getStopPointArrivals(station.id);
    setPredictedArrivals(
      arrivals.sort(
        (a, b) => Date.parse(a.expectedArrival) - Date.parse(b.expectedArrival)
      )
    );

    if (arrivals.length > 0) {
      setNoArrivalsNotification("");
      setShowArrivalsList(true);
    } else {
      setNoArrivalsNotification(
        "No arrivals data is available for this station at the moment"
      );
    }
  };

  return (
    <CardContainer>
      <StationName>{station?.name}</StationName>
      <StationInfo>
        {station?.zone ? (
          <StationInfoSection>
            <h3>Zone</h3>
            <ZoneNumber>{station?.zone}</ZoneNumber>
          </StationInfoSection>
        ) : null}
        <StationInfoSection>
          <h3>Services</h3>
          <ModesSection>
            {station?.modes?.map((mode) => (
              <TransportIcon name={mode} key={`${mode}-${station.name}-icon`} />
            ))}
          </ModesSection>
        </StationInfoSection>
      </StationInfo>
      <MoreInfoButton onClick={handleInfoClick}>
        {isExpanded ? "Hide" : "Show"} all lines serving this station
      </MoreInfoButton>
      {isExpanded ? (
        <div>
          <h3>Lines serving this station:</h3>
          <StationDetailsSection>
            {details.lines.map((line: any) => {
              return <p key={line.name}>{line.name}</p>;
            })}
          </StationDetailsSection>
        </div>
      ) : null}
      {station?.modes?.includes("overground") ? (
        <MoreInfoButton onClick={handleShowArrivalsClick}>
          Show next arrivals at this station
        </MoreInfoButton>
      ) : null}
      {station?.modes?.includes("overground") && showArrivalsList
        ? predictedArrivals.map((arrival) => {
            const arrivalEstimate = dayjs().to(arrival.expectedArrival, true);

            return (
              <p>
                Towards <strong>{arrival.destinationName}</strong> in{" "}
                <strong>{arrivalEstimate}</strong>
              </p>
            );
          })
        : null}
      {noArrivalsNotification ? (
        <ErrorNotification>{noArrivalsNotification}</ErrorNotification>
      ) : null}
    </CardContainer>
  );
};

export default StationCard;
