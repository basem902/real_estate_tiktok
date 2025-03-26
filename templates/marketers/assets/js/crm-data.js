/**
 * crm-data.js
 * ملف بيانات إدارة العملاء للمسوقين العقاريين
 * تاريخ الإنشاء: 23 مارس 2025
 */

// مصفوفة العملاء المحتملين والفعليين
const customerData = {
    // بيانات العملاء
    customers: [
        {
            id: 1,
            name: "أحمد محمد علي",
            email: "ahmed@example.com",
            phone: "966512345678",
            status: "lead", // عميل محتمل
            source: "tiktok",
            interestLevel: 4, // من 1-5
            budget: "500000-750000",
            preferredLocations: ["الرياض - شمال", "الرياض - شرق"],
            propertyType: ["شقة", "فيلا"],
            dateAdded: "2025-02-15",
            lastContact: "2025-03-20",
            tags: ["مستعجل", "جاد"],
            notes: "يبحث عن عقار للسكن العائلي خلال شهرين",
            assignedTo: "سارة"
        },
        {
            id: 2,
            name: "فاطمة عبدالله",
            email: "fatima@example.com",
            phone: "966523456789",
            status: "customer", // عميل فعلي
            source: "referral",
            interestLevel: 5,
            budget: "1000000+",
            preferredLocations: ["جدة - غرب"],
            propertyType: ["فيلا فاخرة"],
            dateAdded: "2025-01-20",
            lastContact: "2025-03-22",
            tags: ["استثماري", "أولوية عالية"],
            notes: "تبحث عن عقار للاستثمار، تملك خبرة سابقة",
            assignedTo: "محمد"
        },
        {
            id: 3,
            name: "خالد العمري",
            email: "khaled@example.com",
            phone: "966534567890",
            status: "lead",
            source: "website",
            interestLevel: 2,
            budget: "300000-500000",
            preferredLocations: ["الدمام"],
            propertyType: ["شقة"],
            dateAdded: "2025-03-10",
            lastContact: "2025-03-15",
            tags: ["استفسار فقط"],
            notes: "يبحث عن معلومات أولية فقط",
            assignedTo: "أحمد"
        },
        {
            id: 4,
            name: "نورة الشمري",
            email: "noura@example.com",
            phone: "966545678901",
            status: "customer",
            source: "tiktok",
            interestLevel: 5,
            budget: "750000-1000000",
            preferredLocations: ["الرياض - غرب", "الرياض - شمال"],
            propertyType: ["فيلا", "دوبلكس"],
            dateAdded: "2025-02-01",
            lastContact: "2025-03-21",
            tags: ["مستعجل", "جاد", "شراء نقدي"],
            notes: "تريد الانتقال خلال شهر، لديها موافقة تمويل مسبقة",
            assignedTo: "سارة"
        },
        {
            id: 5,
            name: "عمر سعيد",
            email: "omar@example.com",
            phone: "966556789012",
            status: "inactive",
            source: "instagram",
            interestLevel: 1,
            budget: "غير محدد",
            preferredLocations: ["مكة"],
            propertyType: ["شقة"],
            dateAdded: "2025-01-05",
            lastContact: "2025-01-15",
            tags: ["غير مستجيب"],
            notes: "لم يستجب بعد عدة محاولات للتواصل",
            assignedTo: "محمد"
        },
        {
            id: 6,
            name: "سارة القحطاني",
            email: "sara@example.com",
            phone: "966567890123",
            status: "lead",
            source: "referral",
            interestLevel: 3,
            budget: "500000-750000",
            preferredLocations: ["جدة - شمال"],
            propertyType: ["شقة"],
            dateAdded: "2025-03-01",
            lastContact: "2025-03-18",
            tags: ["استثماري"],
            notes: "تبحث عن شقة للاستثمار، مهتمة بالعائد السنوي",
            assignedTo: "أحمد"
        },
        {
            id: 7,
            name: "محمد السعيد",
            email: "m.saeed@example.com",
            phone: "966578901234",
            status: "customer",
            source: "website",
            interestLevel: 4,
            budget: "1000000+",
            preferredLocations: ["الرياض - شرق"],
            propertyType: ["أرض سكنية"],
            dateAdded: "2025-02-28",
            lastContact: "2025-03-22",
            tags: ["استثماري", "تطوير عقاري"],
            notes: "يبحث عن أرض لتطوير مشروع سكني صغير",
            assignedTo: "سارة"
        },
        {
            id: 8,
            name: "عبدالله الحربي",
            email: "abdullah@example.com",
            phone: "966589012345",
            status: "lead",
            source: "tiktok",
            interestLevel: 4,
            budget: "300000-500000",
            preferredLocations: ["المدينة المنورة"],
            propertyType: ["شقة"],
            dateAdded: "2025-03-15",
            lastContact: "2025-03-20",
            tags: ["جاد"],
            notes: "يبحث عن شقة للسكن، ملتزم بالميزانية",
            assignedTo: "محمد"
        }
    ],
    
    // سجل التفاعلات مع العملاء
    interactions: [
        {
            id: 1,
            customerId: 1,
            type: "call",
            date: "2025-03-20",
            summary: "اتصال لمتابعة اهتمامه بالفيلا في حي النرجس",
            notes: "مهتم وطلب معلومات إضافية عن المرافق القريبة",
            createdBy: "سارة"
        },
        {
            id: 2,
            customerId: 4,
            type: "meeting",
            date: "2025-03-21",
            summary: "معاينة للفيلا في حي الياسمين",
            notes: "أبدت إعجابها بالعقار، طلبت مهلة يومين للتفكير",
            createdBy: "سارة"
        },
        {
            id: 3,
            customerId: 2,
            type: "email",
            date: "2025-03-22",
            summary: "إرسال عروض للفلل الاستثمارية في غرب جدة",
            notes: "تم إرسال 3 عروض مختلفة حسب المواصفات المطلوبة",
            createdBy: "محمد"
        },
        {
            id: 4,
            customerId: 7,
            type: "call",
            date: "2025-03-22",
            summary: "متابعة بخصوص الأرض في حي النخيل",
            notes: "أكد اهتمامه وطلب ترتيب زيارة للموقع خلال الأسبوع القادم",
            createdBy: "سارة"
        },
        {
            id: 5,
            customerId: 6,
            type: "whatsapp",
            date: "2025-03-18",
            summary: "إرسال تفاصيل وصور للشقة الاستثمارية",
            notes: "استلمت العرض وأبدت اهتمامها، ستقوم بالرد خلال يومين",
            createdBy: "أحمد"
        }
    ]
};

// مصفوفة مصادر العملاء
const customerSources = [
    "tiktok",
    "instagram",
    "website",
    "referral",
    "facebook",
    "مكالمة هاتفية",
    "معرض عقاري",
    "google",
    "إعلان خارجي",
    "منصات أخرى"
];

// مصفوفة الحالات
const customerStatuses = [
    { id: "lead", name: "محتمل", color: "warning" },
    { id: "customer", name: "عميل", color: "success" },
    { id: "inactive", name: "غير نشط", color: "secondary" }
];

// مصفوفة مستويات الاهتمام
const interestLevels = [
    { id: 1, name: "منخفض جداً", color: "secondary" },
    { id: 2, name: "منخفض", color: "secondary" },
    { id: 3, name: "متوسط", color: "info" },
    { id: 4, name: "عالي", color: "primary" },
    { id: 5, name: "عالي جداً", color: "danger" }
];

// مصفوفة الموظفين
const assignees = [
    { id: "سارة", name: "سارة الأحمد" },
    { id: "محمد", name: "محمد العتيبي" },
    { id: "أحمد", name: "أحمد الشمري" }
];

// استرجاع جميع العملاء
function getAllCustomers() {
    return customerData.customers;
}

// استرجاع بيانات عميل محدد
function getCustomerById(id) {
    return customerData.customers.find(customer => customer.id === id);
}

// استرجاع التفاعلات لعميل محدد
function getCustomerInteractions(customerId) {
    return customerData.interactions.filter(interaction => interaction.customerId === customerId);
}

// استرجاع مصادر العملاء
function getCustomerSources() {
    return customerSources;
}

// استرجاع حالات العملاء
function getCustomerStatuses() {
    return customerStatuses;
}

// استرجاع مستويات الاهتمام
function getInterestLevels() {
    return interestLevels;
}

// استرجاع قائمة الموظفين
function getAssignees() {
    return assignees;
}

// إضافة عميل جديد
function addCustomer(customerObj) {
    // إنشاء معرف جديد
    const newId = Math.max(...customerData.customers.map(c => c.id)) + 1;
    customerObj.id = newId;
    
    // إضافة تاريخ إنشاء العميل
    customerObj.dateAdded = new Date().toISOString().split('T')[0];
    
    // إضافة العميل للمصفوفة
    customerData.customers.push(customerObj);
    
    return newId;
}

// تحديث بيانات عميل
function updateCustomer(customerObj) {
    const index = customerData.customers.findIndex(c => c.id === customerObj.id);
    if (index !== -1) {
        // الاحتفاظ بتاريخ الإضافة الأصلي
        const originalDateAdded = customerData.customers[index].dateAdded;
        customerObj.dateAdded = originalDateAdded;
        
        // تحديث البيانات
        customerData.customers[index] = customerObj;
        return true;
    }
    return false;
}

// إضافة تفاعل جديد مع عميل
function addInteraction(interactionObj) {
    const newId = Math.max(...customerData.interactions.map(i => i.id)) + 1;
    interactionObj.id = newId;
    
    // إضافة تاريخ التفاعل إذا لم يكن موجوداً
    if (!interactionObj.date) {
        interactionObj.date = new Date().toISOString().split('T')[0];
    }
    
    // تحديث تاريخ آخر تواصل مع العميل
    const customer = getCustomerById(interactionObj.customerId);
    if (customer) {
        updateCustomer({
            ...customer,
            lastContact: interactionObj.date
        });
    }
    
    // إضافة التفاعل للمصفوفة
    customerData.interactions.push(interactionObj);
    
    return newId;
}

// تصدير الدوال والبيانات
window.crmData = {
    getAllCustomers,
    getCustomerById,
    getCustomerInteractions,
    getCustomerSources,
    getCustomerStatuses,
    getInterestLevels,
    getAssignees,
    addCustomer,
    updateCustomer,
    addInteraction
};
