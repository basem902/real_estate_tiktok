/**
 * analytics-data.js
 * بيانات وخدمات التحليلات للوحة تحكم المسوقين العقاريين
 */

// كائن عام للبيانات التحليلية
window.analyticsData = (function() {
    // بيانات المبيعات الشهرية (للسنة الحالية)
    const monthlySalesData = [
        { month: "يناير", value: 120000, count: 4 },
        { month: "فبراير", value: 150000, count: 5 },
        { month: "مارس", value: 180000, count: 6 },
        { month: "أبريل", value: 220000, count: 7 },
        { month: "مايو", value: 250000, count: 8 },
        { month: "يونيو", value: 300000, count: 10 },
        { month: "يوليو", value: 280000, count: 9 },
        { month: "أغسطس", value: 260000, count: 8 },
        { month: "سبتمبر", value: 320000, count: 11 },
        { month: "أكتوبر", value: 350000, count: 12 },
        { month: "نوفمبر", value: 380000, count: 13 },
        { month: "ديسمبر", value: 420000, count: 14 }
    ];

    // بيانات المبيعات حسب نوع العقار
    const salesByPropertyType = [
        { type: "شقق", value: 1200000, count: 40 },
        { type: "فلل", value: 2500000, count: 25 },
        { type: "أراضي", value: 1800000, count: 15 },
        { type: "عقارات تجارية", value: 3500000, count: 20 },
        { type: "مكاتب", value: 900000, count: 10 }
    ];

    // بيانات المبيعات حسب المنطقة
    const salesByRegion = [
        { region: "الرياض", value: 3500000, count: 35 },
        { region: "جدة", value: 2800000, count: 28 },
        { region: "الدمام", value: 1500000, count: 15 },
        { region: "مكة", value: 1200000, count: 12 },
        { region: "المدينة", value: 800000, count: 8 },
        { region: "أخرى", value: 1200000, count: 12 }
    ];

    // بيانات الزيارات والتفاعلات
    const visitsAndInteractions = {
        websiteVisits: [1200, 1300, 1500, 1800, 2000, 2200, 2100, 2300, 2500, 2700, 2900, 3100],
        appVisits: [800, 900, 1100, 1200, 1400, 1600, 1500, 1700, 1900, 2100, 2300, 2500],
        socialMediaInteractions: [3000, 3500, 4000, 4500, 5000, 5500, 5300, 5800, 6200, 6500, 7000, 7500]
    };

    // بيانات العملاء
    const customerAnalytics = {
        newCustomers: [30, 35, 40, 45, 50, 55, 53, 58, 62, 65, 70, 75],
        returningCustomers: [20, 25, 30, 35, 40, 45, 43, 48, 52, 55, 60, 65],
        conversionRate: [2.5, 2.7, 3.0, 3.2, 3.5, 3.8, 3.7, 4.0, 4.2, 4.5, 4.8, 5.0]
    };

    // توزيع العملاء حسب المصدر
    const customersBySource = [
        { source: "محركات البحث", percentage: 35 },
        { source: "وسائل التواصل الاجتماعي", percentage: 25 },
        { source: "الإعلانات المدفوعة", percentage: 20 },
        { source: "الإحالات", percentage: 15 },
        { source: "أخرى", percentage: 5 }
    ];

    // مؤشرات الأداء الرئيسية
    const kpiData = {
        totalRevenue: 10500000,
        totalSales: 110,
        averageSaleValue: 95450,
        conversionRate: 4.2,
        customerAcquisitionCost: 2500,
        returnOnInvestment: 380,
        marketingEfficiency: 85
    };

    // بيانات التوقعات المستقبلية
    const forecastData = {
        futureSales: [450000, 480000, 510000, 540000, 570000, 600000],
        marketTrends: [
            { trend: "ارتفاع الطلب على الشقق الصغيرة", impact: "إيجابي", confidence: 85 },
            { trend: "زيادة أسعار العقارات التجارية", impact: "محايد", confidence: 70 },
            { trend: "تباطؤ سوق الفلل الفاخرة", impact: "سلبي", confidence: 65 },
            { trend: "نمو الاستثمار في المناطق النامية", impact: "إيجابي", confidence: 80 }
        ]
    };

    // بيانات تحليل المنافسين
    const competitorAnalysis = [
        { name: "شركة العقارات المتحدة", marketShare: 15, strength: "تنوع المحفظة", weakness: "ارتفاع الأسعار" },
        { name: "مجموعة الدار العقارية", marketShare: 12, strength: "جودة المشاريع", weakness: "نطاق جغرافي محدود" },
        { name: "عقارات الخليج", marketShare: 10, strength: "قوة التسويق", weakness: "خدمة العملاء" },
        { name: "دار الإسكان", marketShare: 8, strength: "الأسعار التنافسية", weakness: "قلة المشاريع الجديدة" },
        { name: "العقارات الذكية", marketShare: 7, strength: "التكنولوجيا المتقدمة", weakness: "ارتفاع تكاليف التشغيل" }
    ];

    // الدوال الخاصة بالوصول إلى البيانات
    return {
        // الحصول على بيانات المبيعات الشهرية
        getMonthlySalesData: function() {
            return monthlySalesData;
        },
        
        // الحصول على بيانات المبيعات حسب نوع العقار
        getSalesByPropertyType: function() {
            return salesByPropertyType;
        },
        
        // الحصول على بيانات المبيعات حسب المنطقة
        getSalesByRegion: function() {
            return salesByRegion;
        },
        
        // الحصول على بيانات الزيارات والتفاعلات
        getVisitsAndInteractions: function() {
            return visitsAndInteractions;
        },
        
        // الحصول على بيانات تحليل العملاء
        getCustomerAnalytics: function() {
            return customerAnalytics;
        },
        
        // الحصول على توزيع العملاء حسب المصدر
        getCustomersBySource: function() {
            return customersBySource;
        },
        
        // الحصول على مؤشرات الأداء الرئيسية
        getKPIData: function() {
            return kpiData;
        },
        
        // الحصول على بيانات التوقعات المستقبلية
        getForecastData: function() {
            return forecastData;
        },
        
        // الحصول على بيانات تحليل المنافسين
        getCompetitorAnalysis: function() {
            return competitorAnalysis;
        },
        
        // حساب معدل النمو بين فترتين
        calculateGrowthRate: function(currentValue, previousValue) {
            return previousValue === 0 ? 0 : ((currentValue - previousValue) / previousValue) * 100;
        },
        
        // الحصول على إجمالي المبيعات للفترة المحددة
        getTotalSalesForPeriod: function(startMonth, endMonth) {
            let total = 0;
            for (let i = startMonth - 1; i < endMonth; i++) {
                if (i >= 0 && i < monthlySalesData.length) {
                    total += monthlySalesData[i].value;
                }
            }
            return total;
        },
        
        // الحصول على متوسط قيمة المبيعات للفترة المحددة
        getAverageSaleForPeriod: function(startMonth, endMonth) {
            let totalValue = 0;
            let totalCount = 0;
            
            for (let i = startMonth - 1; i < endMonth; i++) {
                if (i >= 0 && i < monthlySalesData.length) {
                    totalValue += monthlySalesData[i].value;
                    totalCount += monthlySalesData[i].count;
                }
            }
            
            return totalCount === 0 ? 0 : totalValue / totalCount;
        },
        
        // حساب توزيع المبيعات حسب نوع العقار (النسبة المئوية)
        getSalesDistributionByPropertyType: function() {
            const totalSales = salesByPropertyType.reduce((total, item) => total + item.value, 0);
            return salesByPropertyType.map(item => ({
                type: item.type,
                percentage: (item.value / totalSales) * 100,
                value: item.value,
                count: item.count
            }));
        },
        
        // حساب توزيع المبيعات حسب المنطقة (النسبة المئوية)
        getSalesDistributionByRegion: function() {
            const totalSales = salesByRegion.reduce((total, item) => total + item.value, 0);
            return salesByRegion.map(item => ({
                region: item.region,
                percentage: (item.value / totalSales) * 100,
                value: item.value,
                count: item.count
            }));
        }
    };
})();
