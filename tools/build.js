// Rebuilds the generated data block inside ../index.html.
// Usage (from this folder):  node build.js            (defaults: ./content.json and ../index.html)
//                       or:  node build.js <content.json> <index.html>
// Faculty wording (title, situation, parentReaction, teacherGoal; parent-type name and description) comes
// from content.json verbatim. Everything else comes from authored.js.
const fs=require('fs');const path=require('path');
const here=__dirname;
const contentPath=path.resolve(process.argv[2]||path.join(here,'content.json'));
const htmlPath=path.resolve(process.argv[3]||path.join(here,'..','index.html'));
const content=JSON.parse(fs.readFileSync(contentPath,'utf8'));
delete require.cache[require.resolve(path.join(here,'authored.js'))];
const au=require(path.join(here,'authored.js'));
const order=['id','number','title','situation','parentReaction','teacherGoal','category','opener','suggestedType','parent','short','rel','child','grade','role','details','persona','demoScript','avatar'];
if(content.scenarios.length!==35)throw new Error('expected 35 scenarios, got '+content.scenarios.length);
const typeIds=new Set(Object.values(au.types).map(t=>t.id));
const catIds=new Set(au.categories.map(c=>c.id));
const scen=content.scenarios.map(s=>{
  const a=au.scenarios[s.number];if(!a)throw new Error('no authored data for scenario '+s.number);
  if(!typeIds.has(a.suggestedType))throw new Error('bad suggestedType for '+s.number);
  if(!catIds.has(a.category))throw new Error('bad category for '+s.number);
  if(a.opener!=='teacher'&&a.opener!=='parent')throw new Error('bad opener for '+s.number);
  const o=Object.assign({id:'s'+String(s.number).padStart(2,'0'),number:s.number,title:s.title,situation:s.situation,parentReaction:s.parentReaction,teacherGoal:s.teacherGoal},a);
  const out={};order.forEach(k=>{if(o[k]!==undefined)out[k]=o[k];});
  Object.keys(o).forEach(k=>{if(!(k in out))throw new Error('unknown key '+k+' in scenario '+s.number);});
  return out;
});
const types=content.parentTypes.map(t=>{const a=au.types[t.name];if(!a)throw new Error('no authored type for '+t.name);
  const d=a.demo;if(!d||!d.answer||!d.react||!d.concern||!Array.isArray(d.lines))throw new Error('incomplete demo for '+t.name);
  return {id:a.id,name:t.name,description:t.description,prompt:a.prompt,demo:d};});
if(types.length!==10)throw new Error('expected 10 parent types');
const j=v=>JSON.stringify(v).replace(/<\//g,'<\\/').replace(new RegExp('\\u2028','g'),'\\u2028').replace(new RegExp('\\u2029','g'),'\\u2029');
const block='/* BEGIN GENERATED DATA: built by tools/build.js from tools/content.json (faculty files) and tools/authored.js.\n'+
 '   title, situation, parentReaction, teacherGoal, and each parent type\'s name and description are the faculty\'s wording, verbatim.\n'+
 '   Every other field (names, grades, roles, details, category, opener, suggestedType, persona notes, AI prompts, demo lines, avatars) was added for practice. */\n'+
 'const CATEGORIES = '+j(au.categories)+';\n'+
 'const PTYPE_LIST = [\n'+types.map(t=>'  '+j(t)).join(',\n')+'\n];\n'+
 'const BUILTIN = [\n'+scen.map(s=>'  '+j(s)).join(',\n')+'\n];\n'+
 '/* END GENERATED DATA */';
let html=fs.readFileSync(htmlPath,'utf8');
const re=/\/\* BEGIN GENERATED DATA[\s\S]*?\/\* END GENERATED DATA \*\//;
if(!re.test(html))throw new Error('generated-data markers not found in '+htmlPath);
html=html.replace(re,()=>block);
fs.writeFileSync(htmlPath,html);
console.log('Wrote '+scen.length+' scenarios and '+types.length+' parent types into '+htmlPath);
