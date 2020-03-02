import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { typographyStyle } from './Typography.styles';

const useStyles = makeStyles(typographyStyle);

interface TypographyProps {
  children?: JSX.Element;
  type: 'danger' | 'info' | 'muted' | 'primary' | 'quote' | 'small' | 'success' | 'warning';
  text?: string;
  author?: string;
}

const Typography = (props: TypographyProps): JSX.Element => {
  const classes = useStyles();
  let typeStyle = '';

  switch (props.type) {
    case 'danger':
      typeStyle = classes.dangerText;
      break;
    case 'info':
      typeStyle = classes.infoText;
      break;
    case 'muted':
      typeStyle = classes.mutedText;
      break;
    case 'primary':
      typeStyle = classes.primaryText;
      break;
    case 'small':
      typeStyle = classes.smallText;
      break;
    case 'success':
      typeStyle = classes.successText;
      break;
    case 'warning':
      typeStyle = classes.warningText;
      break;
    case 'quote':
      typeStyle = classes.quote;
      break;
    default:
      typeStyle = '';
  }

  const style = classNames(classes.defaultFontStyle, typeStyle);

  if (props.type === 'quote') {
    return (
      <blockquote className={style}>
        <p className={classes.quoteText}>{props.text}</p>
        <small className={classes.quoteAuthor}>{props.author}</small>
      </blockquote>
    );
  }

  return <div className={style}>{props.children}</div>;
};

export default Typography;
