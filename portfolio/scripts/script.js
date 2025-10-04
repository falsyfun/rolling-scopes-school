"use strict";

const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('.modal');
const MODAL_CLOSE = document.querySelector('.modal__close');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

const PRICE_BTN = document.querySelectorAll('.price__btn');

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

//////////////////////////////
// EVENTS
//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

MODAL_CLOSE.addEventListener('click', hideOverlay);

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

PRICE_BTN.forEach((elem) => {
  elem.addEventListener('click', showOverlay);
});

window.addEventListener('resize', (event) => {
  NAV_TOGGLE.checked = false;
  enableScroll();
  hideOverlay();
});
