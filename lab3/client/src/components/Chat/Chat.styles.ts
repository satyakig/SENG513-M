import { createStyles } from '@material-ui/core';

const rowHeight = '97px';

export const chatStyles = () =>
  createStyles({
    chat: {
      position: 'relative',
      height: 'calc(100vh - 71px)',
      marginBottom: '1px',
      overflowY: 'hidden',
      overflowX: 'hidden',
      boxShadow:
        '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
    },
    messages: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column-reverse',
      overflowY: 'auto',
      height: '100%',
      maxHeight: '100%',
      padding: '15px',
    },
    textRow: {
      minHeight: `${rowHeight}`,
      flexBasis: `${rowHeight}`,
      maxHeight: `${rowHeight}`,
      display: 'flex',
      flexDirection: 'row',
    },

    textCell: {
      flexGrow: 1,
    },
    textBox: {
      margin: 0,
    },
    buttonCell: {
      flexBasis: '80px',
    },
    buttonIcon: {
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0,
      '& svg': {
        width: '75%',
        height: '75%',
      },
    },
  });
