"use strict";

const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('.modal');
const MODAL_CLOSE = document.querySelector('.modal__close');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

const SLIDER_VIEW = document.querySelector('.slider__view');
const SLIDER_SLIDES = document.querySelector('.slider__slides');
const SLIDER_ACTIONS = document.querySelector('.slider__actions');
const SLIDER_LEFT = document.querySelector('.slider__actions-left');
const SLIDER_RIGTH = document.querySelector('.slider__actions-right');

const PRICE_BTN = document.querySelectorAll('.price__btn');

const FAQ_LIST_ITEM = document.querySelectorAll('.faq__list-item')

let maxWidth = Math.ceil(3880 - SLIDER_VIEW.clientWidth);
let slidesTransX = Math.ceil(-maxWidth / 2);
let interval;
let touchstartX = 0
let touchendX = 0

//////////////////////////////

//////////////////////////////


function enableScroll() {
  document.documentElement.classList.remove('stop-scroll');
}

function disableScroll() {
  document.documentElement.classList.add('stop-scroll');
}

function showOverlay() {
  OVERLAY.classList.add('overlay-show');
  MODAL.classList.add('modal-show');
  disableScroll();
}

function hideOverlay() {
  OVERLAY.classList.remove('overlay-show');
  MODAL.classList.remove('modal-show');
  enableScroll();
}

function showMenu() {
  NAV_TOGGLE.checked ? disableScroll() : enableScroll();
}

function hideMenu() {
  NAV_TOGGLE.checked = false;
  enableScroll();
}

function isMobile() {
  let match = window.matchMedia || window.msMatchMedia;
  if (match) {
    let mq = match('(pointer:coarse)');
    return mq.matches;
  }
  return false;
}

//////////////////////////////
// SLIDER
//////////////////////////////

function moveSlideLeft(step) {
  const stepSize = Math.ceil(step);
  SLIDER_SLIDES.style.transform = `translateX(${slidesTransX += stepSize}px)`;
}

function moveSlideRight(step) {
  const stepSize = Math.ceil(step);
  SLIDER_SLIDES.style.transform = `translateX(${slidesTransX -= stepSize}px)`;
}

function resetSlidePosition() {
  maxWidth = Math.ceil(3880 - SLIDER_VIEW.clientWidth);
  slidesTransX = Math.ceil(-maxWidth / 2);
  SLIDER_SLIDES.style.transform = `translateX(${slidesTransX}px)`;
}

function checkDirection() {
  if (touchendX < touchstartX && slidesTransX > -maxWidth) moveSlideRight(20)
  if (touchendX > touchstartX && slidesTransX < 0) moveSlideLeft(20)
}

//////////////////////////////
// ACCORDION
//////////////////////////////

function toggleDetails(event) {
  if (!event.target.open) return;
  for (let details of [...FAQ_LIST_ITEM]) {
    details.open = details === event.target;
  }
}

function saveDetailsState(detailsId) {
  let sessionStorageKey = 'detailsOpen_' + detailsId;
  let details = document.querySelector(`[data-id="${detailsId}"]`);

  details.addEventListener('toggle', (event) => {
    if (details.open) {
      sessionStorage.setItem(sessionStorageKey, true);
    } else {
      sessionStorage.removeItem(sessionStorageKey);
    }
  });

  if (sessionStorage.getItem(sessionStorageKey)) {
    details.open = true;
  }
}

//////////////////////////////
// EVENTS
//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

MODAL_CLOSE.addEventListener('click', hideOverlay);

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

SLIDER_LEFT.addEventListener('mouseover', () => {
  if (isMobile()) return
  interval = setInterval(() => {
    if (slidesTransX < 0) {
      moveSlideLeft(20)
    }
  }, 100);
});

SLIDER_LEFT.addEventListener('mouseout', () => {
  clearInterval(interval);
});

SLIDER_RIGTH.addEventListener('mouseover', (event) => {
  if (isMobile()) return
  interval = setInterval(() => {
    if (slidesTransX > -maxWidth) {
      moveSlideRight(20)
    }
  }, 100);
});

SLIDER_RIGTH.addEventListener('mouseout', () => {
  clearInterval(interval);
});

SLIDER_ACTIONS.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

SLIDER_ACTIONS.addEventListener('touchmove', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

PRICE_BTN.forEach((elem) => {
  elem.addEventListener('click', showOverlay);
});

FAQ_LIST_ITEM.forEach((details, index) => {
  details.dataset.id = index;
  saveDetailsState(index);
  details.addEventListener('toggle', toggleDetails);
});

window.addEventListener('resize', (event) => {
  NAV_TOGGLE.checked = false;
  enableScroll();
  hideOverlay();
  resetSlidePosition()
});
