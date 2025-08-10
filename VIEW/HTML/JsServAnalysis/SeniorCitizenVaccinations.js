// Senior Citizen Vaccinations Analytics Module JS

document.addEventListener("DOMContentLoaded", function () {
  // Trend Chart Configuration
  const trendChartCanvas = document.getElementById("scv-trend-chart");

  if (trendChartCanvas) {
    const ctx = trendChartCanvas.getContext("2d");

    // Sample data - Monthly vaccinations administered
    const data = {
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
          label: "Pneumonia Vaccine",
          data: [212, 198, 225, 280, 267, 255, 290, 310, 322, 345, 360, 380],
          borderColor: "rgba(59, 130, 246, 0.8)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          label: "Influenza Vaccine",
          data: [182, 168, 145, 168, 187, 220, 245, 270, 295, 340, 380, 410],
          borderColor: "rgba(16, 185, 129, 0.8)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          label: "COVID-19 Booster",
          data: [150, 165, 180, 195, 205, 220, 245, 265, 285, 310, 335, 375],
          borderColor: "rgba(245, 158, 11, 0.8)",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    };

    // Chart configuration
    const trendChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                family: "Inter, sans-serif",
                size: 12,
              },
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#000",
            bodyColor: "#000",
            bodyFont: {
              family: "Inter, sans-serif",
            },
            titleFont: {
              family: "Inter, sans-serif",
              weight: "bold",
            },
            padding: 12,
            borderWidth: 1,
            borderColor: "#ddd",
            displayColors: true,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label + " 2025";
              },
              label: function (context) {
                return (
                  context.dataset.label + ": " + context.raw + " vaccinations"
                );
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "Inter, sans-serif",
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#f3f4f6",
            },
            ticks: {
              font: {
                family: "Inter, sans-serif",
              },
              callback: function (value) {
                return value;
              },
            },
          },
        },
      },
    });
  }

  // Vaccine Type Distribution Chart
  const vaccineTypeChartCanvas = document.getElementById(
    "scv-vaccine-type-chart"
  );

  if (vaccineTypeChartCanvas) {
    const ctx = vaccineTypeChartCanvas.getContext("2d");

    // Sample data - Vaccine type distribution
    const data = {
      labels: [
        "Influenza",
        "Pneumococcal",
        "COVID-19 Booster",
        "Shingles",
        "Tetanus/Diphtheria",
        "Other",
      ],
      datasets: [
        {
          label: "Distribution by Vaccine Type",
          data: [38, 27, 20, 8, 5, 2],
          backgroundColor: [
            "rgba(59, 130, 246, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(139, 92, 246, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(156, 163, 175, 0.7)",
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(139, 92, 246, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(156, 163, 175, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const vaccineTypeChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                family: "Inter, sans-serif",
                size: 12,
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#000",
            bodyColor: "#000",
            bodyFont: {
              family: "Inter, sans-serif",
            },
            titleFont: {
              family: "Inter, sans-serif",
              weight: "bold",
            },
            padding: 12,
            borderWidth: 1,
            borderColor: "#ddd",
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.raw + "%";
              },
            },
          },
        },
        cutout: "60%",
      },
    });
  }

  // Data update for different years
  function updateDataForYear(year) {
    // This function would update the charts and stats based on the selected year
    // For demonstration, we'll just log the selected year
    console.log("Data updated for year: " + year);

    // In a real implementation, you would fetch data for the specific year
    // and update the charts and statistics accordingly
  }

  // Hook up year selection to the confirmation button
  const confirmDateBtn = document.getElementById("confirmDate");
  if (confirmDateBtn) {
    confirmDateBtn.addEventListener("click", function () {
      const yearSelect = document.getElementById("yearSelect");
      if (yearSelect && yearSelect.value) {
        updateDataForYear(yearSelect.value);
      }
    });
  }
});

// Year dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById("yearSelectDropdown");

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

    // Add event listener for year selection
    yearSelect.addEventListener("change", function () {
      const selectedYear = this.value;
      console.log("Selected year:", selectedYear);
      // Add your logic to update data based on selected year here
    });
  }

  // Export Report Modal functionality
  const exportBtn = document.getElementById("exportReportBtn");
  const closeExportModalBtn = document.getElementById("closeExportModal");
  const confirmExportBtn = document.getElementById("confirmExport");
  const cancelExportBtn = document.getElementById("cancelExport");
  const exportModal = document.getElementById("exportReportModal");
  const reportTypeSelect = document.getElementById("reportType");
  const exportFormatSelect = document.getElementById("exportFormat");

  function openExportModal() {
    exportModal.classList.remove("hidden");
    exportModal.classList.add("flex");

    // Force reflow
    exportModal.offsetHeight;

    setTimeout(() => {
      exportModal.classList.add("show");
      const modalContent = exportModal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.style.transform = "scale(1)";
        modalContent.style.opacity = "1";
      }
    }, 10);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeExportModal() {
    const modalContent = exportModal.querySelector(".modal-content");

    exportModal.classList.remove("show");
    if (modalContent) {
      modalContent.style.transform = "scale(0.95)";
      modalContent.style.opacity = "0";
    }

    setTimeout(() => {
      exportModal.classList.add("hidden");
      exportModal.classList.remove("flex");
      document.body.style.overflow = ""; // Restore scrolling

      // Reset modal content styles
      if (modalContent) {
        modalContent.style.transform = "";
        modalContent.style.opacity = "";
      }
    }, 300);
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", openExportModal);
  }

  if (closeExportModalBtn) {
    closeExportModalBtn.addEventListener("click", closeExportModal);
  }

  if (cancelExportBtn) {
    cancelExportBtn.addEventListener("click", closeExportModal);
  }

  // Close modal when clicking outside
  if (exportModal) {
    exportModal.addEventListener("click", (e) => {
      if (e.target === exportModal) {
        closeExportModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      exportModal &&
      !exportModal.classList.contains("hidden")
    ) {
      closeExportModal();
    }
  });

  // Handle export confirmation
  if (confirmExportBtn) {
    confirmExportBtn.addEventListener("click", () => {
      const reportType = reportTypeSelect.value;
      const exportFormat = exportFormatSelect.value;
      const year = yearSelect.value;

      console.log(
        `Exporting ${reportType} report in ${exportFormat} format for year ${year}`
      );
      // Here you would implement the actual export functionality

      // For demonstration, show an alert
      alert(`Report export initiated: ${reportType} (${exportFormat})`);

      closeExportModal();
    });
  }

  // Set the default report type based on the current page
  if (reportTypeSelect) {
    // Get the current page from URL
    const currentPage = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");

    if (currentPage === "FamilyPlanning") {
      reportTypeSelect.value = "family-planning";
    } else if (currentPage === "MaternalCare") {
      reportTypeSelect.value = "maternal-care";
    } else if (currentPage === "NewBorn") {
      reportTypeSelect.value = "newborn-infant";
    } else if (currentPage === "PostPartum") {
      reportTypeSelect.value = "postpartum";
    } else if (currentPage === "RiskAssessments") {
      reportTypeSelect.value = "risk-assessments";
    } else if (currentPage === "SeniorCitizenVaccinations") {
      reportTypeSelect.value = "senior-vaccination";
    }
  }
});
