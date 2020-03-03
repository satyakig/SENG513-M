import React, { useState } from 'react';
import classNames from 'classnames';
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
  DialogTitle,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import PaletteIcon from '@material-ui/icons/Palette';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { TransitionProps } from '@material-ui/core/transitions';
import Members from '../Members/Members';
import { headerStyle } from './Header.styles';
import { Socket } from '../../Socket';

const useStyles = makeStyles(headerStyle);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface HeaderProps {
  color:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'transparent'
    | 'white'
    | 'rose'
    | 'dark';
}

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const user = useSelector((state: ReduxState) => {
    return state.currentUser;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);

  const [nameOpen, setNameOpen] = useState(false);
  const [name, setName] = useState('');

  const [colourOpen, setColourOpen] = useState(false);
  const [colour, setColour] = useState('');

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function membersClick() {
    setMobileOpen(false);
    setMembersOpen(true);
  }

  function handleMembersClose() {
    setMembersOpen(false);
  }

  function nameClick() {
    setMobileOpen(false);
    setNameOpen(true);
  }

  function handleNameClose() {
    setNameOpen(false);
    setName('');
  }

  function nameSubmit() {
    if (name.length > 0) {
      Socket.getInstance().nameChange(name);
    }

    handleNameClose();
  }

  function colourClick() {
    setMobileOpen(false);
    setColourOpen(true);
  }

  function handleColourClose() {
    setColourOpen(false);
    setColour('');
  }

  function colourSubmit() {
    if (colour.length > 0) {
      Socket.getInstance().colourChange(colour);
    }

    handleColourClose();
  }

  function updateName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function updateColour(event: React.ChangeEvent<HTMLInputElement>) {
    setColour(event.target.value);
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
      chat <span className={classes.name}>{user.name}</span>
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

      <Dialog open={nameOpen} onClose={handleNameClose}>
        <DialogTitle>Update Name</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your new name.</DialogContentText>
          <TextField
            autoFocus={true}
            margin="dense"
            label="Name"
            type="text"
            fullWidth={true}
            color="secondary"
            value={name}
            onChange={updateName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNameClose}>Cancel</Button>
          <Button onClick={nameSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={colourOpen} onClose={handleColourClose}>
        <DialogTitle>Update Colour</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your new background colour.</DialogContentText>
          <TextField
            autoFocus={true}
            margin="dense"
            label="Colour"
            type="text"
            fullWidth={true}
            color="secondary"
            value={colour}
            onChange={updateColour}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColourClose}>Cancel</Button>
          <Button onClick={colourSubmit} variant="contained" color="secondary">
            Submit
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
          <IconButton className={classes.barButton} onClick={handleDrawerToggle}>
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

export default Header;
