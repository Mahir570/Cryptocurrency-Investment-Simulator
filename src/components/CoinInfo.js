import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { createTheme } from "@mui/system";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import ReactApexChart from "react-apexcharts";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setHistoricData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const options = {
    chart: {
      id: "historic-chart",
      animations: {
        enabled: true,
      },
    },
    xaxis: {
      type: days === 1 ? "datetime" : "category",
      labels: {
        formatter: function (val) {
          if (days === 1) {
            const date = new Date(val);
            return date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          } else {
            return val;
          }
        },
      },
    },
    yaxis: {
      title: {
        text: `Price ( Past ${days} Days ) in ${currency}`,
      },
    },
    theme: {
      mode: "dark",
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ width: "75%", marginTop: 25, padding: 40, position: "relative" }}>
        {!historicData || flag === false ? (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
          </div>
        ) : (
          <>
            <ReactApexChart
              options={options}
              series={[
                {
                  name: `Price ( Past ${days} Days ) in ${currency}`,
                  data: historicData.map((coin) => [coin[0], coin[1]]),
                },
              ]}
              type="line"
              height={400}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
