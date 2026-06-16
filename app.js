

const views = {
  overview: "台灣室內裝修產業治理基礎設施",
  gate: "不可回溯 Gate 狀態機",
  passport: "Project Governance Passport",
  risk: "AI RiskScore 風險評分",
  glevel: "G-Level 治理評級制度",
  association: "公會治理中心",
  architecture: "技術架構與 API",
  sbir: "SBIR V2.1 研發計畫",
  business: "商業模式與收入層",
};

const gates = [
  { id: "D1", name: "需求建檔", text: "屋主需求、預算、空間條件" },
  { id: "D2", name: "設計確認", text: "設計範圍、圖說、材料方向" },
  { id: "D3", name: "報價確認", text: "工項、數量、版本差異表" },
  { id: "C1", name: "合約簽署", text: "付款節點、責任、變更規則" },
  { id: "C2", name: "施工啟動", text: "施工排程、現場保護、開工紀錄" },
  { id: "C3", name: "變更管理", text: "追加減、照片、簽核紀錄" },
  { id: "C4", name: "驗收結算", text: "驗收清單、尾款、保固" },
  { id: "C5", name: "治理歸檔", text: "PGP、RiskScore、G-Level 更新" },
];

const gateRules = [
  { label: "文件完整性", text: "本 Gate 所需圖說、報價、附件與簽核不得缺漏。" },
  { label: "雙方確認", text: "屋主、設計師或工程商須完成責任確認。" },
  { label: "Checklist 檢核", text: "24 項治理檢核需依目前節點完成必要項。" },
  { label: "Evidence 存證", text: "照片、合約與報價版本需寫入 Evidence Vault。" },
  { label: "不可回溯", text: "通過後不能直接覆蓋前版，變更需建立追加紀錄。" },
  { label: "風險檢查", text: "RiskScore 若超過門檻，需先完成處置建議。" },
];

const audit = [
  ["2026-06-14 09:18", "D1 → D2", "需求表與初步預算確認完成", "系統"],
  ["2026-06-14 10:42", "D2 → D3", "設計範圍與材料方向已簽核", "設計師"],
  ["2026-06-14 14:05", "D3 補件", "報價版本差異表缺付款節點", "AI Agent"],
  ["2026-06-14 15:22", "D3 待審", "屋主確認中，禁止跳轉 C1", "iSAFE Gate"],
];

const checks = [
  ["需求表", "屋主需求完整", "done"],
  ["預算範圍", "預算級距已確認", "done"],
  ["設計圖說", "平面配置與風格方向", "done"],
  ["材料方向", "主材與替代方案", "done"],
  ["照片存證", "EXIF 與時間戳完整", "done"],
  ["版本雜湊", "SHA-256 已建立", "done"],
  ["報價版本", "缺版本差異表", "risk"],
  ["付款節點", "需與 Gate 綁定", "risk"],
  ["合約條款", "待 C1 建立", ""],
  ["施工排程", "待 C2 建立", ""],
  ["驗收標準", "待 C4 建立", ""],
];

const riskFactors = [
  ["文件缺漏", 42, "warning"],
  ["變更頻率", 26, ""],
  ["付款節點", 54, "danger"],
  ["施工複雜度", 30, ""],
  ["雙方確認延遲", 18, ""],
];

const levels = [
  ["G1", "基本建檔", "入門"],
  ["G2", "文件與 Gate 合規", "合格"],
  ["G3", "低風險履約紀錄", "目前"],
  ["G4", "穩定交付與低爭議", "優良"],
  ["G5", "可金融/保險合作", "標竿"],
];

let currentGate = 2;

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setView(viewId) {
  qsa(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
  qsa(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  qs("#view-title").textContent = views[viewId] || views.overview;
}

function renderGateMachine() {
  const target = qs("#gateMachine");
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
  qs("#currentGateLabel").textContent = `目前：${current.id} ${current.name}`;
}

function renderGateRules() {
  qs("#gateRules").innerHTML = gateRules
    .map((rule) => `<div class="rule-item"><strong>${rule.label}</strong><span>${rule.text}</span></div>`)
    .join("");
}

function renderAuditRows() {
  qs("#auditRows").innerHTML = [
    `<div class="audit-row header"><div>時間</div><div>狀態</div><div>事件</div><div>來源</div></div>`,
    ...audit.map((row) => `<div class="audit-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`),
  ].join("");
}

function renderPassportChecks() {
  qs("#passportChecks").innerHTML = checks
    .map(
      ([label, text, state]) => `
      <div class="check-item ${state}">
        <strong>${state === "done" ? "✓" : state === "risk" ? "!" : "·"} ${label}</strong>
        <span>${text}</span>
      </div>
    `,
    )
    .join("");
}

function renderRiskBars() {
  qs("#riskBars").innerHTML = riskFactors
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
  qs("#levelLadder").innerHTML = levels
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
  qs("#demoCycleBtn").addEventListener("click", advanceCase);
  qs("#printBtn").addEventListener("click", () => window.print());

  renderGateMachine();
  renderGateRules();
  renderAuditRows();
  renderPassportChecks();
  renderRiskBars();
  renderLevels();
}

init();

<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>iSAFE 2.0 | 產業數位治理工作台</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar" aria-label="iSAFE 2.0 navigation">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true">iS</div>
          <div>
            <div class="brand-name">iSAFE 2.0</div>
            <div class="brand-sub">Governance OS</div>
          </div>
        </div>

        <nav class="nav-list" aria-label="Main sections">
          <button class="nav-item active" data-view="overview" type="button">
            <span class="nav-icon" aria-hidden="true">⌂</span>
            <span>治理總覽</span>
          </button>
          <button class="nav-item" data-view="gate" type="button">
            <span class="nav-icon" aria-hidden="true">◆</span>
            <span>Gate 狀態機</span>
          </button>
          <button class="nav-item" data-view="passport" type="button">
            <span class="nav-icon" aria-hidden="true">▣</span>
            <span>PGP 案件護照</span>
          </button>
          <button class="nav-item" data-view="risk" type="button">
            <span class="nav-icon" aria-hidden="true">◎</span>
            <span>RiskScore</span>
          </button>
          <button class="nav-item" data-view="glevel" type="button">
            <span class="nav-icon" aria-hidden="true">★</span>
            <span>G-Level 評級</span>
          </button>
          <button class="nav-item" data-view="association" type="button">
            <span class="nav-icon" aria-hidden="true">◫</span>
            <span>公會治理中心</span>
          </button>
          <button class="nav-item" data-view="architecture" type="button">
            <span class="nav-icon" aria-hidden="true">⌬</span>
            <span>技術架構</span>
          </button>
          <button class="nav-item" data-view="sbir" type="button">
            <span class="nav-icon" aria-hidden="true">▤</span>
            <span>SBIR V2.1</span>
          </button>
          <button class="nav-item" data-view="business" type="button">
            <span class="nav-icon" aria-hidden="true">₿</span>
            <span>商業模式</span>
          </button>
        </nav>

        <section class="sidebar-panel">
          <div class="panel-label">系統定位</div>
          <p>安智科技不是媒合平台，而是室內裝修產業的治理科技公司。</p>
        </section>
      </aside>

      <main class="workspace">
        <header class="topbar">
          <div>
            <div class="eyebrow">Aegis Intelligence Technology</div>
            <h1 id="view-title">台灣室內裝修產業治理基礎設施</h1>
          </div>
          <div class="topbar-actions">
            <button class="icon-button" id="printBtn" type="button" title="列印目前畫面" aria-label="列印目前畫面">⎙</button>
            <button class="primary-action" id="demoCycleBtn" type="button">案件推進</button>
          </div>
        </header>

        <section class="view active" id="overview" aria-labelledby="overview-title">
          <div class="status-strip">
            <article class="metric">
              <span class="metric-label">治理案件</span>
              <strong>128</strong>
              <span class="metric-note positive">+18 本月新增</span>
            </article>
            <article class="metric">
              <span class="metric-label">平均 RiskScore</span>
              <strong>31</strong>
              <span class="metric-note">中低風險</span>
            </article>
            <article class="metric">
              <span class="metric-label">G-Level 認證</span>
              <strong>42</strong>
              <span class="metric-note positive">設計師 / 工程商</span>
            </article>
            <article class="metric">
              <span class="metric-label">公會試點</span>
              <strong>3</strong>
              <span class="metric-note">待補正式名單</span>
            </article>
          </div>

          <div class="layout-grid overview-grid">
            <article class="surface span-7">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Product Architecture</p>
                  <h2 id="overview-title">四層治理產品架構</h2>
                </div>
                <span class="status-pill">SSOT v1</span>
              </div>
              <div class="architecture-flow" aria-label="StyleMatch AI to TWCID architecture">
                <div class="flow-node warm">
                  <strong>StyleMatch AI</strong>
                  <span>需求入口</span>
                  <small>把屋主需求、風格、預算與限制轉成可治理資料</small>
                </div>
                <div class="flow-arrow" aria-hidden="true">→</div>
                <div class="flow-node teal selected">
                  <strong>iSAFE 2.0</strong>
                  <span>治理中台</span>
                  <small>Gate、PGP、檢核、風險、履約與爭議預防</small>
                </div>
                <div class="flow-arrow" aria-hidden="true">→</div>
                <div class="flow-node coral">
                  <strong>Governance Credit</strong>
                  <span>信用引擎</span>
                  <small>讓履約紀錄可被認證、金融、保險採用</small>
                </div>
                <div class="flow-arrow" aria-hidden="true">→</div>
                <div class="flow-node">
                  <strong>TWCID</strong>
                  <span>產業入口</span>
                  <small>公會、設計師、品牌、內容與會員通路</small>
                </div>
              </div>
            </article>

            <article class="surface span-5">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Operating Thesis</p>
                  <h2>不是接案，是治理資料層</h2>
                </div>
              </div>
              <ul class="check-list">
                <li>iSAFE 必須與 TWCID 媒合平台架構性脫鉤。</li>
                <li>公會不是通路，而是產業治理中心共同推動者。</li>
                <li>Gate 狀態、PGP、RiskScore 形成可稽核資料。</li>
                <li>Checklist 與 Evidence Engine 補齊 SBIR V2.1 技術深度。</li>
                <li>G-Level 與 Governance Credit 承接商業化價值。</li>
              </ul>
            </article>

            <article class="surface span-4">
              <p class="section-kicker">2026 MVP</p>
              <h2>Gate Engine</h2>
              <p>案件不可跳關，關鍵文件與責任確認後才可推進。</p>
            </article>
            <article class="surface span-4">
              <p class="section-kicker">2027-2028</p>
              <h2>AI Governance</h2>
              <p>RiskScore、AI Agent、AI 監工與公會治理中心進入規模化。</p>
            </article>
            <article class="surface span-4">
              <p class="section-kicker">2029-2035</p>
              <h2>TIGI</h2>
              <p>串接銀行、保險、都更危老與 iSAFE 3.0。</p>
            </article>
          </div>
        </section>

        <section class="view" id="gate" aria-labelledby="gate-title">
          <div class="layout-grid">
            <article class="surface span-8">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Irreversible State Machine</p>
                  <h2 id="gate-title">不可回溯 Gate 狀態機</h2>
                </div>
                <span class="status-pill" id="currentGateLabel">目前：D3 報價確認</span>
              </div>
              <div class="gate-machine" id="gateMachine"></div>
            </article>
            <article class="surface span-4">
              <p class="section-kicker">Gate Rule</p>
              <h2>通過條件</h2>
              <div class="rule-stack" id="gateRules"></div>
            </article>
            <article class="surface span-12">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Audit Trail</p>
                  <h2>案件狀態異動紀錄</h2>
                </div>
              </div>
              <div class="audit-table" id="auditRows"></div>
            </article>
          </div>
        </section>

        <section class="view" id="passport" aria-labelledby="passport-title">
          <div class="layout-grid">
            <article class="surface span-5">
              <p class="section-kicker">Project Governance Passport</p>
              <h2 id="passport-title">PGP 案件治理護照</h2>
              <div class="passport-card">
              <div class="passport-header">
                <div>
                  <span>PGP-ID</span>
                    <strong>PGP-2026-0614-027</strong>
                  </div>
                  <span class="status-pill good">Active</span>
                </div>
              <dl class="passport-meta">
                <div><dt>案件</dt><dd>台北住宅整修</dd></div>
                <div><dt>目前 Gate</dt><dd>D3 報價確認</dd></div>
                <div><dt>設計師</dt><dd>iSAFE 認證會員</dd></div>
                <div><dt>Evidence</dt><dd>18 筆存證</dd></div>
              </dl>
            </div>
            </article>
            <article class="surface span-7">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Checklist24</p>
                  <h2>治理檢核進度</h2>
                </div>
                <span class="status-pill">18 / 24</span>
              </div>
              <div class="checklist-grid" id="passportChecks"></div>
            </article>
          </div>
        </section>

        <section class="view" id="risk" aria-labelledby="risk-title">
          <div class="layout-grid">
            <article class="surface span-4">
              <p class="section-kicker">AI RiskScore</p>
              <h2 id="risk-title">案件風險評分</h2>
              <div class="risk-dial" aria-label="Risk score 31">
                <div class="dial-ring">
                  <strong>31</strong>
                  <span>中低風險</span>
                </div>
              </div>
            </article>
            <article class="surface span-8">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Risk Factors</p>
                  <h2>風險來源拆解</h2>
                </div>
              </div>
              <div class="bar-list" id="riskBars"></div>
            </article>
            <article class="surface span-12">
              <p class="section-kicker">AI Governance Agent</p>
              <h2>建議處置</h2>
              <div class="recommendation-grid">
                <div>補齊 D3 報價版本差異表，鎖定工程範圍。</div>
                <div>付款節點需與 Gate 通過條件綁定，避免預付款爭議。</div>
                <div>施工變更需產生 PGP 追加紀錄，不可用 LINE 口頭確認取代。</div>
                <div>AI 監工照片須綁定 EXIF、時間戳與工程節點。</div>
              </div>
            </article>
          </div>
        </section>

        <section class="view" id="glevel" aria-labelledby="glevel-title">
          <div class="layout-grid">
            <article class="surface span-6">
              <p class="section-kicker">Governance Level</p>
              <h2 id="glevel-title">G-Level 治理評級制度</h2>
              <div class="level-ladder" id="levelLadder"></div>
            </article>
            <article class="surface span-6">
              <p class="section-kicker">Governance Credit</p>
              <h2>評級與信用資料分工</h2>
              <div class="split-list">
                <div>
                  <strong>G-Level</strong>
                  <span>公開治理評級，面向屋主、公會與合作夥伴。</span>
                </div>
                <div>
                  <strong>Governance Credit</strong>
                  <span>長期履約信用資料，面向金融、保險與企業合作。</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="view" id="association" aria-labelledby="association-title">
          <div class="layout-grid">
            <article class="surface span-12">
              <div class="section-head">
                <div>
                  <p class="section-kicker">Association Governance Center</p>
                  <h2 id="association-title">公會治理中心</h2>
                </div>
                <span class="status-pill">試點規劃</span>
              </div>
              <div class="association-grid">
                <div class="assoc-card"><strong>理事長 Dashboard</strong><span>會員案件治理 KPI、風險熱點與推動成效</span></div>
                <div class="assoc-card"><strong>認證制度</strong><span>iSAFE 認證會員、安心工程、優良廠商標章</span></div>
                <div class="assoc-card"><strong>教育訓練</strong><span>治理節點、文件範本、會員導入手冊</span></div>
                <div class="assoc-card"><strong>治理聯盟</strong><span>共同制定標準、G-Level、收益共享</span></div>
              </div>
            </article>
          </div>
        </section>

        <section class="view" id="architecture" aria-labelledby="architecture-title">
          <div class="layout-grid">
            <article class="surface span-12">
              <div class="section-head">
                <div>
                  <p class="section-kicker">System Architecture</p>
                  <h2 id="architecture-title">前後端分離與 AI 混合雲架構</h2>
                </div>
                <span class="status-pill">SBIR V2.1</span>
              </div>
              <div class="tech-stack">
                <div><strong>Next.js / React</strong><span>會員端、業主端、總部與公會儀表板</span></div>
                <div><strong>FastAPI</strong><span>Gate、PGP、RiskScore 與治理 API</span></div>
                <div><strong>PostgreSQL</strong><span>案件、狀態、檢核、證據與信用資料</span></div>
                <div><strong>Redis</strong><span>任務佇列、快取、通知與非同步處理</span></div>
                <div><strong>MinIO / S3</strong><span>圖說、照片、合約與 Evidence Vault</span></div>
                <div><strong>AI Hybrid Cloud</strong><span>LLM、YOLOv8、ComfyUI 與私有 GPU 工作流</span></div>
              </div>
            </article>
            <article class="surface span-6">
              <p class="section-kicker">API Contract</p>
              <h2>核心 API 示意</h2>
              <div class="api-list">
                <code>GET /api/v2/cases/{id}/pgp</code>
                <code>POST /api/v2/gate/verify</code>
                <code>POST /api/v2/evidence/upload</code>
                <code>GET /api/v2/risk/{caseId}/score</code>
              </div>
            </article>
            <article class="surface span-6">
              <p class="section-kicker">Traceability</p>
              <h2>不可篡改證據鏈</h2>
              <ul class="check-list">
                <li>每筆文件與照片保存 SHA-256 hash。</li>
                <li>AI 監工照片保存 EXIF、GPS、timestamp 與 Gate 關聯。</li>
                <li>狀態異動寫入 state_log，禁止覆蓋前版事實。</li>
                <li>PGP 可於 C5 一鍵輸出案件治理履歷。</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="view" id="sbir" aria-labelledby="sbir-title">
          <div class="layout-grid">
            <article class="surface span-12">
              <div class="section-head">
                <div>
                  <p class="section-kicker">SBIR V2.1</p>
                  <h2 id="sbir-title">九大研發引擎與驗收指標</h2>
                </div>
                <span class="status-pill">12 個月 MVP</span>
              </div>
              <div class="engine-grid">
                <div>State Machine Engine</div>
                <div>Gate Governance Engine</div>
                <div>Checklist Engine</div>
                <div>Evidence Engine</div>
                <div>PGP Engine</div>
                <div>RiskScore Engine</div>
                <div>Governance Credit Engine</div>
                <div>AI Governance Assistant</div>
                <div>Multi-Agent Governance</div>
              </div>
            </article>
            <article class="surface span-7">
              <p class="section-kicker">KPI</p>
              <h2>計畫執行期驗收目標</h2>
              <div class="kpi-table">
                <div class="kpi-row header"><span>分類</span><span>指標</span><span>目標</span></div>
                <div class="kpi-row"><span>技術</span><span>Gate / 狀態機完備度</span><span>&gt;85%</span></div>
                <div class="kpi-row"><span>治理</span><span>PGP 護照生成率</span><span>100%</span></div>
                <div class="kpi-row"><span>AI</span><span>Risk Alert Recall</span><span>≥0.75</span></div>
                <div class="kpi-row"><span>落地</span><span>AAA 認證會員</span><span>≥50 家</span></div>
              </div>
            </article>
            <article class="surface span-5">
              <p class="section-kicker">IP Strategy</p>
              <h2>專利與營業秘密</h2>
              <ul class="check-list">
                <li>延伸既有專利 I670676。</li>
                <li>申請 RiskScore 動態算分相關專利。</li>
                <li>Evidence Engine 影像存證與查驗工作台。</li>
                <li>StyleMatch embedding、YOLOv8 模型與 Agent prompt 作為營業秘密。</li>
              </ul>
            </article>
            <article class="surface span-12">
              <p class="section-kicker">Roadmap</p>
              <h2>12 個月研發時程</h2>
              <div class="roadmap-strip">
                <div><strong>M1-M2</strong><span>需求、資料結構、API 規格</span></div>
                <div><strong>M3-M4</strong><span>Gate、Checklist、Evidence 開發</span></div>
                <div><strong>M5-M6</strong><span>PGP、RiskScore、治理儀表板</span></div>
                <div><strong>M7-M8</strong><span>StyleMatch AI 與 AI 監工整合</span></div>
                <div><strong>M9-M12</strong><span>試點導入、KPI 驗證、商業化準備</span></div>
              </div>
            </article>
          </div>
        </section>

        <section class="view" id="business" aria-labelledby="business-title">
          <div class="layout-grid">
            <article class="surface span-12">
              <p class="section-kicker">Business Model</p>
              <h2 id="business-title">從 SaaS 到治理信用的收入層</h2>
              <div class="business-model">
                <div><strong>認證會員年費</strong><span>安心裝修認證與案件曝光加權</span></div>
                <div><strong>治理服務費</strong><span>Gate、Evidence 與 PGP 維護按件或訂閱收費</span></div>
                <div><strong>AI 提案費</strong><span>StyleMatch AI 進階風格報告與預算導出</span></div>
                <div><strong>公會白牌 SaaS</strong><span>治理中心、會員管理、授權與維護費</span></div>
                <div><strong>教育訓練費</strong><span>AI 賦能與治理標準認證課程</span></div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
    <script src="app.js"></script>
  </body>
</html>

# iSAFE 2.0 Website Prototype

This is a static website prototype for iSAFE 2.0, focused on renovation governance, state-machine workflows, evidence management, SBIR planning, and investor-facing positioning.

## Files

- `index.html` - Main website structure and content.
- `styles.css` - Responsive visual design and layout.
- `app.js` - View switching, controls, and lightweight interactions.
- `.nojekyll` - Keeps GitHub Pages from applying Jekyll processing.

## Local Preview

Open `index.html` directly in a browser, or run a local static server:

```powershell
python -m http.server 4177
```

Then visit:

```text
http://127.0.0.1:4177
```

## GitHub Pages

After uploading to GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Choose `Deploy from a branch`.
4. Select the `main` branch and `/root`.
5. Save, then wait for GitHub Pages to publish the site.

:root {
  --ink: #132033;
  --muted: #5d6a78;
  --line: #d8d4ca;
  --paper: #f7f4ee;
  --surface: #fffdf9;
  --sidebar: #142335;
  --teal: #1f7a7a;
  --teal-soft: #e7f2f1;
  --gold: #b5822f;
  --gold-soft: #f6ecd8;
  --coral: #c45f4a;
  --coral-soft: #f5e5df;
  --green: #2f7d4e;
  --red: #aa3f35;
  --shadow: 0 18px 50px rgba(38, 31, 20, 0.08);
  color-scheme: light;
  font-family:
    "Microsoft JhengHei",
    "PingFang TC",
    "Noto Sans TC",
    "Segoe UI",
    Arial,
    sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
}

button {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  background: var(--sidebar);
  color: #edf2f5;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: #edf2f5;
  color: var(--sidebar);
  font-weight: 800;
  letter-spacing: 0;
}

.brand-name {
  font-size: 20px;
  font-weight: 800;
}

.brand-sub {
  color: #aab7c3;
  font-size: 12px;
  margin-top: 2px;
}

.nav-list {
  display: grid;
  gap: 7px;
}

.nav-item {
  width: 100%;
  min-height: 42px;
  border: 0;
  background: transparent;
  color: #d8e0e7;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  align-items: center;
  text-align: left;
  padding: 8px 10px;
  cursor: pointer;
}

.nav-item:hover,
.nav-item.active {
  background: #20364c;
  color: #fff;
}

.nav-icon {
  color: #cfa056;
  font-size: 15px;
  text-align: center;
}

.sidebar-panel {
  margin-top: auto;
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 14px;
  color: #c9d3dc;
}

.panel-label,
.eyebrow,
.section-kicker {
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 800;
}

.panel-label {
  color: #d9ad63;
  margin-bottom: 8px;
}

.sidebar-panel p {
  margin: 0;
  line-height: 1.55;
  font-size: 14px;
}

.workspace {
  min-width: 0;
  padding: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 22px;
}

.eyebrow {
  color: var(--teal);
  margin-bottom: 8px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  font-size: 32px;
  line-height: 1.16;
  margin-bottom: 0;
  letter-spacing: 0;
}

h2 {
  font-size: 21px;
  line-height: 1.25;
  margin-bottom: 12px;
}

p {
  line-height: 1.65;
  color: var(--muted);
}

.topbar-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.icon-button,
.primary-action {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  min-height: 40px;
  cursor: pointer;
}

.icon-button {
  width: 42px;
  font-size: 18px;
}

.primary-action {
  padding: 0 16px;
  background: var(--ink);
  color: white;
  border-color: var(--ink);
  font-weight: 800;
}

.view {
  display: none;
}

.view.active {
  display: block;
}

.status-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.metric,
.surface {
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.metric {
  padding: 16px;
  min-height: 110px;
}

.metric-label,
.metric-note {
  display: block;
  color: var(--muted);
  font-size: 13px;
}

.metric strong {
  display: block;
  font-size: 34px;
  line-height: 1.1;
  margin: 8px 0;
}

.metric-note.positive {
  color: var(--green);
  font-weight: 700;
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 16px;
}

.surface {
  padding: 20px;
  min-height: 150px;
}

.span-4 {
  grid-column: span 4;
}

.span-5 {
  grid-column: span 5;
}

.span-6 {
  grid-column: span 6;
}

.span-7 {
  grid-column: span 7;
}

.span-8 {
  grid-column: span 8;
}

.span-12 {
  grid-column: span 12;
}

.section-head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.section-kicker {
  color: var(--gold);
  margin-bottom: 8px;
  line-height: 1.2;
}

.status-pill {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid var(--line);
  background: #f4f1ea;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.status-pill.good {
  color: var(--green);
  background: #eaf4ee;
  border-color: #c8dfd0;
}

.architecture-flow {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) 26px minmax(150px, 1fr) 26px minmax(150px, 1fr) 26px minmax(150px, 1fr);
  gap: 8px;
  align-items: stretch;
}

.flow-node {
  border: 1px solid var(--line);
  background: #fff;
  padding: 16px;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-node.selected {
  border-color: var(--teal);
  box-shadow: inset 0 0 0 2px rgba(31, 122, 122, 0.12);
}

.flow-node.warm {
  background: var(--gold-soft);
}

.flow-node.teal {
  background: var(--teal-soft);
}

.flow-node.coral {
  background: var(--coral-soft);
}

.flow-node strong {
  font-size: 18px;
}

.flow-node span {
  font-weight: 800;
  color: var(--teal);
}

.flow-node small {
  color: var(--muted);
  line-height: 1.55;
}

.flow-arrow {
  display: grid;
  place-items: center;
  color: var(--gold);
  font-size: 22px;
  font-weight: 800;
}

.check-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.check-list li {
  position: relative;
  padding-left: 24px;
  line-height: 1.55;
  color: var(--muted);
}

.check-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--green);
  font-weight: 900;
}

.gate-machine {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.gate-node {
  border: 1px solid var(--line);
  background: #fff;
  padding: 14px;
  min-height: 118px;
  position: relative;
}

.gate-node.done {
  background: #eaf4ee;
  border-color: #bad7c4;
}

.gate-node.current {
  background: var(--teal-soft);
  border-color: var(--teal);
}

.gate-node.locked {
  color: #7e8790;
  background: #f2f0eb;
}

.gate-node strong {
  display: block;
  margin-bottom: 8px;
}

.gate-node small {
  color: var(--muted);
  line-height: 1.5;
}

.rule-stack {
  display: grid;
  gap: 10px;
}

.rule-item {
  border: 1px solid var(--line);
  padding: 12px;
  background: #fff;
}

.rule-item strong {
  display: block;
  margin-bottom: 4px;
}

.rule-item span {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.audit-table {
  display: grid;
  border: 1px solid var(--line);
}

.audit-row {
  display: grid;
  grid-template-columns: 150px 160px minmax(0, 1fr) 160px;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  align-items: center;
  font-size: 14px;
}

.audit-row:last-child {
  border-bottom: 0;
}

.audit-row.header {
  background: #f2eee5;
  font-weight: 800;
  color: var(--ink);
}

.passport-card {
  border: 1px solid var(--line);
  background: var(--teal-soft);
}

.passport-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px;
  border-bottom: 1px solid var(--line);
}

.passport-header span,
.passport-meta dt {
  color: var(--muted);
  font-size: 12px;
}

.passport-header strong {
  display: block;
  margin-top: 4px;
  font-size: 18px;
}

.passport-meta {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.passport-meta div {
  padding: 14px 18px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.passport-meta div:nth-child(2n) {
  border-right: 0;
}

.passport-meta div:nth-last-child(-n + 2) {
  border-bottom: 0;
}

.passport-meta dd {
  margin: 4px 0 0;
  font-weight: 800;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.check-item {
  min-height: 76px;
  border: 1px solid var(--line);
  padding: 12px;
  background: #fff;
}

.check-item.done {
  border-color: #bad7c4;
  background: #edf6f0;
}

.check-item.risk {
  border-color: #e3b8ad;
  background: var(--coral-soft);
}

.check-item strong {
  display: block;
  margin-bottom: 6px;
}

.check-item span {
  color: var(--muted);
  font-size: 13px;
}

.risk-dial {
  min-height: 260px;
  display: grid;
  place-items: center;
}

.dial-ring {
  width: 210px;
  height: 210px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  align-content: center;
  background:
    radial-gradient(circle at center, var(--surface) 0 57%, transparent 58%),
    conic-gradient(var(--teal) 0 31%, var(--line) 31% 100%);
}

.dial-ring strong {
  font-size: 54px;
  line-height: 1;
}

.dial-ring span {
  color: var(--muted);
  font-weight: 800;
}

.bar-list {
  display: grid;
  gap: 14px;
}

.bar-item {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr) 54px;
  gap: 12px;
  align-items: center;
}

.bar-track {
  height: 14px;
  background: #ebe7de;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--teal);
}

.bar-item.warning .bar-fill {
  background: var(--gold);
}

.bar-item.danger .bar-fill {
  background: var(--coral);
}

.recommendation-grid,
.business-model,
.association-grid,
.tech-stack,
.engine-grid,
.roadmap-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.recommendation-grid div,
.business-model div,
.assoc-card,
.tech-stack div,
.engine-grid div,
.roadmap-strip div {
  border: 1px solid var(--line);
  background: #fff;
  padding: 15px;
  min-height: 112px;
  line-height: 1.55;
}

.business-model strong,
.assoc-card strong,
.tech-stack strong,
.roadmap-strip strong {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
}

.business-model span,
.assoc-card span,
.tech-stack span,
.roadmap-strip span {
  color: var(--muted);
  line-height: 1.55;
}

.engine-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.engine-grid div {
  min-height: 68px;
  display: grid;
  place-items: center;
  text-align: center;
  font-weight: 800;
  background: var(--teal-soft);
}

.api-list {
  display: grid;
  gap: 10px;
}

.api-list code {
  display: block;
  padding: 12px;
  background: #172538;
  color: #eef5f6;
  font-family: "Cascadia Mono", Consolas, monospace;
  font-size: 14px;
  overflow-wrap: anywhere;
}

.kpi-table {
  display: grid;
  border: 1px solid var(--line);
}

.kpi-row {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) 120px;
  border-bottom: 1px solid var(--line);
}

.kpi-row:last-child {
  border-bottom: 0;
}

.kpi-row span {
  padding: 12px;
  border-right: 1px solid var(--line);
}

.kpi-row span:last-child {
  border-right: 0;
  font-weight: 800;
  color: var(--teal);
}

.kpi-row.header {
  background: #f2eee5;
  font-weight: 800;
}

.roadmap-strip {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.roadmap-strip div {
  min-height: 124px;
  background: var(--gold-soft);
}

.level-ladder {
  display: grid;
  gap: 10px;
}

.level-row {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) 86px;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  background: #fff;
  padding: 12px;
}

.level-row.current {
  background: var(--teal-soft);
  border-color: var(--teal);
}

.level-row strong {
  font-size: 18px;
}

.level-row span {
  color: var(--muted);
  line-height: 1.45;
}

.split-list {
  display: grid;
  gap: 14px;
}

.split-list div {
  border: 1px solid var(--line);
  background: #fff;
  padding: 18px;
  min-height: 130px;
}

.split-list strong {
  display: block;
  font-size: 21px;
  margin-bottom: 10px;
}

.split-list span {
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
  }

  .nav-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .status-strip,
  .architecture-flow,
  .recommendation-grid,
  .business-model,
  .association-grid,
  .tech-stack,
  .engine-grid,
  .roadmap-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .flow-arrow {
    display: none;
  }

  .span-4,
  .span-5,
  .span-6,
  .span-7,
  .span-8 {
    grid-column: span 12;
  }
}

@media (max-width: 680px) {
  .workspace {
    padding: 18px;
  }

  .topbar {
    flex-direction: column;
  }

  h1 {
    font-size: 26px;
  }

  .status-strip,
  .architecture-flow,
  .recommendation-grid,
  .business-model,
  .association-grid,
  .tech-stack,
  .engine-grid,
  .roadmap-strip,
  .checklist-grid,
  .passport-meta,
  .nav-list {
    grid-template-columns: 1fr;
  }

  .kpi-row {
    grid-template-columns: 1fr;
  }

  .kpi-row span {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .kpi-row span:last-child {
    border-bottom: 0;
  }

  .audit-row {
    grid-template-columns: 1fr;
  }

  .passport-meta div,
  .passport-meta div:nth-child(2n),
  .passport-meta div:nth-last-child(-n + 2) {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .passport-meta div:last-child {
    border-bottom: 0;
  }
}

@media print {
  .sidebar,
  .topbar-actions {
    display: none;
  }

  .app-shell {
    display: block;
  }

  .workspace {
    padding: 0;
  }

  .view {
    display: block;
    page-break-after: always;
  }
}
