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
