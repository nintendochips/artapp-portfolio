// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Hero Carousel - Auto-rotating themes
  const carouselImage = document.getElementById("carousel-image");
  const carouselTitle = document.getElementById("carousel-title");
  const carouselCaption = document.getElementById("carousel-caption");
  const indicators = document.querySelectorAll(".indicator");
  
  // Use placeholder SVGs if images don't exist yet
  const themes = [
    {
      image: "images/light-shadow-1.jpg",
      title: "Light & Shadow",
      caption: "Exploring contrast, silhouettes, and subtle gradients of light.",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23374151' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23fff' text-anchor='middle' dy='.3em'%3ELight %26 Shadow%3C/text%3E%3C/svg%3E"
    },
    {
      image: "images/geometry-1.jpg",
      title: "Lines & Geometry",
      caption: "Architectural forms, repeating patterns, and strong directional lines.",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23475569' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23fff' text-anchor='middle' dy='.3em'%3ELines %26 Geometry%3C/text%3E%3C/svg%3E"
    },
    {
      image: "images/everyday-1.jpg",
      title: "Everyday Stories",
      caption: "Scenes from daily life that hint at small narratives and emotions.",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23581c87' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23fff' text-anchor='middle' dy='.3em'%3EEveryday Stories%3C/text%3E%3C/svg%3E"
    },
    {
      image: "images/texture-1.jpg",
      title: "Texture & Detail",
      caption: "Close-up observations that highlight surfaces, materials, and touch.",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23831843' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23fff' text-anchor='middle' dy='.3em'%3ETexture %26 Detail%3C/text%3E%3C/svg%3E"
    },
    {
      image: "images/flex-1.jpg",
      title: "[Your Flex Theme]",
      caption: "[Description of your chosen flex theme.]",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23064e3b' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23fff' text-anchor='middle' dy='.3em'%3EFlex Theme%3C/text%3E%3C/svg%3E"
    }
  ];

  let currentIndex = 0;
  let autoplayInterval;

  function updateCarousel(index) {
    // Fade out
    if (carouselImage && carouselTitle && carouselCaption) {
      carouselImage.style.opacity = "0";
      carouselTitle.style.opacity = "0";
      carouselCaption.style.opacity = "0";

      setTimeout(() => {
        // Try to load real image, fallback to placeholder if it fails
        const img = new Image();
        img.onload = function() {
          carouselImage.src = themes[index].image;
        };
        img.onerror = function() {
          carouselImage.src = themes[index].fallback;
        };
        img.src = themes[index].image;

        carouselTitle.textContent = themes[index].title;
        carouselCaption.textContent = themes[index].caption;

        // Fade in
        carouselImage.style.opacity = "1";
        carouselTitle.style.opacity = "1";
        carouselCaption.style.opacity = "1";
      }, 300);

      // Update indicators
      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % themes.length;
    updateCarousel(currentIndex);
  }

  // Auto-play carousel every 3 seconds (faster)
  if (carouselImage) {
    autoplayInterval = setInterval(nextSlide, 3000);

    // Click indicators to change manually
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel(index);
        // Reset autoplay
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 3000);
      });
    });

    // Pause on hover
    const heroCard = document.getElementById("hero-carousel");
    if (heroCard) {
      heroCard.addEventListener("mouseenter", () => {
        clearInterval(autoplayInterval);
      });
      heroCard.addEventListener("mouseleave", () => {
        autoplayInterval = setInterval(nextSlide, 3000);
      });
    }
  }

  // Theme filter on gallery page
  const buttons = document.querySelectorAll(".filter-btn");
  const sections = document.querySelectorAll(".theme-section");

  if (buttons.length && sections.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme");

        // active button style
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // show/hide sections
        sections.forEach((section) => {
          const sectionTheme = section.getAttribute("data-theme-section");
          if (theme === "all" || theme === sectionTheme) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });
      });
    });
  }

  // Smooth scroll to theme when coming from home page
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Add fade-in animation on scroll (optional enhancement)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe photo cards for animation
  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
