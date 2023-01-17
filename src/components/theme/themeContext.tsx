import React, { createContext, useContext } from "react";
import { ModalContextProvider } from "../Modal";

export type ThemeConfig = {
  isNext?: boolean;
  theme?: 'dark' | 'white'
  tokens?: Record<string, any>;
  variables?: Record<string, string>;
  renderInternalLink?: (props: any) => React.ReactElement
}

const defaultRenderInternalLink = ({ children, ...props }) => <a {...props}>{children}</a>

export const ThemeConfigContext = createContext<ThemeConfig>({});

export type ThemeConfigProviderProps = {
  children: React.ReactNode,
  config?: ThemeConfig,
}

export const convertTokensToCssVariables = (tokens: any) => {
  let result = {};

  const convert = (obj, keyPrefix = '-') => {
    for(let key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        result[`${keyPrefix}-${key}`] = value;
      } else {
        convert(value, `${keyPrefix}-${key}`)
      }
    }
  }

  convert(tokens);

  return result
}

export const useThemeConfig = () => {
  const config = useContext(ThemeConfigContext);
  return config
}

export const ThemeConfigProvider: React.FC<ThemeConfigProviderProps> = ({ children, config }) => {
  return (
    <ThemeConfigContext.Provider value={{
      ...config,
      renderInternalLink: config?.renderInternalLink || defaultRenderInternalLink,
      variables: convertTokensToCssVariables(config.tokens)
    }}>
      <ModalContextProvider>
        {children}
      </ModalContextProvider>
    </ThemeConfigContext.Provider>
  );
};
