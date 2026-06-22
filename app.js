const views = {
  overview: "台灣室內裝修產業治理基礎設施",
  gate: "可治理的案件狀態機",
  passport: "案件治理護照與證據鏈",
  checklist: "24 張檢核手冊表單化引擎",
  risk: "AI 風險評分與預警",
  glevel: "治理成熟度與 G-Level",
  association: "公會治理中心",
  architecture: "技術架構與 API",
  sbir: "SBIR V2.1 研發計畫",
  business: "商業模式與投資人版本",
};

const gates = [
  { id: "D1", name: "需求登錄", text: "建立案件、屋況、預算與初始需求。" },
  { id: "D2", name: "現勘評估", text: "完成現場資料、照片、量測與限制條件。" },
  { id: "D3", name: "報價確認", text: "確認報價、工項、材料與變更風險。" },
  { id: "C1", name: "合約簽署", text: "鎖定契約版本、付款節點與責任歸屬。" },
  { id: "C2", name: "施工治理", text: "追蹤進度、工班、品質與異常事件。" },
  { id: "C3", name: "驗收管理", text: "彙整驗收紀錄、缺失改善與交付文件。" },
  { id: "C4", name: "保固維護", text: "建立保固、維修、追蹤與售後紀錄。" },
  { id: "C5", name: "治理封存", text: "PGP、RiskScore、G-Level 完成歸檔。" },
];

const gateRules = [
  { label: "狀態不可跳關", text: "每個 Gate 都需要完成必要文件與檢核，才能進入下一階段。" },
  { label: "變更需留痕", text: "報價、材料、設計、工期變更都會形成可追溯紀錄。" },
  { label: "Checklist 引擎", text: "依案件階段產生檢核項目，避免靠人工記憶治理。" },
  { label: "Evidence Engine", text: "照片、文件、簽核與時間戳統一寫入 Evidence Vault。" },
  { label: "不可逆治理", text: "已核准節點保留版本，不以覆蓋方式修改歷史。" },
  { label: "風險即時預警", text: "RiskScore 依缺件、延遲、異常變更與爭議訊號更新。" },
];

const audit = [
  ["2026-06-14 09:18", "D1 -> D2", "需求資料完成，進入現勘階段", "系統"],
  ["2026-06-14 10:42", "D2 -> D3", "現勘照片與量測資料已上傳", "設計師"],
  ["2026-06-14 14:05", "D3 風險提示", "報價差異高於門檻，要求補充說明", "AI Agent"],
  ["2026-06-14 15:22", "D3 核准", "業主確認報價，案件可進入 C1", "iSAFE Gate"],
];

const checks = [
  ["需求紀錄", "業主需求、預算與空間範圍已建立", "done"],
  ["屋況資料", "現況照片與基礎量測已完成", "done"],
  ["報價版本", "報價單與工項版本已鎖定", "done"],
  ["付款節點", "付款比例與條件需再次確認", "risk"],
  ["證據文件", "EXIF 與上傳時間已保留", "done"],
  ["雜湊驗證", "SHA-256 指紋已建立", "done"],
  ["報價異常", "材料單價偏離歷史區間", "risk"],
  ["契約附件", "尚待補齊保固附件", ""],
  ["驗收標準", "C3 驗收標準待定義", ""],
  ["維修責任", "C4 售後責任待確認", ""],
];

const riskFactors = [
  ["報價變更頻率", 42, "warning"],
  ["工期延遲可能", 26, ""],
  ["付款節點不明", 54, "danger"],
  ["材料替代風險", 30, ""],
  ["文件缺漏程度", 18, ""],
];

const levels = [
  ["G1", "案件資料可追蹤", "基礎"],
  ["G2", "Gate 與 Checklist 已上線", "成長"],
  ["G3", "AI 風險預警可用", "目前"],
  ["G4", "跨角色協作與公會治理", "進階"],
  ["G5", "產業級治理資料標準", "成熟"],
];

let currentGate = 2;

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setText(selector, text) {
  const target = qs(selector);
  if (target) target.textContent = text;
}

function setView(viewId) {
  const nextView = views[viewId] ? viewId : "overview";

  qsa(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === nextView);
  });

  qsa(".view").forEach((view) => {
    view.classList.toggle("active", view.id === nextView);
  });

  setText("#view-title", views[nextView]);
}

function renderGateMachine() {
  const target = qs("#gateMachine");
  if (!target) return;

  target.innerHTML = gates
    .map((gate, index) => {
      const state = index < currentGate ? "done" : index === currentGate ? "current" : "locked";
      return `
        <div class="gate-node ${state}">
          <strong>${gate.id} ${gate.name}</strong>
          <small>${gate.text}</small>
        </div>
      `;
    })
    .join("");

  const current = gates[currentGate];
  setText("#currentGateLabel", `目前：${current.id} ${current.name}`);
}

function renderGateRules() {
  const target = qs("#gateRules");
  if (!target) return;

  target.innerHTML = gateRules
    .map((rule) => `<div class="rule-item"><strong>${rule.label}</strong><span>${rule.text}</span></div>`)
    .join("");
}

function renderAuditRows() {
  const target = qs("#auditRows");
  if (!target) return;

  target.innerHTML = [
    `<div class="audit-row header"><div>時間</div><div>狀態</div><div>治理紀錄</div><div>角色</div></div>`,
    ...audit.map((row) => `<div class="audit-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`),
  ].join("");
}

function renderPassportChecks() {
  const target = qs("#passportChecks");
  if (!target) return;

  target.innerHTML = checks
    .map(([label, text, state]) => {
      const marker = state === "done" ? "✓" : state === "risk" ? "!" : "•";
      return `
        <div class="check-item ${state}">
          <strong>${marker} ${label}</strong>
          <span>${text}</span>
        </div>
      `;
    })
    .join("");
}

function renderRiskBars() {
  const target = qs("#riskBars");
  if (!target) return;

  target.innerHTML = riskFactors
    .map(
      ([label, value, state]) => `
        <div class="bar-item ${state}">
          <strong>${label}</strong>
          <div class="bar-track"><div class="bar-fill" style="width: ${value}%"></div></div>
          <span>${value}</span>
        </div>
      `,
    )
    .join("");
}

function renderLevels() {
  const target = qs("#levelLadder");
  if (!target) return;

  target.innerHTML = levels
    .map(
      ([level, text, label]) => `
        <div class="level-row ${label === "目前" ? "current" : ""}">
          <strong>${level}</strong>
          <span>${text}</span>
          <em>${label}</em>
        </div>
      `,
    )
    .join("");
}

function advanceCase() {
  currentGate = Math.min(currentGate + 1, gates.length - 1);
  renderGateMachine();
  setView("gate");
}

function init() {
  qsa(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  const demoCycleBtn = qs("#demoCycleBtn");
  if (demoCycleBtn) demoCycleBtn.addEventListener("click", advanceCase);

  const printBtn = qs("#printBtn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  renderGateMachine();
  renderGateRules();
  renderAuditRows();
  renderPassportChecks();
  renderRiskBars();
  renderLevels();
}

document.addEventListener("DOMContentLoaded", init);
