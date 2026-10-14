(()=>{
 const script=document.currentScript;
 const root=script?.dataset.siteRoot||'';
 const css=document.createElement('link');css.rel='stylesheet';css.href=root+'site-footer.css';document.head.append(css);
 const stage=document.querySelector('[data-responsive-stage],#master,body[data-project-stage] #page,#page');
 if(!stage||stage.querySelector('.site-legal-footer'))return;
 const footer=document.createElement('footer');footer.className='site-legal-footer';footer.setAttribute('aria-label','Site footer');
 footer.innerHTML='<span>© 2026 Ivan Kravchyshyn</span><nav class="site-legal-footer__links" aria-label="Profile and legal links"><a href="https://www.linkedin.com/in/ivan-kravchyshyn-698411243/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.youtube.com/@ivankravchyshyn" target="_blank" rel="noopener noreferrer">YouTube</a><a href="https://www.crew-united.com/de/Ivan-Kravchyshyn_913106.html" target="_blank" rel="noopener noreferrer">Crew United</a><a href="https://www.imdb.com/name/nm2752764/" target="_blank" rel="noopener noreferrer">IMDb</a><a class="site-legal-footer__impressum"></a><a class="site-legal-footer__privacy"></a></nav>';
 stage.append(footer);
 const syncLanguage=()=>{const de=document.documentElement.lang.toLowerCase().startsWith('de');const suffix=de?'?lang=de':'?lang=en';const impressum=footer.querySelector('.site-legal-footer__impressum'),privacy=footer.querySelector('.site-legal-footer__privacy');impressum.textContent='Impressum';impressum.href=root+'impressum.html'+suffix;privacy.textContent=de?'Datenschutz':'Privacy Policy';privacy.href=root+'privacy.html'+suffix};
 new MutationObserver(syncLanguage).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});syncLanguage();
})();
