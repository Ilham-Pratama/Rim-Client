import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  error: {
    padding: theme.spacing(2),
    color: '#fff',
    fontWeight: 'bolder',
    backgroundColor: theme.palette.error.main,
    borderRadius: 7,
  },
}));

export const ErrorMessage = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.error}>{children}</div>;
};

export const AttachTitle = ({ msg }) => {
  return (
    <Helmet>
      <title>{msg}</title>
    </Helmet>
  );
};
