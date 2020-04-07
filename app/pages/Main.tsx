import React from 'react';
import { useStyles } from '../styles';
import { AttachTitle } from './utils';

const Main = () => {
  const classes = useStyles();
  return (
    <div>
      <AttachTitle msg="Newsfeed!" />
      <h2 className={classes.header1}>You're now in the Main page!</h2>
    </div>
  );
};

export default Main;
