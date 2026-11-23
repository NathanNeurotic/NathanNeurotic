/* project-links:start (generated, see https://github.com/NathanNeurotic/NathanNeurotic/tree/main/project-links) */
/* Small bar at the top of every page: links to the six project sites and a
   language picker that reopens THIS page through Google Translate. */
(function () {
  if (window.__nnLangbar) return;
  window.__nnLangbar = true;
  var SITES = [
    ["RiptOPL", "RiptOPL"], ["Launchstation", "Launchstation"],
    ["PS2-Servers", "PS2-Servers"], ["launcHER", "launcHER"],
    ["Simple-Media-System", "Simple-Media-System"], ["POPSLoader", "POPSLoader"]
  ];
  var LANGS = [
    ["en", "English"], ["es", "Español"], ["pt", "Português (Brasil)"],
    ["pt-PT", "Português"], ["fr", "Français"], ["de", "Deutsch"],
    ["it", "Italiano"], ["nl", "Nederlands"], ["da", "Dansk"],
    ["sv", "Svenska"], ["pl", "Polski"], ["cs", "Čeština"],
    ["hr", "Hrvatski"], ["sr", "Српски"], ["bg", "Български"],
    ["ru", "Русский"], ["el", "Ελληνικά"], ["hu", "Magyar"],
    ["ro", "Română"], ["gl", "Galego"], ["sq", "Shqip"],
    ["tr", "Türkçe"], ["ar", "العربية"], ["fa", "فارسی"],
    ["ja", "日本語"], ["ko", "한국어"], ["zh-CN", "简体中文"],
    ["zh-TW", "繁體中文"], ["vi", "Tiếng Việt"], ["lo", "ລາວ"],
    ["id", "Bahasa Indonesia"], ["tl", "Filipino"], ["ceb", "Cebuano"]
  ];
  var HOME = "https://nathanneurotic.github.io";
  var PROXY = "https://nathanneurotic-github-io.translate.goog";

  function run() {
    if (!document.body || document.getElementById("nn-langbar")) return;
    var path = location.pathname || "/";
    var proxied = /\.translate\.goog$/.test(location.hostname);
    var params = new URLSearchParams(location.search);
    var current = proxied ? (params.get("_x_tr_tl") || "en") : "en";
    ["_x_tr_sl", "_x_tr_tl", "_x_tr_hl", "_x_tr_pto", "_x_tr_hist"].forEach(function (k) { params.delete(k); });
    var rest = params.toString();
    var here = (path.split("/")[1] || "").toLowerCase();

    var bar = document.createElement("div");
    bar.id = "nn-langbar";
    bar.setAttribute("translate", "no");
    bar.className = "notranslate";
    bar.style.cssText = "font-size:12px;line-height:1.6;text-align:center;padding:4px 12px;" +
      "opacity:.85;position:relative;z-index:50;";

    SITES.forEach(function (s, i) {
      if (i) bar.appendChild(document.createTextNode(" · "));
      var el;
      if (s[1].toLowerCase() === here) {
        el = document.createElement("b");
      } else {
        el = document.createElement("a");
        el.href = HOME + "/" + s[1] + "/";
        el.style.color = "inherit";
      }
      el.textContent = s[0];
      bar.appendChild(el);
    });

    bar.appendChild(document.createTextNode("  ·  "));
    var sel = document.createElement("select");
    sel.setAttribute("aria-label", "Language");
    sel.style.cssText = "font-size:12px;background:transparent;color:inherit;border:1px solid currentColor;" +
      "border-radius:4px;padding:0 2px;";
    LANGS.forEach(function (l) {
      var o = document.createElement("option");
      o.value = l[0];
      o.textContent = l[1];
      o.style.color = "#000";
      if (l[0] === current) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () {
      var code = sel.value;
      var q = rest ? rest + "&" : "";
      location.href = code === "en"
        ? HOME + path + (rest ? "?" + rest : "") + location.hash
        : PROXY + path + "?" + q + "_x_tr_sl=en&_x_tr_tl=" + code + "&_x_tr_hl=" + code + location.hash;
    });
    bar.appendChild(sel);
    var note = document.createElement("i");
    note.textContent = " automatic translation by Google";
    note.style.opacity = ".7";
    bar.appendChild(note);
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
/* project-links:end */
