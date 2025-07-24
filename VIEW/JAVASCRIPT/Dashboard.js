// Dashboard-specific functionality
document.addEventListener("DOMContentLoaded", function () {
  // Date picker modal functionality
  const openModalBtn = document.getElementById("openModal");
  const openModalDesktopBtn = document.getElementById("openModalDesktop");
  const closeModalBtn = document.getElementById("closeModal");
  const confirmBtn = document.getElementById("confirmDate");
  const cancelBtn = document.getElementById("cancelDate");
  const modal = document.getElementById("dateModal");

  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = ""; // Restore scrolling
    }, 300);
  }

  openModalBtn?.addEventListener("click", openModal);
  openModalDesktopBtn?.addEventListener("click", openModal);
  closeModalBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Confirm button functionality
  confirmBtn?.addEventListener("click", () => {
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
      selectedDate = `${monthNames[monthValue - 1]} ${dayValue}, ${yearValue}`;
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
