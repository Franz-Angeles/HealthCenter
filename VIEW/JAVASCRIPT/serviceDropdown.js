// Services dropdown functionality for service pages
document.addEventListener("DOMContentLoaded", function () {
  // Desktop services dropdown functionality
  const servicesBtn = document.getElementById("servicesDropdownBtn");
  const servicesDropdownContent = document.getElementById(
    "servicesDropdownContent"
  );

  if (servicesBtn && servicesDropdownContent) {
    // Toggle dropdown on click
    servicesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      servicesDropdownContent.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !servicesBtn.contains(e.target) &&
        !servicesDropdownContent.contains(e.target)
      ) {
        servicesDropdownContent.classList.add("hidden");
      }
    });
  }

  // Mobile services dropdown in sidebar
  const mobileServicesBtn = document.getElementById("mobileServicesBtn");
  const mobileServicesContent = document.getElementById(
    "mobileServicesContent"
  );
  const servicesArrow = document.getElementById("servicesArrow");

  if (mobileServicesBtn && mobileServicesContent) {
    mobileServicesBtn.addEventListener("click", function () {
      mobileServicesContent.classList.toggle("hidden");
      servicesArrow.classList.toggle("rotate-180");
    });
  }
});
