// Module Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all module navigation toggle buttons
  const moduleNavButtons = document.querySelectorAll(".module-nav-toggle");

  // Add click event listener to each button
  moduleNavButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle the dropdown visibility
      const dropdown = this.nextElementSibling;

      // Close all other dropdowns first
      document.querySelectorAll(".module-nav-dropdown").forEach((drop) => {
        if (drop !== dropdown && drop.classList.contains("flex")) {
          drop.classList.remove("flex");
          drop.classList.add("hidden");
        }
      });

      // Toggle the current dropdown
      if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("flex");

        // Force reflow
        dropdown.offsetHeight;

        // Animate in
        dropdown.classList.add("opacity-100");
        dropdown.classList.remove("opacity-0");
        dropdown.classList.remove("scale-95");
        dropdown.classList.add("scale-100");
      } else {
        // Animate out
        dropdown.classList.remove("opacity-100");
        dropdown.classList.add("opacity-0");
        dropdown.classList.remove("scale-100");
        dropdown.classList.add("scale-95");

        // Hide after animation
        setTimeout(() => {
          dropdown.classList.remove("flex");
          dropdown.classList.add("hidden");
        }, 200);
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".module-nav-container")) {
      document.querySelectorAll(".module-nav-dropdown").forEach((dropdown) => {
        if (dropdown.classList.contains("flex")) {
          // Animate out
          dropdown.classList.remove("opacity-100");
          dropdown.classList.add("opacity-0");
          dropdown.classList.remove("scale-100");
          dropdown.classList.add("scale-95");

          // Hide after animation
          setTimeout(() => {
            dropdown.classList.remove("flex");
            dropdown.classList.add("hidden");
          }, 200);
        }
      });
    }
  });
});
