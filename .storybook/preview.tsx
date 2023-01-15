import React from 'react';
import darkTheme from '../public/themes/dark.json';
import whiteTheme from '../public/themes/white.json';
import { ThemeConfigProvider } from '../src/components/theme/themeContext'

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

const withThemeProvider = (Story, context) => {
  const currentTheme = context.parameters?.backgrounds?.values?.find(i => i?.value === context.globals.backgrounds?.value)?.name || 'dark';

  const variables = currentTheme === 'dark' ? darkTheme : whiteTheme;

  return (
    <ThemeConfigProvider config={{ theme: currentTheme, variables }}>
      <Story />
    </ThemeConfigProvider>
  )
}

export const decorators = [withThemeProvider];
