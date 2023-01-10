export function getStyleValue(computedStyle: CSSStyleDeclaration, property: string) {
  return parseInt(computedStyle[property], 10) || 0;
}
