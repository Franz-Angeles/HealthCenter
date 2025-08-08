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
})();
