import { createStyles, Theme } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

export const friendsStyles = ({ palette }: Theme) =>
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
    orange: {
      color: palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  });
