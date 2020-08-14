import * as React from 'react';
import TriggerButton from './TriggerButton';

export default function Trigger({ children, onClick = undefined }) {
  const [loaded, setLoaded] = React.useState(false);

  const handleClick = React.useCallback((event) => {
    setLoaded(true);
    if (onClick) {
      onClick(event);
    }
  }, []);

  return loaded ? children : <TriggerButton onClick={handleClick} />;
}
