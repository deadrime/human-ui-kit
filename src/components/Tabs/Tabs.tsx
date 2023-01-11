import { BadgeWrapper } from '@components/Badge/Badge';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { createRef, CSSProperties, FC, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Text, { TextProps } from '@components/Text';
import styles from './Tabs.module.less';
import MoreIcon from '@icons/more.svg';
import IconButton from '@components/buttons/IconButton';
import Dropdown from '@components/Dropdown/Dropdown';
import Menu from '@components/Menu/Menu';
import { useDeepCompareMemo } from '@utils/useDeepCompareMemo';

export type TabConfig = {
  key: string;
  title: string | React.ReactElement;
  badgeCounter?: number;
  forceRender?: boolean;
  body: FC;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabConfig[];
  activeTabKey: string;
  onActiveTabChange: (tabKey: string) => void;
  destroyInactiveTabs?: boolean;
  showActiveTabIndicator?: boolean;
  paddedTabHeadersContainer?: boolean;
  headerFontFamily?: TextProps['family'];
  tabsJustify?: CSSProperties['justifyContent'];
  tabBodyMarginBottom?: string;
  className?: string
  bodyClassName?: string;
}

function getIndicatorStyles(tabHeadersContainer: HTMLDivElement, tabHeader: HTMLDivElement): CSSProperties {
  if (tabHeadersContainer == null || tabHeader == null) {
    return undefined;
  }

  const tabHeaderParentRect = tabHeadersContainer.getBoundingClientRect();
  const tabHeaderRect = tabHeader.getBoundingClientRect();

  const tabHeaderOffset = tabHeaderRect.x - tabHeaderParentRect.x;

  return {
    width: tabHeaderRect.width,
    transform: `translate(${tabHeaderOffset}px)`,
  };
}

const MIN_TAB_HEADERS_GAP = 16;

function getNumberOfTabHeadersToShow(
  tabHeadersContainer: Element,
  tabHeaders: Array<Element>,
  moreButton: Element
) {
  // Calculate the number of tab headers to show with the current screen width in mind
  let nextTabHeadersToShow = 0;
  const tabHeadersContainerRect = tabHeadersContainer.getBoundingClientRect();
  // Figure out if and how much space we need to fit the "More" button into the tab headers container
  const moreButtonWidth = moreButton ?
    moreButton.getBoundingClientRect().width + MIN_TAB_HEADERS_GAP :
    0;

  for (const tabHeader of tabHeaders) {
    const currentTabHeaderRect = tabHeader.getBoundingClientRect();
    const totalTabHeadersWidth = (currentTabHeaderRect.x - tabHeadersContainerRect.x) + currentTabHeaderRect.width;
    if (totalTabHeadersWidth + moreButtonWidth >= tabHeadersContainerRect.width) {
      break;
    }
    // Only increment the number of displayed tab headers if we are sure we can fit all of them + optionally, "More" button into the container
    nextTabHeadersToShow += 1;
  }

  return nextTabHeadersToShow;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  activeTabKey,
  onActiveTabChange,
  destroyInactiveTabs,
  showActiveTabIndicator,
  paddedTabHeadersContainer,
  headerFontFamily = 'cerebri',
  tabsJustify = 'flex-start',
  className,
  bodyClassName,
}) => {

  const tabHeadersContainerRef = useRef<HTMLDivElement>();
  const activeTabHeaderRef = useRef<HTMLDivElement>();
  const moreButtonRef = useRef<HTMLButtonElement>();
  const [numberOfTabHeadersToShow, setNumberOfTabHeadersToShow] = useState<number>();
  const [activeTabIndicatorStyles, setActiveTabIndicatorStyles] = useState<CSSProperties>();

  const tabHeaderRefs = useMemo(() => {
    const refs: Array<RefObject<HTMLDivElement>> = [];
    for (let refIndex = 0; refIndex < tabs.length; refIndex++) {
      refs.push(createRef());
    }
    return refs;
  }, [tabs.length]);

  const tabKeys = tabs.map(tab => tab.key);
  const displayedTabHeaderKeys = useDeepCompareMemo(() => {
    const result = new Set<string>();
    result.add(activeTabKey);

    for (const key of tabKeys) {
      if (result.size >= numberOfTabHeadersToShow) {
        break;
      }
      result.add(key);
    }

    return result;
  }, [activeTabKey, numberOfTabHeadersToShow, tabKeys]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActiveTabIndicatorStyles(getIndicatorStyles(tabHeadersContainerRef.current, activeTabHeaderRef.current));
      setNumberOfTabHeadersToShow(getNumberOfTabHeadersToShow(
        tabHeadersContainerRef.current,
        tabHeaderRefs.map(ref => ref.current),
        moreButtonRef.current));
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tabHeadersContainerRef, activeTabHeaderRef, activeTabKey, tabHeaderRefs]);

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setActiveTabIndicatorStyles(getIndicatorStyles(tabHeadersContainerRef.current, activeTabHeaderRef.current));
      setNumberOfTabHeadersToShow(getNumberOfTabHeadersToShow(
        tabHeadersContainerRef.current,
        tabHeaderRefs.map(ref => ref.current),
        moreButtonRef.current
      ));
    }, 300);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [activeTabHeaderRef, tabHeaderRefs]);

  // Update the active tab indicator position if number of displayed tab header changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActiveTabIndicatorStyles(getIndicatorStyles(tabHeadersContainerRef.current, activeTabHeaderRef.current));
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [numberOfTabHeadersToShow]);

  const [visitedTabKeys, setVisitedTabKeys] = useState(new Set<string>());
  useEffect(() => {
    if (activeTabKey) {
      setVisitedTabKeys(prev => prev.has(activeTabKey) ?
        prev :
        new Set([...prev, activeTabKey]));
    }
  }, [activeTabKey]);

  return (
    <div className={className} style={{ '--tabsJustify': tabsJustify } as CSSProperties}>
      <div
        className={classNames(styles.tabHeadersContainer, {
          [styles.paddedTabHeadersContainer]: paddedTabHeadersContainer,
        }, styles.shadowTabHeadersContainerCopy)}
      >
        {tabs.map((tab, currentTabIndex) => {
            const isTabActive = tab.key === activeTabKey;

            return (
              <Text
                key={`text-${tab.key}`}
                ref={tabHeaderRefs[currentTabIndex]}
                family={headerFontFamily}
                bold
                className={classNames(styles.tabHeader, {
                  [styles.disabled]: tab.disabled, [styles.active]: isTabActive,
                })}
              >
                {tab.title}
              </Text>
            );
          })}
      </div>
      <div
        role="tablist"
        className={classNames(styles.tabHeadersContainer, {
          [styles.paddedTabHeadersContainer]: paddedTabHeadersContainer,
        })}
        ref={tabHeadersContainerRef}
      >
        {
          tabs.map((tab, currentTabIndex) => {
            const isTabActive = tab.key === activeTabKey;
            const activateTab = () => {
              if (tab.disabled) return;
              onActiveTabChange(tab.key);
            };

            if (!displayedTabHeaderKeys.has(tab.key)) {
              return null;
            }

            return (
              <BadgeWrapper
                key={tab.key}
                count={tab.badgeCounter}
              >
                <Text
                  key={`text-${tab.key}`}
                  role="tab"
                  tabIndex={currentTabIndex === 0 ? 0 : -1}
                  ref={isTabActive ? activeTabHeaderRef : undefined}
                  family={headerFontFamily}
                  bold
                  onKeyUp={(event) => {
                    const tabHeaders = tabHeadersContainerRef.current.querySelectorAll<HTMLDivElement>(`.${styles.tabHeader}`);
                    if (event.key === 'ArrowLeft') {
                      if (currentTabIndex === 0) {
                        tabHeaders[tabs.length - 1].focus();
                      } else {
                        tabHeaders[currentTabIndex - 1].focus();
                      }
                    }

                    if (event.key === 'ArrowRight') {
                      if (currentTabIndex === tabs.length - 1) {
                        tabHeaders[0].focus();
                      } else {
                        tabHeaders[currentTabIndex + 1].focus();
                      }
                    }
                  }}
                  onClick={activateTab}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      activateTab();
                    }
                  }}
                  className={classNames(styles.tabHeader, {
                    [styles.disabled]: tab.disabled, [styles.active]: isTabActive,
                  })}
                >
                  {tab.title}
                </Text>
              </BadgeWrapper>
            );
          })
        }
        {numberOfTabHeadersToShow !== tabs.length &&
          <Dropdown
            overlay={<Menu>
              {tabs.map((tab) => {
                if (displayedTabHeaderKeys.has(tab.key)) {
                  return null;
                }

                return (
                  <Menu.Item
                    key={tab.key}
                    target="_blank"
                    onClick={() => {
                      if (tab.disabled) return;
                      onActiveTabChange(tab.key);
                    }}
                  >
                    <Text size="body1" family={headerFontFamily} bold>
                      {tab.title}
                    </Text>
                  </Menu.Item>
                );
              })}
            </Menu>}
          >
            <IconButton
              size="small"
              variant="secondary"
              transparent
              ref={moreButtonRef}
              icon={<MoreIcon />}
            />
          </Dropdown>}
      </div>
      {showActiveTabIndicator && <div className={styles.activeTabIndicatorContainer}>
        <div
          className={styles.activeTabIndicator}
          style={activeTabIndicatorStyles}
        />
      </div>}
      {
          [...tabs].map((tab) => {
            const isTabActive = tab.key === activeTabKey;

            if (!tab.forceRender && !isTabActive && (destroyInactiveTabs || !visitedTabKeys.has(tab.key))) {
              return;
            }

            const TabBodyComponent = tab.body;

            return (
              <div
                key={tab.key}
                className={classNames(
                  styles.tabBody,
                  bodyClassName,
                  {
                    [styles.hiddenTabBody]: !isTabActive,
                  }
                )}
              >
                <TabBodyComponent />
              </div>
            );
          })
        }
    </div>
  );
};
