/**
 * Real Estate TikTok - Marketers Dashboard
 * Commissions & Payments Data
 * Version: 1.0.0
 */

// البيانات التجريبية للعمولات
const commissions = [
    {
        id: 1,
        propertyId: "PROP-001",
        propertyName: "فيلا النرجس",
        propertyType: "فيلا",
        clientId: "CLIENT-005",
        clientName: "عبدالله الأحمد",
        dealType: "بيع",
        dealValue: 2500000,
        commissionRate: 2.5,
        commissionAmount: 62500,
        dealDate: "2025-02-15",
        status: "مدفوعة",
        paymentId: "PMT-001",
        paymentDate: "2025-02-20"
    },
    {
        id: 2,
        propertyId: "PROP-005",
        propertyName: "شقة الياسمين",
        propertyType: "شقة",
        clientId: "CLIENT-012",
        clientName: "سارة المطيري",
        dealType: "إيجار",
        dealValue: 75000,
        commissionRate: 5,
        commissionAmount: 3750,
        dealDate: "2025-02-25",
        status: "مدفوعة",
        paymentId: "PMT-003",
        paymentDate: "2025-03-05"
    },
    {
        id: 3,
        propertyId: "PROP-010",
        propertyName: "أرض طريق الملك فهد",
        propertyType: "أرض تجارية",
        clientId: "CLIENT-018",
        clientName: "شركة المستقبل للتطوير",
        dealType: "بيع",
        dealValue: 4500000,
        commissionRate: 1.8,
        commissionAmount: 81000,
        dealDate: "2025-03-10",
        status: "معلقة",
        paymentId: null,
        paymentDate: null
    },
    {
        id: 4,
        propertyId: "PROP-007",
        propertyName: "فيلا الملقا",
        propertyType: "فيلا",
        clientId: "CLIENT-008",
        clientName: "محمد السليم",
        dealType: "بيع",
        dealValue: 3200000,
        commissionRate: 2.2,
        commissionAmount: 70400,
        dealDate: "2025-03-18",
        status: "مدفوعة",
        paymentId: "PMT-006",
        paymentDate: "2025-03-22"
    },
    {
        id: 5,
        propertyId: "PROP-015",
        propertyName: "مكتب البرج الأزرق",
        propertyType: "مكتب",
        clientId: "CLIENT-023",
        clientName: "شركة التميز للاستشارات",
        dealType: "إيجار",
        dealValue: 140000,
        commissionRate: 7,
        commissionAmount: 9800,
        dealDate: "2025-03-25",
        status: "معلقة",
        paymentId: null,
        paymentDate: null
    },
    {
        id: 6,
        propertyId: "PROP-018",
        propertyName: "محل مول الواحة",
        propertyType: "محل تجاري",
        clientId: "CLIENT-027",
        clientName: "مطعم بيتزا إيطاليانو",
        dealType: "إيجار",
        dealValue: 180000,
        commissionRate: 5,
        commissionAmount: 9000,
        dealDate: "2025-03-30",
        status: "معلقة",
        paymentId: null,
        paymentDate: null
    },
    {
        id: 7,
        propertyId: "PROP-022",
        propertyName: "شقة الورود",
        propertyType: "شقة",
        clientId: "CLIENT-014",
        clientName: "فهد العبدالله",
        dealType: "بيع",
        dealValue: 950000,
        commissionRate: 2.5,
        commissionAmount: 23750,
        dealDate: "2025-04-05",
        status: "مدفوعة",
        paymentId: "PMT-009",
        paymentDate: "2025-04-10"
    },
    {
        id: 8,
        propertyId: "PROP-025",
        propertyName: "قطعة أرض الفرسان",
        propertyType: "أرض سكنية",
        clientId: "CLIENT-031",
        clientName: "عمر الزهراني",
        dealType: "بيع",
        dealValue: 1800000,
        commissionRate: 2,
        commissionAmount: 36000,
        dealDate: "2025-04-12",
        status: "معلقة",
        paymentId: null,
        paymentDate: null
    }
];

// البيانات التجريبية للمدفوعات
const payments = [
    {
        id: "PMT-001",
        amount: 62500,
        method: "تحويل بنكي",
        date: "2025-02-20",
        description: "عمولة بيع فيلا النرجس - العميل: عبدالله الأحمد",
        reference: "TRX25022001",
        relatedCommissions: [1]
    },
    {
        id: "PMT-002",
        amount: 18500,
        method: "تحويل بنكي",
        date: "2025-02-28",
        description: "عمولة بيع أرض الروضة - العميل: شركة الإنماء العقارية",
        reference: "TRX25022802",
        relatedCommissions: null
    },
    {
        id: "PMT-003",
        amount: 3750,
        method: "تحويل بنكي",
        date: "2025-03-05",
        description: "عمولة إيجار شقة الياسمين - العميل: سارة المطيري",
        reference: "TRX25030503",
        relatedCommissions: [2]
    },
    {
        id: "PMT-004",
        amount: 12000,
        method: "محفظة إلكترونية",
        date: "2025-03-12",
        description: "عمولة إيجار محل السلام - العميل: مؤسسة الرياض للملابس",
        reference: "EWALLET25031204",
        relatedCommissions: null
    },
    {
        id: "PMT-005",
        amount: 30000,
        method: "تحويل بنكي",
        date: "2025-03-18",
        description: "عمولة بيع شقة البحيرة - العميل: أحمد الشمري",
        reference: "TRX25031805",
        relatedCommissions: null
    },
    {
        id: "PMT-006",
        amount: 70400,
        method: "تحويل بنكي",
        date: "2025-03-22",
        description: "عمولة بيع فيلا الملقا - العميل: محمد السليم",
        reference: "TRX25032206",
        relatedCommissions: [4]
    },
    {
        id: "PMT-007",
        amount: 5500,
        method: "نقدي",
        date: "2025-03-28",
        description: "عمولة إيجار استوديو الجامعة - العميل: علي الدوسري",
        reference: "CASH25032807",
        relatedCommissions: null
    },
    {
        id: "PMT-008",
        amount: 15000,
        method: "محفظة إلكترونية",
        date: "2025-04-02",
        description: "عمولة بيع قطعة أرض الربيع - العميل: ناصر القحطاني",
        reference: "EWALLET25040208",
        relatedCommissions: null
    },
    {
        id: "PMT-009",
        amount: 23750,
        method: "تحويل بنكي",
        date: "2025-04-10",
        description: "عمولة بيع شقة الورود - العميل: فهد العبدالله",
        reference: "TRX25041009",
        relatedCommissions: [7]
    }
];

// البيانات التجريبية للوثائق والمستندات
const documents = [
    {
        id: 1,
        name: "فاتورة عمولة - فيلا النرجس",
        type: "invoice",
        uploadDate: "2025-02-18",
        size: "420KB",
        extension: "pdf",
        relatedCommissionId: 1
    },
    {
        id: 2,
        name: "إيصال استلام العمولة - فيلا النرجس",
        type: "receipt",
        uploadDate: "2025-02-20",
        size: "350KB",
        extension: "pdf",
        relatedCommissionId: 1
    },
    {
        id: 3,
        name: "عقد وساطة عقارية - شقة الياسمين",
        type: "contract",
        uploadDate: "2025-02-22",
        size: "1.2MB",
        extension: "pdf",
        relatedCommissionId: 2
    },
    {
        id: 4,
        name: "فاتورة عمولة - شقة الياسمين",
        type: "invoice",
        uploadDate: "2025-03-01",
        size: "380KB",
        extension: "pdf",
        relatedCommissionId: 2
    },
    {
        id: 5,
        name: "عقد وساطة عقارية - أرض طريق الملك فهد",
        type: "contract",
        uploadDate: "2025-03-08",
        size: "1.8MB",
        extension: "pdf",
        relatedCommissionId: 3
    },
    {
        id: 6,
        name: "فاتورة عمولة - فيلا الملقا",
        type: "invoice",
        uploadDate: "2025-03-20",
        size: "450KB",
        extension: "pdf",
        relatedCommissionId: 4
    },
    {
        id: 7,
        name: "إيصال استلام العمولة - فيلا الملقا",
        type: "receipt",
        uploadDate: "2025-03-22",
        size: "320KB",
        extension: "pdf",
        relatedCommissionId: 4
    },
    {
        id: 8,
        name: "عقد وساطة عقارية - مكتب البرج الأزرق",
        type: "contract",
        uploadDate: "2025-03-23",
        size: "950KB",
        extension: "pdf",
        relatedCommissionId: 5
    },
    {
        id: 9,
        name: "صورة هوية المستأجر - محل مول الواحة",
        type: "id",
        uploadDate: "2025-03-28",
        size: "2.5MB",
        extension: "jpg",
        relatedCommissionId: 6
    },
    {
        id: 10,
        name: "فاتورة عمولة - شقة الورود",
        type: "invoice",
        uploadDate: "2025-04-06",
        size: "420KB",
        extension: "pdf",
        relatedCommissionId: 7
    }
];

// البيانات التجريبية لطلبات السحب
const withdrawalRequests = [
    {
        id: 1,
        amount: 25000,
        requestDate: "2025-02-22",
        method: "تحويل بنكي",
        bankName: "البنك الأهلي السعودي",
        accountNumber: "SA5810000000123456789012",
        status: "مكتمل",
        updateDate: "2025-02-25",
        notes: "طلب سحب العمولات المتراكمة لشهر يناير"
    },
    {
        id: 2,
        amount: 18000,
        requestDate: "2025-03-15",
        method: "تحويل بنكي",
        bankName: "مصرف الراجحي",
        accountNumber: "SA7820000000987654321098",
        status: "مكتمل",
        updateDate: "2025-03-18",
        notes: "طلب سحب عمولة مبيعات الربع الأول"
    },
    {
        id: 3,
        amount: 5000,
        requestDate: "2025-04-02",
        method: "محفظة إلكترونية",
        walletType: "STC Pay",
        walletNumber: "0501234567",
        status: "قيد المعالجة",
        updateDate: "2025-04-02",
        notes: ""
    },
    {
        id: 4,
        amount: 10000,
        requestDate: "2025-04-10",
        method: "تحويل بنكي",
        bankName: "بنك الرياض",
        accountNumber: "SA8830000000456789012345",
        status: "قيد المعالجة",
        updateDate: "2025-04-10",
        notes: "طلب سحب جزئي للعمولات المتراكمة"
    }
];

// بيانات الرسوم البيانية
const chartData = {
    yearly: {
        labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        totalCommissions: [35000, 48500, 63000, 42000, 0, 0, 0, 0, 0, 0, 0, 0],
        paidCommissions: [35000, 37500, 52500, 23750, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    quarterly: {
        labels: ["يناير", "فبراير", "مارس", "أبريل"],
        totalCommissions: [35000, 48500, 63000, 42000],
        paidCommissions: [35000, 37500, 52500, 23750]
    },
    monthly: {
        labels: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"],
        totalCommissions: [15000, 28000, 20000, 0],
        paidCommissions: [15000, 8750, 0, 0]
    }
};

// الحصول على العمولات المستحقة (المعلقة)
function getPendingCommissions() {
    return commissions.filter(commission => commission.status === "معلقة");
}

// الحصول على إجمالي العمولات
function getTotalCommissions() {
    return commissions.reduce((total, commission) => total + commission.commissionAmount, 0);
}

// الحصول على إجمالي العمولات المدفوعة
function getTotalPaidCommissions() {
    return commissions
        .filter(commission => commission.status === "مدفوعة")
        .reduce((total, commission) => total + commission.commissionAmount, 0);
}

// الحصول على إجمالي العمولات المعلقة
function getTotalPendingCommissions() {
    return commissions
        .filter(commission => commission.status === "معلقة")
        .reduce((total, commission) => total + commission.commissionAmount, 0);
}

// الحصول على إجمالي عدد الصفقات
function getTotalDeals() {
    return commissions.length;
}

// الحصول على توزيع العمولات حسب نوع العقار
function getCommissionsByPropertyType() {
    const groupedByType = {};
    
    commissions.forEach(commission => {
        if (!groupedByType[commission.propertyType]) {
            groupedByType[commission.propertyType] = 0;
        }
        
        groupedByType[commission.propertyType] += commission.commissionAmount;
    });
    
    return groupedByType;
}

// الحصول على سجل المدفوعات
function getPaymentsByPeriod(period = "all") {
    if (period === "all") {
        return payments;
    }
    
    const today = new Date();
    let filterDate = new Date();
    
    // تحديد فترة التصفية
    switch (period) {
        case "month":
            filterDate.setMonth(today.getMonth() - 1);
            break;
        case "3months":
            filterDate.setMonth(today.getMonth() - 3);
            break;
        case "6months":
            filterDate.setMonth(today.getMonth() - 6);
            break;
        case "year":
            filterDate.setFullYear(today.getFullYear() - 1);
            break;
        default:
            return payments;
    }
    
    // تصفية المدفوعات حسب التاريخ
    return payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= filterDate;
    });
}

// الحصول على مستندات العمولة
function getDocumentsByCommission(commissionId) {
    return documents.filter(document => document.relatedCommissionId === commissionId);
}

// إضافة طلب سحب جديد
function addWithdrawalRequest(withdrawalData) {
    const newId = Math.max(...withdrawalRequests.map(request => request.id), 0) + 1;
    const today = new Date();
    
    const newRequest = {
        id: newId,
        amount: withdrawalData.amount,
        requestDate: today.toISOString().split('T')[0],
        method: withdrawalData.method,
        status: "قيد المعالجة",
        updateDate: today.toISOString().split('T')[0],
        notes: withdrawalData.notes || ""
    };
    
    // إضافة تفاصيل طريقة السحب
    if (withdrawalData.method === "تحويل بنكي") {
        newRequest.bankName = withdrawalData.bankName;
        newRequest.accountNumber = withdrawalData.accountNumber;
    } else if (withdrawalData.method === "محفظة إلكترونية") {
        newRequest.walletType = withdrawalData.walletType;
        newRequest.walletNumber = withdrawalData.walletNumber;
    }
    
    withdrawalRequests.push(newRequest);
    return newRequest;
}

// إضافة مستند جديد
function addDocument(documentData) {
    const newId = Math.max(...documents.map(document => document.id), 0) + 1;
    const today = new Date();
    
    const newDocument = {
        id: newId,
        name: documentData.name,
        type: documentData.type,
        uploadDate: today.toISOString().split('T')[0],
        size: documentData.size || "0KB",
        extension: documentData.extension || "pdf",
        relatedCommissionId: documentData.relatedCommissionId || null
    };
    
    documents.push(newDocument);
    return newDocument;
}

// الحصول على بيانات الرسم البياني حسب الفترة
function getChartDataByPeriod(period = "year") {
    switch (period) {
        case "month":
            return chartData.monthly;
        case "quarter":
            return chartData.quarterly;
        case "year":
            return chartData.yearly;
        default:
            return chartData.yearly;
    }
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.commissionsManager = {
    commissions,
    payments,
    documents,
    withdrawalRequests,
    getPendingCommissions,
    getTotalCommissions,
    getTotalPaidCommissions,
    getTotalPendingCommissions,
    getTotalDeals,
    getCommissionsByPropertyType,
    getPaymentsByPeriod,
    getDocumentsByCommission,
    addWithdrawalRequest,
    addDocument,
    getChartDataByPeriod
};
