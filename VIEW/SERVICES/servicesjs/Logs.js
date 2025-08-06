// System Logs JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the module
  initializeLogsModule();

  // Set up event listeners
  setupEventListeners();

  // Load initial data
  loadLogsData();
});

// Sample logs data (in a real application, this would come from an API)
let logsData = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    user: "Dr. Maria Santos",
    action: "login",
    level: "info",
    description: "logged into the system",
    details: "IP: 192.168.1.45 • Location: Admin Office",
    icon: "fas fa-sign-in-alt",
    color: "green",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    user: "Nurse Jennifer Cruz",
    action: "create",
    level: "info",
    description: "created new health seminar",
    details: 'Event: "Diabetes Prevention Workshop" • Date: Aug 15, 2025',
    icon: "fas fa-calendar-plus",
    color: "blue",
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
    user: "Admin Rodriguez",
    action: "create",
    level: "info",
    description: "added new user account",
    details: "User: Dr. Carlos Martinez • Role: Healthcare Provider",
    icon: "fas fa-user-plus",
    color: "purple",
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    user: "System",
    action: "warning",
    level: "warning",
    description: "detected low inventory alert",
    details:
      "Item: Paracetamol 500mg • Remaining: 15 units • Threshold: 20 units",
    icon: "fas fa-exclamation-triangle",
    color: "yellow",
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: "Dr. Ana Reyes",
    action: "export",
    level: "info",
    description: "exported patient reports",
    details:
      "Report Type: Monthly Health Summary • File: health_report_july_2025.pdf",
    icon: "fas fa-file-export",
    color: "indigo",
  },
  {
    id: 6,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    user: "Nurse Patricia Go",
    action: "update",
    level: "info",
    description: "updated patient record",
    details: "Patient: Juan Dela Cruz • Record ID: HC-2025-0847",
    icon: "fas fa-user-edit",
    color: "green",
  },
  {
    id: 7,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    user: "Unknown",
    action: "error",
    level: "error",
    description: "Failed login attempt detected",
    details:
      "IP: 203.171.45.123 • Attempted User: admin@healthcenter.com • Attempts: 3",
    icon: "fas fa-times-circle",
    color: "red",
  },
  {
    id: 8,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    user: "System",
    action: "system",
    level: "info",
    description: "performed automated backup",
    details: "Backup Size: 2.4 GB • Duration: 3m 42s • Status: Successful",
    icon: "fas fa-database",
    color: "blue",
  },
  {
    id: 9,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    user: "System Admin",
    action: "update",
    level: "info",
    description: "updated security settings",
    details: "Action: Password policy updated • Min length: 8 characters",
    icon: "fas fa-shield-alt",
    color: "purple",
  },
  {
    id: 10,
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000), // Yesterday
    user: "Dr. Roberto Silva",
    action: "logout",
    level: "info",
    description: "logged out of the system",
    details: "Session Duration: 4h 23m • Last Activity: Patient consultation",
    icon: "fas fa-sign-out-alt",
    color: "green",
  },
];

let filteredLogs = [...logsData];
let currentPage = 1;
const logsPerPage = 10;

function initializeLogsModule() {
  console.log("Initializing System Logs module...");
  updateStatistics();
}

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 300));
  }

  // Filter functionality
  const actionFilter = document.getElementById("actionFilter");
  const levelFilter = document.getElementById("levelFilter");
  const dateFilter = document.getElementById("dateFilter");

  if (actionFilter) actionFilter.addEventListener("change", applyFilters);
  if (levelFilter) levelFilter.addEventListener("change", applyFilters);
  if (dateFilter) dateFilter.addEventListener("change", applyFilters);

  // Export functionality
  const exportBtn = document.getElementById("exportBtn");
  const exportModal = document.getElementById("exportModal");
  const closeExportModal = document.getElementById("closeExportModal");
  const cancelExportBtn = document.getElementById("cancelExportBtn");
  const exportForm = document.getElementById("exportForm");

  if (exportBtn)
    exportBtn.addEventListener("click", () => showModal("exportModal"));
  if (closeExportModal)
    closeExportModal.addEventListener("click", () => hideModal("exportModal"));
  if (cancelExportBtn)
    cancelExportBtn.addEventListener("click", () => hideModal("exportModal"));
  if (exportForm) exportForm.addEventListener("submit", handleExport);

  // Clear logs functionality
  const clearLogsBtn = document.getElementById("clearLogsBtn");
  const clearModal = document.getElementById("clearModal");
  const cancelClearBtn = document.getElementById("cancelClearBtn");
  const confirmClearBtn = document.getElementById("confirmClearBtn");

  if (clearLogsBtn)
    clearLogsBtn.addEventListener("click", () => showModal("clearModal"));
  if (cancelClearBtn)
    cancelClearBtn.addEventListener("click", () => hideModal("clearModal"));
  if (confirmClearBtn)
    confirmClearBtn.addEventListener("click", handleClearLogs);

  // Load more functionality
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) loadMoreBtn.addEventListener("click", loadMoreLogs);

  // Pagination
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn)
    prevBtn.addEventListener("click", () => changePage(currentPage - 1));
  if (nextBtn)
    nextBtn.addEventListener("click", () => changePage(currentPage + 1));
}

function loadLogsData() {
  renderLogs();
  updatePagination();
}

function renderLogs() {
  const container = document.getElementById("logsContainer");
  if (!container) return;

  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const logsToShow = filteredLogs.slice(startIndex, endIndex);

  container.innerHTML = "";

  logsToShow.forEach((log) => {
    const logElement = createLogElement(log);
    container.appendChild(logElement);
  });

  // Add fade-in animation
  container.querySelectorAll(".log-entry").forEach((entry, index) => {
    entry.style.animationDelay = `${index * 0.1}s`;
    entry.classList.add("fade-in");
  });
}

function createLogElement(log) {
  const div = document.createElement("div");
  div.className = `log-entry border-l-4 border-${log.color}-500 pl-4 py-3 bg-${log.color}-50 rounded-r-lg`;

  div.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <i class="${log.icon} text-${log.color}-600"></i>
                </div>
                <div>
                    <p class="font-medium text-gray-900">
                        ${
                          log.user !== "System" && log.user !== "Unknown"
                            ? `<span class="text-indigo-600">${log.user}</span> ${log.description}`
                            : log.description
                        }
                    </p>
                    <p class="text-sm text-gray-500">${log.details}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-medium text-gray-900 capitalize">${
                  log.action
                }</p>
                <p class="text-xs text-gray-500">${formatTimeAgo(
                  log.timestamp
                )}</p>
            </div>
        </div>
    `;

  return div;
}

function formatTimeAgo(timestamp) {
  const now = new Date();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return timestamp.toLocaleDateString();
}

function updateStatistics() {
  const totalLogsEl = document.getElementById("totalLogs");
  const todayLogsEl = document.getElementById("todayLogs");
  const warningLogsEl = document.getElementById("warningLogs");
  const errorLogsEl = document.getElementById("errorLogs");

  if (totalLogsEl) totalLogsEl.textContent = logsData.length.toLocaleString();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLogs = logsData.filter((log) => log.timestamp >= today);
  if (todayLogsEl) todayLogsEl.textContent = todayLogs.length;

  const warningLogs = logsData.filter((log) => log.level === "warning");
  if (warningLogsEl) warningLogsEl.textContent = warningLogs.length;

  const errorLogs = logsData.filter((log) => log.level === "error");
  if (errorLogsEl) errorLogsEl.textContent = errorLogs.length;
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  applyFilters();
}

function applyFilters() {
  const searchTerm =
    document.getElementById("searchInput")?.value.toLowerCase() || "";
  const actionFilter = document.getElementById("actionFilter")?.value || "";
  const levelFilter = document.getElementById("levelFilter")?.value || "";
  const dateFilter = document.getElementById("dateFilter")?.value || "";

  filteredLogs = logsData.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm) ||
      log.description.toLowerCase().includes(searchTerm) ||
      log.details.toLowerCase().includes(searchTerm);

    const matchesAction = !actionFilter || log.action === actionFilter;
    const matchesLevel = !levelFilter || log.level === levelFilter;

    let matchesDate = true;
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const logDate = new Date(log.timestamp);
      matchesDate = logDate.toDateString() === filterDate.toDateString();
    }

    return matchesSearch && matchesAction && matchesLevel && matchesDate;
  });

  currentPage = 1;
  renderLogs();
  updatePagination();
}

function changePage(page) {
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderLogs();
  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startRange = (currentPage - 1) * logsPerPage + 1;
  const endRange = Math.min(currentPage * logsPerPage, filteredLogs.length);

  const startRangeEl = document.getElementById("startRange");
  const endRangeEl = document.getElementById("endRange");
  const totalRecordsEl = document.getElementById("totalRecords");

  if (startRangeEl) startRangeEl.textContent = startRange;
  if (endRangeEl) endRangeEl.textContent = endRange;
  if (totalRecordsEl)
    totalRecordsEl.textContent = filteredLogs.length.toLocaleString();

  // Update pagination buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function loadMoreLogs() {
  // Simulate loading more logs from server
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      // Add some sample logs
      const newLogs = generateSampleLogs(5);
      logsData = [...logsData, ...newLogs];
      applyFilters();

      loadMoreBtn.innerHTML =
        '<i class="fas fa-refresh mr-2"></i>Load More Logs';
      loadMoreBtn.disabled = false;

      showAlert("New logs loaded successfully!", "success");
    }, 1500);
  }
}

function generateSampleLogs(count) {
  const sampleActions = [
    "view",
    "update",
    "delete",
    "export",
    "login",
    "logout",
  ];
  const sampleUsers = [
    "Dr. Sarah Johnson",
    "Nurse Mike Torres",
    "Admin Lisa Chen",
    "Dr. Robert Kim",
  ];
  const newLogs = [];

  for (let i = 0; i < count; i++) {
    const action =
      sampleActions[Math.floor(Math.random() * sampleActions.length)];
    const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];

    newLogs.push({
      id: logsData.length + i + 1,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last week
      user: user,
      action: action,
      level: "info",
      description: `performed ${action} action`,
      details: `Sample activity performed by ${user}`,
      icon: getIconForAction(action),
      color: getColorForAction(action),
    });
  }

  return newLogs;
}

function getIconForAction(action) {
  const iconMap = {
    login: "fas fa-sign-in-alt",
    logout: "fas fa-sign-out-alt",
    create: "fas fa-plus",
    update: "fas fa-edit",
    delete: "fas fa-trash",
    view: "fas fa-eye",
    export: "fas fa-download",
  };
  return iconMap[action] || "fas fa-info-circle";
}

function getColorForAction(action) {
  const colorMap = {
    login: "green",
    logout: "blue",
    create: "purple",
    update: "indigo",
    delete: "red",
    view: "gray",
    export: "yellow",
  };
  return colorMap[action] || "gray";
}

function handleExport(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const exportData = {
    dateFrom:
      formData.get("exportDateFrom") ||
      document.getElementById("exportDateFrom").value,
    dateTo:
      formData.get("exportDateTo") ||
      document.getElementById("exportDateTo").value,
    level:
      formData.get("exportLevel") ||
      document.getElementById("exportLevel").value,
    format:
      formData.get("exportFormat") ||
      document.getElementById("exportFormat").value,
  };

  // Simulate export process
  hideModal("exportModal");
  showAlert(
    "Export started! You will be notified when the file is ready for download.",
    "success"
  );

  // Simulate download after 3 seconds
  setTimeout(() => {
    const filename = `audit_logs_${new Date().toISOString().split("T")[0]}.${
      exportData.format
    }`;
    showAlert(`Export completed! File: ${filename}`, "success");
  }, 3000);
}

function handleClearLogs() {
  const clearPeriod = document.getElementById("clearPeriod").value;
  const cutoffDate = new Date();
  const daysToSubtract = parseInt(clearPeriod) || 30; // Default to 30 days if NaN
  cutoffDate.setDate(cutoffDate.getDate() - daysToSubtract);

  const initialCount = logsData.length;
  logsData = logsData.filter((log) => log.timestamp > cutoffDate);
  const removedCount = initialCount - logsData.length;

  hideModal("clearModal");
  applyFilters();
  updateStatistics();

  showAlert(`Successfully removed ${removedCount} old log entries.`, "success");
}

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} fixed top-20 right-4 z-50 max-w-sm`;
  alertDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            } mr-2"></i>
            <span>${message}</span>
            <button class="ml-auto text-lg" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

  document.body.appendChild(alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.remove();
    }
  }, 5000);
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for potential external use
window.LogsModule = {
  addLog: function (logEntry) {
    logsData.unshift({
      id: logsData.length + 1,
      timestamp: new Date(),
      ...logEntry,
    });
    applyFilters();
    updateStatistics();
  },

  clearFilters: function () {
    document.getElementById("searchInput").value = "";
    document.getElementById("actionFilter").value = "";
    document.getElementById("levelFilter").value = "";
    document.getElementById("dateFilter").value = "";
    applyFilters();
  },

  exportLogs: function (options = {}) {
    // Programmatic export function
    console.log("Exporting logs with options:", options);
  },
};
