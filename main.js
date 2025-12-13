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
});
