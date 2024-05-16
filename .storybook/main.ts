const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ['@storybook/addon-essentials'],
  core: {},

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;
