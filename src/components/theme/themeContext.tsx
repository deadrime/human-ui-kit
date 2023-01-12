import React, { createContext } from "react";
import { ModalContextProvider } from "../Modal";

export type ThemeConfig = {
  theme?: 'dark' | 'white'
  renderInternalLink?: (props: any) => React.ReactElement
}

const defaultConfig = {
  renderInternalLink: ({ children, ...props }) => <a {...props}>{children}</a>
}

export const ThemeConfigContext = createContext<ThemeConfig>(defaultConfig);

export type ThemeConfigProviderProps = {
  children: React.ReactNode,
  config?: ThemeConfig,
}

export const ThemeConfigProvider: React.FC<ThemeConfigProviderProps> = ({ children, config }) => {
  return (
    <ThemeConfigContext.Provider value={{
      ...defaultConfig,
      ...config,
    }}>
      <ModalContextProvider>
        {children}
      </ModalContextProvider>
    </ThemeConfigContext.Provider>
  );
};
