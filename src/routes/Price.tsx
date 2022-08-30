import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { PriceData } from "./Coin";
import { Overview, OverviewItem } from "./Coin";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  margin: 25px 0px;
  gap: 10px;
`;

const GridItemSpan = styled.div`
  grid-column: 1 / span 2;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

type PriceProps = {
  tickerData: PriceData;
};

function Price() {
  const { tickerData } = useOutletContext<PriceProps>();
  const quotes = tickerData.quotes.USD;

  return (
    <Overview>
      <OverviewItem>
        <span>24h Volume</span>
        <span>
          {quotes.volume_24h
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </OverviewItem>
      <OverviewItem>
        <span>24h Change</span>
        <span>{quotes.percent_change_24h} %</span>
      </OverviewItem>
      <OverviewItem>
        <span>MARKET CAP</span>
        <span>
          {quotes.market_cap
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </OverviewItem>
    </Overview>
  );
}

export default Price;
