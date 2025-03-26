/**
 * dashboard-ui.js
 * ملف واجهة المستخدم للشاشة الرئيسية في لوحة تحكم المسوقين العقاريين
 * تاريخ الإنشاء: 23 مارس 2025
 */

// تهيئة لوحة التحكم الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

/**
 * تهيئة جميع مكونات لوحة التحكم
 */
function initializeDashboard() {
    // تحديث بطاقات الإحصائيات
    updateStatisticsCards();
    
    // تهيئة الرسوم البيانية
    initializeCustomerGrowthChart();
    initializeCampaignPerformanceChart();
    initializeConversionRatesChart();
    
    // تحميل قوائم المهام والتفاعلات
    loadUrgentTasks();
    loadLatestInteractions();
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    console.log('تم تهيئة لوحة التحكم الرئيسية بنجاح');
}

/**
 * تحديث بطاقات الإحصائيات الرئيسية
 */
function updateStatisticsCards() {
    // استرجاع بيانات الإحصائيات
    const stats = getDashboardStatistics();
    
    // تحديث أعداد العملاء
    document.getElementById('potential-customers-count').textContent = stats.potentialCustomers;
    document.getElementById('actual-customers-count').textContent = stats.actualCustomers;
    document.getElementById('customer-growth-rate').textContent = `${stats.customerGrowthRate}%`;
    
    // تحديث إحصائيات العقارات
    document.getElementById('marketed-properties-count').textContent = stats.marketedProperties;
    document.getElementById('deal-completion-rate').textContent = `${stats.dealCompletionRate}%`;
    
    // تحديث إحصائيات العمولات
    document.getElementById('total-commissions').textContent = formatCurrency(stats.totalCommissions);
    document.getElementById('commissions-growth-indicator').innerHTML = `<i class="fas fa-arrow-up text-success"></i> 8.2%`;
}

/**
 * تهيئة الرسم البياني لنمو العملاء
 */
function initializeCustomerGrowthChart() {
    const customerData = getCustomerGrowthData();
    const ctx = document.getElementById('customerGrowthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: customerData.labels,
            datasets: [
                {
                    label: 'العملاء المحتملين',
                    data: customerData.potential,
                    borderColor: '#4e73df',
                    backgroundColor: 'rgba(78, 115, 223, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#4e73df',
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true
                },
                {
                    label: 'العملاء الفعليين',
                    data: customerData.actual,
                    borderColor: '#1cc88a',
                    backgroundColor: 'rgba(28, 200, 138, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#1cc88a',
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true
                    },
                    grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                        borderDash: [2],
                        drawBorder: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: 10,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 14
                    },
                    displayColors: false
                }
            }
        }
    });
}

/**
 * تهيئة الرسم البياني لأداء الحملات التسويقية
 */
function initializeCampaignPerformanceChart() {
    const campaignData = getCampaignPerformanceData();
    const ctx = document.getElementById('campaignChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: campaignData.labels,
            datasets: [
                {
                    label: 'المشاهدات',
                    data: campaignData.impressions,
                    backgroundColor: '#4e73df',
                    maxBarThickness: 25
                },
                {
                    label: 'النقرات',
                    data: campaignData.clicks,
                    backgroundColor: '#1cc88a',
                    maxBarThickness: 25
                },
                {
                    label: 'التحويلات',
                    data: campaignData.conversions,
                    backgroundColor: '#f6c23e',
                    maxBarThickness: 25
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    },
                    grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                        borderDash: [2],
                        drawBorder: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: 10,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 14
                    }
                }
            }
        }
    });
}

/**
 * تهيئة الرسم البياني لمعدلات التحويل
 */
function initializeConversionRatesChart() {
    const conversionData = getConversionRatesByPropertyType();
    const ctx = document.getElementById('conversionRatesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: conversionData.labels,
            datasets: [
                {
                    data: conversionData.rates,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'
                    ],
                    hoverBackgroundColor: [
                        '#2e59d9', '#17a673', '#2c9faf', '#dda20a', '#be2617'
                    ],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true
                },
                tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    bodyFont: {
                        size: 14
                    },
                    titleFont: {
                        size: 14
                    },
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

/**
 * تحميل قائمة المهام العاجلة
 */
function loadUrgentTasks() {
    const tasks = getUrgentTasks(5); // استرجاع أهم 5 مهام
    const tasksContainer = document.getElementById('urgent-tasks-list');
    
    // محو المحتوى الحالي
    tasksContainer.innerHTML = '';
    
    // إضافة المهام للقائمة
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<div class="text-center py-3">لا توجد مهام عاجلة حالياً</div>';
        return;
    }
    
    tasks.forEach(task => {
        // تحديد لون الأولوية
        let priorityClass = 'text-warning';
        if (task.priority === 'عالية') {
            priorityClass = 'text-danger';
        } else if (task.priority === 'منخفضة') {
            priorityClass = 'text-success';
        }
        
        // إنشاء عنصر المهمة
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item d-flex align-items-center border-bottom pb-2 pt-2';
        taskElement.innerHTML = `
            <div class="flex-shrink-0 me-2">
                <div class="task-check form-check">
                    <input class="form-check-input task-checkbox" type="checkbox" value="${task.id}" id="task-${task.id}">
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="task-title mb-0">${task.title}</h6>
                <p class="task-desc small text-muted mb-0">${task.description}</p>
                <div class="task-meta d-flex align-items-center mt-1">
                    <span class="due-date me-3"><i class="far fa-calendar-alt me-1"></i>${formatDate(task.dueDate)}</span>
                    <span class="priority ${priorityClass}"><i class="fas fa-flag me-1"></i>${task.priority}</span>
                </div>
            </div>
            <div class="dropdown ms-2">
                <button class="btn btn-sm dropdown-toggle no-arrow" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item task-done" href="#" data-task-id="${task.id}">تم الإنجاز</a></li>
                    <li><a class="dropdown-item task-postpone" href="#" data-task-id="${task.id}">تأجيل</a></li>
                    <li><a class="dropdown-item task-edit" href="#" data-task-id="${task.id}">تعديل</a></li>
                </ul>
            </div>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
    
    // إضافة مستمعي الأحداث للمهام
    addTaskEventListeners();
}

/**
 * تحميل آخر التفاعلات من العملاء
 */
function loadLatestInteractions() {
    const interactions = getLatestCustomerInteractions(5); // استرجاع آخر 5 تفاعلات
    const interactionsContainer = document.getElementById('latest-interactions-list');
    
    // محو المحتوى الحالي
    interactionsContainer.innerHTML = '';
    
    // إضافة التفاعلات للقائمة
    if (interactions.length === 0) {
        interactionsContainer.innerHTML = '<div class="text-center py-3">لا توجد تفاعلات حديثة</div>';
        return;
    }
    
    interactions.forEach(interaction => {
        // تحديد لون حالة التفاعل
        let statusClass = 'text-warning';
        if (interaction.status === 'تم الرد' || interaction.status === 'تمت جدولة موعد') {
            statusClass = 'text-success';
        } else if (interaction.status === 'قيد المعالجة') {
            statusClass = 'text-info';
        } else if (interaction.status === 'بانتظار الرد' || interaction.status === 'بانتظار التأكيد') {
            statusClass = 'text-warning';
        }
        
        // تحديد أيقونة نوع التفاعل
        let typeIcon = 'fas fa-comment';
        if (interaction.interactionType === 'استفسار') {
            typeIcon = 'fas fa-question-circle';
        } else if (interaction.interactionType === 'طلب معاينة') {
            typeIcon = 'fas fa-search';
        } else if (interaction.interactionType === 'تعليق') {
            typeIcon = 'fas fa-comment-dots';
        } else if (interaction.interactionType === 'شكوى') {
            typeIcon = 'fas fa-exclamation-circle';
        } else if (interaction.interactionType === 'حجز مبدئي') {
            typeIcon = 'fas fa-bookmark';
        }
        
        // إنشاء عنصر التفاعل
        const interactionElement = document.createElement('div');
        interactionElement.className = 'interaction-item d-flex border-bottom pb-2 pt-2';
        interactionElement.innerHTML = `
            <div class="flex-shrink-0 me-3">
                <div class="interaction-icon rounded-circle text-center">
                    <i class="${typeIcon}"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                    <h6 class="customer-name mb-0">${interaction.customerName}</h6>
                    <span class="interaction-date small text-muted">${formatDateTime(interaction.date)}</span>
                </div>
                <p class="property-name small mb-1"><i class="fas fa-building me-1"></i>${interaction.property}</p>
                <p class="interaction-message mb-1">${interaction.message}</p>
                <div class="d-flex justify-content-between align-items-center mt-1">
                    <span class="interaction-type small"><i class="${typeIcon} me-1"></i>${interaction.interactionType}</span>
                    <span class="interaction-status small ${statusClass}"><i class="fas fa-circle me-1"></i>${interaction.status}</span>
                </div>
            </div>
        `;
        
        interactionsContainer.appendChild(interactionElement);
    });
}

/**
 * إضافة مستمعي الأحداث للمهام
 */
function addTaskEventListeners() {
    // مستمع لأحداث إنجاز المهام
    document.querySelectorAll('.task-done').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const taskId = parseInt(this.getAttribute('data-task-id'));
            markTaskAsDone(taskId);
        });
    });
    
    // مستمع لأحداث تأجيل المهام
    document.querySelectorAll('.task-postpone').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const taskId = parseInt(this.getAttribute('data-task-id'));
            postponeTask(taskId);
        });
    });
}

/**
 * إعداد مستمعي الأحداث للصفحة
 */
function setupEventListeners() {
    // مستمع الحدث لزر تحديث لوحة التحكم
    const refreshButton = document.getElementById('refresh-dashboard');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // إظهار مؤشر التحميل
            const spinner = this.querySelector('.spinner-border');
            if (spinner) spinner.classList.remove('d-none');
            
            // محاكاة تأخير تحديث البيانات
            setTimeout(() => {
                initializeDashboard();
                
                // إخفاء مؤشر التحميل
                if (spinner) spinner.classList.add('d-none');
                
                // إظهار رسالة نجاح
                showNotification('تم تحديث لوحة التحكم بنجاح', 'success');
            }, 1000);
        });
    }
    
    // مستمع الحدث لزر تغيير الفترة الزمنية
    const periodSelector = document.getElementById('period-selector');
    if (periodSelector) {
        periodSelector.addEventListener('change', function() {
            // هنا يمكن تنفيذ منطق تغيير الفترة الزمنية للإحصائيات والرسوم البيانية
            const selectedPeriod = this.value;
            console.log(`تم اختيار الفترة: ${selectedPeriod}`);
            
            // إعادة تهيئة الرسوم البيانية (لأغراض هذا المثال، نعيد تهيئة نفس البيانات)
            initializeCustomerGrowthChart();
            initializeCampaignPerformanceChart();
            initializeConversionRatesChart();
            
            showNotification(`تم تغيير الفترة الزمنية إلى ${getPeriodName(selectedPeriod)}`, 'info');
        });
    }
}

/**
 * تحديد اسم الفترة الزمنية حسب القيمة
 */
function getPeriodName(periodValue) {
    const periods = {
        'week': 'الأسبوع الحالي',
        'month': 'الشهر الحالي',
        'quarter': 'الربع الحالي',
        'half': 'النصف الحالي',
        'year': 'السنة الحالية'
    };
    
    return periods[periodValue] || 'الفترة المحددة';
}

/**
 * وضع علامة الإنجاز على المهمة
 */
function markTaskAsDone(taskId) {
    if (updateTaskStatus(taskId, 'مكتملة')) {
        // تحديث واجهة المستخدم
        const taskCheckbox = document.getElementById(`task-${taskId}`);
        if (taskCheckbox) {
            taskCheckbox.checked = true;
            const taskItem = taskCheckbox.closest('.task-item');
            if (taskItem) {
                taskItem.classList.add('task-completed');
                setTimeout(() => {
                    // إزالة المهمة من القائمة بتأثير متلاشي
                    taskItem.style.opacity = '0';
                    setTimeout(() => {
                        taskItem.remove();
                        // إذا لم تبق أي مهام، نعرض رسالة
                        if (document.querySelectorAll('.task-item').length === 0) {
                            document.getElementById('urgent-tasks-list').innerHTML = 
                                '<div class="text-center py-3">لا توجد مهام عاجلة حالياً</div>';
                        }
                    }, 300);
                }, 500);
            }
        }
        showNotification('تم إنجاز المهمة بنجاح', 'success');
    } else {
        showNotification('حدث خطأ أثناء تحديث حالة المهمة', 'error');
    }
}

/**
 * تأجيل المهمة
 */
function postponeTask(taskId) {
    if (updateTaskStatus(taskId, 'مؤجلة')) {
        // تحديث واجهة المستخدم
        const taskItem = document.querySelector(`.task-item .task-checkbox[value="${taskId}"]`).closest('.task-item');
        if (taskItem) {
            taskItem.classList.add('task-postponed');
            taskItem.querySelector('.task-meta').insertAdjacentHTML('beforeend', 
                '<span class="postponed-label ms-3 text-info"><i class="fas fa-clock me-1"></i>مؤجلة</span>');
        }
        showNotification('تم تأجيل المهمة', 'info');
    } else {
        showNotification('حدث خطأ أثناء تأجيل المهمة', 'error');
    }
}

/**
 * عرض إشعار للمستخدم
 */
function showNotification(message, type = 'info') {
    // التحقق من وجود عنصر الإشعارات في DOM
    let notificationsContainer = document.getElementById('notifications-container');
    
    // إذا لم يكن موجوداً، أنشئ عنصر جديد
    if (!notificationsContainer) {
        notificationsContainer = document.createElement('div');
        notificationsContainer.id = 'notifications-container';
        notificationsContainer.className = 'position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(notificationsContainer);
    }
    
    // إنشاء معرف فريد للإشعار
    const notificationId = `notification-${Date.now()}`;
    
    // تحديد لون الإشعار حسب النوع
    let bgClass = 'bg-info';
    if (type === 'success') bgClass = 'bg-success';
    else if (type === 'error') bgClass = 'bg-danger';
    else if (type === 'warning') bgClass = 'bg-warning';
    
    // إنشاء هيكل الإشعار
    const notificationHtml = `
        <div id="${notificationId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header ${bgClass} text-white">
                <strong class="me-auto">منصة المسوقين العقاريين</strong>
                <small>الآن</small>
                <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="إغلاق"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    // إضافة الإشعار للحاوية
    notificationsContainer.insertAdjacentHTML('beforeend', notificationHtml);
    
    // تفعيل الإشعار وضبط وقت الاختفاء التلقائي
    const toastElement = document.getElementById(notificationId);
    const toast = new bootstrap.Toast(toastElement, {
        delay: 3000 // يختفي بعد 3 ثوانٍ
    });
    toast.show();
}

/**
 * تنسيق عرض المبالغ المالية
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * تنسيق عرض التاريخ
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
}

/**
 * تنسيق عرض التاريخ والوقت
 */
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    return `${date.toLocaleDateString('ar-SA', dateOptions)} ${date.toLocaleTimeString('ar-SA', timeOptions)}`;
}
