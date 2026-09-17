# iSAFE independent deployment boundary

2026-09-17. Local compatibility/security configuration patch, not public production acceptance.

The frontend does not require AWOS 4310 to start. It still uses its existing business API, database, authorization and governance rules; independent deployment does not remove Evidence/NCR/CAPA reviews.

Public pages no longer default to an end user's 127.0.0.1:4180. `ISAFE_CONFIG.apiOrigin` is checked for a bare HTTP(S) origin without embedded credentials, query, fragment or path; public targets must be HTTPS and not loopback. Local query overrides remain local-only. Invalid configuration falls back to static UI without activating API operations.

Development identity headers are blocked unless both page and API are loopback. A public API configuration alone does not activate real authentication: protected requests fail closed with a configuration message. Do not publish the local API server as a production service; real authenticated server-side role/tenant controls remain required. Static demonstrations are not live case records or authenticated governance.

Tests: deployment-config.test.mjs and all three existing UI contract validators passed. Chrome verified that the local case workspace still loads from 4180. This is read-only local integration verification, not all write workflows or public deployment. No user case, approval, DNS or service exposure changed. Existing modified knowledge corpus files were left untouched.
