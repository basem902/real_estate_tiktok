/**
 * مكون عداد الإشعارات
 * يقوم بتحديث عدد الإشعارات غير المقروءة في القائمة الجانبية
 */

// فترة التحديث بالمللي ثانية (كل دقيقة)
const NOTIFICATION_CHECK_INTERVAL = 60 * 1000;

// إعدادات منبثقات الإشعارات
const TOAST_SETTINGS = {
    position: 'top-left',  // موقع المنبثقات
    autoHide: true,       // إخفاء تلقائي
    delay: 7000,          // مدة الظهور (بالمللي ثانية)
    maxToasts: 3,         // الحد الأقصى للمنبثقات المعروضة في نفس الوقت
    newestOnTop: true     // عرض الأحدث في الأعلى
};

// مصفوفة لتخزين آخر إشعارات تم استلامها
let lastNotifications = [];

// تهيئة عداد الإشعارات
function initNotificationCounter() {
    console.log("تهيئة عداد الإشعارات");
    
    // إنشاء حاوية المنبثقات إذا لم تكن موجودة
    createToastContainer();
    
    // تحميل عدد الإشعارات عند بدء الصفحة
    updateNotificationCounter();
    
    // ضبط مؤقت لتحديث العداد دوريًا
    setInterval(updateNotificationCounter, NOTIFICATION_CHECK_INTERVAL);
}

// إنشاء حاوية للمنبثقات
function createToastContainer() {
    // التحقق مما إذا كانت الحاوية موجودة بالفعل
    if ($('#toast-container').length === 0) {
        // إنشاء حاوية المنبثقات
        const $container = $('<div>').attr({
            'id': 'toast-container',
            'class': 'toast-container position-fixed p-3'
        });
        
        // تحديد موقع الحاوية بناءً على الإعدادات
        switch(TOAST_SETTINGS.position) {
            case 'top-left':
                $container.addClass('top-0 start-0');
                break;
            case 'top-right':
                $container.addClass('top-0 end-0');
                break;
            case 'bottom-left':
                $container.addClass('bottom-0 start-0');
                break;
            case 'bottom-right':
                $container.addClass('bottom-0 end-0');
                break;
            case 'top-center':
                $container.addClass('top-0 start-50 translate-middle-x');
                break;
            default:
                $container.addClass('top-0 start-0');
        }
        
        // إضافة الحاوية إلى الصفحة
        $('body').append($container);
    }
}

// تحديث عداد الإشعارات
function updateNotificationCounter() {
    console.log("تحديث عداد الإشعارات");
    
    // في البيئة الحقيقية: استدعاء API للحصول على عدد الإشعارات غير المقروءة وقائمة بأحدث الإشعارات
    $.ajax({
        url: '/api/notifications/unread',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // تحديث العداد
            updateCounterDisplay(data.count);
            
            // التحقق من الإشعارات الجديدة
            checkForNewNotifications(data.notifications);
        },
        error: function(error) {
            console.error('خطأ في تحميل بيانات الإشعارات:', error);
            
            // للعرض التجريبي: محاكاة البيانات في حالة الفشل
            simulateNotificationData();
        }
    });
}

// محاكاة بيانات الإشعارات للعرض التجريبي
function simulateNotificationData() {
    setTimeout(function() {
        // توليد رقم عشوائي للعدد
        const unreadCount = Math.floor(Math.random() * 13);
        
        // تحديث العداد
        updateCounterDisplay(unreadCount);
        
        // إنشاء إشعارات تجريبية
        if (Math.random() > 0.7) { // 30% فرصة لظهور إشعار جديد
            const mockNotifications = generateMockNotifications(1);
            checkForNewNotifications(mockNotifications);
        }
    }, 500);
}

// توليد إشعارات تجريبية
function generateMockNotifications(count) {
    const types = ['تقييم_جديد', 'تعليق_جديد', 'متابعة_مطلوبة', 'إشعار_نظام'];
    const priorities = ['عادي', 'مهم', 'عاجل'];
    const mockNotifications = [];
    
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const id = 'notification_' + Date.now() + '_' + i;
        
        let title, message, icon;
        
        switch (type) {
            case 'تقييم_جديد':
                title = 'تقييم جديد';
                message = 'تم استلام تقييم جديد من العميل ' + ['أحمد محمد', 'سارة أحمد', 'محمد علي'][Math.floor(Math.random() * 3)];
                icon = 'star';
                break;
            case 'تعليق_جديد':
                title = 'تعليق جديد';
                message = 'تم إضافة تعليق جديد على تقييم سابق';
                icon = 'comment';
                break;
            case 'متابعة_مطلوبة':
                title = 'متابعة مطلوبة';
                message = 'هناك تقييم يحتاج إلى متابعة عاجلة';
                icon = 'exclamation-circle';
                break;
            case 'إشعار_نظام':
                title = 'إشعار نظام';
                message = 'تم تحديث إعدادات النظام';
                icon = 'cog';
                break;
        }
        
        mockNotifications.push({
            id: id,
            type: type,
            priority: priority,
            title: title,
            message: message,
            icon: icon,
            timestamp: new Date().toISOString(),
            read: false,
            url: '/marketers/social'
        });
    }
    
    return mockNotifications;
}

// التحقق من وجود إشعارات جديدة
function checkForNewNotifications(notifications) {
    if (!notifications || !Array.isArray(notifications) || notifications.length === 0) {
        return;
    }
    
    // التحقق من الإشعارات الجديدة مقارنة بآخر قائمة تم استلامها
    const newNotifications = notifications.filter(notification => {
        return !lastNotifications.some(lastNotif => lastNotif.id === notification.id);
    });
    
    // عرض منبثقات للإشعارات الجديدة
    if (newNotifications.length > 0) {
        // تحديث قائمة آخر الإشعارات
        lastNotifications = [...notifications];
        
        // عرض منبثقات للإشعارات الجديدة (بحد أقصى TOAST_SETTINGS.maxToasts)
        const toastsToShow = newNotifications.slice(0, TOAST_SETTINGS.maxToasts);
        toastsToShow.forEach(notification => {
            showNotificationToast(notification);
        });
    }
}

// عرض منبثق للإشعار
function showNotificationToast(notification) {
    // إنشاء عنصر المنبثق
    const toastId = 'toast-' + notification.id;
    
    // التحقق من عدم وجود منبثق بنفس المعرف
    if ($('#' + toastId).length > 0) {
        return;
    }
    
    // تحديد لون خلفية المنبثق بناءً على أولوية الإشعار
    let bgClass = 'bg-primary';
    if (notification.priority === 'عاجل') {
        bgClass = 'bg-danger';
    } else if (notification.priority === 'مهم') {
        bgClass = 'bg-warning text-dark';
    }
    
    // إنشاء هيكل المنبثق
    const $toast = $(`
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header ${bgClass} text-white">
                <i class="fas fa-${notification.icon} me-2"></i>
                <strong class="me-auto">${notification.title}</strong>
                <small class="text-white-50">${timeAgo(new Date(notification.timestamp))}</small>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="إغلاق"></button>
            </div>
            <div class="toast-body">
                ${notification.message}
                <div class="mt-2 pt-2 border-top">
                    <a href="${notification.url}" class="btn btn-sm btn-primary">عرض</a>
                    <button type="button" class="btn btn-sm btn-secondary mark-as-read" 
                            data-notification-id="${notification.id}">تعليم كمقروء</button>
                </div>
            </div>
        </div>
    `);
    
    // إضافة المنبثق إلى الحاوية
    const $container = $('#toast-container');
    
    // إضافة في الأعلى أو الأسفل حسب الإعدادات
    if (TOAST_SETTINGS.newestOnTop) {
        $container.prepend($toast);
    } else {
        $container.append($toast);
    }
    
    // تهيئة المنبثق باستخدام Bootstrap
    const toastOptions = {
        animation: true,
        autohide: TOAST_SETTINGS.autoHide,
        delay: TOAST_SETTINGS.delay
    };
    
    // إنشاء كائن منبثق Bootstrap
    const bsToast = new bootstrap.Toast($toast[0], toastOptions);
    
    // عرض المنبثق
    bsToast.show();
    
    // إضافة معالج حدث للنقر على زر "تعليم كمقروء"
    $toast.find('.mark-as-read').on('click', function() {
        const notificationId = $(this).data('notification-id');
        markNotificationAsRead(notificationId);
        bsToast.hide();
    });
    
    // معالجة حدث إغلاق المنبثق
    $toast.on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

// تعليم إشعار كمقروء
function markNotificationAsRead(notificationId) {
    console.log('تعليم الإشعار كمقروء:', notificationId);
    
    // في البيئة الحقيقية: استدعاء API لتعليم الإشعار كمقروء
    // $.ajax({
    //     url: '/api/notifications/' + notificationId + '/read',
    //     method: 'POST',
    //     success: function() {
    //         console.log('تم تعليم الإشعار كمقروء بنجاح');
    //         // تحديث العداد بعد تعليم الإشعار كمقروء
    //         updateNotificationCounter();
    //     }
    // });
    
    // للعرض التجريبي: تحديث قائمة الإشعارات المحلية
    lastNotifications = lastNotifications.map(notification => {
        if (notification.id === notificationId) {
            return { ...notification, read: true };
        }
        return notification;
    });
    
    // تحديث العداد
    const unreadCount = lastNotifications.filter(notification => !notification.read).length;
    updateCounterDisplay(unreadCount);
}

// تحديث عرض العداد في واجهة المستخدم
function updateCounterDisplay(count) {
    const $counter = $(".notification-counter");
    
    if (count > 0) {
        // تحديث النص وإظهار العداد
        $counter.text(count);
        $counter.removeClass('d-none');
        
        // إضافة تأثير نبض إذا كان العدد أكبر من العدد السابق
        const oldCount = parseInt($counter.data('count') || 0);
        if (count > oldCount) {
            $counter.addClass('pulse');
            setTimeout(() => $counter.removeClass('pulse'), 1000);
        }
        
        // تحديث اللون بناءً على العدد
        updateCounterColor(count);
    } else {
        // إخفاء العداد إذا لم تكن هناك إشعارات
        $counter.addClass('d-none');
    }
    
    // تخزين العدد الحالي للمقارنة في المرة القادمة
    $counter.data('count', count);
}

// تحديث لون العداد بناءً على العدد
function updateCounterColor(count) {
    const $counter = $(".notification-counter");
    
    // إزالة جميع فئات الألوان السابقة
    $counter.removeClass('bg-danger bg-warning bg-primary');
    
    // تطبيق اللون المناسب بناءً على العدد
    if (count > 9) {
        $counter.addClass('bg-danger');  // أحمر لعدد كبير
    } else if (count > 5) {
        $counter.addClass('bg-warning'); // أصفر لعدد متوسط
    } else {
        $counter.addClass('bg-primary'); // أزرق للعدد القليل
    }
}

// دالة مساعدة لعرض الوقت النسبي
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " سنوات";
    if (interval === 1) return "سنة";
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " أشهر";
    if (interval === 1) return "شهر";
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " أيام";
    if (interval === 1) return "يوم";
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " ساعات";
    if (interval === 1) return "ساعة";
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " دقائق";
    if (interval === 1) return "دقيقة";
    
    if (seconds < 10) return "الآن";
    
    return Math.floor(seconds) + " ثواني";
}

// تصدير الدوال
window.notificationCounter = {
    init: initNotificationCounter,
    update: updateNotificationCounter,
    showToast: showNotificationToast
};

// تنفيذ التهيئة تلقائيًا عند تحميل المستند
$(document).ready(function() {
    initNotificationCounter();
});
