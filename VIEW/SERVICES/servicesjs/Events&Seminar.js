// Events & Seminars Management System
class EventsManager {
  constructor() {
    this.events = this.loadEventsFromStorage();
    this.currentEditingEvent = null;
    this.init();
  }

  init() {
    this.bindEventListeners();
    this.renderEvents();
    this.setupImagePreview();
  }

  bindEventListeners() {
    // Modal controls
    document
      .getElementById("createEventBtn")
      .addEventListener("click", () => this.openCreateModal());
    document
      .getElementById("closeModal")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("closeDetailsModal")
      .addEventListener("click", () => this.closeDetailsModal());
    document
      .getElementById("closeConfirmModal")
      .addEventListener("click", () => this.closeConfirmModal());
    document
      .getElementById("cancelBtn")
      .addEventListener("click", () => this.closeModal());

    // Form submission
    document
      .getElementById("eventForm")
      .addEventListener("submit", (e) => this.handleFormSubmit(e));

    // Speaker management
    document
      .getElementById("addSpeakerBtn")
      .addEventListener("click", () => this.addSpeakerField());
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-remove-speaker")) {
        this.removeSpeakerField(e.target);
      }
    });

    // Filters
    document
      .getElementById("filterType")
      .addEventListener("change", () => this.filterEvents());
    document
      .getElementById("filterStatus")
      .addEventListener("change", () => this.filterEvents());

    // Modal background click
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });

    // Date validation
    document
      .getElementById("startDate")
      .addEventListener("change", () => this.validateDates());
    document
      .getElementById("endDate")
      .addEventListener("change", () => this.validateDates());
    document
      .getElementById("openingTime")
      .addEventListener("change", () => this.validateTimes());
    document
      .getElementById("closingTime")
      .addEventListener("change", () => this.validateTimes());

    // Confirmation modal
    document
      .getElementById("confirmCancel")
      .addEventListener("click", () => this.closeConfirmModal());
    document
      .getElementById("confirmOk")
      .addEventListener("click", () => this.executeConfirmedAction());
  }

  setupImagePreview() {
    const imageInput = document.getElementById("eventImage");
    const imagePreview = document.getElementById("imagePreview");

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Event Image">`;
          imagePreview.classList.add("has-image");
        };
        reader.readAsDataURL(file);
      } else {
        this.resetImagePreview();
      }
    });

    // Click to trigger file input
    imagePreview.addEventListener("click", () => {
      imageInput.click();
    });
  }

  resetImagePreview() {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = `
            <i class="fas fa-camera"></i>
            <span>Click to upload image</span>
        `;
    imagePreview.classList.remove("has-image");
  }

  openCreateModal() {
    this.currentEditingEvent = null;
    this.resetForm();
    document.getElementById("modalTitle").textContent =
      "Create New Event/Seminar";
    document.getElementById("eventModal").style.display = "block";
  }

  openEditModal(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (event) {
      this.currentEditingEvent = event;
      this.populateForm(event);
      document.getElementById("modalTitle").textContent = "Edit Event/Seminar";
      document.getElementById("eventModal").style.display = "block";
    }
  }

  closeModal() {
    document.getElementById("eventModal").style.display = "none";
    this.resetForm();
  }

  closeDetailsModal() {
    document.getElementById("eventDetailsModal").style.display = "none";
  }

  closeConfirmModal() {
    document.getElementById("confirmModal").style.display = "none";
    this.pendingAction = null;
  }

  resetForm() {
    document.getElementById("eventForm").reset();
    this.resetImagePreview();
    this.resetSpeakers();
    this.currentEditingEvent = null;
  }

  populateForm(event) {
    document.getElementById("eventTitle").value = event.title;
    document.getElementById("eventType").value = event.type;
    document.getElementById("startDate").value = event.startDate;
    document.getElementById("endDate").value = event.endDate;
    document.getElementById("openingTime").value = event.openingTime;
    document.getElementById("closingTime").value = event.closingTime;
    document.getElementById("location").value = event.location;
    document.getElementById("description").value = event.description;

    // Populate speakers
    this.resetSpeakers();
    event.speakers.forEach((speaker, index) => {
      if (index === 0) {
        document.querySelector('input[name="speakers[]"]').value = speaker;
      } else {
        this.addSpeakerField(speaker);
      }
    });

    // Handle image
    if (event.image) {
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.innerHTML = `<img src="${event.image}" alt="Event Image">`;
      imagePreview.classList.add("has-image");
    }
  }

  resetSpeakers() {
    const container = document.getElementById("speakersContainer");
    container.innerHTML = `
            <div class="speaker-input">
                <input type="text" name="speakers[]" placeholder="Speaker name and title">
                <button type="button" class="btn-remove-speaker">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
  }

  addSpeakerField(value = "") {
    const container = document.getElementById("speakersContainer");
    const speakerDiv = document.createElement("div");
    speakerDiv.className = "speaker-input";
    speakerDiv.innerHTML = `
            <input type="text" name="speakers[]" placeholder="Speaker name and title" value="${value}">
            <button type="button" class="btn-remove-speaker">
                <i class="fas fa-times"></i>
            </button>
        `;
    container.appendChild(speakerDiv);
  }

  removeSpeakerField(button) {
    const container = document.getElementById("speakersContainer");
    if (container.children.length > 1) {
      button.parentElement.remove();
    } else {
      this.showToast("At least one speaker field is required", "warning");
    }
  }

  validateDates() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        this.showToast("Start date cannot be in the past", "warning");
        document.getElementById("startDate").value = "";
        return false;
      }

      if (end < start) {
        this.showToast("End date cannot be before start date", "warning");
        document.getElementById("endDate").value = "";
        return false;
      }
    }
    return true;
  }

  validateTimes() {
    const openingTime = document.getElementById("openingTime").value;
    const closingTime = document.getElementById("closingTime").value;

    if (openingTime && closingTime) {
      const opening = new Date(`2000-01-01 ${openingTime}`);
      const closing = new Date(`2000-01-01 ${closingTime}`);

      if (closing <= opening) {
        this.showToast("Closing time must be after opening time", "warning");
        document.getElementById("closingTime").value = "";
        return false;
      }
    }
    return true;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (!this.validateDates() || !this.validateTimes()) {
      return;
    }

    const formData = new FormData(e.target);
    const event = this.createEventFromForm(formData);

    if (this.currentEditingEvent) {
      this.updateEvent(event);
    } else {
      this.createEvent(event);
    }
  }

  createEventFromForm(formData) {
    const speakers = Array.from(formData.getAll("speakers[]")).filter(
      (s) => s.trim() !== ""
    );
    const imageFile = formData.get("eventImage");

    const event = {
      id: this.currentEditingEvent
        ? this.currentEditingEvent.id
        : this.generateId(),
      title: formData.get("eventTitle"),
      type: formData.get("eventType"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      openingTime: formData.get("openingTime"),
      closingTime: formData.get("closingTime"),
      location: formData.get("location"),
      speakers: speakers,
      description: formData.get("description"),
      image: this.currentEditingEvent ? this.currentEditingEvent.image : null,
      createdAt: this.currentEditingEvent
        ? this.currentEditingEvent.createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Handle image
    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        event.image = e.target.result;
        this.saveEvent(event);
      };
      reader.readAsDataURL(imageFile);
      return null; // Event will be saved in the FileReader callback
    }

    return event;
  }

  saveEvent(event) {
    if (this.currentEditingEvent) {
      this.updateEvent(event);
    } else {
      this.createEvent(event);
    }
  }

  createEvent(event) {
    if (!event) return;

    this.events.unshift(event);
    this.saveEventsToStorage();
    this.renderEvents();
    this.closeModal();
    this.showToast("Event created successfully!", "success");
  }

  updateEvent(event) {
    if (!event) return;

    const index = this.events.findIndex(
      (e) => e.id === this.currentEditingEvent.id
    );
    if (index !== -1) {
      this.events[index] = event;
      this.saveEventsToStorage();
      this.renderEvents();
      this.closeModal();
      this.showToast("Event updated successfully!", "success");
    }
  }

  deleteEvent(eventId) {
    this.showConfirmModal(
      "Delete Event",
      "Are you sure you want to delete this event? This action cannot be undone.",
      () => {
        const index = this.events.findIndex((e) => e.id === eventId);
        if (index !== -1) {
          this.events.splice(index, 1);
          this.saveEventsToStorage();
          this.renderEvents();
          this.showToast("Event deleted successfully!", "success");
        }
      }
    );
  }

  duplicateEvent(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (event) {
      const duplicatedEvent = {
        ...event,
        id: this.generateId(),
        title: `${event.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.events.unshift(duplicatedEvent);
      this.saveEventsToStorage();
      this.renderEvents();
      this.showToast("Event duplicated successfully!", "success");
    }
  }

  viewEventDetails(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (event) {
      this.renderEventDetails(event);
      document.getElementById("eventDetailsModal").style.display = "block";
    }
  }

  renderEventDetails(event) {
    const status = this.getEventStatus(event);
    const statusClass = status.toLowerCase();
    const formattedStartDate = this.formatDate(event.startDate);
    const formattedEndDate = this.formatDate(event.endDate);

    const content = `
            <div class="event-details-header">
                <h2 class="event-details-title">${event.title}</h2>
                <span class="event-details-type">${this.formatEventType(
                  event.type
                )}</span>
                <span class="event-status ${statusClass}">${status}</span>
            </div>

            ${
              event.image
                ? `<img src="${event.image}" alt="${event.title}" class="event-details-image">`
                : ""
            }

            <div class="event-details-grid">
                <div class="detail-section">
                    <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
                    <p><strong>Start:</strong> ${formattedStartDate} at ${this.formatTime(
      event.openingTime
    )}</p>
                    <p><strong>End:</strong> ${formattedEndDate} at ${this.formatTime(
      event.closingTime
    )}</p>
                </div>

                <div class="detail-section">
                    <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
                    <p>${event.location}</p>
                </div>

                ${
                  event.speakers.length > 0
                    ? `
                <div class="detail-section">
                    <h4><i class="fas fa-users"></i> Speakers</h4>
                    ${event.speakers
                      .map((speaker) => `<p>• ${speaker}</p>`)
                      .join("")}
                </div>
                `
                    : ""
                }
            </div>

            <div class="detail-section">
                <h4><i class="fas fa-align-left"></i> Description</h4>
                <p>${event.description}</p>
            </div>

            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Event Information</h4>
                <p><strong>Created:</strong> ${this.formatDateTime(
                  event.createdAt
                )}</p>
                <p><strong>Last Updated:</strong> ${this.formatDateTime(
                  event.updatedAt
                )}</p>
            </div>
        `;

    document.getElementById("eventDetailsContent").innerHTML = content;
  }

  renderEvents() {
    const container = document.getElementById("eventsContainer");
    const noEventsMessage = document.getElementById("noEventsMessage");

    const filteredEvents = this.getFilteredEvents();

    if (filteredEvents.length === 0) {
      container.innerHTML = "";
      noEventsMessage.style.display = "block";
      return;
    }

    noEventsMessage.style.display = "none";

    container.innerHTML = filteredEvents
      .map((event) => this.createEventCard(event))
      .join("");

    // Bind event actions
    this.bindEventActions();
  }

  createEventCard(event) {
    const status = this.getEventStatus(event);
    const statusClass = status.toLowerCase();
    const formattedStartDate = this.formatDate(event.startDate);
    const formattedEndDate = this.formatDate(event.endDate);

    return `
            <div class="event-card ${statusClass}" data-event-id="${event.id}">
                <div class="event-status ${statusClass}">${status}</div>
                
                <div class="event-header">
                    <h3 class="event-title">${event.title}</h3>
                    <span class="event-type">${this.formatEventType(
                      event.type
                    )}</span>
                </div>

                ${
                  event.image
                    ? `<img src="${event.image}" alt="${event.title}" class="event-image">`
                    : ""
                }

                <div class="event-meta">
                    <div class="meta-item">
                        <i class="fas fa-calendar-day"></i>
                        <span>${formattedStartDate} - ${formattedEndDate}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${this.formatTime(
                          event.openingTime
                        )} - ${this.formatTime(event.closingTime)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                </div>

                <p class="event-description">${this.truncateText(
                  event.description,
                  150
                )}</p>

                ${
                  event.speakers.length > 0
                    ? `
                <div class="speakers-list">
                    <h4>Speakers:</h4>
                    ${event.speakers
                      .map(
                        (speaker) =>
                          `<span class="speaker-tag">${speaker}</span>`
                      )
                      .join("")}
                </div>
                `
                    : ""
                }

                <div class="event-actions">
                    <button class="btn-secondary btn-small view-details-btn" data-event-id="${
                      event.id
                    }">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn-secondary btn-small edit-event-btn" data-event-id="${
                      event.id
                    }">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-secondary btn-small duplicate-event-btn" data-event-id="${
                      event.id
                    }">
                        <i class="fas fa-copy"></i> Duplicate
                    </button>
                    <button class="btn-danger btn-small delete-event-btn" data-event-id="${
                      event.id
                    }">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
  }

  bindEventActions() {
    // View details
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eventId = e.target.closest("[data-event-id]").dataset.eventId;
        this.viewEventDetails(eventId);
      });
    });

    // Edit event
    document.querySelectorAll(".edit-event-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eventId = e.target.closest("[data-event-id]").dataset.eventId;
        this.openEditModal(eventId);
      });
    });

    // Duplicate event
    document.querySelectorAll(".duplicate-event-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eventId = e.target.closest("[data-event-id]").dataset.eventId;
        this.duplicateEvent(eventId);
      });
    });

    // Delete event
    document.querySelectorAll(".delete-event-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eventId = e.target.closest("[data-event-id]").dataset.eventId;
        this.deleteEvent(eventId);
      });
    });
  }

  getFilteredEvents() {
    const typeFilter = document.getElementById("filterType").value;
    const statusFilter = document.getElementById("filterStatus").value;

    return this.events.filter((event) => {
      const typeMatch = typeFilter === "all" || event.type === typeFilter;
      const statusMatch =
        statusFilter === "all" ||
        this.getEventStatus(event).toLowerCase() === statusFilter;
      return typeMatch && statusMatch;
    });
  }

  filterEvents() {
    this.renderEvents();
  }

  getEventStatus(event) {
    const now = new Date();
    const startDateTime = new Date(`${event.startDate} ${event.openingTime}`);
    const endDateTime = new Date(`${event.endDate} ${event.closingTime}`);

    if (now < startDateTime) {
      return "Upcoming";
    } else if (now >= startDateTime && now <= endDateTime) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  }

  formatEventType(type) {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    const hoursParsed = parseInt(hours) || 0;
    const minutesParsed = parseInt(minutes) || 0;
    date.setHours(hoursParsed, minutesParsed);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }

  showConfirmModal(title, message, callback) {
    document.getElementById("confirmTitle").textContent = title;
    document.getElementById("confirmMessage").textContent = message;
    document.getElementById("confirmModal").style.display = "block";
    this.pendingAction = callback;
  }

  executeConfirmedAction() {
    if (this.pendingAction) {
      this.pendingAction();
      this.pendingAction = null;
    }
    this.closeConfirmModal();
  }

  showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    toastMessage.textContent = message;
    toast.className = `toast ${type}`;

    // Set appropriate icon
    switch (type) {
      case "success":
        toastIcon.className = "fas fa-check-circle";
        break;
      case "error":
        toastIcon.className = "fas fa-exclamation-circle";
        break;
      case "warning":
        toastIcon.className = "fas fa-exclamation-triangle";
        break;
      default:
        toastIcon.className = "fas fa-info-circle";
    }

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  saveEventsToStorage() {
    localStorage.setItem("healthcenter_events", JSON.stringify(this.events));
  }

  loadEventsFromStorage() {
    const stored = localStorage.getItem("healthcenter_events");
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getSampleEvents();
  }

  getSampleEvents() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return [
      {
        id: "sample1",
        title: "Maternal Health Awareness Seminar",
        type: "seminar",
        startDate: tomorrow.toISOString().split("T")[0],
        endDate: tomorrow.toISOString().split("T")[0],
        openingTime: "09:00",
        closingTime: "16:00",
        location: "Bucal Health Center, Main Hall",
        speakers: [
          "Dr. Maria Santos - OB-Gynecologist",
          "Nurse Ana Cruz - Midwife Supervisor",
        ],
        description:
          "A comprehensive seminar focused on maternal health care, covering prenatal care, nutrition during pregnancy, and postnatal recovery. This seminar aims to educate expecting mothers and their families about proper healthcare practices.",
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "sample2",
        title: "Community Vaccination Drive - COVID-19 Boosters",
        type: "vaccination-drive",
        startDate: nextWeek.toISOString().split("T")[0],
        endDate: nextWeek.toISOString().split("T")[0],
        openingTime: "08:00",
        closingTime: "17:00",
        location: "Bucal Barangay Hall",
        speakers: [
          "Dr. Juan Dela Cruz - Municipal Health Officer",
          "Vaccination Team",
        ],
        description:
          "Free COVID-19 booster vaccination for all eligible residents. Please bring your vaccination cards and valid ID. First come, first served basis.",
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}

// Initialize the Events Manager when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.eventsManager = new EventsManager();
});
