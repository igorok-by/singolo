window.onload = () => {
  markNavLink();
  markImgInGrid();
  addTagsClickHandler();
}


// Handler for marking elements
const markClickedElement = (elements, elem, classForMark) => {
  if (elem === undefined) {
    return;
  };
  elements.forEach(el => el.classList.remove(classForMark));
  elem.classList.add(classForMark);
}


// Header: Mark navigation links and scroll to target section
const header = document.querySelector('#header');
const headerNavMenu = header.querySelector('nav.header__right');
const scrollWindowToTargetSection = (link) => {
  window.scrollTo(0, document.querySelector(`${link.getAttribute('href')}`).offsetTop - header.offsetHeight);
};
const markNavLink = () => {
  headerNavMenu.addEventListener('click', (event) => {
    let navLinks = headerNavMenu.querySelectorAll('.link');
    let clickedNavLink = event.target.closest('a');
    event.preventDefault();

    scrollWindowToTargetSection(clickedNavLink);
    markClickedElement(navLinks, clickedNavLink, 'link--active');
  });
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
// const wrapFilterBtns = document.querySelector('#filterBtns');
// const btnsTag = wrapFilterBtns.querySelectorAll('.btn-tag');

// const addTagsClickHandler = () => {
//   wrapFilterBtns.addEventListener('click', (event) => {
//     event.preventDefault();
//     if (event.target.classList.contains('btn-tag')) {
//       let clickedTag = event.target;
//       markClickedElement(btnsTag, clickedTag, 'btn-tag--active');


//     };
//   });
// };

// const showAllImages = () => {

// };
