class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = '';
    this.modalContent = '';
    this.modalCloseBtn = '';
    this.overlay = '';
  };

  buildModal(content) {
    //Overlay
    this.overlay = this.createDomNode(this.overlay, 'div', 'overlay', 'overlay_modal');

    //Modal
    this.modal = this.createDomNode(this.modal, 'div', 'modal', this.classes);

    //Modal content
    this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal__content');

    //Close Button
    this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'button', 'modal__close');
    this.modalCloseBtn.setAttribute('type', 'button');
    this.modalCloseBtn.innerText = 'OK';

    // this.modalCloseBtn.innerHTML = 'hello';

    this.setContent(content);

    this.appendModalElements();

    // Bind Events
    this.bindEvents();

    // Open Modal
    this.openModal();
  };

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  };

  setContent(content) {
    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = '';
      this.modalContent.appendChild(content);
    };
  };

  appendModalElements() {
    this.modal.append(this.modalContent);
    this.modal.append(this.modalCloseBtn);
    this.overlay.append(this.modal);
  };

  bindEvents() {
    this.overlay.addEventListener('click', this.closeModal);
    this.modalCloseBtn.addEventListener('click', this.closeModal);
  };

  openModal() {
    document.body.append(this.overlay);
  };

  closeModal(event) {
    let classes = event.target.classList;

    if (classes.contains('overlay') || classes.contains('modal__close')) {
      document.querySelector('.overlay').remove();
    };
  };
};


window.onload = () => {

  // Mark link when clicked and scroll to target section
  handleClickOnHeaderLinks();

  // Mark image when clicked
  markImgInGrid();

  // Mark tag-button when clicked and shuffle images
  addTagsClickHandler();

  // Generate Base Modal from Modal Class
  addFormSubmitHandler();

  // Slider activation
  addSliderHandler();

  // Toggle phone's screen after click
  togglePhoneScreen();
};


// Change active navigation link in header on scrolling window
const changeActiveNavLinkOnScroll = () => {
  const currentYPositionOfWindow = window.scrollY;
  const allTargetBlocks = document.querySelectorAll('#main > section');
  const navLinks = document.querySelectorAll('#navMenu > a');

  allTargetBlocks.forEach(targetBlock => {
    if ( (targetBlock.offsetTop - header.offsetHeight - 1) <= currentYPositionOfWindow && (targetBlock.offsetTop + targetBlock.offsetHeight - header.offsetHeight - 1) > currentYPositionOfWindow ) {

      navLinks.forEach(navLink => {
        navLink.classList.remove('link--active');
        if (targetBlock.getAttribute('id') === navLink.getAttribute('href').substring(1)) {
          navLink.classList.add('link--active');
        };
      });
    };
  });
};

// Scroll window to targeted section
const scrollWindowToTargetSection = (link) => {
  window.scrollTo(0, document.querySelector(`${link.getAttribute('href')}`).offsetTop - header.offsetHeight);
};

// Mark navigation links and scroll to target section when link clicked
const handleClickOnHeaderLinks = () => {
  const header = document.querySelector('#header');
  const headerNavMenu = header.querySelector('nav.header__right');

  headerNavMenu.addEventListener('click', (event) => {
    let clickedNavLink = event.target.closest('a');
    event.preventDefault();
    scrollWindowToTargetSection(clickedNavLink);
  });

  document.addEventListener('scroll', changeActiveNavLinkOnScroll);
};

// Modal from form when submitted
const contactForm = document.querySelector('#contactForm');
const addFormSubmitHandler = () => {
  contactForm.querySelector('[type=submit]').addEventListener('click', (event) => {

    let emailOfLetter = contactForm.querySelector('[name=email]').value;
    let nameOfLetter = contactForm.querySelector('[name=name]').value;
    let subjectOfLetter = contactForm.querySelector('[name=subject]').value;
    let detailsOfLetter = contactForm.querySelector('[name=details]').value;

    if (emailOfLetter && nameOfLetter) {
      event.preventDefault();
      let submittedContent = '<h2 class="modal__title">The letter was sent</h2>';

      if (subjectOfLetter) {
        submittedContent += `<p class="modal__text">Subject: ${subjectOfLetter}</p>`;
      } else {
        submittedContent += '<p class="modal__text">No subject</p>';
      };
      if (detailsOfLetter) {
        submittedContent += `<p class="modal__text">Description: ${detailsOfLetter}</p>`;
      } else {
        submittedContent += '<p class="modal__text">No description</p>';
      };

      generateModalFromSubmit(submittedContent);
      document.querySelector('.modal__close').addEventListener('click', () => contactForm.reset());
      document.querySelector('.overlay').addEventListener('click', () => contactForm.reset());
    };
  });
};

const generateModalFromSubmit = (submittedContent) => {
  renderModalWindow(submittedContent);
};

const renderModalWindow = (content) => {
  let modal = new Modal('modal');
  modal.buildModal(content);
};

// Handler for marking elements
const markClickedElement = (elements, elem, classForMark) => {
  if (elem === undefined) {
    return;
  };
  elements.forEach(el => el.classList.remove(classForMark));
  elem.classList.add(classForMark);
};

// Portfolio: Mark image in grid when clicked
const gridOfImages = document.querySelector('#gridOfImages');
const imagesInGrid = gridOfImages.querySelectorAll('.grid__img');
const markImgInGrid = () => {
  gridOfImages.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid__img')) {
      let clickedImg = event.target;
      markClickedElement(imagesInGrid, clickedImg, 'grid__img--active');
    };
  });
};

// Portfolio: Mark filter link when clicked
const wrapFilterBtns = document.querySelector('#filterBtns');
const tagBtns = wrapFilterBtns.querySelectorAll('.btn-tag');

const addTagsClickHandler = () => {
  wrapFilterBtns.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('btn-tag')) {
      let clickedTag = event.target;
      markClickedElement(tagBtns, clickedTag, 'btn-tag--active');

      let arrayOfImages = shuffleSomeArray(imagesInGrid);
      gridOfImages.append(...arrayOfImages);
    };
  });
};

const shuffleSomeArray = (someArray) => { // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  someArray = [...someArray];
  let currentIndex = someArray.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = someArray[currentIndex];
    someArray[currentIndex] = someArray[randomIndex];
    someArray[randomIndex] = temporaryValue;
  };

  return someArray;
};

// Handler for Slider
const addSliderHandler = () => {
  let sliderItems = document.querySelectorAll('.slider .slider__item');
  const arrowToLeft = document.querySelector('.slider__control--left');
  const arrowToRight = document.querySelector('.slider__control--right');
  let positionOfItem = 0;
  let havePermit = true;

  const changeCurrentItem = (counter) => {
    positionOfItem = (counter + sliderItems.length) % sliderItems.length;
  };

  const hideItem = (direction) => {
    havePermit = false;
    sliderItems[positionOfItem].classList.add(direction);
    sliderItems[positionOfItem].addEventListener('animationend', function () {
      this.classList.remove('slider__item--active', direction);
    });
  };

  const showItem = (direction) => {
    sliderItems[positionOfItem].classList.add('slider__item--next', direction);
    sliderItems[positionOfItem].addEventListener('animationend', function () {
      this.classList.remove('slider__item--next', direction);
      this.classList.add('slider__item--active');
      havePermit = true;
    });
  };

  const nextItem = (counter) => {
    hideItem('slider__control--to-left');
    changeCurrentItem(counter + 1);
    showItem('slider__control--from-right');
  };

  const previousItem = (counter) => {
    hideItem('slider__control--to-right');
    changeCurrentItem(counter - 1);
    showItem('slider__control--from-left');
  };

  arrowToLeft.addEventListener('click', function () {
    if (havePermit) {
      previousItem(positionOfItem);
    };
  });

  arrowToRight.addEventListener('click', function () {
    if (havePermit) {
      nextItem(positionOfItem);
    };
  });
};

// Toggle phone's screen after click
const togglePhoneScreen = () => {
  const sliderFigures = document.querySelectorAll('.slider .slider__img');

  const toggleImgOnScreen = (event) => {
    if (event.target.classList.contains('iphone')
        || event.target.classList.contains('screen')
        && !event.target.classList.contains('iphone--decor')) {

      event.target.closest('.slider__img')
        .querySelector('.screen')
        .classList
        .toggle('screen--empty');
    };
  };

  sliderFigures.forEach(figure => {
    figure.addEventListener('click', toggleImgOnScreen);
  });
};
