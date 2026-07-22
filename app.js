const views = {
  r5: "iSAFE 2.0 R5 契約基線與正式事件",
  overview: "台灣室內裝修產業治理基礎設施",
  gate: "可治理的案件狀態機",
  projects: "iSAFE 監管專案工作台",
  passport: "案件治理護照與證據鏈",
  checklist: "24 張檢核手冊表單化引擎",
  risk: "AI 風險評分與預警",
  glevel: "治理成熟度與 G-Level",
  association: "公會治理中心",
  architecture: "技術架構與 API",
  sbir: "SBIR V2.1 研發計畫",
  business: "商業模式與投資人版本",
};

const r5Contract = {
  version: "20260721_R5",
  acceptedAdr: "Accepted ADR",
  baseline: "TIGI_Four_Document_Masters_Optimized_20260721_R5",
  contractFile: "canonical-contract-r5.json",
  canonicalIdCount: 72,
  apiBase: "/api/v1",
};

const r5Events = [
  {
    name: "GateEvaluated",
    purpose: "Gate 判定完成後產生的正式治理事件，承載 gate、evidence、risk 與 human review 狀態。",
  },
  {
    name: "PaymentEligibilityChanged",
    purpose: "付款資格變更事件，只表達 eligibility，不混同核准或執行付款。",
  },
];

const r5PaymentFlow = [
  "Gate",
  "Payment Eligibility",
  "Payment Approval",
  "Payment Execution",
];

const r5CanonicalIds = [
  "tenant_id",
  "org_id",
  "subject_id",
  "project_id",
  "case_id",
  "gate_evaluation_id",
  "payment_eligibility_id",
  "payment_approval_id",
  "payment_execution_id",
  "evidence_id",
  "trace_id",
  "adr_id",
];

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

gates.splice(
  3,
  0,
  { id: "D4", name: "提案與風險審查", text: "確認提案、預算、風險與必要證據。" },
  { id: "D5", name: "契約與開工條件", text: "完成契約、角色與開工前治理條件。" },
);

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

const roles = [
  {
    id: "headquarter",
    label: "總部",
    title: "總部視圖",
    scope: "全區案件、代理商績效、跨區風險與完整 PGP",
    actions: ["指派代理商", "覆核 Gate", "查看全部 Evidence", "匯出 PGP"],
  },
  {
    id: "agency",
    label: "代理商",
    title: "代理商視圖",
    scope: "轄下案件、設計師進度、待補文件與 RiskScore",
    actions: ["追蹤轄下案件", "催補資料", "初審 Gate", "查看代理商 KPI"],
  },
  {
    id: "association",
    label: "公會",
    title: "公會視圖",
    scope: "爭議、評鑑、調處、PGP 與稽核 Evidence",
    actions: ["查看爭議紀錄", "建立調處意見", "審閱 PGP", "標記評鑑結果"],
  },
  {
    id: "designer",
    label: "設計師",
    title: "設計師視圖",
    scope: "本人案件、交付物、文件上傳與 Gate 待辦",
    actions: ["上傳文件", "回覆待辦", "查看 Gate 狀態", "提交變更說明"],
  },
  {
    id: "owner",
    label: "業主",
    title: "業主視圖",
    scope: "本人專案、工程進度、確認事項與 PGP 摘要",
    actions: ["確認需求", "查看進度", "下載 PGP 摘要", "提出問題"],
  },
];

let projectCases = [
  {
    id: "IS-2026-0001",
    title: "SM-2026-0002 iSAFE 監管專案",
    sourceCase: "SM-2026-0002",
    source: "StyleMatchAI",
    stage: "D1_intake",
    gate: "D1_pending",
    status: "Active",
    risk: 88,
    agency: "台北一區代理商",
    designer: "A-Designer Studio",
    owner: "owner@example.com",
    evidence: ["case_master", "timeline", "audit_log", "project_photos"],
  },
  {
    id: "IS-2026-0002",
    title: "SM-2026-0003 iSAFE 監管專案",
    sourceCase: "SM-2026-0003",
    source: "StyleMatchAI",
    stage: "D3_design_match",
    gate: "D3_review",
    status: "Active",
    risk: 42,
    agency: "新北代理商",
    designer: "North Interior Lab",
    owner: "client@example.com",
    evidence: ["case_master", "proposal", "site_photos", "audit_log"],
  },
];

let outboxEvents = [];
let currentGate = 2;
let activeRole = "headquarter";
let activeCaseId = "IS-2026-0001";

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

function getActiveCase() {
  return projectCases.find((item) => item.id === activeCaseId) || projectCases[0];
}

async function loadProjectCases() {
  try {
    const apiOrigin = window.ISAFE_CONFIG?.apiOrigin || "http://127.0.0.1:4180";
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases`, {
      headers: {
        "X-Tenant-Id": "tenant_local_tigi",
        "X-Organization-Id": "org_local_headquarter",
        "X-Purpose": "isafe_governance_review",
        "X-Consent-Ref": "consent_local_trial",
      },
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.cases) || payload.cases.length === 0) return;
    projectCases = payload.cases.map((item) => ({
      id: item.isafe_case_id,
      title: item.title,
      sourceCase: item.source_case_code,
      source: item.source || "StyleMatchAI",
      stage: item.current_stage,
      gate: item.gate_status,
      status: item.status === "active" ? "Active" : item.status,
      risk: item.risk_score,
      agency: item.agency || "尚未指派",
      designer: item.designer || "尚未指派",
      owner: item.owner || "local-admin",
      schemaVersion: item.schema_version || "20260721_R5",
      tenantId: item.tenant_id || "-",
      organizationId: item.organization_id || "-",
      journeyId: item.journey_id || "-",
      stylematchProjectId: item.stylematch_project_id || item.source_project_id || "-",
      projectId: item.project_id || "-",
      handoverId: item.handover_id || "-",
      correlationId: item.correlation_id || item.trace_id || "-",
      traceId: item.trace_id || "-",
      version: item.version || 1,
      paymentEligibilities: Array.isArray(item.payment_eligibilities) ? item.payment_eligibilities : [],
      evidence: Array.isArray(item.evidence) && item.evidence.length
        ? item.evidence.map((entry) => entry.evidence_type)
        : ["case_master", "timeline", "audit_log"],
    }));
    const outboxResponse = await fetch(`${apiOrigin}/api/v1/outbox-events`, {
      headers: {
        "X-Tenant-Id": "tenant_local_tigi",
        "X-Organization-Id": "org_local_headquarter",
        "X-Purpose": "isafe_governance_review",
        "X-Consent-Ref": "consent_local_trial",
      },
    });
    if (outboxResponse.ok) {
      const outboxPayload = await outboxResponse.json();
      outboxEvents = Array.isArray(outboxPayload.events) ? outboxPayload.events : [];
    }
    const requestedCase = new URLSearchParams(window.location.search).get("case");
    activeCaseId = projectCases.some((item) => item.id === requestedCase)
      ? requestedCase
      : projectCases[0].id;
  } catch (error) {
    console.warn("iSAFE Local API unavailable; using bundled demonstration cases.", error);
  }
}

function getActiveRole() {
  return roles.find((item) => item.id === activeRole) || roles[0];
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
  if (nextView === "projects") renderProjectWorkspace();
  if (nextView === "r5") renderR5Baseline();
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

function renderProjectGateMachine() {
  const target = qs("#projectGateMachine");
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
}

function renderRoleSwitcher() {
  const target = qs("#roleSwitcher");
  if (!target) return;

  target.innerHTML = roles
    .map(
      (role) => `
        <button class="role-button ${role.id === activeRole ? "active" : ""}" data-role="${role.id}" type="button">
          ${role.label}
        </button>
      `,
    )
    .join("");

  qsa(".role-button", target).forEach((button) => {
    button.addEventListener("click", () => {
      activeRole = button.dataset.role;
      renderProjectWorkspace();
    });
  });
}

function renderCaseSelect() {
  const select = qs("#caseSelect");
  if (!select) return;

  select.innerHTML = projectCases
    .map((item) => `<option value="${item.id}" ${item.id === activeCaseId ? "selected" : ""}>${item.id}</option>`)
    .join("");

  select.onchange = (event) => {
    activeCaseId = event.target.value;
    renderProjectWorkspace();
  };
}

function renderR5Baseline() {
  const events = qs("#r5Events");
  if (events) {
    events.innerHTML = r5Events
      .map(
        (event) => `
          <div class="event-card">
            <strong>${event.name}</strong>
            <span>${event.purpose}</span>
          </div>
        `,
      )
      .join("");
  }

  const paymentFlow = qs("#r5PaymentFlow");
  if (paymentFlow) {
    paymentFlow.innerHTML = r5PaymentFlow
      .map((step, index) => `<div><span>${index + 1}</span><strong>${step}</strong></div>`)
      .join("");
  }

  const canonicalIds = qs("#r5CanonicalIds");
  if (canonicalIds) {
    canonicalIds.innerHTML = [
      `<div class="canonical-summary"><strong>${r5Contract.canonicalIdCount}</strong><span>canonical IDs adopted from ${r5Contract.version}</span></div>`,
      ...r5CanonicalIds.map((id) => `<code>${id}</code>`),
    ].join("");
  }

  const boundary = qs("#r5AiBoundary");
  if (boundary) {
    boundary.innerHTML = `
      <div><strong>${r5Contract.acceptedAdr}</strong><span>R5 Accepted ADR is the highest interpretation basis.</span></div>
      <div><strong>${r5Contract.apiBase}</strong><span>All implementation-facing APIs stay under the versioned API base path.</span></div>
      <div><strong>Human Review Required</strong><span>AI Agent may recommend, summarize, and flag risk, but it must not write governance decisions or payment approvals.</span></div>
    `;
  }
}

function renderProjectR5Summary(project) {
  const target = qs("#projectR5Summary");
  if (!target) return;

  const caseEvents = outboxEvents
    .filter((event) => event.correlation_id === project.correlationId)
    .map((event) => event.event_type);
  const paymentStatus = project.paymentEligibilities.length
    ? project.paymentEligibilities.map((item) => `${item.gate_stage}:${item.status}`).join(", ")
    : "not_eligible";

  target.innerHTML = [
    ["R5 Baseline", project.schemaVersion || r5Contract.version],
    ["Accepted ADR", r5Contract.acceptedAdr],
    ["Case Version", project.version],
    ["API Base", r5Contract.apiBase],
    ["Observed Events", caseEvents.length ? caseEvents.join(" -> ") : "Awaiting outbox events"],
    ["Payment Eligibility", paymentStatus],
    ["Payment Approval", "not approved"],
    ["Payment Execution", "not executed"],
    ["AI Boundary", "recommend only; human review required"],
  ]
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderProjectWorkspace() {
  const project = getActiveCase();
  if (!project) return;
  const role = getActiveRole();
  const projectGateId = String(project.stage || "D1").split("_")[0];
  const projectGateIndex = gates.findIndex((gate) => gate.id === projectGateId);
  if (projectGateIndex >= 0) currentGate = projectGateIndex;
  setText("#projectCaseLabel", project.id);
  setText("#projectTitle", project.title);
  setText("#projectStatus", project.status);
  setText("#roleTitle", role.title);

  renderCaseSelect();
  renderRoleSwitcher();
  renderProjectGateMachine();
  renderProjectR5Summary(project);

  const detail = qs("#projectDetail");
  if (detail) {
    detail.innerHTML = [
      ["iSAFE ID", project.id],
      ["tenant_id", project.tenantId],
      ["organization_id", project.organizationId],
      ["journey_id", project.journeyId],
      ["stylematch_project_id", project.stylematchProjectId],
      ["project_id", project.projectId],
      ["handover_id", project.handoverId],
      ["correlation_id", project.correlationId],
      ["來源案件", project.sourceCase],
      ["來源系統", project.source],
      ["目前 Stage", project.stage],
      ["Gate 狀態", project.gate],
      ["RiskScore", project.risk],
      ["代理商", project.agency],
      ["設計師", project.designer],
      ["業主", project.owner],
    ]
      .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
      .join("");
  }

  const panel = qs("#permissionPanel");
  if (panel) {
    panel.innerHTML = `
      <div class="permission-notice">本地角色預覽。正式讀寫權限由 API 的 tenant context 與授權規則判定。</div>
      <div class="permission-scope">${role.scope}</div>
      <div class="permission-actions">
        ${role.actions.map((action) => `<span>${action}</span>`).join("")}
      </div>
    `;
  }

  const evidence = qs("#projectEvidence");
  if (evidence) {
    evidence.innerHTML = project.evidence
      .map((item) => `<div class="rule-item"><strong>${item}</strong><span>已納入此角色可見的監管摘要。</span></div>`)
      .join("");
  }
}

function advanceCase() {
  currentGate = Math.min(currentGate + 1, gates.length - 1);
  renderGateMachine();
  renderProjectWorkspace();
  setView("gate");
}

function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  const caseId = params.get("case");
  const role = params.get("role");

  if (projectCases.some((item) => item.id === caseId)) activeCaseId = caseId;
  if (roles.some((item) => item.id === role)) activeRole = role;
  setView(views[view] ? view : "overview");
}

async function init() {
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
  renderR5Baseline();
  await loadProjectCases();
  renderProjectWorkspace();
  initFromUrl();
}

document.addEventListener("DOMContentLoaded", init);
