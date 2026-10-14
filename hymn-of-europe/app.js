const BASE=1536, page=document.getElementById('page'), sections=window.HYMN_LAYOUT;
const styles=window.HYMN_TEXT_STYLES||{};
page.dataset.responsiveStage='';page.dataset.designHeight='12900';
page.prepend(document.getElementById('back-to-home'));
function el(tag,cls){const n=document.createElement(tag);if(cls)n.className=cls;return n}
const jobs=[];
for(const sec of sections){
 const box=el('section','section');box.id=sec.id;box.style.height=`${sec.height}px`;
 const bg=el('img','bg');bg.src=`images/${sec.id}_background.png`;bg.alt='';
 const ref=el('img','reference');ref.src=`images/${sec.id}_reference.png`;ref.alt='Photoshop reference';box.append(bg,ref);
 for(const t of (sec.texts||[])){
  const s=styles[t.path]||{},span=el('span','text-layer');
  span.textContent=t.text.replace(/\r/g,'\n').replace(/^\n+/,'');span.title=t.path;
  const fontSize=Number(t.size)||16;
  span.style.left=`${t.x}px`;
  span.style.fontSize=`${fontSize}px`;
  span.style.color=t.color;
  span.style.letterSpacing=`${(t.tracking||0)/1000*fontSize}px`;
  span.style.fontWeight=s.weight||'400';
  span.style.fontStyle=s.italic?'italic':'normal';
  const n=span.textContent.split('\n').length;
  span.style.lineHeight=n>1?String(Math.max(0.9,t.h/n/fontSize)):'1';
  span.style.textAlign=(s.align==='center'||String(t.justify).includes('CENTER'))?'center':'left';
  if(n>1)span.style.width=`${t.w}px`;
  box.append(span);jobs.push({span,t,s});
 }
 page.append(box);
}
// Align the first visible glyph with the Photoshop rendered top. No scaleY.
function calibrate(){
 const ratio=1;
 const canvas=calibrate.canvas||(calibrate.canvas=document.createElement('canvas'));
 const ctx=canvas.getContext('2d');
 for(const {span,t,s} of jobs){
  const size=t.size*ratio;
  ctx.font=`${s.italic?'italic ':''}${s.weight||400} ${size}px "Barlow Condensed"`;
  const first=span.textContent.split('\n')[0]||' ';
  const m=ctx.measureText(first);
  // CSS line box approximate baseline: normal font ascent. Derive ink inset from font metrics.
  const asc=m.fontBoundingBoxAscent||size*.8;
  const desc=m.fontBoundingBoxDescent||size*.2;
  const inkAsc=m.actualBoundingBoxAscent||size*.72;
  const lineH=(span.textContent.includes('\n')?Math.max(.9,t.h/span.textContent.split('\n').length/Math.max(1,t.size)):1)*size;
  const inkInset=(lineH-(asc+desc))/2+asc-inkAsc;
  span.style.top=`${t.y-inkInset}px`;
  const sx=s.hscale||1.34147;
  span.style.transform=`scaleX(${sx})`;
  // Centered multi-line paragraphs align within Photoshop's measured rectangle.
  if(span.textContent.includes('\n'))span.style.transformOrigin='top left';
 }
}
let queued=false;
window.addEventListener('resize',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;calibrate()})}});
document.fonts.ready.then(calibrate);calibrate();
const responsiveScript=document.createElement('script');responsiveScript.src='../responsive-stage.js';document.body.append(responsiveScript);
document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{
 page.classList.toggle('reference-mode',btn.dataset.mode==='reference');
 page.classList.toggle('compare-mode',btn.dataset.mode==='compare');
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
}));
