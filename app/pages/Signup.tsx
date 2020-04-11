import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AttachTitle, ErrorMessage } from './utils';
import { StyledTextField, StyledButton } from './Landing';
import { SIGN_UP } from '../queries';
import { useMutation } from '@apollo/react-hooks';
import { main } from '../urls';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    textAlign: 'center',
    background: theme.palette.secondary.light,
    height: '100%',
    [theme.breakpoints.down(1300)]: {
      height: '130%',
    },
  },
  paper: {
    width: 500,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[2],
    background: '#fff',
    borderRadius: 7,
    display: 'inline-block',
    [theme.breakpoints.down(600)]: {
      width: 400,
    },
    [theme.breakpoints.down(450)]: {
      width: '85%',
    },
  },
  label: {
    fontWeight: 300,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down(600)]: {
      fontSize: '2.3em',
    },
    [theme.breakpoints.down(1000)]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const Signup = () => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const classes = useStyles();
  const history = useHistory();
  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted: ({ signUp }) => {
      if (!signup && !signUp.status)
        return setErrorMsg('Oops, Something went Wrong');
      if (signUp.status == 403)
        return setErrorMsg(`Email ${signUp.res} already used`);
      localStorage.setItem('token', `Bearer ${signUp.res}`);
      return history.push(main);
    },
  });
  return (
    <div className={classes.root}>
      <AttachTitle msg="Sign up for Free! " />
      <Typography variant="h3" className={classes.label}>
        Sign up now for <strong>Free!</strong>
      </Typography>
      <div className={classes.paper}>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            password_confirm: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setErrorMsg('');
            const { email, username, password, password_confirm } = values;
            if (password !== password_confirm) {
              setSubmitting(false);
              return setErrorMsg('Passwords given are not equal');
            }
            if (password.length < 8) {
              setSubmitting(false);
              return setErrorMsg('Password must contain at least 8 characters');
            }
            signup({
              variables: {
                email,
                username,
                password,
              },
            });
            setSubmitting(false);
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('Required')
              .email('Invalid email addres'),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            password_confirm: Yup.string().required('Required'),
          })}
        >
          {({ submitForm }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <Field
                component={StyledTextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
              />
              <Field
                component={StyledTextField}
                name="username"
                type="text"
                label="Username"
                variant="outlined"
              />
              <Field
                component={StyledTextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
              />
              <Field
                component={StyledTextField}
                name="password_confirm"
                type="password"
                label="Password Confirm"
                variant="outlined"
              />
              <StyledButton
                disabled={loading}
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
              >
                Submit
              </StyledButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
