/**
 * مكونات المخططات البيانية لنظام التقارير
 * تم إنشاؤه: 27/03/2025
 */

// تهيئة جميع المخططات البيانية للتقرير
function initReportCharts() {
    console.log("تهيئة المخططات البيانية للتقرير");
    
    // تهيئة المخططات المختلفة
    const trendChart = initTrendChart();
    const distributionChart = initDistributionChart();
    const comparisonChart = initComparisonChart();
    const sentimentChart = initSentimentChart();
    
    // إضافة أحداث التفاعل للمخططات
    setupChartInteractions();
    
    // إرجاع مراجع للمخططات للاستخدام في أماكن أخرى
    return {
        trendChart,
        distributionChart,
        comparisonChart,
        sentimentChart
    };
}

// تهيئة مخطط الاتجاهات الزمنية
function initTrendChart() {
    const ctx = document.getElementById('trend-chart').getContext('2d');
    
    // التحقق من وجود العنصر
    if (!ctx) {
        console.error("لم يتم العثور على عنصر trend-chart");
        return null;
    }
    
    // بيانات افتراضية للعرض
    const labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
    const ratingData = [4.2, 4.3, 4.4, 4.5, 4.6, 4.7];
    const reviewCountData = [24, 32, 28, 35, 40, 45];
    
    const trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'متوسط التقييم',
                    data: ratingData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'عدد التقييمات',
                    data: reviewCountData,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'تطور متوسط التقييمات مع الوقت',
                    font: { size: 16 }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    usePointStyle: true
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'متوسط التقييم'
                    },
                    beginAtZero: false,
                    min: 3.5,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'عدد التقييمات'
                    },
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
    
    return trendChart;
}

// تهيئة مخطط توزيع التقييمات
function initDistributionChart() {
    const ctx = document.getElementById('distribution-chart').getContext('2d');
    
    // التحقق من وجود العنصر
    if (!ctx) {
        console.error("لم يتم العثور على عنصر distribution-chart");
        return null;
    }
    
    const distributionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['5 نجوم', '4 نجوم', '3 نجوم', '2 نجوم', '1 نجمة'],
            datasets: [{
                label: 'عدد التقييمات',
                data: [65, 25, 7, 2, 1],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'توزيع التقييمات حسب عدد النجوم',
                    font: { size: 16 }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'عدد التقييمات'
                    }
                }
            }
        }
    });
    
    return distributionChart;
}

// تهيئة مخطط المقارنة
function initComparisonChart() {
    const ctx = document.getElementById('comparison-chart').getContext('2d');
    
    // التحقق من وجود العنصر
    if (!ctx) {
        console.error("لم يتم العثور على عنصر comparison-chart");
        return null;
    }
    
    // بيانات افتراضية للمقارنة (الربع الحالي مقابل الربع السابق)
    const comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'جودة الخدمة',
                'سرعة الاستجابة',
                'دقة المعلومات',
                'مظهر العقار',
                'القيمة مقابل السعر'
            ],
            datasets: [
                {
                    label: 'الربع الحالي',
                    data: [4.7, 4.5, 4.8, 4.6, 4.3],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'الربع السابق',
                    data: [4.4, 4.2, 4.6, 4.5, 4.1],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'مقارنة معايير التقييم',
                    font: { size: 16 }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 3.5,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            }
        }
    });
    
    return comparisonChart;
}

// تهيئة مخطط تحليل المشاعر
function initSentimentChart() {
    const ctx = document.getElementById('sentiment-chart').getContext('2d');
    
    // التحقق من وجود العنصر
    if (!ctx) {
        console.error("لم يتم العثور على عنصر sentiment-chart");
        return null;
    }
    
    const sentimentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['إيجابية', 'محايدة', 'سلبية'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'تحليل مشاعر العملاء',
                    font: { size: 16 }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    return sentimentChart;
}

// إعداد التفاعلات للمخططات البيانية
function setupChartInteractions() {
    // التفاعل مع فلاتر المخططات
    $('#chart-period-filter').on('change', function() {
        updateChartsData($(this).val());
    });
    
    // تحديث حجم المخططات عند تغيير حجم النافذة
    $(window).on('resize', function() {
        $('.chart-container canvas').each(function() {
            const chart = Chart.getChart(this);
            if (chart) {
                chart.resize();
            }
        });
    });
    
    // إضافة التفاعل مع أزرار تبديل عرض المخططات
    $('.chart-view-toggle').on('click', function() {
        const targetChartId = $(this).data('target');
        const chartType = $(this).data('chart-type');
        
        if (targetChartId && chartType) {
            changeChartType(targetChartId, chartType);
        }
    });
}

// تغيير نوع المخطط
function changeChartType(chartId, newType) {
    const chart = Chart.getChart(chartId);
    
    if (chart) {
        // حفظ البيانات الحالية
        const data = chart.data;
        
        // تدمير المخطط الحالي
        chart.destroy();
        
        // إنشاء مخطط جديد بنفس البيانات ولكن بنوع مختلف
        const ctx = document.getElementById(chartId).getContext('2d');
        const newChart = new Chart(ctx, {
            type: newType,
            data: data,
            options: getChartOptions(newType)
        });
        
        return newChart;
    }
    
    return null;
}

// الحصول على خيارات المخطط حسب النوع
function getChartOptions(chartType) {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };
    
    switch (chartType) {
        case 'bar':
            return {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
        case 'line':
            return {
                ...commonOptions,
                elements: {
                    line: {
                        tension: 0.3
                    }
                }
            };
        case 'doughnut':
        case 'pie':
            return {
                ...commonOptions,
                cutout: chartType === 'doughnut' ? '50%' : 0
            };
        case 'radar':
            return {
                ...commonOptions,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        }
                    }
                }
            };
        default:
            return commonOptions;
    }
}

// تحديث بيانات المخططات بناءً على الفترة المحددة
function updateChartsData(period) {
    console.log(`تحديث بيانات المخططات للفترة: ${period}`);
    
    // في البيئة الحقيقية: استدعاء API للحصول على البيانات حسب الفترة المحددة
    // هنا سيتم استخدام بيانات تجريبية فقط للعرض
    
    let trendData, distributionData, comparisonData, sentimentData;
    
    switch (period) {
        case 'week':
            trendData = generateWeeklyTrendData();
            distributionData = generateWeeklyDistributionData();
            break;
        case 'month':
            trendData = generateMonthlyTrendData();
            distributionData = generateMonthlyDistributionData();
            break;
        case 'quarter':
            trendData = generateQuarterlyTrendData();
            distributionData = generateQuarterlyDistributionData();
            break;
        case 'year':
            trendData = generateYearlyTrendData();
            distributionData = generateYearlyDistributionData();
            break;
        default:
            // استخدام البيانات الافتراضية
            return;
    }
    
    // تحديث مخطط الاتجاهات
    updateTrendChart(trendData);
    
    // تحديث مخطط التوزيع
    updateDistributionChart(distributionData);
    
    // تحديث باقي المخططات...
}

// توليد بيانات تجريبية
function generateWeeklyTrendData() {
    return {
        labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        ratingData: [4.3, 4.5, 4.2, 4.7, 4.6, 4.8, 4.4],
        reviewCountData: [5, 8, 4, 7, 9, 6, 3]
    };
}

function generateMonthlyTrendData() {
    return {
        labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
        ratingData: [4.4, 4.5, 4.6, 4.7],
        reviewCountData: [22, 25, 28, 30]
    };
}

function generateQuarterlyTrendData() {
    return {
        labels: ['يناير', 'فبراير', 'مارس'],
        ratingData: [4.2, 4.5, 4.7],
        reviewCountData: [65, 75, 85]
    };
}

function generateYearlyTrendData() {
    return {
        labels: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع'],
        ratingData: [4.1, 4.3, 4.5, 4.7],
        reviewCountData: [200, 250, 300, 350]
    };
}

function generateWeeklyDistributionData() {
    return {
        data: [15, 8, 4, 2, 1]
    };
}

function generateMonthlyDistributionData() {
    return {
        data: [45, 25, 15, 10, 5]
    };
}

function generateQuarterlyDistributionData() {
    return {
        data: [120, 80, 40, 25, 15]
    };
}

function generateYearlyDistributionData() {
    return {
        data: [450, 350, 150, 100, 50]
    };
}

// تحديث مخطط الاتجاهات
function updateTrendChart(data) {
    const chart = Chart.getChart('trend-chart');
    
    if (chart) {
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.ratingData;
        chart.data.datasets[1].data = data.reviewCountData;
        chart.update();
    }
}

// تحديث مخطط التوزيع
function updateDistributionChart(data) {
    const chart = Chart.getChart('distribution-chart');
    
    if (chart) {
        chart.data.datasets[0].data = data.data;
        chart.update();
    }
}

// تصدير المخططات كصورة
function exportChartAsImage(chartId, fileName = 'chart') {
    const chart = Chart.getChart(chartId);
    
    if (chart) {
        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

// تصدير بيانات المخطط بصيغة JSON
function exportChartData(chartId, fileName = 'chart-data') {
    const chart = Chart.getChart(chartId);
    
    if (chart) {
        const data = chart.data;
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `${fileName}.json`;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}
