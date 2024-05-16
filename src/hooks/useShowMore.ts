import { useEffect, useRef, useState } from 'react';

export const useShowMore = (deps?: any) => {
  const contentWrapperRef = useRef<HTMLDivElement>();
  const [showMoreButtonVisible, setShowMoreButtonVisible] = useState(false);

  useEffect(() => {
    if (!contentWrapperRef.current) {
      return;
    }

    // Wait for setShowFullDescription
    const timeoutId = setTimeout(() => {
      if (contentWrapperRef.current.scrollHeight > contentWrapperRef.current.clientHeight + 1) {
        setShowMoreButtonVisible(true);
      } else {
        setShowMoreButtonVisible(false);
      }
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [contentWrapperRef, deps]);

  return {
    showMoreButtonVisible,
    contentWrapperRef,
  };
};
