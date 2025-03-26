/**
 * Real Estate TikTok - Marketers Dashboard
 * Ad Management Data
 * Version: 1.0.0
 */

// بيانات الإعلانات التجريبية
const ads = [
    {
        id: 1,
        title: "فيلا فاخرة في حي النرجس",
        platform: "tiktok",
        platformName: "TikTok",
        propertyId: "PROP-001",
        propertyType: "فيلا",
        type: "video",
        budget: 2500,
        budgetSpent: 1200,
        duration: 14,
        daysRemaining: 6,
        startDate: "2025-03-10",
        endDate: "2025-03-24",
        targetAudience: "families",
        description: "فيلا فاخرة للبيع في حي النرجس، 5 غرف نوم، مسبح خاص، ومساحة 500م²",
        status: "active",
        media: ["villa_narjis_1.mp4"],
        stats: {
            views: 45200,
            clicks: 1250,
            conversions: 28,
            ctr: 2.76,
            cpc: 0.96
        }
    },
    {
        id: 2,
        title: "شقة مميزة في حي الياسمين",
        platform: "instagram",
        platformName: "Instagram",
        propertyId: "PROP-005",
        propertyType: "شقة",
        type: "carousel",
        budget: 1800,
        budgetSpent: 900,
        duration: 10,
        daysRemaining: 4,
        startDate: "2025-03-15",
        endDate: "2025-03-25",
        targetAudience: "youth",
        description: "شقة فاخرة بتصميم عصري، 3 غرف، بمساحة 150م² في قلب حي الياسمين",
        status: "active",
        media: ["yasmin_apt_1.jpg", "yasmin_apt_2.jpg", "yasmin_apt_3.jpg"],
        stats: {
            views: 32400,
            clicks: 780,
            conversions: 15,
            ctr: 2.41,
            cpc: 1.15
        }
    },
    {
        id: 3,
        title: "أرض تجارية بموقع استراتيجي",
        platform: "facebook",
        platformName: "Facebook",
        propertyId: "PROP-010",
        propertyType: "أرض تجارية",
        type: "image",
        budget: 3000,
        budgetSpent: 3000,
        duration: 20,
        daysRemaining: 0,
        startDate: "2025-02-25",
        endDate: "2025-03-17",
        targetAudience: "investors",
        description: "أرض تجارية بمساحة 1000م² على طريق الملك فهد، مناسبة لإنشاء مجمع تجاري",
        status: "inactive",
        media: ["commercial_land_1.jpg"],
        stats: {
            views: 28500,
            clicks: 620,
            conversions: 7,
            ctr: 2.18,
            cpc: 4.84
        }
    },
    {
        id: 4,
        title: "فيلا في حي الملقا",
        platform: "google",
        platformName: "Google",
        propertyId: "PROP-007",
        propertyType: "فيلا",
        type: "text",
        budget: 2000,
        budgetSpent: 1400,
        duration: 15,
        daysRemaining: 5,
        startDate: "2025-03-13",
        endDate: "2025-03-28",
        targetAudience: "families",
        description: "فيلا راقية في حي الملقا، 6 غرف نوم، حديقة خاصة، ومساحة 420م²",
        status: "active",
        media: [],
        stats: {
            views: 15800,
            clicks: 420,
            conversions: 9,
            ctr: 2.66,
            cpc: 3.33
        }
    },
    {
        id: 5,
        title: "مكتب فاخر في البرج الأزرق",
        platform: "snapchat",
        platformName: "Snapchat",
        propertyId: "PROP-015",
        propertyType: "مكتب",
        type: "video",
        budget: 1500,
        budgetSpent: 250,
        duration: 8,
        daysRemaining: 7,
        startDate: "2025-03-20",
        endDate: "2025-03-28",
        targetAudience: "investors",
        description: "مكتب فاخر بمساحة 120م² في البرج الأزرق، إطلالة بانورامية على المدينة",
        status: "pending",
        media: ["blue_tower_office.mp4"],
        stats: {
            views: 6550,
            clicks: 170,
            conversions: 2,
            ctr: 2.60,
            cpc: 1.47
        }
    },
    {
        id: 6,
        title: "محل تجاري في مول الواحة",
        platform: "instagram",
        platformName: "Instagram",
        propertyId: "PROP-018",
        propertyType: "محل تجاري",
        type: "image",
        budget: 1200,
        budgetSpent: 0,
        duration: 10,
        daysRemaining: 10,
        startDate: "2025-03-25",
        endDate: "2025-04-04",
        targetAudience: "investors",
        description: "محل تجاري بمساحة 85م² في مول الواحة، موقع مميز بالقرب من المدخل الرئيسي",
        status: "pending",
        media: ["mall_shop.jpg"],
        stats: {
            views: 0,
            clicks: 0,
            conversions: 0,
            ctr: 0,
            cpc: 0
        }
    }
];

// الحصول على إجمالي الإحصائيات
function getOverallStats() {
    let totalViews = 0;
    let totalClicks = 0;
    let totalConversions = 0;
    let totalSpent = 0;
    
    ads.forEach(ad => {
        totalViews += ad.stats.views;
        totalClicks += ad.stats.clicks;
        totalConversions += ad.stats.conversions;
        totalSpent += ad.budgetSpent;
    });
    
    const averageCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    
    return {
        views: totalViews,
        clicks: totalClicks,
        conversions: totalConversions,
        spent: totalSpent,
        ctr: averageCTR.toFixed(2),
        conversionRate: conversionRate.toFixed(2)
    };
}

// الحصول على الإعلانات حسب المنصة
function getAdsByPlatform(platform) {
    if (platform === 'all') {
        return ads;
    }
    
    return ads.filter(ad => ad.platform === platform);
}

// الحصول على إعلان بواسطة المعرف
function getAdById(id) {
    return ads.find(ad => ad.id === id);
}

// إضافة إعلان جديد
function addAd(adData) {
    const newId = Math.max(...ads.map(ad => ad.id), 0) + 1;
    
    const newAd = {
        id: newId,
        ...adData,
        budgetSpent: 0,
        stats: {
            views: 0,
            clicks: 0,
            conversions: 0,
            ctr: 0,
            cpc: 0
        }
    };
    
    ads.push(newAd);
    return newAd;
}

// تحديث حالة الإعلان
function updateAdStatus(id, status) {
    const adIndex = ads.findIndex(ad => ad.id === id);
    
    if (adIndex !== -1) {
        ads[adIndex].status = status;
        return true;
    }
    
    return false;
}

// الحصول على عدد الإعلانات حسب الحالة
function getAdCountByStatus() {
    const counts = {
        active: 0,
        pending: 0,
        inactive: 0,
        rejected: 0
    };
    
    ads.forEach(ad => {
        if (counts[ad.status] !== undefined) {
            counts[ad.status]++;
        }
    });
    
    return counts;
}

// الحصول على الإعلانات الأفضل أداءً
function getTopPerformingAds(limit = 3) {
    // ترتيب الإعلانات حسب معدل النقر إلى الظهور
    return [...ads]
        .filter(ad => ad.stats.views > 0) // استبعاد الإعلانات بدون مشاهدات
        .sort((a, b) => b.stats.ctr - a.stats.ctr)
        .slice(0, limit);
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.adManager = {
    ads,
    getOverallStats,
    getAdsByPlatform,
    getAdById,
    addAd,
    updateAdStatus,
    getAdCountByStatus,
    getTopPerformingAds
};
