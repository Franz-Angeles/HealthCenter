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

  // Change Password Toggle Functionality
  const toggleChangePasswordBtn = document.getElementById(
    "toggleChangePassword"
  );
  const changePasswordForm = document.getElementById("changePasswordForm");
  const cancelChangePasswordBtn = document.getElementById(
    "cancelChangePassword"
  );
  const saveChangePasswordBtn = document.getElementById("saveChangePassword");

  if (toggleChangePasswordBtn && changePasswordForm) {
    toggleChangePasswordBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (changePasswordForm.classList.contains("hidden")) {
        // Show the form
        changePasswordForm.classList.remove("hidden");
        this.textContent = "Hide Form";
        this.classList.remove(
          "text-blue-600",
          "bg-blue-50",
          "border-blue-200",
          "hover:bg-blue-100"
        );
        this.classList.add(
          "text-gray-600",
          "bg-gray-50",
          "border-gray-200",
          "hover:bg-gray-100"
        );
      } else {
        // Hide the form
        changePasswordForm.classList.add("hidden");
        this.textContent = "Change Password";
        this.classList.remove(
          "text-gray-600",
          "bg-gray-50",
          "border-gray-200",
          "hover:bg-gray-100"
        );
        this.classList.add(
          "text-blue-600",
          "bg-blue-50",
          "border-blue-200",
          "hover:bg-blue-100"
        );

        // Clear form fields when hiding
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
      }
    });
  }

  // Cancel Change Password
  if (cancelChangePasswordBtn) {
    cancelChangePasswordBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Hide the form
      changePasswordForm.classList.add("hidden");
      toggleChangePasswordBtn.textContent = "Change Password";
      toggleChangePasswordBtn.classList.remove(
        "text-gray-600",
        "bg-gray-50",
        "border-gray-200",
        "hover:bg-gray-100"
      );
      toggleChangePasswordBtn.classList.add(
        "text-blue-600",
        "bg-blue-50",
        "border-blue-200",
        "hover:bg-blue-100"
      );

      // Clear form fields
      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";

      // Clear any validation errors
      hideError(document.getElementById("currentPassword"));
      hideError(document.getElementById("newPassword"));
      hideError(document.getElementById("confirmPassword"));
    });
  }

  // Save Change Password
  if (saveChangePasswordBtn) {
    saveChangePasswordBtn.addEventListener("click", function (e) {
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
        showSuccessMessage("Password changed successfully!");

        // Hide the form and reset button
        changePasswordForm.classList.add("hidden");
        toggleChangePasswordBtn.textContent = "Change Password";
        toggleChangePasswordBtn.classList.remove(
          "text-gray-600",
          "bg-gray-50",
          "border-gray-200",
          "hover:bg-gray-100"
        );
        toggleChangePasswordBtn.classList.add(
          "text-blue-600",
          "bg-blue-50",
          "border-blue-200",
          "hover:bg-blue-100"
        );

        // Clear form fields
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      }
    });
  }

  // Profile Edit Toggle Functionality
  const toggleEditProfileBtn = document.getElementById("toggleEditProfile");
  const profileDisplayMode = document.getElementById("profileDisplayMode");
  const profileEditMode = document.getElementById("profileEditMode");
  const cancelEditProfileBtn = document.getElementById("cancelEditProfile");
  const saveProfileChangesBtn = document.getElementById("saveProfileChanges");

  if (toggleEditProfileBtn && profileDisplayMode && profileEditMode) {
    toggleEditProfileBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.textContent === "Edit Information") {
        // Switch to edit mode
        profileDisplayMode.classList.add("hidden");
        profileEditMode.classList.remove("hidden");
        this.textContent = "Cancel Edit";
        this.classList.remove(
          "text-blue-600",
          "bg-blue-50",
          "border-blue-200",
          "hover:bg-blue-100"
        );
        this.classList.add(
          "text-gray-600",
          "bg-gray-50",
          "border-gray-200",
          "hover:bg-gray-100"
        );
      } else if (this.textContent === "Cancel Edit") {
        // Switch back to display mode
        profileEditMode.classList.add("hidden");
        profileDisplayMode.classList.remove("hidden");
        this.textContent = "Edit Information";
        this.classList.remove(
          "text-gray-600",
          "bg-gray-50",
          "border-gray-200",
          "hover:bg-gray-100"
        );
        this.classList.add(
          "text-blue-600",
          "bg-blue-50",
          "border-blue-200",
          "hover:bg-blue-100"
        );

        // Reset form to original values
        resetProfileForm();
      }
    });
  }

  // Cancel Edit Profile
  if (cancelEditProfileBtn) {
    cancelEditProfileBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Switch back to display mode
      profileEditMode.classList.add("hidden");
      profileDisplayMode.classList.remove("hidden");
      toggleEditProfileBtn.textContent = "Edit Information";
      toggleEditProfileBtn.classList.remove(
        "text-gray-600",
        "bg-gray-50",
        "border-gray-200",
        "hover:bg-gray-100"
      );
      toggleEditProfileBtn.classList.add(
        "text-blue-600",
        "bg-blue-50",
        "border-blue-200",
        "hover:bg-blue-100"
      );

      // Reset form to original values
      resetProfileForm();
    });
  }

  // Save Profile Changes
  if (saveProfileChangesBtn) {
    saveProfileChangesBtn.addEventListener("click", function (e) {
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
        // Update display values with form values
        updateDisplayValues();

        // Switch back to display mode
        profileEditMode.classList.add("hidden");
        profileDisplayMode.classList.remove("hidden");
        toggleEditProfileBtn.textContent = "Edit Information";
        toggleEditProfileBtn.classList.remove(
          "text-gray-600",
          "bg-gray-50",
          "border-gray-200",
          "hover:bg-gray-100"
        );
        toggleEditProfileBtn.classList.add(
          "text-blue-600",
          "bg-blue-50",
          "border-blue-200",
          "hover:bg-blue-100"
        );

        // Display success message
        showSuccessMessage("Personal information updated successfully!");
      }
    });
  }

  // Helper function to reset profile form to original values
  function resetProfileForm() {
    document.getElementById("firstName").value = "John";
    document.getElementById("lastName").value = "Doe";
    document.getElementById("email").value = "john.doe@example.com";
    document.getElementById("phone").value = "+63 912 345 6789";
    document.getElementById("birthdate").value = "1990-01-15";
    document.getElementById("gender").value = "male";
    document.getElementById("address").value =
      "123 Main Street, Barangay Bucal, Calamba City, Laguna";
    document.getElementById("emergencyContactName").value = "Jane Doe";
    document.getElementById("emergencyContactPhone").value = "+63 945 678 9012";

    // Clear any validation errors
    hideError(document.getElementById("email"));
    hideError(document.getElementById("phone"));
  }

  // Helper function to update display values
  function updateDisplayValues() {
    document.getElementById("displayFirstName").textContent =
      document.getElementById("firstName").value;
    document.getElementById("displayLastName").textContent =
      document.getElementById("lastName").value;
    document.getElementById("displayEmail").textContent =
      document.getElementById("email").value;
    document.getElementById("displayPhone").textContent =
      document.getElementById("phone").value;

    // Format date for display
    const birthdateValue = document.getElementById("birthdate").value;
    if (birthdateValue) {
      const date = new Date(birthdateValue);
      const options = { year: "numeric", month: "long", day: "numeric" };
      document.getElementById("displayBirthdate").textContent =
        date.toLocaleDateString("en-US", options);
    }

    // Format gender for display
    const genderSelect = document.getElementById("gender");
    document.getElementById("displayGender").textContent =
      genderSelect.options[genderSelect.selectedIndex].text;

    document.getElementById("displayAddress").textContent =
      document.getElementById("address").value;
    document.getElementById("displayEmergencyName").textContent =
      document.getElementById("emergencyContactName").value;
    document.getElementById("displayEmergencyPhone").textContent =
      document.getElementById("emergencyContactPhone").value;
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
