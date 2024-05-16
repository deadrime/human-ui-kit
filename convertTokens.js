const path = require("path");
const fs = require("fs");

const themesPath = path.join(__dirname, "./public/themes");

const convertTokensToCssVariables = (tokens) => {
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

const convertCssVariablesToCss = (variables) => {
  const variablesStr = Object.entries(variables).reduce((acc, [key, value]) => {
    acc += `${key}: ${value};`
    return acc;
  }, '')

  return `:root {${variablesStr}}`
}

fs.readdirSync(themesPath).forEach(function(fileName) {
  if (!fileName.endsWith('.json')) {
    return
  }
  const filePath = path.join(themesPath, fileName);

  const tokens = require(filePath);
  const variables = convertTokensToCssVariables(tokens);
  const css = convertCssVariablesToCss(variables);
  const cssFilePath = filePath.replace('.json', '.css');
  fs.writeFileSync(cssFilePath, css);
});
