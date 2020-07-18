import * as React from 'react';
import { Suite, TestTree, Stats } from '@vest/ui';
import suite from '@vest/mocha/../tests';

export default function Page() {
  return (
    <Suite suite={suite}>
      <Stats />
      <TestTree />
    </Suite>
  );
}
