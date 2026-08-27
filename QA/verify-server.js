// QA helper: verify the dev server responds and inspect the served HTML for
// the presence of the page-level transition wrapper.
(async () => {
  try {
    const res = await fetch("http://localhost:3000/");
    console.log("HTTP", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);
    console.log("has DashboardLayout ref:", html.includes("DashboardLayout"));
    console.log("has AnimatePresence ref:", html.includes("AnimatePresence"));
  } catch (e) {
    console.log("ERR", e.message);
  }
})();
