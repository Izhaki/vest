import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Step from './Step';

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
    },
    collapseIcon: {
      color: '#30D6D6',
      minWidth: theme.typography.pxToRem(24), // Same as standard icon width
      fontSize: '0.9rem',
    },
  })
);

export default function Block({ step, depth = 0, onRun }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Step
        step={step}
        depth={depth}
        onRun={onRun}
        onToggle={handleToggle}
        CollapseTigger={
          open ? (
            <ExpandLess className={classes.collapseIcon} />
          ) : (
            <ExpandMore className={classes.collapseIcon} />
          )
        }
      />

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense className={classes.listItem}>
          {step.children.map((child) => {
            const key = child.breadcrumb.join();
            const hasChildren = child.children && child.children.length;
            if (hasChildren && child.type !== 'test') {
              return (
                <Block key={key} step={child} depth={depth + 1} onRun={onRun} />
              );
            }
            return (
              <Step key={key} step={child} onRun={onRun} depth={depth + 1} />
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
