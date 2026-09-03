document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  const searchBtn = document.querySelector('.header-search');
  const megaMenu = document.querySelector('.mega-menu');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent closing immediately if clicking outside logic exists
      nav.classList.toggle('mobile-open');
      if (megaMenu) megaMenu.classList.remove('active'); // Close mega menu if open
    });
  }

  // Handle dropdown in mobile view (accordion style)
  const navLinks = document.querySelectorAll('.main-nav a.has-dropdown');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
          dropdown.classList.toggle('mobile-open');
        }
      }
    });
  });

  // Carousel Touch Swipe Support
  const carouselContainer = document.querySelector('.hero-wrapper');
  if (carouselContainer) {
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carouselContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left, go to next slide
        if (typeof window.nextSlide === 'function') {
          window.nextSlide();
        } else {
          // Fire event for down arrow which is typically "next" in this UI
          const downArrow = document.querySelector('.down-arrow');
          if (downArrow) downArrow.click();
        }
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right, go to previous slide
        if (typeof window.prevSlide === 'function') {
          window.prevSlide();
        } else {
          // Fire event for up arrow which is typically "prev" in this UI
          const upArrow = document.querySelector('.up-arrow');
          if (upArrow) upArrow.click();
        }
      }
    }
  }
});
