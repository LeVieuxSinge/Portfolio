import {animate,onScroll} from '../vendor/anime.esm.min.js';
const params=new URLSearchParams(location.search);
const page=params.get('page')||'home',variation=params.get('variation')||'a',locale=params.get('locale')||'en';
const fr=locale==='fr',state=params.get('state')||'default';
const tr=(en,frText)=>fr?frText:en;
document.documentElement.lang=locale;
document.title=`Xavier Champoux — V3 / ${page} / ${variation} / ${locale}`;
document.body.className=`page-${page} variation-${variation}`;
if(params.get('capture')==='1')document.body.classList.add('capture');
if(params.get('motion')==='reduce')document.documentElement.classList.add('reduced');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const link=(name,extra={})=>'?'+new URLSearchParams({page:name,variation,locale,...extra});
const rawCatalog=await fetch('catalog.json').then(r=>r.json());
const translations=await fetch('labels.json').then(r=>r.json());
const roleName=id=>translations[locale].role[id]||id;
const toolName=id=>translations[locale].tool[id]||id;
const featuredOrder=['feltkutur','ryker','schluter','simona'];
const catalog=rawCatalog.map(p=>({...p,selected:featuredOrder.includes(p.slug)}));
const selected=featuredOrder.map(slug=>catalog.find(p=>p.slug===slug));
const workCover=p=>p.slug==='simona'?'/images/projects/simona/0.webp':p.cover;
const archive=catalog.filter(p=>!p.selected).sort((a,b)=>Number(b.year)-Number(a.year)||a.slug.localeCompare(b.slug));
const summaries={feltkutur:tr('A 3D configurator for shaping spaces with felt.','Un configurateur 3D pour composer des espaces en feutre.'),ryker:tr('A fresh approach to configuring a Can-Am Ryker.','Une nouvelle approche pour configurer un Can-Am Ryker.'),schluter:tr('An interactive showroom that makes hidden layers visible.','Une salle d’exposition interactive qui dévoile les couches cachées.'),simona:tr('Interactive material and product configurators.','Des configurateurs interactifs de produits et matériaux.')};
const icon=(name)=>`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{diagonal:'<path d="M5 19 19 5M5 5h14v14"/>',down:'<path d="M12 4v16m-6-6 6 6 6-6"/>',up:'<path d="M12 20V4m-6 6 6-6 6 6"/>',close:'<path d="m5 5 14 14M19 5 5 19"/>',play:'<path d="m9 5 10 7-10 7Z"/>',pause:'<path d="M8 5v14M16 5v14"/>',muted:'<path d="m11 5-5 4H3v6h3l5 4Zm5 4 5 6m0-6-5 6"/>',chevron:'<path d="m6 9 6 6 6-6"/>'}[name]||''}</svg>`;
const action=(label,target,extra={},cls='')=>`<a class="action ${cls}" href="${link(target,extra)}"><span>${label}</span>${icon('diagonal')}</a>`;
const roles=p=>p.roles.map(id=>`<span class="role-badge" data-role="${id}">${roleName(id)}</span>`).join('');
const tagLabels=p=>[...p.tools.map(id=>p.slug==='schluter'&&id==='unrealengine'?'Unreal Engine 4':toolName(id)),...(p.slug==='schluter'?['Level Creation','Blueprint']:[])];
const tags=p=>tagLabels(p).map(s=>`<span class="tag">${s}</span>`).join('');
const ownRoles=()=>[tr('Frontend Developer','Développeur frontend'),tr('UI/UX Designer','Designer UI/UX'),tr('Technical Artist','Artiste technique'),tr('Programmer','Programmeur')];
const oneLiners=()=>[tr('I design.','Je conçois.'),tr('I connect.','Je connecte.'),tr('I automate.','J’automatise.'),tr('I create.','Je crée.')];
function header(open=false){return `<header class="site-header"><a class="identity" href="${link('home')}">${logo().replace('role="img" aria-label="Xavier Champoux"','aria-hidden="true"')}<span class="identity-copy"><span class="identity-name">Xavier Champoux</span><span class="identity-motto mono">${tr('Design. Connect. Automate. Create','Concevoir. Connecter. Automatiser. Créer')}</span></span></a><nav class="header-controls" aria-label="${tr('Language and menu','Langue et menu')}"><a class="locale mono" href="${link(page,{locale:fr?'en':'fr',...(params.get('slug')?{slug:params.get('slug')}:{}),...(params.get('role')?{role:params.get('role')}:{}),...(params.get('sort')?{sort:params.get('sort')}:{}),state})}" aria-label="${tr('Switch to French','Passer en anglais')}">${fr?'EN':'FR'}</a><a class="menu-toggle" href="${link(open?'home':'menu')}" aria-label="${open?tr('Close menu','Fermer le menu'):tr('Open menu','Ouvrir le menu')}"><span>${open?tr('Close','Fermer'):'Menu'}</span>${open?icon('close'):'<span class="menu-lines"><i></i><i></i></span>'}</a></nav></header>`;}
const footer=()=>`<footer class="site-footer mono"><span>© 2026 Xavier Champoux</span><span>${tr('Made with curiosity.','Fait avec curiosité.')}</span></footer>`;
function scrollControl(force=false){return `<div class="mobile-utility" aria-hidden="true"></div><aside class="scroll-corner ${force?'force-tooltip':''}"><button class="scroll-arrow" data-scroll aria-label="${tr('Scroll down','Défiler vers le bas')}" aria-describedby="scroll-tip">${icon('down')}<span role="tooltip" class="tooltip" id="scroll-tip">${tr('Scroll down','Défiler vers le bas')}</span></button><div class="scroll-progress mono" role="progressbar" aria-label="${tr('Reading progress','Progression de lecture')}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span aria-hidden="true">00%</span></div></aside>`;}
function masthead(title,count,note){return `<div class="masthead"><p class="masthead-note">${note}</p><div class="masthead-title"><h1 class="display"><span data-fit>${title}</span></h1>${count?`<span class="count mono">(${count})</span>`:''}</div></div>`;}
const credit=()=>`<p class="credit">${tr('Created with the Pixistudio team.','Réalisé avec l’équipe de Pixistudio.')}</p>`;
