import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd();
const design=path.join(root,'docs/design');
function dimensions(bytes){
  if(bytes[0]===137&&bytes[1]===80)return {width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
  for(let i=2;i<bytes.length;){
    if(bytes[i]!==255){i++;continue;}
    const marker=bytes[i+1];
    if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker))return {width:bytes.readUInt16BE(i+7),height:bytes.readUInt16BE(i+5)};
    if(marker===216||marker===217){i+=2;continue;}
    i+=2+bytes.readUInt16BE(i+2);
  }
  throw new Error('Unrecognized image dimensions');
}
const errors=[];
const inventory={};
for(const folder of ['screens','boards','references','concepts']){
  inventory[folder]=[];
  for(const file of (await readdir(path.join(design,folder))).filter(f=>/\.(jpg|png)$/.test(f)).sort()){
    const bytes=await readFile(path.join(design,folder,file));
    const size=dimensions(bytes);
    const id=file.replace(/\.(jpg|png)$/,'');
    inventory[folder].push({id,file:folder+'/'+file,...size,bytes:bytes.length});
    if(bytes.length<2000)errors.push('Suspiciously small image: '+file);
    if(folder==='screens'&&!id.includes('overview')){
      const expected=id.includes('-mobile')?390:1440;
      if(size.width!==expected)errors.push(`Wrong export width: ${file} ${size.width}, expected ${expected}`);
    }
  }
}
if(process.argv.includes('--write-manifests')){
  for(const folder of ['screens','boards','concepts'])await writeFile(path.join(design,folder,'manifest.json'),JSON.stringify(inventory[folder],null,2)+'\n');
  const refs=JSON.parse(await readFile(path.join(design,'references/manifest.json'),'utf8'));
  for(const ref of refs){const item=inventory.references.find(x=>x.id===ref.id);Object.assign(ref,{imageWidth:item.width,imageHeight:item.height});delete ref.viewport;}
  await writeFile(path.join(design,'references/manifest.json'),JSON.stringify(refs,null,2)+'\n');
}
for(const [folder,count] of Object.entries({screens:39,boards:16,references:13,concepts:2})){
  if(inventory[folder].length!==count)errors.push(`Expected ${count} ${folder}, found ${inventory[folder].length}`);
}
const expected=[];
for(const device of ['desktop','mobile'])for(const theme of ['light','dark']){
  for(const variation of ['centered','split','framed'])expected.push(`home-${variation}-${theme}-${device}`);
  for(const page of ['work','archive','about','project','menu'])expected.push(`${page}-${theme}-${device}`);
}
for(const id of expected)if(!inventory.screens.some(s=>s.id===id))errors.push('Missing required screen: '+id);
for(const recordFile of ['browser-validation-main.json','browser-validation-extra.json']){
  const records=JSON.parse(await readFile(path.join(design,recordFile),'utf8'));
  for(const record of records){
    const item=inventory[record.board?'boards':'screens'].find(image=>image.id===record.id);
    if(!item||item.width!==record.viewport.width||item.height!==record.height)errors.push('Incomplete or incorrectly sized capture: '+record.id);
    if(!record.images||record.overflow.length||record.width!==record.contentWidth)errors.push('Browser layout issue: '+record.id);
  }
}
for(const folder of ['screens','boards','concepts']){
  const manifest=JSON.parse(await readFile(path.join(design,folder,'manifest.json'),'utf8'));
  if(manifest.length!==inventory[folder].length)errors.push('Stale manifest: '+folder);
}
const js=await readFile(path.join(design,'source/studio.js'),'utf8');
const workOrder=[...js.matchAll(/slug:'(feltkutur|ryker|schluter|simona)',title:/g)].map(m=>m[1]);
if(workOrder.join(',')!=='feltkutur,ryker,schluter,simona')errors.push('Selected order differs from PLAN.md');
for(const file of ['climate-crisis.woff2','manrope.woff2','ibm-plex-mono.woff2']){
  const bytes=await readFile(path.join(design,'fonts',file));
  if(bytes.subarray(0,4).toString()!=='wOF2')errors.push('Invalid font: '+file);
}
const luminance=hex=>{const rgb=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2);};
const ratios={light:{inkOnPaper:contrast('#232520','#eeeee5'),mutedOnPaper:contrast('#64685f','#eeeee5'),inkOnSurface:contrast('#232520','#e5e5da'),mutedOnSurface:contrast('#64685f','#e5e5da')},dark:{inkOnPaper:contrast('#eeeee7','#111211'),mutedOnPaper:contrast('#a1a39c','#111211'),inkOnSurface:contrast('#eeeee7','#191a19'),mutedOnSurface:contrast('#a1a39c','#191a19')}};
for(const [mode,values] of Object.entries(ratios))for(const [pair,ratio] of Object.entries(values)){
  // The locked palette has one prohibited text pairing; surface text uses Ink.
  if(mode==='light'&&pair==='mutedOnSurface')continue;
  if(ratio<4.5)errors.push('Text contrast below 4.5:1: '+mode+'/'+pair);
}
const mdPath=path.join(root,'DESIGN.md');
let localReferences=0;
try{
  const md=await readFile(mdPath,'utf8');
  const targets=[...md.matchAll(/!?\[[^\]]*\]\(([^)]+)\)|(?:src|href)="([^"]+)"/g)].map(m=>(m[1]||m[2]).replace(/^<|>$/g,''));
  for(const target of targets){if(/^(https?:|mailto:|#)/.test(target))continue;localReferences++;try{await stat(path.resolve(root,target.split('#')[0]));}catch{errors.push('Broken document path: '+target);}}
  for(const items of Object.values(inventory))for(const item of items)if(!md.includes('docs/design/'+item.file))errors.push('Image not included in DESIGN.md: '+item.file);
  if(!md.includes('Conceptual')||!md.includes('factual review'))errors.push('Missing concept/copy review labels');
}catch{if(!process.argv.includes('--write-manifests'))errors.push('DESIGN.md missing');}
const report={date:'2026-11-13',images:Object.fromEntries(Object.entries(inventory).map(([k,v])=>[k,v.length])),localReferences,contrast:ratios,prohibitedTextPairings:['Light Muted on Surface: 4.49:1. Use Ink on Surface.'],errors};
await writeFile(path.join(design,'validation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
