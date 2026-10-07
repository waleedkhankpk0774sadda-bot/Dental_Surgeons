const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const backTop = document.querySelector(".back-top");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function closeMenu(){
  nav.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.setAttribute("aria-label","Open navigation");
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

function onScroll(){
  header.classList.toggle("scrolled", window.scrollY > 8);
  backTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxText = lightbox.querySelector("p");
const closeButton = lightbox.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector("img").alt;
    lightboxText.textContent = item.querySelector("span").textContent.replace(" ↗","");
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  });
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}
closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if(e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
