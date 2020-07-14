import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-end',
      height: 16,
      marginRight: 4,
      position: 'relative',
    },
    text: {
      fontSize: 12,
      marginRight: 2,
      lineHeight: 0.8,
    },
    straight: {
      marginTop: 4,
      height: 13,
      width: 2,
      borderRight: '1px solid #2F96BA',

      '&:before': {
        content: '""',
        position: 'absolute',
        height: 5,
        borderRight: '1px solid #2F96BA',
        transform: 'rotate(-45deg)',
        transformOrigin: 'bottom right',
        right: 0,
        top: -2,
      },
    },
  })
);

export default function Bent({ children }) {
  const classes = useStyles();
  return (
    <span className={classes.root}>
      <span className={classes.text}>{children}</span>
      <span className={classes.straight} />
    </span>
  );
}
