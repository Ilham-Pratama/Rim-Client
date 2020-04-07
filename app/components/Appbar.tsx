import React, { Fragment } from 'react';
import {
  ThemeProvider,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { theme } from '../styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../queries';
import { getImageLink } from './utils';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.dark,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const AvatarBtn = withStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}))(Avatar);

const StyledAppbar = withStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
}))(AppBar);

const Appbar = () => {
  const { data, loading, error } = useQuery(GET_USER);
  return (
    <StyledAppbar position="static" color="secondary">
      <Toolbar>
        <span style={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            style={{ display: 'inline-block', margin: 10 }}
          >
            Home
          </Typography>
        </span>
        {data && (
          <Fragment>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <AvatarBtn
                alt="User"
                src={getImageLink({ url: data && data.me && data.imgurl })}
              />
            </StyledBadge>
          </Fragment>
        )}
      </Toolbar>
    </StyledAppbar>
  );
};

export default Appbar;
