import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://harshini-suresha.github.io/archives/";
const REPORT = join(root, "link-report.md");
const UA = "HarshiniSureshaLinkChecker/1.0 (+https://harshini-suresha.github.io/archives/)";
const TIMEOUT = 30000;
const CONCURRENCY = 6;
const RETRY = [0, 500, 502, 503, 504];
const SOFT = [401, 403, 405, 429];
const SKIP = new Set(["https://fonts.googleapis.com/", "https://fonts.gstatic.com/"]);

const html = readFileSync(join(root, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "js/projects.js"), "utf8"), sandbox, { filename: "js/projects.js" });
const site = sandbox.window.SITE;

const links = new Map();
const add = (url, where) => {
  if (!url) return;
  let parsed;
  try { parsed = new URL(url, SITE); } catch { return; }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return;
  parsed.hash = "";
  if (SKIP.has(parsed.href)) return;
  if (!links.has(parsed.href)) links.set(parsed.href, new Set());
  links.get(parsed.href).add(where);
};

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^(mailto:|#|data:|javascript:)/i.test(match[1])) continue;
  add(match[1], "index.html");
}

const siteName = "archive site";
for (const p of site.projects) {
  add(site.W + p.w, p.n);
  add(site.G + p.gh, p.n);
  if (p.app) add(p.app, p.n);
  if (p.co) add(site.C + p.co, p.n);
  if (p.dl) add(p.dl, p.n);
  if (p.dk) add(p.dk, p.n);
  if (p.pp) add(p.pp, p.n);
  if (p.shot) add(p.shot, p.n);
}
add("assets/Harshini-Suresha-CV.pdf", "CV");
add("assets/og-card.png", "share preview");
add(SITE, siteName);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function attempt(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  const streamlit = new URL(url).hostname.endsWith(".streamlit.app");
  try {
    const res = await fetch(url, {
      redirect: streamlit ? "manual" : "follow",
      signal: controller.signal,
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/pdf,*/*;q=0.8" },
    });
    try { await res.body?.cancel(); } catch {}
    return { status: res.status, finalUrl: res.url };
  } catch (error) {
    return { status: 0, error: error.name === "AbortError" ? `timed out after ${TIMEOUT / 1000}s` : error.message || "request failed" };
  } finally {
    clearTimeout(timer);
  }
}

async function check(url) {
  let result = await attempt(url);
  if (RETRY.includes(result.status)) {
    await sleep(3000);
    result = await attempt(url);
  }
  return result;
}

const entries = [...links];
const results = new Array(entries.length);
let next = 0;
async function worker() {
  while (next < entries.length) {
    const index = next++;
    const [url, sources] = entries[index];
    results[index] = { url, sources: [...sources], ...(await check(url)) };
    process.stderr.write(`\rchecked ${index + 1}/${entries.length}`);
  }
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, entries.length) }, worker));
process.stderr.write("\n");

const failed = results.filter((r) => r.status === 0 || (r.status >= 400 && !SOFT.includes(r.status)));
const soft = results.filter((r) => SOFT.includes(r.status));
const good = results.length - failed.length - soft.length;
const cell = (value) => String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");

const lines = [
  "# Weekly link check",
  "",
  `Checked **${results.length}** links on ${new Date().toISOString().slice(0, 10)}.`,
  "",
  failed.length ? `**${failed.length} broken or unreachable.**` : "**No broken links found.**",
  soft.length ? `**${soft.length} need a manual look** (the server refused an automated check).` : "",
  "",
];

if (failed.length) {
  lines.push("| Link | Where | Result |", "| --- | --- | --- |");
  for (const r of failed) {
    lines.push(`| ${cell(r.url)} | ${cell(r.sources.join(", "))} | ${r.status ? `HTTP ${r.status}` : cell(r.error)} |`);
  }
  lines.push("");
}

if (soft.length) {
  lines.push("## Needs a manual look", "", "| Link | Where | Result |", "| --- | --- | --- |");
  for (const r of soft) {
    lines.push(`| ${cell(r.url)} | ${cell(r.sources.join(", "))} | HTTP ${r.status} (automated check blocked) |`);
  }
  lines.push("");
}

lines.push(`<sub>${good} links responded normally. Checked from a GitHub Actions runner; some sites block automated requests, so those are listed separately.</sub>`);

writeFileSync(REPORT, lines.join("\n") + "\n");

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `failures=${failed.length}\nwarnings=${soft.length}\n`);
}

console.log(`${results.length} links checked: ${good} ok, ${failed.length} broken, ${soft.length} to check manually. Report: link-report.md`);
