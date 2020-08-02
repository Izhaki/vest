import * as React from 'react';
import { Suite, Expensioner, TestTree, Stats } from '@vest/ui';
import suite from '@vest/mocha/../tests';

export default function HomeTests() {
  const [open, setOpen] = React.useState(false);
  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Suite suite={suite}>
      <Expensioner open={open}>
        <Stats onToggle={handleToggleDrawer} />
        <TestTree />
      </Expensioner>
    </Suite>
  );
}
