import * as React from 'react';
import AppBar from './AppBar';

const appBarHeight = 48; // Hieght of dense AppBar (from MUI source)

export default function AppFrame({ children }) {
  return (
    <>
      <AppBar />
      <div style={{ marginTop: appBarHeight }}>{children}</div>
    </>
  );
}
