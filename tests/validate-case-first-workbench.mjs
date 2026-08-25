import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, script, css] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
]);

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual(duplicates, [], `duplicate element ids: ${duplicates.join(", ")}`);

for (const id of ["home", "directIntakeForm", "startDirectIntakeBtn", "workbench", "globalRoleSelect", "caseCreator", "workbenchProjects", "workbenchTasks"]) {
  assert.match(html, new RegExp(`id="${id}"`), `missing workbench element: ${id}`);
}

for (const mode of ["design_only", "construction_only", "design_build"]) {
  assert.match(html, new RegExp(`data-case-mode="${mode}"`), `missing case mode option: ${mode}`);
  assert.match(script, new RegExp(`${mode}:`), `missing case mode flow: ${mode}`);
}

assert.match(html, /class="view active" id="home"/);
assert.doesNotMatch(html, /id="sbir"|SBIR V2\.1/);
assert.match(script, /api\/v1\/isafe\/direct-intakes/);
assert.match(script, /setView\("projects"\)/);
assert.match(script, /role\.allowedViews\.unshift\("workbench"\)/);
assert.match(script, /function renderWorkbench\(\)/);
assert.match(script, /function setupWorkbench\(\)/);

assert.match(script, /function getCaseGates\(project\)/);
assert.match(script, /mode === "design_only"[\s\S]*gate\.id\.startsWith\("D"\)/);
assert.match(script, /mode === "construction_only"[\s\S]*gate\.id\.startsWith\("C"\)/);
assert.match(script, /visibleGates\.filter/);
assert.match(css, /\.workbench-grid/);
assert.match(css, /@media \(max-width: 760px\)/);

console.log("Case-first workbench validated: unique IDs, three case modes, role access and responsive styles");
