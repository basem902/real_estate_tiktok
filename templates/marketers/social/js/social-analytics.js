/**
 * تحليلات وسائل التواصل الاجتماعي
 * يتعامل هذا الملف مع تحليلات ومقاييس وسائل التواصل الاجتماعي
 */

// بيانات نموذجية للتحليلات (يمكن استبدالها بطلبات API فعلية)
const analyticsData = {
    facebook: {
        followers: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            data: [2100, 2350, 2600, 2800, 3050, 3240]
        },
        engagement: {
            labels: ['منشورات', 'قصص', 'فيديوهات', 'صور'],
            data: [5.2, 3.8, 6.9, 4.5]
        },
        topPosts: [
            {
                id: 'fb1',
                type: 'image',
                content: 'شقة فاخرة للبيع في وسط المدينة، 3 غرف نوم، إطلالة رائعة!',
                engagement: 142,
                reach: 1200,
                date: '2025-03-18T09:30:00'
            },
            {
                id: 'fb2',
                type: 'video',
                content: 'جولة افتراضية في الفيلا الجديدة بمنطقة الشاطئ',
                engagement: 95,
                reach: 850,
                date: '2025-03-15T14:20:00'
            }
        ]
    }
};

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الرسوم البيانية
    initializeCharts();
});

/**
 * تهيئة الرسوم البيانية
 */
function initializeCharts() {
    // التحقق من وجود عنصر الرسم البياني لمتابعي فيسبوك
    const fbFollowersChart = document.getElementById('facebookFollowersChart');
    if (fbFollowersChart) {
        renderFollowersChart(fbFollowersChart, analyticsData.facebook.followers);
    }
    
    // التحقق من وجود عنصر الرسم البياني لتفاعل فيسبوك
    const fbEngagementChart = document.getElementById('facebookEngagementChart');
    if (fbEngagementChart) {
        renderEngagementChart(fbEngagementChart, analyticsData.facebook.engagement);
    }
}

/**
 * إنشاء رسم بياني لنمو المتابعين
 */
function renderFollowersChart(canvas, data) {
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'عدد المتابعين',
                data: data.data,
                backgroundColor: 'rgba(24, 119, 242, 0.1)',
                borderColor: 'rgba(24, 119, 242, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: 'rgba(24, 119, 242, 1)',
                pointRadius: 4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${formatNumber(context.raw)} متابع`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        },
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    },
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                }
            }
        }
    });
}

/**
 * إنشاء رسم بياني لتفاعل المنشورات
 */
function renderEngagementChart(canvas, data) {
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'نسبة التفاعل %',
                data: data.data,
                backgroundColor: [
                    'rgba(24, 119, 242, 0.7)',
                    'rgba(225, 48, 108, 0.7)',
                    'rgba(29, 161, 242, 0.7)',
                    'rgba(0, 0, 0, 0.7)'
                ],
                borderColor: [
                    'rgba(24, 119, 242, 1)',
                    'rgba(225, 48, 108, 1)',
                    'rgba(29, 161, 242, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
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
                            return ` نسبة التفاعل: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Cairo, sans-serif'
                        }
                    }
                }
            }
        }
    });
}

/**
 * تحميل تحليلات منصة محددة
 */
function loadPlatformAnalytics(platform) {
    // التحقق من وجود بيانات للمنصة
    if (!analyticsData[platform]) {
        console.log(`لا توجد بيانات تحليلية متاحة لمنصة ${platform}`);
        return;
    }
    
    // تحديث الرسوم البيانية للمنصة المحددة
    // (هذه الوظيفة ستكون مفيدة عند إضافة المزيد من المنصات في المستقبل)
    
    // عرض المنشورات الأكثر تفاعلاً إذا كانت متوفرة
    if (analyticsData[platform].topPosts) {
        renderTopPosts(platform, analyticsData[platform].topPosts);
    }
}

/**
 * عرض المنشورات الأكثر تفاعلاً
 */
function renderTopPosts(platform, posts) {
    // هذه الوظيفة ستكون مفيدة لعرض المنشورات الأكثر تفاعلاً
    // يمكن تنفيذها في الإصدارات المستقبلية
    console.log(`المنشورات الأكثر تفاعلاً على ${platform}:`, posts);
}

/**
 * تنسيق الأرقام بإضافة فواصل للآلاف
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * الحصول على إحصائيات المنصات
 * (يمكن استخدام هذه الوظيفة لجلب البيانات من الخادم)
 */
function fetchPlatformStats(platform, dateRange = 'last_month') {
    // في التطبيق الحقيقي، سيتم إجراء طلب AJAX لجلب البيانات
    return new Promise((resolve, reject) => {
        // محاكاة طلب الخادم
        setTimeout(() => {
            if (analyticsData[platform]) {
                resolve(analyticsData[platform]);
            } else {
                reject(new Error(`لا توجد بيانات متاحة لمنصة ${platform}`));
            }
        }, 500);
    });
}

/**
 * تحديث الرسوم البيانية بناءً على نطاق زمني محدد
 */
function updateChartsByDateRange(platform, dateRange) {
    // جلب البيانات للنطاق الزمني المحدد
    fetchPlatformStats(platform, dateRange)
        .then(data => {
            // تحديث الرسوم البيانية بالبيانات الجديدة
            console.log(`تم تحديث الرسوم البيانية لمنصة ${platform} بنطاق زمني: ${dateRange}`);
            
            // هنا سيتم تحديث الرسوم البيانية الفعلية
        })
        .catch(error => {
            console.error('خطأ في تحديث الرسوم البيانية:', error);
        });
}

/**
 * تصدير البيانات التحليلية بتنسيق محدد
 */
function exportAnalytics(platform, format = 'csv') {
    // في التطبيق الحقيقي، سيتم تنفيذ تصدير البيانات بالتنسيق المطلوب
    console.log(`تصدير تحليلات ${platform} بتنسيق ${format}`);
    
    // محاكاة عملية التصدير
    setTimeout(() => {
        alert(`تم تصدير تحليلات ${platform} بنجاح بتنسيق ${format}`);
    }, 1000);
}
