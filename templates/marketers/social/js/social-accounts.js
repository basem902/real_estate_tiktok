/**
 * إدارة حسابات وسائل التواصل الاجتماعي
 * يتعامل هذا الملف مع ربط وإدارة حسابات وسائل التواصل الاجتماعي
 */

// بيانات نموذجية للحسابات المرتبطة (يمكن استبدالها بطلبات API فعلية)
const socialAccountsData = [
    {
        id: 1,
        platform: 'facebook',
        username: 'RealEstateAgency',
        displayName: 'وكالة العقارات الذكية',
        followers: 3240,
        posts: 145,
        engagement: '4.8%',
        status: 'connected',
        lastSync: '2025-03-22T14:30:00'
    }
];

// الحسابات المتاحة للربط
const availablePlatforms = {
    facebook: {
        name: 'فيسبوك',
        icon: 'fab fa-facebook',
        color: '#1877f2',
        instructions: `
            <ol class="text-start">
                <li>انقر على "متابعة إلى فيسبوك"</li>
                <li>قم بتسجيل الدخول إلى حساب فيسبوك الخاص بك</li>
                <li>امنح الأذونات المطلوبة للتطبيق</li>
                <li>سيتم توجيهك مرة أخرى إلى لوحة التحكم</li>
            </ol>
            <div class="d-grid">
                <button class="btn btn-facebook mt-3" id="facebookAuthBtn">
                    <i class="fab fa-facebook me-2"></i>متابعة إلى فيسبوك
                </button>
            </div>
        `
    },
    instagram: {
        name: 'انستجرام',
        icon: 'fab fa-instagram',
        color: '#e1306c',
        instructions: `
            <ol class="text-start">
                <li>انقر على "متابعة إلى انستجرام"</li>
                <li>قم بتسجيل الدخول إلى حساب انستجرام الخاص بك</li>
                <li>امنح الأذونات المطلوبة للتطبيق</li>
                <li>سيتم توجيهك مرة أخرى إلى لوحة التحكم</li>
            </ol>
            <div class="d-grid">
                <button class="btn btn-instagram mt-3" id="instagramAuthBtn">
                    <i class="fab fa-instagram me-2"></i>متابعة إلى انستجرام
                </button>
            </div>
        `
    },
    twitter: {
        name: 'تويتر',
        icon: 'fab fa-twitter',
        color: '#1da1f2',
        instructions: `
            <ol class="text-start">
                <li>انقر على "متابعة إلى تويتر"</li>
                <li>قم بتسجيل الدخول إلى حساب تويتر الخاص بك</li>
                <li>امنح الأذونات المطلوبة للتطبيق</li>
                <li>سيتم توجيهك مرة أخرى إلى لوحة التحكم</li>
            </ol>
            <div class="d-grid">
                <button class="btn btn-twitter mt-3" id="twitterAuthBtn">
                    <i class="fab fa-twitter me-2"></i>متابعة إلى تويتر
                </button>
            </div>
        `
    },
    tiktok: {
        name: 'تيك توك',
        icon: 'fab fa-tiktok',
        color: '#000000',
        instructions: `
            <ol class="text-start">
                <li>انقر على "متابعة إلى تيك توك"</li>
                <li>قم بتسجيل الدخول إلى حساب تيك توك الخاص بك</li>
                <li>امنح الأذونات المطلوبة للتطبيق</li>
                <li>سيتم توجيهك مرة أخرى إلى لوحة التحكم</li>
            </ol>
            <div class="d-grid">
                <button class="btn btn-dark mt-3" id="tiktokAuthBtn">
                    <i class="fab fa-tiktok me-2"></i>متابعة إلى تيك توك
                </button>
            </div>
        `
    }
};

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث عداد الإحصائيات
    updateStatisticsCounters();
    
    // تحميل جدول الحسابات المرتبطة
    loadSocialAccountsTable();
    
    // إعداد مستمعات الأحداث
    setupEventListeners();
});

/**
 * تحديث عدادات الإحصائيات في اللوحة الرئيسية
 */
function updateStatisticsCounters() {
    // حساب إجمالي المتابعين
    const totalFollowers = socialAccountsData.reduce((total, account) => total + account.followers, 0);
    document.getElementById('totalFollowers').textContent = formatNumber(totalFollowers);
    
    // في الواقع، هذه البيانات ستأتي من API
    document.getElementById('totalEngagements').textContent = formatNumber(156);
    document.getElementById('growthRate').textContent = '5.2%';
    document.getElementById('scheduledPosts').textContent = formatNumber(3);
}

/**
 * تحميل جدول الحسابات المرتبطة
 */
function loadSocialAccountsTable() {
    const tbody = document.querySelector('#socialAccountsTable tbody');
    tbody.innerHTML = ''; // مسح المحتوى الحالي
    
    if (socialAccountsData.length === 0) {
        // عرض صف فارغ إذا لم تكن هناك حسابات
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="7" class="text-center py-5">
                <i class="fas fa-share-alt fa-2x text-muted mb-3"></i>
                <p class="mb-0">لم يتم ربط أي حسابات حتى الآن</p>
                <button class="btn btn-sm btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addAccountModal">
                    <i class="fas fa-plus-circle me-1"></i>ربط حساب جديد
                </button>
            </td>
        `;
        tbody.appendChild(emptyRow);
        return;
    }
    
    // إضافة صف لكل حساب
    socialAccountsData.forEach(account => {
        const tr = document.createElement('tr');
        
        // تحديد أيقونة ولون المنصة
        const platformIcon = getPlatformIcon(account.platform);
        const statusBadge = getStatusBadge(account.status);
        
        tr.innerHTML = `
            <td>
                <i class="${platformIcon.icon}" style="color: ${platformIcon.color}"></i>
                ${platformIcon.name}
            </td>
            <td>${account.displayName}</td>
            <td>${formatNumber(account.followers)}</td>
            <td>${account.posts}</td>
            <td>${account.engagement}</td>
            <td>${statusBadge}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        خيارات
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" data-action="view" data-id="${account.id}">
                            <i class="fas fa-eye me-2 text-info"></i>عرض التفاصيل
                        </a></li>
                        <li><a class="dropdown-item" href="#" data-action="sync" data-id="${account.id}">
                            <i class="fas fa-sync me-2 text-success"></i>مزامنة الحساب
                        </a></li>
                        <li><a class="dropdown-item" href="#" data-action="disconnect" data-id="${account.id}">
                            <i class="fas fa-unlink me-2 text-danger"></i>فصل الحساب
                        </a></li>
                    </ul>
                </div>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

/**
 * الحصول على أيقونة المنصة
 */
function getPlatformIcon(platform) {
    switch (platform) {
        case 'facebook':
            return { icon: 'fab fa-facebook', color: '#1877f2', name: 'فيسبوك' };
        case 'instagram':
            return { icon: 'fab fa-instagram', color: '#e1306c', name: 'انستجرام' };
        case 'twitter':
            return { icon: 'fab fa-twitter', color: '#1da1f2', name: 'تويتر' };
        case 'tiktok':
            return { icon: 'fab fa-tiktok', color: '#000000', name: 'تيك توك' };
        default:
            return { icon: 'fas fa-share-alt', color: '#6c757d', name: 'غير معروف' };
    }
}

/**
 * الحصول على شارة حالة الحساب
 */
function getStatusBadge(status) {
    switch (status) {
        case 'connected':
            return '<span class="badge bg-success">متصل</span>';
        case 'pending':
            return '<span class="badge bg-warning text-dark">قيد الانتظار</span>';
        case 'expired':
            return '<span class="badge bg-danger">منتهي</span>';
        default:
            return '<span class="badge bg-secondary">غير متصل</span>';
    }
}

/**
 * إعداد مستمعات الأحداث
 */
function setupEventListeners() {
    // مستمع أحداث للنافذة المنبثقة لإضافة حساب
    setupAddAccountModal();
    
    // مستمع أحداث لأزرار الإجراءات في الجدول
    setupTableActionButtons();
}

/**
 * إعداد النافذة المنبثقة لإضافة حساب
 */
function setupAddAccountModal() {
    const modal = document.getElementById('addAccountModal');
    const platformBtns = modal.querySelectorAll('.platform-btn');
    const connectBtn = document.getElementById('connectAccountBtn');
    const instructionsContainer = document.getElementById('connectionInstructions');
    
    let selectedPlatform = null;
    
    // مستمع أحداث لأزرار المنصات
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            
            // إزالة الفئة المحددة من جميع الأزرار
            platformBtns.forEach(b => b.classList.remove('selected'));
            
            // إضافة الفئة المحددة للزر المحدد
            this.classList.add('selected');
            
            // تحديث المنصة المحددة وتمكين زر الاتصال
            selectedPlatform = platform;
            connectBtn.disabled = false;
            
            // عرض تعليمات الاتصال
            instructionsContainer.innerHTML = availablePlatforms[platform].instructions;
            
            // إعداد مستمعات الأحداث لأزرار المصادقة
            setupAuthButtons(platform);
        });
    });
    
    // إعادة تعيين النافذة المنبثقة عند إغلاقها
    modal.addEventListener('hidden.bs.modal', function() {
        platformBtns.forEach(b => b.classList.remove('selected'));
        instructionsContainer.innerHTML = '<p class="text-center text-muted my-4">اختر منصة للحصول على تعليمات الربط</p>';
        connectBtn.disabled = true;
        selectedPlatform = null;
    });
}

/**
 * إعداد أزرار المصادقة داخل تعليمات الاتصال
 */
function setupAuthButtons(platform) {
    const btnId = `${platform}AuthBtn`;
    const authBtn = document.getElementById(btnId);
    
    if (authBtn) {
        authBtn.addEventListener('click', function() {
            // في التطبيق الحقيقي، سيؤدي هذا إلى فتح نافذة مصادقة OAuth
            // هنا، سنقوم بمحاكاة عملية الاتصال
            simulateOAuthFlow(platform);
        });
    }
}

/**
 * محاكاة تدفق مصادقة OAuth
 */
function simulateOAuthFlow(platform) {
    // إظهار إشعار بأن العملية قيد التقدم
    showNotification('جاري الاتصال بحساب ' + availablePlatforms[platform].name, 'info');
    
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى صفحة المصادقة الخاصة بالمنصة
    // هنا، سنقوم بمحاكاة نجاح عملية الاتصال بعد فترة قصيرة
    setTimeout(() => {
        // إضافة حساب وهمي جديد
        const newAccount = {
            id: socialAccountsData.length + 1,
            platform: platform,
            username: `user_${platform}`,
            displayName: `حساب ${availablePlatforms[platform].name} الجديد`,
            followers: Math.floor(Math.random() * 2000) + 500,
            posts: Math.floor(Math.random() * 100) + 10,
            engagement: (Math.random() * 5 + 1).toFixed(1) + '%',
            status: 'connected',
            lastSync: new Date().toISOString()
        };
        
        // إضافة الحساب الجديد إلى البيانات
        socialAccountsData.push(newAccount);
        
        // تحديث الجدول والإحصائيات
        loadSocialAccountsTable();
        updateStatisticsCounters();
        
        // إغلاق النافذة المنبثقة
        const modal = bootstrap.Modal.getInstance(document.getElementById('addAccountModal'));
        modal.hide();
        
        // إظهار إشعار بنجاح العملية
        showNotification(`تم ربط حساب ${availablePlatforms[platform].name} بنجاح!`, 'success');
        
        // إرسال إشعار باستخدام نظام الإشعارات
        if (typeof NotificationsManager !== 'undefined') {
            NotificationsManager.addNotification({
                title: 'تم ربط حساب جديد',
                content: `تم ربط حساب ${availablePlatforms[platform].name} بنجاح. يمكنك الآن جدولة المنشورات وعرض التحليلات.`,
                type: 'social_account',
                priority: 'normal',
                timestamp: new Date().toISOString(),
                isRead: false,
                actions: [
                    {
                        label: 'عرض الحساب',
                        action: 'viewAccount',
                        data: { accountId: newAccount.id }
                    }
                ]
            });
        }
    }, 2000);
}

/**
 * إعداد أزرار الإجراءات في الجدول
 */
function setupTableActionButtons() {
    const table = document.getElementById('socialAccountsTable');
    
    table.addEventListener('click', function(e) {
        // التحقق مما إذا كان العنصر المنقور عليه هو زر إجراء
        const actionLink = e.target.closest('[data-action]');
        if (!actionLink) return;
        
        e.preventDefault();
        
        const action = actionLink.dataset.action;
        const accountId = parseInt(actionLink.dataset.id);
        
        // العثور على الحساب بواسطة المعرف
        const account = socialAccountsData.find(acc => acc.id === accountId);
        if (!account) return;
        
        // تنفيذ الإجراء المطلوب
        switch (action) {
            case 'view':
                viewAccountDetails(account);
                break;
            case 'sync':
                syncAccount(account);
                break;
            case 'disconnect':
                disconnectAccount(account);
                break;
        }
    });
}

/**
 * عرض تفاصيل الحساب
 */
function viewAccountDetails(account) {
    // في التطبيق الحقيقي، قد يتم فتح صفحة تفاصيل أو نافذة منبثقة
    console.log('عرض تفاصيل الحساب:', account);
    showNotification(`عرض تفاصيل حساب ${account.displayName}`, 'info');
}

/**
 * مزامنة الحساب
 */
function syncAccount(account) {
    showNotification(`جاري مزامنة حساب ${account.displayName}...`, 'info');
    
    // محاكاة عملية المزامنة
    setTimeout(() => {
        // تحديث بيانات الحساب
        account.followers += Math.floor(Math.random() * 50);
        account.posts += Math.floor(Math.random() * 3);
        account.engagement = (parseFloat(account.engagement) + (Math.random() * 0.5 - 0.25)).toFixed(1) + '%';
        account.lastSync = new Date().toISOString();
        
        // تحديث الجدول والإحصائيات
        loadSocialAccountsTable();
        updateStatisticsCounters();
        
        showNotification(`تمت مزامنة حساب ${account.displayName} بنجاح!`, 'success');
    }, 1500);
}

/**
 * فصل الحساب
 */
function disconnectAccount(account) {
    if (confirm(`هل أنت متأكد من رغبتك في فصل حساب ${account.displayName}؟`)) {
        showNotification(`جاري فصل حساب ${account.displayName}...`, 'info');
        
        // محاكاة عملية الفصل
        setTimeout(() => {
            // إزالة الحساب من البيانات
            const index = socialAccountsData.findIndex(acc => acc.id === account.id);
            if (index !== -1) {
                socialAccountsData.splice(index, 1);
            }
            
            // تحديث الجدول والإحصائيات
            loadSocialAccountsTable();
            updateStatisticsCounters();
            
            showNotification(`تم فصل حساب ${account.displayName} بنجاح!`, 'success');
        }, 1000);
    }
}

/**
 * إظهار إشعار للمستخدم
 */
function showNotification(message, type = 'info') {
    // التحقق مما إذا كان هناك نظام إشعارات مخصص
    if (typeof toast === 'function') {
        toast(message, type);
        return;
    }
    
    // إنشاء إشعار بسيط إذا لم يكن هناك نظام إشعارات
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
        </div>
    `;
    
    // إضافة الإشعار إلى المستند
    const toastContainer = document.querySelector('.toast-container');
    if (toastContainer) {
        toastContainer.appendChild(toast);
    } else {
        // إنشاء حاوية إشعارات جديدة إذا لم تكن موجودة
        const newContainer = document.createElement('div');
        newContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        newContainer.appendChild(toast);
        document.body.appendChild(newContainer);
    }
    
    // إظهار الإشعار
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

/**
 * تنسيق الأرقام بإضافة فواصل للآلاف
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
