import React from "react";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId : string;
}

interface CoinHistory {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
function Chart({coinId} : ChartProps) {
    const {isLoading , data} = useQuery<CoinHistory[]>(["coinHistory", coinId], () => fetchCoinHistory(coinId));
    return (
        <div>
            {
                isLoading ?
                    "Loading chart..." :
                    <ApexChart
                    type="line"
                    series={[
                        {
                            name: coinId,
                            data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        chart :{
                            height: 500,
                            width: 500,
                        }
                    }} />
            }
        </div>
    )
}

export default Chart;