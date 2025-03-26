# دليل المطور لنظام الإشعارات

## نظرة عامة

نظام الإشعارات هو مكون متكامل يوفر واجهة برمجة تطبيقات (API) لإدارة وعرض الإشعارات في منصة التسويق العقاري. تم تصميم النظام بحيث يكون:

- **مستقلًا**: يمكن استخدامه في أي مكان في التطبيق
- **قابلًا للتوسيع**: يمكن إضافة أنواع جديدة من الإشعارات بسهولة
- **سهل الاستخدام**: واجهة برمجة بسيطة للتعامل مع الإشعارات

## المكونات الرئيسية

### 1. نموذج البيانات (notifications-data.js)

يحتوي على هيكل بيانات الإشعارات وواجهة برمجة التطبيقات الأساسية:

- `TYPES`: أنواع الإشعارات المختلفة (مثل: معلومات، تحذير، نجاح، خطر)
- `PRIORITIES`: مستويات أولوية الإشعارات (منخفضة، متوسطة، عالية، عاجلة)
- `STATUS`: حالات الإشعارات (غير مقروء، مقروء، تم الإجراء، مؤرشف)
- `SOURCES`: مصادر الإشعارات (نظام العملاء، المبيعات، التسويق، المهام، المواعيد، النظام)

### 2. مدير العرض (notifications-manager.js)

يتعامل مع عرض الإشعارات في واجهة المستخدم:

- إظهار عدد الإشعارات غير المقروءة
- عرض الإشعارات في القائمة المنسدلة
- عرض الإشعارات في صفحة لوحة الإشعارات
- عرض إشعارات منبثقة (توست)

### 3. أنماط CSS (notifications-styles.css)

تحدد مظهر مكونات الإشعارات المختلفة.

### 4. مكونات HTML

- `notifications-panel.html`: صفحة كاملة لإدارة الإشعارات
- `notification-component.html`: مكون قابل لإعادة الاستخدام للقائمة المنسدلة

## كيفية استخدام النظام

### إضافة زر الإشعارات إلى صفحة

1. أضف رابط ملفات CSS في رأس الصفحة:

```html
<!-- أنماط نظام الإشعارات -->
<link rel="stylesheet" href="../notifications/assets/css/notifications-styles.css">
```

2. أضف مكون الإشعارات في شريط التنقل (داخل قائمة العناصر في شريط التنقل):

```html
<!-- مكون الإشعارات -->
<li class="nav-item">
    <a class="nav-link position-relative" href="#" id="notificationsBell">
        <div class="notifications-bell">
            <i class="fas fa-bell"></i>
            <div class="notifications-counter" id="notificationsCounter">0</div>
        </div>
    </a>

    <!-- قائمة الإشعارات المنسدلة -->
    <div class="notifications-dropdown" id="notificationsDropdown">
        <div class="notifications-dropdown-header">
            <h6>الإشعارات</h6>
            <div class="header-actions">
                <a href="../notifications/notifications-panel.html">إدارة الإشعارات</a>
            </div>
        </div>
        <div class="notifications-dropdown-container">
            <!-- سيتم تحميل الإشعارات هنا بواسطة JavaScript -->
        </div>
    </div>
</li>
```

3. أضف ملفات JavaScript في نهاية الصفحة (قبل إغلاق وسم `</body>`):

```html
<!-- ملفات نظام الإشعارات -->
<script src="../notifications/assets/js/notifications-data.js"></script>
<script src="../notifications/assets/js/notifications-manager.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // تهيئة نظام الإشعارات
        window.notificationsManager.initialize();
        
        // إغلاق قائمة الإشعارات عند النقر في أي مكان آخر
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('notificationsDropdown');
            const bell = document.getElementById('notificationsBell');
            
            if (dropdown && dropdown.classList.contains('show') && 
                !dropdown.contains(event.target) && 
                !bell.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
</script>
```

### إضافة إشعار جديد

يمكنك استخدام واجهة برمجة التطبيقات لإضافة إشعار جديد:

```javascript
// إنشاء إشعار جديد
const notification = {
    type: window.notificationsData.TYPES.SUCCESS,
    priority: window.notificationsData.PRIORITIES.MEDIUM,
    title: 'تم تأكيد الموعد',
    content: 'تم تأكيد موعد معاينة العقار مع العميل محمد أحمد',
    dateExpiry: new Date(Date.now() + 604800000).toISOString(), // أسبوع من الآن
    source: window.notificationsData.SOURCES.APPOINTMENT,
    link: '../schedule/calendar-view.html?date=2025-03-25',
    icon: 'fas fa-calendar-check'
};

// إضافة الإشعار إلى النظام
const notificationId = window.notificationsData.addNotification(notification);

// تحديث عداد الإشعارات وإظهار إشعار منبثق
window.notificationsManager.updateNotificationsCounter();
window.notificationsManager.showToast(notification);
```

### تحديث حالة الإشعار

يمكنك تحديث حالة الإشعار (مثلاً: تعيينه كمقروء):

```javascript
// تعيين إشعار كمقروء
window.notificationsData.updateNotificationStatus(notificationId, window.notificationsData.STATUS.READ);

// تحديث العرض
window.notificationsManager.updateNotificationsCounter();
```

### حذف إشعار

```javascript
// حذف إشعار
window.notificationsData.deleteNotification(notificationId);

// تحديث العرض
window.notificationsManager.updateNotificationsCounter();
```

## دمج النظام مع الوحدات الأخرى

### دمج مع نظام المواعيد

عند إنشاء موعد جديد:

```javascript
function createAppointmentNotification(appointment) {
    const notification = {
        type: window.notificationsData.TYPES.MEETING,
        priority: window.notificationsData.PRIORITIES.MEDIUM,
        title: `موعد جديد: ${appointment.title}`,
        content: `تم تحديد موعد جديد بتاريخ ${formatDate(appointment.date)} الساعة ${appointment.time}`,
        dateExpiry: new Date(appointment.date).toISOString(),
        source: window.notificationsData.SOURCES.APPOINTMENT,
        link: `../schedule/calendar-view.html?date=${appointment.date}`,
        icon: 'fas fa-calendar-check'
    };
    
    return window.notificationsData.addNotification(notification);
}
```

### دمج مع نظام العملاء (CRM)

عند إضافة عميل جديد أو تحديث حالة عميل:

```javascript
function createCustomerNotification(customer, action) {
    let title, content, type, priority;
    
    switch (action) {
        case 'new':
            title = `عميل جديد: ${customer.name}`;
            content = `تم إضافة عميل جديد إلى قاعدة البيانات: ${customer.name}`;
            type = window.notificationsData.TYPES.INFO;
            priority = window.notificationsData.PRIORITIES.LOW;
            break;
        case 'updated':
            title = `تحديث بيانات العميل: ${customer.name}`;
            content = `تم تحديث بيانات العميل: ${customer.name}`;
            type = window.notificationsData.TYPES.INFO;
            priority = window.notificationsData.PRIORITIES.LOW;
            break;
        case 'interested':
            title = `اهتمام من العميل: ${customer.name}`;
            content = `أبدى العميل ${customer.name} اهتمامًا بالعقار ${customer.interestedProperty}`;
            type = window.notificationsData.TYPES.SUCCESS;
            priority = window.notificationsData.PRIORITIES.MEDIUM;
            break;
    }
    
    const notification = {
        type,
        priority,
        title,
        content,
        dateExpiry: new Date(Date.now() + 1209600000).toISOString(), // أسبوعين من الآن
        source: window.notificationsData.SOURCES.CRM,
        link: `../crm/customer-details.html?id=${customer.id}`,
        icon: 'fas fa-user'
    };
    
    return window.notificationsData.addNotification(notification);
}
```

## إضافة أنواع إشعارات جديدة

لإضافة نوع جديد من الإشعارات، قم بتحديث الثوابت في `notifications-data.js`:

```javascript
// إضافة نوع جديد
const NOTIFICATION_TYPES = {
    // الأنواع الحالية...
    NEW_TYPE: 'new_type'
};

// إضافة مصدر جديد إذا لزم الأمر
const NOTIFICATION_SOURCES = {
    // المصادر الحالية...
    NEW_SOURCE: 'new_source'
};
```

ثم قم بتحديث CSS لإضافة أنماط خاصة بالنوع الجديد في `notifications-styles.css`.

## نصائح للأداء الأمثل

- استخدم `updateNotificationsCounter()` بعد أي تغيير في حالة الإشعارات للحفاظ على تحديث العداد
- استخدم `showToast()` عند إضافة إشعارات جديدة لإعلام المستخدم
- في التطبيق الإنتاجي، يجب تخزين الإشعارات في قاعدة بيانات وليس في ذاكرة المتصفح فقط

## مثال كامل لدمج النظام

```javascript
// إضافة مستمع لأحداث إضافة وتحديث المواعيد
document.addEventListener('appointment:created', function(event) {
    const appointment = event.detail;
    
    // إنشاء إشعار
    const notification = {
        type: window.notificationsData.TYPES.MEETING,
        priority: window.notificationsData.PRIORITIES.MEDIUM,
        title: `موعد جديد: ${appointment.title}`,
        content: `تم تحديد موعد جديد بتاريخ ${formatDate(appointment.date)} الساعة ${appointment.time}`,
        dateExpiry: new Date(appointment.date).toISOString(),
        source: window.notificationsData.SOURCES.APPOINTMENT,
        link: `../schedule/calendar-view.html?date=${appointment.date}`,
        icon: 'fas fa-calendar-check'
    };
    
    // إضافة الإشعار
    window.notificationsData.addNotification(notification);
    
    // تحديث العرض
    window.notificationsManager.updateNotificationsCounter();
    window.notificationsManager.showToast(notification);
});
```

## استكشاف الأخطاء وإصلاحها

### مشكلة: عداد الإشعارات لا يظهر

تأكد من:
- استدعاء `initialize()` بعد تحميل DOM
- وجود عنصر بمعرف `notificationsCounter` في الصفحة
- تحميل ملفات JavaScript بالترتيب الصحيح

### مشكلة: الإشعارات المنبثقة لا تظهر

تأكد من:
- استدعاء `showToast()` بعد إضافة الإشعار
- تمرير كائن إشعار صالح إلى `showToast()`
- عدم وجود أخطاء في وحدة تحكم المتصفح

## تطوير النظام مستقبلاً

- إضافة دعم للإشعارات في الوقت الحقيقي باستخدام WebSockets
- إضافة إمكانية الإشارة إلى المستخدمين في الإشعارات (mentions)
- إضافة خيار إرسال إشعارات جماعية لفريق أو قسم
- تحسين تصفية وبحث الإشعارات
