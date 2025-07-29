// Dashboard-specific functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard script loaded"); // Debug log

  // Check if buttons exist
  const openModalBtn = document.getElementById("openModal");
  const openModalDesktopBtn = document.getElementById("openModalDesktop");

  console.log("Mobile button found:", openModalBtn);
  console.log("Desktop button found:", openModalDesktopBtn);

  if (openModalBtn) {
    console.log("Mobile button styles:", window.getComputedStyle(openModalBtn));
  }
  if (openModalDesktopBtn) {
    console.log(
      "Desktop button styles:",
      window.getComputedStyle(openModalDesktopBtn)
    );
  }

  // Date picker modal functionality
  const closeModalBtn = document.getElementById("closeModal");
  const confirmBtn = document.getElementById("confirmDate");
  const cancelBtn = document.getElementById("cancelDate");
  const modal = document.getElementById("dateModal");

  console.log("Modal elements:", {
    openModalBtn,
    openModalDesktopBtn,
    closeModalBtn,
    confirmBtn,
    cancelBtn,
    modal,
  }); // Debug log

  function openModal() {
    console.log("Opening modal"); // Debug log
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Force reflow to ensure the modal is rendered before adding animation
    modal.offsetHeight;

    setTimeout(() => {
      modal.classList.add("show");
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.style.transform = "scale(1)";
        modalContent.style.opacity = "1";
      }
    }, 10);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeModal() {
    console.log("Closing modal"); // Debug log
    const modalContent = modal.querySelector(".modal-content");

    modal.classList.remove("show");
    if (modalContent) {
      modalContent.style.transform = "scale(0.95)";
      modalContent.style.opacity = "0";
    }

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = ""; // Restore scrolling

      // Reset modal content styles
      if (modalContent) {
        modalContent.style.transform = "";
        modalContent.style.opacity = "";
      }
    }, 300);
  }

  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
    console.log("Mobile modal button listener added");
  }

  if (openModalDesktopBtn) {
    openModalDesktopBtn.addEventListener("click", openModal);
    console.log("Desktop modal button listener added");
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Confirm button functionality
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const weekValue = document.getElementById("week").value;
      const monthValue = document.getElementById("month").value;
      const dayValue = document.getElementById("day").value;
      const yearValue = document.getElementById("year").value;

      let selectedDate = "";

      if (weekValue) {
        selectedDate = `Week of ${weekValue}`;
      } else if (monthValue && dayValue && yearValue) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        selectedDate = `${
          monthNames[monthValue - 1]
        } ${dayValue}, ${yearValue}`;
      }

      if (selectedDate) {
        // Update the button text for both mobile and desktop
        const selectTextMobile = document.getElementById("selecttext");
        const selectTextDesktop = document.getElementById("selecttextDesktop");

        if (selectTextMobile) {
          selectTextMobile.textContent = selectedDate;
          selectTextMobile.classList.remove("mr-[5px]");
        }
        if (selectTextDesktop) {
          selectTextDesktop.textContent = selectedDate;
          selectTextDesktop.classList.remove("mr-[5px]");
        }

        closeModal();
      } else {
        // Show error message if no date is selected
        alert("Please select either a week or a specific date.");
      }
    });
  }

  // Date picker functionality
  const daySelect = document.getElementById("day");
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");

  // Populate years
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // Update days based on month and year
  function updateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    if (!year || !month) return;

    const daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = '<option value="">Day</option>';
    for (let d = 1; d <= daysInMonth; d++) {
      const option = document.createElement("option");
      option.value = d;
      option.textContent = d;
      daySelect.appendChild(option);
    }
  }

  monthSelect.addEventListener("change", updateDays);
  yearSelect.addEventListener("change", updateDays);
});
