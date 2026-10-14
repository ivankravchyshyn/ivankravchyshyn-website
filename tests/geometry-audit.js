/* Run in the page after fonts/images settle. Decorative elements may opt out with data-allow-bleed. */
window.auditVisibleGeometry=()=>{
 const limit=document.documentElement.clientWidth;
 return [...document.querySelectorAll('body *')].flatMap(element=>{
  if(element.closest('[data-allow-bleed]'))return [];
  const style=getComputedStyle(element);
  let rect=element.getBoundingClientRect();
  if(element.childNodes.length&&[...element.childNodes].some(node=>node.nodeType===Node.TEXT_NODE&&node.textContent.trim())){
   const range=document.createRange();range.selectNodeContents(element);rect=range.getBoundingClientRect();
  }
  if(style.display==='none'||style.visibility==='hidden'||rect.width<=1||rect.height<=1)return [];
  if(rect.left>=-1&&rect.right<=limit+1)return [];
  return [{tag:element.tagName,id:element.id,className:String(element.className||''),left:rect.left,right:rect.right,limit}];
 });
};
