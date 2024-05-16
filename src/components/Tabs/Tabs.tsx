import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import Text, { TextProps } from '@components/Text';
import styles from './Tabs.module.less';
import MoreIcon from '@icons/more.svg';
import IconButton from '@components/buttons/IconButton';
import Dropdown from '@components/Dropdown/Dropdown';
import Menu from '@components/Menu/Menu';
import { isElementVisible } from '@utils/isElementVisible';
import { waitForScrollEnd } from '@utils/waitForScrollEnd';
import identity from 'lodash/identity';

type PropsOf<T> = T extends FC<infer PropsType> ? PropsType : never;

export type TabConfig<T extends FC = FC> = {
  key: string;
  title: string | React.ReactElement;
  body: T;
  bodyProps?: PropsOf<T>;
  forceRender?: boolean;
  disabled?: boolean;
}

export function tabConfigIdentity<T extends FC = FC>(tabConfig: TabConfig<T>) {
  return identity<TabConfig<T>>(tabConfig);
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
  tabsGap?: number;
  className?: string
  bodyClassName?: string;
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
  tabsGap = 24,
}) => {
  const tabHeaderRefs = useRef<HTMLSpanElement[]>([]);
  const tabHeaderWrapperRef = useRef<HTMLDivElement>(null);
  const [visibleTabs, setVisibleTabs] = useState({});
  const invisibleTabs = tabs.filter((_, index) => !visibleTabs[index]);
  const [activeTabIndicatorStyles, setActiveTabIndicatorStyles] = useState<CSSProperties>();
  const [visitedTabKeys, setVisitedTabKeys] = useState(new Set<string>());
  const showMoreButton = invisibleTabs.length > 0;

  useEffect(() => {
    if (activeTabKey) {
      setVisitedTabKeys(prev => prev.has(activeTabKey) ?
        prev :
        new Set([...prev, activeTabKey]));
    }
  }, [activeTabKey]);

  const getVisibleTabs = useCallback(() => {
    if (!tabHeaderWrapperRef.current || !tabHeaderRefs.current.length) {
      return;
    }
    const visibleTabs = {};
    tabHeaderRefs.current.map((element, index) => {
      if (isElementVisible(element, tabHeaderWrapperRef.current)) {
        visibleTabs[index] = true;
      }
    });
    setVisibleTabs(visibleTabs);
  }, [tabHeaderRefs, tabHeaderWrapperRef]);

  const updateIndicatorStyles = useCallback(() => {
    const tabIndex = tabs.findIndex(i => i.key === activeTabKey);
    setActiveTabIndicatorStyles(getIndicatorStyles(tabHeaderWrapperRef.current, tabHeaderRefs.current[tabIndex]));
  }, [tabHeaderWrapperRef, tabHeaderRefs, activeTabKey, tabs]);

  useEffect(() => {
    getVisibleTabs();
    updateIndicatorStyles();
  }, [getVisibleTabs, updateIndicatorStyles]);

  useEffect(() => {
    const tabIndex = tabs.findIndex(i => i.key === activeTabKey);
    const tab = tabHeaderRefs.current[tabIndex];

    tabHeaderWrapperRef.current.scrollTo({
      left: tab.offsetLeft,
      behavior: 'smooth',
    });

    waitForScrollEnd(tabHeaderWrapperRef.current).then(() => {
      updateIndicatorStyles();
    });
  }, [tabHeaderWrapperRef, tabHeaderRefs, tabs, activeTabKey, getVisibleTabs, updateIndicatorStyles]);

  useEffect(() => {
    const updateOnScroll = () => {
      getVisibleTabs();
      updateIndicatorStyles();
    };

    const debounced = debounce(updateOnScroll, 100);
    const tabHeaderWrapperElement = tabHeaderWrapperRef.current;

    tabHeaderWrapperElement.addEventListener('scroll', debounced);
    window.addEventListener('resize', debounced);
    screen?.orientation?.addEventListener('change', debounced);

    return () => {
      tabHeaderWrapperElement.removeEventListener('scroll', debounced);
      window.removeEventListener('resize', debounced);
      screen?.orientation?.removeEventListener('change', debounced);
    };
  }, [getVisibleTabs, updateIndicatorStyles]);

  return (
    <div
      className={classNames(className, {
        [styles.showMoreButton]: showMoreButton,
      })}
      style={{ '--tabs-gap': `${tabsGap}px`, '--tabsJustify': tabsJustify } as CSSProperties}
    >
      <div className={styles.header}>
        <div
          className={classNames(styles.tabHeaderWrapper, {
            [styles.paddedTabHeadersContainer]: paddedTabHeadersContainer,
          })}
          ref={tabHeaderWrapperRef}
        >
          {tabs.map((tab, currentTabIndex) => {
            const isTabActive = tab.key === activeTabKey;

            return (
              <Text
                key={`text-${tab.key}`}
                ref={(el: HTMLSpanElement) => tabHeaderRefs.current[currentTabIndex] = el}
                family={headerFontFamily}
                bold
                className={classNames(styles.tabHeader, {
                  [styles.disabled]: tab.disabled,
                  [styles.active]: isTabActive,
                })}
                onClick={() => {
                  if (tab.disabled) {
                    return;
                  }

                  onActiveTabChange(tab.key);
                }}
              >
                {tab.title}
              </Text>
            );
          })}
          {showActiveTabIndicator && <div
            className={styles.activeTabIndicator}
            style={activeTabIndicatorStyles}
          />}
        </div>
        {showMoreButton &&
          <Dropdown
            overlay={(
              <Menu>
                {invisibleTabs.map((tab) => (
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
                ))}
              </Menu>
            )}
          >
            <IconButton
              size="small"
              variant="secondary"
              transparent
              icon={<MoreIcon />}
            />
          </Dropdown>
        }
      </div>
      {tabs.map((tab) => {
        const isTabActive = tab.key === activeTabKey;

        if (!tab.forceRender && !isTabActive && (destroyInactiveTabs || !visitedTabKeys.has(tab.key))) {
          return;
        }

        const TabBodyComponent = tab.body;
        const tabBodyProps = tab.bodyProps || {};

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
            <TabBodyComponent {...tabBodyProps} />
          </div>
        );
      })}
    </div>
  );
};

function getIndicatorStyles(tabHeadersContainer: HTMLDivElement, tabHeader: HTMLSpanElement): CSSProperties {
  if (tabHeadersContainer == null || tabHeader == null) {
    return undefined;
  }

  return {
    width: tabHeader.clientWidth,
    left: tabHeader.offsetLeft,
  };
}
