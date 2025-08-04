// Seasonality Explorer JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sample data for demonstration
  const seasonalData = {
    2024: {
      months: [
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
      ],
      allServices: [220, 180, 280, 240, 260, 380, 450, 520, 480, 350, 200, 160],
      dengue: [5, 3, 8, 12, 25, 45, 85, 120, 95, 40, 15, 8],
      flu: [85, 95, 60, 30, 20, 15, 10, 12, 18, 35, 75, 90],
      vaccination: [25, 20, 85, 95, 80, 30, 25, 20, 25, 40, 35, 30],
      checkup: [80, 70, 90, 85, 95, 100, 110, 120, 115, 95, 80, 75],
      maternal: [25, 25, 37, 38, 40, 90, 220, 273, 227, 140, 35, 22],
    },
    2023: {
      months: [
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
      ],
      allServices: [200, 170, 260, 220, 240, 360, 420, 480, 450, 320, 180, 150],
      dengue: [8, 5, 10, 15, 30, 50, 90, 110, 85, 35, 12, 6],
      flu: [90, 100, 65, 35, 25, 18, 12, 15, 20, 40, 80, 95],
      vaccination: [20, 18, 80, 90, 75, 25, 20, 18, 20, 35, 30, 25],
      checkup: [75, 65, 85, 80, 90, 95, 105, 115, 110, 90, 75, 70],
      maternal: [20, 22, 35, 35, 38, 85, 200, 250, 215, 130, 30, 20],
    },
    2022: {
      months: [
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
      ],
      allServices: [190, 160, 250, 210, 230, 340, 400, 460, 430, 300, 170, 140],
      dengue: [10, 7, 12, 18, 35, 55, 95, 105, 80, 30, 10, 4],
      flu: [95, 105, 70, 40, 30, 20, 15, 18, 25, 45, 85, 100],
      vaccination: [18, 15, 75, 85, 70, 20, 18, 15, 18, 30, 25, 20],
      checkup: [70, 60, 80, 75, 85, 90, 100, 110, 105, 85, 70, 65],
      maternal: [18, 20, 32, 32, 35, 80, 190, 230, 200, 120, 28, 18],
    },
  };

  let currentYear = "2024";
  let currentService = "all";
  let chartType = "line";
  let monthlyChart = null;
  let historicalChart = null;

  // Initialize charts
  initializeCharts();

  // Event listeners
  document
    .getElementById("yearSelect")
    .addEventListener("change", function (e) {
      currentYear = e.target.value;
      updateCharts();
    });

  document
    .getElementById("serviceSelect")
    .addEventListener("change", function (e) {
      currentService = e.target.value;
      updateCharts();
    });

  document.getElementById("refreshData").addEventListener("click", function () {
    // Simulate data refresh with loading state
    this.innerHTML = "Refreshing...";
    this.disabled = true;

    setTimeout(() => {
      updateCharts();
      this.innerHTML = "Refresh Data";
      this.disabled = false;
    }, 1000);
  });

  document
    .getElementById("chartTypeBtn")
    .addEventListener("click", function () {
      chartType = chartType === "line" ? "bar" : "line";
      this.textContent =
        chartType === "line" ? "Switch to Bar Chart" : "Switch to Line Chart";
      updateMonthlyChart();
    });

  // Heatmap interactions
  document.querySelectorAll(".heatmap-cell").forEach((cell) => {
    cell.addEventListener("click", function () {
      const month = this.getAttribute("data-month");
      const visits = this.getAttribute("data-visits");
      showMonthDetails(month, visits);
    });
  });

  document
    .getElementById("closeDetails")
    ?.addEventListener("click", function () {
      document.getElementById("monthDetails").classList.add("hidden");
    });

  function showMonthDetails(month, visits) {
    const detailsPanel = document.getElementById("monthDetails");
    const monthElement = document.getElementById("selectedMonth");
    const visitsElement = document.getElementById("monthVisits");
    const trendElement = document.getElementById("monthTrend");

    if (detailsPanel && monthElement && visitsElement && trendElement) {
      monthElement.textContent = `${month} 2024 Details`;
      visitsElement.textContent = visits;

      // Calculate trend (mock calculation)
      const visitNum = parseInt(visits) || 0;
      const trend = visitNum > 300 ? "+15%" : visitNum > 200 ? "+5%" : "-8%";
      const trendClass =
        visitNum > 300
          ? "text-red-600"
          : visitNum > 200
          ? "text-green-600"
          : "text-blue-600";

      trendElement.textContent = trend;
      trendElement.className = `text-lg font-bold ${trendClass}`;

      detailsPanel.classList.remove("hidden");
    }
  }

  function initializeCharts() {
    createMonthlyTrendChart();
    createHistoricalComparisonChart();
  }

  function createMonthlyTrendChart() {
    const ctx = document.getElementById("monthlyTrendChart").getContext("2d");

    monthlyChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: seasonalData[currentYear].months,
        datasets: [
          {
            label: getServiceLabel(),
            data: getCurrentServiceData(),
            borderColor: getServiceColor(),
            backgroundColor: getServiceColor(0.1),
            borderWidth: 3,
            fill: chartType === "line",
            tension: 0.4,
            pointBackgroundColor: getServiceColor(),
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
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
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: getServiceColor(),
            borderWidth: 1,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label + " " + currentYear;
              },
              label: function (context) {
                const label = context.dataset.label || "";
                const value = context.parsed.y;
                return label + ": " + value + " visits";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return value + " visits";
              },
            },
          },
          x: {
            grid: {
              display: false,
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

  function createHistoricalComparisonChart() {
    const ctx = document
      .getElementById("historicalComparisonChart")
      .getContext("2d");

    historicalChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: seasonalData["2024"].months,
        datasets: [
          {
            label: "2024",
            data: seasonalData["2024"][getServiceKey()],
            borderColor: "#ea580c",
            backgroundColor: "rgba(234, 88, 12, 0.1)",
            borderWidth: 3,
            tension: 0.4,
          },
          {
            label: "2023",
            data: seasonalData["2023"][getServiceKey()],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "2022",
            data: seasonalData["2022"][getServiceKey()],
            borderColor: "#6b7280",
            backgroundColor: "rgba(107, 114, 128, 0.1)",
            borderWidth: 2,
            tension: 0.4,
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
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
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

  function updateCharts() {
    updateMonthlyChart();
    updateHistoricalChart();
    updateInsightCards();
  }

  function updateMonthlyChart() {
    if (monthlyChart) {
      monthlyChart.destroy();
    }
    createMonthlyTrendChart();
  }

  function updateHistoricalChart() {
    if (historicalChart) {
      historicalChart.data.datasets[0].data =
        seasonalData["2024"][getServiceKey()];
      historicalChart.data.datasets[1].data =
        seasonalData["2023"][getServiceKey()];
      historicalChart.data.datasets[2].data =
        seasonalData["2022"][getServiceKey()];
      historicalChart.update();
    }
  }

  function updateInsightCards() {
    // Update dynamic content based on current selections
    const data = getCurrentServiceData();
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const peakMonth = seasonalData[currentYear].months[data.indexOf(maxValue)];
    const lowMonth = seasonalData[currentYear].months[data.indexOf(minValue)];

    // Update peak season card
    const peakCard = document.querySelector(
      ".bg-gradient-to-br.from-red-500 h3"
    );
    if (peakCard) {
      peakCard.textContent = peakMonth;
    }

    // Update low season card
    const lowCard = document.querySelector(
      ".bg-gradient-to-br.from-blue-500 h3"
    );
    if (lowCard) {
      lowCard.textContent = lowMonth;
    }
  }

  function getCurrentServiceData() {
    const serviceKey = getServiceKey();
    return seasonalData[currentYear][serviceKey];
  }

  function getServiceKey() {
    const serviceMap = {
      all: "allServices",
      dengue: "dengue",
      flu: "flu",
      vaccination: "vaccination",
      checkup: "checkup",
      maternal: "maternal",
    };
    return serviceMap[currentService] || "allServices";
  }

  function getServiceLabel() {
    const labelMap = {
      all: "All Services",
      dengue: "Dengue Treatment",
      flu: "Flu/Cold Treatment",
      vaccination: "Vaccination",
      checkup: "General Checkup",
      maternal: "Maternal Care",
    };
    return labelMap[currentService] || "All Services";
  }

  function getServiceColor(alpha = 1) {
    const colorMap = {
      all: `rgba(234, 88, 12, ${alpha})`,
      dengue: `rgba(239, 68, 68, ${alpha})`,
      flu: `rgba(59, 130, 246, ${alpha})`,
      vaccination: `rgba(34, 197, 94, ${alpha})`,
      checkup: `rgba(168, 85, 247, ${alpha})`,
      maternal: `rgba(236, 72, 153, ${alpha})`,
    };
    return colorMap[currentService] || `rgba(234, 88, 12, ${alpha})`;
  }

  // Simulate real-time data updates
  setInterval(function () {
    // Add small random variations to simulate live data
    const data = getCurrentServiceData();
    const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
    const currentMonth = new Date().getMonth();

    if (data[currentMonth]) {
      data[currentMonth] = Math.max(0, data[currentMonth] + variation);
    }
  }, 30000); // Update every 30 seconds

  console.log("Seasonality Explorer initialized successfully");
});
