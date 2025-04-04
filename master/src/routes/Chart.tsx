import React from "react";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
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
function Chart({coinId}: ChartProps) {
    const {isLoading , data} = useQuery<CoinHistory[]>(["coinHistory", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000
    });
    return (
        <div>
            {
                isLoading ?
                    "Loading chart...":
                    <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        chart:{
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent"
                        },
                        theme: {
                            mode: "dark"
                        },
                        grid: {

                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            labels: {show : false},
                            axisTicks: { show : false },
                            axisBorder: { show : false },
                            categories: data?.map(price =>  new Date(parseInt(price.time_close) * 1000).toLocaleDateString())
                        },
                        stroke: {
                            curve: "smooth",
                            width: 2
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#0be881"],
                                stops: [0, 100]
                            }
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`
                            }
                        }
                    }} />
            }
        </div>
    )
}

export default Chart;