# iSAFE 2.0 R9 / Patent V7 Governance Website

This is a static website prototype for iSAFE 2.0, focused on renovation governance, state-machine workflows, evidence management, SBIR planning, and investor-facing positioning.

Current document master: `20260814_R9_Patent_V7`.

Release ID: `TIGI-GOVERNANCE-20260814-R9-PATENT-V7`.

Release status: `IMPLEMENTATION_QA_BASELINE`; Final Official remains `NO_GO`.

Execution contracts:

- iSAFE State Machine: `20260722_R5_2`
- Legacy Functional Parity: `20260723_R5_2_PARITY_1`

## R8 StyleMatch AI / iSAFE 2.0 Integration

- Loads the R8 integration release contract and validates it against the website runtime.
- Carries forward the R6.1 Canonical Contract as the semantic registry baseline until an R8 Canonical Contract is formally approved.
- Provides searchable read-only views for TIGI-GS 30/30, iSAFE-DGM 24/24, DGI 411/411, and the nine registry namespaces.
- Marks DGM and DGI as `SOURCE_FOUND_PENDING_GOVERNANCE_APPROVAL`; it does not claim Final Official status.
- Preserves all 411 `DGI-001..DGI-411` legacy aliases alongside their hierarchical source IDs.
- Keeps the R5.2 State Machine Contract as the execution authority for iSAFE D1-D5 and C1-C5.

- Uses `Accepted ADR` as the highest interpretation basis.
- Loads the ten-stage registry from `GET /api/v1/isafe/state-machine` and uses the 13 cross-product canonical IDs.
- Keeps intake and handover before D1, and keeps closure after C5.
- Requires stage evidence before `Passed`; authorized waivers require a reason and future expiry.
- Evaluates contractual payment milestones through a separate endpoint instead of every Gate pass.
- Restores the legacy operational workspace with 82 versioned D1-C5 checklist items, evidence files, contract totals, eight payment milestones, receipts, change orders, case messages, and an auditable timeline.
- Preserves every contract baseline change as an immutable numbered version with a reason and predecessor reference.
- Labels existing risk values as unverified pilot indicators until a rule version and authorized human confirmation exist.
- Treats iSAFE-DGM-01 through 24 as source-complete but pending governance approval and release integration.
- Requires Tenant, Organization, Purpose, Consent, and Trace request context on protected API routes.
- Uses a bundled read-only contract preview on GitHub Pages: all 82 checklist items and eight milestones remain inspectable, while API-backed writes are explicitly disabled.
- Keeps implementation-facing API references under `/api/v1`.
- Normalizes formal event names to `GateEvaluated` and `PaymentEligibilityChanged`.
- Separates `Gate`, `Payment Eligibility`, `Payment Approval`, and `Payment Execution`.
- Defines the AI Agent boundary as recommendation and risk flagging only; governance decisions and payment approvals require human review.

## Files

- `index.html` - Main website structure and content.
- `styles.css` - Responsive visual design and layout.
- `app.js` - View switching, Registry explorer, role-authorized local API controls, and R8/R5.2 contract-boundary rendering.
- `contracts/tigi-r8-integration.json` - R8 StyleMatch AI / iSAFE 2.0 integration contract and release blockers.
- `contracts/tigi-canonical-r6.1.json` - R6.1 semantic registry baseline carried forward by R8.
- `contracts/isafe-dgm-registry-r6.1.csv` - 24-row DGM Registry.
- `contracts/dgi-migration-r6.1.csv` - 411-row DGI legacy-to-hierarchical migration.
- `.nojekyll` - Keeps GitHub Pages from applying Jekyll processing.

## Local Preview

Open `index.html` directly in a browser, or run a local static server:

```powershell
node serve.mjs
```

Then visit:

```text
http://127.0.0.1:4174
```

## GitHub Pages

After uploading to GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Choose `Deploy from a branch`.
4. Select the `main` branch and `/root`.
5. Save, then wait for GitHub Pages to publish the site.

## R9.2.1 Field Evidence and Smart Supervision

The local iSAFE view `?view=fieldEvidence` provides Evidence Requirement management, manual fallback, batch field media, provenance/revisions, five-dimensional candidate classification, Evidence Mapping, construction logs and NCR/CAPA review. CAPA closure requires accepted verification Evidence and an authorized role. See `docs/tigi-r9.2.1-field-evidence-local-implementation-20260822.md` and `docs/adr-20260822-r9.2.1-field-evidence-boundary.md`.
