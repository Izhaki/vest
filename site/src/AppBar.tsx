import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GithubIcon from './GithubIcon';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'white',
    color: '#333',
  },
  title: {
    flexGrow: 1,
    fontWeight: 400,
  },
});

export default function AppBar() {
  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title} noWrap>
          VEST
        </Typography>
        <IconButton
          edge="end"
          component="a"
          color="inherit"
          target="_blank"
          href="https://github.com/Izhaki/vest"
          aria-label="github">
          <GithubIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
