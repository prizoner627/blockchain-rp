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
import { v4 as uuidv4 } from "uuid";
import { useForm, ErrorMessage, Controller } from "react-hook-form";

import Dashboard from "../components/Dashboard";
import FieldError from "../components/FieldError";
import Label from "../components/Label";
import Drop from "../components/Drop";

import { makeStyles } from "@mui/styles";
import axios from "axios";

import Lottie from "lottie-react";
import animationData from "../lotties/server";
import animationData1 from "../lotties/success";
import animationData2 from "../lotties/failed";

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

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid red",
    // You can also use state.isFocused to conditionally style based on the focus state
  }),
};

const style1 = {
  height: 500,
};

const style2 = {
  height: 300,
};

export default function Verify() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [files, setFiles] = useState(null);
  const [block, setBlock] = useState(null);

  let getExtension = (filename) => {
    console.log(filename);
    return filename.split(".").pop();
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let formData = new FormData();

      let filename = uuidv4();
      console.log(files[0]);
      let ext = getExtension(files[0].name);

      formData.append("files", files[0], `${filename}.${ext}`);
      const data1 = await axios.post("http://localhost:5002/verify", formData, {
        withCredentials: true,
      });
      console.log(data1?.data?.data);

      setSuccess("Matching record successfully. Your E-Book is issued by us.");
      setError(null);
      setBlock(data1?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setBlock(null);
      setLoading(false);
      setSuccess(null);
      setError("We could not find anything from our database.");
    }
  };

  const handleFiles = (file) => {
    console.log(file);
    setFiles(file);
  };

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
              <b>Checking with our database, Please Wait...</b>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Dashboard>
            <Container maxWidth="sm">
              <Typography
                variant="h4"
                color="initial"
                align="center"
                style={{ marginBottom: "24px", marginTop: "24px" }}
              >
                <b>Verify an E-Book</b>
              </Typography>
            </Container>

            <Container maxWidth="sm">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={0}
                  style={{ padding: "0px" }}
                >
                  <Grid item md={12} xs={12} sm={12}>
                    <Label text="File upload" marginBottom="0px" />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Drop handleFiles={handleFiles} />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Upload</b>
                    </Button>
                  </Grid>

                  {error ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="error">
                        <b>{error}</b>
                      </Alert>
                    </Grid>
                  ) : null}

                  {success ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="success">
                        <b>{success}</b>
                      </Alert>
                    </Grid>
                  ) : null}
                </Grid>
              </form>
            </Container>

            <Container maxWidth="lg">
              {block ? (
                <div>
                  <Lottie
                    animationData={animationData1}
                    loop={true}
                    style={style2}
                  />
                </div>
              ) : null}

              {error ? (
                <div>
                  <Lottie
                    animationData={animationData2}
                    loop={true}
                    style={style2}
                  />
                </div>
              ) : null}

              {block ? (
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
                  <div>
                    <pre>{JSON.stringify(block, null, 2)}</pre>
                  </div>
                </Grid>
              ) : null}
            </Container>
          </Dashboard>
        </>
      )}
    </>
  );
}
