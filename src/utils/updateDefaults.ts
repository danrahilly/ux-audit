// Utility to help update the DEFAULT_ELEMENTS in App.tsx
// This generates the code that needs to be manually copied

export interface PageElement {
  id: string;
  type: string;
  properties: Record<string, any>;
}

export function generateDefaultElementsCode(elements: PageElement[]): string {
  return `const DEFAULT_ELEMENTS: PageElement[] = ${JSON.stringify(elements, null, 2)};`;
}

export function generateDefaultCanvasCode(backgroundColor: string): string {
  return `const DEFAULT_CANVAS_BACKGROUND = "${backgroundColor}";`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for browsers that don't support clipboard API
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textArea);
  }
  return Promise.resolve();
}
