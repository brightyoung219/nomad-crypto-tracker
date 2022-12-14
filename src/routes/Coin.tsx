import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Outlet,
  useMatch,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import {Helmet} from "react-helmet-async";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "./Coins";
import { DotPulse } from '@uiball/loaders'




const Container = styled.div`
  padding: 60px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 14vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 800;
`;

const Btn = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-size: 35px;
  position: absolute;
  left: 0px;
  cursor: pointer;
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tap = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

type RouteParams = {
  coinId: string;
};

interface RouteState {
  state: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams() as RouteParams;
  const { state } = useLocation() as RouteState;

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const navigate = useNavigate();

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<infoData>();
  // const [priceInfo, setPriceInfo] = useState<priceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     console.log(priceData)
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state ? state : loading ? "loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Btn onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faCircleLeft} />
        </Btn>
        <Title>{state ? state : loading ? "loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>
          <DotPulse size={40} speed={1.3} color="white" />
        </Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank :</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol :</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price: :</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Taps>
            <Tap isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tap>
            <Tap isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tap>
          </Taps>
          <Outlet context={{ coinId, tickerData }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
