// Location Data for Barangay Bucal Health Center System
const locationData = {
  familyVille: {
    name: "Family Ville",
    address: "Sitio Family Ville, Barangay Bucal, Tanza, Cavite",
    population: 342,
    vaccinated: 289,
    consultations: 124,
    users: 78,
    maternal: 23,
    newborn: 12,
    postpartum: 8,
    seniors: 45,
    ageDistribution: {
      "0-18": 89,
      "19-35": 156,
      "36-50": 72,
      "51-65": 18,
      "65+": 7
    },
    nearestFacility: "Barangay Health Center",
    distanceToHC: "1.8 km",
    primaryProvider: "Barangay Health Worker Maria Santos",
    lastSurvey: "March 2024",
    vaxCoverage: "84.5%",
    riskLevel: "Low"
  },
  
  umboy: {
    name: "Umboy",
    address: "Sitio Umboy, Barangay Bucal, Tanza, Cavite",
    population: 267,
    vaccinated: 201,
    consultations: 89,
    users: 52,
    maternal: 18,
    newborn: 9,
    postpartum: 6,
    seniors: 38,
    ageDistribution: {
      "0-18": 67,
      "19-35": 112,
      "36-50": 58,
      "51-65": 22,
      "65+": 8
    },
    nearestFacility: "Mobile Health Unit",
    distanceToHC: "2.1 km",
    primaryProvider: "Community Health Worker Juan Cruz",
    lastSurvey: "February 2024",
    vaxCoverage: "75.3%",
    riskLevel: "Medium"
  },

  ibaba: {
    name: "Ibaba",
    address: "Sitio Ibaba, Barangay Bucal, Tanza, Cavite",
    population: 445,
    vaccinated: 367,
    consultations: 178,
    users: 134,
    maternal: 32,
    newborn: 18,
    postpartum: 12,
    seniors: 67,
    ageDistribution: {
      "0-18": 123,
      "19-35": 189,
      "36-50": 89,
      "51-65": 33,
      "65+": 11
    },
    nearestFacility: "Barangay Health Center",
    distanceToHC: "1.2 km",
    primaryProvider: "Nurse Practitioner Ana Reyes",
    lastSurvey: "April 2024",
    vaxCoverage: "82.5%",
    riskLevel: "Low"
  },

  graceland: {
    name: "Graceland",
    address: "Sitio Graceland, Barangay Bucal, Tanza, Cavite",
    population: 298,
    vaccinated: 234,
    consultations: 112,
    users: 89,
    maternal: 21,
    newborn: 11,
    postpartum: 7,
    seniors: 42,
    ageDistribution: {
      "0-18": 78,
      "19-35": 134,
      "36-50": 62,
      "51-65": 19,
      "65+": 5
    },
    nearestFacility: "Rural Health Unit",
    distanceToHC: "1.5 km",
    primaryProvider: "Midwife Rosa Martinez",
    lastSurvey: "March 2024",
    vaxCoverage: "78.5%",
    riskLevel: "Low"
  },

  healthCenter: {
    name: "Barangay Health Center",
    address: "Main Health Center, Barangay Bucal, Tanza, Cavite",
    population: 156,
    vaccinated: 156,
    consultations: 1247,
    users: 125,
    maternal: 45,
    newborn: 28,
    postpartum: 19,
    seniors: 23,
    ageDistribution: {
      "0-18": 34,
      "19-35": 67,
      "36-50": 38,
      "51-65": 12,
      "65+": 5
    },
    nearestFacility: "Main Health Center (Current Location)",
    distanceToHC: "0 km",
    primaryProvider: "Dr. Carmen Lopez, MD",
    lastSurvey: "Ongoing",
    vaxCoverage: "100%",
    riskLevel: "Low"
  },

  lotte: {
    name: "Lotte",
    address: "Sitio Lotte, Barangay Bucal, Tanza, Cavite",
    population: 389,
    vaccinated: 298,
    consultations: 145,
    users: 112,
    maternal: 28,
    newborn: 15,
    postpartum: 10,
    seniors: 58,
    ageDistribution: {
      "0-18": 101,
      "19-35": 167,
      "36-50": 78,
      "51-65": 32,
      "65+": 11
    },
    nearestFacility: "Barangay Health Center",
    distanceToHC: "0.8 km",
    primaryProvider: "Health Worker Lisa Garcia",
    lastSurvey: "April 2024",
    vaxCoverage: "76.6%",
    riskLevel: "Medium"
  },

  hermeno: {
    name: "Hermeno",
    address: "Sitio Hermeno, Barangay Bucal, Tanza, Cavite",
    population: 234,
    vaccinated: 187,
    consultations: 98,
    users: 67,
    maternal: 16,
    newborn: 8,
    postpartum: 5,
    seniors: 34,
    ageDistribution: {
      "0-18": 61,
      "19-35": 98,
      "36-50": 52,
      "51-65": 18,
      "65+": 5
    },
    nearestFacility: "Community Health Post",
    distanceToHC: "1.1 km",
    primaryProvider: "Barangay Health Worker Pedro Dela Cruz",
    lastSurvey: "February 2024",
    vaxCoverage: "79.9%",
    riskLevel: "Medium"
  },

  promiseLand: {
    name: "Promise Land",
    address: "Sitio Promise Land, Barangay Bucal, Tanza, Cavite",
    population: 567,
    vaccinated: 445,
    consultations: 234,
    users: 189,
    maternal: 41,
    newborn: 24,
    postpartum: 16,
    seniors: 78,
    ageDistribution: {
      "0-18": 156,
      "19-35": 223,
      "36-50": 134,
      "51-65": 42,
      "65+": 12
    },
    nearestFacility: "Barangay Health Center",
    distanceToHC: "1.4 km",
    primaryProvider: "Nurse Mary Jane Gonzales",
    lastSurvey: "March 2024",
    vaxCoverage: "78.5%",
    riskLevel: "Low"
  },

  springGreen: {
    name: "Spring Green",
    address: "Sitio Spring Green, Barangay Bucal, Tanza, Cavite",
    population: 423,
    vaccinated: 334,
    consultations: 167,
    users: 145,
    maternal: 31,
    newborn: 17,
    postpartum: 11,
    seniors: 62,
    ageDistribution: {
      "0-18": 118,
      "19-35": 178,
      "36-50": 89,
      "51-65": 28,
      "65+": 10
    },
    nearestFacility: "Rural Health Unit",
    distanceToHC: "1.7 km",
    primaryProvider: "Midwife Elena Ramos",
    lastSurvey: "April 2024",
    vaxCoverage: "78.9%",
    riskLevel: "Low"
  },

  ilaya: {
    name: "Ilaya",
    address: "Sitio Ilaya, Barangay Bucal, Tanza, Cavite",
    population: 356,
    vaccinated: 278,
    consultations: 134,
    users: 98,
    maternal: 26,
    newborn: 14,
    postpartum: 9,
    seniors: 51,
    ageDistribution: {
      "0-18": 94,
      "19-35": 152,
      "36-50": 78,
      "51-65": 25,
      "65+": 7
    },
    nearestFacility: "Barangay Health Center",
    distanceToHC: "1.3 km",
    primaryProvider: "Health Worker Roberto Silva",
    lastSurvey: "March 2024",
    vaxCoverage: "78.1%",
    riskLevel: "Medium"
  },

  countryHomes: {
    name: "Country Homes",
    address: "Sitio Country Homes, Barangay Bucal, Tanza, Cavite",
    population: 489,
    vaccinated: 389,
    consultations: 198,
    users: 167,
    maternal: 36,
    newborn: 20,
    postpartum: 13,
    seniors: 71,
    ageDistribution: {
      "0-18": 134,
      "19-35": 201,
      "36-50": 105,
      "51-65": 38,
      "65+": 11
    },
    nearestFacility: "Community Health Center",
    distanceToHC: "1.6 km",
    primaryProvider: "Nurse Supervisor Carmen Torres",
    lastSurvey: "April 2024",
    vaxCoverage: "79.5%",
    riskLevel: "Low"
  },

  heartFoundation1: {
    name: "Heart Foundation 1",
    address: "Sitio Heart Foundation 1, Barangay Bucal, Tanza, Cavite",
    population: 312,
    vaccinated: 245,
    consultations: 123,
    users: 89,
    maternal: 22,
    newborn: 12,
    postpartum: 8,
    seniors: 45,
    ageDistribution: {
      "0-18": 82,
      "19-35": 134,
      "36-50": 68,
      "51-65": 22,
      "65+": 6
    },
    nearestFacility: "Mobile Health Unit",
    distanceToHC: "2.3 km",
    primaryProvider: "Community Health Worker Diana Cruz",
    lastSurvey: "February 2024",
    vaxCoverage: "78.5%",
    riskLevel: "Medium"
  },

  annex: {
    name: "Annex",
    address: "Sitio Annex, Barangay Bucal, Tanza, Cavite",
    population: 178,
    vaccinated: 145,
    consultations: 76,
    users: 45,
    maternal: 12,
    newborn: 6,
    postpartum: 4,
    seniors: 26,
    ageDistribution: {
      "0-18": 47,
      "19-35": 78,
      "36-50": 38,
      "51-65": 12,
      "65+": 3
    },
    nearestFacility: "Rural Health Post",
    distanceToHC: "2.8 km",
    primaryProvider: "Health Aide Jose Mendoza",
    lastSurvey: "January 2024",
    vaxCoverage: "81.5%",
    riskLevel: "Medium"
  },

  phase1: {
    name: "Phase 1",
    address: "Sitio Phase 1, Barangay Bucal, Tanza, Cavite",
    population: 445,
    vaccinated: 356,
    consultations: 189,
    users: 134,
    maternal: 32,
    newborn: 18,
    postpartum: 12,
    seniors: 65,
    ageDistribution: {
      "0-18": 123,
      "19-35": 189,
      "36-50": 89,
      "51-65": 34,
      "65+": 10
    },
    nearestFacility: "Phase Health Clinic",
    distanceToHC: "2.1 km",
    primaryProvider: "Nurse Jessica Aquino",
    lastSurvey: "March 2024",
    vaxCoverage: "80.0%",
    riskLevel: "Low"
  },

  phase2: {
    name: "Phase 2",
    address: "Sitio Phase 2, Barangay Bucal, Tanza, Cavite",
    population: 398,
    vaccinated: 312,
    consultations: 156,
    users: 123,
    maternal: 29,
    newborn: 16,
    postpartum: 10,
    seniors: 58,
    ageDistribution: {
      "0-18": 109,
      "19-35": 167,
      "36-50": 82,
      "51-65": 31,
      "65+": 9
    },
    nearestFacility: "Phase Health Clinic",
    distanceToHC: "1.9 km",
    primaryProvider: "Midwife Patricia Villanueva",
    lastSurvey: "April 2024",
    vaxCoverage: "78.4%",
    riskLevel: "Low"
  },

  phase3: {
    name: "Phase 3",
    address: "Sitio Phase 3, Barangay Bucal, Tanza, Cavite",
    population: 356,
    vaccinated: 278,
    consultations: 145,
    users: 98,
    maternal: 26,
    newborn: 14,
    postpartum: 9,
    seniors: 52,
    ageDistribution: {
      "0-18": 98,
      "19-35": 145,
      "36-50": 76,
      "51-65": 28,
      "65+": 9
    },
    nearestFacility: "Community Health Post",
    distanceToHC: "2.2 km",
    primaryProvider: "Health Worker Miguel Santos",
    lastSurvey: "February 2024",
    vaxCoverage: "78.1%",
    riskLevel: "Medium"
  },

  phase4: {
    name: "Phase 4",
    address: "Sitio Phase 4, Barangay Bucal, Tanza, Cavite",
    population: 423,
    vaccinated: 334,
    consultations: 178,
    users: 145,
    maternal: 31,
    newborn: 17,
    postpartum: 11,
    seniors: 61,
    ageDistribution: {
      "0-18": 116,
      "19-35": 178,
      "36-50": 89,
      "51-65": 31,
      "65+": 9
    },
    nearestFacility: "Phase Health Clinic",
    distanceToHC: "2.5 km",
    primaryProvider: "Nurse Gloria Hernandez",
    lastSurvey: "March 2024",
    vaxCoverage: "78.9%",
    riskLevel: "Low"
  },

  southgate1: {
    name: "Southgate 1",
    address: "Sitio Southgate 1, Barangay Bucal, Tanza, Cavite",
    population: 267,
    vaccinated: 201,
    consultations: 112,
    users: 78,
    maternal: 19,
    newborn: 10,
    postpartum: 7,
    seniors: 39,
    ageDistribution: {
      "0-18": 73,
      "19-35": 112,
      "36-50": 58,
      "51-65": 19,
      "65+": 5
    },
    nearestFacility: "Southgate Health Unit",
    distanceToHC: "3.1 km",
    primaryProvider: "Health Worker Sandra Lim",
    lastSurvey: "January 2024",
    vaxCoverage: "75.3%",
    riskLevel: "Medium"
  },

  southgate2: {
    name: "Southgate 2",
    address: "Sitio Southgate 2, Barangay Bucal, Tanza, Cavite",
    population: 298,
    vaccinated: 234,
    consultations: 123,
    users: 89,
    maternal: 21,
    newborn: 11,
    postpartum: 7,
    seniors: 43,
    ageDistribution: {
      "0-18": 81,
      "19-35": 125,
      "36-50": 65,
      "51-65": 21,
      "65+": 6
    },
    nearestFacility: "Southgate Health Unit",
    distanceToHC: "2.7 km",
    primaryProvider: "Midwife Angela Reyes",
    lastSurvey: "February 2024",
    vaxCoverage: "78.5%",
    riskLevel: "Medium"
  },

  northgate1: {
    name: "Northgate 1",
    address: "Sitio Northgate 1, Barangay Bucal, Tanza, Cavite",
    population: 389,
    vaccinated: 312,
    consultations: 167,
    users: 134,
    maternal: 28,
    newborn: 15,
    postpartum: 10,
    seniors: 57,
    ageDistribution: {
      "0-18": 107,
      "19-35": 167,
      "36-50": 82,
      "51-65": 26,
      "65+": 7
    },
    nearestFacility: "Northgate Health Center",
    distanceToHC: "1.8 km",
    primaryProvider: "Nurse Supervisor Teresa Cruz",
    lastSurvey: "April 2024",
    vaxCoverage: "80.2%",
    riskLevel: "Low"
  },

  northgate2: {
    name: "Northgate 2",
    address: "Sitio Northgate 2, Barangay Bucal, Tanza, Cavite",
    population: 334,
    vaccinated: 267,
    consultations: 145,
    users: 112,
    maternal: 24,
    newborn: 13,
    postpartum: 8,
    seniors: 48,
    ageDistribution: {
      "0-18": 92,
      "19-35": 145,
      "36-50": 71,
      "51-65": 21,
      "65+": 5
    },
    nearestFacility: "Northgate Health Center",
    distanceToHC: "2.4 km",
    primaryProvider: "Health Worker Carlos Mendez",
    lastSurvey: "March 2024",
    vaxCoverage: "79.9%",
    riskLevel: "Low"
  }
};

// Global chart variable
let ageChart = null;

// Function to create/update pie chart
function updateAgeChart(data) {
  const ctx = document.getElementById('ageChart').getContext('2d');
  
  if (ageChart) {
    ageChart.destroy();
  }
  
  const ageData = data.ageDistribution;
  
  ageChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
      datasets: [{
        data: [
          ageData['0-18'],
          ageData['19-35'],
          ageData['36-50'],
          ageData['51-65'],
          ageData['65+']
        ],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#F97316',
          '#EF4444'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

// Function to update location information display
function updateLocationInfo(locationKey) {
  const data = locationData[locationKey];
  if (!data) return;

  // Show the info container
  document.getElementById('location-info').style.display = 'block';

  // Update basic info
  document.getElementById('location-name').textContent = data.name;
  document.getElementById('location-address').textContent = data.address;

  // Update statistics
  document.getElementById('stat-population').textContent = data.population.toLocaleString();
  document.getElementById('stat-vaccinated').textContent = data.vaccinated.toLocaleString();
  document.getElementById('stat-consultations').textContent = data.consultations.toLocaleString();
  document.getElementById('stat-users').textContent = data.users.toLocaleString();

  // Update health categories
  document.getElementById('stat-maternal').textContent = data.maternal.toLocaleString();
  document.getElementById('stat-newborn').textContent = data.newborn.toLocaleString();
  document.getElementById('stat-postpartum').textContent = data.postpartum.toLocaleString();
  document.getElementById('stat-seniors').textContent = data.seniors.toLocaleString();

  // Update age distribution
  const ageGroups = ['0-18', '19-35', '36-50', '51-65', '65plus'];
  const ageKeys = ['0-18', '19-35', '36-50', '51-65', '65+'];
  
  ageGroups.forEach((group, index) => {
    const count = data.ageDistribution[ageKeys[index]];
    const percentage = (count / data.population * 100);
    
    document.getElementById(`age-${group}-count`).textContent = count.toLocaleString();
    document.getElementById(`age-${group}`).style.height = `${Math.max(percentage, 10)}%`;
  });

  // Update additional information
  document.getElementById('nearest-facility').textContent = data.nearestFacility;
  document.getElementById('distance-hc').textContent = data.distanceToHC;
  document.getElementById('primary-provider').textContent = data.primaryProvider;
  document.getElementById('last-survey').textContent = data.lastSurvey;
  document.getElementById('vax-coverage').textContent = data.vaxCoverage;
  document.getElementById('risk-level').textContent = data.riskLevel;

  // Update pie chart
  updateAgeChart(data);

  // Scroll to the information section
  document.getElementById('location-info').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

// Event listeners for location points
document.addEventListener('DOMContentLoaded', function() {
  const locationPoints = document.querySelectorAll('.location-point');
  
  locationPoints.forEach(point => {
    point.addEventListener('click', function() {
      const locationKey = this.getAttribute('data-location');
      updateLocationInfo(locationKey);
      
      // Add visual feedback
      locationPoints.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    });
  });
});