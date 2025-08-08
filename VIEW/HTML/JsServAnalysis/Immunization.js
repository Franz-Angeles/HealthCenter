// Immunization Module JavaScript
document.addEventListener("DOMContentLoaded", function () {
  console.log("Immunization module loaded");

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
        <p>Immunization services have demonstrated strong growth with a ${yearOverYearChange} increase in total vaccinations administered compared to the previous year. Childhood vaccinations remain the largest segment (68%), followed by adult vaccinations (22%) and specialized immunizations (10%).</p>
        <p>The error rate in vaccine administration has decreased to ${stats.errorRate}%, indicating improved training and protocol adherence. The confidence rate in data accuracy has increased to ${stats.confidenceRate}%, providing a reliable foundation for predictive analytics.</p>
        <p>Based on current trends and seasonal patterns, we predict a ${stats.prediction} increase in vaccination demand for the coming month. This increase coincides with the start of the school year and seasonal vaccine campaigns.</p>
      `;

      summaryElement.innerHTML = summaryHTML;
    }
  }

  // Update summary with our generated stats
  updateSummaryText(immStats);

  // Vaccine type distribution data
  const vaccineTypes = [
    { name: "Childhood Vaccines", percentage: 68 },
    { name: "Adult Vaccines", percentage: 22 },
    { name: "Specialized Vaccines", percentage: 5 },
    { name: "Seasonal Vaccines", percentage: 3 },
    { name: "Others", percentage: 2 },
  ];

  // Potentially display the distribution data if we have elements for it
  const vaccineDistributionElement = document.getElementById(
    "vaccine-distribution"
  );
  if (vaccineDistributionElement) {
    let distributionHTML = "";

    vaccineTypes.forEach((type, index) => {
      const opacity = 0.8 - index * 0.15;
      distributionHTML += `
        <div class="imm-vaccine-type">
          <div class="imm-vaccine-type-dot" style="background-color: rgba(37, 99, 235, ${opacity})"></div>
          <span class="imm-vaccine-type-name">${type.name}</span>
          <span class="imm-vaccine-type-value">${type.percentage}%</span>
        </div>
      `;
    });

    vaccineDistributionElement.innerHTML = distributionHTML;
  }
});
