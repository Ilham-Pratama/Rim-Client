import React from 'react';
import { AttachTitle } from './utils';
import { Typography } from '@material-ui/core';

const Notfound = () => {
  return (
    <div>
      <AttachTitle msg="Page not found!" />
      <Typography component="h2">Oops, Page not found!</Typography>
    </div>
  );
};

export default Notfound;
