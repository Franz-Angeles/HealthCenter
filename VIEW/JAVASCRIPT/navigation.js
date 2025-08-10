// Common Navigation Management for all pages
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu dropdown functionality
  const button = document.getElementById("menu-button");
  const dropdown = document.getElementById("dropdown-menu");

  // Initialize services submenus (hide them initially)
  const servicesSubmenus = document.querySelectorAll(".pl-4.bg-gray-50");
  servicesSubmenus.forEach((submenu) => {
    submenu.style.display = "none";
  });

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
  // Skip this section if we're in a service page that has its own services dropdown
  if (
    !document.getElementById("servicesDropdown") &&
    !document.getElementById("mobileServicesBtn")
  ) {
    const servicesLinks = document.querySelectorAll('a[href="#"]');
    servicesLinks.forEach((link) => {
      if (link.textContent.trim().includes("Services")) {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          // For mobile view, toggle submenu visibility
          if (window.innerWidth < 768) {
            const nextElement = this.nextElementSibling;
            if (nextElement && nextElement.classList.contains("pl-4")) {
              if (
                nextElement.style.display === "none" ||
                !nextElement.style.display
              ) {
                nextElement.style.display = "block";
                this.classList.add("text-blue-600");
              } else {
                nextElement.style.display = "none";
                this.classList.remove("text-blue-600");
              }
            }
          }
        });
      }
    });
  }
});
