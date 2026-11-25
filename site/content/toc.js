// Builds the "On this page" list from the article's headings.
// Without JavaScript, or with fewer than two headings, the sidebar stays hidden.
(function () {
  var toc = document.getElementById("toc");
  if (!toc) return;

  var headings = document.querySelectorAll(".prose h2[id], .prose h3[id]");
  if (headings.length < 2) return;

  var list = toc.querySelector("ol");
  var links = {};

  headings.forEach(function (heading) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    if (heading.tagName === "H3") item.className = "toc-sub";
    link.href = "#" + heading.id;
    link.textContent = heading.textContent;
    item.appendChild(link);
    list.appendChild(item);
    links[heading.id] = link;
  });

  toc.hidden = false;

  if (!("IntersectionObserver" in window)) return;

  // Mark the heading currently near the top of the viewport.
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) {
          links[id].removeAttribute("aria-current");
        });
        links[entry.target.id].setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "0px 0px -70% 0px" }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
})();
