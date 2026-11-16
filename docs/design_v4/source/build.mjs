import {readFile,writeFile} from 'node:fs/promises';
const base='docs/design_v4/source/';
await writeFile(base+'studio.js',(await Promise.all(['core.js','identity.js','cv.js','views.js','about.js','project.js','boards.js','runtime.js'].map(p=>readFile(base+p,'utf8')))).join('\n'));
const labels={};for(const locale of ['en','fr']){const data=JSON.parse(await readFile('app/locales/'+locale+'.json','utf8'));labels[locale]={role:data.role,tool:data.tool,loading:data.loading}}
await writeFile(base+'labels.json',JSON.stringify(labels,null,2));
