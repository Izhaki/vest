import * as React from 'react';
import clsx from 'clsx';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const drawerHeight = {
  open: '100%',
  closed: 32,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      height: drawerHeight.open,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      height: drawerHeight.open,
      transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowY: 'hidden',
      height: drawerHeight.closed,
    },
    drawerPaper: {
      display: 'flex',
      zIndex: 1400,
      backgroundColor: 'transparent',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function Expensioner({ open = true, children }) {
  const classes = useStyles();

  return (
    <ScopedCssBaseline>
      <Drawer
        variant="permanent"
        anchor="bottom"
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.main}>{children}</div>
      </Drawer>
    </ScopedCssBaseline>
  );
}
