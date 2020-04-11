import React from 'react';
import { AttachTitle } from './utils';
import { Container, Typography } from '@material-ui/core';

const Main = () => {
  return (
    <div>
      <AttachTitle msg="Newsfeed!" />
      <Container maxWidth="md"> </Container>
    </div>
  );
};

export default Main;
