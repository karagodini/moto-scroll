/****************************HERO MOTO****************************/
const MAX_FRAMES = 150;
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);
const $heroContainer = $('.am-hero-moto');

function generaSrc(nFrame) {
  return `./assets/frames/moto-${nFrame.toString().padStart(3, '0')}.webp`;
}

function preloadImages() {
  Array.from({ length: MAX_FRAMES }, (_, i) => {
    const currentFrame = i + 1;
    const src = generaSrc(currentFrame);
    const img = document.createElement('img');
    img.src = src;
  });
}

function updateImage(nFrame) {
  const src = generaSrc(nFrame);
  $heroContainer.style.setProperty('--bg-img', `url('${src}')`);
}

function generateHeroMoto() {
  const viewportHeight = window.innerHeight;
  const heroContainerHeight = $heroContainer.scrollHeight;
  const scrollHeighRest = heroContainerHeight - viewportHeight;
  const fractionScroll = window.scrollY / scrollHeighRest;
  let nFrame = ~~(fractionScroll * MAX_FRAMES) + 1;
  if (nFrame > MAX_FRAMES) {
    nFrame = MAX_FRAMES;
  }
  updateImage(nFrame);
}

document.addEventListener('DOMContentLoaded', preloadImages);
window.addEventListener('scroll', generateHeroMoto);

/****************************NAV BAR****************************/
document.addEventListener('click', e => {
  if (e.target.matches('.anchor')) {
    $$('.anchor-active').forEach(el => el.classList.remove('anchor-active'));
    e.target.classList.add('anchor-active');
  }
});

/****************************UPDATE BAR ITEM****************************/
let timeSaver = null;
document.addEventListener('DOMContentLoaded', () => {
  ['section1', 'section2', 'section3', 'section4'].forEach(id => {
    const nId = id;
    const currentAnchor = $(`.${nId}`);
    const container = document.getElementById(nId);
    const observer = new IntersectionObserver(([entry], obse) => {
      if (entry.isIntersecting) {
        $$('.anchor-active').forEach(el => el.classList.remove('anchor-active'));
        currentAnchor.classList.add('anchor-active');
        clearTimeout(timeSaver);
        timeSaver = setTimeout(() => {
          history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          );
        }, 500);
      }
    });

    observer.observe(container);
  });
});
