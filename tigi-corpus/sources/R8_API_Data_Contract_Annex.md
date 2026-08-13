# R8 API／資料契約附錄

案件跨產品識別依序使用 `case_code`、`twcid_match_id`、`isafe_case_id`；後兩者只能在對應業務事件成立後建立。

iSAFE `stage_status` 以 `20260722_R5_2` 為執行權威。受保護 API 必須驗證 `X-Server-Role`、`X-Case-Role`、`X-Case-Authorization`。

R8 知識索引 schema 4.0 由四份 R8 母本、README 與本附錄組成；索引版本、產品版本與狀態機版本必須分開顯示。
