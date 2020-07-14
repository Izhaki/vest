import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Result from '../Result';

const useStyles = makeStyles((theme) =>
  createStyles({
    stepResult: {
      position: 'relative',
      minWidth: theme.typography.pxToRem(28),
    },
  })
);

const resultText = {
  dirty: <>&nbsp;</>,
  skipped: 'S',
  passed: 'V',
  failed: 'X',
};

export default function StepIcon({ result = 'dirty', status }) {
  const classes = useStyles();

  return (
    <ListItemIcon className={classes.stepResult}>
      <Result result={result} status={status}>
        {resultText[result]}
      </Result>
    </ListItemIcon>
  );
}
