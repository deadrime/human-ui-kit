import { useMediaQuery } from 'react-responsive';

const MOBILE_BREAKPOINT = 1200;

export const useIsMobile = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_BREAKPOINT}px)` });

  return isMobile;
};
