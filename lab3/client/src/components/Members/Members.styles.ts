import { createStyles, Theme } from '@material-ui/core';
import { StyleProp } from 'redux/Models';
import { MembersProp } from './Members';

export const membersStyles = () =>
  createStyles({
    friends: {
      position: 'relative',
      height: (prop: MembersProp) => (prop.mobile ? 'auto' : 'calc(100vh - 70px)'),
      maxHeight: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingTop: '16px !important',
      paddingBottom: '16px !important',
    },
    title: {
      fontWeight: 800,
      textTransform: 'uppercase',
      fontSize: '1.5em',
      textAlign: 'center',
    },
    userStatus: {
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    listItem: {
      paddingTop: '5px',
      paddingBottom: '5px',
    },
    itemText: {
      margin: 0,
    },
  });

export const memberStyles = ({ palette }: Theme) =>
  createStyles({
    listItem: {
      paddingTop: '5px',
      paddingBottom: '5px',
    },
    itemText: {
      wordBreak: 'break-all',
      margin: 0,
      '& span': {
        fontWeight: (props: StyleProp) => (props.isThisUser ? 500 : 'normal'),
      },
    },
    avatar: {
      fontWeight: (props: StyleProp) => (props.isThisUser ? 500 : 'normal'),
      color: (props: StyleProp) => palette.getContrastText(props.colour),
      backgroundColor: (props: StyleProp) => props.colour,
    },
  });
