import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "25px 0",
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container>
        <div className={classes.tagline}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Crypto Hunter
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Get all the info regarding your favorite cryptocurrency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
