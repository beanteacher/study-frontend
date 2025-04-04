import {start} from "node:repl";

const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
    return await (await fetch(`${BASE_URL}/tickers?limit=100`)).json();
}

export async function fetchCoin(coinId : string) {
    return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinPrice(coinId : string) {
    return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function fetchCoinHistory(coinId : string) {
    return await (await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)).json();
}