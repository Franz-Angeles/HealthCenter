$files = @(
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\HtmlServAnalysis\NewBorn.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\HtmlServAnalysis\PostPartum.html", 
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\HtmlServAnalysis\RiskAssessments.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\HtmlServAnalysis\SeniorCitizenVaccinations.html"
)

foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw
    
    # Update year selector dropdown to include Export Report button
    $content = $content -replace '(?s)(<!-- Year selector dropdown -->.*?</div>\s*</div>\s*</div>)', @'
        <!-- Year selector dropdown and Export Report button -->
        <div class="mb-6 flex space-x-4">
          <div class="relative inline-block">
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-8 h-8 bg-[#2563EB] rounded-lg mr-3"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div class="mr-2">
                <span class="block text-xs text-gray-500">Select Year</span>
                <span class="block font-semibold">View Annual Data</span>
              </div>
              <select
                id="yearSelectDropdown"
                class="py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <!-- Years will be populated by JavaScript -->
              </select>
            </div>
          </div>
          
          <!-- Export Report Button -->
          <div class="relative inline-block">
            <button
              id="exportReportBtn"
              class="flex items-center px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl transform hover:scale-105 shadow-lg"
            >
              <div class="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg mr-1">
                <svg 
                  class="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span class="text-sm">Export Report</span>
            </button>
          </div>
        </div>
'@

    # Add Export Report Modal
    $content = $content -replace '(?s)(</div>\s*<!-- JavaScript -->)', @'
    </div>

    <!-- Export Report Modal -->
    <div
      id="exportReportModal"
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 hidden items-center justify-center transition-opacity duration-300 ease-in-out"
    >
      <div
        class="modal-content relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 transform scale-95 opacity-0 transition-all duration-300 ease-in-out"
      >
        <button
          id="closeExportModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h3 class="text-xl font-bold text-gray-800 mb-5">Export Report</h3>

        <div class="space-y-6">
          <!-- Format Selection -->
          <div>
            <label for="exportFormat" class="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select
              id="exportFormat"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-md"
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <!-- Report Type Selection -->
          <div>
            <label for="reportType" class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              id="reportType"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-md"
            >
              <option value="family-planning">Family Planning</option>
              <option value="maternal-care">Maternal Care</option>
              <option value="newborn-infant">Newborn & Infant</option>
              <option value="postpartum">Postpartum</option>
              <option value="risk-assessments">Risk Assessments</option>
              <option value="senior-vaccination">Senior Citizen Vaccination</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-8 space-x-3">
          <button
            id="cancelExport"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirmExport"
            class="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
          >
            Export
          </button>
        </div>
      </div>
    </div>

    <!-- JavaScript -->
'@

    # Update JavaScript section
    $content = $content -replace '(?s)(<script>\s*// Year dropdown functionality.*?</script>)', @'
    <script>
      // Year dropdown functionality
      document.addEventListener("DOMContentLoaded", function () {
        const yearSelect = document.getElementById("yearSelectDropdown");

        // Populate years
        if (yearSelect) {
          const currentYear = new Date().getFullYear();
          // Add years from 5 years ago to 5 years in the future
          for (let y = currentYear - 5; y <= currentYear + 5; y++) {
            const option = document.createElement("option");
            option.value = y;
            option.textContent = y;
            // Set current year as selected by default
            if (y === currentYear) {
              option.selected = true;
            }
            yearSelect.appendChild(option);
          }

          // Add event listener for year selection
          yearSelect.addEventListener("change", function () {
            const selectedYear = this.value;
            console.log("Selected year:", selectedYear);
            // Add your logic to update data based on selected year here
          });
        }
        
        // Export Report Modal functionality
        const exportBtn = document.getElementById("exportReportBtn");
        const closeExportModalBtn = document.getElementById("closeExportModal");
        const confirmExportBtn = document.getElementById("confirmExport");
        const cancelExportBtn = document.getElementById("cancelExport");
        const exportModal = document.getElementById("exportReportModal");
        const reportTypeSelect = document.getElementById("reportType");
        const exportFormatSelect = document.getElementById("exportFormat");

        function openExportModal() {
          exportModal.classList.remove("hidden");
          exportModal.classList.add("flex");

          // Force reflow
          exportModal.offsetHeight;

          setTimeout(() => {
            exportModal.classList.add("show");
            const modalContent = exportModal.querySelector(".modal-content");
            if (modalContent) {
              modalContent.style.transform = "scale(1)";
              modalContent.style.opacity = "1";
            }
          }, 10);
          document.body.style.overflow = "hidden"; // Prevent background scrolling
        }

        function closeExportModal() {
          const modalContent = exportModal.querySelector(".modal-content");

          exportModal.classList.remove("show");
          if (modalContent) {
            modalContent.style.transform = "scale(0.95)";
            modalContent.style.opacity = "0";
          }

          setTimeout(() => {
            exportModal.classList.add("hidden");
            exportModal.classList.remove("flex");
            document.body.style.overflow = ""; // Restore scrolling

            // Reset modal content styles
            if (modalContent) {
              modalContent.style.transform = "";
              modalContent.style.opacity = "";
            }
          }, 300);
        }

        if (exportBtn) {
          exportBtn.addEventListener("click", openExportModal);
        }

        if (closeExportModalBtn) {
          closeExportModalBtn.addEventListener("click", closeExportModal);
        }

        if (cancelExportBtn) {
          cancelExportBtn.addEventListener("click", closeExportModal);
        }

        // Close modal when clicking outside
        if (exportModal) {
          exportModal.addEventListener("click", (e) => {
            if (e.target === exportModal) {
              closeExportModal();
            }
          });
        }

        // Close modal with Escape key
        document.addEventListener("keydown", (e) => {
          if (
            e.key === "Escape" &&
            exportModal &&
            !exportModal.classList.contains("hidden")
          ) {
            closeExportModal();
          }
        });

        // Handle export confirmation
        if (confirmExportBtn) {
          confirmExportBtn.addEventListener("click", () => {
            const reportType = reportTypeSelect.value;
            const exportFormat = exportFormatSelect.value;
            const year = yearSelect.value;
            
            console.log(`Exporting ${reportType} report in ${exportFormat} format for year ${year}`);
            // Here you would implement the actual export functionality
            
            // For demonstration, show an alert
            alert(`Report export initiated: ${reportType} (${exportFormat})`);
            
            closeExportModal();
          });
        }

        // Set the default report type based on the current page
        if (reportTypeSelect) {
          // Get the current page from URL
          const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
          
          if (currentPage === "FamilyPlanning") {
            reportTypeSelect.value = "family-planning";
          } else if (currentPage === "MaternalCare") {
            reportTypeSelect.value = "maternal-care";
          } else if (currentPage === "NewBorn") {
            reportTypeSelect.value = "newborn-infant";
          } else if (currentPage === "PostPartum") {
            reportTypeSelect.value = "postpartum";
          } else if (currentPage === "RiskAssessments") {
            reportTypeSelect.value = "risk-assessments";
          } else if (currentPage === "SeniorCitizenVaccinations") {
            reportTypeSelect.value = "senior-vaccination";
          }
        }
      });
    </script>
'@

    Set-Content -Path $file -Value $content
    Write-Host "Updated $file"
}

Write-Host "All files have been updated with Export Report functionality."
