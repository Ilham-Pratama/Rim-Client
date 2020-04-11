import React, { Fragment } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { getImageLink, usePerson } from './utils';
import ProfilePaper from './ProfileMenu';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.dark,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const AvatarBtn = withStyles(() => ({
  root: {
    cursor: 'pointer',
  },
}))(Avatar);

const StyledAppbar = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
}))(AppBar);

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '4.2em',
    [theme.breakpoints.down(600)]: {
      marginBottom: '3.7em',
    },
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height: 40,
    background: '#fff',
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
    borderRadius: 5,
    [theme.breakpoints.up(600)]: {
      width: 300,
      height: 45,
    },
    [theme.breakpoints.down(350)]: {
      width: '100%',
    },
  },
  searchIcon: {
    margin: theme.spacing(1),
    marginBottom: 0,
    color: theme.palette.primary.main,
  },
  searchForm: {
    display: 'block',
    height: '20%',
    background: 'inherit',
    border: 0,
    fontSize: '.9em',
    borderLeft: '2px solid ' + theme.palette.secondary.light,
    color: '#000',
    width: '70%',
    padding: 8,
    '&:focus': {
      borderColor: theme.palette.secondary.light,
    },
    '&::placeholder': {
      color: '#000',
    },
  },
  userBadge: {
    margin: 9,
    marginRight: -10,
  },
}));

const Appbar = () => {
  const data = usePerson();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <StyledAppbar position="fixed" color="secondary">
        <Toolbar>
          <div style={{ flexGrow: 1 }}></div>
          <div className={classes.searchBox}>
            <label htmlFor="search">
              <SearchRoundedIcon className={classes.searchIcon} />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here!"
              className={classes.searchForm}
            />
          </div>
          <Fragment>
            <StyledBadge
              onClick={handleClick}
              aria-controls="simple-menu"
              aria-haspopup="true"
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
              className={classes.userBadge}
            >
              <AvatarBtn
                alt="User"
                src={getImageLink({ url: data && data.imgurl })}
              />
            </StyledBadge>
            <ProfilePaper anchorEl={anchorEl} handleClose={handleClose} />
          </Fragment>
        </Toolbar>
      </StyledAppbar>
    </div>
  );
};

export default Appbar;
