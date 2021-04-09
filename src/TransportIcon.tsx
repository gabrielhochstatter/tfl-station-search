import React, { useState } from "react";
import {
  MdDirectionsBoat,
  MdDirectionsBus,
  MdSubway,
  MdTrain,
  MdLocalAirport
} from "react-icons/md";

import styled from "styled-components";

type IconLookup = {
  [key: string]: (JSX.Element | string)[]
}

const iconLookup: IconLookup = {
  "river-bus": [<MdDirectionsBoat />, "River Bus"],
  "national-rail": [<MdTrain />, "National Rail"],
  tflrail: [<MdTrain />, "TFL Rail"],
  dlr: [<MdTrain />, "DLR"],
  bus: [<MdDirectionsBus />, "Bus"],
  tube: [<MdSubway />, "Tube"],
  overground: [<MdSubway />, "Overground"],
  plane: [<MdLocalAirport />, "Plane"]
};

const IconWrapper = styled.div`
  display: inline;
  position: relative;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 4px;
  background: red;
  color: white;

  &:before {
    content: "";
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    background: red;
    position: absolute;
    top: -2px;
    left: 11px;
  }
`;

interface TransportIconProps {
  name: string;
}

const TransportIcon: React.FunctionComponent<TransportIconProps> = ({ name }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const content = iconLookup?.[name]?.[0] || <span>{name}</span>;
  const tooltipText = iconLookup?.[name]?.[1];

  const toggleTooltip = () => setShowTooltip(!showTooltip);
  return (
    <IconWrapper onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
      {content}
      {showTooltip ? (
        <Tooltip>
          <span>{tooltipText}</span>
        </Tooltip>
      ) : null}
    </IconWrapper>
  );
};

export default TransportIcon;
