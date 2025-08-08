// Immunization Module JavaScript
// Use a module pattern to prevent multiple initializations
(function () {
  // Check if already initialized
  if (window.immunizationModuleInitialized) {
    console.log("Immunization module already initialized, skipping");
    return;
  }

  window.immunizationModuleInitialized = true;
  console.log("Immunization module loading (first time)");

  // Clear any previous content to prevent duplication
  const immSummaryElement = document.querySelector(".imm-summary");
  if (immSummaryElement) {
    immSummaryElement.innerHTML = "";
  }

  // Generate random data for the immunization stats
  function generateRandomImmStats() {
    // Total vaccinations - between 5000 and 6500
    const totalVaccinations = Math.floor(5000 + Math.random() * 1500);
    document.getElementById("imm-total-count").textContent =
      totalVaccinations.toLocaleString();

    // Error rate - between 1% and 2.5%
    const errorRate = (1 + Math.random() * 1.5).toFixed(1);
    document.getElementById("imm-error-rate").textContent = errorRate + "%";

    // Confidence rate - between 95% and 99%
    const confidenceRate = (95 + Math.random() * 4).toFixed(1);
    document.getElementById("imm-confidence-rate").textContent =
      confidenceRate + "%";

    // Prediction - between +7% and +12%
    const prediction = (7 + Math.random() * 5).toFixed(1);
    document.getElementById("imm-prediction").textContent =
      "+" + prediction + "%";

    return {
      totalVaccinations,
      errorRate,
      confidenceRate,
      prediction,
    };
  }

  // Initialize with random data
  const immStats = generateRandomImmStats();

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
  const vaccinationData = [];
  let baseValue = 450;

  // Generate slightly random but trending upward data
  for (let i = 0; i < 12; i++) {
    // Add some seasonality to the data
    const seasonalFactor =
      i >= 0 && i <= 2
        ? 0.9 // Lower in winter months (Jan-Mar)
        : i >= 3 && i <= 5
        ? 1.1 // Higher in spring (Apr-Jun)
        : i >= 6 && i <= 8
        ? 1.2 // Highest in summer/fall (Jul-Sep)
        : 1.0; // Normal in late fall (Oct-Dec)

    // Add some randomness but maintain overall trend
    baseValue = Math.max(
      400,
      baseValue + (Math.random() > 0.3 ? 15 : -5) * seasonalFactor
    );
    vaccinationData.push(Math.round(baseValue + Math.random() * 50));
  }

  // Update summary text based on generated data
  function updateSummaryText(stats) {
    const summaryElement = document.querySelector(".imm-summary");
    if (summaryElement) {
      const yearOverYearChange =
        "+" + (12 + Math.random() * 6).toFixed(1) + "%";

      const summaryHTML = `
        <p>Immunization services have demonstrated strong growth with a ${yearOverYearChange} increase in total vaccinations administered compared to the previous year.</p>
        <p>The error rate in vaccine administration has decreased to ${stats.errorRate}%, indicating improved training and protocol adherence. The confidence rate in data accuracy has increased to ${stats.confidenceRate}%, providing a reliable foundation for predictive analytics.</p>
        <p>Based on current trends and seasonal patterns, we predict a ${stats.prediction} increase in vaccination demand for the coming month. This increase coincides with the start of the school year and seasonal vaccine campaigns.</p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }

  // Update summary with our generated stats
  updateSummaryText(immStats);

  // Create trend visualization
  const chartElement = document.getElementById("imm-trend-chart");
  if (chartElement && typeof Chart !== "undefined" && !chartElement.chart) {
    const ctx = chartElement.getContext("2d");

    // Create a trend dataset for year-over-year comparison
    const lastYearData = vaccinationData.map((value) =>
      Math.round(value * 0.85)
    );

    // Store the chart instance on the element to prevent double initialization
    chartElement.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Current Year",
            data: vaccinationData,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Previous Year",
            data: lastYearData,
            borderColor: "#64748b",
            backgroundColor: "rgba(100, 116, 139, 0.05)",
            tension: 0.4,
            borderDash: [5, 5],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Immunization Trend - Year-over-Year Comparison",
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
              text: "Number of Vaccinations",
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
})();
