import React, { useCallback, useState } from 'react';
import styles from './Table.module.less';
import { useMediaQuery } from 'react-responsive';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Row,
} from '@tanstack/react-table';
import Text from '@components/Text';
import IconButton from '@components/buttons/IconButton';
import classNames from 'classnames';
import ObservableLoadMore from '../ObservableLoadMore/ObservableLoadMore';
import ArrowDownIcon from '@icons/arrow-down.svg';
import LoadingIcon from '@icons/loading.svg';

export { createColumnHelper } from '@tanstack/react-table';

const defaultMobileVersionBreakpoint = 768;

type MobileRowProps = {
  row: Row<any>
  mobileColumnToDisplay?: string,
  hideRank?: boolean
}

const MobileRow: React.FC<MobileRowProps> = ({ row, mobileColumnToDisplay, hideRank }) => {
  const allCells = row.getVisibleCells();
  const [profileCell, ...otherCells] = allCells;
  const cellToDisplay = otherCells.find(cell => cell.column.id === mobileColumnToDisplay) || otherCells[0];
  const expandCells = otherCells.filter(cell => cell.id !== cellToDisplay.id);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(value => !value);
  };

  return (
    <div
      key={row.id}
      className={classNames({
        [styles.expanded]: expanded,
        [styles.collapsed]: !expanded,
      })}
    >
      <div className={styles.mobileRow}>
        {!hideRank && (
          <Text
            size="body2"
            md={'body1'}
            color="gray-200"
            className={styles.rank}
          >
            #{row.original['rank'] || (row.index + 1)}
          </Text>
        )}
        {flexRender(profileCell.column.columnDef.cell, profileCell.getContext())}
        <div className={styles.cellToDisplay}>
          {flexRender(cellToDisplay.column.columnDef.cell, cellToDisplay.getContext())}
        </div>
        {mobileColumnToDisplay && <IconButton
          variant={'secondary'}
          className={styles.expandButton}
          transparent
          icon={<ArrowDownIcon className={styles.expandIcon} />}
          onClick={toggleExpanded}
        />}
      </div>
      <div className={styles.expandCells}>
        {expandCells.map(cell => (
          <div key={cell.id} className={styles.mobileCell}>
            <div>
              <>{cell.column.columnDef.header}</>
            </div>
            <div style={{ textAlign: 'right' }}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export type TableProps<T> = {
  data: T[],
  showLoadMore?: boolean,
  columns: Array<ColumnDef<T>>,
  hideRank?: boolean,
  hideHeader?: boolean,
  mobileColumnToDisplay?: string,
  mobileVersionBreakpoint?: number,
  className?: string,
  onBottomReached?: () => void
  loading?: boolean
}

// TODO: add pagination support
const Table = <T extends unknown>({
  data,
  columns,
  hideRank,
  hideHeader,
  mobileColumnToDisplay,
  mobileVersionBreakpoint = defaultMobileVersionBreakpoint,
  className,
  onBottomReached,
  showLoadMore = false,
  loading,
}: TableProps<T>) => {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isMobile = useMediaQuery({ query: `(max-width: ${mobileVersionBreakpoint}px)` });

  const getMobileDisplay = useCallback(() => {
    const allRows = table.getRowModel().rows;

    return (
      allRows.map(row => {
        return (
          <MobileRow
            key={row.id}
            row={row}
            mobileColumnToDisplay={mobileColumnToDisplay}
            hideRank={hideRank}
          />
        );
      })
    );
  }, [table, mobileColumnToDisplay, hideRank]);

  return (
    <div>
      {loading && <LoadingIcon width={20} />}
      <table
        className={classNames(styles.table, className, {
        [styles.tableMobile]: isMobile,
      })}
      >
        {!hideHeader && <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {!hideRank && <th><Text color="gray-200">Rank</Text></th>}
              {headerGroup.headers
              .filter((header, index) => {
                if (!isMobile) {
                  if (index === 0 && !hideRank) {
                    return false;
                  } else {
                    return true;
                  }
                }

                return ['profile', mobileColumnToDisplay].includes(header.column.id);
              })
              .map(header => {
                return (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      ...header.column.columnDef.meta?.['style'],
                    }}
                    className={header.column.columnDef.meta?.['thClassName']}
                  >
                    <Text color="gray-200" size="body1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Text>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>}
        <tbody>
          {isMobile ? getMobileDisplay() : table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index) => {
              return (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                  className={cell.column.columnDef.meta?.['trClassName']}
                >
                  {index === 0 && !hideRank ? (
                    <div className={styles.cellWithRank}>
                      <Text
                        size="body2"
                        md={'body1'}
                        color="gray-200"
                        className={styles.rank}
                      >
                        #{(cell.row.original?.['rank'] || row.index) + 1}
                      </Text>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ) : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
            </tr>
        ))}
        </tbody>
      </table>
      <ObservableLoadMore
        onObserve={onBottomReached}
        rootMargin="200px"
        showLoadMore={showLoadMore}
      />
    </div>
  );
};

export default Table;
