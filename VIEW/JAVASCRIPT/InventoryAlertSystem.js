// Simple Inventory Alert System
document.addEventListener("DOMContentLoaded", function () {
  // Basic inventory data
  const inventory = [
    {
      name: "Paracetamol",
      stock: 150,
      minStock: 50,
      demand: [25, 30, 45, 35, 60, 40],
    },
    {
      name: "Amoxicillin",
      stock: 80,
      minStock: 30,
      demand: [20, 35, 25, 40, 55, 30],
    },
    {
      name: "Ibuprofen",
      stock: 120,
      minStock: 40,
      demand: [15, 25, 20, 30, 45, 25],
    },
    {
      name: "Surgical Masks",
      stock: 500,
      minStock: 100,
      demand: [80, 95, 120, 110, 150, 100],
    },
    {
      name: "Latex Gloves",
      stock: 200,
      minStock: 50,
      demand: [40, 55, 65, 50, 85, 60],
    },
  ];

  // Check if demand is high (above average)
  function isHighDemand(demand) {
    const avg = demand.reduce((a, b) => a + b) / demand.length;
    return demand.some((d) => d > avg * 1.3);
  }

  // Check if stock is low
  function isLowStock(item) {
    return item.stock <= item.minStock;
  }

  // Show inventory cards
  function showInventory() {
    const container = document.getElementById("inventoryContainer");
    if (!container) return;

    container.innerHTML = inventory
      .map((item) => {
        const highDemand = isHighDemand(item.demand);
        const lowStock = isLowStock(item);
        const status = lowStock ? "Low Stock" : "In Stock";
        const color = lowStock ? "border-red-500" : "border-green-500";
        const badge = lowStock
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800";

        return `
        <div class="bg-white rounded-lg shadow p-4 border-l-4 ${color}">
          <h3 class="font-bold">${item.name}</h3>
          <p class="text-sm">Stock: ${item.stock}</p>
          <p class="text-sm">Min: ${item.minStock}</p>
          <span class="px-2 py-1 rounded text-xs ${badge}">${status}</span>
          ${
            highDemand
              ? '<p class="text-red-600 text-xs mt-2">⚠️ High demand detected</p>'
              : ""
          }
        </div>
      `;
      })
      .join("");
  }

  // Show alerts
  function showAlerts() {
    const container = document.getElementById("highDemandAlerts");
    if (!container) return;

    const alerts = inventory.filter(
      (item) => isLowStock(item) || isHighDemand(item.demand)
    );

    if (alerts.length === 0) {
      container.innerHTML =
        '<p class="text-center text-gray-500 py-8">No alerts</p>';
      return;
    }

    container.innerHTML = alerts
      .map(
        (item) => `
      <div class="bg-red-50 border border-red-200 rounded p-4 mb-4">
        <h4 class="font-bold text-red-800">${item.name}</h4>
        <p class="text-red-700">Current stock: ${item.stock}</p>
        ${
          isLowStock(item)
            ? '<p class="text-red-700 font-bold">⚠️ REORDER NOW!</p>'
            : ""
        }
        ${
          isHighDemand(item.demand)
            ? '<p class="text-red-700">📈 High demand weeks detected</p>'
            : ""
        }
      </div>
    `
      )
      .join("");
  }

  // Show stats
  function showStats() {
    const container = document.getElementById("statsOverview");
    if (!container) return;

    const lowStockCount = inventory.filter((item) => isLowStock(item)).length;
    const highDemandCount = inventory.filter((item) =>
      isHighDemand(item.demand)
    ).length;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded p-4 shadow">
          <h3 class="text-lg font-bold">${inventory.length}</h3>
          <p class="text-gray-600">Total Items</p>
        </div>
        <div class="bg-white rounded p-4 shadow">
          <h3 class="text-lg font-bold text-red-600">${lowStockCount}</h3>
          <p class="text-gray-600">Low Stock</p>
        </div>
        <div class="bg-white rounded p-4 shadow">
          <h3 class="text-lg font-bold text-yellow-600">${highDemandCount}</h3>
          <p class="text-gray-600">High Demand</p>
        </div>
      </div>
    `;
  }

  // Initialize everything
  function init() {
    showInventory();
    showAlerts();
    showStats();
  }

  // Make functions available globally
  window.InventoryAlertSystem = { init };

  // Start the system
  init();
});
