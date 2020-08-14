import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 18,
    left: 60,
    background: '#30d6d6',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#24292E',
    fontWeight: 500,
    borderRadius: 6,
    padding: '0 10px',
    '&:after': {
      right: '100%',
      top: '50%',
      border: 'solid transparent',
      content: "''",
      height: '0',
      width: '0',
      position: 'absolute',
      pointerEvents: 'none',
      borderRightColor: '#30d6d6',
      borderWidth: '8px',
      marginTop: '-8px',
    },
  },
});

export default function InAction() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>See it in action</span>
    </div>
  );
}
