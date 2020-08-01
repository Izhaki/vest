/*
Heavily inspired by:
https://github.com/mui-org/material-ui/blob/9e2cbae16f08b166d5f97fb625348f4ac131b50d/docs/src/modules/components/GoogleAnalytics.js
https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
*/

import * as React from 'react';
import Router from 'next/router';

function gaPageView(url: string) {
  window.ga('send', {
    hitType: 'pageview',
    page: url,
  });
}

function loadScript(src, position) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  position.appendChild(script);

  return script;
}

export default function GoogleAnalytics() {
  // Load GA
  React.useEffect(() => {
    loadScript(
      'https://www.google-analytics.com/analytics.js',
      document.querySelector('head')
    );

    gaPageView(window.location.pathname);
  }, []);

  // Hook on page changes
  React.useEffect(() => {
    const handleRouteChange = (pathname) => {
      gaPageView(pathname);
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return null;
}
