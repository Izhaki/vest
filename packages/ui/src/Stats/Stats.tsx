import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useTimer from './useTimer';
import Duration from './Duration';
import Result from '../Result';
import Bent from './Bent';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    bar: {
      // backgroundColor: 'rgba(0, 102, 148, 0.4)',
      backgroundColor: '#24292E', // - Github black
      color: '#2F96BA',
      padding: '6px 1rem',
      display: 'flex',
      alignItems: 'center',
    },
    brand: {
      color: 'white',
      marginRight: 10,
      fontSize: 18,
      lineHeight: 0.8,
    },
    results: {
      display: 'flex',
      marginLeft: 20,
      '& > div': {
        margin: [[0, 2]],
      },
    },
  })
);

export default function Stats({ stats, onToggle = () => {} }) {
  const classes = useStyles();
  const { running, startTime, endTime, counters } = stats;
  const { modules, specs } = counters;

  const duration = useTimer(startTime, endTime);

  return (
    <div className={classes.root} onClick={onToggle}>
      <div className={classes.bar}>
        <span className={classes.brand}>VEST</span>
        <Duration ms={duration} showCentisecond={!running} />
        <div className={classes.results}>
          <Bent>M</Bent>
          <Result result="passed">{modules.passed}</Result>
          <Result result="failed" dim={modules.failed === 0}>
            {modules.failed}
          </Result>
          <Result result="skipped" dim={modules.skipped === 0}>
            {modules.skipped}
          </Result>
        </div>
        <div className={classes.results}>
          <Bent>S</Bent>
          <Result result="passed">{specs.passed}</Result>
          <Result result="failed" dim={specs.failed === 0}>
            {specs.failed}
          </Result>
          <Result result="skipped" dim={specs.skipped === 0}>
            {specs.skipped}
          </Result>
        </div>
      </div>
    </div>
  );
}
