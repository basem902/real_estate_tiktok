/**
 * Real Estate TikTok - Marketers Dashboard
 * Commissions & Payments UI - Charts
 * Version: 1.0.0
 */

// متغيرات عامة للرسوم البيانية
let commissionsChart = null;
let propertyTypeChart = null;

// تهيئة الرسوم البيانية
function initializeCharts() {
    // تهيئة رسم بياني للعمولات
    initCommissionsChart();
    
    // تهيئة رسم بياني لتوزيع العمولات حسب نوع العقار
    initPropertyTypeChart();
}

// تهيئة الرسم البياني للعمولات
function initCommissionsChart() {
    const ctx = document.getElementById('commissionsChart');
    
    if (!ctx) return;
    
    const chartData = window.commissionsManager.getChartDataByPeriod('year');
    
    commissionsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'إجمالي العمولات',
                    data: chartData.totalCommissions,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'العمولات المدفوعة',
                    data: chartData.paidCommissions,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw) + ' ريال';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value) + ' ر.س';
                        },
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                }
            }
        }
    });
}

// تهيئة الرسم البياني لتوزيع العمولات حسب نوع العقار
function initPropertyTypeChart() {
    const ctx = document.getElementById('propertyTypeChart');
    
    if (!ctx) return;
    
    // الحصول على توزيع العمولات حسب نوع العقار
    const commissionsByType = window.commissionsManager.getCommissionsByPropertyType();
    
    // تحويل البيانات إلى تنسيق مناسب للرسم البياني
    const labels = [];
    const data = [];
    const colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(199, 199, 199, 0.7)'
    ];
    
    // تعبئة البيانات
    let index = 0;
    for (const propertyType in commissionsByType) {
        if (commissionsByType.hasOwnProperty(propertyType)) {
            labels.push(propertyType);
            data.push(commissionsByType[propertyType]);
            index++;
        }
    }
    
    // إنشاء الرسم البياني
    propertyTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            
                            return label + ': ' + formatCurrency(value) + ' ريال (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// تحديث الرسم البياني للعمولات حسب الفترة
function updateChart(period) {
    if (!commissionsChart) return;
    
    // الحصول على بيانات الرسم البياني حسب الفترة
    const chartData = window.commissionsManager.getChartDataByPeriod(period);
    
    // تحديث البيانات
    commissionsChart.data.labels = chartData.labels;
    commissionsChart.data.datasets[0].data = chartData.totalCommissions;
    commissionsChart.data.datasets[1].data = chartData.paidCommissions;
    
    // تحديث الرسم البياني
    commissionsChart.update();
}
