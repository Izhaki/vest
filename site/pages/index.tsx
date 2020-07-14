import * as React from 'react';
import Head from 'next/head';
import sayHello from '@vest/core';

export default function Home() {
  sayHello('Hello!');
  return (
    <div>
      <Head>
        <title>Vest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello</h1>
      </main>
    </div>
  );
}
