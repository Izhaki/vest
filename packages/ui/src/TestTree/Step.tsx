import * as React from 'react';
import * as asTable from 'as-table';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StepIcon from './StepIcon';
import Error from './Error';

const trim = (str) => str.trim();

const useStyles = makeStyles((theme) =>
  createStyles({
    step: {
      '&:hover $runAction': {
        visibility: 'visible',
      },
      margin: 0,
      paddingTop: 2,
      paddingBottom: 2,
    },
    stepText: {
      margin: 0,
    },
    runAction: {
      visibility: 'hidden',
    },
    stepPrimary: {
      display: 'flex',
      alignItems: 'center',
    },
    stepSecondary: {
      marginLeft: theme.typography.pxToRem(28),
    },
    stepName: {
      flex: 1,
    },
    prefix: {
      // fontWeight: 500,
      color: '#2F96BA',
    },
    description: {
      fontSize: '0.7rem',
      color: 'rgba(47, 150, 186, 0.6)',
    },
    pre: {
      fontFamily: '"Fira Code", monospace',
      fontSize: 11,
      backgroundColor: 'rgba(0, 102, 148, 0.4)',
      padding: theme.spacing(1),
      marginTop: 8, // ListItem dense is 4
      marginBottom: 0,
      color: '#2F96BA',
    },
    error: {
      backgroundColor: 'rgba(147, 3, 0, 0.4)',
      color: '#ff4d39',
    },
  })
);

const getLeftPadding = (theme, depth) =>
  theme.typography.pxToRem(theme.spacing(2) + 28 * depth);

export default function Step({
  step,
  depth = 0,
  onRun,
  onToggle,
  CollapseTigger = null,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const {
    name,
    description,
    result,
    status,
    prefix,
    showPrefixOnly,
    docString,
    dataTable,
    runnable,
    error,
  } = step;

  const rows =
    dataTable &&
    dataTable.rows.map((row) => row.cells.map((cell) => cell.value));

  const descriptionLines = description && description.split(/\r?\n/).map(trim);

  const handleRun = (event) => {
    event.stopPropagation();
    onRun(step);
  };

  return (
    <ListItem
      button
      onClick={onToggle}
      className={classes.step}
      style={{ paddingLeft: getLeftPadding(theme, depth) }}>
      <ListItemText
        className={classes.stepText}
        disableTypography
        primary={
          <div className={classes.stepPrimary}>
            <StepIcon result={result} status={status} />
            <span className={classes.stepName}>
              {prefix && <span className={classes.prefix}>{prefix}</span>}
              {!showPrefixOnly && <span>{name}</span>}
            </span>
            {runnable && (
              <span className={classes.runAction}>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="run"
                  onClick={handleRun}>
                  <PlayArrowIcon
                    style={{ color: '#30D6D6', fontSize: '0.9rem' }}
                  />
                </IconButton>
              </span>
            )}
            <IconButton size="small" edge="end" aria-label="collapse">
              {CollapseTigger}
            </IconButton>
          </div>
        }
        secondary={
          <div className={classes.stepSecondary}>
            {descriptionLines && (
              <div className={classes.description}>
                {descriptionLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            )}
            {error && <Error error={error} classes={classes} />}
            {docString && (
              <pre className={classes.pre}>{docString.content}</pre>
            )}
            {rows && (
              <pre className={classes.pre}>
                {asTable.configure({ delimiter: ' | ' })(rows)}
              </pre>
            )}
          </div>
        }
      />
    </ListItem>
  );
}
