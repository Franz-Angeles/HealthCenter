// Newborn and Infants Module JavaScript
// Use a module pattern to prevent multiple initializations
(function () {
  // Check if already initialized
  if (window.newbornCareModuleInitialized) {
    console.log("Newborn and Infants module already initialized, skipping");
    return;
  }

  window.newbornCareModuleInitialized = true;
  console.log("Newborn and Infants module loading (first time)");

  // Clear any previous content to prevent duplication
  const nbSummaryElement = document.querySelector(".nb-summary");
  if (nbSummaryElement) {
    nbSummaryElement.innerHTML = "";
  }

  // Generate random data for the newborn care stats
  function generateRandomNBStats() {
    // Total checkups - between 3500 and 4500
    const totalCheckups = Math.floor(3500 + Math.random() * 1000);
    document.getElementById("nb-total-count").textContent =
      totalCheckups.toLocaleString();

    // Healthy births rate - between 97.5% and 99%
    const healthyRate = (97.5 + Math.random() * 1.5).toFixed(1);
    document.getElementById("nb-healthy-rate").textContent = healthyRate + "%";

    // Vaccination rate - between 95% and 98%
    const vaccinationRate = (95 + Math.random() * 3).toFixed(1);
    document.getElementById("nb-vaccination-rate").textContent =
      vaccinationRate + "%";

    // Normal birth weight - between 93% and 95%
    const weightTrend = (93 + Math.random() * 2).toFixed(1);
    document.getElementById("nb-weight-trend").textContent = weightTrend + "%";

    return {
      totalCheckups,
      healthyRate,
      vaccinationRate,
      weightTrend,
    };
  }

  // Initialize with random data
  const nbStats = generateRandomNBStats();

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
  const checkupData = [];
  let baseValue = 280;

  // Generate slightly random but trending upward data with seasonality
  for (let i = 0; i < 12; i++) {
    // Add some seasonality - higher in spring/summer
    const seasonalFactor = i >= 2 && i <= 7 ? 25 : 0;

    // Add some randomness but maintain overall trend
    baseValue = Math.max(
      250,
      baseValue +
        (Math.random() > 0.3 ? 10 : -5) +
        seasonalFactor +
        (i > 6 ? 5 : 0)
    );
    checkupData.push(Math.round(baseValue + Math.random() * 35));
  }

  // Create main chart
  const chartElement = document.getElementById("newbornCareChart");
  if (chartElement && typeof Chart !== "undefined" && !chartElement.chart) {
    const ctx = chartElement.getContext("2d");

    // Store the chart instance on the element to prevent double initialization
    chartElement.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Newborn and Infant Checkups",
            data: checkupData,
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
            text: "Newborn and Infant Care Checkups - Monthly Trend",
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
              text: "Number of Checkups",
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

  // Create birth weight distribution chart
  const weightChartElement = document.getElementById("birthWeightChart");
  if (
    weightChartElement &&
    typeof Chart !== "undefined" &&
    !weightChartElement.chart
  ) {
    const weightCtx = weightChartElement.getContext("2d");

    // Generate random but realistic birth weight distribution
    const weightCategories = [
      "< 2.5 kg",
      "2.5-2.9 kg",
      "3.0-3.4 kg",
      "3.5-3.9 kg",
      "> 4.0 kg",
    ];
    const weightData = [
      Math.round(3 + Math.random() * 3), // < 2.5 kg (low)
      Math.round(18 + Math.random() * 7), // 2.5-2.9 kg
      Math.round(45 + Math.random() * 10), // 3.0-3.4 kg (optimal)
      Math.round(25 + Math.random() * 8), // 3.5-3.9 kg
      Math.round(2 + Math.random() * 3), // > 4.0 kg (high)
    ];

    // Store the chart instance on the element to prevent double initialization
    weightChartElement.chart = new Chart(weightCtx, {
      type: "pie",
      data: {
        labels: weightCategories,
        datasets: [
          {
            data: weightData,
            backgroundColor: [
              "rgba(239, 68, 68, 0.7)", // red (low)
              "rgba(249, 115, 22, 0.7)", // orange
              "rgba(16, 185, 129, 0.7)", // green (optimal)
              "rgba(59, 130, 246, 0.7)", // blue
              "rgba(251, 191, 36, 0.7)", // amber (high)
            ],
            borderColor: [
              "rgba(239, 68, 68, 1)",
              "rgba(249, 115, 22, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(251, 191, 36, 1)",
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
            text: "Birth Weight Distribution (%)",
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
    const summaryElement = document.querySelector(".nb-summary");
    if (summaryElement) {
      const yearOverYearChange =
        "+" + (10 + Math.random() * 3).toFixed(1) + "%";

      const summaryHTML = `
        <p>Newborn and Infant Care services have shown consistent growth with an 11.7% increase in total checkups compared to the previous year. This reflects improved healthcare access and increased awareness of newborn and infant care importance.</p>
        <p>The healthy birth rate has improved to ${stats.healthyRate}%, showing a 0.7% increase from the previous year. This improvement is attributed to better prenatal care and maternal health programs. The initial vaccination rate for newborns has also increased to ${stats.vaccinationRate}%.</p>
        <p>Normal birth weight rates have increased by 0.9% to ${stats.weightTrend}%, indicating improved maternal nutrition and prenatal care. The most common weight range is 2.9-3.4 kg, which falls within the healthy range for newborns. Our early intervention programs continue to show positive results in overall newborn and infant health outcomes.</p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }

  // Update summary with our generated stats
  updateSummaryText(nbStats);
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
