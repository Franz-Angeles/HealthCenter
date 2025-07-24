// Patient Flow Forecast specific functionality
document.addEventListener("DOMContentLoaded", function () {
  // Service chips functionality
  const serviceChips = document.querySelectorAll(".service-chip");
  const serviceFilter = document.getElementById("serviceFilter");

  serviceChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      serviceChips.forEach((c) => c.classList.remove("selected"));
      chip.classList.add("selected");
      serviceFilter.value = chip.dataset.service;
      updateForecast();
    });
  });

  // Generate forecast button
  const generateButton = document.getElementById("generateForecast");
  const generateText = document.getElementById("generateText");
  const loadingSpinner = document.getElementById("loadingSpinner");

  generateButton.addEventListener("click", () => {
    generateText.textContent = "Generating...";
    loadingSpinner.style.display = "inline-block";
    generateButton.disabled = true;

    setTimeout(() => {
      generateText.textContent = "Generate Forecast";
      loadingSpinner.style.display = "none";
      generateButton.disabled = false;
      updateForecast();
    }, 2000);
  });

  // Chart initialization
  const ctx = document.getElementById("forecastChart").getContext("2d");
  let forecastChart;

  function initChart() {
    const labels = [
      "Jul 25",
      "Jul 26",
      "Jul 27",
      "Jul 28",
      "Jul 29",
      "Jul 30",
      "Jul 31",
      "Aug 1",
      "Aug 2",
      "Aug 3",
    ];
    const data = [89, 67, 45, 127, 112, 98, 104, 95, 108, 91];
    const confidenceUpper = [101, 76, 52, 139, 123, 107, 114, 105, 119, 102];
    const confidenceLower = [78, 58, 38, 115, 101, 89, 94, 85, 97, 80];

    forecastChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Predicted Visits",
            data: data,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
          {
            label: "Upper Confidence",
            data: confidenceUpper,
            borderColor: "rgba(59, 130, 246, 0.3)",
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            borderWidth: 1,
            fill: "+1",
            tension: 0.4,
            pointRadius: 0,
            borderDash: [5, 5],
          },
          {
            label: "Lower Confidence",
            data: confidenceLower,
            borderColor: "rgba(59, 130, 246, 0.3)",
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            borderWidth: 1,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#374151",
            bodyColor: "#374151",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                if (context.datasetIndex === 0) {
                  return `Predicted: ${context.parsed.y} patients`;
                } else if (context.datasetIndex === 1) {
                  return `Upper bound: ${context.parsed.y} patients`;
                } else {
                  return `Lower bound: ${context.parsed.y} patients`;
                }
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#6b7280",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(107, 114, 128, 0.1)",
            },
            ticks: {
              color: "#6b7280",
              callback: function (value) {
                return value + " patients";
              },
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });
  }

  function updateForecast() {
    // Simulate forecast update
    console.log("Updating forecast...");
    // In real implementation, this would make an API call
  }

  // Initialize chart when page loads
  document.addEventListener("DOMContentLoaded", function () {
    initChart();
  });

  // Handle form changes
  document
    .getElementById("forecastPeriod")
    .addEventListener("change", updateForecast);
  document
    .getElementById("serviceFilter")
    .addEventListener("change", function () {
      const selectedService = this.value;
      serviceChips.forEach((chip) => {
        chip.classList.remove("selected");
        if (chip.dataset.service === selectedService) {
          chip.classList.add("selected");
        }
      });
      updateForecast();
    });
  document
    .getElementById("confidenceLevel")
    .addEventListener("change", updateForecast);
}); // Close the DOMContentLoaded event listener
