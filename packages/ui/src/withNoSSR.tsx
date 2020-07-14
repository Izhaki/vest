import * as React from 'react';

export default (WrappedComponent) => {
  const withNoSSR = (props) => {
    const [shouldRender, setShouldRender] = React.useState(false);

    React.useEffect(() => {
      setShouldRender(true);
    }, []);

    if (!shouldRender) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return withNoSSR;
};
