export const waitForScrollEnd = (element: HTMLElement) => new Promise((resolve) => {
  let scrollTimeout;
  scrollTimeout = setTimeout(resolve, 100);
  element.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(resolve, 100);
  });
});
