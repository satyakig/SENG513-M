import { createStyles, Theme } from '@material-ui/core/styles';
import { StyleProp } from 'redux/Models';

export const messageStyles = ({ palette }: Theme) =>
  createStyles({
    card: {
      paddingTop: '10px',
      paddingBottom: '10px',
      display: 'flex',
      flexShrink: 0,
      flexDirection: (props: StyleProp) => (props.isThisUser ? 'row-reverse' : 'row'),
      margin: (props: StyleProp) => (props.isThisUser ? '0 0 0 auto' : '0 auto 0 0'),
      width: 'fit-content',
      maxWidth: '80%',
      borderRadius: 0,
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    icon: {
      fontWeight: (props: StyleProp) => (props.isThisUser ? 500 : 'normal'),
      textTransform: 'uppercase',
      margin: (props: StyleProp) => (props.isThisUser ? '0 0 0 5px' : '0 5px 0 0'),
      color: (props: StyleProp) => palette.getContrastText(props.colour),
      backgroundColor: (props: StyleProp) => props.colour,
    },
    details: {
      flexBasis: '75%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    content: {
      width: 'auto',
      padding: '10px 10px 10px 15px !important',
      margin: (props: StyleProp) => (props.isThisUser ? '0 0 0 auto' : '0 auto 0 0'),
    },
    cover: {
      flexBasis: '25%',
    },
    date: {
      textTransform: 'uppercase',
      marginBottom: '5px',
      fontWeight: 600,
      whiteSpace: 'nowrap',
    },
  });
