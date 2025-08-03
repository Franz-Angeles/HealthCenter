// Account Management System
class AccountManagement {
  constructor() {
    this.users = [
      {
        id: 1,
        name: "Dr. Maria Santos",
        email: "maria.santos@healthcenter.com",
        role: "super_admin",
        status: "active",
        lastLogin: "2025-08-02 09:30",
        avatar: "MS",
      },
      {
        id: 2,
        name: "Nurse John Dela Cruz",
        email: "john.delacruz@healthcenter.com",
        role: "admin",
        status: "active",
        lastLogin: "2025-08-02 08:15",
        avatar: "JD",
      },
      {
        id: 3,
        name: "Dr. Ana Reyes",
        email: "ana.reyes@healthcenter.com",
        role: "admin",
        status: "active",
        lastLogin: "2025-08-01 16:45",
        avatar: "AR",
      },
      {
        id: 4,
        name: "Midwife Rosa Garcia",
        email: "rosa.garcia@healthcenter.com",
        role: "user",
        status: "active",
        lastLogin: "2025-08-02 07:20",
        avatar: "RG",
      },
      {
        id: 5,
        name: "Health Worker Pedro Martinez",
        email: "pedro.martinez@healthcenter.com",
        role: "user",
        status: "active",
        lastLogin: "2025-08-01 14:30",
        avatar: "PM",
      },
      {
        id: 6,
        name: "Admin Lisa Fernandez",
        email: "lisa.fernandez@healthcenter.com",
        role: "admin",
        status: "inactive",
        lastLogin: "2025-07-28 10:15",
        avatar: "LF",
      },
      {
        id: 7,
        name: "Nurse Carlos Rivera",
        email: "carlos.rivera@healthcenter.com",
        role: "user",
        status: "active",
        lastLogin: "2025-08-02 06:45",
        avatar: "CR",
      },
      {
        id: 8,
        name: "Dr. Elena Morales",
        email: "elena.morales@healthcenter.com",
        role: "user",
        status: "active",
        lastLogin: "2025-08-01 18:20",
        avatar: "EM",
      },
    ];

    this.currentPage = 1;
    this.usersPerPage = 10;
    this.filteredUsers = [...this.users];
    this.editingUserId = null;

    this.init();
  }

  init() {
    this.updateStatistics();
    this.renderUsers();
    this.setupEventListeners();
    this.updatePagination();
  }

  setupEventListeners() {
    // Search functionality
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.filterUsers();
    });

    // Role filter
    document.getElementById("roleFilter").addEventListener("change", (e) => {
      this.filterUsers();
    });

    // Status filter
    document.getElementById("statusFilter").addEventListener("change", (e) => {
      this.filterUsers();
    });

    // Add user button
    document.getElementById("addUserBtn").addEventListener("click", () => {
      this.openAddUserModal();
    });

    // Modal close buttons
    document.getElementById("closeModal").addEventListener("click", () => {
      this.closeUserModal();
    });

    document.getElementById("cancelBtn").addEventListener("click", () => {
      this.closeUserModal();
    });

    // Delete modal buttons
    document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
      this.closeDeleteModal();
    });

    document
      .getElementById("confirmDeleteBtn")
      .addEventListener("click", () => {
        this.confirmDelete();
      });

    // Form submission
    document.getElementById("userForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Pagination
    document.getElementById("prevBtn").addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderUsers();
        this.updatePagination();
      }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      const totalPages = Math.ceil(
        this.filteredUsers.length / this.usersPerPage
      );
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.renderUsers();
        this.updatePagination();
      }
    });

    // Close modal when clicking outside
    document.getElementById("userModal").addEventListener("click", (e) => {
      if (e.target.id === "userModal") {
        this.closeUserModal();
      }
    });

    document.getElementById("deleteModal").addEventListener("click", (e) => {
      if (e.target.id === "deleteModal") {
        this.closeDeleteModal();
      }
    });
  }

  updateStatistics() {
    const totalUsers = this.users.length;
    const totalAdmins = this.users.filter(
      (user) => user.role === "admin"
    ).length;
    const totalSuperAdmins = this.users.filter(
      (user) => user.role === "super_admin"
    ).length;
    const activeUsers = this.users.filter(
      (user) => user.status === "active"
    ).length;

    document.getElementById("totalUsers").textContent = totalUsers;
    document.getElementById("totalAdmins").textContent = totalAdmins;
    document.getElementById("totalSuperAdmins").textContent = totalSuperAdmins;
    document.getElementById("activeUsers").textContent = activeUsers;
  }

  filterUsers() {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const roleFilter = document.getElementById("roleFilter").value;
    const statusFilter = document.getElementById("statusFilter").value;

    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm);

      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    this.currentPage = 1;
    this.renderUsers();
    this.updatePagination();
  }

  renderUsers() {
    const tbody = document.getElementById("usersTableBody");
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    const usersToShow = this.filteredUsers.slice(startIndex, endIndex);

    tbody.innerHTML = "";

    usersToShow.forEach((user) => {
      const row = this.createUserRow(user);
      tbody.appendChild(row);
    });

    // Update pagination info
    const start = Math.min(startIndex + 1, this.filteredUsers.length);
    const end = Math.min(endIndex, this.filteredUsers.length);
    document.getElementById("startRange").textContent = start;
    document.getElementById("endRange").textContent = end;
    document.getElementById("totalRecords").textContent =
      this.filteredUsers.length;
  }

  createUserRow(user) {
    const row = document.createElement("tr");
    row.className = "user-row";

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            ${user.avatar}
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${
                          user.name
                        }</div>
                        <div class="text-sm text-gray-500">${user.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="role-badge role-${user.role}">
                    ${this.formatRole(user.role)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge status-${user.status}">
                    <i class="fas fa-circle text-xs mr-1"></i>
                    ${this.formatStatus(user.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${this.formatDate(user.lastLogin)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                    <button
                        class="action-btn edit-btn"
                        onclick="accountManagement.editUser(${user.id})"
                        title="Edit User"
                    >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button
                        class="action-btn delete-btn"
                        onclick="accountManagement.deleteUser(${user.id})"
                        title="Delete User"
                        ${
                          user.role === "super_admin"
                            ? 'disabled style="opacity: 0.5; cursor: not-allowed;"'
                            : ""
                        }
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

    return row;
  }

  formatRole(role) {
    const roles = {
      user: "User",
      admin: "Admin",
      super_admin: "Super Admin",
    };
    return roles[role] || role;
  }

  formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredUsers.length / this.usersPerPage);
    const pageNumbers = document.getElementById("pageNumbers");

    pageNumbers.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `page-number ${
        i === this.currentPage ? "active" : ""
      }`;
      pageBtn.textContent = i;
      pageBtn.addEventListener("click", () => {
        this.currentPage = i;
        this.renderUsers();
        this.updatePagination();
      });
      pageNumbers.appendChild(pageBtn);
    }

    // Update prev/next button states
    document.getElementById("prevBtn").disabled = this.currentPage === 1;
    document.getElementById("nextBtn").disabled =
      this.currentPage === totalPages;
  }

  openAddUserModal() {
    this.editingUserId = null;
    document.getElementById("modalTitle").textContent = "Add New User";
    document.getElementById("submitBtnText").textContent = "Add User";
    document.getElementById("passwordField").style.display = "block";
    document.getElementById("userPassword").required = true;

    // Reset form
    document.getElementById("userForm").reset();

    this.showUserModal();
  }

  editUser(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return;

    this.editingUserId = userId;
    document.getElementById("modalTitle").textContent = "Edit User";
    document.getElementById("submitBtnText").textContent = "Update User";
    document.getElementById("passwordField").style.display = "none";
    document.getElementById("userPassword").required = false;

    // Populate form
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userRole").value = user.role;
    document.getElementById("userStatus").value = user.status;

    this.showUserModal();
  }

  deleteUser(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user || user.role === "super_admin") return;

    this.deletingUserId = userId;
    this.showDeleteModal();
  }

  confirmDelete() {
    if (this.deletingUserId) {
      this.users = this.users.filter((u) => u.id !== this.deletingUserId);
      this.filterUsers();
      this.updateStatistics();
      this.closeDeleteModal();
      this.showToast("User deleted successfully", "success");
    }
  }

  handleFormSubmit() {
    const formData = new FormData(document.getElementById("userForm"));
    const userData = {
      name: formData.get("userName"),
      email: formData.get("userEmail"),
      role: formData.get("userRole"),
      status: formData.get("userStatus"),
    };

    if (this.editingUserId) {
      // Update existing user
      const userIndex = this.users.findIndex(
        (u) => u.id === this.editingUserId
      );
      if (userIndex !== -1) {
        this.users[userIndex] = {
          ...this.users[userIndex],
          ...userData,
          avatar: this.generateAvatar(userData.name),
        };
        this.showToast("User updated successfully", "success");
      }
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...this.users.map((u) => u.id)) + 1,
        ...userData,
        lastLogin: "Never",
        avatar: this.generateAvatar(userData.name),
      };
      this.users.push(newUser);
      this.showToast("User added successfully", "success");
    }

    this.filterUsers();
    this.updateStatistics();
    this.closeUserModal();
  }

  generateAvatar(name) {
    const words = name.split(" ");
    return words
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  }

  showUserModal() {
    document.getElementById("userModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeUserModal() {
    document.getElementById("userModal").classList.add("hidden");
    document.body.style.overflow = "auto";
    this.editingUserId = null;
  }

  showDeleteModal() {
    document.getElementById("deleteModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeDeleteModal() {
    document.getElementById("deleteModal").classList.add("hidden");
    document.body.style.overflow = "auto";
    this.deletingUserId = null;
  }

  showToast(message, type = "info") {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white transition-all duration-300 transform translate-x-full`;

    if (type === "success") {
      toast.classList.add("bg-green-500");
    } else if (type === "error") {
      toast.classList.add("bg-red-500");
    } else {
      toast.classList.add("bg-blue-500");
    }

    toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${
                  type === "success"
                    ? "check"
                    : type === "error"
                    ? "times"
                    : "info"
                }-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-x-full");
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add("translate-x-full");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
}

// Initialize the account management system when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.accountManagement = new AccountManagement();
});
