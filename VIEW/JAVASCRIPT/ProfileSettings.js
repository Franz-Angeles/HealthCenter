document.addEventListener("DOMContentLoaded", function () {
  // Tab Navigation
  const tabs = document.querySelectorAll(".mb-8 ul a");
  const tabContents = document.querySelectorAll(
    "#personal-info, #security, #notifications, #preferences"
  );

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all tabs
      tabs.forEach((t) => {
        t.classList.remove("border-blue-600", "text-blue-600");
        t.classList.add(
          "border-transparent",
          "hover:text-gray-600",
          "hover:border-gray-300"
        );
      });

      // Add active class to clicked tab
      this.classList.add("border-blue-600", "text-blue-600");
      this.classList.remove(
        "border-transparent",
        "hover:text-gray-600",
        "hover:border-gray-300"
      );

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });

      // Show the selected tab content
      const target = this.getAttribute("href").substring(1);
      document.getElementById(target).classList.remove("hidden");
    });
  });

  // Profile Dropdown (Desktop)
  const profileDropdownBtn = document.getElementById("profileDropdownBtn");
  const profileDropdownContent = document.getElementById(
    "profileDropdownContent"
  );

  if (profileDropdownBtn && profileDropdownContent) {
    profileDropdownBtn.addEventListener("click", function (e) {
      e.preventDefault();
      profileDropdownContent.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !profileDropdownBtn.contains(e.target) &&
        !profileDropdownContent.contains(e.target)
      ) {
        profileDropdownContent.classList.add("hidden");
      }
    });
  }

  // Mobile Menu Toggle
  const menuButton = document.getElementById("menu-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (menuButton && dropdownMenu) {
    menuButton.addEventListener("click", function () {
      if (dropdownMenu.classList.contains("scale-y-0")) {
        dropdownMenu.classList.remove(
          "scale-y-0",
          "opacity-0",
          "pointer-events-none"
        );
        dropdownMenu.classList.add(
          "scale-y-100",
          "opacity-100",
          "pointer-events-auto"
        );
      } else {
        dropdownMenu.classList.add(
          "scale-y-0",
          "opacity-0",
          "pointer-events-none"
        );
        dropdownMenu.classList.remove(
          "scale-y-100",
          "opacity-100",
          "pointer-events-auto"
        );
      }
    });
  }

  // Mobile Profile Dropdown
  const mobileProfileBtn = document.getElementById("mobile-profile-btn");
  const mobileProfileContent = document.getElementById(
    "mobile-profile-content"
  );

  if (mobileProfileBtn && mobileProfileContent) {
    mobileProfileBtn.addEventListener("click", function (e) {
      e.preventDefault();
      mobileProfileContent.classList.toggle("hidden");
    });
  }

  // Form Validation
  const personalInfoForm = document.querySelector("#personal-info form");
  if (personalInfoForm) {
    personalInfoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");

      let isValid = true;

      // Email validation
      if (email && !validateEmail(email.value)) {
        showError(email, "Please enter a valid email address");
        isValid = false;
      } else if (email) {
        hideError(email);
      }

      // Phone validation
      if (phone && !validatePhone(phone.value)) {
        showError(phone, "Please enter a valid phone number");
        isValid = false;
      } else if (phone) {
        hideError(phone);
      }

      if (isValid) {
        // Display success message
        showSuccessMessage("Personal information updated successfully!");
      }
    });
  }

  // Password change validation
  const securityForm = document.querySelector("#security form");
  if (securityForm) {
    securityForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const currentPassword = document.getElementById("currentPassword");
      const newPassword = document.getElementById("newPassword");
      const confirmPassword = document.getElementById("confirmPassword");

      let isValid = true;

      // Check if fields are empty
      if (currentPassword && currentPassword.value.trim() === "") {
        showError(currentPassword, "Please enter your current password");
        isValid = false;
      } else if (currentPassword) {
        hideError(currentPassword);
      }

      if (newPassword && newPassword.value.trim() === "") {
        showError(newPassword, "Please enter a new password");
        isValid = false;
      } else if (newPassword) {
        hideError(newPassword);
      }

      if (confirmPassword && confirmPassword.value.trim() === "") {
        showError(confirmPassword, "Please confirm your new password");
        isValid = false;
      } else if (confirmPassword) {
        hideError(confirmPassword);
      }

      // Check if passwords match
      if (
        newPassword &&
        confirmPassword &&
        newPassword.value !== confirmPassword.value
      ) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
      }

      if (isValid) {
        // Display success message
        showSuccessMessage("Security settings updated successfully!");
      }
    });
  }

  // Utility functions
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    // Basic validation for Philippine phone numbers
    const re = /^(\+63|0)[\d]{10,11}$/;
    return re.test(String(phone).replace(/\s+/g, ""));
  }

  function showError(input, message) {
    const formGroup = input.closest("div");

    // Remove any existing error message
    const existingError = formGroup.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add error class to input
    input.classList.add("border-red-500");

    // Create error message element
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message text-red-500 text-sm mt-1";
    errorDiv.textContent = message;

    // Insert error message after input
    formGroup.appendChild(errorDiv);
  }

  function hideError(input) {
    const formGroup = input.closest("div");

    // Remove error class from input
    input.classList.remove("border-red-500");

    // Remove error message if exists
    const errorMessage = formGroup.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement("div");
    successDiv.className =
      "fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded transition-opacity duration-500 ease-in-out opacity-100";
    successDiv.innerHTML = `
      <div class="flex items-center">
        <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
        <button class="ml-auto" onclick="this.parentElement.parentElement.remove();">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    // Add to document
    document.body.appendChild(successDiv);

    // Remove after 5 seconds
    setTimeout(() => {
      successDiv.classList.replace("opacity-100", "opacity-0");
      setTimeout(() => {
        successDiv.remove();
      }, 500);
    }, 5000);
  }

  // Generate days for the day dropdown in date of birth field
  const daySelect = document.getElementById("day");
  if (daySelect) {
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      daySelect.appendChild(option);
    }
  }

  // Generate years for the year dropdown in date of birth field
  const yearSelect = document.getElementById("year");
  if (yearSelect) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      yearSelect.appendChild(option);
    }
  }
});
