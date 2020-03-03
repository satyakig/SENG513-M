import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  List,
  IconButton,
  Hidden,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  Slide,
  DialogActions,
  Button,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import PaletteIcon from '@material-ui/icons/Palette';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';
import { headerStyle } from './Header.styles';
import Members from '../Members/Members';

const useStyles = makeStyles(headerStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => {
    return state.currentUser;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);

  function handleMembersClose() {
    setMembersOpen(false);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function nameClick() {}

  function colourClick() {}

  function membersClick() {
    setMobileOpen(false);
    setMembersOpen(true);
  }

  const { color } = props;

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: false,
    [classes.fixed]: false,
  });

  const title = user.name ? (
    <span className={classes.title}>
      513 Chat <span className={classes.name}>{user.name}</span>
    </span>
  ) : (
    <span className={classes.title}>513 Chat</span>
  );

  return (
    <AppBar className={appBarClasses} style={{ borderRadius: 0 }}>
      <Dialog
        open={membersOpen}
        TransitionComponent={Transition}
        keepMounted={true}
        onClose={handleMembersClose}
        fullWidth={true}
      >
        <DialogContent>
          <Members />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMembersClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar className={classes.container}>
        {title}
        <Hidden smDown={true} implementation="css">
          <IconButton className={classes.barButton} onClick={nameClick}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton className={classes.barButton} onClick={colourClick}>
            <PaletteIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp={true}>
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp={true} implementation="js">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            <List>
              <ListItem button={true} className={classes.itemButton} onClick={membersClick}>
                <ListItemIcon className={classes.itemButton}>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
              </ListItem>
              <ListItem button={true} className={classes.itemButton} onClick={nameClick}>
                <ListItemIcon className={classes.itemButton}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Update Name" />
              </ListItem>
              <ListItem button={true} className={classes.itemButton} onClick={colourClick}>
                <ListItemIcon className={classes.itemButton}>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Update Colour" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

Header.defaultProp = {
  color: 'white',
};

Header.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'transparent',
    'white',
    'rose',
    'dark',
  ]),
};

export default Header;
