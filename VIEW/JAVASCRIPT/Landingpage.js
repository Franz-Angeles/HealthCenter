// Drop-up menu functionality
document.addEventListener("DOMContentLoaded", function () {
  // Drop-up menu for mobile
  const toggle = document.getElementById("dropup-toggle");
  const close = document.getElementById("close");
  const open = document.getElementById("open");

  if (toggle && close && open) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        close.classList.remove("hidden");
        open.classList.add("hidden");
      } else {
        close.classList.add("hidden");
        open.classList.remove("hidden");
      }
    });
  }

  // Desktop profile dropdown functionality
  const profileBtn = document.getElementById("profileDropdownBtn");
  const dropdownContent = document.getElementById("profileDropdownContent");

  if (profileBtn && dropdownContent) {
    // Toggle dropdown on click
    profileBtn.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownContent.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !profileBtn.contains(e.target) &&
        !dropdownContent.contains(e.target)
      ) {
        dropdownContent.classList.add("hidden");
      }
    });
  }

  // Mobile profile dropdown functionality
  const mobileProfileBtn = document.getElementById("mobileProfileBtn");
  const mobileProfileContent = document.getElementById("mobileProfileContent");

  if (mobileProfileBtn && mobileProfileContent) {
    // Toggle dropdown on click
    mobileProfileBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent the click from closing the mobile menu
      mobileProfileContent.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !mobileProfileBtn.contains(e.target) &&
        !mobileProfileContent.contains(e.target)
      ) {
        mobileProfileContent.classList.add("hidden");
      }
    });
  }
});
