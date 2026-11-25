// Theme: dark unless the reader picked the light one with the button.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  function current() {
    return root.dataset.theme || "dark";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    if (button) {
      button.hidden = false;
      button.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }

    // Colour the code blocks, if highlight.js could be loaded.
    if (window.hljs) window.hljs.highlightAll();

    // Label each code block with its language (```yaml gives "yaml").
    document.querySelectorAll('pre > code[class*="language-"]').forEach(function (code) {
      var match = code.className.match(/language-([\w-]+)/);
      if (match) code.parentElement.dataset.lang = match[1];
    });
  });
})();
