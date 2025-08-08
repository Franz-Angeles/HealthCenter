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

  // Update summary with our generated stats
  updateSummaryText(ppStats);
})();
