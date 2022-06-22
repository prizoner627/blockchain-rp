import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import Select from "react-select";

import React, { useState, useEffect } from "react";

import Dashboard from "../components/Dashboard";

import { makeStyles } from "@mui/styles";
import axios from "axios";

import Lottie from "lottie-react";
import animationData from "../lotties/server";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "24px",
    boxShadow: `0px 10px 38px rgba(221, 230, 237, 1)`,
  },
  boxContainer: {
    paddingTop: "10px",
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingBottom: "10px",
  },
  textfield: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "8px",
    paddingTop: "8px",
  },
  formHeading: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  link: {
    display: "flex",
    color: "black",
    textDecoration: "none",
  },
  icon: {
    marginRight: 0.5,
    width: 20,
    height: 20,
  },
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const style1 = {
  height: 500,
};

export default function Upload() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState([]);

  const getBlocks = async (data) => {
    setLoading(true);

    try {
      const data1 = await axios.get("http://localhost:5002/get-blockchain", {
        withCredentials: true,
      });
      console.log(data1?.data?.data);
      setChain(data1?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setChain([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlocks();
  }, []);

  return (
    <>
      {loading ? (
        <Grid container component="main" spacing={3}>
          <Grid className={classes.spinner} item md={12} sm={12} xs={12}>
            <Lottie animationData={animationData} loop={true} style={style1} />

            <Typography
              variant="h4"
              color="initial"
              align="center"
              style={{ marginBottom: "24px", marginTop: "24px" }}
            >
              <b>Fetching all blocks, Please Wait...</b>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Dashboard>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                color="initial"
                align="left"
                style={{ marginBottom: "24px", marginTop: "24px" }}
              >
                <b>Blockchain</b>
              </Typography>
            </Container>

            <Container maxWidth="lg">
              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={0}
                style={{
                  textAlign: "left",
                  fontFamily: "Courier New",
                  backgroundColor: "#0f172a",
                  color: "white",
                  padding: "24px",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
              >
                {chain.length > 0 &&
                  chain.map((chain) => {
                    return (
                      <div style={{}}>
                        <pre>{JSON.stringify(chain, null, 2)}</pre>
                      </div>
                    );
                  })}
              </Grid>
            </Container>
          </Dashboard>
        </>
      )}
    </>
  );
}
