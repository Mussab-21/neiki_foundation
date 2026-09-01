document.addEventListener('DOMContentLoaded', () => {
  // 1. Create Mobile Fullscreen Nav dynamically if not exists
  let mobileNavContainer = document.getElementById('globalMobileNav');
  if (!mobileNavContainer) {
    const mobileNavHTML = `
      <div class="mobile-nav-content">
        <a href="about.html" class="mobile-nav-link">About Us <span class="chevron">&#8250;</span></a>
        <a href="impact.html" class="mobile-nav-link">Our Impact <span class="chevron">&#8250;</span></a>
        <a href="flood-relief.html" class="mobile-nav-link">2025 Flood Relief <span class="chevron">&#8250;</span></a>
        <a href="accountability.html" class="mobile-nav-link">Accountability & Impact <span class="chevron">&#8250;</span></a>
      </div>
    `;
    mobileNavContainer = document.createElement('div');
    mobileNavContainer.className = 'mobile-fullscreen-nav';
    mobileNavContainer.id = 'globalMobileNav';
    mobileNavContainer.innerHTML = mobileNavHTML;
    document.body.appendChild(mobileNavContainer);
  }

  // 2. Mobile Menu Toggle Logic
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const isOpen = mobileNavContainer.classList.contains('open');
      if (isOpen) {
        mobileNavContainer.classList.remove('open');
        toggleBtn.innerHTML = '&#9776;'; // Hamburger
        document.body.style.overflow = '';
      } else {
        mobileNavContainer.classList.add('open');
        toggleBtn.innerHTML = '&#10005;'; // X
        document.body.style.overflow = 'hidden';
      }
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
