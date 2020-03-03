import { createStyles, Theme } from '@material-ui/core';
import { UserCompType } from 'redux/Models';

export const membersStyles = () =>
  createStyles({
    friends: {
      position: 'relative',
      height: 'calc(100vh - 70px)',
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
      paddingTop: '0',
      paddingBottom: '5px',
    },
    itemText: {
      margin: 0,
    },
  });

export const memberStyles = ({ palette }: Theme) =>
  createStyles({
    listItem: {
      paddingTop: '0',
      paddingBottom: '5px',
    },
    itemText: {
      margin: 0,
    },
    avatar: {
      fontWeight: 500,

      color: (props: UserCompType) => palette.getContrastText(props.colour),
      backgroundColor: (props: UserCompType) => props.colour,
    },
  });
