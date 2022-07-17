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
      console.log(formData);
      const data1 = await axios.post(
        "http://164.92.213.2:5002/upload-files",
        formData,
        { withCredentials: true }
      );

      console.log(data1);

      let formdata2 = {
        title: data.title,
        author: data.author,
        filename: `${filename}.${ext}`,
      };

      const data2 = await axios.post(
        "http://164.92.213.2:5002/create-book",
        formdata2,
        { withCredentials: true }
      );

      setSuccess("E-Book successfully added to the Blockchain");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong, please try again later");
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
              <b>Mining a block, Please Wait...</b>
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
                <b>Upload an E-Book</b>
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
                    <Label text="Title" marginBottom="0px" />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "16px" }}
                  >
                    <TextField
                      id="title"
                      name="title"
                      placeholder="Dune"
                      color="primary"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                        className: classes.inputLabel,
                      }}
                      InputProps={{
                        className: classes.input,
                        autoComplete: "false",
                      }}
                      fullWidth
                      {...register("title", {
                        required: "title is required",
                      })}
                      error={errors.title ? true : false}
                    />

                    <FieldError
                      text={errors.title ? errors.title.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid item md={12} xs={12} sm={12}>
                    <Label text="Author" marginBottom="0px" />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "16px" }}
                  >
                    <TextField
                      id="author"
                      name="author"
                      placeholder="Frank Herbert"
                      color="primary"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                        className: classes.inputLabel,
                      }}
                      InputProps={{
                        className: classes.input,
                        autoComplete: "false",
                      }}
                      fullWidth
                      {...register("author", {
                        required: "author is required",
                      })}
                      error={errors.author ? true : false}
                    />

                    <FieldError
                      text={errors.author ? errors.author.message : null}
                      marginTop="8px"
                    />
                  </Grid>

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
          </Dashboard>
        </>
      )}
    </>
  );
}
