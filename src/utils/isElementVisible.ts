export function isElementVisible(element: HTMLElement, container: HTMLElement) {
  const elRect = element.getBoundingClientRect();
  const conRect = container.getBoundingClientRect();

  let result = false;

  if (
    elRect.x >= conRect.x && elRect.y >= conRect.y &&
    elRect.x + elRect.width <= conRect.x + conRect.width &&
    elRect.y + elRect.height <= conRect.y + conRect.height
  ) {
    result = true;
  }

  return result;
}
