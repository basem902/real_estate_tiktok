/**
 * dashboard-data.js
 * ملف البيانات للشاشة الرئيسية في لوحة تحكم المسوقين العقاريين
 * تاريخ الإنشاء: 23 مارس 2025
 */

// بيانات تجريبية للإحصائيات الرئيسية
const dashboardStatistics = {
    // إحصائيات العملاء
    potentialCustomers: 124,
    actualCustomers: 68,
    customerGrowthRate: 12.5, // نسبة النمو الشهرية
    
    // إحصائيات العقارات
    marketedProperties: 43,
    viewedProperties: 158,
    dealCompletionRate: 27.3, // النسبة المئوية
    
    // إحصائيات مالية
    totalCommissions: 76540,
    paidCommissions: 53120,
    pendingCommissions: 23420,
    
    // إحصائيات أداء التسويق
    adImpressions: 24500,
    adClicks: 982,
    conversionRate: 8.7, // النسبة المئوية
};

// بيانات تجريبية لنمو العملاء المحتملين (آخر 6 أشهر)
const customerGrowthData = {
    labels: ['أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير', 'فبراير', 'مارس'],
    potential: [78, 85, 92, 104, 118, 124],
    actual: [42, 48, 52, 59, 63, 68]
};

// بيانات تجريبية لأداء الحملات التسويقية
const campaignPerformanceData = {
    labels: ['حملة 1', 'حملة 2', 'حملة 3', 'حملة 4', 'حملة 5'],
    impressions: [5200, 6800, 4300, 3700, 4500],
    clicks: [234, 362, 186, 128, 247],
    conversions: [18, 32, 14, 8, 22]
};

// بيانات تجريبية لمعدلات التحويل حسب نوع العقار
const conversionRatesByPropertyType = {
    labels: ['شقق', 'فلل', 'أراضي', 'مكاتب تجارية', 'عقارات سياحية'],
    rates: [12.4, 15.2, 9.8, 7.6, 18.3]
};

// بيانات تجريبية للمهام العاجلة
const urgentTasks = [
    {
        id: 1,
        title: 'متابعة العميل محمد أحمد',
        description: 'عميل مهتم بالفيلا رقم 25 في مشروع الواحة',
        dueDate: '2025-03-25',
        priority: 'عالية',
        status: 'معلقة'
    },
    {
        id: 2,
        title: 'تجهيز عرض تسويقي للشقق الجديدة',
        description: 'مطلوب عرض بصيغة PowerPoint لمشروع تلال الرياض',
        dueDate: '2025-03-26',
        priority: 'متوسطة',
        status: 'معلقة'
    },
    {
        id: 3,
        title: 'تحديث محتوى الفيديو التسويقي',
        description: 'إضافة العروض الجديدة للفيديو التسويقي الرئيسي',
        dueDate: '2025-03-28',
        priority: 'عالية',
        status: 'معلقة'
    },
    {
        id: 4,
        title: 'الاتصال بالعميل سارة خالد',
        description: 'متابعة اهتمامها بالوحدات السكنية في مشروع بوابة الشرق',
        dueDate: '2025-03-24',
        priority: 'عالية',
        status: 'معلقة'
    },
    {
        id: 5,
        title: 'إرسال تقرير الأداء الأسبوعي',
        description: 'تقرير الأسبوع الماضي للإدارة',
        dueDate: '2025-03-24',
        priority: 'متوسطة',
        status: 'معلقة'
    }
];

// بيانات تجريبية لآخر التفاعلات من العملاء
const latestCustomerInteractions = [
    {
        id: 1,
        customerName: 'نورة السالم',
        interactionType: 'استفسار',
        property: 'شقة 204 - برج الأفق',
        date: '2025-03-23 10:15',
        status: 'بانتظار الرد',
        message: 'أود معرفة المزيد من التفاصيل عن مساحة الشقة ونظام السداد.'
    },
    {
        id: 2,
        customerName: 'فهد العتيبي',
        interactionType: 'طلب معاينة',
        property: 'فيلا 16 - مجمع الواحة',
        date: '2025-03-22 15:30',
        status: 'تمت جدولة موعد',
        message: 'أرغب في معاينة الفيلا غدًا إن أمكن.'
    },
    {
        id: 3,
        customerName: 'سارة الحربي',
        interactionType: 'تعليق',
        property: 'شقة 108 - برج النخيل',
        date: '2025-03-22 09:45',
        status: 'تم الرد',
        message: 'هل يوجد خصم للدفع النقدي الكامل؟'
    },
    {
        id: 4,
        customerName: 'خالد القحطاني',
        interactionType: 'شكوى',
        property: 'مكتب 305 - مجمع الأعمال',
        date: '2025-03-21 14:20',
        status: 'قيد المعالجة',
        message: 'المساحة المذكورة في الإعلان غير دقيقة.'
    },
    {
        id: 5,
        customerName: 'منى العبدالله',
        interactionType: 'حجز مبدئي',
        property: 'فيلا 42 - مشروع الربوة',
        date: '2025-03-21 11:10',
        status: 'بانتظار التأكيد',
        message: 'أرغب في حجز الفيلا مبدئيًا حتى الزيارة الميدانية.'
    }
];

// دوال للوصول إلى البيانات

/**
 * الحصول على جميع إحصائيات لوحة التحكم
 * @returns {Object} كائن يحتوي على جميع الإحصائيات
 */
function getDashboardStatistics() {
    return { ...dashboardStatistics };
}

/**
 * الحصول على بيانات نمو العملاء
 * @returns {Object} كائن يحتوي على بيانات نمو العملاء
 */
function getCustomerGrowthData() {
    return { ...customerGrowthData };
}

/**
 * الحصول على بيانات أداء الحملات التسويقية
 * @returns {Object} كائن يحتوي على بيانات أداء الحملات
 */
function getCampaignPerformanceData() {
    return { ...campaignPerformanceData };
}

/**
 * الحصول على بيانات معدلات التحويل حسب نوع العقار
 * @returns {Object} كائن يحتوي على بيانات معدلات التحويل
 */
function getConversionRatesByPropertyType() {
    return { ...conversionRatesByPropertyType };
}

/**
 * الحصول على قائمة المهام العاجلة
 * @param {number} limit - عدد المهام المطلوب استرجاعها (اختياري)
 * @returns {Array} مصفوفة من كائنات المهام
 */
function getUrgentTasks(limit = null) {
    const sortedTasks = [...urgentTasks].sort((a, b) => {
        // ترتيب حسب الأولوية أولاً
        const priorityOrder = { 'عالية': 1, 'متوسطة': 2, 'منخفضة': 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        // ثم حسب تاريخ الاستحقاق
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    return limit ? sortedTasks.slice(0, limit) : sortedTasks;
}

/**
 * الحصول على آخر التفاعلات من العملاء
 * @param {number} limit - عدد التفاعلات المطلوب استرجاعها (اختياري)
 * @returns {Array} مصفوفة من كائنات التفاعلات
 */
function getLatestCustomerInteractions(limit = null) {
    const sortedInteractions = [...latestCustomerInteractions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    return limit ? sortedInteractions.slice(0, limit) : sortedInteractions;
}

/**
 * تحديث حالة المهمة
 * @param {number} taskId - معرّف المهمة
 * @param {string} newStatus - الحالة الجديدة
 * @returns {boolean} نجاح العملية
 */
function updateTaskStatus(taskId, newStatus) {
    const taskIndex = urgentTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        urgentTasks[taskIndex].status = newStatus;
        return true;
    }
    return false;
}

/**
 * تحديث حالة التفاعل
 * @param {number} interactionId - معرّف التفاعل
 * @param {string} newStatus - الحالة الجديدة
 * @returns {boolean} نجاح العملية
 */
function updateInteractionStatus(interactionId, newStatus) {
    const interactionIndex = latestCustomerInteractions.findIndex(interaction => interaction.id === interactionId);
    if (interactionIndex !== -1) {
        latestCustomerInteractions[interactionIndex].status = newStatus;
        return true;
    }
    return false;
}
