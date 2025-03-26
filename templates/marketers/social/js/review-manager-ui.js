/**
 * واجهة مستخدم مدير التقييمات
 * يتعامل هذا الملف مع عناصر واجهة المستخدم والتفاعلات في صفحة إدارة التقييمات
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الرسوم البيانية
    initializeCharts();
    
    // تحميل قائمة التقييمات
    loadReviewsTable();
    
    // تحميل أفضل التقييمات
    loadTopReviews();
    
    // إعداد مستمعات الأحداث
    setupEventListeners();
});

/**
 * تهيئة الرسوم البيانية
 */
function initializeCharts() {
    // رسم بياني لتوزيع النجوم
    const starsCtx = document.getElementById('starsDistributionChart');
    if (starsCtx) {
        const starsData = Object.values(reviewStats.ratings);
        const starsLabels = Object.keys(reviewStats.ratings).map(star => `${star} نجوم`);
        
        new Chart(starsCtx, {
            type: 'bar',
            data: {
                labels: starsLabels,
                datasets: [{
                    label: 'عدد التقييمات',
                    data: starsData,
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.7)',    // 5 نجوم
                        'rgba(92, 184, 92, 0.7)',    // 4 نجوم
                        'rgba(255, 193, 7, 0.7)',    // 3 نجوم
                        'rgba(253, 126, 20, 0.7)',   // 2 نجوم
                        'rgba(220, 53, 69, 0.7)'     // 1 نجمة
                    ],
                    borderColor: [
                        'rgba(40, 167, 69, 1)',
                        'rgba(92, 184, 92, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(253, 126, 20, 1)',
                        'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            font: {
                                family: 'Cairo, sans-serif'
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'Cairo, sans-serif'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `عدد التقييمات: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // رسم بياني للتقييمات حسب المنصة
    const platformsCtx = document.getElementById('platformsChart');
    if (platformsCtx) {
        const platformsData = Object.values(reviewStats.platforms);
        const platformsLabels = [
            'جوجل',
            'فيسبوك',
            'منصات الحجز',
            'أخرى'
        ];
        
        new Chart(platformsCtx, {
            type: 'doughnut',
            data: {
                labels: platformsLabels,
                datasets: [{
                    data: platformsData,
                    backgroundColor: [
                        'rgba(66, 133, 244, 0.7)',   // جوجل
                        'rgba(59, 89, 152, 0.7)',    // فيسبوك
                        'rgba(0, 113, 187, 0.7)',    // منصات الحجز
                        'rgba(108, 117, 125, 0.7)'   // أخرى
                    ],
                    borderColor: [
                        'rgba(66, 133, 244, 1)',
                        'rgba(59, 89, 152, 1)',
                        'rgba(0, 113, 187, 1)',
                        'rgba(108, 117, 125, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Cairo, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${context.label}: ${context.raw} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * تحميل قائمة التقييمات
 */
function loadReviewsTable(filter = {}) {
    const tbody = document.querySelector('#reviewsTable tbody');
    if (!tbody) return;
    
    // تصفية التقييمات
    let filteredReviews = reviewsData;
    
    // تطبيق المرشحات إذا كانت موجودة
    if (filter) {
        if (filter.platform && filter.platform !== 'all') {
            filteredReviews = filteredReviews.filter(review => review.platform === filter.platform);
        }
        
        if (filter.status) {
            if (filter.status === 'replied') {
                filteredReviews = filteredReviews.filter(review => review.isReplied);
            } else if (filter.status === 'unreplied') {
                filteredReviews = filteredReviews.filter(review => !review.isReplied);
            } else if (filter.status === 'flagged') {
                filteredReviews = filteredReviews.filter(review => review.isFlagged);
            }
        }
        
        if (filter.stars && filter.stars.length > 0) {
            filteredReviews = filteredReviews.filter(review => filter.stars.includes(review.rating.toString()));
        }
        
        if (filter.search && filter.search.trim() !== '') {
            const searchTerm = filter.search.trim().toLowerCase();
            filteredReviews = filteredReviews.filter(review => 
                review.content.toLowerCase().includes(searchTerm) || 
                review.reviewer.name.toLowerCase().includes(searchTerm)
            );
        }
    }
    
    // فرز التقييمات حسب التاريخ (الأحدث أولاً)
    filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // إنشاء صفوف الجدول
    tbody.innerHTML = '';
    
    if (filteredReviews.length === 0) {
        // إظهار رسالة إذا لم تكن هناك تقييمات
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="7" class="text-center py-5">
                <i class="fas fa-search fa-2x text-muted mb-3"></i>
                <p class="mb-0">لا توجد تقييمات مطابقة لمعايير البحث</p>
            </td>
        `;
        tbody.appendChild(emptyRow);
        return;
    }
    
    // إضافة كل تقييم إلى الجدول
    filteredReviews.forEach(review => {
        const tr = document.createElement('tr');
        
        // إنشاء محتوى الصف
        tr.innerHTML = `
            <td>
                ${getStarsHTML(review.rating, 'small')}
            </td>
            <td>
                <span class="badge bg-light text-dark">
                    <i class="${review.platformIcon}"></i> ${review.platformName}
                </span>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="avatar-placeholder bg-primary text-white">
                            <span>${review.reviewer.initials}</span>
                        </div>
                    </div>
                    <div class="ms-2">
                        ${review.reviewer.name}
                    </div>
                </div>
            </td>
            <td>
                <div class="review-content-short">${review.content}</div>
            </td>
            <td>
                ${formatDate(review.date, 'relative')}
            </td>
            <td>
                ${getReplyStatusBadge(review.isReplied, review.isFlagged)}
            </td>
            <td>
                <div class="d-flex">
                    <button class="btn btn-sm btn-primary me-1" onclick="showReviewDetails(${review.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="#" onclick="showReviewDetails(${review.id})">
                                    <i class="fas fa-eye me-2 text-primary"></i>عرض التفاصيل
                                </a>
                            </li>
                            ${!review.isReplied ? `
                            <li>
                                <a class="dropdown-item" href="#" onclick="showReplyForm(${review.id})">
                                    <i class="fas fa-reply me-2 text-success"></i>الرد
                                </a>
                            </li>` : ''}
                            ${!review.isFlagged ? `
                            <li>
                                <a class="dropdown-item" href="#" onclick="flagReview(${review.id})">
                                    <i class="fas fa-flag me-2 text-warning"></i>تمييز
                                </a>
                            </li>` : `
                            <li>
                                <a class="dropdown-item" href="#" onclick="unflagReview(${review.id})">
                                    <i class="fas fa-flag me-2 text-secondary"></i>إلغاء التمييز
                                </a>
                            </li>`}
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item" href="#" onclick="exportReview(${review.id})">
                                    <i class="fas fa-download me-2 text-info"></i>تصدير
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

/**
 * تحميل أفضل التقييمات
 */
function loadTopReviews() {
    const container = document.getElementById('topReviewsContainer');
    if (!container) return;
    
    // الحصول على التقييمات ذات النجوم الخمس
    const topReviews = reviewsData
        .filter(review => review.rating === 5)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    
    // إذا لم تكن هناك تقييمات
    if (topReviews.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-4">
                <i class="fas fa-star fa-2x text-muted mb-3"></i>
                <p class="mb-0">لا توجد تقييمات متميزة بعد</p>
            </div>
        `;
        return;
    }
    
    // إنشاء بطاقات للتقييمات المتميزة
    let html = '';
    topReviews.forEach(review => {
        html += `
            <div class="col-md-4 mb-3">
                <div class="card review-card h-100">
                    <div class="card-body">
                        <div class="review-platform">
                            <span class="badge bg-light text-dark">
                                <i class="${review.platformIcon}"></i> ${review.platformName}
                            </span>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <div class="flex-shrink-0">
                                <div class="avatar-placeholder bg-primary text-white">
                                    <span>${review.reviewer.initials}</span>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-2">
                                <h6 class="mb-0">${review.reviewer.name}</h6>
                                <div>
                                    ${getStarsHTML(review.rating, 'small')}
                                </div>
                            </div>
                        </div>
                        <div class="review-content mb-3">${review.content}</div>
                        <small class="text-muted">${formatDate(review.date, 'date')}</small>
                    </div>
                    <div class="card-footer review-footer py-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <small>${review.isReplied ? 'تم الرد' : 'بدون رد'}</small>
                            <button class="btn btn-sm btn-link p-0" onclick="showReviewDetails(${review.id})">
                                عرض التفاصيل <i class="fas fa-angle-left ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * إعداد مستمعات الأحداث
 */
function setupEventListeners() {
    // مستمع لفلترة التقييمات
    const applyFilterBtn = document.getElementById('applyFilter');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            // جمع قيم المرشحات
            const stars = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
            const platform = document.getElementById('platformFilter').value;
            const status = document.getElementById('statusFilter').value;
            const search = document.getElementById('searchReviews').value;
            
            // تطبيق المرشحات
            loadReviewsTable({ stars, platform, status, search });
        });
    }
    
    // مستمع للبحث
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchReviews');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            loadReviewsTable({ search: searchInput.value });
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                loadReviewsTable({ search: this.value });
            }
        });
    }
    
    // مستمع لتغيير النطاق الزمني للرسوم البيانية
    const dateRangeLinks = document.querySelectorAll('[data-range]');
    dateRangeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة الفئة النشطة من جميع الروابط
            dateRangeLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة الفئة النشطة للرابط المحدد
            this.classList.add('active');
            
            // تحديث النص في زر القائمة المنسدلة
            const range = this.dataset.range;
            const dropdownBtn = this.closest('.dropdown').querySelector('.dropdown-toggle');
            
            switch (range) {
                case '7':
                    dropdownBtn.textContent = 'آخر 7 أيام';
                    break;
                case '30':
                    dropdownBtn.textContent = 'آخر 30 يوم';
                    break;
                case '90':
                    dropdownBtn.textContent = 'آخر 3 أشهر';
                    break;
                case '365':
                    dropdownBtn.textContent = 'آخر سنة';
                    break;
            }
            
            // تحديث الرسوم البيانية (في تطبيق حقيقي)
            console.log(`تحديث الرسوم البيانية للنطاق: ${range} يوم`);
        });
    });
    
    // مستمع لنافذة طلب التقييمات
    const requestReviewForm = document.getElementById('requestReviewForm');
    if (requestReviewForm) {
        requestReviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // اكمل معالجة النموذج (في تطبيق حقيقي)
            console.log('إرسال طلب تقييمات...');
            
            // إغلاق النافذة المنبثقة
            const modal = bootstrap.Modal.getInstance(document.getElementById('requestReviewsModal'));
            modal.hide();
            
            // عرض إشعار
            showNotification('تم إرسال طلبات التقييم بنجاح!', 'success');
        });
    }
}

/**
 * عرض تفاصيل التقييم
 */
function showReviewDetails(reviewId) {
    // البحث عن التقييم
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    // تعبئة بيانات النافذة المنبثقة
    document.getElementById('reviewerName').textContent = review.reviewer.name;
    document.getElementById('reviewDate').textContent = formatDate(review.date, 'date');
    document.getElementById('reviewContent').textContent = review.content;
    
    // تحديث تصنيف النجوم
    document.getElementById('reviewRating').innerHTML = getStarsHTML(review.rating, 'medium');
    
    // تحديث المنصة
    document.getElementById('reviewPlatform').innerHTML = `
        <i class="${review.platformIcon} me-1"></i> ${review.platformName}
    `;
    
    // تحديث حاوية الرد
    const responseContainer = document.getElementById('responseContainer');
    const replyForm = document.getElementById('replyForm');
    
    if (review.isReplied && review.reply) {
        // إظهار الرد الحالي
        responseContainer.style.display = 'block';
        document.getElementById('responseDate').textContent = formatDate(review.reply.date, 'date');
        document.getElementById('responseContent').textContent = review.reply.content;
        
        // إخفاء نموذج الرد
        replyForm.style.display = 'none';
    } else {
        // إخفاء حاوية الرد
        responseContainer.style.display = 'none';
        
        // إظهار نموذج الرد
        replyForm.style.display = 'block';
        document.getElementById('responseText').value = '';
    }
    
    // تحديث حالة زر التمييز
    const flagBtn = document.getElementById('flagReviewBtn');
    if (review.isFlagged) {
        flagBtn.innerHTML = '<i class="fas fa-flag me-1"></i> إلغاء تمييز التقييم';
        flagBtn.classList.replace('btn-outline-danger', 'btn-outline-secondary');
        flagBtn.onclick = function() { unflagReview(reviewId); };
    } else {
        flagBtn.innerHTML = '<i class="fas fa-flag me-1"></i> تمييز التقييم';
        flagBtn.classList.replace('btn-outline-secondary', 'btn-outline-danger');
        flagBtn.onclick = function() { flagReview(reviewId); };
    }
    
    // تحديد معرف التقييم الحالي لاستخدامه في الإرسال
    document.getElementById('submitResponse').dataset.reviewId = reviewId;
    
    // فتح النافذة المنبثقة
    const modal = new bootstrap.Modal(document.getElementById('reviewDetailModal'));
    modal.show();
}

/**
 * عرض نموذج الرد على التقييم
 */
function showReplyForm(reviewId) {
    showReviewDetails(reviewId);
    
    // التركيز على حقل النص
    setTimeout(() => {
        document.getElementById('responseText').focus();
    }, 500);
}

/**
 * تمييز التقييم
 */
function flagReview(reviewId) {
    // البحث عن التقييم
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    // تحديث حالة التمييز
    review.isFlagged = true;
    
    // تحديث الجدول
    loadReviewsTable();
    
    // إغلاق النافذة المنبثقة إذا كانت مفتوحة
    const modal = bootstrap.Modal.getInstance(document.getElementById('reviewDetailModal'));
    if (modal) modal.hide();
    
    // عرض إشعار
    showNotification('تم تمييز التقييم بنجاح!', 'success');
    
    // إرسال إشعار باستخدام نظام الإشعارات
    if (typeof NotificationsManager !== 'undefined') {
        NotificationsManager.addNotification({
            title: 'تم تمييز تقييم',
            content: `تم تمييز تقييم من ${review.reviewer.name} للمراجعة والمتابعة.`,
            type: 'review_flagged',
            priority: 'high',
            timestamp: new Date().toISOString(),
            isRead: false,
            actions: [
                {
                    label: 'عرض التقييم',
                    action: 'viewReview',
                    data: { reviewId: review.id }
                }
            ]
        });
    }
}

/**
 * إلغاء تمييز التقييم
 */
function unflagReview(reviewId) {
    // البحث عن التقييم
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    // تحديث حالة التمييز
    review.isFlagged = false;
    
    // تحديث الجدول
    loadReviewsTable();
    
    // تحديث النافذة المنبثقة إذا كانت مفتوحة
    const flagBtn = document.getElementById('flagReviewBtn');
    if (flagBtn) {
        flagBtn.innerHTML = '<i class="fas fa-flag me-1"></i> تمييز التقييم';
        flagBtn.classList.replace('btn-outline-secondary', 'btn-outline-danger');
        flagBtn.onclick = function() { flagReview(reviewId); };
    }
    
    // عرض إشعار
    showNotification('تم إلغاء تمييز التقييم بنجاح!', 'info');
}

/**
 * تصدير التقييم
 */
function exportReview(reviewId) {
    // البحث عن التقييم
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    // في تطبيق حقيقي، سيتم تنفيذ تصدير التقييم
    console.log(`تصدير التقييم رقم ${reviewId}`);
    
    // عرض إشعار
    showNotification('تم تصدير التقييم بنجاح!', 'success');
}

/**
 * عرض إشعار
 */
function showNotification(message, type = 'info') {
    // التحقق مما إذا كان هناك نظام إشعارات مخصص
    if (typeof toast === 'function') {
        toast(message, type);
        return;
    }
    
    // نظام إشعارات بسيط
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
