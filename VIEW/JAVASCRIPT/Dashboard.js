// Dashboard-specific functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard script loaded"); // Debug log

  // ===== CREATE SAMPLE CHARTS =====
  // Family Planning Services Chart
  const familyPlanningCtx = document.getElementById("familyPlanningChart");
  if (familyPlanningCtx) {
    const familyPlanningChart = new Chart(familyPlanningCtx, {
      type: "line",
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Family Planning Consultations",
            data: [65, 59, 80, 81, 76, 85, 90, 95, 87, 92, 98, 105],
            borderColor: "rgba(37, 99, 235, 1)", // #2563EB
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "rgba(37, 99, 235, 1)",
            pointBorderColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                size: 13,
                family: "'Inter', sans-serif",
              },
              boxWidth: 15,
              padding: 12,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#334155",
            bodyColor: "#334155",
            borderColor: "rgba(226, 232, 240, 1)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            boxPadding: 6,
          },
          title: {
            display: true,
            text: "2024-2025 Monthly Trend",
            font: {
              size: 14,
              weight: "normal",
            },
            padding: {
              top: 8,
              bottom: 12,
            },
            color: "#6B7280", // text-gray-500
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              maxRotation: 0,
            },
            title: {
              display: true,
              text: "Month",
              font: {
                size: 12,
              },
              color: "#6B7280",
            },
          },
          y: {
            display: true,
            grid: {
              color: "rgba(226, 232, 240, 0.5)",
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              maxTicksLimit: 5,
            },
            title: {
              display: true,
              text: "Number of Consultations",
              font: {
                size: 12,
              },
              color: "#6B7280",
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Newborn and Infants Chart
  const newbornCtx = document.getElementById("newbornChart");
  if (newbornCtx) {
    const newbornChart = new Chart(newbornCtx, {
      type: "line",
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Newborn Registrations",
            data: [42, 38, 45, 50, 52, 48, 55, 60, 57, 62, 58, 65],
            borderColor: "rgba(16, 185, 129, 1)", // green-500
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "rgba(16, 185, 129, 1)",
            pointBorderColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                size: 13,
                family: "'Inter', sans-serif",
              },
              boxWidth: 15,
              padding: 12,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#334155",
            bodyColor: "#334155",
            borderColor: "rgba(226, 232, 240, 1)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            boxPadding: 6,
          },
          title: {
            display: true,
            text: "2024-2025 Monthly Trend",
            font: {
              size: 14,
              weight: "normal",
            },
            padding: {
              top: 8,
              bottom: 12,
            },
            color: "#6B7280", // text-gray-500
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              maxRotation: 0,
            },
            title: {
              display: true,
              text: "Month",
              font: {
                size: 12,
              },
              color: "#6B7280",
            },
          },
          y: {
            display: true,
            grid: {
              color: "rgba(226, 232, 240, 0.5)",
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              maxTicksLimit: 5,
            },
            title: {
              display: true,
              text: "Number of Infants",
              font: {
                size: 12,
              },
              color: "#6B7280",
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Maternal Care Chart
  const maternalCtx = document.getElementById("maternalChart");
  if (maternalCtx) {
    const maternalChart = new Chart(maternalCtx, {
      type: "bar",
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Prenatal Checkups",
            data: [85, 78, 90, 95, 88, 92, 98, 105, 95, 100, 108, 115],
            backgroundColor: "rgba(124, 58, 237, 0.7)", // purple-600
            borderRadius: 6,
          },
          {
            label: "Postnatal Visits",
            data: [60, 55, 65, 70, 68, 75, 80, 85, 78, 82, 88, 95],
            backgroundColor: "rgba(172, 148, 250, 0.7)", // purple-400
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                size: 14,
                family: "'Inter', sans-serif",
              },
              boxWidth: 18,
              padding: 18,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#334155",
            bodyColor: "#334155",
            borderColor: "rgba(226, 232, 240, 1)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            boxPadding: 6,
          },
          title: {
            display: true,
            text: "Maternal Care Services (2024-2025)",
            font: {
              size: 16,
              weight: "normal",
            },
            padding: {
              top: 12,
              bottom: 18,
            },
            color: "#4B5563", // text-gray-600
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
            title: {
              display: true,
              text: "Month",
              font: {
                size: 14,
                weight: "normal",
              },
              color: "#6B7280",
              padding: {
                top: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(226, 232, 240, 0.5)",
            },
            ticks: {
              font: {
                size: 12,
              },
            },
            title: {
              display: true,
              text: "Number of Visits",
              font: {
                size: 14,
                weight: "normal",
              },
              color: "#6B7280",
              padding: {
                bottom: 12,
              },
            },
          },
        },
      },
    });
  }

  // ===== ANALYTICS SECTION NAVIGATION =====
  const navButtons = document.querySelectorAll(".analytics-nav-btn");
  const sections = document.querySelectorAll(".analytics-section");

  // Function to show specific section
  function showSection(sectionId) {
    // Special handling for service-usage section
    if (sectionId === "service-usage") {
      window.location.href = "ServiceUsageTrends.html";
      return;
    }

    // Hide all sections
    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    // Remove active class from all buttons
    navButtons.forEach((btn) => {
      btn.classList.remove("active", "bg-blue-600", "text-white");
      btn.classList.add("bg-gray-100", "text-gray-700");
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId + "-section");
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Add active class to clicked button
    const activeButton = document.querySelector(
      `[data-section="${sectionId}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active", "bg-blue-600", "text-white");
      activeButton.classList.remove("bg-gray-100", "text-gray-700");
    }
  }

  // Add event listeners to navigation buttons
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.getAttribute("data-section");
      showSection(section);
    });
  });

  // Show family-planning section by default if it exists
  const fpSection = document.getElementById("family-planning-section");
  if (fpSection) {
    showSection("family-planning");
  } else {
    // Fallback to overview section
    showSection("overview");
  }

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

  // If confirmBtn exists, add event listener for year selection
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const yearValue = document.getElementById("yearSelect").value;

      if (yearValue) {
        // Update the button text for both mobile and desktop
        const selectTextMobile = document.getElementById("selecttext");
        const selectTextDesktop = document.getElementById("selecttextDesktop");

        if (selectTextMobile) {
          selectTextMobile.textContent = `Year: ${yearValue}`;
          selectTextMobile.classList.remove("mr-[5px]");
        }
        if (selectTextDesktop) {
          selectTextDesktop.textContent = `Year: ${yearValue}`;
          selectTextDesktop.classList.remove("mr-[5px]");
        }

        closeModal();
      } else {
        // Show error message if no year is selected
        alert("Please select a year.");
      }
    });
  }

  // Date picker functionality - populate years
  const yearSelect = document.getElementById("yearSelect");

  // Populate years
  if (yearSelect) {
    const currentYear = new Date().getFullYear();
    // Add years from 5 years ago to 5 years in the future
    for (let y = currentYear - 5; y <= currentYear + 5; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.textContent = y;
      // Set current year as selected by default
      if (y === currentYear) {
        option.selected = true;
      }
      yearSelect.appendChild(option);
    }
  }
});
