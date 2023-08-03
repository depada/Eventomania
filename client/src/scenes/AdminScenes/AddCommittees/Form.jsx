import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";

import { useAddCommitteeMutation } from "state/committeeApiSlice";

const inputs = [
  { id: 1, label: "Committee Name", name: "name" },
  { id: 2, label: "Description", name: "description" },
];

const addCommitteeSchema = yup.object().shape({
  name: yup.string().required("*Name is Required"),
  description: yup.string().required("Description is required"),
});

const initialValuesCommittee = {
  name: "",
  description: "",
};

const Form = () => {
  //RTK query
  const [addCommittee, { isLoading }] = useAddCommitteeMutation();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const res = await addCommittee(values).unwrap();
      onSubmitProps.resetForm();
      if (res) {
        toast.success("Committee Added!");
      }
    } catch (error) {
      toast.error("There is some error, Please Try again");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesCommittee}
      validationSchema={addCommitteeSchema}
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
                  {inputs.map((input) => (
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
                      autoComplete='off'
                      color='secondary'
                      label={input.label}
                      value={values[input.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline={input.id === 2 ? true : false}
                      minRows={3}
                      helperText={touched[input.name] ? errors[input.name] : ""}
                      error={touched[input.name] && Boolean(errors[input.name])}
                      margin='dense'
                      variant='outlined'
                      fullWidth
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
                  disabled={isLoading}
                  type='submit'
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                  size='large'
                  color='secondary'
                >
                  Add Committee
                </Button>
              </CardActions>
            </Card>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
