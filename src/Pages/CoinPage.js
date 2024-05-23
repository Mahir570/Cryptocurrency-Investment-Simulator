import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../components/CoinsTable";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  sidebar: {
    width: "100%",
    maxWidth: "400px",
    padding: theme.spacing(2),
    borderRight: "2px solid grey",
    [theme.breakpoints.up("md")]: {
      width: "30%",
      borderRight: 0,
      borderLeft: "2px solid grey",
    },
  },
  heading: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  description: {
    fontFamily: "Montserrat",
    textAlign: "justify",
    marginBottom: theme.spacing(2),
  },
  marketData: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  marketItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description?.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <div className={classes.marketItem}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            <Typography variant="h5">{numberWithCommas(coin?.market_cap_rank)}</Typography>
          </div>
          <div className={classes.marketItem}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            <Typography variant="h5">
              {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </div>
          <div className={classes.marketItem}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </div>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
