import fs from "node:fs";
import assert from "node:assert/strict";

const app = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const guide = fs.readFileSync(new URL("../docs/isafe2-menu-user-guide.md", import.meta.url), "utf8");
const contract = JSON.parse(fs.readFileSync(new URL("../contracts/isafe-legacy-parity-r5.2.json", import.meta.url), "utf8"));

assert.match(app, /let activeLegacyTab = "case"/);
assert.match(app, /function renderCaseBasicPanel\(\)/);
assert.match(app, /stage: changeForm\.elements\.stage\.value/);
assert.match(app, /const currentStage = gates\.some\(\(gate\) => gate\.key === project\.stage\)/);
assert.match(app, /逐項檢核依案件 Gate 自動顯示/);
assert.doesNotMatch(app, /id="addChecklistForm"/);
assert.doesNotMatch(app, /id="legacyStageSelect"/);
assert.match(app, /planning-add-form[\s\S]*canUse\("checklist_add"\) && !frozen/);
assert.match(app, /baseline\.status === "frozen"/);
assert.match(app, /\$\{frozen \? "disabled" : ""\}/);
assert.doesNotMatch(app, /actor: "local-admin"/);
assert.match(app, /certifiedMemberUpload = role\.memberTier === "certified_member"/);
assert.match(app, /function paymentMilestoneName\(item\)/);
const financeStart = app.indexOf("function renderFinancePanel()");
const ownerDeclaration = app.indexOf('const ownerUpload = role.id === "general_member";', financeStart);
const financeReturn = app.indexOf("return `", financeStart);
assert.ok(financeStart >= 0 && ownerDeclaration > financeStart && ownerDeclaration < financeReturn, "ownerUpload 必須在付款模板回傳前宣告");
assert.match(app, /本階段付款勾稽/);
assert.match(app, /integrated-payment-confirmation/);
assert.match(app, /本頁只供業主上傳及查看原合約付款證明/);
assert.match(app, /stage-readiness-banner/);
assert.match(app, /尚不可進入下一階段/);
assert.match(app, /payment-milestones\/\$\{encodeURIComponent\(button\.dataset\.milestoneId\)\}\/confirmations/);
assert.match(app, /雙方勾稽統一在/);
assert.match(app, /Gate 才能推進並永久鎖定/);
assert.match(app, /追加減工程採獨立治理，不改動本流程/);
assert.match(app, /因應合約必要變更而獨立建立，不修改、不取代也不阻塞原階段流程/);

const namespace = html.indexOf('data-registry="namespaces"');
const dgm = html.indexOf('data-registry="dgm"');
assert.ok(namespace >= 0 && namespace < dgm, "治理名稱說明必須是 Registry 第一項");
assert.match(html, /治理名稱說明/);
assert.match(html, /data-view="help"/);

const requiredMenus = ["我的工作台", "關卡狀態機", "我的案件", "R8／R5.2 契約", "案件治理護照", "治理 Registry", "R9 治理物件", "照片與現場紀錄", "可信知識", "AI 風險評分", "治理評級", "公會治理中心"];
for (const menu of requiredMenus) assert.ok(guide.includes(menu), `使用說明缺少：${menu}`);
for (const phrase of ["認證工程會員上傳", "付款證明", "C1-C5 任一工程階段", "不直接改變 Gate、付款、契約或 R5.2 狀態"]) assert.ok(guide.includes(phrase), `責任規則缺少：${phrase}`);

const raw = JSON.stringify(contract);
for (const stage of ["C1", "C2", "C3", "C4"]) {
  assert.ok(raw.includes(`CONSTRUCTION_STAGE_${stage}`), `契約缺少 ${stage} 工程付款里程碑`);
}
assert.equal((raw.match(/completed_and_accepted/g) || []).length >= 4, true);
assert.equal((raw.match(/完工驗收款/g) || []).length >= 4, true);

console.log("Operational responsibilities and iSAFE menu guide validation passed.");