/**
 * ملف JavaScript للوحة تحكم شركات التطوير العقاري
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الوضع المظلم المخزن
    initTheme();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة التنبيهات والإشعارات
    initNotifications();
    
    // تهيئة الرسوم البيانية
    initCharts();
    
    // تهيئة تسجيل خدمة العامل للـ PWA
    registerServiceWorker();
    
    // تطبيق تأثيرات الحركة للعناصر
    applyAnimations();
    
    // تهيئة لوحات العرض
    initDataTables();
    
    // تهيئة المخططات والتقويم إذا كانت موجودة
    initCalendarsIfExists();
});

/**
 * تهيئة وضع اللون (مظلم/فاتح)
 */
function initTheme() {
    // التحقق من الوضع المظلم المخزن
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // التحقق من تفضيلات النظام للوضع المظلم
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    }
    
    // إضافة مستمع حدث لأزرار تبديل الوضع
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcon(newTheme);
            
            // إعادة تهيئة الرسوم البيانية بعد تغيير الوضع
            if (window.charts) {
                Object.values(window.charts).forEach(chart => {
                    if (chart && typeof chart.update === 'function') {
                        chart.update();
                    }
                });
            }
        });
    });
    
    // مراقبة تغييرات وضع النظام
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (!localStorage.getItem('theme')) { // فقط إذا لم يقم المستخدم بتعيين تفضيل
                const newTheme = event.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-bs-theme', newTheme);
                updateThemeIcon(newTheme);
            }
        });
    }
}

/**
 * تهيئة القائمة الجانبية
 */
function initSidebar() {
    // استعادة حالة القائمة من التخزين المحلي
    const sidebarState = localStorage.getItem('sidebar-state');
    
    // إعداد القائمة الجانبية (على الشاشات الكبيرة)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarState === 'collapsed' && sidebar && mainContent) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
    
    if (sidebarToggle && sidebar && mainContent) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // حفظ حالة القائمة
            const newState = sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded';
            localStorage.setItem('sidebar-state', newState);
        });
    }
    
    // إعداد القائمة الجانبية (على الأجهزة المحمولة)
    const mobileToggle = document.querySelector('.sidebar-mobile-toggle');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('active');
            
            // إضافة أو إزالة خلفية عند فتح القائمة
            const backdrop = document.querySelector('.sidebar-backdrop') || createBackdrop();
            backdrop.classList.toggle('show');
            
            // إغلاق القائمة عند النقر على الخلفية
            backdrop.addEventListener('click', function() {
                sidebar.classList.remove('active');
                mainContent.classList.remove('active');
                backdrop.classList.remove('show');
            });
        });
    }
    
    // إغلاق القائمة الجانبية عند التنقل على الأجهزة المحمولة
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('active');
                
                const backdrop = document.querySelector('.sidebar-backdrop');
                if (backdrop) {
                    backdrop.classList.remove('show');
                }
            }
        });
    });
}

/**
 * إنشاء خلفية للقائمة الجانبية على الأجهزة المحمولة
 */
function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
    return backdrop;
}

/**
 * تهيئة التنبيهات والإشعارات
 */
function initNotifications() {
    // إغلاق الإشعارات تلقائياً بعد فترة
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        new bootstrap.Toast(toast, {
            autohide: true,
            delay: 5000
        }).show();
    });
    
    // تعيين عداد الإشعارات
    updateNotificationCount();
    
    // تحديث حالة الإشعارات المقروءة
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            updateNotificationCount();
        });
    });
}

/**
 * تحديث عداد الإشعارات غير المقروءة
 */
function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const counters = document.querySelectorAll('.notification-counter');
    
    counters.forEach(counter => {
        counter.textContent = unreadCount;
        
        if (unreadCount > 0) {
            counter.classList.remove('d-none');
        } else {
            counter.classList.add('d-none');
        }
    });
}

/**
 * تسجيل خدمة العامل لـ PWA
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('تم تسجيل خدمة العامل بنجاح:', registration.scope);
                })
                .catch(error => {
                    console.error('فشل تسجيل خدمة العامل:', error);
                });
        });
    }
}

/**
 * تطبيق تأثيرات الحركة للعناصر
 */
function applyAnimations() {
    // تطبيق تأثير الظهور على البطاقات
    const cards = document.querySelectorAll('.stat-card, .project-card');
    if (cards.length) {
        let delay = 0;
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.5s ease-out ${delay}s forwards`;
            delay += 0.1;
        });
    }
    
    // تطبيق تأثير النبض على الأزرار المهمة
    const pulseButtons = document.querySelectorAll('.btn-pulse');
    pulseButtons.forEach(btn => {
        btn.classList.add('pulse');
    });
}

/**
 * تهيئة لوحات العرض
 */
function initDataTables() {
    if (typeof $.fn.DataTable !== 'undefined') {
        $('.datatable').each(function() {
            $(this).DataTable({
                language: {
                    url: '/static/js/ar-datatables.json'
                },
                responsive: true,
                dom: '<"table-header"<"row align-items-center"<"col-md-6"l><"col-md-6"f>>><"table-body"t><"table-footer"<"row align-items-center"<"col-md-6"i><"col-md-6"p>>>',
                ordering: true
            });
        });
    }
}

/**
 * تهيئة المخططات والتقويم إذا كانت موجودة
 */
function initCalendarsIfExists() {
    // تهيئة التقويم إذا كان موجوداً
    const calendarEl = document.getElementById('projectCalendar');
    if (calendarEl && typeof FullCalendar !== 'undefined') {
        // الحصول على مواعيد المشاريع من البيانات المدمجة أو من طلب Ajax
        const events = window.calendarEvents || [];
        initCalendar(calendarEl, events);
    }
    
    // تهيئة الرسوم البيانية إذا كانت موجودة
    initChartsIfExists();
}

/**
 * تهيئة الرسوم البيانية إذا كانت موجودة
 */
function initChartsIfExists() {
    // التحقق من وجود Chart.js
    if (typeof Chart === 'undefined') return;
    
    // تهيئة حاوية للرسوم البيانية
    window.charts = window.charts || {};
    
    // الرسم البياني للمبيعات
    const salesChartEl = document.getElementById('salesChart');
    if (salesChartEl) {
        const labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
        const datasets = [
            {
                label: 'المبيعات',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.3
            }
        ];
        window.charts.salesChart = initLineChart(salesChartEl, labels, datasets);
    }
    
    // الرسم البياني لأنواع الوحدات
    const unitsChartEl = document.getElementById('unitsChart');
    if (unitsChartEl) {
        const labels = ['شقق', 'فلل', 'مكاتب', 'محلات'];
        const data = [45, 25, 20, 10];
        const backgroundColors = [
            'rgba(52, 152, 219, 0.8)',
            'rgba(46, 204, 113, 0.8)',
            'rgba(243, 156, 18, 0.8)',
            'rgba(231, 76, 60, 0.8)'
        ];
        window.charts.unitsChart = initDoughnutChart(unitsChartEl, labels, data, { backgroundColor: backgroundColors });
    }
}

/**
 * تحديث أيقونة الوضع المظلم/الفاتح
 */
function updateThemeIcon(theme) {
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    
    if (theme === 'dark') {
        moonIcons.forEach(icon => icon.classList.add('d-none'));
        sunIcons.forEach(icon => icon.classList.remove('d-none'));
    } else {
        moonIcons.forEach(icon => icon.classList.remove('d-none'));
        sunIcons.forEach(icon => icon.classList.add('d-none'));
    }
}

/**
 * تنسيق الأرقام لعرض الآلاف
 */
function formatNumber(number) {
    return new Intl.NumberFormat('ar-SA').format(number);
}

/**
 * تهيئة التقويم
 */
function initCalendar(calendarEl, events) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'ar',
        direction: 'rtl',
        headerToolbar: {
            left: 'title',
            center: '',
            right: 'prev,next today'
        },
        initialView: 'dayGridMonth',
        events: events,
        eventClick: function(info) {
            showEventDetails(info.event);
        },
        buttonText: {
            today: 'اليوم',
            month: 'شهر',
            week: 'أسبوع',
            day: 'يوم',
            list: 'قائمة'
        },
        themeSystem: 'bootstrap5',
        height: 'auto',
        firstDay: 6 // السبت هو أول يوم في الأسبوع
    });
    
    calendar.render();
    return calendar;
}

/**
 * عرض تفاصيل حدث التقويم
 */
function showEventDetails(event) {
    const title = event.title;
    const start = event.start ? event.start.toLocaleDateString('ar-SA') : '';
    const end = event.end ? event.end.toLocaleDateString('ar-SA') : '';
    const description = event.extendedProps.description || '';
    
    const modal = new bootstrap.Modal(document.getElementById('eventModal') || createEventModal());
    
    document.getElementById('eventTitle').textContent = title;
    document.getElementById('eventDate').textContent = end ? `${start} - ${end}` : start;
    document.getElementById('eventDescription').textContent = description;
    
    modal.show();
}

/**
 * إنشاء نافذة منبثقة لعرض تفاصيل الحدث إذا لم تكن موجودة
 */
function createEventModal() {
    const modalHtml = `
    <div class="modal fade" id="eventModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eventTitle"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-2"><strong>التاريخ:</strong> <span id="eventDate"></span></p>
                    <p class="mb-0"><strong>الوصف:</strong> <span id="eventDescription"></span></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstChild);
    
    return document.getElementById('eventModal');
}

/**
 * تهيئة رسم بياني خطي
 */
function initLineChart(chartEl, labels, datasets, options = {}) {
    // تعيين الخيارات الافتراضية مع الخيارات المخصصة
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'Tajawal'
                    }
                }
            },
            tooltip: {
                rtl: true,
                titleFont: {
                    family: 'Tajawal'
                },
                bodyFont: {
                    family: 'Tajawal'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Tajawal'
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    font: {
                        family: 'Tajawal'
                    },
                    callback: function(value) {
                        return formatNumber(value);
                    }
                },
                grid: {
                    borderDash: [2, 4]
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        ...options
    };
    
    // إنشاء وإرجاع الرسم البياني
    return new Chart(chartEl, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: chartOptions
    });
}

/**
 * تهيئة رسم بياني دائري
 */
function initDoughnutChart(chartEl, labels, data, options = {}) {
    // إعداد البيانات والألوان الافتراضية
    const backgroundColors = options.backgroundColor || [
        'rgba(52, 152, 219, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(243, 156, 18, 0.8)',
        'rgba(231, 76, 60, 0.8)'
    ];
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: 'Tajawal'
                    },
                    padding: 20
                }
            },
            tooltip: {
                rtl: true,
                titleFont: {
                    family: 'Tajawal'
                },
                bodyFont: {
                    family: 'Tajawal'
                },
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.formattedValue;
                        const dataset = context.dataset;
                        const total = dataset.data.reduce((acc, data) => acc + data, 0);
                        const percentage = Math.round((context.raw / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '70%',
        ...options
    };
    
    // إنشاء وإرجاع الرسم البياني
    return new Chart(chartEl, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors.slice(0, data.length),
                borderWidth: 0
            }]
        },
        options: chartOptions
    });
}
