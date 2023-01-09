import { DependencyList, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';

export function useDeepCompareMemo<T>(factory: () => T, dependencies: DependencyList): T {
  const [state, setState] = useState(factory);

  useDeepCompareEffect(() => {
    setState(factory());
  }, dependencies);

  return state;
}
