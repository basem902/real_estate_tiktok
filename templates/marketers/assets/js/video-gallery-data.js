/**
 * Real Estate TikTok - Marketers Dashboard
 * Video Gallery Data
 * Version: 1.0.0
 */

// بيانات الفيديوهات التجريبية
const videos = [
    {
        id: 1,
        title: "فيلا فاخرة في حي النرجس - جولة افتراضية",
        description: "جولة افتراضية شاملة داخل فيلا النرجس الفاخرة بمساحة 500م² المكونة من 5 غرف نوم وصالتين ومسبح خاص وحديقة.",
        propertyId: "PROP-001",
        propertyType: "فيلا",
        propertyName: "فيلا النرجس",
        thumbnail: "../assets/img/videos/villa_narjis_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/n8X9_MgEdCg",
        duration: "3:45",
        category: "tour",
        uploadDate: "2025-03-10",
        status: "published",
        featured: true,
        stats: {
            views: 1250,
            likes: 89,
            shares: 24,
            engagement: 6.8
        }
    },
    {
        id: 2,
        title: "شقة مميزة في حي الياسمين - عرض تسويقي",
        description: "فيديو ترويجي لشقة مميزة في حي الياسمين بتصميم عصري ومساحة 150م². تتكون من 3 غرف نوم وصالة وإطلالة رائعة.",
        propertyId: "PROP-005",
        propertyType: "شقة",
        propertyName: "شقة الياسمين",
        thumbnail: "../assets/img/videos/yasmin_apt_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/xVPV8Ppa-FE",
        duration: "2:22",
        category: "promotional",
        uploadDate: "2025-03-12",
        status: "published",
        featured: false,
        stats: {
            views: 870,
            likes: 62,
            shares: 18,
            engagement: 7.1
        }
    },
    {
        id: 3,
        title: "شهادة عميل: تجربة شراء فيلا في حي النرجس",
        description: "يشارك أحمد تجربته في شراء فيلا النرجس ويتحدث عن تجربته الممتازة مع فريق التسويق الخاص بنا.",
        propertyId: "PROP-001",
        propertyType: "فيلا",
        propertyName: "فيلا النرجس",
        thumbnail: "../assets/img/videos/testimonial_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/qJt-FtzJ5FU",
        duration: "4:15",
        category: "testimonial",
        uploadDate: "2025-03-15",
        status: "published",
        featured: true,
        stats: {
            views: 685,
            likes: 76,
            shares: 32,
            engagement: 15.8
        }
    },
    {
        id: 4,
        title: "دليل الاستثمار العقاري في المنطقة الشرقية",
        description: "فيديو تثقيفي حول أفضل المناطق للاستثمار العقاري في المنطقة الشرقية ونصائح للمستثمرين.",
        propertyId: null,
        propertyType: null,
        propertyName: null,
        thumbnail: "../assets/img/videos/investment_guide_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/LsJLLEkCvFk",
        duration: "8:32",
        category: "educational",
        uploadDate: "2025-03-05",
        status: "published",
        featured: false,
        stats: {
            views: 1520,
            likes: 132,
            shares: 87,
            engagement: 14.4
        }
    },
    {
        id: 5,
        title: "أرض تجارية - فرصة استثمارية",
        description: "عرض تفصيلي لأرض تجارية بمساحة 1000م² على طريق الملك فهد، مناسبة لإنشاء مجمع تجاري.",
        propertyId: "PROP-010",
        propertyType: "أرض تجارية",
        propertyName: "أرض طريق الملك فهد",
        thumbnail: "../assets/img/videos/commercial_land_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/n3Dru5y3ROc",
        duration: "2:58",
        category: "promotional",
        uploadDate: "2025-03-18",
        status: "published",
        featured: false,
        stats: {
            views: 630,
            likes: 41,
            shares: 15,
            engagement: 8.9
        }
    },
    {
        id: 6,
        title: "محل تجاري في مول الواحة - موقع مميز",
        description: "فيديو ترويجي لمحل تجاري بمساحة 85م² في مول الواحة، موقع مميز بالقرب من المدخل الرئيسي.",
        propertyId: "PROP-018",
        propertyType: "محل تجاري",
        propertyName: "محل مول الواحة",
        thumbnail: "../assets/img/videos/mall_shop_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/XLMDLDp68XU",
        duration: "1:45",
        category: "promotional",
        uploadDate: "2025-03-20",
        status: "processing",
        featured: false,
        stats: {
            views: 0,
            likes: 0,
            shares: 0,
            engagement: 0
        }
    },
    {
        id: 7,
        title: "5 نصائح لاختيار العقار المناسب",
        description: "نصائح مهمة لمساعدتك في اختيار العقار المناسب لاحتياجاتك وميزانيتك.",
        propertyId: null,
        propertyType: null,
        propertyName: null,
        thumbnail: "../assets/img/videos/tips_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/_Tg8fOUXqMU",
        duration: "5:12",
        category: "educational",
        uploadDate: "2025-03-08",
        status: "published",
        featured: false,
        stats: {
            views: 1850,
            likes: 156,
            shares: 92,
            engagement: 13.4
        }
    },
    {
        id: 8,
        title: "مكتب فاخر في البرج الأزرق",
        description: "جولة داخل مكتب فاخر بمساحة 120م² في البرج الأزرق، مع إطلالة بانورامية على المدينة.",
        propertyId: "PROP-015",
        propertyType: "مكتب",
        propertyName: "مكتب البرج الأزرق",
        thumbnail: "../assets/img/videos/office_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/RT8SHSIi3So",
        duration: "3:05",
        category: "tour",
        uploadDate: "2025-03-21",
        status: "draft",
        featured: false,
        stats: {
            views: 0,
            likes: 0,
            shares: 0,
            engagement: 0
        }
    },
    {
        id: 9,
        title: "المقارنة بين الشقق والفلل - أيهما أفضل؟",
        description: "مقارنة تفصيلية بين الشقق والفلل من حيث الميزات والتكلفة والصيانة لمساعدتك في اتخاذ القرار.",
        propertyId: null,
        propertyType: null,
        propertyName: null,
        thumbnail: "../assets/img/videos/comparison_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/XVWFYLZ-xRs",
        duration: "6:45",
        category: "educational",
        uploadDate: "2025-03-14",
        status: "published",
        featured: false,
        stats: {
            views: 1420,
            likes: 118,
            shares: 64,
            engagement: 12.8
        }
    },
    {
        id: 10,
        title: "فيلا في حي الملقا - عرض خاص",
        description: "فيديو ترويجي لفيلا راقية في حي الملقا، تتكون من 6 غرف نوم وصالتين وحديقة خاصة.",
        propertyId: "PROP-007",
        propertyType: "فيلا",
        propertyName: "فيلا الملقا",
        thumbnail: "../assets/img/videos/malqa_villa_thumbnail.jpg",
        videoUrl: "https://www.youtube.com/embed/5R35upF6KIs",
        duration: "2:37",
        category: "promotional",
        uploadDate: "2025-03-17",
        status: "published",
        featured: true,
        stats: {
            views: 920,
            likes: 73,
            shares: 28,
            engagement: 11.0
        }
    }
];

// الحصول على الفيديوهات حسب الفئة
function getVideosByCategory(category) {
    if (category === 'all') {
        return videos;
    }
    
    return videos.filter(video => video.category === category);
}

// الحصول على الفيديوهات حسب نوع العقار
function getVideosByPropertyType(propertyType) {
    if (propertyType === 'all') {
        return videos;
    }
    
    // تحويل أنواع العقارات إلى مسميات البحث المناسبة
    const typeMapping = {
        'villas': ['فيلا'],
        'apartments': ['شقة'],
        'lands': ['أرض تجارية', 'أرض'],
        'offices': ['مكتب'],
        'shops': ['محل تجاري']
    };
    
    // الحصول على الأنواع المطابقة
    const matchingTypes = typeMapping[propertyType] || [];
    
    return videos.filter(video => matchingTypes.includes(video.propertyType));
}

// الحصول على فيديو بواسطة المعرف
function getVideoById(id) {
    return videos.find(video => video.id === id);
}

// الحصول على الفيديوهات المميزة
function getFeaturedVideos(limit = 4) {
    return videos
        .filter(video => video.featured && video.status === 'published')
        .slice(0, limit);
}

// الحصول على أحدث الفيديوهات
function getLatestVideos(limit = 6) {
    return [...videos]
        .filter(video => video.status === 'published')
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        .slice(0, limit);
}

// إضافة فيديو جديد
function addVideo(videoData) {
    const newId = Math.max(...videos.map(video => video.id), 0) + 1;
    
    const newVideo = {
        id: newId,
        ...videoData,
        stats: {
            views: 0,
            likes: 0,
            shares: 0,
            engagement: 0
        }
    };
    
    videos.push(newVideo);
    return newVideo;
}

// تحديث حالة الفيديو
function updateVideoStatus(id, status) {
    const videoIndex = videos.findIndex(video => video.id === id);
    
    if (videoIndex !== -1) {
        videos[videoIndex].status = status;
        return true;
    }
    
    return false;
}

// الحصول على الإحصائيات العامة
function getOverallStats() {
    const publishedVideos = videos.filter(video => video.status === 'published');
    
    const totalVideos = publishedVideos.length;
    const totalViews = publishedVideos.reduce((sum, video) => sum + video.stats.views, 0);
    const totalLikes = publishedVideos.reduce((sum, video) => sum + video.stats.likes, 0);
    const totalShares = publishedVideos.reduce((sum, video) => sum + video.stats.shares, 0);
    
    // حساب متوسط نسبة المشاركة
    const avgEngagement = totalVideos > 0 
        ? publishedVideos.reduce((sum, video) => sum + video.stats.engagement, 0) / totalVideos
        : 0;
    
    return {
        totalVideos,
        totalViews,
        totalLikes,
        totalShares,
        avgEngagement: avgEngagement.toFixed(1)
    };
}

// الحصول على عدد الفيديوهات حسب الفئة
function getVideoCountByCategory() {
    const counts = {
        promotional: 0,
        tour: 0,
        testimonial: 0,
        educational: 0,
        social: 0
    };
    
    videos.forEach(video => {
        if (counts[video.category] !== undefined) {
            counts[video.category]++;
        }
    });
    
    return counts;
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.videoManager = {
    videos,
    getVideosByCategory,
    getVideosByPropertyType,
    getVideoById,
    getFeaturedVideos,
    getLatestVideos,
    addVideo,
    updateVideoStatus,
    getOverallStats,
    getVideoCountByCategory
};
