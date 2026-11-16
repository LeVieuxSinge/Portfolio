import{readFile,writeFile}from'node:fs/promises';
const root='docs/design_v3/source/';await writeFile(root+'studio.js',(await Promise.all(['core.js','identity.js','cv.js','views.js'].map(p=>readFile(root+p,'utf8')))).join('\n'));
const labels={};for(const language of ['en','fr']){const data=JSON.parse(await readFile('app/locales/'+language+'.json','utf8'));labels[language]={role:data.role,tool:data.tool}}await writeFile(root+'labels.json',JSON.stringify(labels,null,2));
