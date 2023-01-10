import React, { useState, useEffect } from 'react';

export interface ClientOnlyProps {
  children: React.ReactElement
}

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR ? null : children;
};

export const withClientOnly = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => (props) => (
  <ClientOnly>
    <Component {...props as P} />
  </ClientOnly>
);
