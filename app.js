const views = {
  home: "iSAFE 2.0 設計與工程治理系統",
  workbench: "我的案件工作台",
  help: "iSAFE 2.0 使用說明",
  fieldEvidence: "現場證據與 External Evidence Provider",
  knowledge: "TIGI Governance Knowledge",
  governance: "R9 Patent V7 Governance Objects",
  r5: "TIGI R9 / Patent V7 治理母本與 iSAFE R5.2 執行契約",
  overview: "台灣室內裝修產業治理基礎設施",
  gate: "可治理的案件狀態機",
  projects: "iSAFE 監管專案工作台",
  passport: "案件治理護照與證據鏈",
  checklist: "R9 Governance Registry",
  risk: "Pilot 風險指標與人工覆核邊界",
  glevel: "治理成熟度與 G-Level",
  association: "公會治理中心",
  architecture: "技術架構與 API",
  business: "商業模式與投資人版本",
};

const r5Contract = {
  version: "20260722_R5_2",
  acceptedAdr: "R5.2 State Machine ADR",
  documentVersion: "20260814_R9_Patent_V7",
  releaseId: "TIGI-GOVERNANCE-20260814-R9-PATENT-V7",
  documentStatus: "Implementation QA Baseline · Final Official NO GO",
  parityVersion: "20260723_R5_2_PARITY_1",
  baseline: "TIGI R9 / Patent V7 Governance Alignment Baseline",
  contractFile: "isafe-state-machine-r5.2.json",
  canonicalIdCount: 13,
  apiBase: "/api/v1",
};

const hasConfiguredApi = Boolean(window.ISAFE_CONFIG?.apiOrigin);
const isLocalRuntime = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const localApiOverride = isLocalRuntime ? new URLSearchParams(window.location.search).get("apiOrigin") : null;
const apiOrigin = window.ISAFE_CONFIG?.apiOrigin || localApiOverride || "http://127.0.0.1:4180";
const forceStaticPreview = new URLSearchParams(window.location.search).get("static") === "1";
const apiEnabled = !forceStaticPreview && (hasConfiguredApi || isLocalRuntime);
const browserTraceId = `web-${globalThis.crypto?.randomUUID?.() || Date.now()}`;

function apiContextHeaders({ tenantId = "tenant_local_tigi", organizationId = "org_local_headquarter", purpose, idempotencyKey, authorize = false, identity } = {}) {
  const headers = {
    "X-Tenant-Id": tenantId,
    "X-Organization-Id": organizationId,
    "X-Purpose": purpose || "isafe_governance_review",
    "X-Consent-Ref": "consent_local_trial",
    "X-Trace-Id": browserTraceId,
    "X-Server-Role": "headquarter",
    "X-Case-Authorization": "*",
  };
  if (identity) {
    headers["X-User-Id"] = identity.userId;
    headers["X-Member-Tier"] = identity.memberTier;
    headers["X-Case-Role"] = identity.caseRole;
    if (identity.certifiedMemberType) headers["X-Certified-Member-Type"] = identity.certifiedMemberType;
  }
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
  { id: "C1", key: "C1_construction_preparation", name: "前置作業", text: "確認工程契約、圖說、材料、費用與付款檢核；追加減可於 C1-C5 任一工程階段提出。" },
  { id: "C2", key: "C2_phase_one_construction", name: "第一期工程施工", text: "執行第一期工項、檢核、驗收與進度證據；如有追加減須於本階段登錄。" },
  { id: "C3", key: "C3_phase_two_construction", name: "第二期工程施工", text: "執行第二期工項、檢核與驗收；如有追加減須於本階段登錄。" },
  { id: "C4", key: "C4_phase_three_construction", name: "第三期工程施工", text: "執行第三期工項、完工與交屋前檢核；如有追加減須於本階段登錄。" },
  { id: "C5", key: "C5_warranty_aftercare", name: "保固修繕及售後服務", text: "管理交屋、保固、修繕與售後服務紀錄；如有追加減須於本階段登錄。" },
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
    memberTier: "headquarter",
    caseRole: "reviewer",
    userId: "local-headquarter",
    allowedViews: Object.keys(views),
    capabilities: ["checklist_add", "baseline", "evidence", "change_order", "message"],
  },
  {
    id: "dealer",
    label: "經銷／代理商",
    title: "經銷／代理商視圖",
    scope: "轄下案件、設計師進度、待補文件與 RiskScore",
    actions: ["追蹤轄下案件", "催補資料", "初審 Gate", "查看代理商 KPI"],
    memberTier: "dealer",
    caseRole: "case_coordinator",
    userId: "local-dealer",
    allowedViews: ["overview", "gate", "projects", "fieldEvidence", "passport", "knowledge", "risk", "glevel", "business"],
    capabilities: ["checklist_add", "baseline", "evidence", "change_order", "message"],
  },
  {
    id: "association",
    label: "公會",
    title: "公會視圖",
    scope: "爭議、評鑑、調處、PGP 與稽核 Evidence",
    actions: ["查看爭議紀錄", "建立調處意見", "審閱 PGP", "標記評鑑結果"],
    memberTier: "association",
    caseRole: "mediator",
    userId: "local-association",
    allowedViews: ["overview", "projects", "fieldEvidence", "passport", "knowledge", "risk", "glevel", "association"],
    capabilities: ["message"],
  },
  {
    id: "certified_designer",
    label: "認證設計師",
    title: "認證設計師視圖",
    scope: "本人案件、交付物、文件上傳與 Gate 待辦",
    actions: ["上傳文件", "回覆待辦", "查看 Gate 狀態", "提交變更說明"],
    memberTier: "certified_member",
    certifiedMemberType: "designer",
    caseRole: "case_designer",
    userId: "local-certified-designer",
    confirmationParty: "certified_member",
    allowedViews: ["overview", "gate", "projects", "fieldEvidence", "passport", "risk", "glevel"],
    capabilities: ["checklist_add", "checklist_confirm", "evidence", "change_order", "message"],
  },
  {
    id: "certified_vendor",
    label: "認證工程商",
    title: "認證工程商視圖",
    scope: "本人案件、施工交付、現場證據與檢核待辦",
    actions: ["上傳施工證據", "完成檢核", "查看 Gate 狀態", "提交工程變更"],
    memberTier: "certified_member",
    certifiedMemberType: "vendor",
    caseRole: "case_vendor",
    userId: "local-certified-vendor",
    confirmationParty: "certified_member",
    allowedViews: ["overview", "gate", "projects", "fieldEvidence", "passport", "risk", "glevel"],
    capabilities: ["checklist_add", "checklist_confirm", "evidence", "change_order", "message"],
  },
  {
    id: "general_member",
    label: "一般會員／業主",
    title: "一般會員／業主視圖",
    scope: "本人專案、工程進度、確認事項與 PGP 摘要",
    actions: ["確認需求", "查看進度", "下載 PGP 摘要", "提出問題"],
    memberTier: "general_member",
    caseRole: "case_owner",
    userId: "local-owner",
    confirmationParty: "owner",
    allowedViews: ["overview", "projects", "passport"],
    capabilities: ["checklist_confirm", "receipt", "change_order", "message"],
  },
];

roles.forEach((role) => {
  if (!role.allowedViews.includes("home")) role.allowedViews.unshift("home");
  if (!role.allowedViews.includes("workbench")) role.allowedViews.unshift("workbench");
  if (!role.allowedViews.includes("help")) role.allowedViews.push("help");
});

let projectCases = [
  {
    id: "IS-2026-0001",
    title: "SM-2026-0002 iSAFE 監管專案",
    sourceCase: "SM-2026-0002",
    source: "StyleMatchAI",
    caseMode: "design_build",
    siteAddress: "台北市信義區（展示資料）",
    siteType: "中古住宅",
    floorAreaPing: 28,
    ownerPhone: "09**-***-168",
    vendor: "尚未指派認證工程會員",
    contractRef: "IS-CONTRACT-2026-0001",
    contractScope: "室內設計、木作、水電與完工驗收",
    plannedStartDate: "2026-09-15",
    plannedCompletionDate: "2027-01-20",
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
    caseMode: "design_only",
    siteAddress: "新北市板橋區（展示資料）",
    siteType: "新成屋",
    floorAreaPing: 22,
    ownerPhone: "09**-***-526",
    vendor: "不適用（純設計案件）",
    contractRef: "IS-DESIGN-2026-0002",
    contractScope: "平面配置、基本設計、立面與施工圖說交付",
    plannedStartDate: "2026-08-30",
    plannedCompletionDate: "2026-11-15",
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
let selectedCaseMode = "";
let activeLegacyTab = "case";
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
let activeRegistry = "namespaces";
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

const caseModeMeta = {
  design_only: {
    label: "純設計",
    flow: "需求確認 → 設計提案 → 圖面定案 → 設計交付",
    note: "完成設計成果與交付紀錄後結案，不建立施工階段。",
  },
  construction_only: {
    label: "直接工程",
    flow: "圖面／範圍確認 → 報價與契約 → 施工查驗 → 驗收結案",
    note: "適用單項、簡易工程或已有可施工圖面的案件。",
  },
  design_build: {
    label: "設計＋工程",
    flow: "需求確認 → 設計定案 → 工程契約 → 施工查驗 → 驗收結案",
    note: "設計成果經確認後，才建立工程階段與施工治理紀錄。",
  },
};

function getCaseMode(project, index = 0) {
  if (project.caseMode && caseModeMeta[project.caseMode]) return project.caseMode;
  if (String(project.stage || "").startsWith("C")) return "construction_only";
  return index === 0 ? "design_build" : "design_only";
}

function getCaseGates(project) {
  const mode = getCaseMode(project, Math.max(0, projectCases.findIndex((item) => item.id === project?.id)));
  if (mode === "design_only") return gates.filter((gate) => gate.id.startsWith("D"));
  if (mode === "construction_only") return gates.filter((gate) => gate.id.startsWith("C"));
  return gates;
}

function isCaseStage(project, stageKey) {
  return getCaseGates(project).some((gate) => gate.key === stageKey);
}

function getWorkbenchTasks(role, project) {
  const common = [
    { label: "確認目前階段待辦", detail: `${project.id} · ${String(project.stage || "D1").split("_")[0]}`, view: "projects" },
  ];
  const roleTasks = {
    headquarter: [
      { label: "覆核案件 Gate 與必要證據", detail: "2 件待確認", view: "projects" },
      { label: "查看現場缺失與改善期限", detail: "1 件需追蹤", view: "fieldEvidence" },
    ],
    dealer: [
      { label: "催補設計確認文件", detail: "今天到期", view: "projects" },
      { label: "檢查代理案件進度", detail: "2 件進行中", view: "projects" },
    ],
    association: [
      { label: "查看爭議與調處紀錄", detail: "無逾期案件", view: "association" },
      { label: "抽查案件治理護照", detail: "本週 2 件", view: "passport" },
    ],
    certified_designer: [
      { label: "上傳設計圖面修訂", detail: "D3 定案前", view: "projects" },
      { label: "回覆業主設計確認", detail: "1 則新留言", view: "projects" },
    ],
    certified_vendor: [
      { label: "上傳今日施工照片", detail: "建立不可變原始紀錄", view: "fieldEvidence" },
      { label: "提交工項查驗結果", detail: "1 個工項待完成", view: "projects" },
    ],
    general_member: [
      { label: "確認設計需求與範圍", detail: "需要你的確認", view: "projects" },
      { label: "查看最新圖面與留言", detail: "1 份新文件", view: "passport" },
    ],
  };
  return [...common, ...(roleTasks[role.id] || roleTasks.general_member)];
}

function renderGlobalRoleSelect() {
  const select = qs("#globalRoleSelect");
  if (!select) return;
  select.innerHTML = roles
    .map((role) => `<option value="${role.id}" ${role.id === activeRole ? "selected" : ""}>${role.label}</option>`)
    .join("");
  select.onchange = async (event) => {
    activeRole = event.target.value;
    legacyWorkspace = null;
    legacyStageFilter = null;
    const currentView = qs(".view.active")?.id || "workbench";
    setView(currentView);
    renderProjectWorkspace();
    await loadLegacyWorkspace();
  };
}

function renderWorkbench() {
  const project = getActiveCase();
  const role = getActiveRole();
  if (!project) return;
  renderGlobalRoleSelect();
  setText("#workbenchCaseCount", `${projectCases.length} 件`);

  const projectsTarget = qs("#workbenchProjects");
  if (projectsTarget) {
    projectsTarget.innerHTML = projectCases.map((item, index) => {
      const mode = getCaseMode(item, index);
      const modeMeta = caseModeMeta[mode];
      const gateId = String(item.stage || "D1").split("_")[0];
      const gate = gates.find((entry) => entry.id === gateId);
      const gateIndex = Math.max(0, gates.findIndex((entry) => entry.id === gateId));
      const progress = Math.max(12, Math.min(96, Math.round(((gateIndex + 1) / gates.length) * 100)));
      return `
        <article class="workbench-project ${item.id === activeCaseId ? "current" : ""}">
          <div class="project-card-head">
            <div><span class="case-mode-tag ${mode}">${modeMeta.label}</span><strong>${escapeHtml(item.title)}</strong></div>
            <span class="project-id">${escapeHtml(item.id)}</span>
          </div>
          <div class="project-stage-row"><span>目前階段</span><strong>${escapeHtml(gate ? `${gate.id} ${gate.name}` : item.stage)}</strong></div>
          <div class="project-progress" aria-label="案件進度 ${progress}%"><span style="width:${progress}%"></span></div>
          <div class="project-card-footer">
            <small>${escapeHtml(item.designer || "尚未指派設計師")} · ${escapeHtml(item.agency || "直營案件")}</small>
            <button class="secondary-action" type="button" data-continue-case="${escapeHtml(item.id)}">繼續處理 →</button>
          </div>
        </article>`;
    }).join("");
    qsa("[data-continue-case]", projectsTarget).forEach((button) => {
      button.addEventListener("click", async () => {
        activeCaseId = button.dataset.continueCase;
        legacyWorkspace = null;
        legacyStageFilter = null;
        renderProjectWorkspace();
        setView("projects");
        await loadLegacyWorkspace();
      });
    });
  }

  const tasks = getWorkbenchTasks(role, project);
  setText("#workbenchTaskCount", tasks.length);
  const tasksTarget = qs("#workbenchTasks");
  if (tasksTarget) {
    tasksTarget.innerHTML = tasks.map((task, index) => `
      <button type="button" data-task-view="${task.view}">
        <span class="task-status ${index === 0 ? "urgent" : ""}" aria-hidden="true"></span>
        <span><strong>${escapeHtml(task.label)}</strong><small>${escapeHtml(task.detail)}</small></span>
        <span aria-hidden="true">›</span>
      </button>`).join("");
    qsa("[data-task-view]", tasksTarget).forEach((button) => button.addEventListener("click", () => setView(button.dataset.taskView)));
  }
}

function setupWorkbench() {
  const creator = qs("#caseCreator");
  const openCreator = () => {
    if (!creator) return;
    creator.hidden = false;
    creator.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const closeCreator = () => {
    if (!creator) return;
    creator.hidden = true;
  };
  qs("#openCaseCreatorBtn")?.addEventListener("click", openCreator);
  qs("#closeCaseCreatorBtn")?.addEventListener("click", closeCreator);
  qs("#cancelCaseCreatorBtn")?.addEventListener("click", closeCreator);

  qsa("[data-case-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCaseMode = button.dataset.caseMode;
      qsa("[data-case-mode]").forEach((option) => {
        const selected = option.dataset.caseMode === selectedCaseMode;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-checked", String(selected));
      });
      const meta = caseModeMeta[selectedCaseMode];
      qs("#caseModeResult").innerHTML = `<strong>${meta.label}</strong><span>${meta.flow}</span><small>${meta.note}</small>`;
      qs("#previewCaseFlowBtn").disabled = false;
    });
  });
  qs("#previewCaseFlowBtn")?.addEventListener("click", () => {
    if (!selectedCaseMode) return;
    const meta = caseModeMeta[selectedCaseMode];
    qs("#caseModeResult").innerHTML = `<strong>展示流程：${meta.label}</strong><span>${meta.flow}</span><small>正式建立時才會產生案件 ID；此展示不寫入治理狀態。</small>`;
  });
  qsa("[data-open-view]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.openView)));
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
    const [releaseResponse, contractResponse, dgmResponse, dgiResponse] = await Promise.all([
      fetch("./contracts/tigi-r9-patent-v7-alignment.json"),
      fetch("./contracts/tigi-canonical-r6.1.json"),
      fetch("./contracts/isafe-dgm-registry-r6.1.csv"),
      fetch("./contracts/dgi-migration-r6.1.csv"),
    ]);
    if (![releaseResponse, contractResponse, dgmResponse, dgiResponse].every((response) => response.ok)) {
      throw new Error("One or more R9 alignment or carry-forward registry assets could not be loaded.");
    }
    const r7ReleaseContract = await releaseResponse.json();
    r61CanonicalContract = await contractResponse.json();
    if (r7ReleaseContract.version !== r5Contract.documentVersion || r7ReleaseContract.release_id !== r5Contract.releaseId) {
      throw new Error("R9 release metadata does not match the website runtime.");
    }
    const dgm = parseCsv(await dgmResponse.text());
    const dgi = parseCsv(await dgiResponse.text());
    const expected = r61CanonicalContract.registry_completeness;
    if (dgm.length !== expected.ISAFE_DGM.source_found || dgi.length !== expected.DGI.source_found) {
      throw new Error(`R8 Registry count mismatch: DGM ${dgm.length}, DGI ${dgi.length}.`);
    }
    governanceRegistry = {
      ...governanceRegistry,
      dgm,
      dgi,
    };
  } catch (error) {
    console.error("R8 Governance Registry could not be loaded.", error);
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
  const currentStageIndex = gates.findIndex((gate) => gate.key === project.stage);
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
      aggregate_status: "pending",
      stage_locked: currentStageIndex >= 0 && gates.findIndex((gate) => gate.key === stage) < currentStageIndex,
      confirmations: {
        certified_member: { status: "pending", version: 1 },
        owner: { status: "pending", version: 1 },
      },
    })),
  );
  const milestones = legacyFallbackContract.payment_milestones.map((item) => ({
    ...item,
    milestone_id: `preview-${item.code}`,
    amount: 0,
    status: "pending",
    due_at: null,
    receipt_id: null,
    stage_locked: currentStageIndex >= 0 && gates.findIndex((gate) => gate.key === item.stage) < currentStageIndex,
    confirmations: {
      certified_member: { status: "pending", version: 1 },
      owner: { status: "pending", version: 1 },
    },
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
    execution_checklist_baseline: {
      status: "draft",
      certified_member_confirmed_at: null,
      owner_confirmed_at: null,
      frozen_at: null,
      version: 1,
    },
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
      headers: apiContextHeaders({ purpose: "isafe_governance_review", identity: getActiveRole() }),
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
      caseMode: item.case_mode || item.execution_mode,
      siteAddress: item.site_address,
      siteType: item.site_type,
      floorAreaPing: item.floor_area_ping,
      ownerPhone: item.owner_phone,
      vendor: item.vendor || item.certified_vendor,
      contractRef: item.contract_ref,
      contractScope: item.contract_scope,
      plannedStartDate: item.planned_start_date,
      plannedCompletionDate: item.planned_completion_date,
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
      headers: apiContextHeaders({ purpose: "isafe_governance_review", identity: getActiveRole() }),
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

function canUse(capability) {
  return getActiveRole().capabilities.includes(capability);
}

function updateNavigationAccess() {
  const role = getActiveRole();
  qsa(".nav-item").forEach((button) => {
    const allowed = role.allowedViews.includes(button.dataset.view);
    button.hidden = !allowed;
    button.setAttribute("aria-hidden", String(!allowed));
  });
}

function setView(viewId) {
  const role = getActiveRole();
  const requestedView = views[viewId] ? viewId : "workbench";
  const nextView = role.allowedViews.includes(requestedView) ? requestedView : role.allowedViews[0];
  updateNavigationAccess();
  document.body.classList.toggle("public-home", nextView === "home");

  qsa(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === nextView);
  });

  qsa(".view").forEach((view) => {
    view.classList.toggle("active", view.id === nextView);
  });

  setText("#view-title", views[nextView]);
  if (nextView === "home") renderGlobalRoleSelect();
  if (nextView === "workbench") renderWorkbench();
  const advanceButton = qs("#demoCycleBtn");
  if (advanceButton) advanceButton.hidden = nextView !== "projects" || !["headquarter", "dealer"].includes(role.memberTier);
  if (nextView === "projects") {
    renderProjectWorkspace();
    loadLegacyWorkspace();
  }
  if (nextView === "r5") renderR5Baseline();
  if (nextView === "checklist") renderGovernanceRegistry();
  if (nextView === "fieldEvidence") loadFieldEvidence();
  if (nextView === "knowledge") loadKnowledgeIndex();
  if (nextView === "governance") loadR9GovernanceObjects();
}

function setupDirectIntake() {
  const panel = qs("#directIntakePanel");
  const form = qs("#directIntakeForm");
  const status = qs("#directIntakeStatus");
  const open = () => { panel.hidden = false; panel.scrollIntoView({ behavior: "smooth", block: "start" }); };
  qs("#startDirectIntakeBtn")?.addEventListener("click", open);
  qs("#closeDirectIntakeBtn")?.addEventListener("click", () => { panel.hidden = true; });
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = qs("#submitDirectIntakeBtn");
    const data = new FormData(form);
    const ownerIdentity = roles.find((item) => item.id === "general_member");
    const payload = {
      title: String(data.get("title") || "").trim(),
      applicant_name: String(data.get("applicant_name") || "").trim(),
      contact: `${String(data.get("phone") || "").trim()} / ${String(data.get("email") || "").trim()}`,
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      site_address: String(data.get("site_address") || "").trim(),
      case_mode: String(data.get("case_mode") || ""),
      floor_area_ping: Number(data.get("floor_area_ping")) || null,
      case_description: String(data.get("case_description") || "").trim(),
      consent_at: new Date().toISOString(),
    };
    button.disabled = true; status.textContent = "正在建立待受理案件..."; status.classList.remove("error");
    try {
      if (!apiEnabled) throw new Error("本機 iSAFE API 尚未啟動，請先啟動 4180 服務。");
      const response = await fetch(`${apiOrigin}/api/v1/isafe/direct-intakes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...apiContextHeaders({ purpose: "isafe_direct_intake", idempotencyKey: `web-intake-${globalThis.crypto?.randomUUID?.() || Date.now()}`, authorize: true, identity: ownerIdentity }) },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `API ${response.status}`);
      status.textContent = `立案申請完成：${result.case.isafe_case_id}，正在進入案件工作台。`;
      await loadProjectCases();
      activeCaseId = result.case.isafe_case_id;
      const url = new URL(window.location.href); url.searchParams.set("view", "projects"); url.searchParams.set("case", activeCaseId); window.history.replaceState({}, "", url);
      renderProjectWorkspace(); setView("projects"); await loadLegacyWorkspace();
    } catch (error) { status.textContent = `送出失敗：${error.message}`; status.classList.add("error"); }
    finally { button.disabled = false; }
  });
}

async function fieldEvidenceApi(path, { method = "GET", body } = {}) {
  if (!apiEnabled) throw new Error("本機 API 尚未啟動");
  const write = method !== "GET";
  const response = await fetch(`${apiOrigin}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...apiContextHeaders({ purpose: "field_evidence_management", identity: getActiveRole(), authorize: write, idempotencyKey: write ? `field-${globalThis.crypto?.randomUUID?.() || Date.now()}` : undefined }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || `API ${response.status}`);
  return payload;
}

function fieldValue(id) { return qs(`#${id}`)?.value.trim() || ""; }
function setFieldEvidenceStatus(message, error = false) { const target = qs("#fieldEvidenceStatus"); if (target) { target.textContent = message; target.classList.toggle("warning", error); } }

function renderFieldRequirements(requirements) {
  const target = qs("#fieldRequirementList"); if (!target) return;
  target.innerHTML = requirements.length ? `<div class="field-evidence-list">${requirements.map((item) => `<div class="field-evidence-row"><div><strong>${escapeHtml(item.requirement_id)}</strong><small>${escapeHtml(item.description || "未填說明")}</small></div><div><span>${escapeHtml(item.step_id)}</span><small>${escapeHtml(item.evidence_type)}</small></div><div><span>${item.required_flag ? "必要" : "選配"}</span><small>${escapeHtml(item.status)}</small></div><span class="field-evidence-boundary">${escapeHtml(item.requirement_version)}</span></div>`).join("")}</div>` : '<p class="empty-state">尚未建立需求。</p>';
}

function renderFieldPackages(packages) {
  const target = qs("#fieldPackageList"); if (!target) return;
  target.innerHTML = packages.length ? `<div class="field-evidence-list">${packages.map((item) => `<div class="field-evidence-row"><div><strong>${escapeHtml(item.payload?.caption || item.media_id)}</strong><small>${escapeHtml(item.object_ref)}</small></div><div><span>${escapeHtml(item.step_id)} · ${escapeHtml(item.evidence_type)}</span><small>${escapeHtml(item.provider_id)} · revision ${item.payload?.package_revision || 1} · SHA ${escapeHtml(item.content_sha256.slice(0, 12))}</small><small>${escapeHtml(item.payload?.mapping_reason || "人工上傳")}</small></div><div><span>${escapeHtml(item.status)}</span><small>${escapeHtml(item.review_reason || "待人工覆核")}</small></div><div class="review-actions">${item.status === "pending_review" ? `<button class="secondary-action" type="button" data-field-review="accepted" data-package-id="${escapeHtml(item.package_id)}">接受</button><button class="secondary-action" type="button" data-field-review="correction_required" data-package-id="${escapeHtml(item.package_id)}">補正</button><button class="secondary-action" type="button" data-field-review="rejected" data-package-id="${escapeHtml(item.package_id)}">退回</button>` : '<span class="field-evidence-boundary">已完成覆核</span>'}</div></div>`).join("")}</div>` : '<p class="empty-state">尚無 Evidence Package。</p>';
  qsa("[data-field-review]", target).forEach((button) => button.addEventListener("click", () => reviewFieldPackage(button.dataset.packageId, button.dataset.fieldReview)));
}

async function loadFieldEvidence() {
  const dueDate = qs("#fieldNcrDueDate"); if (dueDate && !dueDate.value) { const next = new Date(); next.setDate(next.getDate() + 7); dueDate.value = next.toISOString().slice(0, 10); }
  const projectId = fieldValue("fieldProjectId") || "project-field-local";
  setFieldEvidenceStatus("載入中");
  try {
    const [requirements, packages, media, logs, ncr, capa] = await Promise.all([
      fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(projectId)}/evidence-requirements`),
      fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(projectId)}/evidence-packages`),
      fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(projectId)}/field-media`),
      fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(projectId)}/construction-logs`),
    ]);
    renderFieldRequirements(requirements.requirements || []); renderFieldPackages(packages.packages || []); renderFieldMedia(media.media || []); renderConstructionLogs(logs.logs || []); renderFieldNcr(ncr.ncr || []); renderFieldCapa(capa.capa || []);
    setFieldEvidenceStatus(`${media.media?.length || 0} media · ${packages.packages?.length || 0} packages`);
  } catch (error) { setFieldEvidenceStatus(error.message, true); }
}

async function createFieldRequirement() {
  const projectId = fieldValue("fieldProjectId");
  try {
    await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(projectId)}/evidence-requirements`, { method: "POST", body: { requirement_id: fieldValue("fieldRequirementId"), step_id: fieldValue("fieldStepId"), evidence_type: fieldValue("fieldEvidenceType"), required_flag: true, requirement_version: "R9.2.1-1", description: fieldValue("fieldRequirementDescription") } });
    await loadFieldEvidence();
  } catch (error) { setFieldEvidenceStatus(error.message, true); }
}

async function registerFieldProvider() {
  try { await fieldEvidenceApi("/api/v1/isafe/external-evidence-providers", { method: "POST", body: { provider_id: "provider-local-smart-site", name: "本機智慧監工 Provider", provider_type: "smart_site_saas" } }); setFieldEvidenceStatus("本機 Provider 已登記"); }
  catch (error) { setFieldEvidenceStatus(error.message, true); }
}

async function submitManualFieldEvidence() {
  const projectId = fieldValue("fieldProjectId");
  try {
    await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(projectId)}/evidence-packages/manual`, { method: "POST", body: { requirement_id: fieldValue("fieldRequirementId"), step_id: fieldValue("fieldStepId"), evidence_type: fieldValue("fieldEvidenceType"), media_id: fieldValue("fieldMediaId"), object_ref: fieldValue("fieldObjectRef"), content: `${fieldValue("fieldMediaId")}:${fieldValue("fieldObjectRef")}`, classification: { project: projectId, space: fieldValue("fieldSpace"), trade: fieldValue("fieldTrade"), stage: fieldValue("fieldStage"), event_type: fieldValue("fieldEventType") }, caption: fieldValue("fieldCaption"), confidence: 1, human_review: { status: "pending", source: "manual_upload" } } });
    await loadFieldEvidence();
  } catch (error) { setFieldEvidenceStatus(error.message, true); }
}

async function reviewFieldPackage(packageId, decision) {
  try { await fieldEvidenceApi(`/api/v1/isafe/evidence-packages/${encodeURIComponent(packageId)}/review`, { method: "POST", body: { decision, reason: decision === "accepted" ? "授權角色已人工核對來源與需求對應" : "請依覆核結果補正" } }); await loadFieldEvidence(); }
  catch (error) { setFieldEvidenceStatus(error.message, true); }
}
function selectedFieldMediaIds() { return qsa("[data-field-media-select]:checked").map((input) => input.value); }
function renderFieldMedia(media) {
  const target = qs("#fieldMediaList"); if (!target) return;
  target.innerHTML = media.length ? `<div class="field-media-grid">${media.map((item) => `<div class="field-media-card"><input type="checkbox" data-field-media-select value="${escapeHtml(item.media_id)}" checked /><span><strong>${escapeHtml(item.original_filename)}</strong><small>${escapeHtml(item.space_label)} · ${escapeHtml(item.trade_label)} · ${escapeHtml(item.stage_label)} · ${escapeHtml(item.event_type)}</small><small>revision ${item.current_revision || 1} · ${escapeHtml(item.classification_status)} · 信心 ${Math.round(Number(item.confidence) * 100)}%</small><small>${escapeHtml(item.site_id || "site-local-default")} · ${escapeHtml(item.source_system || "local")} · ${escapeHtml(item.model_name || "manual")}/${escapeHtml(item.model_version || "-")}</small></span><button class="secondary-action" type="button" data-field-correct="${escapeHtml(item.media_id)}">套用左側五維欄位校正</button></div>`).join("")}</div>` : '<p class="empty-state">尚未匯入現場媒體。</p>';
  qsa("[data-field-correct]", target).forEach((button) => button.addEventListener("click", () => correctFieldMedia(button.dataset.fieldCorrect)));
}
function renderConstructionLogs(logs) {
  const target = qs("#fieldLogList"); if (!target) return;
  target.innerHTML = logs.length ? `<div class="field-evidence-list">${logs.map((item) => `<div class="construction-log"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.summary)}</p><small>${escapeHtml(item.status)} · SHA ${escapeHtml(item.checksum.slice(0,12))}</small></div>`).join("")}</div>` : '<p class="empty-state">尚未產生日誌。</p>';
}
function renderFieldNcr(items) {
  const target=qs("#fieldNcrList"); if(!target)return; target.innerHTML=items.length?`<div class="field-evidence-list">${items.map((item)=>`<div class="ncr-item"><strong>${escapeHtml(item.defect_type)} · ${escapeHtml(item.severity)}</strong><p>${escapeHtml(item.description)}</p><small>${escapeHtml(item.ncr_id)} · ${escapeHtml(item.status)} · media revision ${item.media_revision}</small><div class="review-actions">${item.status==="candidate"?`<button class="secondary-action" data-ncr-review="confirmed" data-ncr-id="${escapeHtml(item.ncr_id)}">人工確認</button><button class="secondary-action" data-ncr-review="rejected" data-ncr-id="${escapeHtml(item.ncr_id)}">排除</button>`:item.status==="confirmed"?`<button class="primary-action" data-capa-create="${escapeHtml(item.ncr_id)}">建立 CAPA</button>`:""}</div></div>`).join("")}</div>`:'<p class="empty-state">尚無候選缺失。</p>';
  qsa("[data-ncr-review]",target).forEach((button)=>button.addEventListener("click",()=>reviewFieldNcr(button.dataset.ncrId,button.dataset.ncrReview))); qsa("[data-capa-create]",target).forEach((button)=>button.addEventListener("click",()=>createFieldCapa(button.dataset.capaCreate)));
}
function renderFieldCapa(items) {
  const target=qs("#fieldCapaList"); if(!target)return;
  target.innerHTML=items.length?items.map((item)=>`<div class="ncr-item"><strong>${escapeHtml(item.capa_id)}</strong><p>${escapeHtml(item.corrective_action)}</p><small>${escapeHtml(item.status)} · ${escapeHtml(item.responsible_party)} · ${escapeHtml(item.due_date)} · ${item.verification_media_refs?.length || 0} verification media</small><div class="review-actions">${item.status==="draft"?`<button class="secondary-action" data-capa-progress="${escapeHtml(item.capa_id)}">開始改善</button>`:""}${item.status==="in_progress"?`<button class="secondary-action" data-capa-verify="${escapeHtml(item.capa_id)}">選取照片送複驗</button>`:""}${item.status==="ready_for_verification"?`<button class="primary-action" data-capa-close="${escapeHtml(item.capa_id)}">授權結案</button>`:""}</div></div>`).join(""):'<p class="empty-state">尚無 CAPA。</p>';
  qsa("[data-capa-progress]",target).forEach((button)=>button.addEventListener("click",()=>updateFieldCapa(button.dataset.capaProgress,"in_progress")));
  qsa("[data-capa-verify]",target).forEach((button)=>button.addEventListener("click",()=>updateFieldCapa(button.dataset.capaVerify,"ready_for_verification",selectedFieldMediaIds())));
  qsa("[data-capa-close]",target).forEach((button)=>button.addEventListener("click",()=>closeFieldCapa(button.dataset.capaClose)));
}
async function detectFieldDefects(){ const media_ids=selectedFieldMediaIds(); if(!media_ids.length)return setFieldEvidenceStatus("請先選擇缺失照片",true); try{await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(fieldValue("fieldProjectId"))}/ncr-candidates`,{method:"POST",body:{media_ids,severity:fieldValue("fieldNcrSeverity"),responsible_party:fieldValue("fieldNcrResponsible"),due_date:fieldValue("fieldNcrDueDate")}});await loadFieldEvidence()}catch(error){setFieldEvidenceStatus(error.message,true)} }
async function reviewFieldNcr(ncrId,decision){try{await fieldEvidenceApi(`/api/v1/isafe/ncr-candidates/${encodeURIComponent(ncrId)}/review`,{method:"POST",body:{decision,responsible_party:fieldValue("fieldNcrResponsible"),due_date:fieldValue("fieldNcrDueDate"),reason:"授權角色人工核對現場媒體"}});await loadFieldEvidence()}catch(error){setFieldEvidenceStatus(error.message,true)} }
async function createFieldCapa(ncrId){try{await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(fieldValue("fieldProjectId"))}/capa`,{method:"POST",body:{ncr_id:ncrId,corrective_action:fieldValue("fieldCorrectiveAction"),responsible_party:fieldValue("fieldNcrResponsible"),due_date:fieldValue("fieldNcrDueDate")}});await loadFieldEvidence()}catch(error){setFieldEvidenceStatus(error.message,true)} }
async function updateFieldCapa(capaId,status,verification_media_refs=[]){try{await fieldEvidenceApi(`/api/v1/isafe/capa/${encodeURIComponent(capaId)}`,{method:"POST",body:{status,verification_media_refs,reason:"授權角色更新改善進度"}});await loadFieldEvidence()}catch(error){setFieldEvidenceStatus(error.message,true)} }
async function closeFieldCapa(capaId){try{await fieldEvidenceApi(`/api/v1/isafe/capa/${encodeURIComponent(capaId)}/close`,{method:"POST",body:{reason:"授權角色已核對改善照片與 accepted Evidence Package"}});await loadFieldEvidence()}catch(error){setFieldEvidenceStatus(error.message,true)} }
function readFieldFile(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(reader.error); reader.readAsDataURL(file); }); }
async function batchCaptureFieldMedia() {
  const files = [...(qs("#fieldMediaFiles")?.files || [])]; if (!files.length) return setFieldEvidenceStatus("請先選擇現場照片或影片", true);
  try { setFieldEvidenceStatus(`匯入 ${files.length} 個檔案中`); const assets = await Promise.all(files.map(async (file) => ({ original_filename: file.name, mime_type: file.type, bytes: file.size, data_url: await readFieldFile(file), caption: fieldValue("fieldCaption"), classification: { project: fieldValue("fieldProjectId"), space: fieldValue("fieldSpace"), trade: fieldValue("fieldTrade"), stage: fieldValue("fieldStage"), event_type: fieldValue("fieldEventType") } }))); await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(fieldValue("fieldProjectId"))}/field-media`, { method: "POST", body: { assets } }); await loadFieldEvidence(); }
  catch (error) { setFieldEvidenceStatus(error.message, true); }
}
async function correctFieldMedia(mediaId) {
  try { await fieldEvidenceApi(`/api/v1/isafe/field-media/${encodeURIComponent(mediaId)}/corrections`, { method: "POST", body: { reason: fieldValue("fieldCorrectionReason"), caption: fieldValue("fieldCaption"), classification: { project: fieldValue("fieldProjectId"), space: fieldValue("fieldSpace"), trade: fieldValue("fieldTrade"), stage: fieldValue("fieldStage"), event_type: fieldValue("fieldEventType") } } }); await loadFieldEvidence(); }
  catch (error) { setFieldEvidenceStatus(error.message, true); }
}async function mapSelectedFieldMedia() {
  const media_ids = selectedFieldMediaIds(); if (!media_ids.length) return setFieldEvidenceStatus("請選擇至少一筆現場媒體", true);
  try { await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(fieldValue("fieldProjectId"))}/field-media:map`, { method: "POST", body: { media_ids, requirement_id: fieldValue("fieldRequirementId"), step_id: fieldValue("fieldStepId"), evidence_type: fieldValue("fieldEvidenceType") } }); await loadFieldEvidence(); }
  catch (error) { setFieldEvidenceStatus(error.message, true); }
}
async function generateFieldConstructionLog() {
  const media_ids = selectedFieldMediaIds(); if (!media_ids.length) return setFieldEvidenceStatus("請選擇至少一筆現場媒體", true);
  try { await fieldEvidenceApi(`/api/v1/isafe/projects/${encodeURIComponent(fieldValue("fieldProjectId"))}/construction-logs`, { method: "POST", body: { media_ids } }); await loadFieldEvidence(); }
  catch (error) { setFieldEvidenceStatus(error.message, true); }
}
let governanceKnowledgeIndex = null;
let governanceKnowledgeError = null;

function knowledgeTokens(value) {
  const normalized = String(value || "").toLowerCase().replace(/\s+/g, "");
  return normalized.match(/[\u4e00-\u9fff]{2}|[a-z0-9_]+/g) || [];
}

async function loadKnowledgeIndex() {
  if (governanceKnowledgeIndex || governanceKnowledgeError) return governanceKnowledgeIndex;
  const meta = qs("#knowledgeMeta");
  const status = qs("#knowledgeStatus");
  try {
    const response = await fetch("tigi-corpus/knowledge-index.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Index request failed (${response.status})`);
    governanceKnowledgeIndex = await response.json();
    if (meta) meta.textContent = `${governanceKnowledgeIndex.releaseId} · ${governanceKnowledgeIndex.chunkCount} chunks`;
    if (status) status.textContent = "本機索引已載入；結果僅供人工覆核與治理判定輸入。";
    return governanceKnowledgeIndex;
  } catch (error) {
    governanceKnowledgeError = error;
    if (meta) meta.textContent = "索引無法載入";
    if (status) status.textContent = `無法載入本機 TIGI 索引：${error.message}`;
    return null;
  }
}

async function queryGovernanceKnowledge() {
  const queryInput = qs("#knowledgeQuery");
  const resultTarget = qs("#knowledgeResults");
  const status = qs("#knowledgeStatus");
  const query = queryInput?.value.trim() || "";
  if (!query || !resultTarget) return;

  const index = await loadKnowledgeIndex();
  if (!index) return;
  const tokens = knowledgeTokens(query);
  const results = (index.chunks || [])
    .map((chunk) => {
      const haystack = `${chunk.title} ${chunk.heading} ${chunk.text}`.toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((left, right) => right.score - left.score || Number(left.canonicalOrder || 0) - Number(right.canonicalOrder || 0) || Number(left.sectionOrder || 0) - Number(right.sectionOrder || 0))
    .slice(0, 6);

  if (status) status.textContent = results.length
    ? `找到 ${results.length} 筆本機來源。請由具權限角色覆核後，才可作為治理判定輸入。`
    : "未找到足夠的可信來源，應建立 Knowledge Gap，不能以模型推測取代。";
  resultTarget.innerHTML = results.length
    ? results.map((result) => `
        <article class="knowledge-result">
          <div class="knowledge-result-meta"><span>${escapeHtml(result.categoryLabel || result.category || "TIGI")}</span><span>${result.baselineStatus === "candidate-addendum" ? "R9.2.1 候選增補" : "R9.2 活動來源"}</span><span>relevance ${result.score}</span></div>
          <h3>${escapeHtml(result.title)}</h3>
          <p class="knowledge-heading">${escapeHtml(result.heading || "")}</p>
          <p>${escapeHtml(result.text || "").slice(0, 520)}${String(result.text || "").length > 520 ? "..." : ""}</p>
          <a href="${encodeURI(result.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(result.path || result.sourceUrl)} ↗</a>
        </article>
      `).join("")
    : '<p class="empty-state">沒有足夠的可信來源。請建立 Knowledge Gap，改由人工補件、驗證或核准流程處理。</p>';
}

function renderR9ObjectList(selector, records, renderRecord) {
  const target = qs(selector);
  if (!target) return;
  target.innerHTML = records.length
    ? records.map(renderRecord).join("")
    : '<p class="empty-state">目前尚無記錄。</p>';
}

function r9RecordCard(title, status, rows) {
  return `
    <article class="r9-object-card">
      <div class="r9-object-head"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(status || "pending")}</span></div>
      ${rows.map(([label, value]) => `<div class="r9-object-row"><span>${escapeHtml(label)}</span><code>${escapeHtml(value ?? "-")}</code></div>`).join("")}
    </article>
  `;
}

async function loadR9GovernanceObjects() {
  const select = qs("#r9CaseSelect");
  const status = qs("#r9GovernanceStatus");
  const selectedId = select?.value || activeCaseId;

  if (select) {
    const previous = selectedId;
    select.innerHTML = projectCases.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.id)} · ${escapeHtml(item.title)}</option>`).join("");
    select.value = projectCases.some((item) => item.id === previous) ? previous : activeCaseId;
  }

  const caseId = select?.value || activeCaseId;
  if (!apiEnabled) {
    if (status) status.textContent = "API 未啟用";
    renderR9ObjectList("#r9RiskStates", [], () => "");
    renderR9ObjectList("#r9TriggerEvaluations", [], () => "");
    renderR9ObjectList("#r9ExternalEvaluations", [], () => "");
    renderR9ObjectList("#r9DecisionAudit", [], () => "");
    return;
  }

  if (status) status.textContent = "讀取中";
  try {
    const response = await fetch(`${apiOrigin}/api/v1/isafe/cases/${encodeURIComponent(caseId)}/governance/r9`, {
      headers: apiContextHeaders({ identity: getActiveRole() }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`R9 API ${response.status}`);
    const data = await response.json();
    if (status) status.textContent = `${data.current_stage} · R5.2 authoritative`;
    const summary = qs("#r9CaseSummary");
    if (summary) summary.innerHTML = `
      <div><span>案件</span><strong>${escapeHtml(data.isafe_case_id)}</strong></div>
      <div><span>正式階段</span><strong>${escapeHtml(data.current_stage)}</strong></div>
      <div><span>Gate</span><strong>${escapeHtml(data.gate_status)}</strong></div>
      <div><span>發布基線</span><strong>${escapeHtml(data.release_id)}</strong></div>
    `;

    renderR9ObjectList("#r9RiskStates", data.risk_states || [], (item) => r9RecordCard(item.state, item.human_review_status, [
      ["ID", item.risk_state_id], ["分數", item.score], ["規則", item.rule_version], ["決策", item.decision_object_id], ["Trace", item.trace_id],
    ]));
    renderR9ObjectList("#r9TriggerEvaluations", data.trigger_evaluations || [], (item) => r9RecordCard(item.result, item.human_review_status, [
      ["規則", item.rule_id], ["版本", item.rule_version], ["待辦", item.pending_action], ["原因", item.reason], ["Trace", item.trace_id],
    ]));
    renderR9ObjectList("#r9ExternalEvaluations", data.external_evaluations || [], (item) => r9RecordCard(item.evaluation_type, item.review_status, [
      ["Provider", item.provider_id], ["權威分類", item.authority_classification], ["Input hash", item.input_sha256], ["Output hash", item.output_sha256], ["決策", item.decision_object_id],
    ]));
    const combined = [
      ...(data.decision_objects || []).map((item) => ({ ...item, record_kind: "Decision" })),
      ...(data.audit_outputs || []).map((item) => ({ ...item, record_kind: "Audit" })),
      ...(data.notifications || []).map((item) => ({ ...item, record_kind: "Notification" })),
    ];
    renderR9ObjectList("#r9DecisionAudit", combined, (item) => {
      if (item.record_kind === "Decision") return r9RecordCard(`Decision · ${item.outcome}`, item.authority_role, [["ID", item.decision_object_id], ["類型", item.decision_type], ["規則", item.rule_version], ["決策者", item.decided_by], ["Trace", item.trace_id]]);
      if (item.record_kind === "Notification") return r9RecordCard(`Notification · ${item.severity}`, item.status, [["ID", item.notification_id], ["來源", item.source_id], ["政策", item.policy_version], ["升級層級", item.escalation_level], ["到期", item.due_at]]);
      return r9RecordCard(`Audit · ${item.output_type}`, item.status, [["ID", item.audit_output_id], ["SHA-256", item.payload_sha256], ["決策", item.decision_object_id], ["簽署", item.signed_by], ["Trace", item.trace_id]]);
    });
  } catch (error) {
    if (status) status.textContent = "讀取失敗";
    const summary = qs("#r9CaseSummary");
    if (summary) summary.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function renderGateMachine() {
  const target = qs("#gateMachine");
  if (!target) return;

  const project = getActiveCase();
  const visibleGates = getCaseGates(project);
  const activeGlobalIndex = gates.findIndex((gate) => gate.key === project?.stage);
  target.innerHTML = visibleGates
    .map((gate) => {
      const gateGlobalIndex = gates.findIndex((item) => item.key === gate.key);
      const state = gateGlobalIndex < activeGlobalIndex ? "done" : gateGlobalIndex === activeGlobalIndex ? "current" : "locked";
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

  const project = getActiveCase();
  const visibleGates = getCaseGates(project);
  const activeGlobalIndex = gates.findIndex((gate) => gate.key === project?.stage);
  target.innerHTML = visibleGates
    .map((gate) => {
      const gateGlobalIndex = gates.findIndex((item) => item.key === gate.key);
      const state = gateGlobalIndex < activeGlobalIndex ? "done" : gateGlobalIndex === activeGlobalIndex ? "current" : "locked";
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
    button.addEventListener("click", async () => {
      activeRole = button.dataset.role;
      const currentView = qs(".view.active")?.id || "overview";
      setView(currentView);
      legacyWorkspace = null;
      legacyStageFilter = null;
      renderProjectWorkspace();
      await loadLegacyWorkspace();
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
      `<div class="canonical-summary"><strong>${r5Contract.canonicalIdCount}</strong><span>R8 carry-forward canonical IDs；地端 API 已落地 11/13，match_case_id 與 deos_project_id 待補</span></div>`,
      ...r5CanonicalIds.map((id) => `<code>${id}</code>`),
    ].join("");
  }

  const boundary = qs("#r5AiBoundary");
  if (boundary) {
    boundary.innerHTML = `
      <div><strong>${r5Contract.acceptedAdr}</strong><span>R5.2 State Machine Contract is the implementation authority for iSAFE stages.</span></div>
      <div><strong>${r5Contract.documentVersion}</strong><span>R9 / Patent V7 是目前治理實作母本；尚非 Final Official，且不取代 R5.2 十階段執行契約。</span></div>
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
    description: "GS-01～30 沿用已核驗來源並納入 R8 Integrated baseline。",
    columns: [
      ["registry_id", "GS ID"],
      ["name", "正式名稱"],
      ["purpose", "治理用途"],
      ["source_status", "來源"],
      ["governance_approval_status", "核准"],
    ],
  },
  namespaces: {
    description: "治理名稱說明：跨文件與系統統一使用九類 Registry 名稱、代碼及用途。",
    columns: [
      ["registry_id", "治理代碼"],
      ["scope", "治理名稱與用途"],
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
    target.innerHTML = `<div class="registry-empty">R8 Registry 資料載入中，或目前無法讀取資料檔。</div>`;
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
  const advanceButton = qs("#demoCycleBtn");
  if (advanceButton) advanceButton.hidden = qs(".view.active")?.id !== "projects" || !["headquarter", "dealer"].includes(role.memberTier);

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
      <div class="permission-notice">本地身分模擬已連動 API 授權；會員層級與案件角色會共同限制頁面及寫入操作。</div>
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
  ["case", "案件基本資料"],
  ["planning", "執行前確認"],
  ["checklist", "逐項檢核"],
  ["evidence", "文件與圖片"],
  ["finance", "付款證明"],
  ["changes", "追加減工程"],
  ["messages", "留言與歷程"],
];

function legacyHeaders(project, idempotencyKey) {
  const role = getActiveRole();
  return {
    "Content-Type": "application/json",
    ...apiContextHeaders({
      tenantId: project.tenantId,
      organizationId: project.organizationId,
      purpose: "isafe_legacy_functional_parity",
      idempotencyKey: idempotencyKey || `ui-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      authorize: true,
      identity: role,
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
        identity: getActiveRole(),
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
  if (activeLegacyTab === "case") panel.innerHTML = renderCaseBasicPanel();
  if (activeLegacyTab === "planning") panel.innerHTML = renderPlanningPanel();
  if (activeLegacyTab === "checklist") panel.innerHTML = renderChecklistPanel();
  if (activeLegacyTab === "evidence") panel.innerHTML = renderEvidencePanel();
  if (activeLegacyTab === "finance") panel.innerHTML = renderFinancePanel();
  if (activeLegacyTab === "changes") panel.innerHTML = renderChangePanel();
  if (activeLegacyTab === "messages") panel.innerHTML = renderMessagePanel();
  if (legacyReadOnly) {
    panel.insertAdjacentHTML("afterbegin", `<div class="read-only-banner"><strong>GitHub Pages 靜態唯讀預覽</strong><span>完整寫入、檔案與稽核功能需連接受保護的 iSAFE API。</span></div>`);
    qsa("form input, form textarea, form select, form button, .checklist-confirmation, .payment-confirmation-action, .integrated-payment-confirmation", panel).forEach((control) => {
      control.disabled = true;
    });
  }
  const formCapabilities = {
    evidenceUploadForm: "evidence",
    baselineForm: "baseline",
    receiptForm: "receipt",
    changeOrderForm: "change_order",
    messageForm: "message",
  };
  Object.entries(formCapabilities).forEach(([formId, capability]) => {
    const form = qs(`#${formId}`, panel);
    if (form && !canUse(capability)) {
      form.hidden = true;
      qsa("input, textarea, select, button", form).forEach((control) => { control.disabled = true; });
    }
  });
  bindLegacyActions();
}

function renderCaseBasicPanel() {
  const project = getActiveCase();
  const projectIndex = Math.max(0, projectCases.findIndex((item) => item.id === project.id));
  const mode = caseModeMeta[getCaseMode(project, projectIndex)];
  const baseline = legacyWorkspace.baseline || {};
  const value = (input, suffix = "") => input === undefined || input === null || input === "" ? "尚未填寫" : `${input}${suffix}`;
  const details = [
    ["案件編號", project.id],
    ["案件名稱", project.title],
    ["執行模式", mode.label],
    ["目前階段", stageLabel(project.stage)],
    ["案件狀態", project.status],
    ["案場地址", value(project.siteAddress)],
    ["空間類型", value(project.siteType)],
    ["施作面積", value(project.floorAreaPing, project.floorAreaPing ? " 坪" : "")],
    ["業主", value(project.owner)],
    ["業主聯絡電話", value(project.ownerPhone)],
    ["認證設計師", value(project.designer)],
    ["認證工程會員", value(project.vendor)],
    ["代理／管理單位", value(project.agency)],
    ["合約編號", value(baseline.contract_ref || project.contractRef)],
    ["合約工程範圍", value(project.contractScope)],
    ["預定開始日期", value(project.plannedStartDate)],
    ["預定完成日期", value(project.plannedCompletionDate)],
    ["來源案件", value(project.sourceCase)],
  ];
  return `
    <div class="case-basic-intro">
      <div><p class="section-kicker">Case Profile</p><h3>案件基本資料</h3></div>
      <span class="status-pill">${escapeHtml(mode.label)}</span>
    </div>
    <div class="case-basic-grid">
      ${details.map(([label, detail]) => `<div><span>${label}</span><strong>${escapeHtml(detail)}</strong></div>`).join("")}
    </div>
    <div class="responsibility-note compact">
      <strong>案件責任分工</strong>
      <span>施工照片由認證工程會員上傳；付款證明由業主上傳。追加減工程可於 C1-C5 任一工程階段提出，並記錄發生階段、金額、工期與原因。</span>
    </div>
  `;
}

function renderPlanningPanel() {
  const role = getActiveRole();
  const baseline = legacyWorkspace.execution_checklist_baseline || { status: "draft" };
  const frozen = baseline.status === "frozen";
  const project = getActiveCase();
  const visibleGates = getCaseGates(project);
  const mode = getCaseMode(project, Math.max(0, projectCases.findIndex((item) => item.id === project.id)));
  const phases = [
    ["design", mode === "design_only" ? "純設計執行階段" : "第一階段：設計", visibleGates.filter((gate) => gate.id.startsWith("D"))],
    ["construction", mode === "construction_only" ? "直接工程執行階段" : "第二階段：施工", visibleGates.filter((gate) => gate.id.startsWith("C"))],
  ].filter(([, , phaseGates]) => phaseGates.length);
  return `
    <div class="baseline-version-banner">
      <strong>${escapeHtml(caseModeMeta[mode].label)}執行檢核基準 · ${frozen ? "已確認凍結" : "草稿編修中"}</strong>
      <span>執行前可新增、刪除、修改項目名稱與內容；設計師／廠商及業主雙方確認後，凍結為後續「逐項檢核」的正式清單。</span>
    </div>
    ${phases.map(([phase, title, phaseGates]) => `
      <section class="planning-phase" data-phase="${phase}">
        <div class="section-head"><div><p class="section-kicker">Execution Baseline</p><h3>${title}</h3></div></div>
        ${phaseGates.map((gate) => {
          const items = legacyWorkspace.checklist.filter((item) => item.stage === gate.key);
          return `<details class="planning-step" ${gate.key === getActiveCase().stage ? "open" : ""}>
            <summary><strong>${gate.id} ${escapeHtml(gate.name)}</strong><span>${items.length} 項</span></summary>
            <div class="planning-editor-list">
              ${items.map((item) => `<form class="planning-item-form" data-checklist-id="${item.checklist_item_id}">
                <label>項目名稱<input name="label" maxlength="160" required value="${escapeHtml(item.label)}" ${frozen ? "disabled" : ""} /></label>
                <label>項目內容<textarea name="content" maxlength="1000" placeholder="補充驗收標準、交付內容或注意事項" ${frozen ? "disabled" : ""}>${escapeHtml(item.content || "")}</textarea></label>
                <div class="planning-item-actions"><small>${item.source === "case_custom" ? "案件自訂" : "R5.2 預設"}</small>${frozen ? "" : `<button class="secondary-action" type="submit">儲存修改</button><button class="danger-action planning-delete" type="button">刪除</button>`}</div>
              </form>`).join("")}
            </div>
            <form class="inline-form planning-add-form" data-stage="${gate.key}" ${canUse("checklist_add") && !frozen ? "" : "hidden"}><label>新增項目名稱<input name="label" required maxlength="160" placeholder="輸入檢核項名稱" /></label><label>項目內容<input name="content" maxlength="1000" placeholder="輸入驗收標準或交付內容" /></label><button class="secondary-action" type="submit">新增</button></form>
          </details>`;
        }).join("")}
      </section>`).join("")}
    <div class="planning-confirmation-panel">
      <div><strong>設計師／廠商</strong><span>${baseline.certified_member_confirmed_at ? `已由 ${escapeHtml(baseline.certified_member_confirmed_by)} 確認` : "尚未確認"}</span></div>
      <div><strong>業主</strong><span>${baseline.owner_confirmed_at ? `已由 ${escapeHtml(baseline.owner_confirmed_by)} 確認` : "尚未確認"}</span></div>
      ${!frozen && role.confirmationParty ? `<button id="confirmExecutionBaseline" class="primary-action" data-party="${role.confirmationParty}" type="button">確認此版清單</button>` : ""}
    </div>
  `;
}

function renderChecklistPanel() {
  const project = getActiveCase();
  const currentStage = gates.some((gate) => gate.key === project.stage) ? project.stage : gates[0].key;
  legacyStageFilter = currentStage;
  const items = legacyWorkspace.checklist.filter((item) => item.stage === currentStage);
  const completed = items.filter((item) => new Set(["completed", "not_applicable"]).has(item.aggregate_status || item.status)).length;
  const role = getActiveRole();
  const executionFrozen = legacyWorkspace.execution_checklist_baseline?.status === "frozen";
  const stagePayments = legacyWorkspace.milestones.filter((item) => item.stage === currentStage);
  const completedPayments = stagePayments.filter((item) => item.status === "completed" && item.receipt_id && ["certified_member", "owner"].every((party) => item.confirmations?.[party]?.status === "completed")).length;
  const stageReady = executionFrozen && completed === items.length && completedPayments === stagePayments.length;
  const statusOptions = (status) => `<option value="pending" ${status === "pending" ? "selected" : ""}>待確認</option><option value="completed" ${status === "completed" ? "selected" : ""}>已確認</option><option value="exception" ${status === "exception" ? "selected" : ""}>異常</option><option value="not_applicable" ${status === "not_applicable" ? "selected" : ""}>不適用</option>`;
  const paymentRow = (item, isChange = false) => {
    const certified = item.confirmations?.certified_member || { status: "pending", version: 1 };
    const owner = item.confirmations?.owner || { status: "pending", version: 1 };
    const party = role.confirmationParty;
    const hasProof = isChange ? item.payment_file_name : item.receipt_id;
    const locked = isChange ? item.locked_at : item.stage_locked;
    const canConfirm = party && hasProof && !locked && item.confirmations?.[party]?.status !== "completed";
    const action = isChange ? `change-orders/${encodeURIComponent(item.change_order_id)}/confirmations/${party}` : `payment-milestones/${encodeURIComponent(item.milestone_id)}/confirmations/${party}`;
    return `<div class="execution-row payment-execution-row ${locked ? "is-locked" : ""}"><span class="execution-marker">${locked || item.status === "completed" ? "✓" : hasProof ? "•" : ""}</span><div class="execution-copy"><strong>${isChange ? `追加減：${escapeHtml(item.title)}` : escapeHtml(paymentMilestoneName(item))}</strong><small>${formatMoney(isChange ? item.amount_delta : item.amount)} · ${hasProof ? "已上傳付款證明" : "尚未上傳付款證明"}</small></div><div class="party-confirmation"><span>認證會員</span><strong>${certified.status === "completed" ? "已確認" : "待確認"}</strong></div><div class="party-confirmation"><span>業主</span><strong>${owner.status === "completed" ? "已確認" : "待確認"}</strong></div>${canConfirm ? `<button class="secondary-action integrated-payment-confirmation" data-action="${action}" data-version="${item.confirmations?.[party]?.version || 1}" type="button">確認付款檢核</button>` : ""}</div>`;
  };
  return `<div class="stage-readiness-banner ${stageReady ? "is-ready" : "is-blocked"}"><strong>${stageReady ? "本階段已符合凍結條件" : "尚不可進入下一階段"}</strong><span>執行基準：${executionFrozen ? "已凍結" : "未完成雙方確認"} · 勾稽：${completed}/${items.length} · 付款：${completedPayments}/${stagePayments.length}</span><small>本階段全部檢核事項與原合約付款須經雙方確認後，Gate 才能推進並永久鎖定；追加減工程採獨立治理，不改動本流程。</small></div>
    <div class="operations-toolbar"><div class="current-stage-display"><span>案件目前階段</span><strong>${escapeHtml(stageLabel(currentStage))}</strong><small>逐項檢核依案件 Gate 自動顯示；條文只能在「執行前確認」編修。</small></div><div class="progress-copy"><strong>${completed}/${items.length}</strong><span>本階段完成</span></div><div class="progress-track"><span style="width:${items.length ? Math.round(completed / items.length * 100) : 0}%"></span></div></div>
    <div class="confirmation-legend"><span><b>認證會員</b> 設計師或工程商</span><span><b>業主</b> 一般會員的案件角色</span><span><b>完成階段</b> 自動鎖定</span></div>
    <div class="checklist-execution">${items.map((item) => `<div class="execution-row status-${item.aggregate_status || item.status} ${item.stage_locked ? "is-locked" : ""}"><span class="execution-marker">${(item.aggregate_status || item.status) === "completed" ? "✓" : (item.aggregate_status || item.status) === "exception" ? "!" : ""}</span><div class="execution-copy"><strong>${escapeHtml(item.label)}</strong><small>${item.source === "case_custom" ? "案件自訂" : "TWCID 舊站基線"}${item.stage_locked ? " · 階段已鎖定" : ""}</small></div>${["certified_member", "owner"].map((party) => { const confirmation = item.confirmations?.[party] || { status: "pending", version: 1 }; const editable = canUse("checklist_confirm") && role.confirmationParty === party && !item.stage_locked && !legacyReadOnly; return `<label class="party-confirmation"><span>${party === "certified_member" ? "認證會員" : "業主"}</span><select class="checklist-confirmation" data-checklist-id="${item.checklist_item_id}" data-party="${party}" data-version="${confirmation.version || 1}" ${editable ? "" : "disabled"}>${statusOptions(confirmation.status || "pending")}</select></label>`; }).join("")}</div>`).join("")}</div>
    <section class="payment-checklist-section"><h3>本階段付款勾稽</h3>${stagePayments.length ? stagePayments.map((item) => paymentRow(item)).join("") : `<div class="empty-state">本階段沒有原合約付款檢核。</div>`}</section>`;
}

function renderEvidencePanel() {
  const role = getActiveRole();
  const certifiedMemberUpload = role.memberTier === "certified_member";
  const uploadDuty = certifiedMemberUpload ? "目前身分可上傳施工照片或設計階段現場紀錄。" : "施工照片須由案件中的認證會員上傳；其他角色僅可依權限查閱。";
  return `<div class="responsibility-note compact"><strong>文件與圖片上傳責任</strong><span>${uploadDuty} 業主的付款資料請至「付款證明」上傳該階段付款證明。</span></div>
    <form class="form-grid" id="evidenceUploadForm" ${certifiedMemberUpload ? "" : "hidden"}><label>證據類型<select name="evidence_type"><option value="project_photo">現場照片</option><option value="project_file">專案文件</option><option value="drawing">設計圖說</option><option value="acceptance_record">驗收紀錄</option></select></label><label>顯示名稱<input name="label" maxlength="120" /></label><label class="file-field">選擇文件或圖片<input name="file" type="file" required accept="image/*,.pdf,.txt,.doc,.docx,.xls,.xlsx" /></label><button class="primary-action" type="submit">上傳證據</button></form>
    <div class="data-table evidence-table"><div class="data-row header"><span>日期</span><span>類型／名稱</span><span>階段</span><span>檔案</span><span>動作</span></div>${legacyWorkspace.evidence_files.length ? legacyWorkspace.evidence_files.map((item) => `<div class="data-row"><span>${formatDate(item.created_at)}</span><span><strong>${escapeHtml(item.label || item.evidence_type)}</strong><small>${escapeHtml(item.evidence_type)}</small></span><span>${escapeHtml(stageLabel(item.step_key))}</span><span>${escapeHtml(item.file_name)}<small>${formatBytes(item.file_size)}</small></span><span><button class="icon-action file-download" type="button" data-kind="evidence" data-file-id="${item.evidence_id}" title="下載檔案">↓</button></span></div>`).join("") : `<div class="empty-state">尚未上傳文件或圖片。</div>`}</div>`;
}

function paymentMilestoneName(item) {
  if (item.phase !== "construction") return item.label;
  const contractStageName = item.contract_stage_name || stageLabel(item.stage).replace(/^[A-Z]\d+\s*/, "");
  return `${contractStageName}完工驗收款`;
}
function renderFinancePanel() {
  const role = getActiveRole();
  const ownerUpload = role.id === "general_member";
  const currentStage = getActiveCase().stage;
  const milestones = legacyWorkspace.milestones.filter((item) => item.stage === currentStage && isCaseStage(getActiveCase(), item.stage));
  const milestoneIds = new Set(milestones.map((item) => item.milestone_id));
  const receipts = legacyWorkspace.receipts.filter((item) => milestoneIds.has(item.milestone_id));
  return `<div class="responsibility-note compact"><strong>${escapeHtml(stageLabel(currentStage))}付款證明</strong><span>本頁只供業主上傳及查看原合約付款證明；雙方勾稽統一在「逐項檢核」完成。</span></div>
    ${ownerUpload && milestones.some((item) => !item.stage_locked && !item.receipt_id) ? `<form class="form-grid receipt-form" id="receiptForm"><label>本階段應付款項<select name="milestone_id">${milestones.filter((item) => !item.stage_locked && !item.receipt_id).map((item) => `<option value="${item.milestone_id}">${escapeHtml(paymentMilestoneName(item))} · ${formatMoney(item.amount)}</option>`).join("")}</select></label><label>付款證明名稱<input name="title" required maxlength="120" /></label><label>實付金額<input name="amount" type="number" min="0" step="1" /></label><label class="file-field">付款證明檔案<input name="file" type="file" accept="image/*,.pdf" required /></label><button class="secondary-action" type="submit">上傳付款證明</button></form>` : ""}
    <div class="proof-icon-list">${receipts.length ? receipts.map((item) => `<div class="proof-icon-item"><span class="proof-status-icon" title="已上傳付款證明">✓</span><div><strong>${escapeHtml(item.title)}</strong><small>${formatMoney(item.amount)} · ${formatDate(item.created_at)}</small></div><button class="icon-action file-download" data-kind="receipts" data-file-id="${item.receipt_id}" type="button" title="下載付款證明">↓</button></div>`).join("") : `<div class="empty-state">目前階段尚無付款證明。</div>`}</div>`;
}
function renderChangePanel() {
  const project = getActiveCase();
  const constructionGates = getCaseGates(project).filter((gate) => gate.id.startsWith("C"));
  if (!constructionGates.length) return `<div class="empty-state"><strong>純設計案件不建立工程追加減。</strong></div>`;
  const selectedStage = constructionGates.some((gate) => gate.key === project.stage) ? project.stage : constructionGates[0]?.key;
  const role = getActiveRole();
  return `<div class="responsibility-note compact"><strong>獨立追加減工程治理</strong><span>因應合約必要變更而獨立建立，不修改、不取代也不阻塞原階段流程與勾稽程序。每一項須具變更文件、業主付款證明及雙方確認，完成後只鎖定該追加減項目。</span></div>
    <form class="form-grid" id="changeOrderForm"><label>發生階段<select name="stage" required>${constructionGates.map((gate) => `<option value="${gate.key}" ${gate.key === selectedStage ? "selected" : ""}>${gate.id} ${escapeHtml(gate.name)}</option>`).join("")}</select></label><label>追加減工程名稱<input name="title" required maxlength="120" /></label><label>追加減金額<input name="amount_delta" type="number" step="1" value="0" /></label><label>工期增減天數<input name="schedule_delta_days" type="number" step="1" value="0" /></label><label class="wide-field">原因<textarea name="reason" required maxlength="800"></textarea></label><label class="file-field wide-field">追加減工程文件<input name="file" type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" required /></label><button class="primary-action" type="submit">建立獨立追加減項目</button></form>
    <div class="change-order-list">${legacyWorkspace.change_orders.length ? legacyWorkspace.change_orders.map((item) => { const certified = item.confirmations?.certified_member || { status: "pending", version: 1 }; const owner = item.confirmations?.owner || { status: "pending", version: 1 }; const party = role.confirmationParty; const canConfirm = party && item.payment_file_name && !item.locked_at && item.confirmations?.[party]?.status !== "completed"; return `<article class="change-order-card ${item.locked_at ? "is-locked" : ""}"><header><div><span>${escapeHtml(stageLabel(item.stage || "未記錄"))}</span><h4>${escapeHtml(item.title)}</h4></div><strong>${item.locked_at ? "已完成並鎖定" : item.payment_file_name ? "待雙方確認" : "待付款證明"}</strong></header><p>${escapeHtml(item.reason)}</p><div class="change-order-facts"><span>${formatMoney(item.amount_delta)}</span><span>${item.schedule_delta_days >= 0 ? "+" : ""}${item.schedule_delta_days} 天</span></div><div class="change-order-files"><button class="text-action change-file-download" data-change-id="${item.change_order_id}" data-kind="document" type="button">下載變更文件</button>${item.payment_file_name ? `<button class="text-action change-file-download" data-change-id="${item.change_order_id}" data-kind="payment" type="button">下載付款證明</button>` : ""}</div>${role.id === "general_member" && !item.payment_file_name && !item.locked_at ? `<form class="change-payment-form form-grid" data-change-id="${item.change_order_id}"><label>實付金額<input name="amount" type="number" min="0" step="1" value="${Math.max(0, Number(item.amount_delta) || 0)}" /></label><label>付款證明<input name="file" type="file" accept="image/*,.pdf" required /></label><button class="secondary-action" type="submit">業主上傳付款證明</button></form>` : ""}<div class="payment-party-status"><span>認證會員：${certified.status === "completed" ? "已確認" : "待確認"}</span><span>業主：${owner.status === "completed" ? "已確認" : "待確認"}</span></div>${canConfirm ? `<button class="secondary-action change-confirmation-action" data-change-id="${item.change_order_id}" data-party="${party}" data-version="${item.confirmations?.[party]?.version || 1}" type="button">確認此追加減項目</button>` : ""}${item.locked_at ? `<small>本追加減項目已獨立凍結，不影響原流程。</small>` : ""}</article>`; }).join("") : `<div class="empty-state">尚無追加減工程紀錄。</div>`}</div>`;
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
  qsa(".checklist-confirmation").forEach((select) => select.addEventListener("change", async () => {
    await runLegacyAction(`checklist/${encodeURIComponent(select.dataset.checklistId)}/confirmations/${select.dataset.party}`, {
      status: select.value,
      expected_version: Number(select.dataset.version),
      actor: getActiveRole().userId,
    });
  }));
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
      actor: getActiveRole().userId,
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
      actor: getActiveRole().userId,
    });
  });
  qsa(".integrated-payment-confirmation").forEach((button) => button.addEventListener("click", async () => {
    await runLegacyAction(button.dataset.action, { status: "completed", expected_version: Number(button.dataset.version), actor: getActiveRole().userId });
  }));  qsa(".payment-confirmation-action").forEach((button) => button.addEventListener("click", async () => {
    await runLegacyAction(`payment-milestones/${encodeURIComponent(button.dataset.milestoneId)}/confirmations/${encodeURIComponent(button.dataset.party)}`, {
      status: "completed",
      expected_version: Number(button.dataset.version),
      actor: getActiveRole().userId,
    });
  }));
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
      actor: getActiveRole().userId,
    });
  });
  const changeForm = qs("#changeOrderForm");
  if (changeForm) changeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = changeForm.elements.file.files[0];
    await runLegacyAction("change-orders", {
      title: changeForm.elements.title.value,
      stage: changeForm.elements.stage.value,
      reason: changeForm.elements.reason.value,
      amount_delta: Number(changeForm.elements.amount_delta.value),
      schedule_delta_days: Number(changeForm.elements.schedule_delta_days.value),
      file_name: file?.name,
      mime_type: file?.type,
      content_base64: file ? await fileToBase64(file) : null,
      actor: getActiveRole().userId,
    });
  });
  qsa(".change-payment-form").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = form.elements.file.files[0];
    await runLegacyAction(`change-orders/${encodeURIComponent(form.dataset.changeId)}/payment-proof`, { amount: Number(form.elements.amount.value), file_name: file?.name, mime_type: file?.type, content_base64: file ? await fileToBase64(file) : null, actor: getActiveRole().userId });
  }));
  qsa(".change-confirmation-action").forEach((button) => button.addEventListener("click", async () => {
    await runLegacyAction(`change-orders/${encodeURIComponent(button.dataset.changeId)}/confirmations/${encodeURIComponent(button.dataset.party)}`, { expected_version: Number(button.dataset.version), actor: getActiveRole().userId });
  }));
  qsa(".change-file-download").forEach((button) => button.addEventListener("click", () => downloadLegacyFile(`change-orders/${encodeURIComponent(button.dataset.changeId)}`, button.dataset.kind)));
  const messageForm = qs("#messageForm");
  if (messageForm) messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLegacyAction("messages", {
      category: messageForm.elements.category.value,
      body: messageForm.elements.body.value,
      actor: getActiveRole().userId,
      actor_role: activeRole,
    });
  });
  qsa(".planning-add-form").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLegacyAction("checklist", { stage: form.dataset.stage, label: form.elements.label.value, content: form.elements.content.value, actor: getActiveRole().userId });
  }));
  qsa(".planning-item-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await runLegacyAction(`checklist/${encodeURIComponent(form.dataset.checklistId)}/edit`, { label: form.elements.label.value, content: form.elements.content.value, actor: getActiveRole().userId });
    });
    const deleteButton = qs(".planning-delete", form);
    if (deleteButton) deleteButton.addEventListener("click", async () => {
      if (window.confirm("確定刪除此檢核項？")) await runLegacyAction(`checklist/${encodeURIComponent(form.dataset.checklistId)}/delete`, { actor: getActiveRole().userId });
    });
  });
  const confirmExecutionBaseline = qs("#confirmExecutionBaseline");
  if (confirmExecutionBaseline) confirmExecutionBaseline.addEventListener("click", async () => {
    await runLegacyAction("execution-checklist-baseline/confirm", { party: confirmExecutionBaseline.dataset.party, actor: getActiveRole().userId });
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
    ? { expected_version: project.version, actor: getActiveRole().userId, actor_role: activeRole, reason: "Direct intake approved for D1 design preparation" }
    : { expected_version: project.version, actor: getActiveRole().userId, actor_role: activeRole, outcome: "Passed", reason: "Evidence reviewed in project workspace" };
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
          identity: getActiveRole(),
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
  const roleAliases = { agency: "dealer", designer: "certified_designer", owner: "general_member" };
  const requestedRole = params.get("role");
  const role = roleAliases[requestedRole] || requestedRole;

  if (projectCases.some((item) => item.id === caseId)) activeCaseId = caseId;
  if (roles.some((item) => item.id === role)) activeRole = role;
  setView(views[view] ? view : "home");
  if (params.get("newCase") === "1") {
    const creator = qs("#caseCreator");
    if (creator) creator.hidden = false;
  }
}

async function init() {
  qsa(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  setupWorkbench();
  setupDirectIntake();

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

  const fieldRefresh = qs("#fieldRefresh");
  if (fieldRefresh) fieldRefresh.addEventListener("click", loadFieldEvidence);
  const fieldCreateRequirement = qs("#fieldCreateRequirement");
  if (fieldCreateRequirement) fieldCreateRequirement.addEventListener("click", createFieldRequirement);
  const fieldRegisterProvider = qs("#fieldRegisterProvider");
  if (fieldRegisterProvider) fieldRegisterProvider.addEventListener("click", registerFieldProvider);
  const fieldDetectDefects = qs("#fieldDetectDefects");
  if (fieldDetectDefects) fieldDetectDefects.addEventListener("click", detectFieldDefects);
  const fieldBatchCapture = qs("#fieldBatchCapture");
  if (fieldBatchCapture) fieldBatchCapture.addEventListener("click", batchCaptureFieldMedia);
  const fieldMapMedia = qs("#fieldMapMedia");
  if (fieldMapMedia) fieldMapMedia.addEventListener("click", mapSelectedFieldMedia);
  const fieldGenerateLog = qs("#fieldGenerateLog");
  if (fieldGenerateLog) fieldGenerateLog.addEventListener("click", generateFieldConstructionLog);
  const fieldManualSubmit = qs("#fieldManualSubmit");
  if (fieldManualSubmit) fieldManualSubmit.addEventListener("click", submitManualFieldEvidence);
  const knowledgeSearchBtn = qs("#knowledgeSearchBtn");
  if (knowledgeSearchBtn) knowledgeSearchBtn.addEventListener("click", queryGovernanceKnowledge);

  const r9RefreshBtn = qs("#r9RefreshBtn");
  if (r9RefreshBtn) r9RefreshBtn.addEventListener("click", loadR9GovernanceObjects);
  const r9CaseSelect = qs("#r9CaseSelect");
  if (r9CaseSelect) r9CaseSelect.addEventListener("change", loadR9GovernanceObjects);

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
  initFromUrl();
  await loadProjectCases();
  renderProjectWorkspace();
  renderWorkbench();
  await loadLegacyWorkspace();
}

document.addEventListener("DOMContentLoaded", init);
