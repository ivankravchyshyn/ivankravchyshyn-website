/* Shared 1536px stage. One parent transform keeps artwork, type and hotspots aligned. */
(()=>{
 const WIDTH=1536,stages=[...document.querySelectorAll('[data-responsive-stage],#master,body[data-project-stage] #page')];if(!stages.length)return;
 const update=()=>{const scale=Math.min(1,Math.max(0,innerWidth)/WIDTH);document.documentElement.style.setProperty('--stage-scale',scale);
  for(const stage of stages){let shell=stage.parentElement;if(!shell.classList.contains('responsive-stage-shell')){shell=document.createElement('div');shell.className='responsive-stage-shell';stage.before(shell);shell.append(stage)}
   const height=Number(stage.dataset.designHeight)||(stage.id==='master'?6000:stage.scrollHeight||stage.offsetHeight);shell.style.height=`${height*scale}px`;stage.style.height=`${height}px`;stage.classList.add('responsive-stage')}
  dispatchEvent(new CustomEvent('responsive-stage-resize',{detail:{scale}}));};
 let frame=0,queue=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};addEventListener('resize',queue,{passive:true});addEventListener('orientationchange',queue,{passive:true});document.fonts?.ready.then(queue);update();
})();
