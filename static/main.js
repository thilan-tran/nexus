const drop = document.querySelector('.dropdown');
const content = document.querySelector('.dropdown .content');
drop.addEventListener(
  'click',
  (evt) => !content.contains(evt.target) && drop.classList.toggle('expand')
);
document.addEventListener('click', (evt) => {
  !drop.contains(evt.target) && drop.classList.remove('expand');
});

const custom = document.querySelector('.custom-content');
document.querySelector('.caret').addEventListener('click', () =>
  custom.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
    inline: 'nearest'
  })
);

const swap = document.querySelector('.shuffle');
const carousel = document.querySelector('.carousel');
swap.addEventListener('click', () => {
  for (const child of carousel.children) {
    child.classList.toggle('container-disable');
  }
});

//const modal = document.querySelector('.modal');
//document
//.querySelector('#about')
//.addEventListener('click', () => modal.classList.toggle('show'));
//modal.addEventListener('click', () => modal.classList.toggle('show'));
