import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  Snackbar,
  Alert,
  Slide,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import Header from "components/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const inputs = [
  { id: 1, label: "Current Password", name: "currentPassword" },
  { id: 2, label: "New Password", name: "newPassword" },
  { id: 3, label: "Confirm New Password", name: "cNewPassword" },
];
const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is Required"),
  newPassword: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol")
    .notOneOf(
      [yup.ref("currentPassword"), null],
      "Old Password and New Password Cannot Be Same"
    ),

  cNewPassword: yup
    .string()
    .required("Confirm Password Please")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});
const initialValuesPassword = {
  currentPassword: "",
  newPassword: "",
  cNewPassword: "",
};
const ConfirmPassword = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const handleClickShowPassword = (index) => {
    setShowPassword((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const savedCommitteeResponse = await axios({
        method: "post",

        url: `${process.env.REACT_APP_BASE_URL}/committee/add-committee`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(values),
      });
      const savedCommittee = await savedCommitteeResponse.data;
      onSubmitProps.resetForm();
      if (savedCommittee) {
        setMessage("Committee Added!");
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      }
    } catch (error) {
      alert("There is some error! Please Try Again.");
    }
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction='down' />;
  };
  return (
    <Box>
      <Box
        m='1rem 2.5rem'
        position='relative'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "easeInOut" }}
      >
        <Header title='CHANGE PASSWORD' subtitle='Enter Details' />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesPassword}
          validationSchema={changePasswordSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Snackbar
                sx={{ position: "absolute" }}
                open={open}
                autoHideDuration={6000}
                TransitionComponent={SlideTransition}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Alert variant='filled' severity='success'>
                  {message}
                </Alert>
              </Snackbar>
              <Box>
                <Card
                  sx={{
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                    marginTop: "20px",
                  }}
                >
                  <CardContent mt='20px'>
                    <Box
                      sx={{
                        width: isNonMobile ? "60%" : "90%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {inputs.map((input, index) => (
                        <TextField
                          component={motion.div}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: 0.15 * input.id,
                          }}
                          exit={{ y: 20, opacity: 0 }}
                          key={input.id}
                          id={input.name}
                          type={showPassword[index] ? "text" : "password"}
                          autoComplete='off'
                          color='secondary'
                          label={input.label}
                          value={values[input.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched[input.name] ? errors[input.name] : ""
                          }
                          error={
                            touched[input.name] && Boolean(errors[input.name])
                          }
                          margin='dense'
                          variant='outlined'
                          fullWidth
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  onClick={() => handleClickShowPassword(index)}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword[index] ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions
                    display='flex'
                    sx={{
                      marginBottom: "1rem",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant='contained'
                      type='submit'
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                      }}
                      size='large'
                      color='secondary'
                    >
                      Change Password
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ConfirmPassword;