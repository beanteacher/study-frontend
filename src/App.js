import {useState, useEffect, use} from "react";

// api.coinpaprika.com/v1/tickers
function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then(response => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
                if(json.length > 0) setSelectCoin(json[0]);
            });

    }, []);
    const [selectCoin, setSelectCoin] = useState(null);
    const onSelect = (event) => {
        setSelectCoin(JSON.parse(event.target.value));
    }

    const [money, setMoney] = useState(0);
    const onMoney = (arg) => {
        setMoney(arg.target.value)
    }
    return (
        <div>
            <div>
                <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
                {loading  ? <strong>Loading...</strong> :
                    <select onChange={onSelect}>
                        {coins.map((coin) =>
                            <option key={coin.id} value={JSON.stringify(coin)}>
                                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                            </option>)
                        }
                    </select>
                }
            </div>
            <input onChange={onMoney} type="number" placeholder="How much having money ?"/> USD
            {selectCoin ? <p>당신이 가지고 있는 돈 {money}$로는 {money / selectCoin.quotes.USD.price}.{selectCoin.symbol}을 구매할 수 있습니다.</p> : null}
        </div>
    );
}

export default App;