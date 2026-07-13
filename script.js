const pageDates={"nikkah.html":"2026-11-28T14:30:00-05:00","mehndi.html":"2026-11-29T20:00:00+05:00","walima.html":"2026-11-30T19:00:00+05:00"};
const currentPage=location.pathname.split('/').pop()||'nikkah.html';
const weddingDate=new Date(pageDates[currentPage]||pageDates['nikkah.html']);
const invite=document.getElementById('invite'),envelope=document.getElementById('envelope'),openInvite=document.getElementById('openInvite'),backgroundMusic=document.getElementById('backgroundMusic'),musicToggle=document.getElementById('musicToggle');
if(backgroundMusic)backgroundMusic.volume=.25;
function scrollToPanel(s){document.querySelector(s)?.scrollIntoView({behavior:'smooth',block:'start'});}
openInvite?.addEventListener('click',()=>{if(invite.classList.contains('is-open'))return;envelope.classList.add('opening');openInvite.disabled=true;backgroundMusic?.play().then(()=>musicToggle.hidden=false).catch(()=>{musicToggle.textContent='Play Music';musicToggle.hidden=false});setTimeout(()=>{invite.classList.add('is-open');scrollToPanel('#heroPanel')},1250)});
musicToggle?.addEventListener('click',()=>{if(backgroundMusic.paused){backgroundMusic.play();musicToggle.textContent='Music On'}else{backgroundMusic.pause();musicToggle.textContent='Music Off'}});
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>scrollToPanel(b.dataset.scroll)));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{root:invite,threshold:.45}).observe(document.getElementById('envelopePanel'));
document.querySelectorAll('.panel').forEach(p=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{root:invite,threshold:.45}).observe(p));
function updateCountdown(){const r=Math.max(0,weddingDate-new Date()),v=[Math.floor(r/864e5),Math.floor(r%864e5/36e5),Math.floor(r%36e5/6e4),Math.floor(r%6e4/1e3)];['days','hours','minutes','seconds'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(v[i]).padStart(2,'0')})}
updateCountdown();setInterval(updateCountdown,1000);
