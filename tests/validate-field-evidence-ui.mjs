import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const app=readFileSync(new URL("../app.js",import.meta.url),"utf8");
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map((match)=>match[1]);
const duplicates=[...new Set(ids.filter((id,index)=>ids.indexOf(id)!==index))];
assert.deepEqual(duplicates,[],`Duplicate HTML IDs: ${duplicates.join(", ")}`);
for(const id of ["fieldEvidence","fieldMediaFiles","fieldCorrectionReason","fieldBatchCapture","fieldMapMedia","fieldGenerateLog","fieldDetectDefects","fieldNcrList","fieldCapaList","fieldPackageList"]){assert.equal(ids.filter((item)=>item===id).length,1,`${id} must exist exactly once`)}
for(const endpoint of ["/field-media`","/construction-logs`","/ncr-candidates`","/capa`","/field-media:map`"]){assert.ok(app.includes(endpoint),`Missing UI API endpoint ${endpoint}`)}
for(const boundary of ["pending_review","ready_for_verification","accepted Evidence Package"]){assert.ok(app.includes(boundary),`Missing boundary state ${boundary}`)}
console.log("R9.2.1 Field Evidence UI contract validated: unique IDs, complete endpoints and governance boundaries");
