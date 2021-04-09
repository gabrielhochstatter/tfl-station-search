import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import styled from "styled-components";

import "./styles.css";

import { getStopPoints } from "./TflClient/tflClient";
import { GetStopPointsMatch } from "./TflClient/tflClient.types";

import StationCard from "./StationCard";

const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  max-width: 800px;
  height: 48px;
  font-size: 36px;
`;

export default function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [matches, setMatches] = useState<GetStopPointsMatch[]>([]);

  useEffect(() => {
    const getMatchingStops = async (stopPointQuery: string) => {
      if (!stopPointQuery) return;
      try {
        const stops = await getStopPoints(stopPointQuery);
        setMatches(stops?.matches);
      } catch (e) {
        console.log(e);
      }
    };
    getMatchingStops(query);
  }, [query]);

  const runSearch = () => {
    setQuery(searchValue);
  };

  const [searchForStation] = useDebouncedCallback(() => runSearch(), 400);

  useEffect(() => {
    if (searchValue.length > 1) {
      searchForStation();
    } else {
      setMatches([]);
    }
  }, [searchValue, searchForStation]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <div className="App">
      <h1>TFL Station Finder</h1>
      <SearchInput
        type="text"
        onChange={handleChange}
        placeholder="Start typing a station name"
      />
      {matches?.map((match) => (
        <StationCard station={match} key={`${match.name}-stationCard`} />
      ))}
    </div>
  );
}
