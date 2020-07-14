import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const { floor, round } = Math;

const useStyles = makeStyles((theme) =>
  createStyles({
    duration: {
      display: 'inline-block',
      minWidth: '4em',
      fontSize: 18,
      lineHeight: 0.8,
    },
    // duration: {
    //   display: 'inline-block',
    //   backgroundColor: 'black',
    //   backgroundImage: `radial-gradient(rgba(48, 214, 214, 0.3) 50%, transparent 0)`,
    //   backgroundSize: `2px 2px`,
    //   minWidth: '4em',
    //   textAlign: 'center',
    // },
    secs: {
      color: '#30D6D6',
    },
    mils: {
      fontSize: `0.7em`,
    },
  })
);

// const getRandomDigit = () => floor(random() * 10);

export default function Stats({ ms = 0, showCentisecond = false }) {
  const classes = useStyles();
  let total = round(ms);
  const minutes = floor(total / 1000 / 60);
  total -= minutes * 1000 * 60;
  const seconds = floor(total / 1000);
  const secondsStr = seconds > 9 ? seconds : `0${seconds}`;
  total -= seconds * 1000;
  const deciseconds = floor(total / 100);
  total -= deciseconds * 100;
  const centiseconds = showCentisecond ? total.toString().padEnd(2, '0') : '';

  const secs = `${minutes}:${secondsStr}`;
  const mils = `.${deciseconds}${centiseconds}`;
  return (
    <span className={classes.duration}>
      <span className={classes.secs}>{secs}</span>
      <span className={classes.mils}>{mils}</span>
    </span>
  );
}
