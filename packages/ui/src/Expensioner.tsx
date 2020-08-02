import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerHeight = {
  open: '100%',
  closed: 32,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
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
    header: {
      backgroundColor: 'black',
      height: drawerHeight.closed,
      color: 'white',
      padding: 4,
      display: 'flex',
      justifyContent: 'space-between',
    },
    info: {
      display: 'flex',
      alignItems: 'center',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    testcount: {
      marginRight: theme.spacing(1),
    },
  })
);

export default function Expensioner({ open = true, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MuiDrawer
        variant="permanent"
        anchor="bottom"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.main}>{children}</div>
      </MuiDrawer>
    </div>
  );
}
