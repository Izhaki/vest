import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const colour = '#30d6d6';
const border = `1px solid ${colour}`;

const useStyles = makeStyles({
  trigger: {
    position: 'fixed',
    bottom: 20,
    left: 20,
    color: colour,
    fontWeight: 500,
    backgroundColor: 'rgba(36, 41, 46, 0.9)',
    border: 'none',
    minWidth: 24,
    minHeight: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow:
      '0 0px 10px 0 rgba(0, 0, 0, 0.6), 0 0px 0px 2px rgba(36, 41, 46, 0.9)',
    '&:before': {
      position: 'absolute',
      content: "''",
      top: 0,
      bottom: 0,
      left: 0,
      width: 4,
      borderBottom: border,
      borderTop: border,
      borderLeft: border,
    },
    '&:after': {
      position: 'absolute',
      content: "''",
      top: 0,
      bottom: 0,
      right: 0,
      width: 4,
      borderBottom: border,
      borderTop: border,
      borderRight: border,
    },
  },
});

export default function TriggerButton({ onClick }) {
  const classes = useStyles();

  return (
    <button
      type="button"
      aria-label="open tests"
      className={classes.trigger}
      onClick={onClick}>
      <span>V</span>
    </button>
  );
}
