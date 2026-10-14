(()=>{
'use strict';
const layers=[...document.querySelectorAll('.text-layer')];
const original=new Map(layers.map(el=>[el,el.textContent]));
const translations=window.HYMN_TRANSLATIONS||{};
const corrections=window.HYMN_DE_APPROVED||{};
const layoutMap=new Map((window.HYMN_LAYOUT||[]).flatMap(sec=>(sec.texts||[]).map(t=>[t.path,t])));
const page=document.getElementById('page');
const ratio=()=>1;
let language='en';
let fitFrame=0;
function fitToStage(){
 const pageRect=page.getBoundingClientRect(),stageScale=pageRect.width/1536||1;
 for(const el of layers){
  let rect=document.createRange();rect.selectNodeContents(el);rect=rect.getBoundingClientRect();
  let sx=Number(el.dataset.baseScaleX)||1,sy=Number(el.dataset.baseScaleY)||1;
  let tx=Number(el.dataset.baseTranslateX)||0,ty=Number(el.dataset.baseTranslateY)||0;
  const maxWidth=pageRect.width-2;
  if(rect.width>maxWidth){sx*=maxWidth/rect.width;el.style.scale=sx+' '+sy;rect=document.createRange();rect.selectNodeContents(el);rect=rect.getBoundingClientRect()}
  if(rect.left<pageRect.left+1)tx+=(pageRect.left+1-rect.left)/stageScale;
  if(rect.right>pageRect.right-1)tx-=(rect.right-(pageRect.right-1))/stageScale;
  el.style.translate=tx+'px '+ty+'px';
 }
}
function queueFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitToStage)}
function apply(){
 for(const el of layers){
  const key=el.title;
  const en=typeof CALIBRATION!=='undefined'?CALIBRATION[key]:null;
  const d=corrections[key]||{};
  const base=original.get(el)||'';
  const translated=translations[key]?.de;
  const isDE=language==='de';
  const text=isDE?(d.text!==undefined?d.text:(translated!==undefined?translated:base)):base;
  const email=el.querySelector('a.email');if(email)email.textContent=text;else el.textContent=text;
  const x=en?.checked?en.dx:0, y=en?.checked?en.dy:0;
  const sx=en?.checked?en.sx:100, sy=en?.checked?en.sy:100;
  const dx=isDE?(d.dx||0):0, dy=isDE?(d.dy||0):0;
  const dsx=isDE?(d.sx??100):100, dsy=isDE?(d.sy??100):100;
  const translateX=(x+dx)*ratio(),translateY=(y+dy)*ratio(),scaleX=sx*dsx/10000,scaleY=sy*dsy/10000;
  el.dataset.baseTranslateX=translateX;el.dataset.baseTranslateY=translateY;el.dataset.baseScaleX=scaleX;el.dataset.baseScaleY=scaleY;
  el.style.translate=translateX+'px '+translateY+'px';
  el.style.scale=scaleX+' '+scaleY;
  if(isDE){
   const t=layoutMap.get(key);
   const longText=el.textContent.length>68||base.includes('\n');
   el.style.whiteSpace=longText?'pre-wrap':'pre';
   if(longText&&t){
    const available=Math.min(650,Math.max(180,1536-t.x-24));
    const w=Math.max(t.w||0,Math.min(available,Math.max(300,(t.w||0)*1.12)));
    el.style.width=w+'px';
    el.style.overflowWrap='normal';
   }else{el.style.width='auto'}
  }else{el.style.whiteSpace='pre';el.style.width=base.includes('\n')?(layoutMap.get(key)?.w||0)+'px':'auto';}
 }
 document.documentElement.lang=language;
 window.HYMN_ACTIVE_LANGUAGE=language;
 window.dispatchEvent(new CustomEvent('hymn-language-change',{detail:{language}}));
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
 queueFit();
}
document.querySelectorAll('.text-layer').forEach(el=>{
 const path=el.title||'';
 if(!path.includes('/LANGUAGES/'))return;
 const code=path.split('/').pop().toLowerCase();
 if(!['en','de','ua'].includes(code))return;
 el.style.pointerEvents='auto';el.style.cursor='pointer';el.setAttribute('role','link');el.tabIndex=0;
 const go=()=>{if(code==='ua'){location.href='../index.html?lang=ua';return;}language=code;apply();history.replaceState(null,'',location.pathname+'?lang='+code)};
 el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go()}});
});
// Site-wide header navigation: preserve the original Photoshop typography.
const navigationIds={'IN DEVELOPMENT':'in-development','FEATURE FILMS':'feature-films','DOCUMENTARY':'documentary-films','PHOTOGRAPHY':'photography','BIOGRAPHY':'biography','CONTACT':'contact'};
for(const el of layers){
 const path=el.title||'';
 let destination=null;
 if(path.includes('/NAVIGATION/')){
  const label=path.split('/').pop().trim().toUpperCase();
  if(navigationIds[label])destination=()=>('../index.html?lang='+language+'#'+navigationIds[label]);
 }else if(path.includes('/NAME/') && path.includes('IVAN KRAVCHYSHYN')){
  destination=()=>('../index.html?lang='+language);
 }
 if(!destination)continue;
 el.style.pointerEvents='auto';el.style.cursor='pointer';el.setAttribute('role','link');el.tabIndex=0;
 const go=()=>{location.href=destination()};
 el.addEventListener('click',go);
 el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go()}});
}
window.addEventListener('resize',()=>requestAnimationFrame(apply));
document.fonts.ready.then(()=>{apply();queueFit()});
const initialLang=new URLSearchParams(location.search).get('lang');if(initialLang==='de')language='de';
apply();
})();
