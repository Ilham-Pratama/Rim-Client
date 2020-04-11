import React from 'react';
import { Menu, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { index } from '../urls';
import { useHistory } from 'react-router-dom';
import { getImageLink, usePerson } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    minWidth: 200,
    padding: theme.spacing(2),
    [theme.breakpoints[600]]: {
      padding: theme.spacing(1),
    },
  },
  userImg: {
    width: 100,
    textAlign: 'center',
    boxShadow: theme.shadows[1],
    borderRadius: '50%',
  },
  username: {
    fontSize: '1.5em',
    marginTop: theme.spacing(1),
    fontWeight: 'lighter',
    display: 'block',
    cursor: 'pointer',
    [theme.breakpoints[600]]: {
      fontSize: '1.3em',
    },
    '&:hover': {
      color: grey[600],
    },
  },
  email: {
    fontSize: '1.1em',
    fontWeight: 'lighter',
    display: 'block',
    cursor: 'pointer',
    [theme.breakpoints[600]]: {
      fontSize: '.9em',
    },
    '&:hover': {
      color: grey[600],
    },
  },
  btn: {
    marginTop: theme.spacing(2),
  },
}));

const ProfilePaper = ({ anchorEl, handleClose, ...props }) => {
  let data = usePerson();
  const history = useHistory();
  const classes = useStyles();
  const onLogoutClick = () => history.push(index);
  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      {...props}
    >
      <div className={classes.root}>
        {data && data.id ? (
          <>
            <img
              src={getImageLink({ url: data.imgurl })}
              className={classes.userImg}
            />
            <span className={classes.username}>{data.username}</span>
            <span className={classes.email}>{data.email}</span>
          </>
        ) : (
          <h4>Data not found!</h4>
        )}
        <Button
          onClick={onLogoutClick}
          color="secondary"
          variant="contained"
          className={classes.btn}
        >
          Logout
        </Button>
      </div>
    </Menu>
  );
};

export default ProfilePaper;
