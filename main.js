// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
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
