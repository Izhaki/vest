import * as React from 'react';
import { Suite, Expensioner, TestTree, Stats } from '@vest/ui';
import suite from '@vest/mocha/../tests';

export default function HomeTests() {
  const [open, setOpen] = React.useState(false);
  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Expensioner open={open}>
      <Suite suite={suite}>
        <Stats onToggle={handleToggleDrawer} />
        <TestTree />
      </Suite>
    </Expensioner>
  );
}
