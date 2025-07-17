// Menu dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("menu-button");
  const dropdown = document.getElementById("dropdown-menu");

  let isOpen = false;

  button.addEventListener("click", () => {
    isOpen = !isOpen;
    if (isOpen) {
      dropdown.classList.remove(
        "scale-y-0",
        "opacity-0",
        "pointer-events-none"
      );
      dropdown.classList.add("scale-y-100", "opacity-100");
    } else {
      dropdown.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
      dropdown.classList.remove("scale-y-100", "opacity-100");
    }
  });

  // Date picker modal functionality
  const openModalBtn = document.getElementById("openModal");
  const openModalDesktopBtn = document.getElementById("openModalDesktop");
  const closeModalBtn = document.getElementById("closeModal");
  const modal = document.getElementById("dateModal");

  openModalBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  openModalDesktopBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
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
