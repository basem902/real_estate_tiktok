/**
 * notifications-data.js
 * ملف بيانات نظام الإشعارات المتكامل
 */

window.notificationsData = (function() {
    // أنواع الإشعارات المتاحة في النظام
    const NOTIFICATION_TYPES = {
        INFO: 'info',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger',
        TASK: 'task',
        MEETING: 'meeting',
        REMINDER: 'reminder',
        MESSAGE: 'message',
        SYSTEM: 'system'
    };

    // أولويات الإشعارات
    const NOTIFICATION_PRIORITIES = {
        LOW: 'low',
        MEDIUM: 'medium',
        HIGH: 'high',
        URGENT: 'urgent'
    };

    // الحالة: غير مقروء، مقروء، تم الإجراء، مؤرشف
    const NOTIFICATION_STATUS = {
        UNREAD: 'unread',
        READ: 'read',
        ACTIONED: 'actioned',
        ARCHIVED: 'archived'
    };

    // مصادر الإشعارات
    const NOTIFICATION_SOURCES = {
        CRM: 'crm',
        SALES: 'sales',
        MARKETING: 'marketing',
        TASK: 'task',
        APPOINTMENT: 'appointment',
        SYSTEM: 'system',
        ADMIN: 'admin'
    };

    // بيانات الإشعارات التجريبية
    const notificationsData = {
        notifications: [
            {
                id: 1,
                type: NOTIFICATION_TYPES.TASK,
                priority: NOTIFICATION_PRIORITIES.HIGH,
                title: 'مهمة جديدة: متابعة العميل محمد أحمد',
                content: 'تم تعيين مهمة جديدة لك لمتابعة العميل محمد أحمد المهتم بشقة في حي النرجس',
                dateCreated: '2025-03-22T09:30:00',
                dateExpiry: '2025-03-25T17:00:00',
                status: NOTIFICATION_STATUS.UNREAD,
                source: NOTIFICATION_SOURCES.CRM,
                link: '../crm/customer-details.html?id=1032',
                targetEntityId: 1032,
                icon: 'fas fa-tasks'
            },
            {
                id: 2,
                type: NOTIFICATION_TYPES.MEETING,
                priority: NOTIFICATION_PRIORITIES.HIGH,
                title: 'تذكير بموعد: عرض عقار غدا الساعة 10 صباحاً',
                content: 'لديك موعد غداً مع العميل فهد العلي لعرض فيلا في حي الملقا الساعة 10:00 صباحاً',
                dateCreated: '2025-03-22T14:00:00',
                dateExpiry: '2025-03-24T10:00:00',
                status: NOTIFICATION_STATUS.UNREAD,
                source: NOTIFICATION_SOURCES.APPOINTMENT,
                link: '../schedule/calendar-view.html?date=2025-03-24',
                targetEntityId: 458,
                icon: 'fas fa-calendar-check'
            },
            {
                id: 3,
                type: NOTIFICATION_TYPES.WARNING,
                priority: NOTIFICATION_PRIORITIES.MEDIUM,
                title: 'تنبيه: عقد إيجار قارب على الانتهاء',
                content: 'عقد الإيجار رقم S-2024-128 سينتهي خلال 7 أيام، يرجى التواصل مع العميل للتجديد',
                dateCreated: '2025-03-21T11:15:00',
                dateExpiry: '2025-03-28T00:00:00',
                status: NOTIFICATION_STATUS.READ,
                source: NOTIFICATION_SOURCES.CRM,
                link: '../crm/contract-details.html?id=S-2024-128',
                targetEntityId: 'S-2024-128',
                icon: 'fas fa-exclamation-triangle'
            },
            {
                id: 4,
                type: NOTIFICATION_TYPES.SUCCESS,
                priority: NOTIFICATION_PRIORITIES.MEDIUM,
                title: 'تم إتمام صفقة البيع بنجاح',
                content: 'تهانينا! تم إتمام صفقة بيع الفيلا رقم V-423 بقيمة 2,500,000 ريال',
                dateCreated: '2025-03-20T16:45:00',
                dateExpiry: '2025-04-20T00:00:00',
                status: NOTIFICATION_STATUS.READ,
                source: NOTIFICATION_SOURCES.SALES,
                link: '../commissions/commission-details.html?id=C-2025-087',
                targetEntityId: 'C-2025-087',
                icon: 'fas fa-check-circle'
            },
            {
                id: 5,
                type: NOTIFICATION_TYPES.MESSAGE,
                priority: NOTIFICATION_PRIORITIES.LOW,
                title: 'رسالة جديدة من الإدارة',
                content: 'تم إضافة سياسة جديدة للعمولات، يرجى الاطلاع على التفاصيل',
                dateCreated: '2025-03-19T10:30:00',
                dateExpiry: '2025-04-19T00:00:00',
                status: NOTIFICATION_STATUS.UNREAD,
                source: NOTIFICATION_SOURCES.ADMIN,
                link: '../settings/policy-updates.html',
                targetEntityId: null,
                icon: 'fas fa-envelope'
            },
            {
                id: 6,
                type: NOTIFICATION_TYPES.INFO,
                priority: NOTIFICATION_PRIORITIES.LOW,
                title: 'تحديث نظام CRM',
                content: 'تم تحديث نظام إدارة علاقات العملاء، اطلع على الميزات الجديدة',
                dateCreated: '2025-03-18T09:00:00',
                dateExpiry: '2025-04-18T00:00:00',
                status: NOTIFICATION_STATUS.READ,
                source: NOTIFICATION_SOURCES.SYSTEM,
                link: '../help/whats-new.html',
                targetEntityId: null,
                icon: 'fas fa-info-circle'
            },
            {
                id: 7,
                type: NOTIFICATION_TYPES.DANGER,
                priority: NOTIFICATION_PRIORITIES.URGENT,
                title: 'تأخير في سداد العميل للدفعة',
                content: 'العميل سعود الحربي متأخر في سداد الدفعة المستحقة منذ 15 يوم',
                dateCreated: '2025-03-17T14:20:00',
                dateExpiry: '2025-04-17T00:00:00',
                status: NOTIFICATION_STATUS.ACTIONED,
                source: NOTIFICATION_SOURCES.SALES,
                link: '../crm/customer-details.html?id=892',
                targetEntityId: 892,
                icon: 'fas fa-exclamation-circle'
            },
            {
                id: 8,
                type: NOTIFICATION_TYPES.REMINDER,
                priority: NOTIFICATION_PRIORITIES.MEDIUM,
                title: 'تذكير بتحديث بيانات العملاء',
                content: 'الرجاء تحديث بيانات العملاء الذين تم التعامل معهم خلال الشهر الماضي',
                dateCreated: '2025-03-16T11:00:00',
                dateExpiry: '2025-03-26T00:00:00',
                status: NOTIFICATION_STATUS.ARCHIVED,
                source: NOTIFICATION_SOURCES.CRM,
                link: '../crm/customer-update.html',
                targetEntityId: null,
                icon: 'fas fa-bell'
            },
            {
                id: 9,
                type: NOTIFICATION_TYPES.MEETING,
                priority: NOTIFICATION_PRIORITIES.HIGH,
                title: 'اجتماع فريق المبيعات الأسبوعي',
                content: 'سيعقد اجتماع فريق المبيعات الأسبوعي غداً الساعة 9:00 صباحاً في قاعة الاجتماعات الرئيسية',
                dateCreated: '2025-03-22T16:00:00',
                dateExpiry: '2025-03-23T09:00:00',
                status: NOTIFICATION_STATUS.UNREAD,
                source: NOTIFICATION_SOURCES.ADMIN,
                link: '../schedule/calendar-view.html?date=2025-03-23',
                targetEntityId: 459,
                icon: 'fas fa-users'
            },
            {
                id: 10,
                type: NOTIFICATION_TYPES.SUCCESS,
                priority: NOTIFICATION_PRIORITIES.LOW,
                title: 'تم تحويل عمولة المبيعات',
                content: 'تم تحويل عمولة المبيعات للشهر الماضي بمبلغ 15,800 ريال إلى حسابك',
                dateCreated: '2025-03-15T10:30:00',
                dateExpiry: '2025-04-15T00:00:00',
                status: NOTIFICATION_STATUS.READ,
                source: NOTIFICATION_SOURCES.SALES,
                link: '../commissions/commission-history.html',
                targetEntityId: null,
                icon: 'fas fa-money-bill-wave'
            }
        ],
        
        // إعدادات الإشعارات
        settings: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            notifyOnNewTask: true,
            notifyOnNewMeeting: true,
            notifyOnNewMessage: true,
            notifyOnSalesUpdate: true,
            notifyOnCustomerActivity: true,
            notifyOnSystemUpdate: false,
            notificationDigest: 'daily', // daily, weekly, immediate
            doNotDisturbStart: '22:00',
            doNotDisturbEnd: '07:00'
        }
    };

    // دالة لإضافة إشعار جديد
    function addNotification(notification) {
        const newId = notificationsData.notifications.length > 0 
            ? Math.max(...notificationsData.notifications.map(n => n.id)) + 1 
            : 1;
        
        const newNotification = {
            id: newId,
            dateCreated: new Date().toISOString(),
            status: NOTIFICATION_STATUS.UNREAD,
            ...notification
        };
        
        notificationsData.notifications.unshift(newNotification);
        return newId;
    }
    
    // دالة لتحديث حالة الإشعار
    function updateNotificationStatus(id, status) {
        const notification = notificationsData.notifications.find(n => n.id === id);
        if (notification) {
            notification.status = status;
            return true;
        }
        return false;
    }
    
    // دالة لحذف إشعار
    function deleteNotification(id) {
        const index = notificationsData.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            notificationsData.notifications.splice(index, 1);
            return true;
        }
        return false;
    }
    
    // دالة للحصول على جميع الإشعارات
    function getAllNotifications() {
        return [...notificationsData.notifications].sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
    }
    
    // دالة للحصول على الإشعارات غير المقروءة
    function getUnreadNotifications() {
        return getAllNotifications().filter(n => n.status === NOTIFICATION_STATUS.UNREAD);
    }
    
    // دالة للحصول على الإشعارات حسب النوع
    function getNotificationsByType(type) {
        return getAllNotifications().filter(n => n.type === type);
    }
    
    // دالة للحصول على الإشعارات حسب الأولوية
    function getNotificationsByPriority(priority) {
        return getAllNotifications().filter(n => n.priority === priority);
    }
    
    // دالة لتحديث إعدادات الإشعارات
    function updateNotificationSettings(newSettings) {
        notificationsData.settings = {
            ...notificationsData.settings,
            ...newSettings
        };
        return notificationsData.settings;
    }
    
    // دالة للحصول على إعدادات الإشعارات
    function getNotificationSettings() {
        return notificationsData.settings;
    }
    
    // واجهة API العامة للوحدة
    return {
        TYPES: NOTIFICATION_TYPES,
        PRIORITIES: NOTIFICATION_PRIORITIES,
        STATUS: NOTIFICATION_STATUS,
        SOURCES: NOTIFICATION_SOURCES,
        addNotification,
        updateNotificationStatus,
        deleteNotification,
        getAllNotifications,
        getUnreadNotifications,
        getNotificationsByType,
        getNotificationsByPriority,
        updateNotificationSettings,
        getNotificationSettings
    };
})();
