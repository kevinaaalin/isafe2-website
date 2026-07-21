# iSAFE 2.0 R5 Website Prototype

This is a static website prototype for iSAFE 2.0, focused on renovation governance, state-machine workflows, evidence management, SBIR planning, and investor-facing positioning.

Current local baseline: `TIGI_Four_Document_Masters_Optimized_20260721_R5`.

## R5 Alignment

- Uses `Accepted ADR` as the highest interpretation basis.
- Adopts the R5 `canonical-contract-r5.json` contract and the 72 canonical IDs requirement.
- Keeps implementation-facing API references under `/api/v1`.
- Normalizes formal event names to `GateEvaluated` and `PaymentEligibilityChanged`.
- Separates `Gate`, `Payment Eligibility`, `Payment Approval`, and `Payment Execution`.
- Defines the AI Agent boundary as recommendation and risk flagging only; governance decisions and payment approvals require human review.

## Files

- `index.html` - Main website structure and content.
- `styles.css` - Responsive visual design and layout.
- `app.js` - View switching, controls, lightweight interactions, and R5 contract baseline rendering.
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
