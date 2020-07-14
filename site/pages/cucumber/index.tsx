import * as React from 'react';
import { Suite, TestTree, Stats } from '@vest/ui';
import suite from '@vest/cucumber/../tests';

export default function Page() {
  return (
    <Suite suite={suite}>
      <Stats />
      <TestTree />
    </Suite>
  );
}
