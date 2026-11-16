const renderers={home,menu,work,archive:archivePage,about,project,loading,badges:badgesBoard,links:linksBoard,scroll:scrollBoard,readiness:loadingBoard,video:videoBoard};
document.querySelector('#root').innerHTML=(renderers[page]||home)();
let scroller;
const scrollPages=['work','archive','about','project'];
if(!capture&&scrollPages.includes(page)&&!reduced()){
 scroller=new Lenis({autoRaf:true,smoothWheel:true,syncTouch:true,lerp:.1,syncTouchLerp:.075,touchInertiaExponent:1.7,wheelMultiplier:1,touchMultiplier:1,stopInertiaOnNavigate:true,respectReducedMotion:true,prevent:node=>node instanceof HTMLElement&&!!node.closest('dialog,select,textarea,[data-native-scroll]')});
 document.body.dataset.scrollOwner='Lenis 1.3.27';
}else document.body.dataset.scrollOwner='native';
function moveTo(y){if(scroller)scroller.scrollTo(y,{duration:.65,easing:t=>1-Math.pow(1-t,3),lock:false});else scrollTo(0,y)}
function cancelRequested(){if(scroller)scroller.scrollTo(scrollY,{immediate:true})}
addEventListener('keydown',e=>{if(['PageUp','PageDown','Home','End','ArrowUp','ArrowDown','Tab','Escape'].includes(e.key))cancelRequested()});
function updateScroll(){const button=document.querySelector('[data-scroll]');if(!button)return;const max=document.documentElement.scrollHeight-innerHeight,progress=max>0?Math.max(0,Math.min(100,Math.round(scrollY/max*100))):0,top=scrollY>8;const label=top?tr('Scroll to top','Retour en haut'):tr('Scroll down','Défiler vers le bas');button.setAttribute('aria-label',label);button.querySelector(':scope > .icon').outerHTML=icon(top?'up':'down');button.querySelector('.tooltip').textContent=label;button.querySelector('.scroll-progress').setAttribute('aria-valuenow',progress);button.querySelector('.scroll-progress>span').textContent=String(progress).padStart(2,'0')+'%';button.querySelector('.ring-fill').style.strokeDashoffset=100-progress;}
function refreshLayout(){document.body.classList.toggle('has-scroll',scrollPages.includes(page)&&document.documentElement.scrollHeight>innerHeight+2);scroller?.resize();updateScroll()}
document.querySelector('[data-scroll]')?.addEventListener('click',()=>moveTo(scrollY>8?0:Math.min(innerHeight*.8,document.documentElement.scrollHeight-innerHeight)));
document.querySelector('[data-scroll]')?.addEventListener('keydown',e=>{if(e.key==='Escape')e.currentTarget.classList.add('tooltip-dismissed')});
for(const type of ['focus','pointerenter'])document.querySelector('[data-scroll]')?.addEventListener(type,e=>e.currentTarget.classList.remove('tooltip-dismissed'));
addEventListener('scroll',updateScroll,{passive:true});
document.querySelector('[data-role-filter]')?.addEventListener('change',e=>{if(e.target.value)params.set('role',e.target.value);else params.delete('role');location.search=params});
document.querySelector('[data-sort]')?.addEventListener('change',e=>{params.set('sort',e.target.value);location.search=params});
const floating=document.querySelector('.floating-preview');
document.querySelectorAll('.preview-trigger').forEach(row=>{
 const show=(event,stationary)=>{if(innerWidth<=700||!floating)return;const p=catalog.find(p=>p.slug===row.dataset.project);floating.querySelector('img').src=workCover(p);floating.classList.add('is-visible');floating.classList.toggle('stationary',stationary||reduced());const rect=row.getBoundingClientRect(),left=Math.min(innerWidth-490,Math.max(innerWidth*.52,(event.clientX||rect.left)+28)),top=Math.max(110,Math.min(innerHeight-340,(event.clientY||rect.top)+12));floating.style.left=left+'px';floating.style.top=top+'px'};
 row.addEventListener('pointerenter',e=>show(e,false));row.addEventListener('pointermove',e=>show(e,false));row.addEventListener('focus',e=>show(e,true));row.addEventListener('pointerleave',()=>floating?.classList.remove('is-visible'));row.addEventListener('blur',()=>floating?.classList.remove('is-visible'));
});
let dialog,opener;
document.addEventListener('click',e=>{
 const toggle=e.target.closest('.menu-toggle');if(!toggle||page==='menu')return;e.preventDefault();
 if(dialog?.open){dialog.close();return}
 opener=toggle;scroller?.stop();dialog=document.createElement('dialog');dialog.className='menu-dialog';dialog.setAttribute('aria-label',tr('Main navigation','Navigation principale'));dialog.innerHTML=menu();document.body.append(dialog);document.body.classList.add('menu-open');dialog.addEventListener('close',()=>{document.body.classList.remove('menu-open');dialog.remove();scroller?.start();opener.focus();dialog=null},{once:true});dialog.showModal();dialog.querySelector('.menu-toggle').focus();fitTypography();
});
function videoState(surface){const v=surface.querySelector('video'),paused=v.paused||v.ended;surface.querySelector('.play-fallback').hidden=!paused;surface.setAttribute('aria-label',paused?tr('Play video','Lire la vidéo'):tr('Pause video','Mettre la vidéo en pause'));surface.dataset.playback=paused?'paused':'playing'}
async function playVideo(surface){const v=surface.querySelector('video');v.muted=true;try{await v.play();surface.dataset.blocked='false'}catch{surface.dataset.blocked='true'}videoState(surface)}
document.querySelectorAll('[data-video-surface]').forEach(surface=>{
 const v=surface.querySelector('video');let manualPause=false;
 const toggle=()=>{if(capture)return;if(v.paused||v.ended){manualPause=false;playVideo(surface)}else{manualPause=true;v.pause()}};
 surface.addEventListener('click',toggle);surface.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle()}if(e.key==='Escape')surface.querySelector('.tooltip').classList.add('tooltip-dismissed')});surface.addEventListener('focus',()=>surface.querySelector('.tooltip').classList.remove('tooltip-dismissed'));
 for(const event of ['play','pause','ended','error'])v.addEventListener(event,()=>videoState(surface));
 if(!capture){const observer=new IntersectionObserver(entries=>{for(const entry of entries){surface.dataset.visible=entry.isIntersecting;if(!entry.isIntersecting)v.pause();else if(!reduced()&&!navigator.connection?.saveData&&!manualPause&&!document.hidden)playVideo(surface)}},{threshold:.2});observer.observe(surface);if(reduced()||navigator.connection?.saveData){v.removeAttribute('autoplay');v.pause();videoState(surface)}addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();else if(surface.dataset.visible==='true'&&!manualPause&&!reduced())playVideo(surface)})}
});
if(page==='loading'&&!capture){
 const list=document.querySelector('.os-log');let queue=[...loadingMessages].sort(()=>Math.random()-.5),history=[queue.pop()];let count=1;
 list.innerHTML=logLines(history);document.body.dataset.logCount=String(count);
 const timer=setInterval(()=>{if(!queue.length){clearInterval(timer);return}history=[queue.pop(),...history].slice(0,5);list.innerHTML=logLines(history);document.body.dataset.logCount=String(++count);if(!reduced())animate(list.children,{y:[-12,0],duration:240,ease:'out(2)'})},800);
 addEventListener('pagehide',()=>clearInterval(timer),{once:true});
}
function fitTypography(){for(const el of document.querySelectorAll('[data-fit]')){el.style.removeProperty('font-size');const width=el.parentElement.clientWidth,actual=el.getBoundingClientRect().width;if(actual>width&&width>0)el.style.fontSize=(parseFloat(getComputedStyle(el).fontSize)*width/actual*.995)+'px'}}
await document.fonts.ready;
await Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.complete?Promise.resolve():new Promise(resolve=>{i.onload=resolve;i.onerror=resolve})));
await Promise.all([...document.querySelectorAll('video[poster]')].map(v=>new Promise(resolve=>{const poster=new Image();poster.onload=()=>{v.dataset.posterReady='true';resolve()};poster.onerror=()=>{v.dataset.posterReady='false';resolve()};poster.src=v.poster})));
for(const i of document.querySelectorAll('.media-sequence .asset img'))if(i.naturalHeight>i.naturalWidth*1.2)i.closest('.asset').classList.add('portrait-media');
if(params.get('text')==='large'){const sizes=[...document.querySelectorAll('body *')].map(el=>[el,parseFloat(getComputedStyle(el).fontSize)*2]);document.body.classList.add('text-large');for(const[el,size]of sizes)if(!el.closest('.scroll-corner'))el.style.fontSize=size+'px'}
fitTypography();refreshLayout();addEventListener('resize',()=>{fitTypography();refreshLayout()});
if(params.get('motion')==='live'&&!reduced())for(const el of document.querySelectorAll('.reveal'))animate(el,{opacity:[0,1],y:[16,0],duration:650,autoplay:onScroll({target:el,repeat:false})});
document.documentElement.dataset.ready='true';
