// Staffing Planner specific functionality
document.addEventListener("DOMContentLoaded", function () {
  // Chart initialization
  const ctx = document.getElementById("staffingChart").getContext("2d");
  let staffingChart;

  function initChart() {
    const labels = [
      "Jul 26",
      "Jul 27",
      "Jul 28",
      "Jul 29",
      "Jul 30",
      "Jul 31",
      "Aug 1",
      "Aug 2",
      "Aug 3",
      "Aug 4",
      "Aug 5",
      "Aug 6",
      "Aug 7",
      "Aug 8",
    ];

    // Predicted patient load data
    const patientLoad = [
      67, 45, 127, 112, 98, 104, 95, 108, 91, 89, 115, 98, 76, 82,
    ];

    // Staff needed based on patient load (rough formula: patients/4 + base staff)
    const staffNeeded = patientLoad.map((load) => Math.ceil(load / 4) + 8);

    // Current available staff
    const currentStaff = [
      16, 14, 24, 24, 24, 24, 24, 26, 26, 24, 28, 26, 20, 22,
    ];

    staffingChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Staff Needed",
            data: staffNeeded,
            borderColor: "#0d9488",
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: "#0d9488",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
          {
            label: "Current Staff",
            data: currentStaff,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
          {
            label: "Optimal Range (Min)",
            data: staffNeeded.map((staff) => Math.floor(staff * 0.9)),
            borderColor: "rgba(34, 197, 94, 0.3)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderWidth: 1,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            borderDash: [5, 5],
          },
          {
            label: "Optimal Range (Max)",
            data: staffNeeded.map((staff) => Math.ceil(staff * 1.1)),
            borderColor: "rgba(34, 197, 94, 0.3)",
            backgroundColor: "rgba(34, 197, 94, 0.05)",
            borderWidth: 1,
            fill: "-1",
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
              filter: function (legendItem, chartData) {
                // Hide the optimal range datasets from legend but keep them in chart
                return !legendItem.text.includes("Optimal Range");
              },
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
                  return `Staff Needed: ${context.parsed.y} people`;
                } else if (context.datasetIndex === 1) {
                  return `Current Staff: ${context.parsed.y} people`;
                } else {
                  return `Optimal Range: ${context.parsed.y} people`;
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
                return value + " staff";
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

  // Generate staffing plan functionality
  const generateButton = document.getElementById("generatePlan");
  const generateText = document.getElementById("generateText");
  const loadingSpinner = document.getElementById("loadingSpinner");

  generateButton.addEventListener("click", () => {
    generateText.textContent = "Generating...";
    loadingSpinner.style.display = "inline-block";
    generateButton.disabled = true;

    // Simulate API call with loading delay
    setTimeout(() => {
      generateText.textContent = "Generate Plan";
      loadingSpinner.style.display = "none";
      generateButton.disabled = false;
      updateStaffingPlan();
    }, 2500);
  });

  function updateStaffingPlan() {
    // Update key metrics with animation
    const metrics = {
      currentStaff: document.getElementById("currentStaff"),
      recommendedStaff: document.getElementById("recommendedStaff"),
      efficiencyScore: document.getElementById("efficiencyScore"),
      peakDay: document.getElementById("peakDay"),
    };

    // Animate number changes
    animateValue(metrics.currentStaff, 24, 26, 1000);
    animateValue(metrics.recommendedStaff, 28, 30, 1000);
    animateValue(metrics.efficiencyScore, 92.5, 94.8, 1000, "%");

    // Update efficiency bar
    setTimeout(() => {
      const efficiencyBar = document.querySelector(".efficiency-bar");
      efficiencyBar.style.width = "94.8%";
    }, 500);

    console.log("Staffing plan updated based on new parameters");
  }

  function animateValue(element, start, end, duration, suffix = "") {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        current = end;
        clearInterval(timer);
      }

      if (suffix === "%") {
        element.textContent = current.toFixed(1) + suffix;
      } else {
        element.textContent = Math.round(current);
      }
    }, 16);
  }

  // Handle form changes
  document
    .getElementById("timePeriod")
    .addEventListener("change", updateStaffingPlan);
  document
    .getElementById("serviceFocus")
    .addEventListener("change", updateStaffingPlan);
  document
    .getElementById("optimizationLevel")
    .addEventListener("change", updateStaffingPlan);

  // Staff allocation by service simulation
  function updateServiceAllocation() {
    const serviceFocus = document.getElementById("serviceFocus").value;
    const optimizationLevel =
      document.getElementById("optimizationLevel").value;

    // This would normally update the service distribution chart
    // For now, we'll just log the changes
    console.log(`Service focus changed to: ${serviceFocus}`);
    console.log(`Optimization level: ${optimizationLevel}`);
  }

  // Staffing recommendations based on patient flow patterns
  function generateStaffingRecommendations() {
    const recommendations = [
      {
        day: "Monday",
        load: "High",
        staffNeeded: 32,
        currentStaff: 24,
        action: "Critical - add 8 staff members",
        priority: "urgent",
      },
      {
        day: "Tuesday",
        load: "Moderate-High",
        staffNeeded: 28,
        currentStaff: 24,
        action: "Add 4 staff members",
        priority: "important",
      },
      {
        day: "Weekend",
        load: "Low",
        staffNeeded: 12,
        currentStaff: 16,
        action: "Reduce to minimal staffing",
        priority: "optimization",
      },
    ];

    return recommendations;
  }

  // Initialize everything when page loads
  initChart();

  // Add some interactive features
  document.querySelectorAll(".metric-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
    });
  });

  // Real-time updates simulation (in a real app, this would come from an API)
  setInterval(() => {
    // Simulate small changes in efficiency score
    const efficiencyElement = document.getElementById("efficiencyScore");
    const currentValue = parseFloat(efficiencyElement.textContent);
    const variation = (Math.random() - 0.5) * 2; // ±1% variation
    const newValue = Math.max(85, Math.min(98, currentValue + variation));

    efficiencyElement.textContent = newValue.toFixed(1) + "%";

    // Update the efficiency bar
    const efficiencyBar = document.querySelector(".efficiency-bar");
    efficiencyBar.style.width = newValue.toFixed(1) + "%";
  }, 30000); // Update every 30 seconds

  console.log("Staffing Planner initialized successfully");
});
