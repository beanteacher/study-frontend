import React, {useEffect, useState} from "react";
import {Link, Route, Switch, useLocation, useParams, useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import {fetchCoin, fetchCoinPrice} from "../api";
import {useQuery} from "react-query";
import {Helmet} from "react-helmet";

interface CoinProps {
    coinId : string;
}
interface CoinState {
    name: string;
}
interface Coin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
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
interface CoinPrice {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    total_supply: string;
    max_supply: string;
    beta_value: string;
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
        }
    };
}
const Overview = styled.div`
   display: flex;
   justify-content: space-between;
   background-color: rgba(0, 0, 0, 0.5);
   padding: 10px 20px;
   border-radius: 10px;
 `;
const OverviewItem = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
 
   span:first-child {
     font-size: 10px;
     font-weight: 400;
     text-transform: uppercase;
     margin-bottom: 5px;
   }
 `;
const Description = styled.p`
   margin: 20px 0px;
 `;
const Container = styled.div`
    padding: 0 20px;
    max-width: 400px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor}
`
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Tabs = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   margin: 25px 0px;
   gap: 10px;
 `;
const Tab = styled.span<{ isActive: boolean }>`
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

function Coin() {
    const {coinId} = useParams<CoinProps>();
    const {state} = useLocation<CoinState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    const {isLoading: coinLoading, data : coin} =
        useQuery<Coin>(["coin", coinId], () => fetchCoin(coinId)); // 파라미터로 같은 값을 넘겨도 react query 캐시 시스템에 key를 저장할 땐 고유한 값이여하므로 따로 key 값을 지정해줬다.
    const {isLoading: coinPriceLoading, data : coinPrice} =
        useQuery<CoinPrice>(["coinPrice", coinId], () => fetchCoinPrice(coinId),
            {
                refetchInterval: 5000
            });
    const loading = coinLoading || coinPriceLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : coin?.name}
                </title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : coin?.name}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{coin?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{coin?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{coinPrice?.quotes.USD.price.toFixed(5)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{coin?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{coinPrice?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{coinPrice?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Switch>
                        <Route path={`/:coinId/price`}>
                            <Price />
                        </Route>
                        <Route path={`/:coinId/chart`}>
                            <Chart coinId={coinId}/>
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
}

export default Coin;