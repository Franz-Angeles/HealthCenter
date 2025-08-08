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
})();
