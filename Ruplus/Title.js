(function () {
  const replacements = [
    [/^FILE-CLOUD\s*(\d+)/i, 'FC2-PPV $1'],
    [/^CARI-BUKU\s*(\d+)/i, 'Caribbeancom $1'],
    [/^TOKYO-HAMPA\s*(\d+)/i, 'Tokyo-Hot $1']
  ];

  function applyReplacements(text) {
    for (let [pattern, replacement] of replacements) {
      if (pattern.test(text)) {
        return text.replace(pattern, replacement);
      }
    }
    return text;
  }

  function gantiTeks(el) {
    if (!el) return;
    const text = el.textContent.trim();
    const replaced = applyReplacements(text);
    if (text !== replaced) el.textContent = replaced;
  }

  function gantiTitleAttr(el) {
    if (!el || !el.hasAttribute('title')) return;
    const title = el.getAttribute('title');
    const replaced = applyReplacements(title);
    if (title !== replaced) el.setAttribute('title', replaced);
  }

  function prosesSemua() {
    document.querySelectorAll('.anime-name a').forEach(el => {
      gantiTeks(el);
      gantiTitleAttr(el);
    });

    document.querySelectorAll('a[title]').forEach(gantiTitleAttr);
    document.querySelectorAll('a').forEach(gantiTeks);
    document.querySelectorAll('span[itemprop="name"]').forEach(gantiTeks);
    document.querySelectorAll('h1.entry-title').forEach(gantiTeks);

    // Ganti <title> di head
    const pageTitle = document.title;
    const replacedTitle = applyReplacements(pageTitle);
    if (pageTitle !== replacedTitle) {
      document.title = replacedTitle;
    }
  }

  document.addEventListener('DOMContentLoaded', prosesSemua);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;

        if (node.matches('a, span[itemprop="name"], h1.entry-title, .anime-name a') ||
            node.querySelector('a, span[itemprop="name"], h1.entry-title, .anime-name a')) {
          prosesSemua();
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
