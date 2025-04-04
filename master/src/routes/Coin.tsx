import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
interface CoinProps {
    coinId : string;
}
interface CoinState {
    name: string;
}
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
function Coin() {
    const {coinId} = useParams<CoinProps>();
    const [loading, setLoading] = useState(true);
    const {state} = useLocation<CoinState>();

    useEffect(() => {
        (async() => {
            const json = await (await fetch("")).json();
            setLoading(false);
        })();
    })
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            { loading ? (<Loader>Loading...</Loader>) : null }

        </Container>
    );
}

export default Coin;