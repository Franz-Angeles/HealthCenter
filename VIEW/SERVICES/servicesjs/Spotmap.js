// Spotmap.js - Interactive Health Map functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  const map = L.map("health-map").setView([14.11, 121.09], 13); // Default coordinates for Bucal area

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Sample data for health facilities (replace with actual data from your database)
  const healthFacilities = [
    {
      name: "Bucal Health Center",
      type: "health-center",
      coordinates: [14.112, 121.087],
      status: "Operational",
      services: [
        "Primary Care",
        "Vaccination",
        "Maternal Care",
        "Child Health",
      ],
      contact: {
        phone: "(123) 456-7890",
        email: "bucal.health@example.com",
      },
      issues: {
        respiratory: 24,
        gastrointestinal: 12,
        other: 8,
      },
      riskLevel: "medium", // low, medium, high
      hours:
        "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed",
    },
    {
      name: "Tanza Community Health Post",
      type: "community-center",
      coordinates: [14.105, 121.095],
      status: "Operational",
      services: ["Basic Health Screening", "Health Education", "First Aid"],
      contact: {
        phone: "(123) 456-7891",
        email: "tanza.health@example.com",
      },
      issues: {
        respiratory: 18,
        gastrointestinal: 7,
        other: 5,
      },
      riskLevel: "low",
      hours: "Monday - Friday: 9:00 AM - 4:00 PM\nSaturday - Sunday: Closed",
    },
    {
      name: "Mobile Vaccination Point",
      type: "vaccination-point",
      coordinates: [14.118, 121.082],
      status: "Operational",
      services: [
        "COVID-19 Vaccination",
        "Flu Shots",
        "Immunization for Children",
      ],
      contact: {
        phone: "(123) 456-7892",
        email: "mobile.vax@example.com",
      },
      issues: {
        respiratory: 5,
        gastrointestinal: 0,
        other: 2,
      },
      riskLevel: "low",
      hours: "Monday - Saturday: 8:00 AM - 3:00 PM\nSunday: Closed",
    },
    {
      name: "High Risk Area - Bucal West",
      type: "high-risk",
      coordinates: [14.115, 121.079],
      status: "Monitoring",
      services: ["None"],
      contact: {
        phone: "Emergency: (123) 456-7899",
        email: "emergency@example.com",
      },
      issues: {
        respiratory: 42,
        gastrointestinal: 28,
        other: 15,
      },
      riskLevel: "high",
      hours: "N/A",
    },
  ];

  // Custom icons for different facility types
  const icons = {
    "health-center": L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
    "community-center": L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #6b7280; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
    "vaccination-point": L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #8b5cf6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
    "high-risk": L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
    "medium-risk": L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #f59e0b; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
    "low-risk": L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
  };

  // Add markers for health facilities
  healthFacilities.forEach((facility) => {
    const marker = L.marker(facility.coordinates, {
      icon: icons[facility.type],
    }).addTo(map);

    // Simple popup for initial click
    marker.bindPopup(`
            <div class="map-popup">
                <div class="map-popup-header">${facility.name}</div>
                <div class="map-popup-content">
                    Status: ${facility.status}<br>
                    Risk Level: ${
                      facility.riskLevel.charAt(0).toUpperCase() +
                      facility.riskLevel.slice(1)
                    }
                </div>
                <div class="map-popup-stats">
                    <span>Click for details</span>
                </div>
            </div>
        `);

    // When marker is clicked, show details panel
    marker.on("click", function () {
      displayLocationDetails(facility);
    });
  });

  // Function to display location details in the panel
  function displayLocationDetails(facility) {
    const detailsPanel = document.getElementById("location-details");

    // Fill in the details
    document.getElementById("location-name").textContent = facility.name;
    document.getElementById(
      "health-status"
    ).textContent = `Status: ${facility.status}`;

    // Services list
    const servicesList = document.getElementById("available-services");
    servicesList.innerHTML = "";
    facility.services.forEach((service) => {
      const li = document.createElement("li");
      li.textContent = service;
      servicesList.appendChild(li);
    });

    // Contact info
    document.getElementById(
      "contact-info"
    ).innerHTML = `Phone: ${facility.contact.phone}<br>Email: ${facility.contact.email}`;

    // Recent issues
    const recentIssues = document.getElementById("recent-issues");
    recentIssues.innerHTML = `
            <div class="flex justify-between mb-1">
                <span>Respiratory:</span>
                <span>${facility.issues.respiratory} cases</span>
            </div>
            <div class="flex justify-between mb-1">
                <span>Gastrointestinal:</span>
                <span>${facility.issues.gastrointestinal} cases</span>
            </div>
            <div class="flex justify-between">
                <span>Other:</span>
                <span>${facility.issues.other} cases</span>
            </div>
        `;

    // Risk assessment
    const riskAssessment = document.getElementById("risk-assessment");
    let riskPercentage = 0;
    let riskColor = "";

    switch (facility.riskLevel) {
      case "low":
        riskPercentage = 25;
        riskColor = "bg-green-500";
        break;
      case "medium":
        riskPercentage = 65;
        riskColor = "bg-yellow-500";
        break;
      case "high":
        riskPercentage = 90;
        riskColor = "bg-red-500";
        break;
    }

    riskAssessment.innerHTML = `
            <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="${riskColor} h-2.5 rounded-full" style="width: ${riskPercentage}%"></div>
                </div>
                <span class="ml-2 text-sm font-medium">${
                  facility.riskLevel.charAt(0).toUpperCase() +
                  facility.riskLevel.slice(1)
                }</span>
            </div>
        `;

    // Operating hours
    document.getElementById("operating-hours").innerHTML =
      facility.hours.replace(/\n/g, "<br>");

    // Show the panel
    detailsPanel.classList.remove("hidden");
    detailsPanel.classList.add("show");

    // Scroll to the details panel
    detailsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Close details panel button
  document
    .getElementById("close-details")
    .addEventListener("click", function () {
      const detailsPanel = document.getElementById("location-details");
      detailsPanel.classList.add("hidden");
      detailsPanel.classList.remove("show");
    });

  // Map zoom controls
  document.getElementById("zoom-in").addEventListener("click", function () {
    map.zoomIn();
  });

  document.getElementById("zoom-out").addEventListener("click", function () {
    map.zoomOut();
  });

  document.getElementById("center-map").addEventListener("click", function () {
    map.setView([14.11, 121.09], 13);
  });

  // Apply filters button
  document
    .getElementById("apply-filters")
    .addEventListener("click", function () {
      const healthIssue = document.getElementById("health-issue-filter").value;
      const timePeriod = document.getElementById("time-period-filter").value;
      const ageGroup = document.getElementById("age-group-filter").value;

      // In a real application, you would filter the data based on these values
      // and update the map markers accordingly

      // For this demo, we'll just show an alert
      alert(
        `Filters applied: Health Issue: ${healthIssue}, Time Period: ${timePeriod}, Age Group: ${ageGroup}`
      );
    });

  // Download report button
  document
    .getElementById("download-report")
    .addEventListener("click", function () {
      alert(
        "Report download functionality would be implemented here. This would generate a PDF or Excel file with the current map data and statistics."
      );
    });

  // Add a sample heatmap layer (replace with actual data in production)
  // This simulates population density or disease spread
  const heatmapPoints = [
    [14.112, 121.087, 0.8], // high intensity
    [14.115, 121.079, 1.0], // highest intensity
    [14.108, 121.091, 0.6],
    [14.105, 121.095, 0.4],
    [14.118, 121.082, 0.3],
    [14.11, 121.1, 0.7],
    [14.12, 121.085, 0.5],
    [14.1, 121.09, 0.2],
  ];

  // Add heatmap if heatmap library is available
  if (typeof L.heatLayer === "function") {
    const heatLayer = L.heatLayer(heatmapPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.4: "blue",
        0.6: "lime",
        0.8: "yellow",
        1.0: "red",
      },
    }).addTo(map);

    // Add toggle functionality for the heatmap with the checkbox
    const heatmapCheckbox = document.querySelector(
      'input[type="checkbox"]:nth-of-type(2)'
    );
    heatmapCheckbox.addEventListener("change", function () {
      if (this.checked) {
        map.addLayer(heatLayer);
      } else {
        map.removeLayer(heatLayer);
      }
    });
  }

  // Simulate loading data (would be a real API call in production)
  setTimeout(function () {
    // Update statistics after "loading" data
    document.querySelector(".bg-gray-50 .text-sm").innerHTML = `
            <div class="flex justify-between">
                <span>Total Cases:</span>
                <span class="font-medium">1,245</span>
            </div>
            <div class="flex justify-between">
                <span>Active Cases:</span>
                <span class="font-medium">328</span>
            </div>
            <div class="flex justify-between">
                <span>Recovered:</span>
                <span class="font-medium">917</span>
            </div>
            <div class="flex justify-between">
                <span>Most Affected Area:</span>
                <span class="font-medium">Barangay Bucal</span>
            </div>
            <div class="flex justify-between">
                <span>Most Common Issue:</span>
                <span class="font-medium">Respiratory</span>
            </div>
        `;
  }, 1000);
});
