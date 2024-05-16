import React from 'react';
import RcPagination, { PaginationProps } from 'rc-pagination';
import styles from './Pagination.module.less';
import IconArrowLeft from '@icons/arrow-left.svg';
import IconArrowRight from '@icons/arrow-right.svg';
import { IconButton } from '@components/buttons';

export type {
  PaginationProps
};

const Pagination: React.FC<PaginationProps> = ({
  showLessItems = true,
  showSizeChanger = false,
  ...props
}) => {
  return (
    <RcPagination
      {...props}
      showLessItems={showLessItems}
      showSizeChanger={showSizeChanger}
      prefixCls={styles.pagination}
      prevIcon={(props) => (
        <IconButton
          variant="secondary"
          icon={<IconArrowLeft width={14} />}
          size="small"
          filled
          disabled={props?.['disabled']}
        />
      )}
      nextIcon={props => (
        <IconButton
          variant="secondary"
          icon={<IconArrowRight width={14} />}
          size="small"
          filled
          disabled={props?.['disabled']}
        />
      )}
    />
  );
};

export default Pagination;
