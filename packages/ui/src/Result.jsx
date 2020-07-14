import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const colors = {
  passed: {
    text: '#30D6D6',
    bg: 'rgba(0, 102, 148, 0.4)',
    highlight: '#2F96BA',
  },
  skipped: {
    text: '#d1ca29',
    bg: 'rgba(178, 151, 29, 0.4)',
    highlight: '#c2b41f',
  },
  failed: {
    text: '#ff4d39',
    bg: 'rgba(147, 3, 0, 0.4)',
    highlight: '#D33C31',
  },
  dimmed: {
    text: '#888888',
    bg: 'rgba(136, 136, 136, 0.4)',
    highlight: '#888888',
  },
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      opacity: 1,
      transition: 'opacity 1s ease',
    },
    dim: {
      opacity: 0.4,
    },
    resultIcon: {
      height: 16,
      backgroundColor: ({ bg }) => bg,
      display: 'flex',
      position: 'relative',
      color: '#2F96BA',

      '&:before': {
        content: '""',
        position: 'absolute',
        height: '100%',
        left: 0,
        top: 0,
        width: 4,
        borderBottom: ({ highlight }) => `1px solid ${highlight}`,
        borderTop: ({ highlight }) => `1px solid ${highlight}`,
        borderLeft: ({ highlight }) => `1px solid ${highlight}`,
      },

      '&:after': {
        content: '""',
        position: 'absolute',
        height: '100%',
        top: 0,
        right: 0,
        width: 4,
        borderBottom: ({ highlight }) => `1px solid ${highlight}`,
        borderTop: ({ highlight }) => `1px solid ${highlight}`,
        borderRight: ({ highlight }) => `1px solid ${highlight}`,
      },
    },

    inner: {
      position: 'relative',
      margin: 2,
      flex: 1,
    },

    '@keyframes scan': {
      '0%': {
        boxShadow: '0px 0px 2px 3px rgba(48, 214, 214, 0.2)',
        top: '50%',
      },
      '25%': {
        boxShadow: '0px 3px 2px 3px rgba(48, 214, 214, 0.2)',
        top: 0,
      },
      '75%': {
        boxShadow: `0px -3px 2px 3px rgba(48, 214, 214, 0.2)`,
        top: '100%',
      },
    },

    scanner: {
      width: '100%',
      height: '1px',
      backgroundColor: '#30D6D6',
      opacity: '0.7',
      position: 'absolute',
      boxShadow: '0px 0px 2px 3px rgba(48, 214, 214, 0.2)',
      top: '50%',
      animationName: '$scan',
      animationDuration: '2s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationPlayState: 'running',
    },

    result: {
      paddingLeft: 4,
      paddingRight: 4,
      // color: '#2F96BA',
      color: ({ text }) => text,
      fontFamily: `"Fira Code", monospace`,
      fontSize: 12,
      position: 'relative',
      left: '50%',
      transform: `translate(-50%)`,
      textShadow: ({ text }) => `${text}80 0 0 6px`,
      lineHeight: 1.2,
    },
  })
);

export default function Result({ result = 'dirty', status, dim, children }) {
  // const classes = useStyles(colors[result] || colors.passed);
  const classes = useStyles(
    dim ? colors.dimmed : colors[result] || colors.passed
  );
  const running = status === 'running';

  return (
    <div className={clsx(classes.root, dim && classes.dim)}>
      <div className={classes.resultIcon}>
        <div className={classes.inner}>
          {running && <div className={classes.scanner} />}
          <div className={classes.result}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/*
    resultIcon: {
      backgroundColor: 'rgba(0, 102, 148, 0.4)',
      display: 'flex',
      color: '#2F96BA',
      position: 'relative',
      overflow: 'hidden',

      '&:before': {
        content: '""',
        position: 'absolute',
        width: 10,
        height: 10,
        // top: -10,
        // left: -10,
        background: `linear-gradient(
          45deg,
          rgba(0, 0, 0, 0) 50%,
          #30D6D6 100%
          )`,
        borderRadius: `100% 0 0 0`,
        animation: `$scaning 2s linear infinite`,
        transformOrigin: `100% 100%`,
      },


*/
