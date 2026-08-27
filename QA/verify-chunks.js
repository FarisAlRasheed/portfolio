// QA helper: inspect the dev server's compiled client chunks to confirm the
// transition implementation that is actually served to the browser.
(async () => {
  try {
    const res = await fetch("http://localhost:3000/");
    const html = await res.text();
    // Find script srcs
    const scripts = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
    console.log("Scripts found:", scripts.length);
    for (const src of scripts) {
      if (src.includes("_next")) {
        const r = await fetch("http://localhost:3000" + src);
        const text = await r.text();
        console.log("---", src, "status", r.status, "len", text.length);
        // Look for the transition definitions
        for (const needle of [
          "AnimatePresence",
          "opacity: 0",
          "y: 10",
          "y: -10",
          "duration: 0.3",
          "mode: \"wait\"",
        ]) {
          if (text.includes(needle)) {
            console.log("  contains:", needle);
          }
        }
      }
    }
  } catch (e) {
    console.log("ERR", e.message);
  }
})();
