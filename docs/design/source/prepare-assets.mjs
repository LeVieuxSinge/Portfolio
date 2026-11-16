import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const names = { 'Climate Crisis': 'climate-crisis', 'Manrope': 'manrope', 'IBM Plex Mono': 'ibm-plex-mono' };
// Fonts are already included. This optional refresh uses recorded source URLs.
const records = JSON.parse(await readFile(path.join(root,'docs/design/fonts/manifest.json'),'utf8'));
for (const { family, file, url } of records) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font download: ${response.status} ${family}`);
  await writeFile(path.join(root, 'docs/design/fonts',file), Buffer.from(await response.arrayBuffer()));
}
for (const [family, directory] of [['Climate Crisis','climatecrisis'], ['Manrope','manrope'], ['IBM Plex Mono','ibmplexmono']]) {
  const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${directory}/OFL.txt`);
  if (!response.ok) throw new Error(`Font license: ${response.status} ${family}`);
  await writeFile(path.join(root, `docs/design/fonts/${names[family]}-OFL.txt`), await response.text());
}
await writeFile(path.join(root,'docs/design/fonts/manifest.json'), JSON.stringify(records, null, 2));
console.log('Saved three agreed font families and their licenses.');
