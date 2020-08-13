import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  loader: {
    height: 32,
    backgroundColor: 'transparent',
    zIndex: 1400,
  },
  bar: {
    height: 32,
    display: 'flex',
    backgroundColor: '#24292E',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#30D6D6',
  },
});

export default function LoadingIndicator() {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="bottom"
      classes={{
        paper: classes.loader,
      }}>
      <div className={classes.bar}>Loading...</div>
    </Drawer>
  );
}
