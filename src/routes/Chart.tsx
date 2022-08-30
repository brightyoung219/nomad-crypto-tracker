import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { darkTheme } from "../theme";

type ChartProps = {
  coinId: string;
};

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 500,
              height: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100]
              },
            },
            colors: ["#0fbcf9"],
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              labels: { 
                show: false,
                datetimeFormatter: {
                  month: "MMM 'yy",
                }
              },
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map(price => (price.time_close)),
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
