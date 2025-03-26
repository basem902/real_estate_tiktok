/**
 * Real Estate TikTok - Marketers Dashboard
 * Ad Management UI
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة صفحة إدارة الإعلانات
    initializeAdManagement();
});

// تهيئة إدارة الإعلانات
function initializeAdManagement() {
    // تحديث إحصائيات الأداء العامة
    updatePerformanceStats();
    
    // تحميل الإعلانات
    loadAds('all');
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
}

// تحديث إحصائيات الأداء
function updatePerformanceStats() {
    const stats = window.adManager.getOverallStats();
    
    // تحديث العناصر في الواجهة
    const statsElements = document.querySelectorAll('.performance-stat h2');
    
    if (statsElements.length >= 4) {
        // المشاهدات
        statsElements[0].textContent = formatNumber(stats.views);
        
        // النقرات
        statsElements[1].textContent = formatNumber(stats.clicks);
        
        // معدل التحويل
        statsElements[2].textContent = stats.conversionRate + '%';
        
        // الإنفاق
        statsElements[3].textContent = formatNumber(stats.spent) + ' ر.س';
    }
}

// تحميل الإعلانات حسب المنصة
function loadAds(platform) {
    const adsContainer = document.getElementById('ads-container');
    
    if (!adsContainer) return;
    
    // الحصول على الإعلانات المصفاة حسب المنصة
    const filteredAds = window.adManager.getAdsByPlatform(platform);
    
    // إفراغ الحاوية
    adsContainer.innerHTML = '';
    
    // التحقق من عدم وجود إعلانات
    if (filteredAds.length === 0) {
        adsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="py-5">
                    <i class="fas fa-ad mb-3" style="font-size: 3rem; color: var(--text-muted);"></i>
                    <h5>لا توجد إعلانات</h5>
                    <p class="text-muted">قم بإنشاء إعلان جديد للبدء</p>
                    <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#createAdModal">
                        <i class="fas fa-plus me-1"></i> إنشاء إعلان
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // تعبئة الإعلانات
    filteredAds.forEach(ad => {
        // إنشاء عنصر الإعلان
        const adElement = createAdElement(ad);
        adsContainer.appendChild(adElement);
    });
}

// إنشاء عنصر الإعلان في واجهة المستخدم
function createAdElement(ad) {
    // إنشاء عنصر div للعمود
    const colElement = document.createElement('div');
    colElement.className = 'col-lg-4 col-md-6 mb-4';
    colElement.dataset.adId = ad.id;
    
    // حساب النسبة المئوية للميزانية المستهلكة
    const budgetPercentage = ad.budget > 0 ? (ad.budgetSpent / ad.budget) * 100 : 0;
    
    // تحديد لون حالة الإعلان
    let statusClass = '';
    let statusText = '';
    
    switch(ad.status) {
        case 'active':
            statusClass = 'ad-status-active';
            statusText = 'نشط';
            break;
        case 'pending':
            statusClass = 'ad-status-pending';
            statusText = 'قيد المراجعة';
            break;
        case 'inactive':
            statusClass = 'ad-status-inactive';
            statusText = 'متوقف';
            break;
        case 'rejected':
            statusClass = 'ad-status-rejected';
            statusText = 'مرفوض';
            break;
    }
    
    // تحديد أيقونة المنصة ولونها
    let platformIcon = '';
    let platformColorClass = '';
    
    switch(ad.platform) {
        case 'tiktok':
            platformIcon = 'fab fa-tiktok';
            platformColorClass = 'channel-tiktok';
            break;
        case 'instagram':
            platformIcon = 'fab fa-instagram';
            platformColorClass = 'channel-instagram';
            break;
        case 'facebook':
            platformIcon = 'fab fa-facebook';
            platformColorClass = 'channel-facebook';
            break;
        case 'google':
            platformIcon = 'fab fa-google';
            platformColorClass = 'channel-google';
            break;
        case 'snapchat':
            platformIcon = 'fab fa-snapchat';
            platformColorClass = 'channel-snapchat';
            break;
    }
    
    // إنشاء HTML للبطاقة
    colElement.innerHTML = `
        <div class="card ad-card h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <i class="${platformIcon} ad-channel-icon ${platformColorClass}"></i>
                        <h5 class="mb-0">${ad.title}</h5>
                    </div>
                    <span class="badge bg-light text-dark">${ad.propertyType}</span>
                </div>
                
                <div class="mb-3">
                    <span class="text-muted">الحالة: </span>
                    <span class="${statusClass} fw-bold">${statusText}</span>
                    ${ad.daysRemaining > 0 ? `<span class="ms-2 small">(${ad.daysRemaining} أيام متبقية)</span>` : ''}
                </div>
                
                <p class="card-text mb-3">${ad.description}</p>
                
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span>الميزانية: ${formatNumber(ad.budgetSpent)} / ${formatNumber(ad.budget)} ر.س</span>
                        <span class="small">${Math.round(budgetPercentage)}%</span>
                    </div>
                    <div class="budget-indicator">
                        <div class="progress-bar ${getProgressBarColor(budgetPercentage)}" 
                             role="progressbar" 
                             style="width: ${budgetPercentage}%" 
                             aria-valuenow="${budgetPercentage}" 
                             aria-valuemin="0" 
                             aria-valuemax="100"></div>
                    </div>
                </div>
                
                <div class="row text-center mb-3">
                    <div class="col-4">
                        <div class="small text-muted">المشاهدات</div>
                        <div class="fw-bold">${formatNumber(ad.stats.views)}</div>
                    </div>
                    <div class="col-4">
                        <div class="small text-muted">النقرات</div>
                        <div class="fw-bold">${formatNumber(ad.stats.clicks)}</div>
                    </div>
                    <div class="col-4">
                        <div class="small text-muted">معدل النقر</div>
                        <div class="fw-bold">${ad.stats.ctr}%</div>
                    </div>
                </div>
                
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="viewAdDetails(${ad.id})">
                        <i class="fas fa-chart-line me-1"></i> التفاصيل
                    </button>
                    <div>
                        ${ad.status === 'active' ? `
                            <button class="btn btn-sm btn-outline-warning me-1" onclick="pauseAd(${ad.id})">
                                <i class="fas fa-pause me-1"></i> إيقاف
                            </button>
                        ` : ad.status === 'inactive' ? `
                            <button class="btn btn-sm btn-outline-success me-1" onclick="activateAd(${ad.id})">
                                <i class="fas fa-play me-1"></i> تفعيل
                            </button>
                        ` : ''}
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAd(${ad.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return colElement;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمعي أحداث زر المنصة
    const platformButtons = document.querySelectorAll('.platform-btn');
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            
            // تحديث الزر النشط
            platformButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // تحميل الإعلانات المصفاة
            loadAds(platform);
        });
    });
    
    // مستمع حدث زر حفظ الإعلان
    const saveAdButton = document.getElementById('save-ad');
    if (saveAdButton) {
        saveAdButton.addEventListener('click', saveNewAd);
    }
    
    // مستمع حدث معاينة الوسائط
    const adMediaInput = document.getElementById('ad-media');
    if (adMediaInput) {
        adMediaInput.addEventListener('change', previewMedia);
    }
    
    // مستمع حدث للقائمة الجانبية
    setupSidebarToggle();
}

// حفظ إعلان جديد
function saveNewAd() {
    // الحصول على بيانات النموذج
    const title = document.getElementById('ad-title').value;
    const platform = document.getElementById('ad-platform').value;
    const propertyId = document.getElementById('ad-property').value;
    const type = document.getElementById('ad-type').value;
    const budget = parseFloat(document.getElementById('ad-budget').value);
    const duration = parseInt(document.getElementById('ad-duration').value);
    const startDate = document.getElementById('ad-start-date').value;
    const targetAudience = document.getElementById('ad-target-audience').value;
    const description = document.getElementById('ad-description').value;
    
    // التحقق من صحة البيانات
    if (!title || !platform || !propertyId || !type || !budget || !duration || !startDate || !targetAudience || !description) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'danger');
        return;
    }
    
    // حساب تاريخ الانتهاء
    const endDateObj = new Date(startDate);
    endDateObj.setDate(endDateObj.getDate() + duration);
    const endDate = endDateObj.toISOString().split('T')[0];
    
    // الحصول على اسم المنصة
    const platformName = getPlatformName(platform);
    
    // الحصول على نوع العقار
    const propertyType = getPropertyType(propertyId);
    
    // إنشاء كائن الإعلان الجديد
    const newAd = {
        title,
        platform,
        platformName,
        propertyId,
        propertyType,
        type,
        budget,
        duration,
        daysRemaining: duration,
        startDate,
        endDate,
        targetAudience,
        description,
        status: 'pending',
        media: []
    };
    
    // إضافة الإعلان
    const addedAd = window.adManager.addAd(newAd);
    
    // تحديث الواجهة
    updatePerformanceStats();
    
    // إعادة تحميل الإعلانات
    const activePlatform = document.querySelector('.platform-btn.active').dataset.platform;
    loadAds(activePlatform);
    
    // إغلاق النافذة
    const modalElement = document.getElementById('createAdModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // مسح النموذج
    document.getElementById('ad-form').reset();
    
    // عرض إشعار نجاح
    showNotification('تم إنشاء الإعلان بنجاح وهو الآن قيد المراجعة', 'success');
}

// معاينة ملفات الوسائط
function previewMedia(event) {
    const mediaPreview = document.getElementById('media-preview');
    mediaPreview.innerHTML = '';
    
    const files = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();
        
        fileReader.onload = function(e) {
            const previewElement = document.createElement('div');
            previewElement.className = 'col-4';
            
            if (file.type.startsWith('image/')) {
                previewElement.innerHTML = `
                    <div class="card">
                        <img src="${e.target.result}" class="card-img-top" alt="معاينة">
                    </div>
                `;
            } else if (file.type.startsWith('video/')) {
                previewElement.innerHTML = `
                    <div class="card">
                        <video controls class="card-img-top">
                            <source src="${e.target.result}" type="${file.type}">
                            متصفحك لا يدعم تشغيل الفيديو.
                        </video>
                    </div>
                `;
            }
            
            mediaPreview.appendChild(previewElement);
        };
        
        fileReader.readAsDataURL(file);
    }
}

// الحصول على تفاصيل الإعلان
function viewAdDetails(adId) {
    // في الإصدار الحقيقي، سيتم تنفيذ فتح صفحة تفاصيل الإعلان
    alert(`عرض تفاصيل الإعلان رقم ${adId}`);
}

// إيقاف الإعلان
function pauseAd(adId) {
    if (window.adManager.updateAdStatus(adId, 'inactive')) {
        // إعادة تحميل الإعلانات
        const activePlatform = document.querySelector('.platform-btn.active').dataset.platform;
        loadAds(activePlatform);
        
        // عرض إشعار نجاح
        showNotification('تم إيقاف الإعلان بنجاح', 'success');
    }
}

// تفعيل الإعلان
function activateAd(adId) {
    if (window.adManager.updateAdStatus(adId, 'active')) {
        // إعادة تحميل الإعلانات
        const activePlatform = document.querySelector('.platform-btn.active').dataset.platform;
        loadAds(activePlatform);
        
        // عرض إشعار نجاح
        showNotification('تم تفعيل الإعلان بنجاح', 'success');
    }
}

// حذف الإعلان
function deleteAd(adId) {
    // في الإصدار الحقيقي، ستكون هناك نافذة تأكيد قبل الحذف
    alert(`حذف الإعلان رقم ${adId}`);
}

// إعداد مستمع حدث تبديل القائمة الجانبية
function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('main-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // إغلاق الشريط الجانبي عند النقر خارجه في الأجهزة المحمولة
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = sidebarToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }
}

// عرض إشعار للمستخدم
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `toast align-items-center text-white bg-${type} border-0`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.setAttribute('aria-atomic', 'true');
    
    notification.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
        </div>
    `;
    
    notificationContainer.appendChild(notification);
    
    const toast = new bootstrap.Toast(notification, {
        animation: true,
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // إزالة الإشعار بعد إخفائه
    notification.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// الحصول على لون شريط التقدم بناءً على النسبة المئوية
function getProgressBarColor(percentage) {
    if (percentage < 30) {
        return 'bg-success';
    } else if (percentage < 70) {
        return 'bg-info';
    } else if (percentage < 90) {
        return 'bg-warning';
    } else {
        return 'bg-danger';
    }
}

// تنسيق الأرقام الكبيرة
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// الحصول على اسم المنصة
function getPlatformName(platform) {
    const platformNames = {
        'tiktok': 'TikTok',
        'instagram': 'Instagram',
        'facebook': 'Facebook',
        'google': 'Google',
        'snapchat': 'Snapchat'
    };
    
    return platformNames[platform] || platform;
}

// الحصول على نوع العقار
function getPropertyType(propertyId) {
    // في الإصدار الحقيقي، سيتم الحصول على نوع العقار من قاعدة البيانات
    // هنا نستخدم تعيين افتراضي بسيط
    const propertyTypes = {
        'PROP-001': 'فيلا',
        'PROP-005': 'شقة',
        'PROP-007': 'فيلا',
        'PROP-010': 'أرض تجارية',
        'PROP-015': 'مكتب',
        'PROP-018': 'محل تجاري'
    };
    
    return propertyTypes[propertyId] || 'عقار';
}
