import * as React from 'react';
import TriggerButton from './TriggerButton';

export default function Trigger({ children }) {
  const [loaded, setLoaded] = React.useState(false);

  return loaded ? children : <TriggerButton onClick={() => setLoaded(true)} />;
}
