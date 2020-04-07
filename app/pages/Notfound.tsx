import React from 'react';
import { useStyles } from '../styles';
import { AttachTitle } from './utils';

const Notfound = () => {
  const classes = useStyles();
  return (
    <div>
      <AttachTitle msg="Page not found!" />
      <h2 className={classes.header1}>Oops, Page not found!</h2>
    </div>
  );
};

export default Notfound;
