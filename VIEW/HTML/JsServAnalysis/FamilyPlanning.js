// Family Planning Module JavaScript
// Use a module pattern to prevent multiple initializations
(function () {
  // Check if already initialized
  if (window.familyPlanningModuleInitialized) {
    console.log("Family Planning module already initialized, skipping");
    return;
  }

  window.familyPlanningModuleInitialized = true;
  console.log("Family Planning module loading (first time)");

  // Clear any previous content to prevent duplication
  const fpSummaryElement = document.querySelector(".fp-summary");
  if (fpSummaryElement) {
    fpSummaryElement.innerHTML = "";
  }

  // Generate random data for the family planning stats
  function generateRandomFPStats() {
    // Total consultations - between 3000 and 4000
    const totalConsultations = Math.floor(3000 + Math.random() * 1000);
    document.getElementById("fp-total-count").textContent =
      totalConsultations.toLocaleString();

    // Error rate - between 1% and 3%
    const errorRate = (1 + Math.random() * 2).toFixed(1);
    document.getElementById("fp-error-rate").textContent = errorRate + "%";

    // Confidence rate - between 93% and 98%
    const confidenceRate = (93 + Math.random() * 5).toFixed(1);
    document.getElementById("fp-confidence-rate").textContent =
      confidenceRate + "%";

    // Prediction - between +6% and +11%
    const prediction = (6 + Math.random() * 5).toFixed(1);
    document.getElementById("fp-prediction").textContent =
      "+" + prediction + "%";

    return {
      totalConsultations,
      errorRate,
      confidenceRate,
      prediction,
    };
  }

  // Initialize with random data
  const fpStats = generateRandomFPStats();

  // Monthly trend data
  const months = [
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
  const consultationData = [];
  let baseValue = 250;

  // Generate slightly random but trending upward data
  for (let i = 0; i < 12; i++) {
    // Add some randomness but maintain overall trend
    baseValue = Math.max(
      200,
      baseValue + (Math.random() > 0.3 ? 10 : -5) + (i > 6 ? 5 : 0)
    );
    consultationData.push(Math.round(baseValue + Math.random() * 40));
  }

  // Create chart
  const chartElement = document.getElementById("familyPlanningChart");
  if (chartElement && typeof Chart !== "undefined" && !chartElement.chart) {
    const ctx = chartElement.getContext("2d");

    // Store the chart instance on the element to prevent double initialization
    chartElement.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Consultations",
            data: consultationData,
            backgroundColor: "rgba(37, 99, 235, 0.7)",
            borderColor: "rgba(37, 99, 235, 1)",
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Family Planning Consultations - Monthly Trend",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Number of Consultations",
            },
          },
          x: {
            title: {
              display: true,
              text: "Month",
            },
          },
        },
      },
    });
  }

  // Update summary text based on generated data
  function updateSummaryText(stats) {
    const summaryElement = document.querySelector(".fp-summary");
    if (summaryElement) {
      const yearOverYearChange =
        "+" + (10 + Math.random() * 5).toFixed(1) + "%";

      const summaryHTML = `
        <p>The Family Planning services have shown consistent growth over the past 12 months, with a ${yearOverYearChange} increase in total consultations compared to the previous year.</p>
        <p>Patient satisfaction has improved, with satisfaction rates increasing from 88% to 93%. The error rate in service delivery has decreased to ${stats.errorRate}%, indicating improved quality control measures.</p>
        <p>Based on current trends, we predict a ${stats.prediction} increase in service utilization for the coming month, with continued growth expected in the 18-35 age demographic. This growth will require proportional resource allocation to maintain service quality.</p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }

  // Update summary with our generated stats
  updateSummaryText(fpStats);

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
})();
