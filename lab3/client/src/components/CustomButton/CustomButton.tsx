import React from 'react';
import classNames from 'classnames';
import { makeStyles, Button } from '@material-ui/core';
import { customButtonStyle } from './CustomButton.style';

const useStyles = makeStyles(customButtonStyle);

interface CustomButtonProps {
  color:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'facebook'
    | 'twitter'
    | 'google'
    | 'github'
    | 'transparent';
  size: 'sm' | 'lg';
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  children?: JSX.Element;
  onClick?: () => any;
  className?: string;
}

export const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const classes = useStyles();

  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  const btnClasses = classNames(
    {
      [classes.button]: true,
      [classes[size]]: size,
      [classes[color]]: color,
      [classes.round]: round,
      [classes.fullWidth]: fullWidth,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
    },
    className ? className : '',
  );

  return (
    <Button {...rest} className={btnClasses}>
      {children}
    </Button>
  );
};

CustomButton.defaultProps = {
  size: 'sm',
};
