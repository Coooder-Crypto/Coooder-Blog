export default function convert(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;

  element.style.overflow = 'hidden';
  element.innerHTML = element.innerText
    .split('')
    .map((char) => {
      if (char === ' ') {
        return `<span>&nbsp;</span>`;
      }
      return `<span class="animated">${char}</span>`;
    })
    .join('');

  return element;
}
