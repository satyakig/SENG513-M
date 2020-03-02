import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import { headerStyle } from './Header.styles';

const useStyles = makeStyles(headerStyle);

const Header = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { color, rightLinks, brand, fixed, absolute } = props;

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  return (
    <AppBar className={appBarClasses} style={{ borderRadius: 0 }}>
      <Toolbar className={classes.container}>
        <span className={classes.title}>{brand}</span>
        <Hidden smDown={true} implementation="css">
          <span className={classes.title}>{brand}</span>
          <span className={classes.title}>{brand}</span>
          <span className={classes.title}>{brand}</span>
          <span className={classes.title}>{brand}</span>
        </Hidden>
        <Hidden mdUp={true}>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
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
            <span className={classes.title}>{brand}</span>
            <span className={classes.title}>{brand}</span>
            <span className={classes.title}>{brand}</span>
            <span className={classes.title}>{brand}</span>
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
  rightLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
};

export default Header;
