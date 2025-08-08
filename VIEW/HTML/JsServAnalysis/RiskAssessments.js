// Risk Assessments Module JavaScript
// Use a module pattern to prevent multiple initializations
(function () {
  // Check if already initialized
  if (window.riskAssessmentsModuleInitialized) {
    console.log("Risk Assessments module already initialized, skipping");
    return;
  }

  window.riskAssessmentsModuleInitialized = true;
  console.log("Risk Assessments module loading (first time)");

  // Clear any previous content to prevent duplication
  const raSummaryElement = document.querySelector(".ra-summary");
  if (raSummaryElement) {
    raSummaryElement.innerHTML = "";
  }

  // Generate random data for the risk assessment stats
  function generateRandomRAStats() {
    // Total assessments - between 4500 and 5200
    const totalAssessments = Math.floor(4500 + Math.random() * 700);
    document.getElementById("ra-total-count").textContent =
      totalAssessments.toLocaleString();

    // High risk rate - between 17% and 20%
    const highRiskRate = (17 + Math.random() * 3).toFixed(1);
    document.getElementById("ra-high-risk-rate").textContent =
      highRiskRate + "%";

    // Intervention success rate - between 74% and 79%
    const interventionRate = (74 + Math.random() * 5).toFixed(1);
    document.getElementById("ra-intervention-rate").textContent =
      interventionRate + "%";

    // Follow-up completion rate - between 82% and 86%
    const followupRate = (82 + Math.random() * 4).toFixed(1);
    document.getElementById("ra-followup-rate").textContent =
      followupRate + "%";

    return {
      totalAssessments,
      highRiskRate,
      interventionRate,
      followupRate,
    };
  }

  // Initialize with random data
  const raStats = generateRandomRAStats();

  // Create risk factors distribution chart
  const riskFactorsChartElement = document.getElementById("riskFactorsChart");
  if (
    riskFactorsChartElement &&
    typeof Chart !== "undefined" &&
    !riskFactorsChartElement.chart
  ) {
    const riskFactorsCtx = riskFactorsChartElement.getContext("2d");

    // Risk factors data
    const riskFactors = [
      "Hypertension",
      "Obesity",
      "Diabetes Risk",
      "Cardiovascular",
      "Smoking",
      "Alcohol",
      "Other",
    ];

    const riskValues = [
      Math.round(30 + Math.random() * 5), // Hypertension
      Math.round(26 + Math.random() * 4), // Obesity
      Math.round(17 + Math.random() * 3), // Diabetes Risk
      Math.round(12 + Math.random() * 3), // Cardiovascular
      Math.round(7 + Math.random() * 2), // Smoking
      Math.round(5 + Math.random() * 2), // Alcohol
      Math.round(3 + Math.random() * 2), // Other
    ];

    // Store the chart instance on the element to prevent double initialization
    riskFactorsChartElement.chart = new Chart(riskFactorsCtx, {
      type: "bar",
      data: {
        labels: riskFactors,
        datasets: [
          {
            label: "Risk Factor Prevalence (%)",
            data: riskValues,
            backgroundColor: [
              "rgba(239, 68, 68, 0.7)", // red (hypertension)
              "rgba(249, 115, 22, 0.7)", // orange (obesity)
              "rgba(16, 185, 129, 0.7)", // green (diabetes)
              "rgba(59, 130, 246, 0.7)", // blue (cardiovascular)
              "rgba(107, 114, 128, 0.7)", // gray (smoking)
              "rgba(139, 92, 246, 0.7)", // purple (alcohol)
              "rgba(251, 191, 36, 0.7)", // amber (other)
            ],
            borderColor: [
              "rgba(239, 68, 68, 1)",
              "rgba(249, 115, 22, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(107, 114, 128, 1)",
              "rgba(139, 92, 246, 1)",
              "rgba(251, 191, 36, 1)",
            ],
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y", // Horizontal bar chart
        plugins: {
          title: {
            display: true,
            text: "Risk Factors Distribution",
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
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Percentage (%)",
            },
          },
        },
      },
    });
  }

  // Create age and gender distribution chart
  const ageGenderChartElement = document.getElementById("ageGenderRiskChart");
  if (
    ageGenderChartElement &&
    typeof Chart !== "undefined" &&
    !ageGenderChartElement.chart
  ) {
    const ageGenderCtx = ageGenderChartElement.getContext("2d");

    // Age groups
    const ageGroups = ["20-35", "36-50", "51-65", "66+"];

    // High risk percentages by gender and age group
    const maleData = [
      Math.round(10 + Math.random() * 5), // 20-35
      Math.round(18 + Math.random() * 7), // 36-50
      Math.round(25 + Math.random() * 10), // 51-65
      Math.round(30 + Math.random() * 10), // 66+
    ];

    const femaleData = [
      Math.round(8 + Math.random() * 4), // 20-35
      Math.round(15 + Math.random() * 6), // 36-50
      Math.round(22 + Math.random() * 8), // 51-65
      Math.round(28 + Math.random() * 10), // 66+
    ];

    // Store the chart instance on the element to prevent double initialization
    ageGenderChartElement.chart = new Chart(ageGenderCtx, {
      type: "bar",
      data: {
        labels: ageGroups,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "rgba(59, 130, 246, 0.7)", // blue
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 40,
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "rgba(236, 72, 153, 0.7)", // pink
            borderColor: "rgba(236, 72, 153, 1)",
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "High Risk Cases by Age Group and Gender (%)",
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
            beginAtZero: true,
            title: {
              display: true,
              text: "Percentage (%)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Age Group",
            },
          },
        },
      },
    });
  }

  // Update summary text based on generated data
  function updateSummaryText(stats) {
    const summaryElement = document.querySelector(".ra-summary");
    if (summaryElement) {
      const summaryHTML = `
        <p class="text-gray-700">
          Risk Assessment services have shown significant growth with a 12.5% increase in total assessments performed. 
          The data indicates a concerning 1.2% increase in high-risk cases, primarily in cardiovascular and metabolic risk categories.
        </p>
        <p class="text-gray-700 mt-4">
          Intervention success rates have improved to ${stats.interventionRate}%, representing a 3.5% increase from the previous year. This improvement 
          is attributed to more targeted intervention strategies and better patient education programs. The most common risk factors 
          identified include hypertension (32%), obesity (28%), and diabetes risk (18%).
        </p>
        <p class="text-gray-700 mt-4">
          Follow-up completion rates have substantially improved to ${stats.followupRate}%, showing a 5.2% increase from the previous year. 
          This improvement reflects better appointment scheduling systems and increased patient engagement. Risk assessment data 
          reveals higher cardiovascular risk in males aged 45-65, while metabolic risks are more evenly distributed across genders.
        </p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }

  // Update summary with our generated stats
  updateSummaryText(raStats);
})();
