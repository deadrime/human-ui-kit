import React from 'react';
import '../public/themes/dark.css';
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
  const currentTheme = context.parameters.backgrounds.values.find(i => i.value === context.globals.backgrounds.value).name

  return (
    <ThemeConfigProvider config={{ theme: currentTheme }}>
      <Story />
    </ThemeConfigProvider>
  )
}

export const decorators = [withThemeProvider];
