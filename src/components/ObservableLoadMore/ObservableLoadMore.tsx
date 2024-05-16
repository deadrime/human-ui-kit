import classNames from 'classnames';
import React, { CSSProperties, useEffect, useRef } from 'react';
import LoadingIcon from '@icons/loading.svg';
import styles from './ObservableLoadMore.module.less';

export type ObservableLoadMoreProps = Partial<Pick<IntersectionObserver, 'root' | 'rootMargin' | 'thresholds'>> & {
  onObserve?: () => void
  showLoadMore?: boolean
  loadingIcon?: JSX.Element
  className?: string
  style?: CSSProperties
}

const ObservableLoadMore: React.FC<ObservableLoadMoreProps> = ({
  onObserve,
  showLoadMore = true,
  className,
  style,
  loadingIcon = <LoadingIcon color="var(--color-primary)" width={20} />,
  ...options
}) => {
  const observerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!onObserve || !observerRef.current) {
      return;
    }
    const observedElement = observerRef.current;

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      onObserve?.();
    }, options);

    intersectionObserver.observe(observedElement);

    return () => {
      intersectionObserver.unobserve(observedElement);
    };
  }, [options, onObserve]);

  return (
    <div ref={observerRef} className={classNames(styles.observer, className)} style={style}>
      {showLoadMore && loadingIcon}
    </div>
  );
};

export default ObservableLoadMore;
