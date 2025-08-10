// Maternal Care Module JavaScript
// Use a module pattern to prevent multiple initializations
(function () {
  // Check if already initialized
  if (window.maternalCareModuleInitialized) {
    console.log("Maternal Care module already initialized, skipping");
    return;
  }

  window.maternalCareModuleInitialized = true;
  console.log("Maternal Care module loading (first time)");

  // Clear any previous content to prevent duplication
  const mcSummaryElement = document.querySelector(".mc-summary");
  if (mcSummaryElement) {
    mcSummaryElement.innerHTML = "";
  }

  // Generate random data for the maternal care stats
  function generateRandomMCStats() {
    // Total prenatal visits - between 4000 and 5000
    const totalVisits = Math.floor(4000 + Math.random() * 1000);
    document.getElementById("mc-total-count").textContent =
      totalVisits.toLocaleString();

    // Complication rate - between 1.8% and 2.8%
    const complicationRate = (1.8 + Math.random() * 1).toFixed(1);
    document.getElementById("mc-complication-rate").textContent =
      complicationRate + "%";

    // Health score - between 93% and 96%
    const healthScore = (93 + Math.random() * 3).toFixed(1);
    document.getElementById("mc-health-score").textContent = healthScore + "%";

    // Risk assessment - between 7% and 9%
    const riskAssessment = (7 + Math.random() * 2).toFixed(1);
    document.getElementById("mc-risk-assessment").textContent =
      riskAssessment + "%";

    return {
      totalVisits,
      complicationRate,
      healthScore,
      riskAssessment,
    };
  }

  // Initialize with random data
  const mcStats = generateRandomMCStats();

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
  let baseValue = 350;

  // Generate slightly random but trending upward data
  for (let i = 0; i < 12; i++) {
    // Add some seasonality - higher in middle months
    const seasonalFactor = i >= 3 && i <= 8 ? 30 : 0;

    // Add some randomness but maintain overall trend
    baseValue = Math.max(
      300,
      baseValue +
        (Math.random() > 0.3 ? 12 : -5) +
        seasonalFactor +
        (i > 6 ? 8 : 0)
    );
    visitData.push(Math.round(baseValue + Math.random() * 40));
  }

  // Create main chart
  const chartElement = document.getElementById("maternalCareChart");
  if (chartElement && typeof Chart !== "undefined" && !chartElement.chart) {
    const ctx = chartElement.getContext("2d");

    // Store the chart instance on the element to prevent double initialization
    chartElement.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Prenatal Visits",
            data: visitData,
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            borderColor: "rgba(37, 99, 235, 1)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "rgba(37, 99, 235, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Maternal Care Visits - Monthly Trend",
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

  // Create age distribution chart
  const ageChartElement = document.getElementById("ageDistributionChart");
  if (
    ageChartElement &&
    typeof Chart !== "undefined" &&
    !ageChartElement.chart
  ) {
    const ageCtx = ageChartElement.getContext("2d");

    // Generate random but realistic age distribution data
    const ageData = [
      Math.round(5 + Math.random() * 5), // Under 20
      Math.round(30 + Math.random() * 10), // 20-24
      Math.round(35 + Math.random() * 10), // 25-29
      Math.round(18 + Math.random() * 7), // 30-34
      Math.round(7 + Math.random() * 5), // 35-39
      Math.round(2 + Math.random() * 3), // 40+
    ];

    // Store the chart instance on the element to prevent double initialization
    ageChartElement.chart = new Chart(ageCtx, {
      type: "doughnut",
      data: {
        labels: ["Under 20", "20-24", "25-29", "30-34", "35-39", "40+"],
        datasets: [
          {
            data: ageData,
            backgroundColor: [
              "rgba(251, 191, 36, 0.7)", // amber
              "rgba(52, 211, 153, 0.7)", // emerald
              "rgba(16, 185, 129, 0.7)", // green
              "rgba(59, 130, 246, 0.7)", // blue
              "rgba(99, 102, 241, 0.7)", // indigo
              "rgba(236, 72, 153, 0.7)", // pink
            ],
            borderColor: [
              "rgba(251, 191, 36, 1)",
              "rgba(52, 211, 153, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(99, 102, 241, 1)",
              "rgba(236, 72, 153, 1)",
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
            text: "Maternal Age Distribution (%)",
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
        cutout: "60%",
      },
    });
  }

  // Update summary text based on generated data
  function updateSummaryText(stats) {
    const summaryElement = document.querySelector(".mc-summary");
    if (summaryElement) {
      const yearOverYearChange =
        "+" + (12 + Math.random() * 5).toFixed(1) + "%";

      const summaryHTML = `
        <p>Maternal Care services have shown significant growth with a ${yearOverYearChange} increase in total prenatal visits over the past year. Regular check-ups have improved maternal health outcomes across all demographics.</p>
        <p>The complication rate has decreased by 0.6 percentage points to ${stats.complicationRate}%, indicating improved early detection and preventive care measures. The maternal health score has improved to ${stats.healthScore}%, reflecting better overall care quality.</p>
        <p>High-risk cases have decreased by 1.2% compared to the previous quarter, showing the effectiveness of our early intervention programs and risk assessment protocols. Most maternal patients fall within the 25-35 age group, with specialized care plans implemented for younger and older mothers.</p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }

  // Update summary with our generated stats
  updateSummaryText(mcStats);
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
