import React from 'react';
import RcPagination, { PaginationProps } from 'rc-pagination';
import styles from './Pagination.module.less';
import IconArrowLeft from '@icons/arrow-left.svg';
import IconArrowRight from '@icons/arrow-right.svg';

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RcPagination
      {...props}
      prefixCls={styles.pagination}
      prevIcon={<IconArrowLeft width={16} />}
      nextIcon={<IconArrowRight width={16} />}
    />
  );
};

export default Pagination;
