/**
 * نظام إدارة الإشعارات للتقييمات
 * يتضمن وظائف لإدارة وعرض وفلترة الإشعارات
 */

// نموذج بيانات للإشعارات - سيتم استبدالها بمصدر بيانات حقيقي من الخادم
const sampleNotifications = [
    {
        id: 1,
        type: 'review',
        title: 'تقييم جديد من أحمد محمد',
        description: 'تقييم سلبي (2 من 5) للفيلا الواقعة في حي الربيع',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // منذ 15 دقيقة
        isRead: false,
        isUrgent: true,
        tags: ['تقييم جديد', 'عاجل'],
        iconClass: 'fa-star',
        iconBg: 'bg-danger',
        data: {
            reviewId: 123,
            rating: 2,
            clientId: 456,
            propertyId: 789
        }
    },
    {
        id: 2,
        type: 'comment',
        title: 'تعليق جديد من ليلى عبدالله',
        description: 'ردت على تعليقك على تقييم الشقة في حي النخيل',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // منذ 45 دقيقة
        isRead: false,
        isUrgent: false,
        tags: ['تعليق'],
        iconClass: 'fa-comment',
        iconBg: 'bg-info',
        data: {
            commentId: 234,
            reviewId: 345,
            clientId: 567
        }
    },
    {
        id: 3,
        type: 'review',
        title: 'تقييم جديد من منى سعيد',
        description: 'تقييم ممتاز (5 من 5) للفيلا الواقعة في حي الياسمين',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // منذ ساعتين
        isRead: true,
        isUrgent: false,
        tags: ['تقييم إيجابي'],
        iconClass: 'fa-star',
        iconBg: 'bg-success',
        data: {
            reviewId: 456,
            rating: 5,
            clientId: 678,
            propertyId: 901
        }
    },
    {
        id: 4,
        type: 'system',
        title: 'تحديث في نظام التقييمات',
        description: 'تم تحديث نظام التقييمات بميزات جديدة متعلقة بالتحليلات والمكافآت',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // منذ يوم
        isRead: true,
        isUrgent: false,
        tags: ['إشعار نظام'],
        iconClass: 'fa-cog',
        iconBg: 'bg-secondary',
        data: {
            updateId: 567
        }
    }
];

// الفلاتر الحالية
let currentFilters = {
    type: 'all',
    status: 'all',
    date: 'all',
    search: ''
};

// ترتيب الإشعارات الحالي
let currentSort = 'date-desc';

// تهيئة مركز الإشعارات
function initNotificationsCenter() {
    console.log("تهيئة مركز الإشعارات");
    
    // إعداد أحداث الأزرار
    setupEventListeners();
    
    // تحميل الإشعارات
    loadNotifications();
}

// إعداد أحداث العناصر المختلفة
function setupEventListeners() {
    // تحديث الإشعارات
    $("#refresh-notifications").on("click", function() {
        console.log("تحديث الإشعارات");
        loadNotifications();
    });

    // تعليم الكل كمقروء
    $("#mark-all-read").on("click", function() {
        console.log("تعليم الكل كمقروء");
        markAllAsRead();
    });

    // إعدادات الإشعارات
    $("#notification-settings").on("click", function() {
        console.log("فتح إعدادات الإشعارات");
        openNotificationSettings();
    });

    // فلترة الإشعارات
    $("#filter-type, #filter-status, #filter-date").on("change", function() {
        const type = $("#filter-type").val();
        const status = $("#filter-status").val();
        const date = $("#filter-date").val();
        
        currentFilters.type = type;
        currentFilters.status = status;
        currentFilters.date = date;
        
        applyFilters();
    });

    // البحث في الإشعارات
    $("#search-notifications").on("keyup", function() {
        currentFilters.search = $(this).val().toLowerCase();
        applyFilters();
    });

    // ترتيب الإشعارات
    $("#sort-by").on("change", function() {
        currentSort = $(this).val();
        applyFilters();
    });

    // تفويض أحداث الإشعارات
    $("#notifications-list").on("click", ".btn-primary", function() {
        const notificationId = $(this).closest(".list-group-item").data("id");
        viewNotification(notificationId);
    });

    $("#notifications-list").on("click", ".btn-outline-secondary:not(.dropdown-toggle)", function() {
        const notificationItem = $(this).closest(".list-group-item");
        const notificationId = notificationItem.data("id");
        markAsRead(notificationId, notificationItem);
    });
}

// تحميل الإشعارات من الخادم
function loadNotifications() {
    // محاكاة طلب API لجلب الإشعارات
    console.log("تحميل الإشعارات من الخادم");
    
    // في الواقع، سيتم استخدام AJAX هنا للحصول على البيانات
    // $.ajax({
    //     url: '/api/notifications',
    //     method: 'GET',
    //     success: function(data) {
    //         renderNotifications(data);
    //         updateNotificationCounters(data);
    //     },
    //     error: function(error) {
    //         console.error('خطأ في تحميل الإشعارات:', error);
    //     }
    // });
    
    // لأغراض العرض التجريبي، نستخدم البيانات النموذجية
    renderNotifications(sampleNotifications);
    updateNotificationCounters(sampleNotifications);
}

// عرض الإشعارات في القائمة
function renderNotifications(notifications) {
    const $notificationsList = $("#notifications-list");
    $notificationsList.empty();
    
    // تطبيق الفلترة والترتيب
    const filteredNotifications = filterNotifications(notifications);
    const sortedNotifications = sortNotifications(filteredNotifications);
    
    if (sortedNotifications.length === 0) {
        $notificationsList.append(`
            <div class="list-group-item text-center py-5">
                <i class="fas fa-bell-slash fa-3x text-muted mb-3"></i>
                <h6 class="text-muted">لا توجد إشعارات</h6>
            </div>
        `);
        return;
    }
    
    // إنشاء عناصر الإشعارات
    sortedNotifications.forEach(notification => {
        const readClass = notification.isRead ? 'read' : 'unread';
        const urgentClass = notification.isUrgent ? 'urgent' : '';
        const timeAgo = formatTimeAgo(notification.timestamp);
        
        let tags = '';
        notification.tags.forEach(tag => {
            const tagClass = getTagClass(tag);
            tags += `<span class="badge ${tagClass} ms-2">${tag}</span>`;
        });
        
        const template = `
            <div class="list-group-item list-group-item-action ${readClass} ${urgentClass}" data-id="${notification.id}">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="notification-icon ${notification.iconBg} text-white">
                            <i class="fas ${notification.iconClass}"></i>
                        </div>
                        <div class="ms-3">
                            <div class="d-flex align-items-center">
                                <h6 class="mb-0 ${notification.isRead ? '' : 'fw-bold'}">${notification.title}</h6>
                                ${tags}
                            </div>
                            <div class="text-muted small">${notification.description}</div>
                            <div class="small">${timeAgo}</div>
                        </div>
                    </div>
                    <div class="notification-actions">
                        <button class="btn btn-sm ${notification.isRead ? 'btn-outline-primary' : 'btn-primary'} me-1">
                            <i class="fas fa-eye"></i> عرض
                        </button>
                        ${notification.isRead ? '' : '<button class="btn btn-sm btn-outline-secondary me-1"><i class="fas fa-check"></i></button>'}
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#"><i class="fas fa-reply"></i> الرد</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-bell-slash"></i> إيقاف الإشعارات</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#"><i class="fas fa-trash"></i> حذف</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        $notificationsList.append(template);
    });
    
    // تحديث معلومات الترقيم
    updatePagination(sortedNotifications.length, notifications.length);
}

// فلترة الإشعارات
function filterNotifications(notifications) {
    return notifications.filter(notification => {
        // فلتر نوع الإشعار
        if (currentFilters.type !== 'all' && notification.type !== currentFilters.type) {
            return false;
        }
        
        // فلتر حالة الإشعار (مقروء/غير مقروء)
        if (currentFilters.status === 'read' && !notification.isRead) {
            return false;
        }
        if (currentFilters.status === 'unread' && notification.isRead) {
            return false;
        }
        
        // فلتر تاريخ الإشعار
        if (!isDateInRange(notification.timestamp, currentFilters.date)) {
            return false;
        }
        
        // فلتر البحث
        if (currentFilters.search && !(
            notification.title.toLowerCase().includes(currentFilters.search) ||
            notification.description.toLowerCase().includes(currentFilters.search)
        )) {
            return false;
        }
        
        return true;
    });
}

// ترتيب الإشعارات
function sortNotifications(notifications) {
    return [...notifications].sort((a, b) => {
        switch (currentSort) {
            case 'date-desc':
                return b.timestamp - a.timestamp;
            case 'date-asc':
                return a.timestamp - b.timestamp;
            case 'importance':
                if (a.isUrgent !== b.isUrgent) {
                    return a.isUrgent ? -1 : 1;
                }
                if (a.isRead !== b.isRead) {
                    return a.isRead ? 1 : -1;
                }
                return b.timestamp - a.timestamp;
            default:
                return b.timestamp - a.timestamp;
        }
    });
}

// تحديث عدادات الإشعارات
function updateNotificationCounters(notifications) {
    const totalCount = notifications.length;
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const urgentCount = notifications.filter(n => n.isUrgent).length;
    const newReviewsCount = notifications.filter(n => n.type === 'review' && !n.isRead).length;
    
    $("#total-notifications").text(totalCount);
    $("#unread-notifications").text(unreadCount);
    $("#urgent-notifications").text(urgentCount);
    $("#new-reviews").text(newReviewsCount);
}

// تحديث معلومات الترقيم
function updatePagination(shownCount, totalCount) {
    $(".d-flex .small.text-muted").text(`عرض 1-${shownCount} من أصل ${totalCount} إشعار`);
}

// تعليم جميع الإشعارات كمقروءة
function markAllAsRead() {
    // محاكاة طلب API لتعليم جميع الإشعارات كمقروءة
    console.log("تعليم جميع الإشعارات كمقروءة");
    
    // في الواقع، سيتم استخدام AJAX هنا
    // $.ajax({
    //     url: '/api/notifications/mark-all-read',
    //     method: 'POST',
    //     success: function() {
    //         // تحديث واجهة المستخدم والبيانات المحلية
    //     }
    // });
    
    // تحديث البيانات المحلية
    sampleNotifications.forEach(notification => {
        notification.isRead = true;
    });
    
    // تحديث واجهة المستخدم
    $(".unread").removeClass("unread").addClass("read");
    $(".list-group-item .fw-bold").removeClass("fw-bold");
    $(".notification-actions .btn-primary").removeClass("btn-primary").addClass("btn-outline-primary");
    $(".notification-actions .btn-outline-secondary:not(.dropdown-toggle)").remove();
    
    // تحديث العدادات
    updateNotificationCounters(sampleNotifications);
}

// تعليم إشعار معين كمقروء
function markAsRead(notificationId, $notificationItem) {
    console.log(`تعليم الإشعار ${notificationId} كمقروء`);
    
    // تحديث البيانات المحلية
    const notification = sampleNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.isRead = true;
    }
    
    // تحديث واجهة المستخدم
    $notificationItem.removeClass("unread").addClass("read");
    $notificationItem.find("h6").removeClass("fw-bold");
    $notificationItem.find(".btn-primary").removeClass("btn-primary").addClass("btn-outline-primary");
    $notificationItem.find(".btn-outline-secondary:not(.dropdown-toggle)").remove();
    
    // تحديث العدادات
    updateNotificationCounters(sampleNotifications);
}

// عرض تفاصيل الإشعار
function viewNotification(notificationId) {
    console.log(`عرض تفاصيل الإشعار ${notificationId}`);
    
    const notification = sampleNotifications.find(n => n.id === notificationId);
    if (!notification) return;
    
    // تعليم الإشعار كمقروء
    notification.isRead = true;
    
    // تحديث واجهة المستخدم
    const $notificationItem = $(`.list-group-item[data-id="${notificationId}"]`);
    $notificationItem.removeClass("unread").addClass("read");
    
    // التوجيه إلى الصفحة المناسبة حسب نوع الإشعار
    if (notification.type === 'review') {
        window.location.href = `../reviews_detail.html?id=${notification.data.reviewId}`;
    } else if (notification.type === 'comment') {
        window.location.href = `../reviews_detail.html?id=${notification.data.reviewId}#comment-${notification.data.commentId}`;
    } else if (notification.type === 'system') {
        alert(`تفاصيل إشعار النظام: ${notification.description}`);
    }
}

// فتح إعدادات الإشعارات
function openNotificationSettings() {
    console.log("فتح إعدادات الإشعارات");
    alert("سيتم فتح إعدادات الإشعارات!");
}

// تطبيق الفلاتر على الإشعارات
function applyFilters() {
    console.log("تطبيق الفلاتر:", currentFilters);
    renderNotifications(sampleNotifications);
}

// التحقق مما إذا كان التاريخ ضمن النطاق المحدد
function isDateInRange(date, range) {
    if (range === 'all') return true;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    switch (range) {
        case 'today':
            return date >= today;
        case 'yesterday':
            return date >= yesterday && date < today;
        case 'last-week':
            return date >= lastWeek;
        case 'last-month':
            return date >= lastMonth;
        default:
            return true;
    }
}

// تنسيق الوقت المنقضي
function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
        return 'منذ لحظات';
    } else if (diffMin < 60) {
        return `منذ ${diffMin} دقيقة`;
    } else if (diffHour < 24) {
        return `منذ ${diffHour} ساعة`;
    } else if (diffDay < 30) {
        return `منذ ${diffDay} يوم`;
    } else {
        return date.toLocaleDateString('ar-SA');
    }
}

// الحصول على فئة الوسم المناسبة
function getTagClass(tag) {
    switch (tag) {
        case 'عاجل':
            return 'bg-danger';
        case 'تقييم جديد':
            return 'bg-primary';
        case 'تقييم إيجابي':
            return 'bg-success';
        case 'تعليق':
            return 'bg-info';
        case 'إشعار نظام':
            return 'bg-secondary';
        default:
            return 'bg-primary';
    }
}

// تصدير الدوال للاستخدام الخارجي
window.notificationCenter = {
    init: initNotificationsCenter,
    load: loadNotifications,
    markAllAsRead: markAllAsRead,
    openSettings: openNotificationSettings
};
