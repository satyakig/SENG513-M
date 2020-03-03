import { createStyles, Theme } from '@material-ui/core/styles';

export interface MessageStyleProp {
  isThisUser: boolean;
  colour: string;
}

export const messageStyles = ({ palette }: Theme) =>
  createStyles({
    card: {
      paddingBottom: '20px',
      display: 'flex',
      flexDirection: (props: MessageStyleProp) => (props.isThisUser ? 'row-reverse' : 'row'),
      margin: (props: MessageStyleProp) => (props.isThisUser ? '0 0 0 auto' : '0 auto 0 0'),
      width: 'fit-content',
      maxWidth: '80%',
      borderRadius: 0,
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    icon: {
      textTransform: 'uppercase',
      margin: (props: MessageStyleProp) => (props.isThisUser ? '0 0 0 5px' : '0 5px 0 0'),
      color: (props: MessageStyleProp) => palette.getContrastText(props.colour),
      backgroundColor: (props: MessageStyleProp) => props.colour,
    },
    details: {
      flexBasis: '75%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'justify',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    content: {
      width: 'auto',
      padding: '10px 10px 10px 15px !important',
      margin: (props: MessageStyleProp) => (props.isThisUser ? '0 0 0 auto' : '0 auto 0 0'),
    },
    cover: {
      flexBasis: '25%',
    },
  });
