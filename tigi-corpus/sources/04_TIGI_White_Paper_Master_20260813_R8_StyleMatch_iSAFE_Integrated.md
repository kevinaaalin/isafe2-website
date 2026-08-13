# TIGI White Paper Master

- 版本：`20260813_R8_StyleMatch_iSAFE_Integrated`
- 發布識別：`TIGI-GOVERNANCE-20260813-R8-SM-ISAFE`
- 內容基礎：R5.2 State Machine、R5.2.1 GS30 Recovery 與 20260723 Legacy Functional Parity
- 契約保留：20260722_R5.1 Accepted ADR、Master、Annexes 與 canonical contract
- 狀態機修正：20260722_R5.2 State Machine ADR、Master 與 isafe-state-machine-r5.2.json
- 適用範圍：產業倡議、政策溝通、標準推廣與生態系共識
- 發布狀態：R7.1 Implementation QA Integrated Baseline；435 筆 DGM/DGI 來源已取得，但治理核准、ID 遷移、正式 SaaS 控制及 GitHub 部署完成前不得標示 Final Official

## 2. 產業問題

設計工程產業的核心缺口不是缺少更多工具，而是缺少跨角色、跨階段、可追溯且可驗收的治理語言。

### R5.2 整合內容與契約

- 本版保留 R5 Final 與 R5.1 全部契約修正，再疊加 R5.2 iSAFE 狀態機；發布狀態仍為 Release Candidate。
- 本文件保留 R5 Final 的完整用途化內容，契約衝突依 R5.2 State Machine ADR 與 R5.1 Accepted ADR 與 canonical contract 修正。
- R6.1 為 Governance Integration Release Candidate；本整合版不得標示 Final Official。
- 「文件目的與適用範圍」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 「TIGI 平台定位」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 「審計軌跡與版本追溯」由明定的產品 Owner 寫入，其他產品只能依 Scope 讀取或提交草稿。

### 控制與驗收

- 任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 「TIGI 平台定位」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。

## 3. 治理基礎建設必要性

TIGI 將標準、識別、資料契約、Evidence、Gate、Audit 與文件體系建成可重複使用的產業基礎。

### R5.2 整合內容與契約

- iSAFE 以 isafe_case_id 負責 StepInstance、Evidence、Gate、Risk、NCR／CAPA、驗收、保固與 PGP；正式治理決策由規則及授權角色完成。
- 「TIGI 平台定位」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 建立「TIGI-GS-01～30 總表」的 Registry ID、名稱、版本、Owner、有效期間與狀態。
- 「正式文件體系」引用 R5 Canonical 名稱與決策，不重複貼入整份工程母本。
- 本章在「TIGI White Paper Master」中的用途，是把「治理基礎建設必要性」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「TIGI 平台定位」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 禁止重複 ID、未核准改名與刪除歷史版本；失效項目改以狀態和有效日管理。

## 4. TIGI-GS-01～30

TIGI-GS-01～30 已依 2026-07-13 Version Freeze 原始 Official Edition 完成名稱與用途復原，作為本文件的共同治理基準。

### R5.2 整合內容與契約

- TIGI-GS-01｜案件識別標準：確保每個案件具有唯一 Project ID、流程及版本
- TIGI-GS-02｜角色責任標準：定義業主、設計師、施工單位、審核者的責任與權限
- TIGI-GS-03｜節點進入標準：定義進入下一步驟前必須完成的前置條件
- TIGI-GS-04｜Gate驗證標準：規定 Gate 如何檢查文件、簽核、照片、檢核及付款條件
- TIGI-GS-05｜狀態轉換標準：防止非法跳關，保存操作者與時間
- TIGI-GS-06｜例外處理標準：管理 Fallback、Override、暫停與例外核准
- TIGI-GS-07｜案件資料標準：統一案件必要欄位、代碼與資料型別
- TIGI-GS-08｜參與者與權限標準：管理角色、授權範圍及有效期間
- TIGI-GS-09｜Artifact中繼資料標準：規範圖說、照片、文件的來源、類型及版本
- TIGI-GS-10｜版本與變更標準：新資料不得覆蓋舊版本，必須保留變更原因
- TIGI-GS-11｜治理事件標準：保存誰、何時、對什麼資料、做了什麼操作及結果
- TIGI-GS-12｜交換與互通標準：統一 API Schema、代碼、錯誤碼及交換版本
- TIGI-GS-13｜證據識別標準：每一 Evidence 具有唯一 ID 並關聯案件、步驟及 Gate
- TIGI-GS-14｜完整性標準：保存 SHA-256、檔案大小及完整性驗證資料
- TIGI-GS-15｜採集中繼資料標準：保存時間、來源、裝置及可取得的 EXIF／GPS
- TIGI-GS-16｜證據鏈標準：追蹤上傳、引用、驗證、簽核及封存歷程
- TIGI-GS-17｜簽核與見證標準：保存簽核人、角色、意圖、時間及簽核版本
- TIGI-GS-18｜保存與封存標準：規定保存期限、封存、Legal Hold 及刪除程序
- TIGI-GS-19｜Checklist標準：規定檢核項目、結果、證據、檢查人及版本
- TIGI-GS-20｜不符合事項標準：記錄缺失類型、嚴重度、責任人及改善期限
- TIGI-GS-21｜改善閉環標準：管理改善、複驗及缺失關閉條件
- TIGI-GS-22｜風險評分標準：規範 RiskScore 規則、權重、分數與版本
- TIGI-GS-23｜驗收與交付標準：規範驗收範圍、缺失、簽認及交付清單
- TIGI-GS-24｜保固與結案標準：管理保固期間、維修責任、PGP 及案件封存
- TIGI-GS-25｜合約基線治理標準：確認工程範圍、圖說、估價、工期、付款及變更基準一致
- TIGI-GS-26｜工項與施工期別治理標準：將個案工項配置至第一、二、三期工程施工及對應責任角色
- TIGI-GS-27｜付款節點與資格治理標準：規範 Gate、驗收、追加減、保留款及付款資格間的關係
- TIGI-GS-28｜數位治理手冊綁定標準：規範 24 張手冊如何綁定步驟、工項、Evidence 及 Gate
- TIGI-GS-29｜AI輔助治理標準：規範 AI 模型版本、輸入輸出、人工確認及不得取代專業判斷
- TIGI-GS-30｜消費者旅程與資料回饋標準：規範 StyleMatch AI、TWCID、iSAFE 及成果回饋的資料串聯與使用限制

### 控制與驗收

- 本文件中的 TIGI-GS 名稱與用途必須與復原 Registry 30/30 一致。
- Gate 通過只代表治理條件成立，不等於 Payment Eligibility、Invoice、付款核准或付款執行。
- 後續變更必須以 ADR、新版 Registry 與跨格式一致性驗證處理。

## 5. iSAFE-DGM-01～24

維持 iSAFE-DGM-01～24 為室內裝修數位治理手冊範圍，以 Registry 管理名稱、適用步驟、工項與版本。

### R5.2 整合內容與契約

- iSAFE-DGM Registry 共 24 個穩定 ID，來源完整 24/24；目前均待治理核准與發布整合。
- 本文件只引用命名範圍、流程角色與待補狀態，不虛構治理手冊名稱或正文。
- 權威內容補入後必須完成版本、來源、核准與三格式一致性檢查。

### 控制與驗收

- 「iSAFE-DGM-01～24 命名」驗收時，禁止重複 ID、未核准改名與刪除歷史版本；失效項目改以狀態和有效日管理。
- AI 或未授權角色嘗試寫入正式治理欄位時必須拒絕並留下 Audit。

## 6. DGI 與可追溯題碼

維持 411 個 DGI 唯一題碼資產，題目正文以權威題庫為準，不在主文件重複貼入尚未核准發布的逐題正文。

### R5.2 整合內容與契約

- DGI 411 題來源完整；目前狀態為 SOURCE_FOUND_PENDING_GOVERNANCE_APPROVAL，並保留 DGI-001～411 legacy alias。
- 題碼不得因文字修訂重用；改題建立新版本，停用題目保留歷史狀態。
- 不得改寫權威題庫，亦不得宣稱 411 題的治理核准與正式發布整合已完成。

### 控制與驗收

- 「411 題 DGI 題碼策略」驗收時，禁止重複 ID、未核准改名與刪除歷史版本；失效項目改以狀態和有效日管理。
- 「REQUIREMENT / RISK_SIGNAL / CONTROL 分類」驗收時，禁止重複 ID、未核准改名與刪除歷史版本；失效項目改以狀態和有效日管理。

## 7. 九類命名空間

凍結九類命名空間 TIGI-GS、iSAFE-DGM、DGI、WI、G、PM、EVD、NCR、CAPA，避免文件與系統另創同義代碼。

### R5.2 整合內容與契約

- 建立「九類命名空間」的 Registry ID、名稱、版本、Owner、有效期間與狀態。
- 「PM / G / WI 編碼」由明定的產品 Owner 寫入，其他產品只能依 Scope 讀取或提交草稿。
- 「EVD / NCR / CAPA 編碼」由明定的產品 Owner 寫入，其他產品只能依 Scope 讀取或提交草稿。
- 本章在「TIGI White Paper Master」中的用途，是把「九類命名空間」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「九類命名空間」驗收時，禁止重複 ID、未核准改名與刪除歷史版本；失效項目改以狀態和有效日管理。
- 「PM / G / WI 編碼」驗收時，不得共用產品資料庫、跨站 Token 或前端 localStorage 作正式整合；服務端必須重驗 Tenant Context。

## 8. 消費者旅程

跨產品旅程由 journey_id 串聯 StyleMatch、TWCID、正式 Project、iSAFE 與 DEOS，不以 Email 或手機當主鍵。

### R5.2 整合內容與契約

- Canonical ID 明確區分 stylematch_project_id、match_case_id、project_id、isafe_case_id、handover_id、ai_task_id 與 trace_id，不再混用 project_id 或 case_id。
- 「消費者旅程資料回饋模型」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 「工程案例流程」明確定義前置輸入、責任角色、活動、輸出、Evidence、例外與完成 Gate。
- 「附錄 E：資料回饋迴圈」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 本章在「TIGI White Paper Master」中的用途，是把「消費者旅程」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「消費者旅程資料回饋模型」驗收時，寫入前執行 Schema、租戶、授權、狀態、必填與參照完整性驗證。
- 前置條件未滿足不得跳步；Override 需具權限、理由、證據、期限與事後審查。

## 9. StyleMatch AI

凍結四產品責任：TWCID 負責會員與媒合；StyleMatch AI 負責 AI 能力；iSAFE 負責治理；DEOS 負責治理後營運。

### R5.2 整合內容與契約

- 高影響 AI Trace 必含：agent_id、model_provider、model_version、prompt_version、knowledge_version、input_hash、output_hash、citations、warnings、confidence、token_compute_usage、human_confirmation、retention_policy。
- AI 不得直接寫入 MatchResult、ContractBaselineApproval、GateDecision、RiskScore、EvidenceAcceptance、PaymentEligibility、PaymentApproval 或 DEOSTransaction。
- Canonical ID 明確區分 stylematch_project_id、match_case_id、project_id、isafe_case_id、handover_id、ai_task_id 與 trace_id，不再混用 project_id 或 case_id。
- 「StyleMatch AI / TWCID / iSAFE 2.0 關係」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 「AI 輔助治理資料模型」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 「StyleMatch AI 前端事件」由明定的產品 Owner 寫入，其他產品只能依 Scope 讀取或提交草稿。

### 控制與驗收

- 「StyleMatch AI / TWCID / iSAFE 2.0 關係」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 「AI 輔助治理資料模型」驗收時，寫入前執行 Schema、租戶、授權、狀態、必填與參照完整性驗證。

## 10. TWCID

凍結四產品責任：TWCID 負責會員與媒合；StyleMatch AI 負責 AI 能力；iSAFE 負責治理；DEOS 負責治理後營運。

### R5.2 整合內容與契約

- TWCID 擁有會員、內容、match_case_id、候選、邀標／招標、媒合決策、成交、評價及授權快照；AI 能力由 StyleMatch AI API 提供。
- 「StyleMatch AI / TWCID / iSAFE 2.0 關係」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 「TWCID 媒合資料」由明定的產品 Owner 寫入，其他產品只能依 Scope 讀取或提交草稿。
- 本章在「TIGI White Paper Master」中的用途，是把「TWCID」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「StyleMatch AI / TWCID / iSAFE 2.0 關係」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 「TWCID 媒合資料」驗收時，不得共用產品資料庫、跨站 Token 或前端 localStorage 作正式整合；服務端必須重驗 Tenant Context。

## 11. iSAFE 2.0

凍結四產品責任：TWCID 負責會員與媒合；StyleMatch AI 負責 AI 能力；iSAFE 負責治理；DEOS 負責治理後營運。

### R5.2 整合內容與契約

- S1／D1 前置作業（設計）、S2／D2 平面設計規劃。
- S3／D3 基本設計規劃定案、S4／D4 立面設計定案。
- S5／D5 施工大樣及其他約定事項、S6／C1 前置作業（工程）。
- S7／C2 第一期工程施工、S8／C3 第二期工程施工。
- S9／C4 第三期工程施工、S10／C5 保固修繕及售後服務。
- Intake／Handover 在 D1 前，Closed／Archived 在 C5 後；各 Stage 綁定 required_evidence、Gate、Owner、版本與 Audit。

### 控制與驗收

- 「StyleMatch AI / TWCID / iSAFE 2.0 關係」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 「iSAFE 2.0 個案治理資料」驗收時，不得共用產品資料庫、跨站 Token 或前端 localStorage 作正式整合；服務端必須重驗 Tenant Context。

## 12. 資料回饋迴圈

資料回饋僅交換經授權、最小必要、可追溯的結構化結果，不將客戶資料默認送入模型訓練。

### R5.2 整合內容與契約

- Canonical ID 明確區分 stylematch_project_id、match_case_id、project_id、isafe_case_id、handover_id、ai_task_id 與 trace_id，不再混用 project_id 或 case_id。
- 「資料回饋迴圈」由明定的產品 Owner 寫入，其他產品只能依 Scope 讀取或提交草稿。
- 「附錄 E：資料回饋迴圈」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 本章在「TIGI White Paper Master」中的用途，是把「資料回饋迴圈」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「資料回饋迴圈」驗收時，不得共用產品資料庫、跨站 Token 或前端 localStorage 作正式整合；服務端必須重驗 Tenant Context。
- 「附錄 E：資料回饋迴圈」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。

## 13. Gate 不等於自動付款

Gate 結果統一為 Passed、Failed、Conditional、Waived；通過最多建立 Payment Eligibility，不會自動付款。

### R5.2 整合內容與契約

- Passed 必須具備 Stage 指定 Evidence；Waived 必須有權限、理由、期限及事後覆核。
- Waived 的執行欄位至少包含 authority、reason、未來 expires_at、missing evidence、actor 與 trace。
- GateEvaluated 不建立 Payment Eligibility；資格由獨立契約里程碑評估產生。
- PaymentEligibilityChanged 不等於 Invoice、Payment Approval 或付款執行。

### 控制與驗收

- 「Gate 判定與付款資格」驗收時，採狀態機、Optimistic Lock、授權檢查與 Audit Writer；跨服務發布使用 Transactional Outbox。
- 「付款資格資料模型」驗收時，寫入前執行 Schema、租戶、授權、狀態、必填與參照完整性驗證。

## 14. AI 輔助治理邊界

正式 Risk Score 僅由可解釋規則與授權角色核定，AI 只能提供風險提示與來源證據。

### R5.2 整合內容與契約

- 高影響 AI Trace 必含：agent_id、model_provider、model_version、prompt_version、knowledge_version、input_hash、output_hash、citations、warnings、confidence、token_compute_usage、human_confirmation、retention_policy。
- AI 不得直接寫入 MatchResult、ContractBaselineApproval、GateDecision、RiskScore、EvidenceAcceptance、PaymentEligibility、PaymentApproval 或 DEOSTransaction。
- iSAFE 以 isafe_case_id 負責 StepInstance、Evidence、Gate、Risk、NCR／CAPA、驗收、保固與 PGP；正式治理決策由規則及授權角色完成。
- 「Risk Weight 專業審查邊界」需保存 project_id、isafe_case_id、step/rule version、責任角色與狀態時間。
- 「AI 輔助治理資料模型」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 「AI 輸出限制」需保留規則／模型版本、輸入參照、輸出、信心或嚴重度、來源及人工確認。

### 控制與驗收

- 「Risk Weight 專業審查邊界」驗收時，採狀態機、Optimistic Lock、授權檢查與 Audit Writer；跨服務發布使用 Transactional Outbox。
- 「AI 輔助治理資料模型」驗收時，寫入前執行 Schema、租戶、授權、狀態、必填與參照完整性驗證。

## 15. GS-25～30 的產業意義

GS-25～27 分別管制 Contract Baseline、工項／施工期別、付款節點與付款資格。

### R5.2 整合內容與契約

- 「GS-25～27 技術母本定位」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 「GS-28～30 技術母本定位」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 「合約基線資料模型」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 「工項期別資料模型」需定義唯一 ID、Owner、Schema Version、狀態、來源參照、建立／更新時間及 Audit Reference。
- 本章在「TIGI White Paper Master」中的用途，是把「GS-25～30 的產業意義」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 寫入前執行 Schema、租戶、授權、狀態、必填與參照完整性驗證。
- 「GS-28～30 技術母本定位」驗收時，寫入前執行 Schema、租戶、授權、狀態、必填與參照完整性驗證。

## 16. As-Is / To-Be

區分現況、12 個月交付與 36 個月產品成熟度，避免把 Future Concept 誤列為本期承諾。

### R5.2 整合內容與契約

- 「As-Is / To-Be / Future Concept 邊界」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 就「Website Gap Audit」而言，Request Context 至少包含 tenant_id、organization_id、purpose、consent_ref、trace_id 與 idempotency_key。
- 就「Mock / Adapter 邊界」而言，Request Context 至少包含 tenant_id、organization_id、purpose、consent_ref、trace_id 與 idempotency_key。
- 本章在「TIGI White Paper Master」中的用途，是把「As-Is / To-Be」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「As-Is / To-Be / Future Concept 邊界」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 「Website Gap Audit」驗收時，公共契約的破壞性變更必須升版；Deprecated 需公告期限、遷移說明與使用量監測。

## 17. Future Concept

區分現況、12 個月交付與 36 個月產品成熟度，避免把 Future Concept 誤列為本期承諾。

### R5.2 整合內容與契約

- 「As-Is / To-Be / Future Concept 邊界」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 「部署與整合路線」需指定 Owner、環境、指標、門檻、證據、異常處理與發布條件。
- 本章在「TIGI White Paper Master」中的用途，是把「Future Concept」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「As-Is / To-Be / Future Concept 邊界」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 正式上線前完成安全、權限、租戶隔離、契約、效能、復原與資料生命週期測試。

## 18. 標準化與互通

互通建立在穩定 ID、版本化 Schema、公共 API、Canonical Event 與 Governance Profile，而不是共用單一資料庫。

### R5.2 整合內容與契約

- 狀態機以 isafe-state-machine-r5.2.json 為單一可執行來源；文件、API、UI 與 Migration 必須使用相同 stage code／key／name。
- 互通契約包含 16 個 Canonical Event、28 個 Handover 必要欄位、7 個 Billing 物件、13 個高影響 AI Trace 欄位及 6 個 SaaS Module Flag。
- 共同控制以 C-01～C-08 管理版本、租戶、權限、契約、證據、資料生命週期、文件發布與執行退場。
- 來源完整性已確認為 435/435；標準化仍不等於治理核准或正式發布整合完成。
- Request Context 至少包含 tenant_id、organization_id、purpose、consent_ref、trace_id 與 idempotency_key。
- 「正式文件體系」引用 R5 Canonical 名稱與決策，不重複貼入整份工程母本。

### 控制與驗收

- 公共契約的破壞性變更必須升版；Deprecated 需公告期限、遷移說明與使用量監測。
- 遇到衝突依 R5.2 ADR、R5.2 Master、R5.2 Annex、R3、R2 的效力順序處理。

## 19. 產業落地路線

落地由真實高頻場景與既有平台開始，採 Modular Monolith 加獨立 AI／Governance Service 漸進部署。

### R5.2 整合內容與契約

- 導入須先完成 legacy mapping、正式資料庫備份、遷移覆核、rollback 與 production smoke test。
- 「部署與整合路線」需指定 Owner、環境、指標、門檻、證據、異常處理與發布條件。
- 「產業驗證指標」需指定 Owner、環境、指標、門檻、證據、異常處理與發布條件。
- 本章在「TIGI White Paper Master」中的用途，是把「產業落地路線」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 正式上線前完成安全、權限、租戶隔離、契約、效能、復原與資料生命週期測試。
- 「產業驗證指標」驗收時，正式上線前完成安全、權限、租戶隔離、契約、效能、復原與資料生命週期測試。

## 20. 治理成果衡量

治理成果以流程可重建、Evidence 完整、權限正確、AI 可追溯、例外可覆核及產業採用阻力衡量。

### R5.2 整合內容與契約

- iSAFE 以 isafe_case_id 負責 StepInstance、Evidence、Gate、Risk、NCR／CAPA、驗收、保固與 PGP；正式治理決策由規則及授權角色完成。
- 「產業驗證指標」需指定 Owner、環境、指標、門檻、證據、異常處理與發布條件。
- 「KPI 與可量測成果」需指定 Owner、環境、指標、門檻、證據、異常處理與發布條件。
- 「驗證與測試清單」需指定 Owner、環境、指標、門檻、證據、異常處理與發布條件。
- 本章在「TIGI White Paper Master」中的用途，是把「治理成果衡量」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「產業驗證指標」驗收時，正式上線前完成安全、權限、租戶隔離、契約、效能、復原與資料生命週期測試。
- 「KPI 與可量測成果」驗收時，正式上線前完成安全、權限、租戶隔離、契約、效能、復原與資料生命週期測試。

## 21. R6 可信治理實作證據與適用邊界

R6 以本地可執行系統驗證治理標準可落地，同時維持 Gate、付款資格、付款核准與付款執行的責任分離。

### R5.2 整合內容與契約

- 本地實作契約為 20260723_R5_2_PARITY_1；R5.2 狀態機契約維持 20260722_R5_2。
- 監管流程採 D1～D5 與 C1～C5 共 10 個正式階段，S1～S10 僅為同一 StepInstance 的連續順序碼。
- 舊站監管內容已整理為 82 項逐項檢核，支援完成、異常、不適用及待檢核狀態。
- 設計與工程各建立 30%、30%、30%、10% 四個里程碑，共 8 個付款里程碑。
- 已建立設計費、工程費、合約編號與核准狀態基線，並支援收據、實付金額及付款證明紀錄。
- 已支援文件、圖片與 Evidence 上傳下載；檢核、證據、合約及追加工程異動寫入 Audit 與 outbox event。
- 追加工程保存名稱、金額、工期影響、原因與狀態；案件溝通涵蓋留言、提問、爭議諮詢及治理歷程。
- 案件切換已保持目前案件，不再於儲存後跳回第一個案件；本地 QA 案件標題亂碼亦已備份後修正。
- 桌面 1440px 與手機 390px 均無頁面水平溢位；容器內導覽及功能分頁可橫向捲動。
- 驗收案件為 IS-2026-0003；API 自動測試 1 passed／0 failed，前端 console error／warning 為 0。
- 本地驗收網址：http://127.0.0.1:4174/?view=projects&case=IS-2026-0003
- 本次更新只存在本地工作區，尚未 commit、push 或部署至 GitHub 正式網站。
- 82 項檢核把舊站作業語意映射到十階段治理模型；里程碑與 Gate 維持關聯但不混同。
- 本地資料、歷程與 Evidence 可作標準化及產業驗證材料，但不能替代外部稽核、正式權限或法律判斷。

### 控制與驗收

- Gate Passed 只表示治理條件成立，不會自動建立 Payment Eligibility、Invoice、付款核准或付款執行。
- Payment Eligibility 仍由獨立契約里程碑評估產生，Approval 與 Execution 維持權責分離。
- 本地測試結果是 Pilot／工程驗證證據，不得描述為正式生產環境上線、正式資安驗證或外部使用成效。
- 正式發布前必須完成權限矩陣、物件儲存、病毒掃描、檔案版本與保留政策、通知服務及 production smoke test。
- iSAFE-DGM 24 項與 DGI 411 題來源已取得並通過完整性檢查；治理核准、ID 遷移與正式發布整合尚未完成。

## 22. 結論

R5 的共同策略是品牌分開、資料整合、產品模組化、商業 SaaS 化與技術 Shared Core 化。

### R5.2 整合內容與契約

- R5 以品牌分開、資料整合、產品模組化、商業 SaaS 化與技術 Shared Core 化作為四份文件共同結論。
- 「結語」以 R5 正式名稱、版本和 Canonical Contract 為準。
- 本章在「TIGI White Paper Master」中的用途，是把「結論」轉成可引用、可驗證且不與其他產品責任混淆的正式敘述。

### 控制與驗收

- 「結語」驗收時，任何後續修訂使用 ADR、差異表及新版本發布，不直接改寫已發布文件。
- 「結論」發布前須核對 R5.2 Integrated Canonical Contract、Accepted ADR、來源章節與附件校驗值。

## R6.1 Governance Registry Integration Baseline（2026-07-23）

- 上位治理母本：`TIGI_Governance_Master_24_Chapters_Independent_Edition_20260723_R6_1_RC.md`
- Canonical Contract：`canonical-contract-r6.1-governance-integration.json`
- 雲端來源：iSAFE-DGM 24/24、DGI 411/411，完整性檢查通過且無重複題碼。
- 核准狀態：`SOURCE_FOUND_PENDING_GOVERNANCE_APPROVAL`。
- DGI 遷移：保留 `DGI-001～411` legacy alias，對應階層式來源題碼。
- Payment 基線：Gate PASS 不等於 Payment Eligibility、Approval、Invoice 或 Execution。
- 文件狀態：TIGI White Paper Master R6.1 Release Candidate；不得標示 Final Official。

### 文件族譜

`Canonical Contract / Approved Registry > Governance Master > TIGI White Paper Master > 歷史來源`

### 發布阻擋

- DGM/DGI 版本裁決與治理核准。
- 411 筆 DGI alias migration 與參照完整性 QA。
- 正式 SaaS 權限、物件儲存、病毒掃描、備份、部署核准及 production smoke test。

## R6.1 RC Engineering QA / Release Management Update（2026-07-28）

- Document Set ID：`TIGI-4MASTER-20260728-R6.1-RC-QA-01`
- Version：`20260810_R7_2_Style_Proposal_Vision_Commercial_QA_Integrated`
- Release ID：`TIGI-GOVERNANCE-20260810-R7.2-SPVC-QA`
- QA Freeze：`TIGI-R6.1-RC-FREEZE-20260723-01`
- Release Status：`RELEASE_CANDIDATE`
- RC Version Freeze：`GO`
- Final Official：`NO GO`
- `final_official_allowed=false`

### 驗收權威與證據邊界

Official QA Report 是 R6.1 的唯一驗收摘要；Canonical Contract、Approved Registry、Accepted ADR、Manifest、SHA256、Git 與測試輸出仍是原始權威證據。文件 QA PASS 不等於 Governance Approval、Release Integration 或 Production Deployment PASS。

### Registry 狀態

| Registry | Source Completeness | Governance Approval | Release Integration |
|---|---:|---:|---:|
| TIGI-GS-01～30 | PASS 30/30 | PASS 30/30 | PASS 30/30 |
| iSAFE-DGM-01～24 | PASS 24/24 | PENDING 0/24 | PENDING 0/24 |
| DGI 411 | PASS 411/411 | PENDING 0/411 | PENDING 0/411 |

### Production Readiness

| Module | Current Level | Release Note |
|---|---|---|
| GS-01～30 | RELEASE_INTEGRATED | 30/30 已治理核准並發布整合 |
| DGM 01～24 | LOCALLY_IMPLEMENTED | 來源 24/24；治理核准 0/24 |
| DGI 411 | LOCALLY_IMPLEMENTED | 來源 411/411；治理核准 0/411 |
| State Machine / Evidence / CAPA / Payment | LOCALLY_IMPLEMENTED | 本地實作存在；production 未證明 |
| Journey / Handover / OpenAPI / JSON Schema | SPECIFIED | 規格存在；正式整合或成品待補 |
| Production Deployment | SPECIFIED | 尚無 Final Official 部署證據 |

### TIGI White Paper Master 更新控制

- 產業倡議須把治理願景、規格完成、本地實作與正式部署分開陳述，避免把 Future Concept 或 RC 能力寫成既成產業標準。
- GS-01～30 為已核准並整合的治理標準；DGM 24 與 DGI 411 目前只完成來源取得與完整性驗證。
- Final Official 的公共論述必須以 Final Release Decision 的 GO 為前提；目前只能引用 R6.1 Release Candidate。

### Final Official Release Blockers

1. 完成 DGM 24 與 DGI 411 的治理核准及發布整合。
2. 修正 Canonical Contract 的舊 `remaining_registry_source_required=435` 欄位。
3. 建立並核准 R6.1 ADR Master。
4. 將 Governance Master 與 State Machine Contract 納入正式 Release Package。
5. 正式發布 OpenAPI YAML/JSON、SQL Schema、JSON Schema 與獨立架構圖來源。
6. 完成 Git commit、tag、push、GitHub Release 與 SHA256 驗證。

Final Official 只能由 Final Release Decision 的 GO 及全部 Required Gate PASS 共同產生，不得人工直接切換。

---

# R7.1 Implementation QA Integrated Addendum

- 文件：白皮書母本
- 版本：`20260810_R7_2_Style_Proposal_Vision_Commercial_QA_Integrated`
- 發布識別：`TIGI-GOVERNANCE-20260810-R7.2-SPVC-QA`
- 狀態：Implementation Integrated Baseline；非 Final Official
- 原則：R6.1 原檔不覆寫，R7 另版保存

## R7 新增一：StyleMatch AI 裝修規劃設計提案工作流

- 需求流程固定為五步：基本資料、空間照片、偏好需求、預算分析、後續方案。
- 三種後續方案只能在需求填寫完成後顯示：AI 裝修規劃設計提案、專業設計師媒合、TWCID 平台招標媒合。
- 專案資料至少包含 project_id、case_code、房屋類型、屋齡、坪數、格局、預算、材料等級、空間調性、特殊需求、space_photos、reference_photos 與 service_option。
- StyleMatch 專案成立不等同 iSAFE 立案；不得在需求階段直接建立 isafe_case_id。

## R7 新增二：設計提案組稿與 PDF Artifact

- Proposal Assembly Workflow 依專案資料自動生成設計提案預覽，並輸出 A4 PDF。
- 共通章節為：專案需求摘要、設計概念、風格意象、空間調性、參考圖片、平面配置（有資料時）、空間現況、材料使用建議、預算與落地提醒。
- 平面配置為條件式章節；沒有 floor_plan Artifact 時不得生成虛構平面圖。
- 圖片來源必須可追溯至 proposal_media.reference_photos 或 proposal_media.space_photos。
- PDF 應保存 proposal_version、generated_at、project_id、case_code、輸入摘要與生成器版本；正式 SaaS 應保存 checksum、下載授權與 audit event。
- 提案 PDF 屬前期概念 Artifact，不等同施工圖、正式估價單、簽證文件或工程契約。

## R7 新增三：StyleMatch 專案與會員權限控台

- 控台一級功能包含目前方案、StyleMatch 專案、會員與權限。
- StyleMatch 專案內頁集中顯示專案需求內容、圖片及設計提案預覽／PDF 下載。
- 目前方案可導向平台方案價格；MVP 方案切換僅供本地檢視，不得視為正式訂閱或付款成功。
- 會員角色至少包含 Owner、Admin、Designer、Viewer；正式環境由 RBAC API 與 Tenant Context 驗證，不以 localStorage 作授權來源。

## R7 新增四：StyleMatch 與 iSAFE 程序邊界

- StyleMatch 負責需求、圖片、風格、提案與前期媒合資料；iSAFE 負責工程階段、Gate、Evidence、Risk、NCR／CAPA、付款資格、稽核與保固。
- 進入 iSAFE 前必須完成 TWCID 媒合、人工確認、授權範圍確認與正式 Handover。
- iSAFE 接收端成功冪等立案後才回存 isafe_case_id；StyleMatch 前端不得自行推算或預建該識別碼。
- StyleMatch 控台與 iSAFE 控台必須使用明顯不同的標題、說明與操作區塊，避免將前期概念提案誤認為工程監管。

## R7 新增五：AI 空間設計與 360° 環景

- 功能名稱統一為「AI 空間設計與 360° 環景」。
- 輸入沿用專案空間照片、設計提案風格參考圖及所選空間，不要求使用者重複輸入風格 DNA。
- 同一空間可保存多張參考圖；客餐廳等複合空間應以空間群組或多標籤處理。
- 預覽可免費顯示；正式檔案下載須由後端付款結果解鎖，前端不得自行宣告付款完成。

## R7 驗收與發布條件

- StyleMatch 五步需求流程、專案內頁與提案預覽可在本地端完成。
- 提案 PDF 可輸出 A4 多頁文件，中文字與圖片渲染正常，平面配置依資料有無決定。
- StyleMatch 與 iSAFE 控台具有明確視覺、權責與識別碼邊界。
- 正式 SaaS 發布前仍須完成後端身分、付款、Artifact Storage、Audit、Checksum、AI Trace 與部署驗收。

---

# R7.1 StyleMatch Implementation QA Integration（2026-08-04）

- 文件：TIGI White Paper Master
- Version：`20260810_R7_2_Style_Proposal_Vision_Commercial_QA_Integrated`
- Previous Version：`20260730_R7_Implementation_Integrated`
- Release ID：`TIGI-GOVERNANCE-20260810-R7.2-SPVC-QA`
- Document Set ID：`TIGI-4MASTER-20260804-R7.1-IMPL-QA-01`
- QA Freeze：`TIGI-R7.1-IMPL-QA-FREEZE-20260804-01`
- Release Status：`IMPLEMENTATION_QA_BASELINE`
- Final Official：`NO GO`
- `final_official_allowed=false`

本節整合 2026-08-03 程式稽核、API／資料契約與 ComfyUI 端到端證據。
本次為非破壞性 R7.1 實作 QA 更新，不變更既有治理標準與付款基線。

## 一、已驗證的本地實作與契約

- 2026-08-03 程式逐項稽核確認五步需求流程、提案組稿、條件式平面圖、專案識別碼邊界、參考圖片版本、確認圖組及成功才扣點的冪等交易均具本地實作證據。
- 案件 API 必須帶 Authorization、Tenant／Organization、Purpose、Consent、Trace、X-Server-Role、X-Case-Role 與 X-Case-Authorization；寫入另需 Idempotency-Key，案件角色與範圍由伺服端驗證。
- project_id 與 case_code 由 StyleMatch 建立；twcid_match_id 由 TWCID 回存；isafe_case_id 僅能由 iSAFE 成功接收正式 Handover 後回存。離線識別碼不得成為正式欄位。
- analysis 使用 stylematch.analysis.v1，包含 deterministic 風格分布、confidence、reasons、evidence、預算區間與 risk_flags；八字或星座僅為選填文化偏好，權重不得高於 5%。
- 圖片修改必須新增 reference_revision，不得覆寫既有版本；正式提案只能引用版本化且已確認的 confirmed_reference_set。
- 點數交易以 project_id + confirmed_reference_set_id 為冪等範圍，提案生成成功才扣點；失敗不得寫入 completed ledger。
- ComfyUI 端到端驗收已在本地完成：任務 aitask_f9151649-aef4-4509-88cb-4d4674ee3bb2，workflow stylematch-sdxl-v1，checkpoint sd_xl_base_1.0.safetensors，輸出 SHA-256 759843FA277EC6109B6B2FD8EEE34D6C778F7007632B017C2BED684BB6C3F055。
- 上述證據最高僅證明 LOCALLY_IMPLEMENTED／PASS-LOCAL；不等於治理核准、發布整合、Production Deployment 或 Final Official。

## 二、治理與成熟度矩陣

| 範圍 | 證據 | 成熟度／核准 | R7.1 判讀 |
|---|---|---|---|
| GS-01～30 | PASS 30/30 | RELEASE_INTEGRATED | 沿用 R7 已核准治理基線 |
| iSAFE-DGM-01～24 | PASS 24/24 | PENDING | 來源完整；治理核准與發布整合未完成 |
| DGI 411 | PASS 411/411 | PENDING | 來源完整；治理核准與發布整合未完成 |
| StyleMatch 五步需求／提案 | PASS-LOCAL | LOCALLY_IMPLEMENTED | 本地程式與稽核證據存在 |
| AI 圖片任務／ComfyUI | PASS-LOCAL | LOCALLY_IMPLEMENTED | 8188 端到端本地驗收通過 |
| Identity／Payment／Artifact／Audit | PARTIAL | SPECIFIED | 正式環境成品與驗收仍為 blocker |

## 三、本母本的獨立判讀控制

- 白皮書可引用版本化圖片、可追溯 AI 任務與成功才扣點作為治理設計案例，但必須註明目前為本地實作基線。
- 文化偏好權重上限 5% 且不得表述為科學、命理或風水決策，作為 AI 誠信與可解釋性邊界。
- R7.1 不改變 GS、DGM、DGI、State Machine、Evidence Gate 或 Payment Eligibility 的既有治理定義。

## 四、Final Official Release Blockers

1. 正式 OIDC/OAuth 2.1、SSO、MFA 與後端 RBAC/ABAC。
2. 正式 Artifact Storage、PDF checksum、下載授權與不可竄改 Audit Storage。
3. 完整 AI Trace Registry、input/output hash 與 production model governance。
4. Stripe production payment、webhook 部署與付款驗收。
5. DGM 24 與 DGI 411 的治理核准及正式發布整合。
6. Production deployment acceptance、Git tag／Release 與正式發布決策。

**發布結論：R7.1 Implementation QA Baseline = GO；Final Official = NO GO；`final_official_allowed=false`。**

---

# R7.2 Style／Proposal／Vision／Commercial QA Integration（2026-08-10）

- 文件：TIGI White Paper Master
- Version：`20260810_R7_2_Style_Proposal_Vision_Commercial_QA_Integrated`
- Previous Version：`20260804_R7_1_Implementation_QA_Integrated`
- Release ID：`TIGI-GOVERNANCE-20260810-R7.2-SPVC-QA`
- Document Set ID：`TIGI-4MASTER-20260810-R7.2-SPVC-QA-01`
- QA Freeze：`TIGI-R7.2-SPVC-QA-FREEZE-20260810-01`
- Status：`IMPLEMENTATION_QA_BASELINE`
- Implementation QA：`GO`
- Final Official：`NO GO`
- `final_official_allowed=false`

本節承接 `20260804_R7_1_Implementation_QA_Integrated`，不變更 R5.2 案件狀態機、GS／DGM／DGI 或 Payment Eligibility 基線。

## 一、30 種風格與 CLIP Vision 技術基線

- 30 種 canonical style catalog、別名遷移與 shared schema 已完成本地驗證；Chill 輕鬆風與飯店精品風採單一正式命名。
- StyleAnalysisEngine 與 BudgetEngine 採 deterministic 輸出，ProposalReport 顯示風格分布、信心、理由、預算區間、風險、Tone & Manner 與三種方案方向。
- CLIP Vision 使用 openai/clip-vit-large-patch14，固定 revision 32bd64288804d66eefd0ccbe215aa642df71cc41，向量維度 768，30 種風格文字向量與圖片 embedding 契約已驗證。
- 模型相似度只提供排序、margin 與輔助證據；低信心結果不得自動接受，必須經人工確認，不得成為治理、法遵、付款或案件核准依據。

## 二、會員、方案與工具可見性

| 角色／方案 | 可使用範圍 | 限制 |
|---|---|---|
| 一般會員 | 首頁、風格測驗、AI 裝修提案、我的專案、方案價格 | 不顯示商業工具 |
| 單次購買方案 | 空間需求整理、裝修預算配置、設計理念／風格參考照片／材料方向 | 不建立點數權限 |
| 商業方案 Pro／Team | 一般會員功能 + 平面圖視覺化、空間與 360°、提案圖確認 | 進階操作依交易扣點 |
| 直接網址存取 | FloorPlanVisualizer、AIGenerate、ReferenceCanvas | BusinessAccessGate 伺服前路由閘門 |

## 三、提案工作區與功能責任邊界

- 產品工作區順序固定為：提案總覽 → 平面圖 AI 視覺化 → 空間與 360° → 提案圖確認 → TWCID 媒合 → 簽約後 iSAFE 2.0。
- 平面圖 AI 視覺化負責上傳與分析、風格鳥瞰、遮罩區域重繪、相機位置／朝向／FOV 與指定視角空間圖；輸出是 AI 概念提案，不是施工圖或精準 3D 模型。
- 提案圖確認只負責 reference_revision 候選版本、比較、採用與 confirmed_reference_set；遮罩與區域重繪不得放入提案圖確認頁。
- 一般會員固定可見五個入口；商業會員登入後才顯示單一『商業工具』選單，內含三個進階工具。直接網址仍由 BusinessAccessGate 防護。

## 四、商業點數交易基線

| 功能 | 交易 type | 點數 | 資格 | 扣點時點 |
|---|---|---:|---|---|
| 平面圖鳥瞰生成 | floorplan_birdseye | 10 | 商業方案 | 成功後扣點 |
| 遮罩區域重繪 | floorplan_region_redraw | 5 | 商業方案 | 成功後扣點 |
| 指定視角空間圖 | floorplan_room_view | 10 | 商業方案 | 成功後扣點 |
| 提案候選圖片改版 | reference_image_revision | 5 | 商業方案 | 成功後扣點 |
| 空間創意彩現 | space_image_generation | 10 | 商業方案 | 任務建立成功後扣點 |
| 360° 環景生成 | space_panorama_generation | 15 | 商業方案 | 任務建立成功後扣點 |
| 正式圖像提案 | proposal_generation | 30 | 商業方案 | 成功後扣點；同一確認版本冪等 |

> 點數 ledger 是商業功能消耗紀錄，不是工程 Payment Eligibility、發票或付款執行證據。

## 五、治理不變項與成熟度

- R7.2 不改寫 S1／D1～S10／C5、TIGI-GS-01～30、iSAFE-DGM-01～24、DGI 411 或 isafe-state-machine-r5.2.json。
- Gate PASS 不等於 Payment Eligibility；Payment Eligibility 不等於 Payment Approval、Invoice 或 Payment Execution。商業點數 ledger 亦不得替代工程付款治理。
- 所有 point-consuming action 必須在 UI 與 localStore 資料層同時檢查商業資格、專案、餘額與交易資料；交易寫入 point_ledger，使用 idempotency_key 防止重複扣點。
- 本版證據最高為 LOCALLY_IMPLEMENTED／PASS-LOCAL；Implementation QA = GO，不代表 Governance Approved、Release Integrated、Production Deployed 或 Final Official。

## 六、本母本的獨立判讀控制

- 白皮書將 AI 視為可解釋、可追溯且需人工確認的設計輔助，不把風格相似度或生成圖視為專業簽核。
- 會員可見性、方案資格、點數交易與工程 Payment Eligibility 是四種不同治理層，必須維持語意與證據分離。
- 平面圖深化、圖像版本與 iSAFE 工程治理形成成交前後連續鏈，但產品、資料與責任邊界不得合併。

## 七、Final Official Release Blockers

1. 正式 OIDC/OAuth 2.1、SSO、MFA 與後端 RBAC/ABAC／entitlement。
2. 伺服端點數帳本、交易鎖、失敗補償、退款、對帳、稅務與正式金流驗收。
3. Artifact Storage、PDF／圖片 checksum、下載授權與不可竄改 Audit Storage。
4. AI Trace Registry、input/output hash、模型供應者 registry、模型風險與 production acceptance。
5. DGM 24 與 DGI 411 的治理核准、正式發布整合與 Production deployment acceptance。
6. Git commit／tag／push、GitHub Release、SHA256 package 驗證與 Final Release Decision。

**發布結論：R7.2 Implementation QA Baseline = GO；Final Official = NO GO；`final_official_allowed=false`。**

---

# R8 StyleMatch AI／iSAFE 2.0 Integrated Baseline（2026-08-13）

- 文件：TIGI White Paper Master
- Version：`20260813_R8_StyleMatch_iSAFE_Integrated`
- Previous Version：`20260810_R7_2_Style_Proposal_Vision_Commercial_QA_Integrated`
- Release ID：`TIGI-GOVERNANCE-20260813-R8-SM-ISAFE`
- Document Set ID：`TIGI-4MASTER-20260813-R8-SM-ISAFE-01`
- QA Freeze：`TIGI-R8-SM-ISAFE-QA-FREEZE-20260813-01`
- State Authority：`20260722_R5_2`
- Status：`IMPLEMENTATION_QA_BASELINE`
- Implementation QA：`GO`
- Final Official：`NO GO`
- `final_official_allowed=false`

R8 將 StyleMatch AI 前期規劃、TWCID 識別邊界、iSAFE 2.0 簽約後治理、local-api 與可信知識索引整合成同一網站版本；不改寫 R5.2 狀態機。

## 一、網站與服務基線

| 模組 | 版本／日期 | 可驗證基線 | 成熟度 |
|---|---|---|---|
| StyleMatch AI | 8.0.0 | 30 canonical styles；deterministic analysis；30 local quiz images | PASS-LOCAL |
| Style reference dataset | 2026-08-13 | 815 synthetic ComfyUI PNG／30 styles；僅作研發與測試資料 | LOCALLY_AVAILABLE |
| iSAFE 2.0 | 20260813_R8_StyleMatch_iSAFE_Integrated | R8 release contract；13 navigation items；雙方執行前檢核 | PASS-LOCAL |
| local-api | 20260722_R5_2 | 十階段狀態機；Evidence Gate；Payment Eligibility 分離 | PASS |
| Knowledge corpus | schema 4.0 | R8 四母本＋README＋API annex；產製後重建 | PASS |

## 二、跨產品識別、授權與同步邊界

- case_code 是跨產品顯示識別；twcid_match_id 只在 TWCID 媒合成立後建立；isafe_case_id 只在 iSAFE 正式立案後建立。StyleMatch 前期專案不得預先虛構後兩者。
- 受保護案件 API 必須驗證 X-Server-Role、X-Case-Role 與 X-Case-Authorization；開發環境萬用授權只允許搭配本機 token，不得成為 production 預設。
- local-api 4180 無法連線時可使用 localStorage MVP，但 fallback 必須標記 local source；重新連線後以 revision 衝突規則處理，不得覆寫較新的伺服端資料。
- StyleMatch、TWCID 與 iSAFE 的 Journey／Handover／Audit 必須保留 trace、來源、時間、版本與人工決定，不得只靠畫面狀態推定。

## 三、iSAFE 狀態機與治理不變項

- R8 是 StyleMatch AI 與 iSAFE 2.0 的產品整合基線，不建立新的案件狀態語意；iSAFE 執行權威仍是 20260722_R5_2 與 isafe-state-machine-r5.2.json。
- S1／D1～S10／C5、TIGI-GS-01～30、iSAFE-DGM-01～24、DGI 411、九類命名空間及 82 項 D1-C5 checklist 全數沿用。
- Gate PASS 不等於 Payment Eligibility；Payment Eligibility 不等於 Payment Approval、Invoice 或 Payment Execution；商業點數 ledger 亦不得替代工程付款治理。
- DGM 24/24 與 DGI 411/411 代表來源完整，不代表 GOVERNANCE_APPROVED、RELEASE_INTEGRATED 或 PRODUCTION_DEPLOYED。
- R6.1 Canonical Contract 暫作 registry semantic baseline；正式 R8 Canonical Contract 未經治理核准前，不得宣稱 R8 已取代 R6.1 語意契約。

## 四、Style Dataset、Vision 與人工確認

- 30 種 canonical style catalog 與 30 張快速測驗本地圖片已通過驗證；StyleAnalysisEngine、BudgetEngine 與 ProposalReport 保持 deterministic 輸出。
- 本地 ComfyUI synthetic dataset 目前有 815 張 PNG、涵蓋 30 種風格；各風格數量不完全相等，因此只能標示 LOCALLY_AVAILABLE，不得直接宣稱 balanced production training set。
- openai/clip-vit-large-patch14 固定 revision 32bd64288804d66eefd0ccbe215aa642df71cc41、768 維；相似度僅作排序與輔助證據，低信心必須人工確認。
- 合成圖、快速測驗圖與正式客戶上傳圖必須分開保存來源、授權、prompt、seed、模型、checksum 與用途；進入 production 前仍需完成內容授權與品質抽驗。

## 五、可信知識索引

- R8 知識索引 schema 4.0 將產品 release version、index schema version 與 state contract version 分開顯示。
- 正式 R8 corpus 由四份 R8 母本、R8 README 與 R8 API／資料契約附錄構成，共六份來源；任何搜尋結果都必須保留 sourceUrl、documentId、heading 與版本。
- Knowledge view 是唯讀判讀入口，不是治理核准介面；回答不得將較舊 R7／R7.2 章節誤判為目前 release decision。

## 六、Implementation QA 證據矩陣

| 驗證項 | 證據 | 結果 |
|---|---|---|
| Style catalog | 30 styles | PASS |
| Style analysis / proposal migration | deterministic | PASS |
| Offline image style fallback | confidence cap 35% | PASS |
| Style test image manifest | 30 local images | PASS |
| TypeScript | tsc -p jsconfig.json | PASS |
| Vite production build | 2,604 modules | PASS；bundle size warning |
| iSAFE R8 website tests | 4 passed / 0 failed | PASS |
| local-api tests | 3 passed / 0 failed | PASS |

## 七、本母本的獨立判讀控制

- R8 的公共價值是把裝修前決策、媒合與簽約後工程治理串成可追溯旅程，同時維持人類專業者的決策責任。
- AI 風格相似度、生成圖與風險提示均是建議性證據，不取代建築法規、專業簽證、驗收、付款核准或爭議判定。
- Knowledge corpus 應揭露版本與成熟度，讓外部讀者能區分願景、規格、本地實作與正式部署。

## 八、Final Official Release Blockers

1. 正式 R8 Canonical Contract、ADR 與 435 項 DGM／DGI 治理核准。
2. 正式 OIDC/OAuth 2.1、SSO、MFA、後端 RBAC/ABAC／entitlement 與租戶隔離。
3. 伺服端點數帳本、交易鎖、退款、對帳、稅務、正式金流與 Payment 執行整合。
4. Artifact Storage、PDF／圖片 checksum、下載授權與不可竄改 Audit Storage。
5. AI Trace Registry、input/output hash、模型與資料集 registry、授權及 production acceptance。
6. Git commit／tag／push、GitHub Release、SHA256 驗證與 Production deployment acceptance。

**發布結論：R8 Implementation QA Baseline = GO；Final Official = NO GO；`final_official_allowed=false`。**
