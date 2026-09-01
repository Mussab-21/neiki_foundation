document.addEventListener('DOMContentLoaded', () => {
  // 1. Create Mobile Fullscreen Nav dynamically if not exists
  let mobileNavContainer = document.getElementById('globalMobileNav');
  if (!mobileNavContainer) {
    const mobileNavHTML = `
      <!-- Main Menu View -->
      <div id="mobileMainMenu" class="mobile-nav-menu">
        <a class="mobile-nav-link has-submenu" data-submenu="aboutSubMenu">About Us <span class="chevron">&#8250;</span></a>
        <a class="mobile-nav-link has-submenu" data-submenu="impactSubMenu">Our Impact <span class="chevron">&#8250;</span></a>
        <a href="flood-relief.html" class="mobile-nav-link">2025 Flood Relief <span class="chevron">&#8250;</span></a>
        <a class="mobile-nav-link has-submenu" data-submenu="accountabilitySubMenu">Accountability & Impact <span class="chevron">&#8250;</span></a>
      </div>

      <!-- About Us SubMenu -->
      <div id="aboutSubMenu" class="mobile-sub-menu">
        <div class="mobile-back-btn"><span>&larr;</span> Back</div>
        <h3>About Us</h3>
        <p>Learn about our origins, our vision, and the core values that drive our mission to serve humanity.</p>
        <a href="about.html" class="primary-link">Learn more about us</a>
        
        <div class="mobile-sub-group-title">Identity & Purpose</div>
        <a href="vision.html" class="mobile-sub-link">Vision statement</a>
        <a href="mission.html" class="mobile-sub-link">Mission statement</a>
        <a href="core-values.html" class="mobile-sub-link">Core values</a>
        <a href="objectives.html" class="mobile-sub-link">Strategic Objectives</a>

        <div class="mobile-sub-group-title">Governance</div>
        <a href="chairman-message.html" class="mobile-sub-link">Chairman Message</a>
        <a href="governance.html" class="mobile-sub-link">Organizational Structure & Governance</a>
        <a href="compliance.html" class="mobile-sub-link">Legal Registration & Compliance</a>
      </div>

      <!-- Our Impact SubMenu -->
      <div id="impactSubMenu" class="mobile-sub-menu">
        <div class="mobile-back-btn"><span>&larr;</span> Back</div>
        <h3>Our Impact</h3>
        <p>Discover our on-the-ground impact, completed water projects, and our vision for tomorrow.</p>
        <a href="impact.html" class="primary-link">Explore our impact</a>
        
        <div class="mobile-sub-group-title">Our Programs</div>
        <a href="program-framework.html" class="mobile-sub-link">Program Framework</a>
        <a href="thematic-areas.html" class="mobile-sub-link">Main Thematic Areas</a>
        <a href="flagship-programs.html" class="mobile-sub-link">Flagship Programs</a>

        <div class="mobile-sub-group-title">Completed Initiatives</div>
        <a href="impact.html" class="mobile-sub-link">Phase 1 Water Projects</a>
        <a href="future-goals.html" class="mobile-sub-link">Future Goals & Vision</a>
      </div>

      <!-- Accountability SubMenu -->
      <div id="accountabilitySubMenu" class="mobile-sub-menu">
        <div class="mobile-back-btn"><span>&larr;</span> Back</div>
        <h3>Accountability & Impact</h3>
        <p>Transparency, structured monitoring, and clear communication are at the heart of our operations.</p>
        <a href="accountability.html" class="primary-link">Read about our approach</a>
        
        <div class="mobile-sub-group-title">Network & Outreach</div>
        <a href="partnerships.html" class="mobile-sub-link">Partnerships & Collaborations</a>
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
  const mainMenu = document.getElementById('mobileMainMenu');
  const subMenus = document.querySelectorAll('.mobile-sub-menu');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const isOpen = mobileNavContainer.classList.contains('open');
      if (isOpen) {
        // Close menu
        mobileNavContainer.classList.remove('open');
        toggleBtn.innerHTML = '&#9776;'; // Hamburger
        document.body.style.overflow = '';
        
        // Reset submenus after closing
        setTimeout(() => {
          mainMenu.style.display = 'block';
          subMenus.forEach(sm => sm.classList.remove('active'));
        }, 300);
      } else {
        // Open menu
        mobileNavContainer.classList.add('open');
        toggleBtn.innerHTML = '&#10005;'; // X
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // 3. SubMenu Navigation Logic
  const submenuLinks = document.querySelectorAll('.mobile-nav-link.has-submenu');
  submenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-submenu');
      const targetMenu = document.getElementById(targetId);
      if (targetMenu) {
        mainMenu.style.display = 'none';
        targetMenu.classList.add('active');
      }
    });
  });

  const backBtns = document.querySelectorAll('.mobile-back-btn');
  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subMenus.forEach(sm => sm.classList.remove('active'));
      mainMenu.style.display = 'block';
    });
  });

  // Handle dropdown in mobile view (accordion style) for existing desktop nav if needed
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
        if (typeof window.nextSlide === 'function') {
          window.nextSlide();
        } else {
          const downArrow = document.querySelector('.down-arrow');
          if (downArrow) downArrow.click();
        }
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        if (typeof window.prevSlide === 'function') {
          window.prevSlide();
        } else {
          const upArrow = document.querySelector('.up-arrow');
          if (upArrow) upArrow.click();
        }
      }
    }
  }
});
