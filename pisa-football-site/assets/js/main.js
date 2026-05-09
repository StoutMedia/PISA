(function(){
  const header=document.getElementById('siteHeader');
  const toggle=document.getElementById('menuToggle');
  const nav=document.getElementById('mainNav');
  const setHeader=()=>header&&header.classList.toggle('scrolled',window.scrollY>24);
  setHeader(); window.addEventListener('scroll',setHeader,{passive:true});
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
  const page=(document.body.dataset.page||location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav-link').forEach(a=>{if(a.dataset.page===page)a.classList.add('active');a.addEventListener('click',()=>nav&&nav.classList.remove('open'));});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}}));
  document.querySelectorAll('.faq-item button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item').classList.toggle('open')));
  const params=new URLSearchParams(location.search); const program=params.get('program');
  const select=document.getElementById('registrationProgram');
  if(select&&program){select.value=program;}
  document.querySelectorAll('.program-select-card').forEach(card=>{if(program&&card.dataset.program===program)card.classList.add('active');card.addEventListener('click',()=>{document.querySelectorAll('.program-select-card').forEach(c=>c.classList.remove('active'));card.classList.add('active');if(select)select.value=card.dataset.program;document.querySelector('.registration-form')?.scrollIntoView({behavior:'smooth'});});});
})();
