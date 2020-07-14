import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Block from './Block';
import Step from './Step';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: 'black',
      // fontFamily:
      //   '-apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;',
      fontSize: 12,
      // color: '#2F96BA',
      color: '#30D6D6',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

// If a module has only one child (as cucumber scenarios will), show that child instead of module
const getStepToDisplay = (step) => {
  const singleChild =
    step.children && step.children.length === 1 && step.children[0];
  const singleChildHasChildren = singleChild && singleChild.children;
  return singleChildHasChildren ? singleChild : step;
};

export default function TestTree({ steps, runStep }) {
  const classes = useStyles();

  return (
    <List component="nav" dense className={classes.root}>
      {steps.map((step) => {
        const key = step.breadcrumb.join();
        if (step.children) {
          return (
            <Block key={key} step={getStepToDisplay(step)} onRun={runStep} />
          );
        }
        return <Step key={key} step={step} onRun={runStep} />;
      })}
    </List>
  );
}
