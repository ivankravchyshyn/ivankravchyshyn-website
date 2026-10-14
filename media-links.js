(()=>{
 const stage=document.getElementById('master'),items=window.SITE_MEDIA_LINKS||[];
 if(!stage)return;
 const overlay=(target,item,kind)=>{const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.dataset.mediaId=item.id;a.dataset.mediaTarget=kind;a.setAttribute('aria-label',`${item.project} — open media`);Object.assign(a.style,{position:'absolute',left:target.style.left,top:target.style.top,width:target.style.width,height:target.style.height,zIndex:'25',display:'block',background:'transparent'});stage.append(a)};
 for(const item of items){const poster=document.querySelector(item.posterTarget),button=document.querySelector(item.buttonTarget);if(!poster||!button){console.error('Media target missing',item.id);continue}poster.dataset.mediaId=item.id;poster.dataset.mediaTarget='poster';button.dataset.mediaId=item.id;button.dataset.mediaTarget='button';if(item.status==='ACTIVE'&&item.url){overlay(poster,item,'poster');overlay(button,item,'button')}else{poster.setAttribute('aria-disabled','true');button.setAttribute('role','button');button.setAttribute('aria-disabled','true')}}
})();
