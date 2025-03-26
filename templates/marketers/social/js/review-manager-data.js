/**
 * بيانات مدير التقييمات
 * يحتوي هذا الملف على البيانات المستخدمة في صفحة إدارة التقييمات
 */

// بيانات نموذجية للتقييمات (يمكن استبدالها بطلبات API فعلية)
const reviewsData = [
    {
        id: 1,
        platform: 'google',
        platformIcon: 'fab fa-google',
        platformName: 'جوجل',
        rating: 5,
        reviewer: {
            name: 'أحمد محمود',
            avatar: '',
            initials: 'AM'
        },
        content: 'خدمة ممتازة وعقارات رائعة. استفدت كثيرًا من خبرتهم في القطاع العقاري، وسرعة استجابتهم كانت مذهلة. أنصح بالتعامل معهم وخاصة للباحثين عن عقارات استثمارية في المناطق الساحلية.',
        date: '2025-03-22T14:30:00',
        sentiment: 'positive',
        isReplied: true,
        isFlagged: false,
        reply: {
            content: 'شكراً لك أحمد على تقييمك الإيجابي! نحن سعداء بأنك استفدت من خدماتنا ونتطلع لخدمتك مرة أخرى في المستقبل.',
            date: '2025-03-22T16:45:00',
            author: 'سارة عبدالله'
        }
    },
    {
        id: 2,
        platform: 'facebook',
        platformIcon: 'fab fa-facebook',
        platformName: 'فيسبوك',
        rating: 4,
        reviewer: {
            name: 'محمد السيد',
            avatar: '',
            initials: 'مس'
        },
        content: 'تجربة جيدة في التعامل مع الشركة. الموظفين محترفين والخدمة سريعة. الأسعار معقولة مقارنة بالسوق. أتمنى لو كان هناك خيارات أكثر في المناطق الشمالية.',
        date: '2025-03-20T09:15:00',
        sentiment: 'positive',
        isReplied: true,
        isFlagged: false,
        reply: {
            content: 'شكراً لك محمد على تقييمك وملاحظاتك القيمة. سنعمل على زيادة خياراتنا في المناطق الشمالية في المستقبل القريب. نتطلع لخدمتك مرة أخرى.',
            date: '2025-03-20T11:30:00',
            author: 'خالد العامري'
        }
    },
    {
        id: 3,
        platform: 'booking',
        platformIcon: 'fas fa-building',
        platformName: 'منصة الحجز',
        rating: 2,
        reviewer: {
            name: 'ليلى أحمد',
            avatar: '',
            initials: 'لأ'
        },
        content: 'للأسف التجربة لم تكن على مستوى التوقعات. الصور المعروضة للشقة مختلفة عن الواقع، والخدمات أقل مما تم الإعلان عنه. أتمنى مراجعة هذه النقاط لتحسين الخدمة.',
        date: '2025-03-18T16:20:00',
        sentiment: 'negative',
        isReplied: false,
        isFlagged: true,
        reply: null
    },
    {
        id: 4,
        platform: 'google',
        platformIcon: 'fab fa-google',
        platformName: 'جوجل',
        rating: 5,
        reviewer: {
            name: 'سمير علي',
            avatar: '',
            initials: 'سع'
        },
        content: 'فريق احترافي ومتميز. قدموا لي استشارات قيمة ساعدتني في اختيار العقار المناسب لاستثماراتي. أشكرهم على الاهتمام والمتابعة المستمرة حتى بعد إتمام الصفقة.',
        date: '2025-03-15T11:45:00',
        sentiment: 'positive',
        isReplied: true,
        isFlagged: false,
        reply: {
            content: 'شكراً جزيلاً لك سمير على ثقتك وتقييمك الإيجابي. سعداء دائماً بخدمتك وتقديم الاستشارات المناسبة لك.',
            date: '2025-03-15T13:10:00',
            author: 'أحمد محمد'
        }
    },
    {
        id: 5,
        platform: 'other',
        platformIcon: 'fas fa-globe',
        platformName: 'موقع الويب',
        rating: 3,
        reviewer: {
            name: 'نورا محمد',
            avatar: '',
            initials: 'نم'
        },
        content: 'خدمة متوسطة. الموظفين لطيفين لكن بعض الإجراءات تستغرق وقتاً طويلاً. أتمنى تسريع عملية التوثيق والعقود.',
        date: '2025-03-10T14:00:00',
        sentiment: 'neutral',
        isReplied: true,
        isFlagged: false,
        reply: {
            content: 'شكراً لك نورا على ملاحظاتك القيمة. نحن نعمل حالياً على تحسين إجراءاتنا وتسريع عملية التوثيق. نقدر تفهمك ونعدك بتجربة أفضل في المستقبل.',
            date: '2025-03-10T16:30:00',
            author: 'سارة عبدالله'
        }
    }
];

// إحصائيات التقييمات
const reviewStats = {
    platforms: {
        google: 65,
        facebook: 42,
        booking: 23,
        other: 12
    },
    ratings: {
        5: 78,
        4: 35,
        3: 15,
        2: 8,
        1: 6
    },
    sentiment: {
        positive: 103,
        neutral: 25,
        negative: 14
    },
    trends: {
        daily: [4, 6, 5, 8, 7, 9, 10],
        weekly: [32, 28, 35, 37, 42],
        monthly: [85, 112, 142, 135, 156, 142]
    }
};

// قوالب الردود
const responseTemplates = [
    {
        id: 1,
        name: 'رد إيجابي',
        icon: 'fas fa-thumbs-up',
        iconColor: 'text-success',
        content: 'شكراً لك على تقييمك الإيجابي! نحن سعداء بأنك استفدت من خدماتنا ونتطلع لخدمتك مرة أخرى في المستقبل.'
    },
    {
        id: 2,
        name: 'رد على تقييم سلبي',
        icon: 'fas fa-thumbs-down',
        iconColor: 'text-danger',
        content: 'شكراً على ملاحظاتك. نأسف لتجربتك غير المرضية ونود التواصل معك لمعالجة الأمر. يرجى الاتصال بنا على الرقم 123456789.'
    },
    {
        id: 3,
        name: 'رد على تقييم متوسط',
        icon: 'fas fa-star-half-alt',
        iconColor: 'text-warning',
        content: 'نشكرك على تقييمك ونقدر ملاحظاتك. سنأخذ اقتراحاتك بعين الاعتبار لتحسين خدماتنا.'
    },
    {
        id: 4,
        name: 'شكر على التفاصيل',
        icon: 'fas fa-info-circle',
        iconColor: 'text-info',
        content: 'نشكرك على الوقت الذي استغرقته لتقديم هذه التفاصيل المفيدة. ملاحظاتك قيمة جداً لنا وستساعدنا في تحسين خدماتنا.'
    }
];

// إعدادات النظام
const reviewsSettings = {
    autoReply: {
        enabled: true,
        minRating: 4,
        templates: {
            5: 1, // معرف قالب الرد للتقييمات ذات النجوم الخمس
            4: 1  // معرف قالب الرد للتقييمات ذات النجوم الأربعة
        }
    },
    notifications: {
        newReview: true,
        negativeReview: true,
        unrepliedReview: true,
        reminderHours: 24
    },
    display: {
        defaultSort: 'date',
        defaultFilter: 'all',
        reviewsPerPage: 10
    }
};

// دوال مساعدة
/**
 * الحصول على مكون نجوم HTML
 */
function getStarsHTML(rating, size = 'medium') {
    const filledStar = '<i class="fas fa-star filled"></i>';
    const emptyStar = '<i class="fas fa-star"></i>';
    
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= rating ? filledStar : emptyStar;
    }
    
    return `<div class="stars-display ${size}">${starsHTML}</div>`;
}

/**
 * الحصول على مؤشر المشاعر
 */
function getSentimentBadge(sentiment) {
    switch (sentiment) {
        case 'positive':
            return '<span class="badge bg-success">إيجابي</span>';
        case 'neutral':
            return '<span class="badge bg-secondary">محايد</span>';
        case 'negative':
            return '<span class="badge bg-danger">سلبي</span>';
        default:
            return '<span class="badge bg-light text-dark">غير محدد</span>';
    }
}

/**
 * الحصول على مؤشر حالة الرد
 */
function getReplyStatusBadge(isReplied, isFlagged) {
    if (isFlagged) {
        return '<span class="badge review-status flagged">تم تمييزه</span>';
    }
    
    return isReplied 
        ? '<span class="badge review-status replied">تم الرد</span>'
        : '<span class="badge review-status unreplied">بدون رد</span>';
}

/**
 * تنسيق التاريخ للعرض
 */
function formatDate(dateStr, format = 'full') {
    const date = new Date(dateStr);
    
    if (format === 'full') {
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } else if (format === 'date') {
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else if (format === 'time') {
        return date.toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit'
        });
    } else if (format === 'relative') {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
        if (diffDays > 0) {
            return `منذ ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
        } else if (diffHours > 0) {
            return `منذ ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
        } else {
            return `منذ ${diffMinutes} ${diffMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
        }
    }
    
    return dateStr;
}
