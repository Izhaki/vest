import * as React from 'react';
import clsx from 'clsx';

export default function Error({ error, classes }) {
  const handleThrow = () => {
    throw error;
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <pre className={clsx(classes.pre, classes.error)} onClick={handleThrow}>
      {error.toString()}
    </pre>
  );
}
