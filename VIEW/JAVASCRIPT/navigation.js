// Common Navigation Management for all pages
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu dropdown functionality
  const button = document.getElementById("menu-button");
  const dropdown = document.getElementById("dropdown-menu");

  let isOpen = false;

  if (button && dropdown) {
    button.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        dropdown.classList.remove(
          "scale-y-0",
          "opacity-0",
          "pointer-events-none"
        );
        dropdown.classList.add(
          "scale-y-100",
          "opacity-100",
          "pointer-events-auto"
        );
      } else {
        dropdown.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
        dropdown.classList.remove(
          "scale-y-100",
          "opacity-100",
          "pointer-events-auto"
        );
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !button.contains(e.target) &&
        !dropdown.contains(e.target) &&
        isOpen
      ) {
        dropdown.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
        dropdown.classList.remove(
          "scale-y-100",
          "opacity-100",
          "pointer-events-auto"
        );
        isOpen = false;
      }
    });
  }

  // Navigation functionality
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const dropdownLinks = document.querySelectorAll(".dropdown-link");

  // Function to remove active class from all links
  function removeActiveFromAll() {
    sidebarLinks.forEach((link) => link.classList.remove("active"));
    dropdownLinks.forEach((link) => link.classList.remove("active"));
  }

  // Function to set active link based on current page
  function setActiveLink() {
    const currentPage = window.location.pathname;
    const currentPageName = currentPage.split("/").pop();

    // First, remove active from all links
    removeActiveFromAll();

    // Set active for sidebar links
    sidebarLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref) {
        const linkPageName = linkHref.split("/").pop();
        if (linkPageName === currentPageName) {
          link.classList.add("active");
        }
      }
    });

    // Set active for dropdown links
    dropdownLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref) {
        const linkPageName = linkHref.split("/").pop();
        if (linkPageName === currentPageName) {
          link.classList.add("active");
        }
      }
    });
  }

  // Set active link on page load
  setActiveLink();

  // Add click event listeners to sidebar links
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Allow navigation to proceed naturally
      removeActiveFromAll();
      this.classList.add("active");
    });
  });

  // Add click event listeners to dropdown links
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Allow navigation to proceed naturally
      removeActiveFromAll();
      this.classList.add("active");

      // Close the dropdown after selection on mobile
      if (dropdown) {
        dropdown.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
        dropdown.classList.remove(
          "scale-y-100",
          "opacity-100",
          "pointer-events-auto"
        );
        isOpen = false;
      }
    });
  });

  // Add hover effects for better UX
  sidebarLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateX(4px)";
      }
    });

    link.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateX(0)";
      }
    });
  });

  // Handle Services link (placeholder functionality)
  const servicesLinks = document.querySelectorAll('a[href="#"]');
  servicesLinks.forEach((link) => {
    if (link.textContent.trim() === "Services") {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        // You can add custom functionality here for the Services link
        console.log("Services section - Add custom functionality here");

        // Example: Show a tooltip or modal
        const tooltip = document.createElement("div");
        tooltip.textContent = "Services section coming soon!";
        tooltip.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #3b82f6;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          z-index: 1000;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(tooltip);

        setTimeout(() => {
          tooltip.remove();
        }, 2000);
      });
    }
  });
});
