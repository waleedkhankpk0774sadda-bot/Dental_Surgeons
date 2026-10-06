(function(){
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
  $('#yr').textContent=new Date().getFullYear();
  // sticky header shadow
  var hd=$('.site-header');addEventListener('scroll',function(){hd.classList.toggle('stuck',scrollY>10)},{passive:true});
  // mobile menu
  var burger=$('#burger'),menu=$('#menu');
  burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  $$('#menu a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)})});
  // active nav link on scroll
  var links=$$('#menu a'),secs=links.map(function(a){return $(a.getAttribute('href'))});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=secs.indexOf(e.target);if(i>-1)links.forEach(function(l,j){l.classList.toggle('active',i===j)})}})},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){s&&io.observe(s)});
  }
  // before/after slider
  var ba=$('#ba'),rg=$('input',ba),im=$('img',ba);
  function setBA(v){ba.style.setProperty('--p',v+'%');im.style.clipPath='none'}
  rg.addEventListener('input',function(){setBA(rg.value)});
  // booking modal
  var modal=$('#modal'),form=$('#bookForm'),err=$('#err'),thanks=$('#thanks'),last;
  function open(){last=document.activeElement;modal.hidden=false;form.hidden=false;thanks.hidden=true;err.hidden=true;$('input',form).focus()}
  function close(){modal.hidden=true;last&&last.focus()}
  $$('.js-book').forEach(function(b){b.addEventListener('click',open)});
  $('#mx').addEventListener('click',close);
  modal.addEventListener('click',function(e){if(e.target===modal)close()});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)close()});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=form.name.value.trim().length>1&&/^[0-9+\-\s()]{7,}$/.test(form.phone.value.trim());
    err.hidden=ok;if(!ok)return;
    // TODO: connect to your backend / email service here
    form.hidden=true;thanks.hidden=false;form.reset();
  });
})();
