const views = {
  r5: "TIGI R6.1 治理母本與 iSAFE R5.2 執行契約",
  overview: "台灣室內裝修產業治理基礎設施",
  gate: "可治理的案件狀態機",
  projects: "iSAFE 監管專案工作台",
  passport: "案件治理護照與證據鏈",
  checklist: "R6.1 Governance Registry",
  risk: "Pilot 風險指標與人工覆核邊界",
  glevel: "治理成熟度與 G-Level",
  association: "公會治理中心",
  architecture: "技術架構與 API",
  sbir: "SBIR V2.1 研發計畫",
  business: "商業模式與投資人版本",
};

const r5Contract = {
  version: "20260722_R5_2",
  acceptedAdr: "R5.2 State Machine ADR",
  documentVersion: "20260723_R6_1_Governance_Integration_RC",
  releaseId: "TIGI-GOVERNANCE-20260723-R6.1-RC",
  documentStatus: "Governance Integration Release Candidate",
  parityVersion: "20260723_R5_2_PARITY_1",
  baseline: "TIGI R6.1 Governance Integration Release Candidate",
  contractFile: "isafe-state-machine-r5.2.json",
  canonicalIdCount: 13,
  apiBase: "/api/v1",
};

const apiOrigin = window.ISAFE_CONFIG?.apiOrigin || "http://127.0.0.1:4180";
const hasConfiguredApi = Boolean(window.ISAFE_CONFIG?.apiOrigin);
const isLocalRuntime = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const forceStaticPreview = new URLSearchParams(window.location.search).get("static") === "1";
const apiEnabled = !forceStaticPreview && (hasConfiguredApi || isLocalRuntime);
const browserTraceId = `web-${globalThis.crypto?.randomUUID?.() || Date.now()}`;

function apiContextHeaders({ tenantId = "tenant_local_tigi", organizationId = "org_local_headquarter", purpose, idempotencyKey, authorize = false } = {}) {
  const headers = {
    "X-Tenant-Id": tenantId,
    "X-Organization-Id": organizationId,
    "X-Purpose": purpose || "isafe_governance_review",
    "X-Consent-Ref": "consent_local_trial",
    "X-Trace-Id": browserTraceId,
  };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  if (authorize) headers.Authorization = "Bearer local-dev-headquarter";
  return headers;
}

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
  "Contract Milestone Review",
  "Payment Eligibility",
  "Payment Approval",
  "Payment Execution",
];

const r5CanonicalIds = [
  "tenant_id",
  "organization_id",
  "user_id",
  "journey_id",
  "stylematch_project_id",
  "match_case_id",
  "project_id",
  "isafe_case_id",
  "deos_project_id",
  "handover_id",
  "ai_task_id",
  "trace_id",
  "correlation_id",
];

const gsRegistry = [
  ["TIGI-GS-01", "案件識別標準", "確保每個案件具有唯一 Project ID、流程及版本"],
  ["TIGI-GS-02", "角色責任標準", "定義業主、設計師、施工單位、審核者的責任與權限"],
  ["TIGI-GS-03", "節點進入標準", "定義進入下一步驟前必須完成的前置條件"],
  ["TIGI-GS-04", "Gate驗證標準", "規定 Gate 如何檢查文件、簽核、照片、檢核及付款條件"],
  ["TIGI-GS-05", "狀態轉換標準", "防止非法跳關，保存操作者與時間"],
  ["TIGI-GS-06", "例外處理標準", "管理 Fallback、Override、暫停與例外核准"],
  ["TIGI-GS-07", "案件資料標準", "統一案件必要欄位、代碼與資料型別"],
  ["TIGI-GS-08", "參與者與權限標準", "管理角色、授權範圍及有效期間"],
  ["TIGI-GS-09", "Artifact中繼資料標準", "規範圖說、照片、文件的來源、類型及版本"],
  ["TIGI-GS-10", "版本與變更標準", "新資料不得覆蓋舊版本，必須保留變更原因"],
  ["TIGI-GS-11", "治理事件標準", "保存誰、何時、對什麼資料、做了什麼操作及結果"],
  ["TIGI-GS-12", "交換與互通標準", "統一 API Schema、代碼、錯誤碼及交換版本"],
  ["TIGI-GS-13", "證據識別標準", "每一 Evidence 具有唯一 ID 並關聯案件、步驟及 Gate"],
  ["TIGI-GS-14", "完整性標準", "保存 SHA-256、檔案大小及完整性驗證資料"],
  ["TIGI-GS-15", "採集中繼資料標準", "保存時間、來源、裝置及可取得的 EXIF／GPS"],
  ["TIGI-GS-16", "證據鏈標準", "追蹤上傳、引用、驗證、簽核及封存歷程"],
  ["TIGI-GS-17", "簽核與見證標準", "保存簽核人、角色、意圖、時間及簽核版本"],
  ["TIGI-GS-18", "保存與封存標準", "規定保存期限、封存、Legal Hold 及刪除程序"],
  ["TIGI-GS-19", "Checklist標準", "規定檢核項目、結果、證據、檢查人及版本"],
  ["TIGI-GS-20", "不符合事項標準", "記錄缺失類型、嚴重度、責任人及改善期限"],
  ["TIGI-GS-21", "改善閉環標準", "管理改善、複驗及缺失關閉條件"],
  ["TIGI-GS-22", "風險評分標準", "規範 RiskScore 規則、權重、分數與版本"],
  ["TIGI-GS-23", "驗收與交付標準", "規範驗收範圍、缺失、簽認及交付清單"],
  ["TIGI-GS-24", "保固與結案標準", "管理保固期間、維修責任、PGP 及案件封存"],
  ["TIGI-GS-25", "合約基線治理標準", "確認工程範圍、圖說、估價、工期、付款及變更基準一致"],
  ["TIGI-GS-26", "工項與施工期別治理標準", "將個案工項配置至各期工程施工及責任角色"],
  ["TIGI-GS-27", "付款節點與資格治理標準", "規範 Gate、驗收、追加減、保留款及付款資格的關係"],
  ["TIGI-GS-28", "數位治理手冊綁定標準", "規範 24 張手冊如何綁定步驟、工項、Evidence 及 Gate Rule"],
  ["TIGI-GS-29", "AI輔助治理標準", "規範 AI 版本、輸入輸出、人工確認及專業判斷邊界"],
  ["TIGI-GS-30", "消費者旅程與資料回饋標準", "規範跨產品資料串聯與使用限制"],
].map(([registry_id, name, purpose]) => ({
  registry_id,
  name,
  purpose,
  source_status: "AUTHORITATIVE",
  governance_approval_status: "APPROVED",
  release_integration_status: "R6_1_RC",
}));

const namespaceRegistry = [
  ["TIGI-GS", "治理標準"],
  ["iSAFE-DGM", "數位治理手冊"],
  ["DGI", "治理題項"],
  ["WI", "工項"],
  ["G", "Gate 規則"],
  ["PM", "付款里程碑"],
  ["EVD", "Evidence 類型"],
  ["NCR", "不符合事項"],
  ["CAPA", "改善與預防措施"],
].map(([registry_id, scope]) => ({
  registry_id,
  scope,
  status: "R6_1_NAMESPACE_DEFINED",
}));

let gates = [
  { id: "D1", key: "D1_design_preparation", name: "前置作業", text: "確認設計需求、費用、付款方式與設計契約。" },
  { id: "D2", key: "D2_floor_plan_design", name: "平面設計規劃", text: "完成丈量、平面配置、動線與家具配置確認。" },
  { id: "D3", key: "D3_basic_design_finalization", name: "基本設計規劃定案", text: "完成色彩、天花、水電、燈光、建材與預算定案。" },
  { id: "D4", key: "D4_elevation_design_finalization", name: "立面設計定案", text: "完成各空間立面、材質與設計成果確認。" },
  { id: "D5", key: "D5_construction_detail_agreements", name: "施工大樣及其他約定事項", text: "完成施工大樣、材質表、標單與完整施工圖說。" },
  { id: "C1", key: "C1_construction_preparation", name: "前置作業", text: "確認工程契約、圖說、材料、費用與付款檢核。" },
  { id: "C2", key: "C2_phase_one_construction", name: "第一期工程施工", text: "執行第一期工項、檢核、驗收與進度證據。" },
  { id: "C3", key: "C3_phase_two_construction", name: "第二期工程施工", text: "執行第二期工項、追加減、檢核與驗收。" },
  { id: "C4", key: "C4_phase_three_construction", name: "第三期工程施工", text: "執行第三期工項、完工與交屋前檢核。" },
  { id: "C5", key: "C5_warranty_aftercare", name: "保固修繕及售後服務", text: "管理交屋、保固、修繕與售後服務紀錄。" },
];

const gateRules = [
  { label: "狀態不可跳關", text: "每個 Gate 都需要完成必要文件與檢核，才能進入下一階段。" },
  { label: "變更需留痕", text: "報價、材料、設計、工期變更都會形成可追溯紀錄。" },
  { label: "Checklist 引擎", text: "依案件階段產生檢核項目，避免靠人工記憶治理。" },
  { label: "Evidence Engine", text: "照片、文件、簽核與時間戳統一寫入 Evidence Vault。" },
  { label: "不可逆治理", text: "已核准節點保留版本，不以覆蓋方式修改歷史。" },
  { label: "Pilot 風險提示", text: "目前僅呈現本地測試指標；正式 RiskScore 須具規則版本、來源與授權角色核定。" },
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
    stage: "D1_design_preparation",
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
    stage: "D3_basic_design_finalization",
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
let legacyWorkspace = null;
let activeLegacyTab = "checklist";
let legacyStageFilter = null;
let legacyFallbackContract = null;
let legacyReadOnly = false;
let r61CanonicalContract = null;
let governanceRegistry = {
  dgm: [],
  dgi: [],
  gs: gsRegistry,
  namespaces: namespaceRegistry,
};
let activeRegistry = "dgm";
let registrySearch = "";

projectCases = projectCases.map((item, index) => ({
  ...item,
  riskAssessment: {
    value: item.risk,
    status: "pilot_unverified",
    formal: false,
    rule_version: null,
    human_confirmation: false,
  },
  schemaVersion: r5Contract.version,
  tenantId: "demo_tenant",
  organizationId: "demo_organization",
  journeyId: `demo_journey_${index + 1}`,
  stylematchProjectId: `demo_stylematch_${index + 1}`,
  projectId: `demo_project_${index + 1}`,
  handoverId: `demo_handover_${index + 1}`,
  correlationId: `demo_correlation_${index + 1}`,
  traceId: `demo_trace_${index + 1}`,
  version: 1,
  paymentEligibilities: [],
  auditLogs: [],
}));

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setText(selector, text) {
  const target = qs(selector);
  if (target) target.textContent = text;
}

function getActiveCase() {
  return projectCases.find((item) => item.id === activeCaseId) || projectCases[0];
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.length)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((value) => value.length)) rows.push(row);
  const [headers = [], ...records] = rows;
  return records.map((values) => Object.fromEntries(headers.map((header, index) => [header.replace(/^\uFEFF/, ""), values[index] || ""])));
}

async function loadR61GovernanceRegistry() {
  try {
    const [contractResponse, dgmResponse, dgiResponse] = await Promise.all([
      fetch("./contracts/tigi-canonical-r6.1.json"),
      fetch("./contracts/isafe-dgm-registry-r6.1.csv"),
      fetch("./contracts/dgi-migration-r6.1.csv"),
    ]);
    if (![contractResponse, dgmResponse, dgiResponse].every((response) => response.ok)) {
      throw new Error("One or more R6.1 registry assets could not be loaded.");
    }
    r61CanonicalContract = await contractResponse.json();
    const dgm = parseCsv(await dgmResponse.text());
    const dgi = parseCsv(await dgiResponse.text());
    const expected = r61CanonicalContract.registry_completeness;
    if (dgm.length !== expected.ISAFE_DGM.source_found || dgi.length !== expected.DGI.source_found) {
      throw new Error(`R6.1 Registry count mismatch: DGM ${dgm.length}, DGI ${dgi.length}.`);
    }
    governanceRegistry = {
      ...governanceRegistry,
      dgm,
      dgi,
    };
  } catch (error) {
    console.error("R6.1 Governance Registry could not be loaded.", error);
  }
}

async function loadStateMachine() {
  if (!apiEnabled) return;
  try {
    const response = await fetch(`${apiOrigin}/api/v1/isafe/state-machine`);
    if (!response.ok) throw new Error(`API ${response.status}`);
    const contract = await response.json();
    if (!Array.isArray(contract.stages) || contract.stages.length !== 10) throw new Error("State contract must contain ten stages.");
    r5Contract.version = contract.contract_version;
    gates = contract.stages.map((stage) => ({
      id: stage.code,
      key: stage.key,
      name: stage.name,
      text: stage.description,
      requiredEvidence: stage.required_evidence || [],
    }));
  } catch (error) {
    console.warn("iSAFE state contract unavailable; using the bundled R5.2 ten-stage registry.", error);
  }
}

async function loadLegacyFallbackContract() {
  try {
    const response = await fetch("./contracts/isafe-legacy-parity-r5.2.json");
    if (!response.ok) throw new Error(`Contract ${response.status}`);
    legacyFallbackContract = await response.json();
  } catch (error) {
    console.error("Bundled legacy parity contract could not be loaded.", error);
  }
}

function createReadOnlyLegacyWorkspace(project) {
  if (!legacyFallbackContract) return null;
  const checklist = Object.entries(legacyFallbackContract.checklists).flatMap(([stage, labels]) =>
    labels.map((label, index) => ({
      checklist_item_id: `preview-${stage}-${index + 1}`,
      stage,
      label,
      position: index + 1,
      status: "pending",
      required: true,
      source: "legacy_contract",
      completed_by: null,
      completed_at: null,
      note: null,
    })),
  );
  const milestones = legacyFallbackContract.payment_milestones.map((item) => ({
    ...item,
    milestone_id: `preview-${item.code}`,
    amount: 0,
    status: "preview",
    due_at: null,
    receipt_id: null,
  }));
  return {
    read_only: true,
    contract_version: legacyFallbackContract.contract_version,
    checklist,
    checklist_summary: {
      total: checklist.length,
      completed: 0,
      current_stage_total: checklist.filter((item) => item.stage === project.stage).length,
      current_stage_completed: 0,
    },
    baseline: {
      baseline_id: "preview-baseline",
      current_version_id: "preview-baseline-v1",
      current_version: 1,
      currency: "TWD",
      design_total: 0,
      construction_total: 0,
      contract_ref: null,
      status: "preview",
    },
    baseline_history: [{
      baseline_version_id: "preview-baseline-v1",
      version_no: 1,
      currency: "TWD",
      design_total: 0,
      construction_total: 0,
      contract_ref: null,
      status: "preview",
      reason: "GitHub Pages 靜態唯讀預覽，不代表正式案件資料。",
      created_by: "static-preview",
      created_at: "2026-07-23T00:00:00+08:00",
    }],
    milestones,
    receipts: [],
    change_orders: [],
    messages: [],
    evidence_files: [],
  };
}

async function loadProjectCases() {
  if (!apiEnabled) return;
  try {
    const previousActiveCaseId = activeCaseId;
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases`, {
      headers: apiContextHeaders({ purpose: "isafe_governance_review" }),
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
      riskAssessment: item.risk_assessment || {
        value: item.risk_score,
        status: "pilot_unverified",
        formal: false,
        rule_version: null,
        human_confirmation: false,
      },
      agency: item.agency || "尚未指派",
      designer: item.designer || "尚未指派",
      owner: item.owner || "local-admin",
      schemaVersion: item.schema_version || "20260722_R5_2",
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
      auditLogs: Array.isArray(item.audit_logs) ? item.audit_logs : [],
      evidence: Array.isArray(item.evidence) && item.evidence.length
        ? item.evidence.map((entry) => entry.evidence_type)
        : ["case_master", "timeline", "audit_log"],
    }));
    const outboxResponse = await fetch(`${apiOrigin}/api/v1/outbox-events`, {
      headers: apiContextHeaders({ purpose: "isafe_governance_review" }),
    });
    if (outboxResponse.ok) {
      const outboxPayload = await outboxResponse.json();
      outboxEvents = Array.isArray(outboxPayload.events) ? outboxPayload.events : [];
    }
    const requestedCase = new URLSearchParams(window.location.search).get("case");
    activeCaseId = projectCases.some((item) => item.id === requestedCase)
      ? requestedCase
      : projectCases.some((item) => item.id === previousActiveCaseId)
        ? previousActiveCaseId
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
  if (nextView === "projects") {
    renderProjectWorkspace();
    loadLegacyWorkspace();
  }
  if (nextView === "r5") renderR5Baseline();
  if (nextView === "checklist") renderGovernanceRegistry();
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
  setText("#currentGateLabel", current
    ? `目前：${current.id} ${current.name}`
    : currentGate >= gates.length ? "目前：治理完成／結案" : "目前：進案審查（尚未進入 D1）");
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

  select.onchange = async (event) => {
    activeCaseId = event.target.value;
    const url = new URL(window.location.href);
    url.searchParams.set("case", activeCaseId);
    window.history.replaceState({}, "", url);
    legacyWorkspace = null;
    legacyStageFilter = null;
    renderProjectWorkspace();
    await loadLegacyWorkspace();
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
      `<div class="canonical-summary"><strong>${r5Contract.canonicalIdCount}</strong><span>R6.1 canonical IDs；地端 API 已落地 11/13，match_case_id 與 deos_project_id 待補</span></div>`,
      ...r5CanonicalIds.map((id) => `<code>${id}</code>`),
    ].join("");
  }

  const boundary = qs("#r5AiBoundary");
  if (boundary) {
    boundary.innerHTML = `
      <div><strong>${r5Contract.acceptedAdr}</strong><span>R5.2 State Machine Contract is the implementation authority for iSAFE stages.</span></div>
      <div><strong>${r5Contract.documentVersion}</strong><span>R6.1 是治理整合母本 RC；不取代 R5.2 十階段執行契約。</span></div>
      <div><strong>${r5Contract.apiBase}</strong><span>All implementation-facing APIs stay under the versioned API base path.</span></div>
      <div><strong>Human Review Required</strong><span>AI Agent may recommend, summarize, and flag risk, but it must not write governance decisions or payment approvals.</span></div>
    `;
  }
}

const registryConfigurations = {
  dgm: {
    description: "24 份數位治理手冊來源已取得，尚待治理核准與正式發布整合。",
    columns: [
      ["manual_code", "DGM ID"],
      ["manual_title", "手冊名稱"],
      ["primary_step", "主要步驟"],
      ["gate_ids", "Gate"],
      ["work_item_code", "工項"],
      ["source_item_count", "題數"],
      ["source_status", "來源"],
      ["governance_approval_status", "核准"],
    ],
  },
  dgi: {
    description: "保留 DGI-001～411 legacy alias，並一對一對應階層式來源題碼。",
    columns: [
      ["legacy_id", "Legacy ID"],
      ["source_item_code", "階層式題碼"],
      ["manual_code", "DGM"],
      ["item_type", "分類"],
      ["source_number", "來源序號"],
      ["source_status", "來源"],
      ["governance_approval_status", "核准"],
    ],
  },
  gs: {
    description: "GS-01～30 已完成權威復原並納入 R6.1 RC。",
    columns: [
      ["registry_id", "GS ID"],
      ["name", "正式名稱"],
      ["purpose", "治理用途"],
      ["source_status", "來源"],
      ["governance_approval_status", "核准"],
    ],
  },
  namespaces: {
    description: "跨文件與系統統一使用九類 Registry 命名空間。",
    columns: [
      ["registry_id", "命名空間"],
      ["scope", "治理範圍"],
      ["status", "狀態"],
    ],
  },
};

function renderGovernanceRegistry() {
  const target = qs("#governanceRegistryTable");
  if (!target) return;

  const configuration = registryConfigurations[activeRegistry];
  const records = governanceRegistry[activeRegistry] || [];
  const query = registrySearch.trim().toLocaleLowerCase("zh-Hant");
  const filtered = query
    ? records.filter((record) => Object.values(record).some((value) => String(value).toLocaleLowerCase("zh-Hant").includes(query)))
    : records;

  qsa("[data-registry]").forEach((button) => {
    button.classList.toggle("active", button.dataset.registry === activeRegistry);
    button.onclick = () => {
      activeRegistry = button.dataset.registry;
      renderGovernanceRegistry();
    };
  });

  const search = qs("#registrySearch");
  if (search) {
    search.value = registrySearch;
    search.oninput = (event) => {
      registrySearch = event.target.value;
      renderGovernanceRegistry();
      qs("#registrySearch")?.focus();
    };
  }

  setText("#registryResultCount", `${filtered.length}/${records.length}`);
  setText("#registryDescription", configuration.description);

  if (!records.length) {
    target.innerHTML = `<div class="registry-empty">R6.1 Registry 資料載入中，或目前無法讀取資料檔。</div>`;
    return;
  }

  target.innerHTML = `
    <table>
      <thead>
        <tr>${configuration.columns.map(([, label]) => `<th scope="col">${label}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${filtered.map((record) => `
          <tr>${configuration.columns.map(([key]) => `<td>${escapeHtml(record[key] || "-")}</td>`).join("")}</tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderProjectR5Summary(project) {
  const target = qs("#projectR5Summary");
  if (!target) return;

  const caseEvents = outboxEvents
    .filter((event) => event.correlation_id === project.correlationId)
    .sort((left, right) => left.id - right.id)
    .map((event) => event.event_type);
  const paymentStatus = project.paymentEligibilities.length
    ? project.paymentEligibilities.map((item) => `${item.gate_stage}:${item.status}`).join(", ")
    : "not_eligible";

  target.innerHTML = [
    ["Document Master", r5Contract.documentVersion],
    ["Release ID", r5Contract.releaseId],
    ["State Contract", project.schemaVersion || r5Contract.version],
    ["Legacy Parity", legacyWorkspace?.contract_version || r5Contract.parityVersion],
    ["Accepted ADR", r5Contract.acceptedAdr],
    ["Case Version", project.version],
    ["API Base", r5Contract.apiBase],
    ["Observed Events", caseEvents.length ? caseEvents.join(" -> ") : "Awaiting outbox events"],
    ["Payment Eligibility", paymentStatus],
    ["Payment Approval", "not approved"],
    ["Payment Execution", "not executed"],
    ["Risk Status", project.riskAssessment?.formal ? "formally confirmed" : "pilot indicator; not formally confirmed"],
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
  currentGate = project.stage === "CLOSED" ? gates.length : projectGateIndex;
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
      ["Pilot 風險指標", `${project.riskAssessment?.value ?? project.risk ?? "-"} · 未經正式規則與授權角色核定`],
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

const legacyTabs = [
  ["checklist", "逐項檢核"],
  ["evidence", "文件與圖片"],
  ["finance", "合約與付款"],
  ["changes", "追加工程"],
  ["messages", "留言與歷程"],
];

function legacyHeaders(project, idempotencyKey) {
  return {
    "Content-Type": "application/json",
    ...apiContextHeaders({
      tenantId: project.tenantId,
      organizationId: project.organizationId,
      purpose: "isafe_legacy_functional_parity",
      idempotencyKey: idempotencyKey || `ui-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      authorize: true,
    }),
  };
}

async function loadLegacyWorkspace() {
  const project = getActiveCase();
  const panel = qs("#legacyPanel");
  if (!project || !panel) return;
  if (!apiEnabled) {
    legacyReadOnly = true;
    legacyWorkspace = createReadOnlyLegacyWorkspace(project);
    legacyStageFilter = gates.some((gate) => gate.key === project.stage) ? project.stage : gates[0].key;
    renderLegacyWorkspace();
    return;
  }
  panel.innerHTML = `<div class="operations-loading">載入監管資料中...</div>`;
  try {
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases/${encodeURIComponent(project.id)}/legacy`, {
      headers: apiContextHeaders({
        tenantId: project.tenantId,
        organizationId: project.organizationId,
        purpose: "isafe_legacy_functional_parity",
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `API ${response.status}`);
    legacyWorkspace = payload.workspace;
    legacyReadOnly = false;
    if (!legacyStageFilter) {
      legacyStageFilter = gates.some((gate) => gate.key === project.stage) ? project.stage : gates[0].key;
    }
    renderLegacyWorkspace();
  } catch (error) {
    legacyReadOnly = true;
    legacyWorkspace = createReadOnlyLegacyWorkspace(project);
    if (legacyWorkspace) {
      renderLegacyWorkspace();
    } else {
      qs("#legacySummary").textContent = "作業模組離線";
      panel.innerHTML = `<div class="operations-error">無法載入監管執行資料：${escapeHtml(error.message)}</div>`;
    }
  }
}

function renderLegacyWorkspace() {
  const tabs = qs("#legacyTabs");
  const panel = qs("#legacyPanel");
  const summary = qs("#legacySummary");
  if (!tabs || !panel || !legacyWorkspace) return;
  const progress = legacyWorkspace.checklist_summary;
  summary.textContent = `檢核 ${progress.completed}/${progress.total} · ${legacyWorkspace.contract_version}${legacyReadOnly ? " · 靜態唯讀預覽" : ""}`;
  tabs.innerHTML = legacyTabs.map(([id, label]) => `
    <button class="operations-tab ${activeLegacyTab === id ? "active" : ""}" data-legacy-tab="${id}" type="button" role="tab" aria-selected="${activeLegacyTab === id}">
      ${label}
    </button>
  `).join("");
  if (activeLegacyTab === "checklist") panel.innerHTML = renderChecklistPanel();
  if (activeLegacyTab === "evidence") panel.innerHTML = renderEvidencePanel();
  if (activeLegacyTab === "finance") panel.innerHTML = renderFinancePanel();
  if (activeLegacyTab === "changes") panel.innerHTML = renderChangePanel();
  if (activeLegacyTab === "messages") panel.innerHTML = renderMessagePanel();
  if (legacyReadOnly) {
    panel.insertAdjacentHTML("afterbegin", `<div class="read-only-banner"><strong>GitHub Pages 靜態唯讀預覽</strong><span>完整寫入、檔案與稽核功能需連接受保護的 iSAFE API。</span></div>`);
    qsa("form input, form textarea, form select, form button, .checklist-status", panel).forEach((control) => {
      control.disabled = true;
    });
  }
  bindLegacyActions();
}

function renderChecklistPanel() {
  const items = legacyWorkspace.checklist.filter((item) => item.stage === legacyStageFilter);
  const completed = items.filter((item) => item.status === "completed").length;
  return `
    <div class="operations-toolbar">
      <label>監管階段
        <select id="legacyStageSelect">
          ${gates.map((gate) => `<option value="${gate.key}" ${gate.key === legacyStageFilter ? "selected" : ""}>${gate.id} ${escapeHtml(gate.name)}</option>`).join("")}
        </select>
      </label>
      <div class="progress-copy"><strong>${completed}/${items.length}</strong><span>本階段完成</span></div>
      <div class="progress-track" aria-label="本階段檢核進度"><span style="width:${items.length ? Math.round(completed / items.length * 100) : 0}%"></span></div>
    </div>
    <div class="checklist-execution">
      ${items.map((item) => `
        <div class="execution-row status-${item.status}">
          <span class="execution-marker" aria-hidden="true">${item.status === "completed" ? "✓" : item.status === "exception" ? "!" : item.status === "not_applicable" ? "−" : ""}</span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <small>${item.source === "case_custom" ? "案件自訂" : "TWCID 舊站基線"}${item.completed_by ? ` · ${escapeHtml(item.completed_by)}` : ""}</small>
          </div>
          <select class="checklist-status" data-checklist-id="${item.checklist_item_id}" aria-label="${escapeHtml(item.label)}狀態">
            <option value="pending" ${item.status === "pending" ? "selected" : ""}>待檢核</option>
            <option value="completed" ${item.status === "completed" ? "selected" : ""}>完成</option>
            <option value="exception" ${item.status === "exception" ? "selected" : ""}>異常</option>
            <option value="not_applicable" ${item.status === "not_applicable" ? "selected" : ""}>不適用</option>
          </select>
        </div>
      `).join("")}
    </div>
    <form class="inline-form" id="addChecklistForm">
      <label>新增案件檢核條文<input name="label" required maxlength="160" placeholder="輸入檢核項目名稱" /></label>
      <button class="secondary-action" type="submit">新增條文</button>
    </form>
  `;
}

function renderEvidencePanel() {
  return `
    <form class="form-grid" id="evidenceUploadForm">
      <label>證據類型
        <select name="evidence_type">
          <option value="project_file">專案文件</option>
          <option value="design_contract">設計合約</option>
          <option value="construction_contract">工程合約</option>
          <option value="project_photo">現場照片</option>
          <option value="drawing">設計圖說</option>
          <option value="acceptance_record">驗收紀錄</option>
        </select>
      </label>
      <label>顯示名稱<input name="label" maxlength="120" placeholder="例如：D2 現場丈量照片" /></label>
      <label class="file-field">選擇文件或圖片<input name="file" type="file" required accept="image/*,.pdf,.txt,.doc,.docx,.xls,.xlsx" /></label>
      <button class="primary-action" type="submit">上傳證據</button>
    </form>
    <div class="data-table evidence-table">
      <div class="data-row header"><span>日期</span><span>類型／名稱</span><span>階段</span><span>檔案</span><span>動作</span></div>
      ${legacyWorkspace.evidence_files.length ? legacyWorkspace.evidence_files.map((item) => `
        <div class="data-row">
          <span>${formatDate(item.created_at)}</span>
          <span><strong>${escapeHtml(item.label || item.evidence_type)}</strong><small>${escapeHtml(item.evidence_type)}</small></span>
          <span>${escapeHtml(stageLabel(item.step_key))}</span>
          <span>${escapeHtml(item.file_name)}<small>${formatBytes(item.file_size)}</small></span>
          <span><button class="icon-action file-download" type="button" data-kind="evidence" data-file-id="${item.evidence_id}" title="下載檔案" aria-label="下載 ${escapeHtml(item.file_name)}">↓</button></span>
        </div>
      `).join("") : `<div class="empty-state">尚未上傳文件或圖片。</div>`}
    </div>
  `;
}

function renderFinancePanel() {
  const baseline = legacyWorkspace.baseline;
  const baselineHistory = legacyWorkspace.baseline_history || [];
  return `
    <div class="baseline-version-banner">
      <strong>目前合約基線 v${baseline.current_version || 1}</strong>
      <span>${escapeHtml(baseline.current_version_id || "尚未建立版本識別碼")} · 每次儲存均新增不可變版本</span>
    </div>
    <form class="form-grid finance-form" id="baselineForm">
      <label>設計總費用<input name="design_total" type="number" min="0" step="1" value="${baseline.design_total}" /></label>
      <label>工程總費用<input name="construction_total" type="number" min="0" step="1" value="${baseline.construction_total}" /></label>
      <label>合約編號<input name="contract_ref" value="${escapeHtml(baseline.contract_ref || "")}" placeholder="例如：CONTRACT-2026-001" /></label>
      <label>基線狀態
        <select name="status"><option value="draft" ${baseline.status === "draft" ? "selected" : ""}>草稿</option><option value="approved" ${baseline.status === "approved" ? "selected" : ""}>已核准</option></select>
      </label>
      <label class="wide-field">版本建立原因<input name="reason" required maxlength="240" placeholder="說明本次金額、範圍或核准狀態變更原因" /></label>
      <button class="primary-action" type="submit">建立新基線版本</button>
    </form>
    <div class="data-table baseline-history-table">
      <div class="data-row header"><span>版本</span><span>建立時間／建立者</span><span>狀態與合約</span><span>金額</span><span>建立原因</span></div>
      ${baselineHistory.map((item) => `
        <div class="data-row">
          <span><strong>v${item.version_no}</strong><small>${escapeHtml(item.baseline_version_id)}</small></span>
          <span>${formatDateTime(item.created_at)}<small>${escapeHtml(item.created_by)}</small></span>
          <span>${escapeHtml(item.status)}<small>${escapeHtml(item.contract_ref || "未填合約編號")}</small></span>
          <span>${formatMoney(item.design_total + item.construction_total)}<small>設計 ${formatMoney(item.design_total)}／工程 ${formatMoney(item.construction_total)}</small></span>
          <span>${escapeHtml(item.reason)}</span>
        </div>
      `).join("")}
    </div>
    <div class="milestone-grid">
      ${legacyWorkspace.milestones.map((item) => `
        <div class="milestone-item">
          <span>${escapeHtml(item.phase === "design" ? "設計" : "工程")} · ${item.percentage}%</span>
          <strong>${escapeHtml(item.label)}</strong>
          <b>${formatMoney(item.amount)}</b>
          <small>${escapeHtml(stageLabel(item.stage))} · ${escapeHtml(item.status)}</small>
        </div>
      `).join("")}
    </div>
    <form class="form-grid receipt-form" id="receiptForm">
      <label>付款里程碑
        <select name="milestone_id">${legacyWorkspace.milestones.map((item) => `<option value="${item.milestone_id}">${escapeHtml(item.label)} · ${formatMoney(item.amount)}</option>`).join("")}</select>
      </label>
      <label>收據標題<input name="title" required maxlength="120" placeholder="例如：設計簽約金收據" /></label>
      <label>實付金額<input name="amount" type="number" min="0" step="1" /></label>
      <label class="file-field">收據檔案<input name="file" type="file" accept="image/*,.pdf" /></label>
      <button class="secondary-action" type="submit">提交付款證明</button>
    </form>
    <div class="compact-list">
      ${legacyWorkspace.receipts.length ? legacyWorkspace.receipts.map((item) => `
        <div><strong>${escapeHtml(item.title)}</strong><span>${formatMoney(item.amount)} · ${escapeHtml(item.status)} · ${formatDate(item.created_at)}</span>${item.file_name ? `<button class="icon-action file-download" data-kind="receipts" data-file-id="${item.receipt_id}" type="button" title="下載收據" aria-label="下載收據">↓</button>` : ""}</div>
      `).join("") : `<div class="empty-state">尚無付款證明。</div>`}
    </div>
  `;
}

function renderChangePanel() {
  return `
    <form class="form-grid" id="changeOrderForm">
      <label>追加工程名稱<input name="title" required maxlength="120" placeholder="例如：客廳追加插座" /></label>
      <label>追加金額<input name="amount_delta" type="number" step="1" value="0" /></label>
      <label>工期增減天數<input name="schedule_delta_days" type="number" step="1" value="0" /></label>
      <label class="wide-field">原因<textarea name="reason" required maxlength="800" placeholder="說明需求、責任與影響"></textarea></label>
      <button class="primary-action" type="submit">提出追加工程</button>
    </form>
    <div class="data-table change-table">
      <div class="data-row header"><span>日期</span><span>項目</span><span>金額</span><span>工期</span><span>狀態</span></div>
      ${legacyWorkspace.change_orders.length ? legacyWorkspace.change_orders.map((item) => `
        <div class="data-row">
          <span>${formatDate(item.created_at)}</span>
          <span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.reason)}</small></span>
          <span>${formatMoney(item.amount_delta)}</span>
          <span>${item.schedule_delta_days >= 0 ? "+" : ""}${item.schedule_delta_days} 天</span>
          <span>${escapeHtml(item.status)}</span>
        </div>
      `).join("") : `<div class="empty-state">尚無追加工程紀錄。</div>`}
    </div>
  `;
}

function renderMessagePanel() {
  const project = getActiveCase();
  return `
    <form class="message-compose" id="messageForm">
      <select name="category" aria-label="訊息類型">
        <option value="message">案件留言</option>
        <option value="question">我要提問</option>
        <option value="dispute">爭議諮詢</option>
      </select>
      <textarea name="body" required maxlength="1200" placeholder="輸入案件留言或問題"></textarea>
      <button class="primary-action" type="submit">送出</button>
    </form>
    <div class="timeline-columns">
      <section>
        <h3>案件對話</h3>
        <div class="timeline-list">${legacyWorkspace.messages.length ? legacyWorkspace.messages.map((item) => `
          <div><span>${escapeHtml(item.category)}</span><strong>${escapeHtml(item.actor_role)} · ${escapeHtml(item.actor)}</strong><p>${escapeHtml(item.body)}</p><time>${formatDateTime(item.created_at)}</time></div>
        `).join("") : `<div class="empty-state">尚無案件留言。</div>`}</div>
      </section>
      <section>
        <h3>治理歷程</h3>
        <div class="timeline-list">${project.auditLogs?.length ? project.auditLogs.map((item) => `
          <div><span>${escapeHtml(item.action)}</span><strong>${escapeHtml(item.actor)}</strong><p>${escapeHtml(item.detail || "")}</p><time>${formatDateTime(item.created_at)}</time></div>
        `).join("") : `<div class="empty-state">尚無治理歷程。</div>`}</div>
      </section>
    </div>
  `;
}

function bindLegacyActions() {
  qsa(".operations-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeLegacyTab = button.dataset.legacyTab;
      renderLegacyWorkspace();
    });
  });
  const stageSelect = qs("#legacyStageSelect");
  if (stageSelect) stageSelect.addEventListener("change", () => {
    legacyStageFilter = stageSelect.value;
    renderLegacyWorkspace();
  });
  qsa(".checklist-status").forEach((select) => select.addEventListener("change", async () => {
    await runLegacyAction(`checklist/${encodeURIComponent(select.dataset.checklistId)}/status`, { status: select.value, actor: "local-admin" });
  }));
  const addChecklistForm = qs("#addChecklistForm");
  if (addChecklistForm) addChecklistForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLegacyAction("checklist", { stage: legacyStageFilter, label: addChecklistForm.elements.label.value, actor: "local-admin" });
  });
  const evidenceForm = qs("#evidenceUploadForm");
  if (evidenceForm) evidenceForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = evidenceForm.elements.file.files[0];
    if (!file) return;
    await runLegacyAction("evidence-files", {
      evidence_type: evidenceForm.elements.evidence_type.value,
      label: evidenceForm.elements.label.value || file.name,
      file_name: file.name,
      mime_type: file.type || "application/octet-stream",
      content_base64: await fileToBase64(file),
      step_key: legacyStageFilter || getActiveCase().stage,
      actor: "local-admin",
    });
  });
  const baselineForm = qs("#baselineForm");
  if (baselineForm) baselineForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLegacyAction("contract-baseline", {
      design_total: Number(baselineForm.elements.design_total.value),
      construction_total: Number(baselineForm.elements.construction_total.value),
      contract_ref: baselineForm.elements.contract_ref.value,
      status: baselineForm.elements.status.value,
      reason: baselineForm.elements.reason.value,
      actor: "local-admin",
    });
  });
  const receiptForm = qs("#receiptForm");
  if (receiptForm) receiptForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = receiptForm.elements.file.files[0];
    await runLegacyAction("receipts", {
      milestone_id: receiptForm.elements.milestone_id.value,
      title: receiptForm.elements.title.value,
      amount: Number(receiptForm.elements.amount.value),
      file_name: file?.name || null,
      mime_type: file?.type || null,
      content_base64: file ? await fileToBase64(file) : null,
      actor: "local-admin",
    });
  });
  const changeForm = qs("#changeOrderForm");
  if (changeForm) changeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLegacyAction("change-orders", {
      title: changeForm.elements.title.value,
      reason: changeForm.elements.reason.value,
      amount_delta: Number(changeForm.elements.amount_delta.value),
      schedule_delta_days: Number(changeForm.elements.schedule_delta_days.value),
      actor: "local-admin",
    });
  });
  const messageForm = qs("#messageForm");
  if (messageForm) messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLegacyAction("messages", {
      category: messageForm.elements.category.value,
      body: messageForm.elements.body.value,
      actor: "local-admin",
      actor_role: activeRole,
    });
  });
  qsa(".file-download").forEach((button) => button.addEventListener("click", () => {
    downloadLegacyFile(button.dataset.kind, button.dataset.fileId);
  }));
}

async function runLegacyAction(action, body) {
  const project = getActiveCase();
  const panel = qs("#legacyPanel");
  panel.classList.add("is-busy");
  try {
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases/${encodeURIComponent(project.id)}/legacy/${action}`, {
      method: "POST",
      headers: legacyHeaders(project),
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `API ${response.status}`);
    legacyWorkspace = payload.workspace;
    activeCaseId = project.id;
    const url = new URL(window.location.href);
    url.searchParams.set("case", activeCaseId);
    window.history.replaceState({}, "", url);
    await loadProjectCases();
    renderProjectWorkspace();
    renderLegacyWorkspace();
  } catch (error) {
    window.alert(`作業未完成。${error.message}`);
  } finally {
    panel.classList.remove("is-busy");
  }
}

async function downloadLegacyFile(kind, id) {
  const project = getActiveCase();
  try {
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases/${encodeURIComponent(project.id)}/legacy/${kind}/${encodeURIComponent(id)}/file`, {
      headers: apiContextHeaders({
        tenantId: project.tenantId,
        organizationId: project.organizationId,
        purpose: "isafe_evidence_download",
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `API ${response.status}`);
    const link = document.createElement("a");
    link.href = `data:${payload.file.mime_type || "application/octet-stream"};base64,${payload.file.content_base64}`;
    link.download = payload.file.file_name || "isafe-file";
    link.click();
  } catch (error) {
    window.alert(`檔案無法下載。${error.message}`);
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function stageLabel(stageKey) {
  const gate = gates.find((item) => item.key === stageKey);
  return gate ? `${gate.id} ${gate.name}` : stageKey || "-";
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function formatDate(value) {
  return value ? new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value)) : "-";
}

function formatDateTime(value) {
  return value ? new Intl.DateTimeFormat("zh-TW", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value)) : "-";
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function advanceCase() {
  const project = getActiveCase();
  const button = qs("#demoCycleBtn");
  if (!project || !button) return;
  button.disabled = true;
  button.textContent = project.stage === "INTAKE_pending" ? "核准進入治理中..." : "Gate 驗證中...";
  const route = project.stage === "INTAKE_pending"
    ? "governance/start"
    : "gates/evaluate";
  const body = project.stage === "INTAKE_pending"
    ? { expected_version: project.version, actor: "local-admin", actor_role: activeRole, reason: "Direct intake approved for D1 design preparation" }
    : { expected_version: project.version, actor: "local-admin", actor_role: activeRole, outcome: "Passed", reason: "Evidence reviewed in project workspace" };
  try {
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases/${encodeURIComponent(project.id)}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...apiContextHeaders({
          tenantId: project.tenantId,
          organizationId: project.organizationId,
          purpose: "isafe_governance_decision",
          idempotencyKey: `ui-${project.id}-${project.version}-${route.replace("/", "-")}`,
          authorize: true,
        }),
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) {
      const missing = result.details?.missing_evidence;
      throw new Error(missing?.length ? `尚缺必要證據：${missing.join("、")}` : result.message || `API ${response.status}`);
    }
    await loadProjectCases();
    renderGateMachine();
    renderProjectWorkspace();
    await loadLegacyWorkspace();
    setView("projects");
  } catch (error) {
    window.alert(`案件未推進。${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = "案件推進";
  }
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
  if (demoCycleBtn) {
    if (apiEnabled) {
      demoCycleBtn.addEventListener("click", advanceCase);
    } else {
      demoCycleBtn.disabled = true;
      demoCycleBtn.textContent = "靜態預覽";
      demoCycleBtn.title = "案件推進需連接受保護的 iSAFE API";
    }
  }

  const printBtn = qs("#printBtn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  await Promise.all([
    loadLegacyFallbackContract(),
    loadR61GovernanceRegistry(),
  ]);
  await loadStateMachine();
  renderGateMachine();
  renderGateRules();
  renderAuditRows();
  renderPassportChecks();
  renderRiskBars();
  renderLevels();
  renderR5Baseline();
  renderGovernanceRegistry();
  await loadProjectCases();
  renderProjectWorkspace();
  initFromUrl();
  await loadLegacyWorkspace();
}

document.addEventListener("DOMContentLoaded", init);
