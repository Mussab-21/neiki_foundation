(function () {
            const amountInput = document.getElementById('donate-amount-input');
            const quickButtons = document.querySelectorAll('.quick-btn');
            if (!amountInput) return;

            function updateActiveButton(value) {
              const amount = Number(value);
              quickButtons.forEach(btn => {
                const preset = btn.dataset.amount ? Number(btn.dataset.amount) : null;
                btn.classList.toggle('active', preset !== null && preset === amount);
              });
            }

            quickButtons.forEach(btn => {
              btn.addEventListener('click', function () {
                if (this.dataset.other === 'true') {
                  amountInput.value = '';
                  amountInput.focus();
                  quickButtons.forEach(b => b.classList.remove('active'));
                  return;
                }
                amountInput.value = this.dataset.amount;
                updateActiveButton(amountInput.value);
              });
            });

            amountInput.addEventListener('input', function () {
              if (Number(this.value) < 1 && this.value !== '') this.value = '';
              updateActiveButton(this.value);
            });
            
            // Initial state set
            amountInput.value = '1000';
          })();

          function submitDonation() {
            const input = document.getElementById('donate-amount-input');
            const rawAmount = input ? input.value.trim() : '';
            const amount = Number(rawAmount);

            if (!rawAmount || !Number.isInteger(amount) || amount < 1) {
              if (input) {
                input.focus();
                input.setCustomValidity('Please enter a whole-number amount of at least PKR 1.');
                input.reportValidity();
                input.setCustomValidity('');
              }
              return;
            }

            // Keep the existing placeholder donation flow until a payment gateway is connected.
            window.location.href = 'donate.html';
          }

// ── Card 1: Foundation Facts ─────────────────
  let c1_cur = 0, c1_tx = 0;
  const c1_slides = document.querySelectorAll('[data-card1]');
  const c1_dots   = document.querySelectorAll('#dots1 .swipe-dot');

  function sc1_goto(n) {
    if (window.innerWidth >= 901) return;
    c1_slides[c1_cur].classList.remove('active');
    c1_dots[c1_cur].classList.remove('active');
    c1_cur = (n + c1_slides.length) % c1_slides.length;
    c1_slides[c1_cur].classList.add('active');
    c1_dots[c1_cur].classList.add('active');
  }
  function sc1_ts(e) { if (window.innerWidth >= 901) return; c1_tx = e.changedTouches[0].clientX; }
  function sc1_te(e) {
    if (window.innerWidth >= 901) return;
    const dx = e.changedTouches[0].clientX - c1_tx;
    if (Math.abs(dx) > 30) sc1_goto(c1_cur + (dx < 0 ? 1 : -1));
  }
  // Auto-rotate card 1 every 3.5 s
  setInterval(() => { if (window.innerWidth < 901) sc1_goto(c1_cur + 1); }, 3500);

  // ── Card 2: Strong Governance ────────────────
  let c2_cur = 0, c2_tx = 0;
  const c2_slides = document.querySelectorAll('[data-card2]');
  const c2_dots   = document.querySelectorAll('#dots2 .swipe-dot');

  function sc2_goto(n) {
    if (window.innerWidth >= 901) return;
    c2_slides[c2_cur].classList.remove('active');
    c2_dots[c2_cur].classList.remove('active');
    c2_cur = (n + c2_slides.length) % c2_slides.length;
    c2_slides[c2_cur].classList.add('active');
    c2_dots[c2_cur].classList.add('active');
  }
  function sc2_ts(e) { if (window.innerWidth >= 901) return; c2_tx = e.changedTouches[0].clientX; }
  function sc2_te(e) {
    if (window.innerWidth >= 901) return;
    const dx = e.changedTouches[0].clientX - c2_tx;
    if (Math.abs(dx) > 30) sc2_goto(c2_cur + (dx < 0 ? 1 : -1));
  }
  // Auto-rotate card 2 every 4.5 s (offset from card 1)
  setInterval(() => { if (window.innerWidth < 901) sc2_goto(c2_cur + 1); }, 4500);

document.addEventListener('DOMContentLoaded', () => {
      const track = document.getElementById('wwdTrack');
      const slides = document.querySelectorAll('.wwd-slide');
      const dotsContainer = document.getElementById('wwdDots');
      const carouselContainer = document.getElementById('wwdCarousel');
      
      let currentIndex = 0;
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let autoSlideInterval;
      
      if (!track || slides.length === 0) return;

      // Create dots
      slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('wwd-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
      const dots = document.querySelectorAll('.wwd-dot');

      function updateDots() {
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }

      function goToSlide(index) {
        if (window.innerWidth >= 901) {
          track.style.transform = 'none';
          return;
        }
        if (index < 0) index = 0;
        if (index > slides.length - 1) index = slides.length - 1;
        currentIndex = index;
        track.style.transition = 'transform 0.3s ease-out';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
      }

      function nextSlide() {
        if (currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0); // loop back
        }
      }

      function startAutoSlide() {
        if (window.innerWidth >= 901) {
          if (dotsContainer) dotsContainer.style.display = 'none';
          track.style.transform = 'none';
          return;
        } else {
          if (dotsContainer) dotsContainer.style.display = 'flex';
        }
        autoSlideInterval = setInterval(nextSlide, 4000);
      }

      function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      }

      // Touch events
      carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        track.style.transition = 'none';
        clearInterval(autoSlideInterval);
      }, {passive: true});

      carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
      }, {passive: true});

      carouselContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentIndex > 0) {
            goToSlide(currentIndex - 1);
          } else if (diff < 0 && currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex);
          }
        } else {
          goToSlide(currentIndex);
        }
        startAutoSlide();
      });

      // Mouse events for desktop swipe test
      carouselContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        currentX = startX;
        isDragging = true;
        track.style.transition = 'none';
        clearInterval(autoSlideInterval);
      });

      carouselContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const diff = currentX - startX;
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
      });

      carouselContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;
        
        // Prevent click if we dragged
        if (Math.abs(diff) > 5) {
           setTimeout(() => {
             const links = carouselContainer.querySelectorAll('a');
             links.forEach(link => {
               link.style.pointerEvents = 'none';
               setTimeout(() => link.style.pointerEvents = '', 50);
             });
           }, 0);
        }

        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentIndex > 0) goToSlide(currentIndex - 1);
          else if (diff < 0 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
          else goToSlide(currentIndex);
        } else {
          goToSlide(currentIndex);
        }
        startAutoSlide();
      });

      carouselContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
          isDragging = false;
          goToSlide(currentIndex);
          startAutoSlide();
        }
      });

      startAutoSlide();
    });

document.addEventListener("DOMContentLoaded", function() {
                const slider = document.querySelector('.custom-slider');
                if (slider) {
                    let isHovered = false;
                    slider.addEventListener('mouseenter', () => isHovered = true);
                    slider.addEventListener('mouseleave', () => isHovered = false);
                    
                    function scrollLoop() {
                        if (!isHovered) {
                            slider.scrollLeft += 1.5;
                            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
                                slider.scrollLeft = 0;
                            }
                        }
                        requestAnimationFrame(scrollLoop);
                    }
                    requestAnimationFrame(scrollLoop);
                }
            });

// Interactive SDG Wheel Data
    const sdgs = [
      { num: 1, name: "No Poverty", color: "#e5243b", desc: "End poverty in all its forms everywhere. NEIKI aligns with this goal through our extensive livelihood and income-generation programs, focusing on uplifting the most vulnerable and marginalized communities." },
      { num: 2, name: "Zero Hunger", color: "#dda63a", desc: "End hunger, achieve food security and improved nutrition. We actively organize food distribution drives and long-term agricultural support to combat malnutrition." },
      { num: 3, name: "Good Health", color: "#4c9f38", desc: "Ensure healthy lives and promote well-being for all. We conduct medical camps, awareness campaigns, and establish local clinics in underserved areas." },
      { num: 4, name: "Quality Education", color: "#c5192d", desc: "Ensure inclusive and equitable quality education. NEIKI provides scholarships, vocational skills, and builds educational infrastructure to empower the youth." },
      { num: 5, name: "Gender Equality", color: "#ff3a21", desc: "Achieve gender equality and empower all women and girls. Our inclusive policies ensure equal opportunities and specialized programs for women's empowerment." },
      { num: 6, name: "Clean Water", color: "#26bde2", desc: "Ensure availability and sustainable management of water. We build solar-powered wells and water filtration systems to guarantee clean drinking water." },
      { num: 7, name: "Clean Energy", color: "#fcc30b", desc: "Ensure access to affordable, reliable, sustainable and modern energy. We integrate solar technology into our infrastructure projects." },
      { num: 8, name: "Economic Growth", color: "#a21942", desc: "Promote sustained, inclusive and sustainable economic growth. We focus on skill development and entrepreneurship to boost local economies." },
      { num: 9, name: "Industry & Innovation", color: "#fd6925", desc: "Build resilient infrastructure and foster innovation. We employ modern, innovative approaches to community building and resource management." },
      { num: 10, name: "Reduced Inequalities", color: "#dd1367", desc: "Reduce inequality within and among countries. Our core value of inclusiveness ensures our programs target those most commonly left behind." },
      { num: 11, name: "Sustainable Cities", color: "#fd9d24", desc: "Make cities and human settlements inclusive, safe, resilient and sustainable. We advocate for and build sustainable community centers." },
      { num: 12, name: "Responsible Consumption", color: "#bf8b2e", desc: "Ensure sustainable consumption and production patterns. We promote resource efficiency in all our projects." },
      { num: 13, name: "Climate Action", color: "#3f7e44", desc: "Take urgent action to combat climate change. NEIKI's sustainability focus ensures our interventions are environmentally conscious." },
      { num: 14, name: "Life Below Water", color: "#0a97d9", desc: "Conserve and sustainably use the oceans, seas and marine resources. We promote environmental stewardship in coastal program areas." },
      { num: 15, name: "Life on Land", color: "#56c02b", desc: "Protect, restore and promote sustainable use of terrestrial ecosystems. We engage in tree-planting and environmental conservation drives." },
      { num: 16, name: "Peace & Justice", color: "#00689d", desc: "Promote peaceful and inclusive societies for sustainable development. We promote civic responsibility and ethical, transparent governance." },
      { num: 17, name: "Partnerships", color: "#19486a", desc: "Strengthen the means of implementation and revitalize the global partnership. Collaboration is one of our strategic objectives to achieve large-scale impact." }
    ];

    const wheelGroup = document.getElementById('sdg-wheel-group');
    const badge = document.getElementById('sdg-badge');
    const title = document.getElementById('sdg-info-title');
    const desc = document.getElementById('sdg-info-desc');
    
    const cx = 250;
    const cy = 250;
    const radius = 240;
    const innerRadius = 140;
    const numSlices = 17;
    const sliceAngle = 360 / numSlices;
    const gap = 1; // 1 degree gap between slices

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    }

    function describeArc(x, y, innerR, outerR, startAngle, endAngle){
        var start = polarToCartesian(x, y, outerR, endAngle);
        var end = polarToCartesian(x, y, outerR, startAngle);
        var innerStart = polarToCartesian(x, y, innerR, endAngle);
        var innerEnd = polarToCartesian(x, y, innerR, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y, 
            "A", outerR, outerR, 0, largeArcFlag, 0, end.x, end.y,
            "L", innerEnd.x, innerEnd.y,
            "A", innerR, innerR, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
            "Z"
        ].join(" ");
        return d;
    }

    let currentIndex = 0;
    let autoRotateInterval;

    function activateSlice(index) {
        // Reset all
        document.querySelectorAll('.sdg-slice-group').forEach(g => {
            const path = g.querySelector('path');
            if(path) {
                path.classList.remove('active');
                path.style.transform = 'scale(1)';
            }
        });

        // Activate new
        const activeGroup = document.getElementById(`sdg-slice-${index}`);
        if(activeGroup) {
            const activePath = activeGroup.querySelector('path');
            if(activePath) {
                activePath.classList.add('active');
                activePath.style.transform = 'scale(1.05)';
            }
        }

        // Update Panel
        const sdg = sdgs[index];
        if (badge && title && desc) {
            badge.innerText = sdg.num;
            badge.style.backgroundColor = sdg.color;
            title.innerText = sdg.name;
            title.style.color = sdg.color;
            desc.innerText = sdg.desc;
        }

        // Rotate Wheel to point to the panel (right side = 90 degrees)
        const startAngle = index * sliceAngle;
        const midAngle = startAngle + (sliceAngle / 2);
        let rotationTarget = 90 - midAngle;
        
        if(wheelGroup) {
            wheelGroup.style.transform = `rotate(${rotationTarget}deg)`;
        }
        
        currentIndex = index;
    }

    function startAutoRotation() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % numSlices;
            activateSlice(nextIndex);
        }, 10000); // 10 seconds
    }

    // Generate Wheel
    if(wheelGroup) {
        sdgs.forEach((sdg, index) => {
          const startAngle = index * sliceAngle;
          const endAngle = startAngle + sliceAngle - gap;
          
          const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
          group.setAttribute("id", `sdg-slice-${index}`);
          group.setAttribute("class", "sdg-slice-group");
          group.style.cursor = "pointer";
          
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", describeArc(cx, cy, innerRadius, radius, startAngle, endAngle));
          path.setAttribute("fill", sdg.color);
          path.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          path.style.transformOrigin = "250px 250px";
          
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          const midAngle = startAngle + (sliceAngle - gap) / 2;
          const textPos = polarToCartesian(cx, cy, (innerRadius + radius) / 2, midAngle);
          
          text.setAttribute("x", textPos.x);
          text.setAttribute("y", textPos.y + 6);
          text.setAttribute("fill", "white");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("font-family", "sans-serif");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("font-size", "22px");
          text.setAttribute("filter", "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))");
          text.textContent = sdg.num;
          text.setAttribute("transform", `rotate(${midAngle}, ${textPos.x}, ${textPos.y})`);

          group.appendChild(path);
          group.appendChild(text);

          group.addEventListener('mouseenter', () => {
            activateSlice(index);
            clearInterval(autoRotateInterval);
          });
          group.addEventListener('click', () => {
            activateSlice(index);
            clearInterval(autoRotateInterval);
          });
          
          group.addEventListener('mouseleave', () => {
            startAutoRotation();
          });

          wheelGroup.appendChild(group);
        });

        activateSlice(0);
        startAutoRotation();
    }

document.addEventListener('DOMContentLoaded', () => {
      const track = document.getElementById('giTrack');
      const slides = document.querySelectorAll('.gi-slide');
      const dotsContainer = document.getElementById('giDots');
      const carouselContainer = document.getElementById('giCarousel');
      
      let currentIndex = 0;
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let autoSlideInterval;
      
      if (!track || slides.length === 0) return;

      slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('gi-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
      const dots = document.querySelectorAll('.gi-dot');

      function updateDots() {
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }

      function goToSlide(index) {
        if (index < 0) index = 0;
        if (index > slides.length - 1) index = slides.length - 1;
        currentIndex = index;
        track.style.transition = 'transform 0.3s ease-out';
        if (window.innerWidth >= 769) {
          track.style.transform = `translateX(0)`;
        } else {
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        updateDots();
      }

      function nextSlide() {
        if (window.innerWidth >= 769) return;
        if (currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(0);
        }
      }

      function startAutoSlide() {
        if (window.innerWidth >= 769) {
          if (dotsContainer) dotsContainer.style.display = 'none';
          return;
        } else {
          if (dotsContainer) dotsContainer.style.display = 'flex';
        }
        autoSlideInterval = setInterval(nextSlide, 4000);
      }

      function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      }

      carouselContainer.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 769) return;
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        track.style.transition = 'none';
        clearInterval(autoSlideInterval);
      }, {passive: true});

      carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
      }, {passive: true});

      carouselContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentIndex > 0) goToSlide(currentIndex - 1);
          else if (diff < 0 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
          else goToSlide(currentIndex);
        } else {
          goToSlide(currentIndex);
        }
        startAutoSlide();
      });
      
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 901) {
          clearInterval(autoSlideInterval);
          if (dotsContainer) dotsContainer.style.display = 'none';
          track.style.transform = 'none';
        } else {
          goToSlide(currentIndex);
          resetAutoSlide();
        }
      });

      startAutoSlide();
    });

// Mega Menu functionality

    const navLinks = document.querySelectorAll('.nav-link');

    const megaMenus = document.querySelectorAll('.mega-menu');



    navLinks.forEach(link => {

      link.addEventListener('click', (e) => {

        e.preventDefault();

        const targetId = link.getAttribute('data-target');

        const targetMenu = document.getElementById(targetId);

        

        // close others

        megaMenus.forEach(menu => {

          if (menu !== targetMenu) menu.classList.remove('active');

        });

        navLinks.forEach(nav => {

          if (nav !== link) nav.querySelector('.arrow').innerText = '▼';

        });



        if (targetMenu) {

          targetMenu.classList.toggle('active');

          const arrow = link.querySelector('.arrow');

          if (targetMenu.classList.contains('active')) {

            arrow.innerText = '▼'; // Up arrow

          } else {

            arrow.innerText = '▼'; // Down arrow

          }

        }

      });

    });



    // Close menu when clicking outside

    document.addEventListener('click', (e) => {

      if (!e.target.closest('.site-header')) {

        megaMenus.forEach(menu => menu.classList.remove('active'));

        navLinks.forEach(nav => nav.querySelector('.arrow').innerText = '▼');

      }

    });



    // Carousel functionality

    const slides = document.querySelectorAll('.hero-slide');

    const dots = document.querySelectorAll('.carousel-controls .dot');

    const upArrow = document.querySelector('.up-arrow');

    const downArrow = document.querySelector('.down-arrow');

    let currentSlide = 0;

    let slideInterval;



    function showSlide(index) {

      if (!slides.length) return;

      slides[currentSlide].classList.remove('active');

      if(dots[currentSlide]) dots[currentSlide].classList.remove('active');

      

      currentSlide = (index + slides.length) % slides.length;

      

      slides[currentSlide].classList.add('active');

      if(dots[currentSlide]) dots[currentSlide].classList.add('active');

    }



    function nextSlide() { showSlide(currentSlide + 1); }

    function prevSlide() { showSlide(currentSlide - 1); }



    function startSlide() {

      slideInterval = setInterval(nextSlide, 5000);

    }



    let isHovering = false;

    function resetSlide() {

      clearInterval(slideInterval);
      if (!isHovering) {
        startSlide();
      }

    }



    if (upArrow && downArrow) {

      upArrow.addEventListener('click', () => { prevSlide(); resetSlide(); });

      downArrow.addEventListener('click', () => { nextSlide(); resetSlide(); });

    }

    

    dots.forEach((dot, idx) => {

      dot.addEventListener('click', () => { showSlide(idx); resetSlide(); });

    });



    startSlide();

    // Pause slider on hover
    const heroContainerElement = document.querySelector('.hero-wrapper');
    if (heroContainerElement) {
      heroContainerElement.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(slideInterval);
      });
      heroContainerElement.addEventListener('mouseleave', () => {
        isHovering = false;
        resetSlide();
      });
    }