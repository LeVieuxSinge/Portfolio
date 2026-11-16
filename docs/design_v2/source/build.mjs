import {readFile,writeFile} from 'node:fs/promises';
await writeFile('docs/design_v2/source/studio.js',(await readFile('docs/design_v2/source/helpers.js','utf8'))+(await readFile('docs/design_v2/source/views.js','utf8')));
