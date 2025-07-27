// Simplified Staffing Planner with Analytics
document.addEventListener("DOMContentLoaded", function () {
  // Chart initialization
  const ctx = document.getElementById("staffingChart").getContext("2d");
  let staffingChart;

  // Sample data
  const staffData = {
    7: {
      labels: [
        "Jul 27",
        "Jul 28",
        "Jul 29",
        "Jul 30",
        "Jul 31",
        "Aug 1",
        "Aug 2",
      ],
      staffNeeded: [12, 32, 28, 25, 26, 24, 18],
      currentStaff: [14, 24, 24, 24, 24, 24, 16],
    },
    14: {
      labels: [
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
        "Aug 9",
      ],
      staffNeeded: [12, 32, 28, 25, 26, 24, 18, 22, 20, 19, 25, 21, 16, 18],
      currentStaff: [14, 24, 24, 24, 24, 24, 16, 20, 20, 20, 22, 22, 18, 18],
    },
  };

  function calculateAnalytics(needed, current) {
    const totalGap = needed.reduce(
      (sum, val, idx) => sum + Math.max(0, val - current[idx]),
      0
    );
    const avgNeeded = Math.round(
      needed.reduce((sum, val) => sum + val, 0) / needed.length
    );
    const avgCurrent = Math.round(
      current.reduce((sum, val) => sum + val, 0) / current.length
    );
    const peakDay = needed.indexOf(Math.max(...needed));
    const efficiency = Math.round(
      (current.reduce((sum, val) => sum + val, 0) /
        needed.reduce((sum, val) => sum + val, 0)) *
        100
    );

    return {
      totalGap,
      avgNeeded,
      avgCurrent,
      peakDay,
      efficiency,
      daysUnderstaffed: needed.filter((val, idx) => val > current[idx]).length,
    };
  }

  function updateAnalytics(period) {
    const data = staffData[period];
    const analytics = calculateAnalytics(data.staffNeeded, data.currentStaff);

    document.getElementById("analytics-content").innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div class="text-center p-2 bg-blue-50 rounded">
          <div class="font-bold text-blue-600">${analytics.avgNeeded}</div>
          <div class="text-gray-600">Avg Needed</div>
        </div>
        <div class="text-center p-2 bg-green-50 rounded">
          <div class="font-bold text-green-600">${analytics.avgCurrent}</div>
          <div class="text-gray-600">Avg Current</div>
        </div>
        <div class="text-center p-2 bg-orange-50 rounded">
          <div class="font-bold text-orange-600">${analytics.totalGap}</div>
          <div class="text-gray-600">Total Gap</div>
        </div>
        <div class="text-center p-2 bg-red-50 rounded">
          <div class="font-bold text-red-600">${
            analytics.daysUnderstaffed
          }</div>
          <div class="text-gray-600">Days Short</div>
        </div>
      </div>
      <div class="mt-3 text-center">
        <span class="text-sm text-gray-600">Staff Efficiency: </span>
        <span class="font-bold ${
          analytics.efficiency >= 90
            ? "text-green-600"
            : analytics.efficiency >= 80
            ? "text-yellow-600"
            : "text-red-600"
        }">${analytics.efficiency}%</span>
        <span class="text-sm text-gray-500 ml-2">Peak: ${
          data.labels[analytics.peakDay]
        }</span>
      </div>
    `;
  }

  function initChart(period = "7") {
    const data = staffData[period];

    if (staffingChart) {
      staffingChart.destroy();
    }

    staffingChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Staff Needed",
            data: data.staffNeeded,
            borderColor: "#0d9488",
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            pointBackgroundColor: "#0d9488",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
          },
          {
            label: "Current Staff",
            data: data.currentStaff,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                weight: "500",
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...data.staffNeeded, ...data.currentStaff) + 5,
            ticks: {
              stepSize: 5,
              font: {
                size: 11,
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          x: {
            ticks: {
              font: {
                size: 11,
              },
            },
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            hoverRadius: 8,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });

    updateAnalytics(period);
  }

  // Initialize chart
  initChart("7");

  // Time period selector functionality
  const timePeriodSelect = document.getElementById("timePeriod");
  if (timePeriodSelect) {
    timePeriodSelect.addEventListener("change", function () {
      const selectedPeriod = this.value;
      initChart(selectedPeriod);
    });
  }
});

// Simple animation for metric cards
document.addEventListener("DOMContentLoaded", function () {
  const metricCards = document.querySelectorAll(
    ".bg-white.rounded-xl.p-6.shadow-sm"
  );

  metricCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100);
    }, index * 100);
  });
});
