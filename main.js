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
  
  const themes = [
    {
      image: "images/light-shadow-1.jpg",
      title: "Light & Shadow",
      caption: "Exploring contrast, silhouettes, and subtle gradients of light."
    },
    {
      image: "images/geometry-1.jpg",
      title: "Lines & Geometry",
      caption: "Architectural forms, repeating patterns, and strong directional lines."
    },
    {
      image: "images/everyday-1.jpg",
      title: "Everyday Stories",
      caption: "Scenes from daily life that hint at small narratives and emotions."
    },
    {
      image: "images/texture-1.jpg",
      title: "Texture & Detail",
      caption: "Close-up observations that highlight surfaces, materials, and touch."
    },
    {
      image: "images/flex-1.jpg",
      title: "[Your Flex Theme]",
      caption: "[Description of your chosen flex theme.]"
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
        // Update content
        carouselImage.src = themes[index].image;
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

  // Auto-play carousel every 4 seconds
  if (carouselImage) {
    autoplayInterval = setInterval(nextSlide, 4000);

    // Click indicators to change manually
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel(index);
        // Reset autoplay
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 4000);
      });
    });

    // Pause on hover
    const heroCard = document.getElementById("hero-carousel");
    if (heroCard) {
      heroCard.addEventListener("mouseenter", () => {
        clearInterval(autoplayInterval);
      });
      heroCard.addEventListener("mouseleave", () => {
        autoplayInterval = setInterval(nextSlide, 4000);
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
