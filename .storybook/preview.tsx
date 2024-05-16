import React from 'react';
import darkTheme from '../public/themes/dark.json';
import whiteTheme from '../public/themes/white.json';
import { ThemeConfigProvider, useThemeConfig } from '../src/components/theme/themeContext'
import '../src/global.less';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#212326',
      },
      {
        name: 'white',
        value: '#fff',
      },
    ],
  },
}

const StyledWrapper = ({ children }) => {
  const config = useThemeConfig();

  return <div style={config.variables}>
    {children}
  </div>
}

const withThemeProvider = (Story, context) => {
  const currentTheme = context.parameters?.backgrounds?.values?.find(i => i?.value === context.globals.backgrounds?.value)?.name || 'dark';

  const tokens = currentTheme === 'dark' ? darkTheme : whiteTheme;

  return (
    <ThemeConfigProvider config={{ theme: currentTheme, tokens }}>
      <StyledWrapper>
        <Story />
      </StyledWrapper>
    </ThemeConfigProvider>
  )
}

export const decorators = [withThemeProvider];
