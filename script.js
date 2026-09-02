// Global Variables
let currentSection = 'main-dashboard';
let charts = {};

// Register Chart.js Datalabels Plugin
Chart.register(ChartDataLabels);

// Default Sample Data (Baseline Data from dashboard changes.xlsx)
const defaultSampleData = {
    ekycStatus: {
        total: 645072,
        completed: 508480,
        pending: 136592,
        talukas: {
            'सावंतवाडी': { total: 105921, completed: 88059, pending: 17862 },
            'वेंगुर्ला': { total: 65685, completed: 54454, pending: 11231 },
            'मालवण': { total: 83698, completed: 68309, pending: 15389 },
            'कणकवली': { total: 103008, completed: 81259, pending: 21749 },
            'देवगड': { total: 94612, completed: 72270, pending: 22342 },
            'वैभववाडी': { total: 37457, completed: 28458, pending: 8999 },
            'दोडामार्ग': { total: 34102, completed: 25863, pending: 8239 },
            'कुडाळ': { total: 120589, completed: 89808, pending: 30781 }
        }
    },
    fairPriceShops: {
        total: 461,
        active: 461,
        beneficiaries: 0,
        talukas: {
            'Devgad': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS001', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१५' } ],
            'Dodamarg': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS002', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१४' } ],
            'Kankavli': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS003', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१६' } ],
            'Kudal': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS004', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१५' } ],
            'Malvan': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS005', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१७' } ],
            'Sawantwadi': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS006', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१०' } ],
            'Vaibhavwadi': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS007', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१६' } ],
            'Vengurla': [ { shopNumber: 'दुकान क्रमांक १', id: 'FPS008', status: 'सक्रिय', beneficiaries: 0, lastUpdated: '२०२४-०१-१५' } ]
        }
    },
    warehouseAndFoodSecurity: {
        warehouses: [
            { id: 1, name: 'सावंतवाडी', capacity: 500 },
            { id: 2, name: 'कुडाळ', capacity: 1100 },
            { id: 3, name: 'वेंगुर्ला', capacity: 1680 },
            { id: 4, name: 'कणकवली', capacity: 1000 },
            { id: 5, name: 'मालवण', capacity: 500 },
            { id: 6, name: 'आचरा', capacity: 1000 },
            { id: 7, name: 'देवगड', capacity: 1080 },
            { id: 8, name: 'विजयदुर्ग', capacity: 600 },
            { id: 9, name: 'वैभववाडी', capacity: 500 },
            { id: 10, name: 'दोडामार्ग', capacity: 500 }
        ],
        totalCapacity: 8460,
        rationCards: {
            keroseneLicenseHolders: 330,
            totalRationCards: 229982,
            totalBeneficiaries: 148094,
            categories: {
                'अंत्योदय (AAY)': 20690,
                'NPH (केशरी)': 37799,
                'शुभ्र (White)': 21650
            },
            talukaDataDetails: [
                { 'srNo': 1, 'tfso': 'VENGURLA', 'aay_rcs': 1756, 'aay_units': 7346, 'apl_white_rcs': 2272, 'apl_white_units': 7509, 'phh_rcs': 15906, 'phh_units': 58339, 'nph_rcs': 3947, 'nph_units': 11273, 'total_rcs': 23881, 'total_units': 84467 },
                { 'srNo': 2, 'tfso': 'SAWANTWADI', 'aay_rcs': 3250, 'aay_units': 11138, 'apl_white_rcs': 3918, 'apl_white_units': 13378, 'phh_rcs': 24530, 'phh_units': 94783, 'nph_rcs': 6554, 'nph_units': 19776, 'total_rcs': 38252, 'total_units': 139075 },
                { 'srNo': 3, 'tfso': 'KUDAL', 'aay_rcs': 4974, 'aay_units': 17039, 'apl_white_rcs': 4611, 'apl_white_units': 14731, 'phh_rcs': 26937, 'phh_units': 103550, 'nph_rcs': 5183, 'nph_units': 15005, 'total_rcs': 41708, 'total_units': 150333 },
                { 'srNo': 4, 'tfso': 'KANKAVLI', 'aay_rcs': 4008, 'aay_units': 13396, 'apl_white_rcs': 4995, 'apl_white_units': 13995, 'phh_rcs': 23814, 'phh_units': 89612, 'nph_rcs': 6116, 'nph_units': 17262, 'total_rcs': 38933, 'total_units': 134265 },
                { 'srNo': 5, 'tfso': 'MALVAN', 'aay_rcs': 2792, 'aay_units': 8913, 'apl_white_rcs': 2716, 'apl_white_units': 6711, 'phh_rcs': 20300, 'phh_units': 74785, 'nph_rcs': 8455, 'nph_units': 24825, 'total_rcs': 34263, 'total_units': 115234 },
                { 'srNo': 6, 'tfso': 'VAIBHAVWADI', 'aay_rcs': 1565, 'aay_units': 5125, 'apl_white_rcs': 666, 'apl_white_units': 1935, 'phh_rcs': 8432, 'phh_units': 32332, 'nph_rcs': 905, 'nph_units': 1951, 'total_rcs': 11568, 'total_units': 41343 },
                { 'srNo': 7, 'tfso': 'DEVGAD', 'aay_rcs': 1518, 'aay_units': 5721, 'apl_white_rcs': 1591, 'apl_white_units': 5203, 'phh_rcs': 21305, 'phh_units': 88891, 'nph_rcs': 4200, 'nph_units': 12428, 'total_rcs': 28614, 'total_units': 112243 },
                { 'srNo': 8, 'tfso': 'DODAMARG', 'aay_rcs': 827, 'aay_units': 2373, 'apl_white_rcs': 881, 'apl_white_units': 3090, 'phh_rcs': 8616, 'phh_units': 31729, 'nph_rcs': 2439, 'nph_units': 7959, 'total_rcs': 12570, 'total_units': 44581 }
            ]
        }
    }
};

// Active sampleData object (loaded from localStorage or default)
let sampleData = loadDashboardData();

async function loadDashboardData() {
    const saved = localStorage.getItem('supply_dashboard_data');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved dashboard data:', e);
        }
    }
    try {
        const response = await fetch('./data.json');
        if (response.ok) {
            const fetchedData = await response.json();
            return fetchedData;
        }
    } catch (e) {
        console.warn('Could not fetch data.json, falling back to defaultSampleData:', e);
    }
    return JSON.parse(JSON.stringify(defaultSampleData));
}

function persistDashboardData() {
    localStorage.setItem('supply_dashboard_data', JSON.stringify(sampleData));
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', async function() {
    sampleData = await loadDashboardData();
    initializeDashboard();
    setupEventListeners();
    setupSecretAdminTrigger();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function initializeDashboard() {
    updateMainDashboardStats();
    initializeEkycStatusSection();
    initializeFairPriceSection();
    initializeWarehouseCapacitySection();
    initializeRationCardStatusSection();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            navigateToSection(targetSection);
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const nav = document.getElementById('navigation');
            if (nav) nav.classList.toggle('mobile-open');
        });
    }
}

function navigateToSection(sectionId) {
    console.log('Navigating to section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section found and activated:', sectionId);
    } else {
        console.error('Section not found:', sectionId);
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeNavLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }

    currentSection = sectionId;

    // Initialize charts for the section
    setTimeout(() => {
        if (sectionId === 'ekyc-status') {
            initializeEkycCharts();
        } else if (sectionId === 'ekyc-table') {
            populateEkycStatusTable();
        } else if (sectionId === 'fair-price') {
            initializeFairPriceCharts();
        } else if (sectionId === 'warehouse-capacity') {
            try {
                console.log('Initializing warehouse capacity section');
                if (typeof initializeWarehouseCapacityCharts === 'function') {
                    initializeWarehouseCapacityCharts();
                } else {
                    console.error('initializeWarehouseCapacityCharts function not found');
                }
                if (typeof populateWarehouseTable === 'function') {
                    populateWarehouseTable();
                } else {
                    console.error('populateWarehouseTable function not found');
                }
            } catch (error) {
                console.error('Error initializing warehouse capacity section:', error);
            }
        } else if (sectionId === 'ration-card-status') {
            try {
                console.log('Initializing ration card status section');
                if (typeof initializeFoodSecurityCharts === 'function') {
                    initializeFoodSecurityCharts();
                } else {
                    console.error('initializeFoodSecurityCharts function not found');
                }
                if (typeof populateRationCardTable === 'function') {
                    populateRationCardTable();
                } else {
                    console.error('populateRationCardTable function not found');
                }
            } catch (error) {
                console.error('Error initializing ration card status section:', error);
            }
        }
    }, 100);
}

function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    const todayDate = now.toLocaleDateString('mr-IN', options);
    document.getElementById('todayDate').textContent = todayDate;
}

// Main Dashboard Functions
function updateMainDashboardStats() {
    document.getElementById('totalEkyc').textContent = sampleData.ekycStatus.total.toLocaleString();
    document.getElementById('completedEkyc').textContent = sampleData.ekycStatus.completed.toLocaleString();
    document.getElementById('pendingEkyc').textContent = sampleData.ekycStatus.pending.toLocaleString();
    document.getElementById('totalShops').textContent = sampleData.fairPriceShops.total.toLocaleString();
}

// eKYC Status Section Functions
function initializeEkycStatusSection() {
    populateEkycStatusTable();
}

function populateEkycStatusTable() {
    const tbody = document.getElementById('ekycStatusTableBody');
    tbody.innerHTML = '';

    Object.entries(sampleData.ekycStatus.talukas).forEach(([taluka, data]) => {
        const completionRate = ((data.completed / data.total) * 100).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${taluka}</td>
            <td>${data.total.toLocaleString()}</td>
            <td>${data.completed.toLocaleString()}</td>
            <td>${data.pending.toLocaleString()}</td>
            <td>${completionRate}%</td>
        `;
        tbody.appendChild(row);
    });

    // Add Total summary row matching Excel sheet
    const totalRow = document.createElement('tr');
    totalRow.style.fontWeight = 'bold';
    totalRow.style.backgroundColor = '#f0f0f0';
    const totalCompletionRate = ((sampleData.ekycStatus.completed / sampleData.ekycStatus.total) * 100).toFixed(2);
    totalRow.innerHTML = `
        <td>Total</td>
        <td>${sampleData.ekycStatus.total.toLocaleString()}</td>
        <td>${sampleData.ekycStatus.completed.toLocaleString()}</td>
        <td>${sampleData.ekycStatus.pending.toLocaleString()}</td>
        <td>${totalCompletionRate}%</td>
    `;
    tbody.appendChild(totalRow);
}

function initializeEkycCharts() {
    // Destroy existing charts if they exist
    if (charts.ekycPie) charts.ekycPie.destroy();
    if (charts.ekycBar) charts.ekycBar.destroy();

    // Pie Chart for Overall Status
    const pieCtx = document.getElementById('ekycPieChart').getContext('2d');
    charts.ekycPie = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['पूर्ण झाले', 'प्रलंबित'],
            datasets: [{
                data: [sampleData.ekycStatus.completed, sampleData.ekycStatus.pending],
                backgroundColor: ['#10b981', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 8
                    },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${value.toLocaleString()}\n(${percentage}%)`;
                    },
                    padding: 4,
                    anchor: 'center',
                    align: 'center',
                    textAlign: 'center'
                }
            }
        }
    });

    // Bar Chart for Taluka Comparison
    const barCtx = document.getElementById('ekycBarChart').getContext('2d');
    const talukaNames = Object.keys(sampleData.ekycStatus.talukas);
    const completedData = talukaNames.map(t => sampleData.ekycStatus.talukas[t].completed);
    const pendingData = talukaNames.map(t => sampleData.ekycStatus.talukas[t].pending);

    charts.ekycBar = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: talukaNames,
            datasets: [{
                label: 'पूर्ण झाले',
                data: completedData,
                backgroundColor: '#10b981'
            }, {
                label: 'प्रलंबित',
                data: pendingData,
                backgroundColor: '#f59e0b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

function refreshEkycStatus() {
    const filter = document.getElementById('statusFilter').value;
    
    // Show loading state
    const tbody = document.getElementById('ekycStatusTableBody');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;"><div class="loading"></div> Loading data...</td></tr>';
    
    // Simulate API call
    setTimeout(() => {
        populateEkycStatusTable();
        initializeEkycCharts();
    }, 1000);
}

// Fair Price Shop Section Functions
function initializeFairPriceSection() {
    updateFairPriceStats();
}

function updateFairPriceStats() {
    document.getElementById('totalShopCount').textContent = sampleData.fairPriceShops.total.toLocaleString();
    document.getElementById('activeShopCount').textContent = sampleData.fairPriceShops.active.toLocaleString();
}

function initializeFairPriceCharts() {
    // Destroy existing charts if they exist
    if (charts.fairPrice) charts.fairPrice.destroy();
    if (charts.shopPerformance) charts.shopPerformance.destroy();

    // Pie Chart for Shop Distribution
    const talukaCounts = {
        'Devgad': 66,
        'Dodamarg': 31,
        'Kankavli': 75,
        'Kudal': 80,
        'Malvan': 70,
        'Sawantwadi': 66,
        'Vaibhavwadi': 34,
        'Vengurla': 39
    };

    const pieCtx = document.getElementById('fairPriceChart').getContext('2d');
    charts.fairPrice = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(talukaCounts),
            datasets: [{
                data: Object.values(talukaCounts),
                backgroundColor: [
                    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
                    '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value} shops`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(0);
                        return value > 30 ? value.toString() : '';
                    },
                    padding: 3,
                    anchor: 'center',
                    align: 'center',
                    textAlign: 'center'
                }
            }
        }
    });

    // Bar Chart for Shop Performance
    const performanceCtx = document.getElementById('shopPerformanceChart').getContext('2d');
    const talukaNames = Object.keys(talukaCounts);

    charts.shopPerformance = new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: talukaNames,
            datasets: [{
                label: 'ऑनलाइन दुकाने',
                data: Object.values(talukaCounts),
                backgroundColor: '#10b981',
                borderColor: '#059669',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

function exportShopData() {
    // Simulate export functionality
    const data = [];
    Object.entries(sampleData.fairPriceShops.talukas).forEach(([taluka, shops]) => {
        shops.forEach(shop => {
            data.push({
                'तालुका': taluka,
                'दुकान क्रमांक': shop.shopNumber,
                'दुकान ID': shop.id,
                'स्थिती': shop.status,
                'लाभार्थी': shop.beneficiaries,
                'अद्यतनित': shop.lastUpdated
            });
        });
    });

    // Create CSV content
    const csvContent = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'राष्ट्रीय_बँक_दुकाने_डेटा.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString('en-IN');
}

function getCompletionRate(completed, total) {
    return ((completed / total) * 100).toFixed(1);
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Handle window resize for responsive charts
window.addEventListener('resize', () => {
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
});

// Warehouse and Food Security Section Functions
function initializeWarehouseCapacitySection() {
    updateWarehouseCapacityStats();
}

function updateWarehouseCapacityStats() {
    document.getElementById('totalWarehouses').textContent = sampleData.warehouseAndFoodSecurity.warehouses.length;
    document.getElementById('totalCapacity').textContent = sampleData.warehouseAndFoodSecurity.totalCapacity.toLocaleString();
}

function initializeRationCardStatusSection() {
    updateRationCardStatusStats();
    populateRationCardTalukaTable();
}

function updateRationCardStatusStats() {
    document.getElementById('totalRationCards').textContent = sampleData.warehouseAndFoodSecurity.rationCards.totalRationCards.toLocaleString();
}

function populateWarehouseTable() {
    const tbody = document.getElementById('warehouseTableBody');
    tbody.innerHTML = '';

    sampleData.warehouseAndFoodSecurity.warehouses.forEach((warehouse, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${warehouse.name}</td>
            <td>${warehouse.capacity.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateRationCardTable() {
    // This function is no longer needed as we removed the summary table
    // Only populate the taluka-wise table
    populateRationCardTalukaTable();
}

function populateRationCardTalukaTable() {
    const tbody = document.getElementById('rationCardTalukaTableBody');
    tbody.innerHTML = '';

    const talukaData = sampleData.warehouseAndFoodSecurity.rationCards.talukaDataDetails || defaultSampleData.warehouseAndFoodSecurity.rationCards.talukaDataDetails;

    let totAayRcs = 0, totAayUnits = 0;
    let totAplRcs = 0, totAplUnits = 0;
    let totPhhRcs = 0, totPhhUnits = 0;
    let totNphRcs = 0, totNphUnits = 0;
    let grandTotalRcs = 0, grandTotalUnits = 0;

    talukaData.forEach((taluka, index) => {
        const totalRcs = taluka.total_rcs || (taluka.aay_rcs + taluka.apl_white_rcs + taluka.phh_rcs + taluka.nph_rcs);
        const totalUnits = taluka.total_units || (taluka.aay_units + taluka.apl_white_units + taluka.phh_units + taluka.nph_units);

        totAayRcs += taluka.aay_rcs; totAayUnits += taluka.aay_units;
        totAplRcs += taluka.apl_white_rcs; totAplUnits += taluka.apl_white_units;
        totPhhRcs += taluka.phh_rcs; totPhhUnits += taluka.phh_units;
        totNphRcs += taluka.nph_rcs; totNphUnits += taluka.nph_units;
        grandTotalRcs += totalRcs; grandTotalUnits += totalUnits;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${taluka['tfso']}</td>
            <td>${taluka['aay_rcs'].toLocaleString()}</td>
            <td>${taluka['aay_units'].toLocaleString()}</td>
            <td>${taluka['apl_white_rcs'].toLocaleString()}</td>
            <td>${taluka['apl_white_units'].toLocaleString()}</td>
            <td>${taluka['phh_rcs'].toLocaleString()}</td>
            <td>${taluka['phh_units'].toLocaleString()}</td>
            <td>${taluka['nph_rcs'].toLocaleString()}</td>
            <td>${taluka['nph_units'].toLocaleString()}</td>
            <td>${totalRcs.toLocaleString()}</td>
            <td>${totalUnits.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });

    // Add DFSO For Selection Total row
    const totalRow = document.createElement('tr');
    totalRow.style.fontWeight = 'bold';
    totalRow.style.backgroundColor = '#f0f0f0';
    totalRow.innerHTML = `
        <td>Total</td>
        <td>DFSO For Selection Total</td>
        <td>${totAayRcs.toLocaleString()}</td>
        <td>${totAayUnits.toLocaleString()}</td>
        <td>${totAplRcs.toLocaleString()}</td>
        <td>${totAplUnits.toLocaleString()}</td>
        <td>${totPhhRcs.toLocaleString()}</td>
        <td>${totPhhUnits.toLocaleString()}</td>
        <td>${totNphRcs.toLocaleString()}</td>
        <td>${totNphUnits.toLocaleString()}</td>
        <td>${grandTotalRcs.toLocaleString()}</td>
        <td>${grandTotalUnits.toLocaleString()}</td>
    `;
    tbody.appendChild(totalRow);

    // Add Percentum row
    const pctAayRcs = grandTotalRcs ? ((totAayRcs / grandTotalRcs) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctAayUnits = grandTotalUnits ? ((totAayUnits / grandTotalUnits) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctAplRcs = grandTotalRcs ? ((totAplRcs / grandTotalRcs) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctAplUnits = grandTotalUnits ? ((totAplUnits / grandTotalUnits) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctPhhRcs = grandTotalRcs ? ((totPhhRcs / grandTotalRcs) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctPhhUnits = grandTotalUnits ? ((totPhhUnits / grandTotalUnits) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctNphRcs = grandTotalRcs ? ((totNphRcs / grandTotalRcs) * 100).toFixed(2) + ' %' : '0.00 %';
    const pctNphUnits = grandTotalUnits ? ((totNphUnits / grandTotalUnits) * 100).toFixed(2) + ' %' : '0.00 %';

    const percentRow = document.createElement('tr');
    percentRow.style.fontWeight = 'bold';
    percentRow.style.backgroundColor = '#e8e8e8';
    percentRow.innerHTML = `
        <td></td>
        <td>Percentum</td>
        <td>${pctAayRcs}</td>
        <td>${pctAayUnits}</td>
        <td>${pctAplRcs}</td>
        <td>${pctAplUnits}</td>
        <td>${pctPhhRcs}</td>
        <td>${pctPhhUnits}</td>
        <td>${pctNphRcs}</td>
        <td>${pctNphUnits}</td>
        <td></td>
        <td></td>
    `;
    tbody.appendChild(percentRow);
}

function initializeWarehouseCapacityCharts() {
    // Destroy existing charts if they exist
    if (charts.warehouseCapacity) charts.warehouseCapacity.destroy();

    // Bar Chart for Warehouse Capacity
    const warehouseCtx = document.getElementById('warehouseCapacityChart').getContext('2d');
    const warehouseNames = sampleData.warehouseAndFoodSecurity.warehouses.map(w => w.name);
    const warehouseCapacities = sampleData.warehouseAndFoodSecurity.warehouses.map(w => w.capacity);

    charts.warehouseCapacity = new Chart(warehouseCtx, {
        type: 'bar',
        data: {
            labels: warehouseNames,
            datasets: [{
                label: 'क्षमता (मे.टन)',
                data: warehouseCapacities,
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 10
                    },
                    formatter: (value) => value.toLocaleString(),
                    anchor: 'center',
                    align: 'center',
                    textAlign: 'center'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

function initializeFoodSecurityCharts() {
    // Destroy existing charts if they exist
    if (charts.foodSecurity) charts.foodSecurity.destroy();

    // Pie Chart for Food Security Beneficiary Distribution
    const foodSecurityCtx = document.getElementById('foodSecurityChart').getContext('2d');
    
    // Include total beneficiaries in the chart data
    const chartData = {
        'अन्नसुरक्षा लाभार्थी': sampleData.warehouseAndFoodSecurity.rationCards.totalBeneficiaries,
        'अंत्योदय (AAY)': sampleData.warehouseAndFoodSecurity.rationCards.categories['अंत्योदय (AAY)'],
        'NPH (केशरी)': sampleData.warehouseAndFoodSecurity.rationCards.categories['NPH (केशरी)'],
        'शुभ्र (White)': sampleData.warehouseAndFoodSecurity.rationCards.categories['शुभ्र (White)']
    };

    const categories = Object.keys(chartData);
    const categoryValues = Object.values(chartData);

    charts.foodSecurity = new Chart(foodSecurityCtx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: categoryValues,
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    },
                    padding: 4,
                    anchor: 'center',
                    align: 'center',
                    textAlign: 'center'
                }
            }
        }
    });
}

/* ==========================================================================
   ADMIN PANEL & SECRET TRIGGER (15 Clicks) & SHA-256 SECURITY & CRUD
   ========================================================================== */

let tapTimestamps = [];
let logoTapTimestamps = [];

function setupSecretAdminTrigger() {
    // Method 1: Tapping the Logo 5 times (Click & Touch for Android)
    const logoEl = document.querySelector('.logo');
    if (logoEl) {
        const handleLogoTap = function(e) {
            e.stopPropagation();
            if (window.getSelection) window.getSelection().removeAllRanges();
            const now = Date.now();
            logoTapTimestamps.push(now);
            logoTapTimestamps = logoTapTimestamps.filter(t => now - t <= 4000);
            if (logoTapTimestamps.length >= 5) {
                logoTapTimestamps = [];
                openAdminPortal();
            }
        };

        logoEl.addEventListener('click', handleLogoTap);
        logoEl.addEventListener('touchstart', handleLogoTap, { passive: true });
    }

    // Method 2: Keyboard Shortcut (Ctrl + Shift + A)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
            e.preventDefault();
            openAdminPortal();
        }
    });

    // Method 3: 5 Rapid taps anywhere on empty page space (Click & Touch for Android)
    const handleGlobalTap = function(e) {
        if (e.target.closest('.modal-card') || e.target.closest('.action-btn') || e.target.closest('button')) return;
        if (window.getSelection) window.getSelection().removeAllRanges();

        const now = Date.now();
        tapTimestamps.push(now);
        tapTimestamps = tapTimestamps.filter(t => now - t <= 4000);

        if (tapTimestamps.length >= 5) {
            tapTimestamps = [];
            openAdminPortal();
        }
    };

    document.addEventListener('click', handleGlobalTap);
}

function openAdminPortal() {
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
        openAdminPanelModal();
    } else {
        openAdminLoginModal();
    }
}

// Security: SHA-256 hash of "password@123"
const ADMIN_PASSWORD_HASH = "2b217fd26f0506d7cfe87e08483838fe8bf130ce6b3a987d94adfd3d043454a5";

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyAdminPassword() {
    const input = document.getElementById('adminPasswordInput').value;
    const errorEl = document.getElementById('adminLoginError');
    if (!input) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'कृपया पासवर्ड प्रविष्ट करा.';
        return;
    }

    const hashedInput = await sha256(input);
    if (hashedInput === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem('admin_authenticated', 'true');
        errorEl.style.display = 'none';
        document.getElementById('adminPasswordInput').value = '';
        closeAdminLoginModal();
        openAdminPanelModal();
        showNotification('प्रशासक म्हणून यशस्वीरित्या प्रवेश केला!', 'success');
    } else {
        errorEl.style.display = 'block';
        errorEl.textContent = 'अवैध पासवर्ड! कृपया पुन्हा प्रयत्न करा.';
    }
}

function handlePasswordKeyUp(event) {
    if (event.key === 'Enter') {
        verifyAdminPassword();
    }
}

function openAdminLoginModal() {
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminLoginError').style.display = 'none';
    document.getElementById('adminLoginModal').classList.add('active');
}

function closeAdminLoginModal() {
    document.getElementById('adminLoginModal').classList.remove('active');
}

function openAdminPanelModal() {
    renderAdminEkycTable();
    renderAdminRationTable();
    renderAdminWarehouseTable();
    loadGitHubConfig();
    document.getElementById('adminFpsTotal').value = sampleData.fairPriceShops.total;
    document.getElementById('adminFpsActive').value = sampleData.fairPriceShops.active;
    document.getElementById('adminPanelModal').classList.add('active');
}

function closeAdminPanelModal() {
    document.getElementById('adminPanelModal').classList.remove('active');
}

function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));

    const activeBtn = document.querySelector(`[onclick="switchAdminTab('${tabId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');
}

// eKYC CRUD
function renderAdminEkycTable() {
    const tbody = document.getElementById('adminEkycTableBody');
    tbody.innerHTML = '';

    Object.entries(sampleData.ekycStatus.talukas).forEach(([taluka, data]) => {
        const tr = document.createElement('tr');
        tr.className = 'admin-ekyc-row';
        tr.innerHTML = `
            <td><input type="text" class="ekyc-taluka-name" value="${taluka}"></td>
            <td><input type="number" class="ekyc-taluka-total" value="${data.total}"></td>
            <td><input type="number" class="ekyc-taluka-completed" value="${data.completed}"></td>
            <td><input type="number" class="ekyc-taluka-pending" value="${data.pending}"></td>
            <td><button class="btn-admin btn-danger" onclick="deleteAdminRow(this)"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addAdminEkycRow() {
    const tbody = document.getElementById('adminEkycTableBody');
    const tr = document.createElement('tr');
    tr.className = 'admin-ekyc-row';
    tr.innerHTML = `
        <td><input type="text" class="ekyc-taluka-name" placeholder="तालुक्याचे नाव"></td>
        <td><input type="number" class="ekyc-taluka-total" value="0"></td>
        <td><input type="number" class="ekyc-taluka-completed" value="0"></td>
        <td><input type="number" class="ekyc-taluka-pending" value="0"></td>
        <td><button class="btn-admin btn-danger" onclick="deleteAdminRow(this)"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}

// Ration Card CRUD
function renderAdminRationTable() {
    const tbody = document.getElementById('adminRationTableBody');
    tbody.innerHTML = '';

    const list = sampleData.warehouseAndFoodSecurity.rationCards.talukaDataDetails || defaultSampleData.warehouseAndFoodSecurity.rationCards.talukaDataDetails;

    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'admin-ration-row';
        tr.innerHTML = `
            <td><input type="text" class="ration-tfso" value="${item.tfso}"></td>
            <td><input type="number" class="ration-aay-rcs" value="${item.aay_rcs}"></td>
            <td><input type="number" class="ration-aay-units" value="${item.aay_units}"></td>
            <td><input type="number" class="ration-apl-rcs" value="${item.apl_white_rcs}"></td>
            <td><input type="number" class="ration-apl-units" value="${item.apl_white_units}"></td>
            <td><input type="number" class="ration-phh-rcs" value="${item.phh_rcs}"></td>
            <td><input type="number" class="ration-phh-units" value="${item.phh_units}"></td>
            <td><input type="number" class="ration-nph-rcs" value="${item.nph_rcs}"></td>
            <td><input type="number" class="ration-nph-units" value="${item.nph_units}"></td>
            <td><button class="btn-admin btn-danger" onclick="deleteAdminRow(this)"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addAdminRationRow() {
    const tbody = document.getElementById('adminRationTableBody');
    const tr = document.createElement('tr');
    tr.className = 'admin-ration-row';
    tr.innerHTML = `
        <td><input type="text" class="ration-tfso" placeholder="TFSO Name"></td>
        <td><input type="number" class="ration-aay-rcs" value="0"></td>
        <td><input type="number" class="ration-aay-units" value="0"></td>
        <td><input type="number" class="ration-apl-rcs" value="0"></td>
        <td><input type="number" class="ration-apl-units" value="0"></td>
        <td><input type="number" class="ration-phh-rcs" value="0"></td>
        <td><input type="number" class="ration-phh-units" value="0"></td>
        <td><input type="number" class="ration-nph-rcs" value="0"></td>
        <td><input type="number" class="ration-nph-units" value="0"></td>
        <td><button class="btn-admin btn-danger" onclick="deleteAdminRow(this)"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}

// Warehouse CRUD
function renderAdminWarehouseTable() {
    const tbody = document.getElementById('adminWarehouseTableBody');
    tbody.innerHTML = '';

    sampleData.warehouseAndFoodSecurity.warehouses.forEach((w, idx) => {
        const tr = document.createElement('tr');
        tr.className = 'admin-wh-row';
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><input type="text" class="wh-name" value="${w.name}"></td>
            <td><input type="number" class="wh-capacity" value="${w.capacity}"></td>
            <td><button class="btn-admin btn-danger" onclick="deleteAdminRow(this)"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addAdminWarehouseRow() {
    const tbody = document.getElementById('adminWarehouseTableBody');
    const rowCount = tbody.children.length + 1;
    const tr = document.createElement('tr');
    tr.className = 'admin-wh-row';
    tr.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="wh-name" placeholder="गोदामाचे नाव"></td>
        <td><input type="number" class="wh-capacity" value="0"></td>
        <td><button class="btn-admin btn-danger" onclick="deleteAdminRow(this)"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
}

function deleteAdminRow(btn) {
    const row = btn.closest('tr');
    if (row) row.remove();
}

// Save All Admin Changes to State & LocalStorage
function saveAdminChanges() {
    // 1. eKYC Updates
    const ekycRows = document.querySelectorAll('.admin-ekyc-row');
    const newTalukas = {};
    let totalEkyc = 0;
    let completedEkyc = 0;
    let pendingEkyc = 0;

    ekycRows.forEach(row => {
        const name = row.querySelector('.ekyc-taluka-name').value.trim();
        const total = parseInt(row.querySelector('.ekyc-taluka-total').value) || 0;
        const completed = parseInt(row.querySelector('.ekyc-taluka-completed').value) || 0;
        const pending = parseInt(row.querySelector('.ekyc-taluka-pending').value) || 0;

        if (name) {
            newTalukas[name] = { total, completed, pending };
            totalEkyc += total;
            completedEkyc += completed;
            pendingEkyc += pending;
        }
    });

    sampleData.ekycStatus.talukas = newTalukas;
    sampleData.ekycStatus.total = totalEkyc;
    sampleData.ekycStatus.completed = completedEkyc;
    sampleData.ekycStatus.pending = pendingEkyc;

    // 2. Ration Cards Updates
    const rationRows = document.querySelectorAll('.admin-ration-row');
    const newRationList = [];
    let totAayRcs = 0, totAplRcs = 0, totNphRcs = 0, grandTotalRcs = 0;

    rationRows.forEach((row, idx) => {
        const tfso = row.querySelector('.ration-tfso').value.trim();
        const aay_rcs = parseInt(row.querySelector('.ration-aay-rcs').value) || 0;
        const aay_units = parseInt(row.querySelector('.ration-aay-units').value) || 0;
        const apl_white_rcs = parseInt(row.querySelector('.ration-apl-rcs').value) || 0;
        const apl_white_units = parseInt(row.querySelector('.ration-apl-units').value) || 0;
        const phh_rcs = parseInt(row.querySelector('.ration-phh-rcs').value) || 0;
        const phh_units = parseInt(row.querySelector('.ration-phh-units').value) || 0;
        const nph_rcs = parseInt(row.querySelector('.ration-nph-rcs').value) || 0;
        const nph_units = parseInt(row.querySelector('.ration-nph-units').value) || 0;

        if (tfso) {
            const rowTotalRcs = aay_rcs + apl_white_rcs + phh_rcs + nph_rcs;
            const rowTotalUnits = aay_units + apl_white_units + phh_units + nph_units;

            newRationList.push({
                srNo: idx + 1,
                tfso, aay_rcs, aay_units, apl_white_rcs, apl_white_units,
                phh_rcs, phh_units, nph_rcs, nph_units,
                total_rcs: rowTotalRcs, total_units: rowTotalUnits
            });

            totAayRcs += aay_rcs;
            totAplRcs += apl_white_rcs;
            totNphRcs += nph_rcs;
            grandTotalRcs += rowTotalRcs;
        }
    });

    sampleData.warehouseAndFoodSecurity.rationCards.talukaDataDetails = newRationList;
    sampleData.warehouseAndFoodSecurity.rationCards.totalRationCards = grandTotalRcs;
    sampleData.warehouseAndFoodSecurity.rationCards.categories = {
        'अंत्योदय (AAY)': totAayRcs,
        'NPH (केशरी)': totNphRcs,
        'शुभ्र (White)': totAplRcs
    };

    // 3. Fair Price Shops
    sampleData.fairPriceShops.total = parseInt(document.getElementById('adminFpsTotal').value) || 0;
    sampleData.fairPriceShops.active = parseInt(document.getElementById('adminFpsActive').value) || 0;

    // 4. Warehouse Capacities
    const whRows = document.querySelectorAll('.admin-wh-row');
    const newWarehouses = [];
    let totWhCap = 0;

    whRows.forEach((row, idx) => {
        const name = row.querySelector('.wh-name').value.trim();
        const capacity = parseInt(row.querySelector('.wh-capacity').value) || 0;
        if (name) {
            newWarehouses.push({ id: idx + 1, name, capacity });
            totWhCap += capacity;
        }
    });

    sampleData.warehouseAndFoodSecurity.warehouses = newWarehouses;
    sampleData.warehouseAndFoodSecurity.totalCapacity = totWhCap;

    // Persist & Refresh Dashboard UI
    persistDashboardData();
    initializeDashboard();
    navigateToSection(currentSection);
    closeAdminPanelModal();
    showNotification('डॅशबोर्ड डेटा बदल जतन केला!', 'success');

    // Automatically Publish Live to GitHub if Token is present
    const ghToken = getSavedGitHubToken();
    if (ghToken) {
        publishToGitHubSilently(ghToken);
    }
}

// Reset Admin Data back to baseline default
function resetAdminData() {
    if (confirm('तुम्हाला सर्व बदल हटवून मूळ स्थितीत रीसेट करायचे आहे का?')) {
        localStorage.removeItem('supply_dashboard_data');
        sampleData = JSON.parse(JSON.stringify(defaultSampleData));
        initializeDashboard();
        navigateToSection(currentSection);
        closeAdminPanelModal();
        showNotification('डॅशबोर्ड डेटा मूळ स्थितीत रीसेट केला!', 'success');
    }
}

// --- GITHUB AUTO-DEPLOY & SYNC INTEGRATION ---
function getSavedGitHubToken() {
    return localStorage.getItem('github_token') || '';
}

function loadGitHubConfig() {
    const tokenInput = document.getElementById('githubTokenInput');
    if (tokenInput) {
        tokenInput.value = getSavedGitHubToken();
    }
}

function saveGitHubConfig() {
    const tokenInput = document.getElementById('githubTokenInput');
    const token = tokenInput ? tokenInput.value.trim() : '';

    if (!token) {
        showNotification('कृपया GitHub Token प्रविष्ट करा.', 'error');
        return;
    }

    localStorage.setItem('github_token', token);
    showNotification('GitHub Token सुरक्षितपणे जतन केला!', 'success');
}

function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binStr = "";
    bytes.forEach(b => binStr += String.fromCharCode(b));
    return btoa(binStr);
}

async function publishToGitHubSilently(token) {
    const repo = 'rohitghadi25122004/OROSDASHBOARDGOVERNMENT';
    const branch = 'main';
    const path = 'data.json';
    const url = `https://api.github.com/repos/${repo}/contents/${path}`;

    try {
        let currentSha = null;
        try {
            const getRes = await fetch(`${url}?ref=${branch}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (getRes.ok) {
                const fileData = await getRes.json();
                currentSha = fileData.sha;
            }
        } catch (err) {}

        const jsonContent = JSON.stringify(sampleData, null, 2);
        const base64Content = utf8ToBase64(jsonContent);

        const payload = {
            message: `Update supply dashboard data via Admin Panel [${new Date().toLocaleString()}]`,
            content: base64Content,
            branch: branch
        };
        if (currentSha) {
            payload.sha = currentSha;
        }

        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify(payload)
        });

        if (putRes.ok) {
            showNotification('बदल जतन झाले व GitHub वर लाईव्ह पब्लिश केले!', 'success');
        } else {
            const errJson = await putRes.json();
            console.error('GitHub API Error:', errJson);
            showNotification(`GitHub पब्लिश त्रुटी: ${errJson.message || 'टोकन तपासा.'}`, 'error');
        }
    } catch (error) {
        console.error('Network Error publishing to GitHub:', error);
    }
}
