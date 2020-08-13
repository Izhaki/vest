import * as React from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default (WrappedComponent) => {
  const withNoSSR = (props) => {
    const [shouldRender, setShouldRender] = React.useState(false);

    useEnhancedEffect(() => {
      setShouldRender(true);
    }, []);

    return shouldRender ? <WrappedComponent {...props} /> : null;
  };

  return withNoSSR;
};
