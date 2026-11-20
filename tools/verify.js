// Checks that every faculty string in content.json appears verbatim in ../index.html.
// Usage (from this folder):  node verify.js            (defaults: ./content.json and ../index.html)
//                       or:  node verify.js <content.json> <index.html>
// Exits with code 1 on any mismatch.
const fs=require('fs');const vm=require('vm');const path=require('path');
const here=__dirname;
const contentPath=path.resolve(process.argv[2]||path.join(here,'content.json'));
const htmlPath=path.resolve(process.argv[3]||path.join(here,'..','index.html'));
const c=JSON.parse(fs.readFileSync(contentPath,'utf8'));const html=fs.readFileSync(htmlPath,'utf8');
const m=html.match(/\/\* BEGIN GENERATED DATA[\s\S]*?\/\* END GENERATED DATA \*\//);if(!m)throw new Error('generated-data block not found');
const ctx={};vm.createContext(ctx);vm.runInContext(m[0]+'\nthis.B=BUILTIN;this.P=PTYPE_LIST;this.C=CATEGORIES;',ctx);
let ok=0;const bad=[];
c.scenarios.forEach(s=>{const b=ctx.B.find(x=>x.number===s.number);
  for(const k of ['title','situation','parentReaction','teacherGoal']){if(b&&b[k]===s[k])ok++;else bad.push('scenario '+s.number+' '+k);}});
c.parentTypes.forEach(t=>{const p=ctx.P.find(x=>x.name===t.name);
  if(p)ok++;else bad.push('type name '+t.name);
  if(p&&p.description===t.description)ok++;else bad.push('type description '+t.name);});
const total=c.scenarios.length*4+c.parentTypes.length*2;
console.log('Scenarios in app: '+ctx.B.length+' · parent types in app: '+ctx.P.length);
console.log('Verbatim matches: '+ok+' of '+total+(bad.length?' · MISMATCHES: '+bad.join('; '):' · no mismatches'));
const parents=ctx.B.map(b=>b.parent),kids=ctx.B.map(b=>b.child);
console.log('Distinct parent names: '+new Set(parents).size+' of '+parents.length+' · distinct child names: '+new Set(kids).size+' of '+kids.length);
if(bad.length||ok!==total)process.exit(1);
