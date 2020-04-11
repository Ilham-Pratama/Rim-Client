import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  makeStyles,
  withStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from '../queries';
import { AttachTitle, ErrorMessage } from './utils';
import { main, logo } from '../urls';

export const StyledTextField = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.down(900)]: {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down(600)]: {
      marginTop: theme.spacing(2),
    },
    '& label.Mui-focused': {
      color: theme.palette.primary,
      fontSize: '1em',
    },
    '& .Mui-error': {
      '& fieldset': {
        borderColor: 'red',
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}))(TextField);

export const StyledButton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down(600)]: {
      marginTop: theme.spacing(3),
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'absolute',
    flexGrow: 1,
    height: 800,
    width: '100%',
    [theme.breakpoints.down(450)]: {
      height: '100%',
    },
    [theme.breakpoints.down(900)]: {
      flexDirection: 'column',
      height: 600,
    },
    [theme.breakpoints.down(1100)]: {
      flexDirection: 'column',
      height: 700,
    },
    [theme.breakpoints.up(1100)]: {
      height: '100%',
    },
  },
  banner: {
    flex: 4,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(to left, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
    [theme.breakpoints.down(500)]: {
      paddingRight: 10,
    },
    [theme.breakpoints.down(1100)]: {
      flex: 3,
    },
  },
  signin: {
    flex: 2,
    paddingTop: '5%',
    paddingBottom: 10,
    textAlign: 'center',
    backgroundColor: '#f8fcf8',
    [theme.breakpoints.down(1100)]: {
      flex: 7,
    },
  },
  mainLabel: {
    color: '#fff',
    fontWeight: 'bold',
    [theme.breakpoints.down(1100)]: {
      fontSize: '2.7em',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '2em',
    },
  },
  logo: {
    display: 'block',
    margin: theme.spacing(2),
    width: 100,
    height: 100,
  },
  label: {
    margin: 10,
    fontWeight: 'lighter',
    fontSize: '3em',
    color: '#575757',
    [theme.breakpoints.down(900)]: {
      fontSize: '2.5em',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '2.3em',
    },
    [theme.breakpoints.down(400)]: {
      fontSize: '2em',
      marginTop: 13,
    },
  },
  paper: {
    width: '75%',
    marginBottom: 20,
    padding: theme.spacing(2),
    borderRadius: 8,
    display: 'inline-block',
    boxShadow: theme.shadows[2],
    backgroundColor: 'white',
    [theme.breakpoints.down(1100)]: {
      width: '40%',
    },
    [theme.breakpoints.down(700)]: {
      width: '50%',
    },
    [theme.breakpoints.down(500)]: {
      width: '80%',
    },
  },
}));

const Landing = () => {
  localStorage.setItem('token', '');
  const history = useHistory();
  const [notFound, setNotFound] = React.useState(false);
  const [signin, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: ({ signIn }) => {
      if (signIn) {
        localStorage.setItem('token', 'Bearer ' + signIn);
        history.push(main);
      } else {
        setNotFound(true);
      }
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AttachTitle msg={'Welcome to Rim!'} />
      <div className={classes.banner}>
        <img className={classes.logo} src={logo} alt="not found" />
        <Typography variant="h2" className={classes.mainLabel}>
          Share with Rim!
        </Typography>
      </div>
      <div className={classes.signin}>
        <h1 className={classes.label}>Sign in now!</h1>
        <div className={classes.paper}>
          {notFound && <ErrorMessage>Invalid email or password</ErrorMessage>}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid Email address')
                .required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setNotFound(false);
              const { email, password } = values;
              signin({
                variables: {
                  email,
                  password,
                },
              });
              setSubmitting(false);
            }}
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
                <br />
                <Field
                  component={StyledTextField}
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                />
                {(loading && (
                  <CircularProgress color="secondary" style={{ margin: 25 }} />
                )) || (
                  <StyledButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Submit
                  </StyledButton>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <br />
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          Don't have an account?
        </Link>
      </div>
    </div>
  );
};

export default Landing;
