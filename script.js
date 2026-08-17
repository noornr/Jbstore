const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  hero.style.backgroundPositionY = window.scrollY * 0.4 + 'px';
});
