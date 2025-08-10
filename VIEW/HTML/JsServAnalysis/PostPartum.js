// Postpartum Care Module JavaScript
// Use a module pattern to prevent multiple initializations
(function () {
  // Check if already initialized
  if (window.postpartumCareModuleInitialized) {
    console.log("Postpartum Care module already initialized, skipping");
    return;
  }

  window.postpartumCareModuleInitialized = true;
  console.log("Postpartum Care module loading (first time)");

  // Clear any previous content to prevent duplication
  const ppSummaryElement = document.querySelector(".pp-summary");
  if (ppSummaryElement) {
    ppSummaryElement.innerHTML = "";
  }

  // Generate random data for the postpartum care stats
  function generateRandomPPStats() {
    // Total visits - between 3000 and 3500
    const totalVisits = Math.floor(3000 + Math.random() * 500);
    document.getElementById("pp-total-count").textContent =
      totalVisits.toLocaleString();

    // Complication rate - between 3.2% and 4.2%
    const complicationRate = (3.2 + Math.random() * 1.0).toFixed(1);
    document.getElementById("pp-complication-rate").textContent =
      complicationRate + "%";

    // Recovery rate - between 92% and 95%
    const recoveryRate = (92 + Math.random() * 3).toFixed(1);
    document.getElementById("pp-recovery-rate").textContent =
      recoveryRate + "%";

    // Follow-up rate - between 85% and 89%
    const followupRate = (85 + Math.random() * 4).toFixed(1);
    document.getElementById("pp-followup-rate").textContent =
      followupRate + "%";

    return {
      totalVisits,
      complicationRate,
      recoveryRate,
      followupRate,
    };
  }

  // Initialize with random data
  const ppStats = generateRandomPPStats();

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
  const visitData = [];
  let baseValue = 230;

  // Generate slightly random but trending upward data
  for (let i = 0; i < 12; i++) {
    // Add some seasonality - slightly higher in spring/summer
    const seasonalFactor = i >= 3 && i <= 8 ? 15 : 0;

    // Add some randomness but maintain overall trend
    baseValue = Math.max(
      200,
      baseValue +
        (Math.random() > 0.3 ? 8 : -3) +
        seasonalFactor +
        (i > 6 ? 5 : 0)
    );
    visitData.push(Math.round(baseValue + Math.random() * 30));
  }

  // Create main chart
  const chartElement = document.getElementById("postpartumCareChart");
  if (chartElement && typeof Chart !== "undefined" && !chartElement.chart) {
    const ctx = chartElement.getContext("2d");

    // Store the chart instance on the element to prevent double initialization
    chartElement.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Postpartum Visits",
            data: visitData,
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
            text: "Postpartum Care Visits - Monthly Trend",
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
              text: "Number of Visits",
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

  // Create complication type distribution chart
  const complicationChartElement = document.getElementById(
    "complicationTypeChart"
  );
  if (
    complicationChartElement &&
    typeof Chart !== "undefined" &&
    !complicationChartElement.chart
  ) {
    const complicationCtx = complicationChartElement.getContext("2d");

    // Generate random but realistic complication type distribution
    const complicationCategories = [
      "Postpartum Depression",
      "Infections",
      "Excessive Bleeding",
      "Lactation Issues",
      "Perineal Pain",
      "Other",
    ];
    const complicationData = [
      Math.round(30 + Math.random() * 10), // Depression
      Math.round(20 + Math.random() * 8), // Infections
      Math.round(15 + Math.random() * 5), // Bleeding
      Math.round(18 + Math.random() * 7), // Lactation
      Math.round(10 + Math.random() * 5), // Perineal Pain
      Math.round(5 + Math.random() * 3), // Other
    ];

    // Store the chart instance on the element to prevent double initialization
    complicationChartElement.chart = new Chart(complicationCtx, {
      type: "pie",
      data: {
        labels: complicationCategories,
        datasets: [
          {
            data: complicationData,
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)", // blue
              "rgba(239, 68, 68, 0.7)", // red
              "rgba(249, 115, 22, 0.7)", // orange
              "rgba(16, 185, 129, 0.7)", // green
              "rgba(139, 92, 246, 0.7)", // purple
              "rgba(107, 114, 128, 0.7)", // gray
            ],
            borderColor: [
              "rgba(59, 130, 246, 1)",
              "rgba(239, 68, 68, 1)",
              "rgba(249, 115, 22, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(139, 92, 246, 1)",
              "rgba(107, 114, 128, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: "Postpartum Complication Types (%)",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}%`;
              },
            },
          },
        },
      },
    });
  }

  // Update summary text based on generated data
  function updateSummaryText(stats) {
    const summaryElement = document.querySelector(".pp-summary");
    if (summaryElement) {
      const summaryHTML = `
        <p class="text-gray-700">
          Postpartum Care services have shown steady growth with a 9.2% increase in total visits compared to the previous year. 
          This growth reflects increased awareness of the importance of postpartum care and improved access to healthcare services.
        </p>
        <p class="text-gray-700 mt-4">
          The postpartum complication rate has decreased by 1.2 percentage points to ${stats.complicationRate}%, indicating improved monitoring and early intervention strategies. 
          Normal recovery rates have increased to ${stats.recoveryRate}%, showing a 2.1% improvement from the previous year.
        </p>
        <p class="text-gray-700 mt-4">
          Follow-up completion rates have significantly improved to ${stats.followupRate}%, representing a 3.8% increase from the previous year. 
          This improvement can be attributed to better appointment scheduling, reminder systems, and patient education about the importance of postpartum follow-up care.
        </p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }
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
  // Update summary with our generated stats
  updateSummaryText(ppStats);
})();
