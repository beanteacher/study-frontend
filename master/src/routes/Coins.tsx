import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

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
    color : ${props => props.theme.accentColor};
`
const CoinList = styled.ul`
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`
const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.5s ease-in;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor} 
        }
    }
`
interface CoinProps {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const json = await (await fetch("https://api.coinpaprika.com/v1/tickers?limit=100")).json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);
    console.log(coins)
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            { loading ? (<Loader>Loading ...</Loader>) : (
                <CoinList>
                    {coins.map(coin => (
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: {name:coin.name}
                            }}>
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={""}/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            )}
        </Container>
    );
}

export default Coins;