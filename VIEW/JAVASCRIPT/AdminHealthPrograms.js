// Health Programs Management System
class HealthProgramsManager {
  constructor() {
    this.programs = this.loadProgramsFromStorage();
    this.registrations = this.loadRegistrationsFromStorage();
    this.currentEditingProgram = null;
    this.currentRegistrationProgram = null;
    this.init();
  }

  init() {
    this.bindEventListeners();
    this.renderPrograms();
    this.setupImagePreview();
    this.setupRegistrationToggle();
  }

  bindEventListeners() {
    // Modal controls
    document
      .getElementById("createProgramBtn")
      .addEventListener("click", () => this.openCreateModal());
    document
      .getElementById("closeModal")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("closeDetailsModal")
      .addEventListener("click", () => this.closeDetailsModal());
    document
      .getElementById("closeRegistrationModal")
      .addEventListener("click", () => this.closeRegistrationModal());
    document
      .getElementById("closeConfirmModal")
      .addEventListener("click", () => this.closeConfirmModal());
    document
      .getElementById("cancelBtn")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("cancelRegistrationBtn")
      .addEventListener("click", () => this.closeRegistrationModal());

    // Form submissions
    document
      .getElementById("programForm")
      .addEventListener("submit", (e) => this.handleProgramFormSubmit(e));
    document
      .getElementById("registrationForm")
      .addEventListener("submit", (e) => this.handleRegistrationFormSubmit(e));

    // Staff management
    document
      .getElementById("addStaffBtn")
      .addEventListener("click", () => this.addStaffField());
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-remove-staff")) {
        this.removeStaffField(e.target);
      }
    });

    // Filters
    document
      .getElementById("filterType")
      .addEventListener("change", () => this.filterPrograms());
    document
      .getElementById("filterStatus")
      .addEventListener("change", () => this.filterPrograms());

    // Modal background click
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });

    // Date and time validation
    document
      .getElementById("startDate")
      .addEventListener("change", () => this.validateDates());
    document
      .getElementById("endDate")
      .addEventListener("change", () => this.validateDates());
    document
      .getElementById("startTime")
      .addEventListener("change", () => this.validateTimes());
    document
      .getElementById("endTime")
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
    const imageInput = document.getElementById("programImage");
    const imagePreview = document.getElementById("imagePreview");

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Program Image">`;
          imagePreview.classList.add("has-image");
        };
        reader.readAsDataURL(file);
      } else {
        this.resetImagePreview();
      }
    });
  }

  setupRegistrationToggle() {
    const enableRegistration = document.getElementById("enableRegistration");
    const registrationOptions = document.querySelector(".registration-options");

    enableRegistration.addEventListener("change", (e) => {
      registrationOptions.style.display = e.target.checked ? "block" : "none";
    });
  }

  resetImagePreview() {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = `
      <i class="fas fa-camera"></i>
      <span>Click to upload program image/poster</span>
    `;
    imagePreview.classList.remove("has-image");
  }

  openCreateModal() {
    document.getElementById("modalTitle").textContent =
      "Create New Health Program";
    document.getElementById("programForm").reset();
    this.resetImagePreview();
    this.currentEditingProgram = null;
    this.clearStaffFields();
    this.addStaffField(); // Add one default staff field
    document.getElementById("programModal").style.display = "block";
  }

  closeModal() {
    document.getElementById("programModal").style.display = "none";
  }

  closeDetailsModal() {
    document.getElementById("programDetailsModal").style.display = "none";
  }

  closeRegistrationModal() {
    document.getElementById("registrationModal").style.display = "none";
  }

  closeConfirmModal() {
    document.getElementById("confirmModal").style.display = "none";
  }

  addStaffField() {
    const container = document.getElementById("staffContainer");
    const staffInput = document.createElement("div");
    staffInput.className = "staff-input";
    staffInput.innerHTML = `
      <input
        type="text"
        name="staff[]"
        placeholder="Staff name and position/specialization"
      />
      <button type="button" class="btn-remove-staff">
        <i class="fas fa-times"></i>
      </button>
    `;
    container.appendChild(staffInput);
  }

  removeStaffField(button) {
    const container = document.getElementById("staffContainer");
    if (container.children.length > 1) {
      button.parentElement.remove();
    }
  }

  clearStaffFields() {
    document.getElementById("staffContainer").innerHTML = "";
  }

  validateDates() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const registrationDeadline = document.getElementById(
      "registrationDeadline"
    ).value;

    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        this.showToast("End date cannot be earlier than start date", "error");
        document.getElementById("endDate").value = "";
      }
    }

    if (registrationDeadline && startDate) {
      if (new Date(registrationDeadline) > new Date(startDate)) {
        this.showToast(
          "Registration deadline should be before program start date",
          "warning"
        );
      }
    }
  }

  validateTimes() {
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (startTime && endTime) {
      if (endTime <= startTime) {
        this.showToast("End time must be after start time", "error");
        document.getElementById("endTime").value = "";
      }
    }
  }

  handleProgramFormSubmit(e) {
    e.preventDefault();

    if (!this.validateProgramForm()) {
      return;
    }

    const formData = new FormData(e.target);
    const programData = this.extractProgramData(formData);

    if (this.currentEditingProgram) {
      this.updateProgram(programData);
    } else {
      this.createProgram(programData);
    }

    this.closeModal();
    this.renderPrograms();
    this.showToast("Health program saved successfully!", "success");
  }

  validateProgramForm() {
    const requiredFields = [
      "programTitle",
      "programType",
      "startDate",
      "endDate",
      "startTime",
      "endTime",
      "location",
      "description",
    ];
    const demographics = document.querySelectorAll(
      'input[name="demographics"]:checked'
    );

    for (const field of requiredFields) {
      const element = document.getElementById(field);
      if (!element.value.trim()) {
        this.showToast(
          `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}`,
          "error"
        );
        element.focus();
        return false;
      }
    }

    if (demographics.length === 0) {
      this.showToast("Please select at least one target demographic", "error");
      return false;
    }

    return true;
  }

  extractProgramData(formData) {
    const demographics = Array.from(
      document.querySelectorAll('input[name="demographics"]:checked')
    ).map((checkbox) => checkbox.value);

    const staff = Array.from(document.querySelectorAll('input[name="staff[]"]'))
      .map((input) => input.value.trim())
      .filter((value) => value);

    const programData = {
      id: this.currentEditingProgram
        ? this.currentEditingProgram.id
        : Date.now(),
      title: formData.get("programTitle"),
      type: formData.get("programType"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      location: formData.get("location"),
      capacity: formData.get("capacity") || null,
      demographics: demographics,
      requirements: formData.get("requirements"),
      staff: staff,
      description: formData.get("description"),
      enableRegistration: formData.get("enableRegistration") === "on",
      registrationDeadline: formData.get("registrationDeadline") || null,
      registrationFee: parseFloat(formData.get("registrationFee")) || 0,
      image: null, // Handle image separately if needed
      createdAt: this.currentEditingProgram
        ? this.currentEditingProgram.createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      registrationCount: this.currentEditingProgram
        ? this.currentEditingProgram.registrationCount
        : 0,
    };

    return programData;
  }

  createProgram(programData) {
    this.programs.push(programData);
    this.saveProgramsToStorage();
  }

  updateProgram(programData) {
    const index = this.programs.findIndex(
      (p) => p.id === this.currentEditingProgram.id
    );
    if (index !== -1) {
      this.programs[index] = programData;
      this.saveProgramsToStorage();
    }
  }

  deleteProgram(id) {
    this.programs = this.programs.filter((p) => p.id !== id);
    this.saveProgramsToStorage();
    this.renderPrograms();
    this.showToast("Program deleted successfully", "success");
  }

  editProgram(id) {
    const program = this.programs.find((p) => p.id === id);
    if (!program) return;

    this.currentEditingProgram = program;
    this.populateProgramForm(program);
    document.getElementById("modalTitle").textContent = "Edit Health Program";
    document.getElementById("programModal").style.display = "block";
  }

  populateProgramForm(program) {
    document.getElementById("programTitle").value = program.title;
    document.getElementById("programType").value = program.type;
    document.getElementById("startDate").value = program.startDate;
    document.getElementById("endDate").value = program.endDate;
    document.getElementById("startTime").value = program.startTime;
    document.getElementById("endTime").value = program.endTime;
    document.getElementById("location").value = program.location;
    document.getElementById("capacity").value = program.capacity || "";
    document.getElementById("requirements").value = program.requirements || "";
    document.getElementById("description").value = program.description;
    document.getElementById("enableRegistration").checked =
      program.enableRegistration;
    document.getElementById("registrationDeadline").value =
      program.registrationDeadline || "";
    document.getElementById("registrationFee").value =
      program.registrationFee || "";

    // Set demographics
    program.demographics.forEach((demo) => {
      const checkbox = document.querySelector(
        `input[name="demographics"][value="${demo}"]`
      );
      if (checkbox) checkbox.checked = true;
    });

    // Set staff
    this.clearStaffFields();
    program.staff.forEach((staffMember) => {
      this.addStaffField();
      const lastInput = document.querySelector(
        "#staffContainer .staff-input:last-child input"
      );
      if (lastInput) lastInput.value = staffMember;
    });

    // Handle registration options display
    const registrationOptions = document.querySelector(".registration-options");
    registrationOptions.style.display = program.enableRegistration
      ? "block"
      : "none";
  }

  renderPrograms() {
    const container = document.getElementById("programsContainer");
    const noPrograms = document.getElementById("noProgramsMessage");

    if (this.programs.length === 0) {
      container.innerHTML = "";
      noPrograms.style.display = "block";
      return;
    }

    noPrograms.style.display = "none";

    const filteredPrograms = this.getFilteredPrograms();

    if (filteredPrograms.length === 0) {
      container.innerHTML = "";
      noPrograms.style.display = "block";
      return;
    }

    container.innerHTML = filteredPrograms
      .map((program) => this.createProgramCard(program))
      .join("");
  }

  getFilteredPrograms() {
    const typeFilter = document.getElementById("filterType").value;
    const statusFilter = document.getElementById("filterStatus").value;

    return this.programs.filter((program) => {
      const typeMatch = typeFilter === "all" || program.type === typeFilter;
      const statusMatch =
        statusFilter === "all" ||
        this.getProgramStatus(program) === statusFilter;
      return typeMatch && statusMatch;
    });
  }

  getProgramStatus(program) {
    const now = new Date();
    const startDate = new Date(program.startDate);
    const endDate = new Date(program.endDate);
    const registrationDeadline = program.registrationDeadline
      ? new Date(program.registrationDeadline)
      : null;

    if (now > endDate) {
      return "completed";
    } else if (now >= startDate && now <= endDate) {
      return "ongoing";
    } else if (now < startDate) {
      if (
        program.enableRegistration &&
        registrationDeadline &&
        now <= registrationDeadline
      ) {
        return "registration-open";
      }
      return "upcoming";
    }
  }

  createProgramCard(program) {
    const status = this.getProgramStatus(program);
    const statusClass = status.replace("-", "");
    const registrationCount = this.getRegistrationCount(program.id);

    return `
      <div class="program-card ${statusClass}">
        <div class="program-type">${this.formatProgramType(program.type)}</div>
        <div class="program-status ${statusClass}">${this.formatStatus(
      status
    )}</div>
        
        <div class="program-header">
          <h3 class="program-title">${program.title}</h3>
        </div>

        ${
          program.image
            ? `<img src="${program.image}" alt="${program.title}" class="program-image">`
            : ""
        }

        <div class="program-meta">
          <div class="meta-item">
            <i class="fas fa-calendar-day"></i>
            <span>${this.formatDateRange(
              program.startDate,
              program.endDate
            )}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>${program.startTime} - ${program.endTime}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${program.location}</span>
          </div>
          ${
            program.capacity
              ? `
            <div class="meta-item">
              <i class="fas fa-users"></i>
              <span>Max: ${program.capacity} participants</span>
            </div>
          `
              : ""
          }
        </div>

        <div class="program-description">
          ${program.description}
        </div>

        <div class="demographics-list">
          <h4>Target Demographics</h4>
          <div>
            ${program.demographics
              .map(
                (demo) => `
              <span class="demographic-tag">${this.formatDemographic(
                demo
              )}</span>
            `
              )
              .join("")}
          </div>
        </div>

        ${
          program.staff.length > 0
            ? `
          <div class="staff-list">
            <h4>Medical Team</h4>
            <div>
              ${program.staff
                .map(
                  (staff) => `
                <span class="staff-tag">${staff}</span>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        ${
          program.enableRegistration
            ? `
          <div class="registration-info">
            <h4>Registration Information</h4>
            <div class="meta-item">
              <i class="fas fa-calendar-check"></i>
              <span>Deadline: ${
                program.registrationDeadline || "No deadline"
              }</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-peso-sign"></i>
              <span>Fee: ₱${program.registrationFee.toFixed(2)}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-users"></i>
              <span>Registered: ${registrationCount} participants</span>
            </div>
          </div>
        `
            : ""
        }

        <div class="program-actions">
          <button class="btn-small btn-secondary" onclick="healthPrograms.viewProgramDetails(${
            program.id
          })">
            <i class="fas fa-eye"></i> View Details
          </button>
          ${
            status === "registration-open" && program.enableRegistration
              ? `
            <button class="btn-small btn-register" onclick="healthPrograms.openRegistrationModal(${program.id})">
              <i class="fas fa-user-plus"></i> Register
            </button>
          `
              : ""
          }
          <button class="btn-small btn-primary" onclick="healthPrograms.editProgram(${
            program.id
          })">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn-small btn-danger" onclick="healthPrograms.confirmDeleteProgram(${
            program.id
          })">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
  }

  formatProgramType(type) {
    const types = {
      vaccination: "Mass Vaccination",
      "operation-tuli": "Operation Tuli",
      "feeding-program": "Feeding Program",
      "health-screening": "Health Screening",
      "dental-mission": "Dental Mission",
      "family-planning": "Family Planning",
      "maternal-care": "Maternal Care",
      immunization: "Immunization Drive",
      deworming: "Deworming Program",
      "health-education": "Health Education",
      "senior-citizen": "Senior Citizen Program",
    };
    return types[type] || type;
  }

  formatStatus(status) {
    return status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  formatDemographic(demo) {
    const demographics = {
      infants: "Infants (0-2 years)",
      children: "Children (3-12 years)",
      adolescents: "Adolescents (13-18 years)",
      adults: "Adults (19-59 years)",
      seniors: "Senior Citizens (60+ years)",
      pregnant: "Pregnant Women",
    };
    return demographics[demo] || demo;
  }

  formatDateRange(startDate, endDate) {
    const start = new Date(startDate).toLocaleDateString();
    const end = new Date(endDate).toLocaleDateString();
    return start === end ? start : `${start} - ${end}`;
  }

  viewProgramDetails(id) {
    const program = this.programs.find((p) => p.id === id);
    if (!program) return;

    const modal = document.getElementById("programDetailsModal");
    const content = document.getElementById("programDetailsContent");
    const title = document.getElementById("programDetailsTitle");

    title.textContent = program.title;
    content.innerHTML = this.createProgramDetailsContent(program);
    modal.style.display = "block";
  }

  createProgramDetailsContent(program) {
    const registrationCount = this.getRegistrationCount(program.id);

    return `
      <div class="program-details-header">
        <h2 class="program-details-title">${program.title}</h2>
        <span class="program-details-type">${this.formatProgramType(
          program.type
        )}</span>
      </div>

      ${
        program.image
          ? `<img src="${program.image}" alt="${program.title}" class="program-details-image">`
          : ""
      }

      <div class="program-details-grid">
        <div class="detail-section">
          <h4><i class="fas fa-calendar-alt"></i> Schedule</h4>
          <p><strong>Date:</strong> ${this.formatDateRange(
            program.startDate,
            program.endDate
          )}</p>
          <p><strong>Time:</strong> ${program.startTime} - ${
      program.endTime
    }</p>
        </div>

        <div class="detail-section">
          <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
          <p>${program.location}</p>
        </div>

        ${
          program.capacity
            ? `
          <div class="detail-section">
            <h4><i class="fas fa-users"></i> Capacity</h4>
            <p>Maximum ${program.capacity} participants</p>
            ${
              program.enableRegistration
                ? `<p>Currently registered: ${registrationCount}</p>`
                : ""
            }
          </div>
        `
            : ""
        }

        ${
          program.enableRegistration
            ? `
          <div class="detail-section">
            <h4><i class="fas fa-clipboard-list"></i> Registration</h4>
            <p><strong>Deadline:</strong> ${
              program.registrationDeadline || "No deadline"
            }</p>
            <p><strong>Fee:</strong> ₱${program.registrationFee.toFixed(2)}</p>
            <p><strong>Registered:</strong> ${registrationCount} participants</p>
          </div>
        `
            : ""
        }
      </div>

      <div class="detail-section">
        <h4><i class="fas fa-align-left"></i> Description</h4>
        <p>${program.description}</p>
      </div>

      <div class="detail-section">
        <h4><i class="fas fa-bullseye"></i> Target Demographics</h4>
        <div>
          ${program.demographics
            .map(
              (demo) => `
            <span class="demographic-tag">${this.formatDemographic(demo)}</span>
          `
            )
            .join("")}
        </div>
      </div>

      ${
        program.requirements
          ? `
        <div class="detail-section">
          <h4><i class="fas fa-clipboard-check"></i> Requirements</h4>
          <p>${program.requirements}</p>
        </div>
      `
          : ""
      }

      ${
        program.staff.length > 0
          ? `
        <div class="detail-section">
          <h4><i class="fas fa-user-md"></i> Medical Team</h4>
          <div>
            ${program.staff
              .map(
                (staff) => `
              <span class="staff-tag">${staff}</span>
            `
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
    `;
  }

  openRegistrationModal(programId) {
    this.currentRegistrationProgram = this.programs.find(
      (p) => p.id === programId
    );
    if (!this.currentRegistrationProgram) return;

    document.getElementById(
      "registrationTitle"
    ).textContent = `Register for ${this.currentRegistrationProgram.title}`;
    document.getElementById("registrationForm").reset();
    document.getElementById("registrationModal").style.display = "block";
  }

  handleRegistrationFormSubmit(e) {
    e.preventDefault();

    if (!this.validateRegistrationForm()) {
      return;
    }

    const formData = new FormData(e.target);
    const registrationData = this.extractRegistrationData(formData);

    this.createRegistration(registrationData);
    this.closeRegistrationModal();
    this.renderPrograms();
    this.showToast("Registration submitted successfully!", "success");
  }

  validateRegistrationForm() {
    const requiredFields = [
      "participantName",
      "participantAge",
      "participantGender",
      "participantContact",
      "participantAddress",
    ];

    for (const field of requiredFields) {
      const element = document.getElementById(field);
      if (!element.value.trim()) {
        this.showToast(
          `Please fill in the ${field
            .replace("participant", "")
            .toLowerCase()}`,
          "error"
        );
        element.focus();
        return false;
      }
    }

    const age = parseInt(document.getElementById("participantAge").value);
    if (age < 1 || age > 120) {
      this.showToast("Please enter a valid age", "error");
      return false;
    }

    return true;
  }

  extractRegistrationData(formData) {
    return {
      id: Date.now(),
      programId: this.currentRegistrationProgram.id,
      programTitle: this.currentRegistrationProgram.title,
      participantName: formData.get("participantName"),
      participantAge: parseInt(formData.get("participantAge")),
      participantGender: formData.get("participantGender"),
      participantContact: formData.get("participantContact"),
      participantAddress: formData.get("participantAddress"),
      emergencyContact: formData.get("emergencyContact"),
      medicalHistory: formData.get("medicalHistory"),
      registrationDate: new Date().toISOString(),
      status: "confirmed",
    };
  }

  createRegistration(registrationData) {
    this.registrations.push(registrationData);
    this.saveRegistrationsToStorage();

    // Update program registration count
    const program = this.programs.find(
      (p) => p.id === registrationData.programId
    );
    if (program) {
      program.registrationCount = (program.registrationCount || 0) + 1;
      this.saveProgramsToStorage();
    }
  }

  getRegistrationCount(programId) {
    return this.registrations.filter((r) => r.programId === programId).length;
  }

  confirmDeleteProgram(id) {
    this.pendingDeleteId = id;
    document.getElementById("confirmTitle").textContent = "Delete Program";
    document.getElementById("confirmMessage").textContent =
      "Are you sure you want to delete this health program? This action cannot be undone.";
    document.getElementById("confirmModal").style.display = "block";
  }

  executeConfirmedAction() {
    if (this.pendingDeleteId) {
      this.deleteProgram(this.pendingDeleteId);
      this.pendingDeleteId = null;
    }
    this.closeConfirmModal();
  }

  filterPrograms() {
    this.renderPrograms();
  }

  showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const icon = document.getElementById("toastIcon");
    const messageEl = document.getElementById("toastMessage");

    // Set icon based on type
    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
    };

    icon.className = icons[type] || icons.success;
    messageEl.textContent = message;
    toast.className = `toast ${type}`;

    // Show toast
    toast.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  loadProgramsFromStorage() {
    const stored = localStorage.getItem("healthPrograms");
    return stored ? JSON.parse(stored) : this.getSamplePrograms();
  }

  saveProgramsToStorage() {
    localStorage.setItem("healthPrograms", JSON.stringify(this.programs));
  }

  loadRegistrationsFromStorage() {
    const stored = localStorage.getItem("programRegistrations");
    return stored ? JSON.parse(stored) : [];
  }

  saveRegistrationsToStorage() {
    localStorage.setItem(
      "programRegistrations",
      JSON.stringify(this.registrations)
    );
  }

  getSamplePrograms() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    return [
      {
        id: 1,
        title: "Free Mass Vaccination for Children",
        type: "vaccination",
        startDate: nextWeek.toISOString().split("T")[0],
        endDate: nextWeek.toISOString().split("T")[0],
        startTime: "08:00",
        endTime: "17:00",
        location: "Bucal Health Center - Main Hall",
        capacity: 200,
        demographics: ["infants", "children"],
        requirements:
          "Birth certificate, vaccination card, valid ID of parent/guardian",
        staff: [
          "Dr. Maria Santos - Pediatrician",
          "Nurse Jane Cruz",
          "Nurse Roberto Dela Cruz",
        ],
        description:
          "Free vaccination program for children ages 0-12 years. We will be administering routine childhood vaccines including MMR, DPT, and Polio vaccines. Please bring your child's vaccination card and birth certificate.",
        enableRegistration: true,
        registrationDeadline: tomorrow.toISOString().split("T")[0],
        registrationFee: 0,
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        registrationCount: 45,
      },
      {
        id: 2,
        title: "Operation Tuli 2024",
        type: "operation-tuli",
        startDate: nextMonth.toISOString().split("T")[0],
        endDate: nextMonth.toISOString().split("T")[0],
        startTime: "07:00",
        endTime: "16:00",
        location: "Bucal Health Center - Surgery Room",
        capacity: 50,
        demographics: ["children", "adolescents"],
        requirements: "Medical certificate, parent consent form, valid ID",
        staff: [
          "Dr. Carlos Rodriguez - Surgeon",
          "Dr. Ana Garcia - Anesthesiologist",
          "Nurse Maria Lopez",
        ],
        description:
          "Free circumcision program for boys ages 8-15 years. Safe and hygienic procedure performed by qualified medical professionals. Post-operative care instructions will be provided.",
        enableRegistration: true,
        registrationDeadline: new Date(
          nextMonth.getTime() - 7 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0],
        registrationFee: 0,
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        registrationCount: 23,
      },
      {
        id: 3,
        title: "Senior Citizen Health Check-up",
        type: "health-screening",
        startDate: tomorrow.toISOString().split("T")[0],
        endDate: tomorrow.toISOString().split("T")[0],
        startTime: "08:00",
        endTime: "15:00",
        location: "Bucal Health Center - Consultation Rooms",
        capacity: 100,
        demographics: ["seniors"],
        requirements: "Senior citizen ID, PhilHealth card if available",
        staff: [
          "Dr. Elena Reyes - Internal Medicine",
          "Dr. Miguel Torres - Cardiologist",
        ],
        description:
          "Comprehensive health screening for senior citizens including blood pressure monitoring, blood sugar testing, and general physical examination. Free consultation and basic medications provided.",
        enableRegistration: false,
        registrationDeadline: null,
        registrationFee: 0,
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        registrationCount: 0,
      },
    ];
  }
}

// Initialize the Health Programs Manager
const healthPrograms = new HealthProgramsManager();
