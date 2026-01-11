(function () {
  "use strict";

  // === DAFTAR TEKS YANG DIUBAH ===
  const REPLACEMENTS = {
    "Tepian Langit": "Yosuga no Sora"
    // Tambahkan di sini nanti
    // "Teks lama": "Teks baru"
  };

  // Escape regex special chars
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Replace hanya pada TEXT NODE
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;
      for (const [from, to] of Object.entries(REPLACEMENTS)) {
        const regex = new RegExp(escapeRegExp(from), "g");
        text = text.replace(regex, to);
      }
      node.nodeValue = text;
    } else {
      node.childNodes.forEach(replaceText);
    }
  }

  // Observe DOM changes (untuk teks dari JS tema)
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(replaceText);
    }
  });

  // Jalankan
  document.addEventListener("DOMContentLoaded", () => {
    replaceText(document.body);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
})();
