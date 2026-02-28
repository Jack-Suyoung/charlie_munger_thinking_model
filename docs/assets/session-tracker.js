(function () {
  "use strict";

  var TOTAL_SESSIONS = 22;
  var STORAGE_KEY_LAST = "lastSession";

  function getSessionNumber(path) {
    var match = path.match(/\/sessions\/session_(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function insertBanner() {
    var last = parseInt(localStorage.getItem(STORAGE_KEY_LAST), 10);
    if (!last) return;

    var h1 = document.querySelector("article h1, .md-content h1");
    if (!h1) return;

    var banner = document.createElement("div");
    banner.style.cssText =
      "background:var(--md-primary-fg-color,#e64a19);color:#fff;padding:12px 16px;" +
      "border-radius:8px;margin:12px 0 20px;font-size:.95rem;display:flex;" +
      "align-items:center;gap:8px;flex-wrap:wrap;";

    var text = "\uD83D\uDCD6 \uB9C8\uC9C0\uB9C9 \uD559\uC2B5: \uC138\uC158 " + pad(last);

    if (last < TOTAL_SESSIONS) {
      var next = last + 1;
      var link = document.createElement("a");
      link.href = "session_" + pad(next) + ".html";
      link.textContent = "\uC138\uC158 " + pad(next);
      link.style.cssText = "color:#fff;font-weight:700;text-decoration:underline;";

      banner.textContent = text + " \u2014 \uB2E4\uC74C \uC138\uC158: ";
      banner.appendChild(link);
    } else {
      banner.textContent = text + " \u2014 \uD83C\uDF89 \uBAA8\uB4E0 \uC138\uC158 \uC644\uB8CC!";
    }

    h1.parentNode.insertBefore(banner, h1.nextSibling);
  }

  function isSessionListPage(path) {
    return /\/sessions\/$/.test(path) || /\/sessions\/index\.html/.test(path);
  }

  function run() {
    var path = window.location.pathname;
    var sessionNum = getSessionNumber(path);

    if (sessionNum) {
      localStorage.setItem(STORAGE_KEY_LAST, String(sessionNum));
    }

    if (isSessionListPage(path)) {
      insertBanner();
    }
  }

  // MkDocs Material uses instant navigation; re-run on page change
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      run();
    });
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
