// The editor stores a small, explicitly allowed subset of HTML in browser storage.
export function sanitizePostHtml(html) {
  const document = new DOMParser().parseFromString(html || '', 'text/html');
  const allowed = new Set(['P', 'BR', 'DIV', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'H2', 'H3']);
  function clean(node) {
    for (const child of [...node.children]) {
      if (!allowed.has(child.tagName)) {
        child.replaceWith(document.createTextNode(child.textContent || ''));
        continue;
      }
      const href = child.tagName === 'A' ? child.getAttribute('href') : null;
      for (const attribute of [...child.attributes]) child.removeAttribute(attribute.name);
      if (href && /^(https?:\/\/|mailto:)/i.test(href)) {
        child.setAttribute('href', href);
        child.setAttribute('rel', 'noopener noreferrer');
      }
      clean(child);
    }
  }
  clean(document.body);
  return document.body.innerHTML;
}

export function textToPostHtml(text) {
  const element = document.createElement('div');
  element.textContent = text || '';
  return element.innerHTML.replace(/\n/g, '<br>');
}
