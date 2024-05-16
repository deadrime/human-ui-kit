import React, { createContext, useContext, useMemo } from 'react';
import { ModalContextProvider } from '../Modal';
import { useIsomorphicLayoutEffect } from 'react-use';
import { BaseProfile } from '@components/DisplayProfile/types';

export type ThemeConfig<P = BaseProfile> = {
  isNext?: boolean;
  theme?: 'dark' | 'white';
  tokens?: Record<string, any>;
  variables?: Record<string, string>;
  renderInternalLink?: (props: any) => React.ReactElement;
  displayProfile?: {
    getAvatarSrc?: (profile: P) => string,
    getAvatarUrl?: (profile: P) => string,
    defaultSubtitleLayout?: string[],
    VerifiedIcon?: React.FC<React.SVGProps<SVGSVGElement>>
    renderField: Record<string, (profile: P, defaultRender: any) => React.ReactNode>
  }
}

const defaultRenderInternalLink = ({ children, ...props }) => <a {...props}>{children}</a>;

export const ThemeConfigContext = createContext<ThemeConfig>({});

export type ThemeConfigProviderProps = {
  children: React.ReactNode,
  config?: ThemeConfig,
}

export const convertTokensToCssVariables = (tokens: any) => {
  let result = {};

  const convert = (obj, keyPrefix = '-') => {
    for (let key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        result[`${keyPrefix}-${key}`] = value;
      } else {
        convert(value, `${keyPrefix}-${key}`);
      }
    }
  };

  convert(tokens);

  return result;
};

export const useThemeConfig = () => {
  const config = useContext(ThemeConfigContext);
  return config;
};

export const ThemeConfigProvider: React.FC<ThemeConfigProviderProps> = ({ children, config }) => {
  const variables = useMemo(() => convertTokensToCssVariables(config.tokens), [config.tokens]);

  useIsomorphicLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    if (!config.tokens) {
      return;
    }
    for (let variable in variables) {
      document.documentElement.style.setProperty(variable, variables[variable]);
    }
  }, [variables]);

  return (
    <ThemeConfigContext.Provider
      value={{
        ...config,
        renderInternalLink: config?.renderInternalLink || defaultRenderInternalLink,
        variables,
      }}
    >
      <ModalContextProvider>
        {children}
      </ModalContextProvider>
    </ThemeConfigContext.Provider>
  );
};
