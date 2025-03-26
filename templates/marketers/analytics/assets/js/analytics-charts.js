/**
 * analytics-charts.js
 * إنشاء وإدارة الرسوم البيانية لنظام التحليلات المتقدم
 */

window.analyticsCharts = (function() {
    // ألوان الرسوم البيانية
    const chartColors = {
        primary: 'rgba(94, 114, 228, 1)',
        primaryLight: 'rgba(94, 114, 228, 0.2)',
        secondary: 'rgba(45, 206, 137, 1)',
        secondaryLight: 'rgba(45, 206, 137, 0.2)',
        info: 'rgba(41, 128, 185, 1)',
        infoLight: 'rgba(41, 128, 185, 0.2)',
        warning: 'rgba(251, 99, 64, 1)',
        warningLight: 'rgba(251, 99, 64, 0.2)',
        danger: 'rgba(231, 76, 60, 1)',
        dangerLight: 'rgba(231, 76, 60, 0.2)',
        purple: 'rgba(142, 68, 173, 1)',
        purpleLight: 'rgba(142, 68, 173, 0.2)',
        yellow: 'rgba(241, 196, 15, 1)',
        yellowLight: 'rgba(241, 196, 15, 0.2)'
    };

    // مجموعة ألوان للرسوم البيانية الدائرية والشريطية
    const colorSet = [
        chartColors.primary,
        chartColors.secondary,
        chartColors.warning,
        chartColors.danger, 
        chartColors.info,
        chartColors.purple,
        chartColors.yellow
    ];
    
    // مجموعة ألوان للخلفية مع شفافية
    const backgroundColorSet = [
        chartColors.primaryLight,
        chartColors.secondaryLight,
        chartColors.warningLight,
        chartColors.dangerLight, 
        chartColors.infoLight,
        chartColors.purpleLight,
        chartColors.yellowLight
    ];
    
    // إنشاء مخطط المبيعات الشهرية
    function createMonthlySalesChart(canvasId) {
        const data = window.analyticsData.getMonthlySalesData();
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'قيمة المبيعات (ريال)',
                    data: data.map(item => item.value),
                    backgroundColor: chartColors.primaryLight,
                    borderColor: chartColors.primary,
                    borderWidth: 2,
                    pointBackgroundColor: chartColors.primary,
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        padding: 10,
                        bodyFont: {
                            family: "'Tajawal', sans-serif",
                            size: 12
                        },
                        titleFont: {
                            family: "'Tajawal', sans-serif",
                            size: 14
                        },
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} ريال`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            },
                            callback: function(value) {
                                return value.toLocaleString() + ' ريال';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // إنشاء مخطط المبيعات حسب نوع العقار
    function createSalesByPropertyTypeChart(canvasId) {
        const data = window.analyticsData.getSalesByPropertyType();
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.type),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: colorSet,
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw.toLocaleString();
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${context.label}: ${value} ريال (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // إنشاء مخطط المبيعات حسب المنطقة
    function createSalesByRegionChart(canvasId) {
        const data = window.analyticsData.getSalesByRegion();
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.region),
                datasets: [{
                    label: 'قيمة المبيعات (ريال)',
                    data: data.map(item => item.value),
                    backgroundColor: colorSet,
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} ريال`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            },
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return (value / 1000000).toLocaleString() + ' مليون';
                                }
                                return value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // إنشاء مخطط الزيارات والتفاعلات
    function createVisitsChart(canvasId) {
        const data = window.analyticsData.getVisitsAndInteractions();
        const months = window.analyticsData.getMonthlySalesData().map(item => item.month);
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'زيارات الموقع',
                        data: data.websiteVisits,
                        backgroundColor: chartColors.primaryLight,
                        borderColor: chartColors.primary,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3
                    },
                    {
                        label: 'زيارات التطبيق',
                        data: data.appVisits,
                        backgroundColor: chartColors.secondaryLight,
                        borderColor: chartColors.secondary,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3
                    },
                    {
                        label: 'تفاعلات وسائل التواصل',
                        data: data.socialMediaInteractions,
                        backgroundColor: chartColors.infoLight,
                        borderColor: chartColors.info,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3
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
                                family: "'Tajawal', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // إنشاء مخطط تحليل العملاء
    function createCustomerAnalyticsChart(canvasId) {
        const data = window.analyticsData.getCustomerAnalytics();
        const months = window.analyticsData.getMonthlySalesData().map(item => item.month);
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'عملاء جدد',
                        data: data.newCustomers,
                        backgroundColor: chartColors.primary,
                        borderRadius: 4,
                        order: 2
                    },
                    {
                        label: 'عملاء عائدون',
                        data: data.returningCustomers,
                        backgroundColor: chartColors.secondary,
                        borderRadius: 4,
                        order: 3
                    },
                    {
                        label: 'معدل التحويل (%)',
                        data: data.conversionRate,
                        backgroundColor: 'transparent',
                        borderColor: chartColors.warning,
                        borderWidth: 2,
                        type: 'line',
                        tension: 0.4,
                        order: 1,
                        yAxisID: 'percentage'
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
                                family: "'Tajawal', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.label === 'معدل التحويل (%)') {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                                return `${context.dataset.label}: ${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    },
                    percentage: {
                        beginAtZero: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // إنشاء مخطط توزيع العملاء حسب المصدر
    function createCustomersBySourceChart(canvasId) {
        const data = window.analyticsData.getCustomersBySource();
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        return new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: data.map(item => item.source),
                datasets: [{
                    data: data.map(item => item.percentage),
                    backgroundColor: colorSet,
                    borderWidth: 1,
                    borderColor: 'white'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: "'Tajawal', sans-serif",
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // تهيئة جميع الرسوم البيانية
    function initializeAllCharts() {
        const charts = {};
        
        // تحقق من وجود العناصر قبل إنشاء الرسوم البيانية
        if (document.getElementById('monthlySalesChart')) {
            charts.monthlySales = createMonthlySalesChart('monthlySalesChart');
        }
        
        if (document.getElementById('propertyTypeChart')) {
            charts.propertyType = createSalesByPropertyTypeChart('propertyTypeChart');
        }
        
        if (document.getElementById('regionSalesChart')) {
            charts.regionSales = createSalesByRegionChart('regionSalesChart');
        }
        
        if (document.getElementById('visitsChart')) {
            charts.visits = createVisitsChart('visitsChart');
        }
        
        if (document.getElementById('customerAnalyticsChart')) {
            charts.customerAnalytics = createCustomerAnalyticsChart('customerAnalyticsChart');
        }
        
        if (document.getElementById('customerSourceChart')) {
            charts.customerSource = createCustomersBySourceChart('customerSourceChart');
        }
        
        return charts;
    }
    
    // تحديث الرسوم البيانية
    function updateCharts(charts) {
        // تحديث بيانات الرسوم البيانية إذا لزم الأمر
        if (charts.monthlySales) {
            const monthlySalesData = window.analyticsData.getMonthlySalesData();
            charts.monthlySales.data.labels = monthlySalesData.map(item => item.month);
            charts.monthlySales.data.datasets[0].data = monthlySalesData.map(item => item.value);
            charts.monthlySales.update();
        }
        
        if (charts.propertyType) {
            const propertyTypeData = window.analyticsData.getSalesByPropertyType();
            charts.propertyType.data.labels = propertyTypeData.map(item => item.type);
            charts.propertyType.data.datasets[0].data = propertyTypeData.map(item => item.value);
            charts.propertyType.update();
        }
        
        // تحديث باقي الرسوم البيانية بنفس الطريقة...
    }
    
    // واجهة برمجة التطبيقات العامة
    return {
        colors: chartColors,
        colorSet: colorSet,
        backgroundColorSet: backgroundColorSet,
        
        createMonthlySalesChart: createMonthlySalesChart,
        createSalesByPropertyTypeChart: createSalesByPropertyTypeChart,
        createSalesByRegionChart: createSalesByRegionChart,
        createVisitsChart: createVisitsChart,
        createCustomerAnalyticsChart: createCustomerAnalyticsChart,
        createCustomersBySourceChart: createCustomersBySourceChart,
        
        initializeAllCharts: initializeAllCharts,
        updateCharts: updateCharts
    };
})();
