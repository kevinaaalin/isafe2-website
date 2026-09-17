import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../app.js',import.meta.url),'utf8');
const config=source.slice(source.indexOf('const hasConfiguredApi'),source.indexOf('const r5Events'));
function run(origin,apiOrigin,search=''){
 const location={origin,hostname:new URL(origin).hostname,search};
 const ctx=vm.createContext({window:{location,ISAFE_CONFIG:apiOrigin?{apiOrigin}:undefined},URL,URLSearchParams,Date});
 vm.runInContext(config+';globalThis.result={apiOrigin,apiEnabled,headers:apiContextHeaders};',ctx);return ctx.result;
}
const local=run('http://127.0.0.1:4174');assert.equal(local.apiOrigin,'http://127.0.0.1:4180');assert.equal(local.headers({authorize:true}).Authorization,'Bearer local-dev-headquarter');
for(const [page,target] of [['https://isafe.com.tw',undefined],['https://isafe.com.tw','https://api.example.test'],['http://127.0.0.1:4174','https://api.example.test'],['https://isafe.com.tw','http://127.0.0.1:4180']])assert.throws(()=>run(page,target).headers({authorize:true}),/正式登入/);
assert.equal(run('https://isafe.com.tw',undefined,'?apiOrigin=http://127.0.0.1:4180').apiOrigin,'https://isafe.com.tw');
assert.equal(run('http://127.0.0.1:4174','https://u:p@remote.test').apiEnabled,false);
assert.equal(run('http://127.0.0.1:4174','not a URL').apiEnabled,false);
console.log('PASS: local API compatibility, public override isolation, invalid origins and development identity blocked remotely.');
