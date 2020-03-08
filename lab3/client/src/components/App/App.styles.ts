import { createStyles, Theme } from '@material-ui/core';

export const appStyles = ({ zIndex }: Theme) =>
  createStyles({
    main: {
      margin: 0,
      width: '100%',
      height: 'calc(100vh - 70px)',
      boxShadow:
        '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    },
    backdrop: {
      zIndex: zIndex.drawer + 1,
      display: 'flex',
      flexDirection: 'column',
    },
    text: {
      color: 'white',
      fontWeight: 500,
    },
  });
