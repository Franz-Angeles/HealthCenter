// Service Usage Trends JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeServiceUsageTrends();
    
    // Add event listeners to buttons
    addEventListeners();
    
    // Simulate chart data loading
    loadChartData();
});

/**
 * Initialize the Service Usage Trends page
 */
function initializeServiceUsageTrends() {
    console.log('Service Usage Trends initialized');
    
    // Add animation classes to elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-fadeInUp');
        }, index * 100);
    });
    
    // Initialize mobile menu toggle for existing nav elements if present
    const menuButton = document.getElementById('menu-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (menuButton && dropdownMenu) {
        menuButton.addEventListener('click', function() {
            if (dropdownMenu.classList.contains('scale-y-0')) {
                dropdownMenu.classList.remove('scale-y-0', 'opacity-0', 'pointer-events-none');
                dropdownMenu.classList.add('scale-y-100', 'opacity-100', 'pointer-events-auto');
            } else {
                dropdownMenu.classList.remove('scale-y-100', 'opacity-100', 'pointer-events-auto');
                dropdownMenu.classList.add('scale-y-0', 'opacity-0', 'pointer-events-none');
            }
        });
    }
}

/**
 * Add event listeners to buttons and interactive elements
 */
function addEventListeners() {
    // Back button
    const backButton = document.querySelector('.back-to-dashboard');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'Dashboard.html';
        });
    }
    
    // Period buttons (Monthly, Weekly, Daily)
    const periodButtons = document.querySelectorAll('.period-button');
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            periodButtons.forEach(btn => {
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('bg-green-600', 'text-white');
            
            // Update chart with new period
            updateChartPeriod(this.dataset.period);
        });
    });
    
    // Export data button
    const exportButton = document.querySelector('.export-data');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportServiceData();
        });
    }
}

/**
 * Load and display chart data
 */
function loadChartData() {
    // This would typically fetch data from an API
    // For now, we'll simulate it with a timeout
    
    const chartContainer = document.querySelector('.chart-area');
    if (!chartContainer) return;
    
    // Show loading state
    chartContainer.innerHTML = `
        <div class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        // If Chart.js is available, create a chart
        if (typeof Chart !== 'undefined') {
            createServiceChart();
        } else {
            // Fallback to static chart representation
            displayStaticChart();
        }
    }, 800);
}

/**
 * Create interactive service usage chart using Chart.js
 */
function createServiceChart() {
    const chartContainer = document.querySelector('.chart-area');
    if (!chartContainer) return;
    
    // Clear container
    chartContainer.innerHTML = '';
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'serviceUsageChart';
    chartContainer.appendChild(canvas);
    
    // Create chart
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'General',
                    data: [1200, 1150, 1300, 1400, 1280, 1500, 1600, 1550, 1650, 1700, 1780, 1850],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Pediatric',
                    data: [800, 850, 830, 900, 920, 950, 980, 1000, 1050, 1100, 1150, 1200],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Emergency',
                    data: [300, 310, 290, 320, 310, 305, 315, 310, 300, 290, 295, 298],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Display static chart for fallback
 */
function displayStaticChart() {
    const chartContainer = document.querySelector('.chart-area');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = `
        <div class="h-80 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl border border-green-200 flex flex-col justify-center items-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 400 300" fill="none">
                    <defs>
                        <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M20 240 Q100 180 180 200 T340 160" stroke="#10b981" stroke-width="3" fill="none"/>
                    <path d="M20 260 Q100 220 180 240 T340 200" stroke="#3b82f6" stroke-width="3" fill="none"/>
                    <path d="M20 280 Q100 240 180 260 T340 220" stroke="#8b5cf6" stroke-width="3" fill="none"/>
                </svg>
            </div>
            
            <div class="text-center text-gray-700 z-10">
                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200 shadow-sm">
                    <svg class="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-lg font-semibold text-gray-800">Service Usage Chart</p>
                    <p class="text-sm text-gray-600 mt-1">Dynamic visualization with trend analysis</p>
                    <div class="flex justify-center space-x-4 mt-4">
                        <div class="flex items-center">
                            <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span class="text-xs text-gray-600">General</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span class="text-xs text-gray-600">Pediatric</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                            <span class="text-xs text-gray-600">Emergency</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update chart when period changes (Monthly, Weekly, Daily)
 * @param {string} period - The selected time period
 */
function updateChartPeriod(period) {
    console.log(`Updating chart to ${period} period`);
    // This would typically fetch new data from an API
    // For now, we'll just log it
    
    // Simulate chart update
    loadChartData();
}

/**
 * Export service data
 */
function exportServiceData() {
    console.log('Exporting service data');
    // Implement export functionality
    alert('Service data export started. The file will be downloaded shortly.');
    
    // Simulate download delay
    setTimeout(() => {
        // Create a "fake" download
        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(new Blob(['Service Usage Data Export'], {type: 'text/csv'}));
        a.setAttribute('download', 'service-usage-data.csv');
        a.click();
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    }, 1500);
}
