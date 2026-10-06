const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const modal=document.getElementById('modal');
document.querySelectorAll('.open-book').forEach(b=>b.addEventListener('click',()=>modal.classList.add('show')));
document.querySelector('.close').addEventListener('click',()=>modal.classList.remove('show'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
const form=document.getElementById('booking'),toast=document.getElementById('toast');
form.addEventListener('submit',e=>{e.preventDefault();modal.classList.remove('show');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500);form.reset()});
const reviews=[...document.querySelectorAll('.review')],dots=[...document.querySelectorAll('.dots button')];let i=0;
function show(n){reviews.forEach((r,x)=>r.classList.toggle('active',x===n));dots.forEach((d,x)=>d.classList.toggle('active',x===n));i=n}
dots.forEach((d,n)=>d.addEventListener('click',()=>show(n)));setInterval(()=>show((i+1)%reviews.length),5000);
const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('nav a')];
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>obs.observe(s));
