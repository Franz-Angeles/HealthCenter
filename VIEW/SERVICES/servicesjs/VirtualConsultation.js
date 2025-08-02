// Virtual Consultation Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the application
  initializeVirtualConsultation();
});

function initializeVirtualConsultation() {
  // Bind event listeners
  bindEventListeners();

  // Update statistics
  updateStatistics();

  // Initialize filters
  initializeFilters();

  // Set up real-time updates (simulation)
  setUpRealTimeUpdates();
}

function bindEventListeners() {
  // Action buttons
  bindActionButtons();

  // Modal functionality
  bindModalEvents();

  // Available Schedules functionality
  bindScheduleEvents();

  // Search and filter functionality
  bindSearchAndFilter();

  // Pagination
  bindPagination();
}

function bindActionButtons() {
  // Approve buttons
  document.querySelectorAll(".approve-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      const patientName = row.querySelector(
        ".text-sm.font-medium.text-gray-900"
      ).textContent;
      handleApproveRequest(row, patientName);
    });
  });

  // Reject buttons
  document.querySelectorAll(".reject-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      const patientName = row.querySelector(
        ".text-sm.font-medium.text-gray-900"
      ).textContent;
      handleRejectRequest(row, patientName);
    });
  });

  // View buttons
  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      showRequestDetails(row);
    });
  });

  // Reschedule buttons
  document.querySelectorAll(".reschedule-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      const patientName = row.querySelector(
        ".text-sm.font-medium.text-gray-900"
      ).textContent;
      handleRescheduleRequest(row, patientName);
    });
  });

  // Reconsider buttons
  document.querySelectorAll(".reconsider-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      const patientName = row.querySelector(
        ".text-sm.font-medium.text-gray-900"
      ).textContent;
      handleReconsiderRequest(row, patientName);
    });
  });
}

function bindModalEvents() {
  const modal = document.getElementById("requestModal");
  const closeButton = document.getElementById("closeModal");
  const cancelButton = document.getElementById("modalCancel");
  const approveButton = document.getElementById("modalApprove");
  const rejectButton = document.getElementById("modalReject");

  // Close modal events
  [closeButton, cancelButton].forEach((button) => {
    button.addEventListener("click", function () {
      hideModal();
    });
  });

  // Click outside to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // ESC key to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      hideModal();
    }
  });

  // Modal action buttons
  approveButton.addEventListener("click", function () {
    const currentRow = modal.dataset.currentRow;
    if (currentRow) {
      const row = document.querySelector(`[data-row-id="${currentRow}"]`);
      const patientName = row.querySelector(
        ".text-sm.font-medium.text-gray-900"
      ).textContent;
      handleApproveRequest(row, patientName);
      hideModal();
    }
  });

  rejectButton.addEventListener("click", function () {
    const currentRow = modal.dataset.currentRow;
    if (currentRow) {
      const row = document.querySelector(`[data-row-id="${currentRow}"]`);
      const patientName = row.querySelector(
        ".text-sm.font-medium.text-gray-900"
      ).textContent;
      handleRejectRequest(row, patientName);
      hideModal();
    }
  });
}

function bindSearchAndFilter() {
  // Search functionality
  const searchInput = document.querySelector(
    'input[placeholder="Search patients..."]'
  );
  const filterSelect = document.querySelector("select");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      filterTable(searchTerm, filterSelect.value);
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", function () {
      const searchTerm = searchInput.value.toLowerCase();
      filterTable(searchTerm, this.value);
    });
  }
}

function bindPagination() {
  // Pagination functionality (simulate for now)
  document.querySelectorAll(".pagination a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Simulate page change
      console.log("Page changed to:", this.textContent);
      // Here you would typically make an API call to fetch new data
    });
  });
}

function bindScheduleEvents() {
  // Available Schedules button
  const availableSchedulesBtn = document.getElementById(
    "availableSchedulesBtn"
  );
  if (availableSchedulesBtn) {
    availableSchedulesBtn.addEventListener("click", function () {
      showAvailableSchedulesModal();
    });
  }

  // Close Available Schedules Modal
  const closeSchedulesModal = document.getElementById("closeSchedulesModal");
  const closeSchedulesModalBtn = document.getElementById(
    "closeSchedulesModalBtn"
  );
  if (closeSchedulesModal) {
    closeSchedulesModal.addEventListener("click", function () {
      hideAvailableSchedulesModal();
    });
  }
  if (closeSchedulesModalBtn) {
    closeSchedulesModalBtn.addEventListener("click", function () {
      hideAvailableSchedulesModal();
    });
  }

  // Add Schedule button
  const addScheduleBtn = document.getElementById("addScheduleBtn");
  if (addScheduleBtn) {
    addScheduleBtn.addEventListener("click", function () {
      showAddScheduleModal();
    });
  }

  // Close Add Schedule Modal
  const closeAddScheduleModal = document.getElementById(
    "closeAddScheduleModal"
  );
  const cancelAddSchedule = document.getElementById("cancelAddSchedule");
  if (closeAddScheduleModal) {
    closeAddScheduleModal.addEventListener("click", function () {
      hideAddScheduleModal();
    });
  }
  if (cancelAddSchedule) {
    cancelAddSchedule.addEventListener("click", function () {
      hideAddScheduleModal();
    });
  }

  // Save Schedule
  const saveSchedule = document.getElementById("saveSchedule");
  if (saveSchedule) {
    saveSchedule.addEventListener("click", function () {
      handleSaveSchedule();
    });
  }

  // Schedule filters
  const doctorFilter = document.getElementById("doctorFilter");
  const dateFilter = document.getElementById("dateFilter");
  const statusFilter = document.getElementById("statusFilter");

  if (doctorFilter) {
    doctorFilter.addEventListener("change", function () {
      filterSchedules();
    });
  }
  if (dateFilter) {
    dateFilter.addEventListener("change", function () {
      filterSchedules();
    });
  }
  if (statusFilter) {
    statusFilter.addEventListener("change", function () {
      filterSchedules();
    });
  }

  // Click outside to close modals
  const availableSchedulesModal = document.getElementById(
    "availableSchedulesModal"
  );
  const addScheduleModal = document.getElementById("addScheduleModal");

  if (availableSchedulesModal) {
    availableSchedulesModal.addEventListener("click", function (e) {
      if (e.target === availableSchedulesModal) {
        hideAvailableSchedulesModal();
      }
    });
  }

  if (addScheduleModal) {
    addScheduleModal.addEventListener("click", function (e) {
      if (e.target === addScheduleModal) {
        hideAddScheduleModal();
      }
    });
  }

  // ESC key handling for schedule modals
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const availableSchedulesModal = document.getElementById(
        "availableSchedulesModal"
      );
      const addScheduleModal = document.getElementById("addScheduleModal");

      if (
        availableSchedulesModal &&
        !availableSchedulesModal.classList.contains("hidden")
      ) {
        hideAvailableSchedulesModal();
      }
      if (addScheduleModal && !addScheduleModal.classList.contains("hidden")) {
        hideAddScheduleModal();
      }
    }
  });
}

function handleApproveRequest(row, patientName) {
  // Show loading state
  setRowLoading(row, true);

  // Simulate API call
  setTimeout(() => {
    // Update status badge
    const statusBadge = row.querySelector("td:nth-last-child(2) span");
    statusBadge.className =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800";
    statusBadge.textContent = "Approved";

    // Update action buttons
    const actionCell = row.querySelector("td:last-child .flex");
    actionCell.innerHTML = `
            <button disabled class="bg-gray-300 text-gray-500 px-3 py-1 rounded-md text-sm cursor-not-allowed">
                <i class="fas fa-check mr-1"></i>Approved
            </button>
            <button class="view-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-eye mr-1"></i>View
            </button>
            <button class="reschedule-btn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-calendar mr-1"></i>Reschedule
            </button>
        `;

    // Rebind new buttons
    bindActionButtons();

    // Remove loading state
    setRowLoading(row, false);

    // Show success notification
    showNotification(
      `Request from ${patientName} has been approved.`,
      "success"
    );

    // Update statistics
    updateStatistics();
  }, 1000);
}

function handleRejectRequest(row, patientName) {
  // Show confirmation dialog
  if (
    !confirm(`Are you sure you want to reject the request from ${patientName}?`)
  ) {
    return;
  }

  // Show loading state
  setRowLoading(row, true);

  // Simulate API call
  setTimeout(() => {
    // Update status badge
    const statusBadge = row.querySelector("td:nth-last-child(2) span");
    statusBadge.className =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800";
    statusBadge.textContent = "Rejected";

    // Update action buttons
    const actionCell = row.querySelector("td:last-child .flex");
    actionCell.innerHTML = `
            <button disabled class="bg-gray-300 text-gray-500 px-3 py-1 rounded-md text-sm cursor-not-allowed">
                <i class="fas fa-times mr-1"></i>Rejected
            </button>
            <button class="view-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-eye mr-1"></i>View
            </button>
            <button class="reconsider-btn bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-redo mr-1"></i>Reconsider
            </button>
        `;

    // Rebind new buttons
    bindActionButtons();

    // Remove loading state
    setRowLoading(row, false);

    // Show notification
    showNotification(`Request from ${patientName} has been rejected.`, "error");

    // Update statistics
    updateStatistics();
  }, 1000);
}

function handleRescheduleRequest(row, patientName) {
  showNotification(
    `Reschedule functionality for ${patientName} - Feature coming soon!`,
    "info"
  );
}

function handleReconsiderRequest(row, patientName) {
  // Show loading state
  setRowLoading(row, true);

  // Simulate API call
  setTimeout(() => {
    // Update status badge
    const statusBadge = row.querySelector("td:nth-last-child(2) span");
    statusBadge.className =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800";
    statusBadge.textContent = "Pending";

    // Update action buttons
    const actionCell = row.querySelector("td:last-child .flex");
    actionCell.innerHTML = `
            <button class="approve-btn bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-check mr-1"></i>Approve
            </button>
            <button class="reject-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-times mr-1"></i>Reject
            </button>
            <button class="view-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                <i class="fas fa-eye mr-1"></i>View
            </button>
        `;

    // Rebind new buttons
    bindActionButtons();

    // Remove loading state
    setRowLoading(row, false);

    // Show notification
    showNotification(
      `Request from ${patientName} has been moved back to pending review.`,
      "info"
    );

    // Update statistics
    updateStatistics();
  }, 1000);
}

function showRequestDetails(row) {
  const modal = document.getElementById("requestModal");
  const modalContent = document.getElementById("modalContent");

  // Extract data from row
  const patientName = row.querySelector(
    ".text-sm.font-medium.text-gray-900"
  ).textContent;
  const patientEmail = row.querySelector(".text-sm.text-gray-500").textContent;
  const patientAge = row.querySelectorAll(".text-sm.text-gray-500")[1]
    .textContent;
  const schedule = row
    .querySelectorAll("td")[1]
    .querySelector(".font-medium").textContent;
  const time = row
    .querySelectorAll("td")[1]
    .querySelector(".text-gray-500").textContent;
  const consultationType = row
    .querySelectorAll("td")[2]
    .querySelector("span").textContent;
  const description = row.querySelectorAll("td")[3].textContent.trim();
  const priority = row
    .querySelectorAll("td")[4]
    .querySelector("span").textContent;
  const status = row
    .querySelectorAll("td")[5]
    .querySelector("span").textContent;

  // Generate random additional details
  const additionalDetails = generateAdditionalDetails();

  // Populate modal content
  modalContent.innerHTML = `
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Patient Name</label>
                    <p class="mt-1 text-sm text-gray-900">${patientName}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <p class="mt-1 text-sm text-gray-900">${patientEmail}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Age</label>
                    <p class="mt-1 text-sm text-gray-900">${patientAge}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Contact Number</label>
                    <p class="mt-1 text-sm text-gray-900">${
                      additionalDetails.phone
                    }</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <p class="mt-1 text-sm text-gray-900">${schedule}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Preferred Time</label>
                    <p class="mt-1 text-sm text-gray-900">${time}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Consultation Type</label>
                    <p class="mt-1 text-sm text-gray-900">${consultationType}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Priority</label>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(
                      priority
                    )}">${priority}</span>
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">${description}</p>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700">Medical History</label>
                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">${
                  additionalDetails.medicalHistory
                }</p>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700">Current Status</label>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                  status
                )}">${status}</span>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700">Request Submitted</label>
                <p class="mt-1 text-sm text-gray-900">${
                  additionalDetails.submittedDate
                }</p>
            </div>
        </div>
    `;

  // Store current row reference
  modal.dataset.currentRow = row.dataset.rowId || Date.now();
  row.dataset.rowId = modal.dataset.currentRow;

  // Show modal
  modal.classList.remove("hidden");
}

function generateAdditionalDetails() {
  const phones = [
    "+63 912 345 6789",
    "+63 923 456 7890",
    "+63 934 567 8901",
    "+63 945 678 9012",
  ];
  const histories = [
    "No known allergies. Previous history of hypertension, currently on medication.",
    "Allergic to penicillin. History of diabetes type 2, managed with diet and exercise.",
    "No significant medical history. Occasional migraines.",
    "History of asthma, uses inhaler as needed. No other significant conditions.",
    "Previous surgery for appendicitis in 2018. No current medications.",
  ];

  const dates = [
    "Aug 1, 2025 at 9:30 AM",
    "Aug 1, 2025 at 2:15 PM",
    "Aug 2, 2025 at 11:00 AM",
  ];

  return {
    phone: phones[Math.floor(Math.random() * phones.length)],
    medicalHistory: histories[Math.floor(Math.random() * histories.length)],
    submittedDate: dates[Math.floor(Math.random() * dates.length)],
  };
}

function getPriorityClass(priority) {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function hideModal() {
  const modal = document.getElementById("requestModal");
  modal.classList.add("hidden");
}

function setRowLoading(row, loading) {
  if (loading) {
    row.style.opacity = "0.6";
    row.style.pointerEvents = "none";
  } else {
    row.style.opacity = "1";
    row.style.pointerEvents = "auto";
  }
}

function filterTable(searchTerm, statusFilter) {
  const tbody = document.getElementById("requestsTableBody");
  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    const patientName = row
      .querySelector(".text-sm.font-medium.text-gray-900")
      .textContent.toLowerCase();
    const patientEmail = row
      .querySelector(".text-sm.text-gray-500")
      .textContent.toLowerCase();
    const status = row
      .querySelector("td:nth-last-child(2) span")
      .textContent.toLowerCase();

    const matchesSearch =
      patientName.includes(searchTerm) || patientEmail.includes(searchTerm);
    const matchesFilter = statusFilter === "all" || status === statusFilter;

    if (matchesSearch && matchesFilter) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function updateStatistics() {
  const tbody = document.getElementById("requestsTableBody");
  const rows = tbody.querySelectorAll("tr");

  let pending = 0,
    approved = 0,
    rejected = 0,
    scheduled = 0;

  rows.forEach((row) => {
    const status = row
      .querySelector("td:nth-last-child(2) span")
      .textContent.toLowerCase();
    switch (status) {
      case "pending":
        pending++;
        break;
      case "approved":
        approved++;
        scheduled++; // Approved requests are considered scheduled
        break;
      case "rejected":
        rejected++;
        break;
    }
  });

  // Update statistics cards
  const statsCards = document.querySelectorAll(
    ".grid.grid-cols-1.md\\:grid-cols-4 .bg-white"
  );
  if (statsCards.length >= 4) {
    statsCards[0].querySelector(".text-2xl").textContent = pending;
    statsCards[1].querySelector(".text-2xl").textContent = approved;
    statsCards[2].querySelector(".text-2xl").textContent = rejected;
    statsCards[3].querySelector(".text-2xl").textContent = scheduled;
  }
}

function initializeFilters() {
  // Set default filter to 'all'
  const filterSelect = document.querySelector("select");
  if (filterSelect) {
    filterSelect.value = "all";
  }
}

function setUpRealTimeUpdates() {
  // Simulate real-time updates every 30 seconds
  setInterval(() => {
    // This would typically be an API call to check for new requests
    console.log("Checking for new consultation requests...");
    // You could add new rows dynamically here
  }, 30000);
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 max-w-sm rounded-lg shadow-lg p-4 z-50 transform transition-all duration-300 translate-x-full`;

  // Set colors based on type
  switch (type) {
    case "success":
      notification.classList.add("bg-green-500", "text-white");
      break;
    case "error":
      notification.classList.add("bg-red-500", "text-white");
      break;
    case "warning":
      notification.classList.add("bg-yellow-500", "text-white");
      break;
    default:
      notification.classList.add("bg-blue-500", "text-white");
  }

  notification.innerHTML = `
        <div class="flex items-center">
            <span class="flex-1">${message}</span>
            <button class="ml-3 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Available Schedules Modal Functions
function showAvailableSchedulesModal() {
  const modal = document.getElementById("availableSchedulesModal");
  if (modal) {
    modal.classList.remove("hidden");
    // Set today's date as default for date filter
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter) {
      const today = new Date().toISOString().split("T")[0];
      dateFilter.value = today;
    }
  }
}

function hideAvailableSchedulesModal() {
  const modal = document.getElementById("availableSchedulesModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function showAddScheduleModal() {
  const modal = document.getElementById("addScheduleModal");
  if (modal) {
    modal.classList.remove("hidden");
    // Reset form
    const form = document.getElementById("addScheduleForm");
    if (form) {
      form.reset();
    }
    // Set default date to today
    const dateInput = modal.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.value = today;
    }
  }
}

function hideAddScheduleModal() {
  const modal = document.getElementById("addScheduleModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function handleSaveSchedule() {
  const form = document.getElementById("addScheduleForm");
  const formData = new FormData(form);

  // Get form values
  const doctor = form.querySelector("select").value;
  const date = form.querySelector('input[type="date"]').value;
  const startTime = form.querySelector('input[type="time"]').value;
  const endTime = form.querySelectorAll('input[type="time"]')[1].value;
  const status = form.querySelectorAll("select")[1].value;
  const notes = form.querySelector("textarea").value;

  // Validate form
  if (!doctor || !date || !startTime || !endTime) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Validate time range
  if (startTime >= endTime) {
    showNotification("End time must be after start time.", "error");
    return;
  }

  // Simulate saving
  showNotification("Saving schedule...", "info");

  setTimeout(() => {
    // Simulate successful save
    showNotification("Schedule added successfully!", "success");
    hideAddScheduleModal();

    // Here you would typically refresh the schedule data
    refreshScheduleData();
  }, 1000);
}

function filterSchedules() {
  const doctorFilter = document.getElementById("doctorFilter").value;
  const dateFilter = document.getElementById("dateFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;

  // This would typically filter the displayed schedules
  // For now, we'll just show a notification
  console.log("Filtering schedules:", {
    doctorFilter,
    dateFilter,
    statusFilter,
  });

  // You could implement actual filtering logic here
  // For example, hide/show schedule items based on filters
}

function refreshScheduleData() {
  // This would typically fetch fresh data from the server
  // For now, we'll just simulate a refresh
  console.log("Refreshing schedule data...");

  // You could update the schedule displays here
  // For example, make an API call and update the DOM
}
