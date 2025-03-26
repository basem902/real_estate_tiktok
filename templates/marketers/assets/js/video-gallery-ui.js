/**
 * Real Estate TikTok - Marketers Dashboard
 * Video Gallery UI
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة صفحة معرض الفيديوهات
    initializeVideoGallery();
});

// تهيئة معرض الفيديوهات
function initializeVideoGallery() {
    // تحميل الفيديوهات
    loadVideos('all');
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
    
    // تهيئة مشغل الفيديو
    initializeVideoPlayer();
}

// تحميل الفيديوهات حسب الفئة
function loadVideos(category, propertyType = 'all') {
    const videosContainer = document.getElementById('videos-container');
    
    if (!videosContainer) return;
    
    // الحصول على الفيديوهات المصفاة
    let filteredVideos = window.videoManager.getVideosByCategory(category);
    
    // تصفية حسب نوع العقار إذا كان محدداً
    if (propertyType !== 'all') {
        filteredVideos = filteredVideos.filter(video => {
            const videos = window.videoManager.getVideosByPropertyType(propertyType);
            return videos.some(v => v.id === video.id);
        });
    }
    
    // إفراغ الحاوية
    videosContainer.innerHTML = '';
    
    // التحقق من عدم وجود فيديوهات
    if (filteredVideos.length === 0) {
        videosContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="py-5">
                    <i class="fas fa-video mb-3" style="font-size: 3rem; color: var(--text-muted);"></i>
                    <h5>لا توجد فيديوهات</h5>
                    <p class="text-muted">قم برفع فيديو جديد للبدء</p>
                    <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#uploadVideoModal">
                        <i class="fas fa-plus me-1"></i> رفع فيديو
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // تعبئة الفيديوهات
    filteredVideos.forEach(video => {
        // إنشاء عنصر الفيديو
        const videoElement = createVideoElement(video);
        videosContainer.appendChild(videoElement);
    });
}

// إنشاء عنصر الفيديو في واجهة المستخدم
function createVideoElement(video) {
    // إنشاء عنصر div للعمود
    const colElement = document.createElement('div');
    colElement.className = 'col-lg-4 col-md-6 mb-4';
    colElement.dataset.videoId = video.id;
    
    // تحديد تصنيف الفيديو بالعربية
    let categoryName = '';
    switch(video.category) {
        case 'promotional':
            categoryName = 'ترويجي';
            break;
        case 'tour':
            categoryName = 'جولة افتراضية';
            break;
        case 'testimonial':
            categoryName = 'شهادة عميل';
            break;
        case 'educational':
            categoryName = 'تثقيفي';
            break;
        case 'social':
            categoryName = 'محتوى اجتماعي';
            break;
    }
    
    // تحديد حالة الفيديو
    let statusBadge = '';
    if (video.status === 'processing') {
        statusBadge = '<span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2">قيد المعالجة</span>';
    } else if (video.status === 'draft') {
        statusBadge = '<span class="badge bg-secondary position-absolute top-0 start-0 m-2">مسودة</span>';
    }
    
    // إنشاء HTML للبطاقة
    colElement.innerHTML = `
        <div class="video-card">
            <div class="video-thumbnail" onclick="openVideoViewer(${video.id})">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="video-duration">${video.duration}</div>
                <div class="video-play-button">
                    <i class="fas fa-play"></i>
                </div>
                ${statusBadge}
                ${video.featured ? '<span class="badge bg-primary position-absolute top-0 end-0 m-2">مميز</span>' : ''}
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <span class="video-property-tag">${categoryName}</span>
                    <small class="text-muted">${formatDate(video.uploadDate)}</small>
                </div>
                <h5 class="mb-1 mt-2">${video.title}</h5>
                <p class="mb-1 text-truncate">${video.description}</p>
                
                ${video.propertyName ? `<small class="text-muted d-block mb-2">العقار: ${video.propertyName}</small>` : ''}
                
                <div class="video-stats">
                    <div><i class="fas fa-eye"></i> ${formatNumber(video.stats.views)}</div>
                    <div><i class="fas fa-heart"></i> ${formatNumber(video.stats.likes)}</div>
                    <div><i class="fas fa-share-alt"></i> ${formatNumber(video.stats.shares)}</div>
                </div>
                
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-sm btn-outline-primary" onclick="openVideoViewer(${video.id})">
                        <i class="fas fa-play me-1"></i> تشغيل
                    </button>
                    <div class="share-dropdown">
                        <button class="btn btn-sm btn-outline-secondary">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="share-dropdown-content">
                            <a href="#" onclick="shareVideo('any', ${video.id})"><i class="fas fa-share-alt me-2"></i> مشاركة</a>
                            <a href="#" onclick="editVideo(${video.id})"><i class="fas fa-edit me-2"></i> تعديل</a>
                            <a href="#" onclick="deleteVideo(${video.id})"><i class="fas fa-trash-alt me-2"></i> حذف</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return colElement;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمعي أحداث زر الفئة
    const categoryButtons = document.querySelectorAll('.category-filter button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // تحديث الزر النشط
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // تحميل الفيديوهات المصفاة
            const propertyFilter = document.getElementById('property-filter').value;
            loadVideos(category, propertyFilter);
        });
    });
    
    // مستمع حدث تصفية نوع العقار
    const propertyFilter = document.getElementById('property-filter');
    if (propertyFilter) {
        propertyFilter.addEventListener('change', function() {
            const propertyType = this.value;
            const activeCategory = document.querySelector('.category-filter button.active').dataset.category;
            
            // تحميل الفيديوهات المصفاة
            loadVideos(activeCategory, propertyType);
        });
    }
    
    // مستمع حدث زر حفظ الفيديو
    const saveVideoButton = document.getElementById('save-video');
    if (saveVideoButton) {
        saveVideoButton.addEventListener('click', saveNewVideo);
    }
    
    // مستمع حدث منطقة السحب والإفلات
    setupDropzone();
    
    // مستمع حدث خيار المشاركة التلقائية
    const shareAfterUpload = document.getElementById('share-after-upload');
    if (shareAfterUpload) {
        shareAfterUpload.addEventListener('change', function() {
            const sharePlatforms = document.getElementById('share-platforms');
            
            if (this.checked) {
                sharePlatforms.classList.remove('d-none');
            } else {
                sharePlatforms.classList.add('d-none');
            }
        });
    }
    
    // مستمعي أحداث أزرار طريقة العرض
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    
    if (gridViewButton && listViewButton) {
        gridViewButton.addEventListener('click', function() {
            setViewMode('grid');
            
            gridViewButton.classList.add('active');
            listViewButton.classList.remove('active');
        });
        
        listViewButton.addEventListener('click', function() {
            setViewMode('list');
            
            listViewButton.classList.add('active');
            gridViewButton.classList.remove('active');
        });
    }
    
    // مستمع حدث للقائمة الجانبية
    setupSidebarToggle();
}

// تهيئة مشغل الفيديو
function initializeVideoPlayer() {
    // تهيئة مكتبة Plyr عندما يتم فتح نافذة عرض الفيديو
    const videoViewerModal = document.getElementById('videoViewerModal');
    
    if (videoViewerModal) {
        videoViewerModal.addEventListener('shown.bs.modal', function() {
            if (window.videoPlayer) {
                window.videoPlayer.destroy();
            }
            
            window.videoPlayer = new Plyr('#player', {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                hideControls: false,
                fullscreen: { enabled: true, fallback: true, iosNative: true }
            });
        });
    }
}

// متغير عام لتخزين معرف الفيديو الحالي
let currentVideoId = null;

// فتح نافذة عرض الفيديو
function openVideoViewer(videoId) {
    const video = window.videoManager.getVideoById(videoId);
    
    if (!video) return;
    
    // تخزين معرف الفيديو الحالي
    currentVideoId = videoId;
    
    // تحديث عنوان الفيديو
    const videoTitle = document.getElementById('video-viewer-title');
    if (videoTitle) {
        videoTitle.textContent = video.title;
    }
    
    // تحديث وصف الفيديو
    const videoDescription = document.getElementById('video-viewer-description');
    if (videoDescription) {
        videoDescription.innerHTML = `
            <p>${video.description}</p>
            ${video.propertyName ? `<p><strong>العقار:</strong> ${video.propertyName}</p>` : ''}
            <p><strong>تاريخ الرفع:</strong> ${formatDate(video.uploadDate)}</p>
        `;
    }
    
    // تحديث إحصائيات الفيديو
    const videoStats = document.getElementById('video-viewer-stats');
    if (videoStats) {
        videoStats.innerHTML = `
            <div><i class="fas fa-eye me-1"></i> ${formatNumber(video.stats.views)} مشاهدة</div>
            <div><i class="fas fa-heart me-1"></i> ${formatNumber(video.stats.likes)} إعجاب</div>
            <div><i class="fas fa-share-alt me-1"></i> ${formatNumber(video.stats.shares)} مشاركة</div>
            <div><i class="fas fa-chart-line me-1"></i> ${video.stats.engagement}% نسبة التفاعل</div>
        `;
    }
    
    // تحديث مصدر الفيديو
    const playerIframe = document.querySelector('#player iframe');
    if (playerIframe) {
        playerIframe.src = video.videoUrl;
    }
    
    // فتح النافذة
    const videoViewerModal = new bootstrap.Modal(document.getElementById('videoViewerModal'));
    videoViewerModal.show();
}

// إعداد منطقة السحب والإفلات
function setupDropzone() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('video-upload');
    const uploadPreview = document.getElementById('upload-preview');
    const saveButton = document.getElementById('save-video');
    
    if (!dropzone || !fileInput || !uploadPreview || !saveButton) return;
    
    // مستمع حدث النقر على منطقة السحب والإفلات
    dropzone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // مستمعي أحداث السحب والإفلات
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, function() {
            this.classList.add('border-primary');
            this.classList.add('bg-primary-light');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, function() {
            this.classList.remove('border-primary');
            this.classList.remove('bg-primary-light');
        }, false);
    });
    
    // مستمع حدث إفلات الملف
    dropzone.addEventListener('drop', function(e) {
        const files = e.dataTransfer.files;
        
        if (files.length) {
            fileInput.files = files;
            handleVideoUpload(files[0]);
        }
    }, false);
    
    // مستمع حدث اختيار الملف
    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleVideoUpload(this.files[0]);
        }
    });
    
    // معالجة تحميل الفيديو
    function handleVideoUpload(file) {
        if (!file.type.startsWith('video/')) {
            showNotification('يرجى اختيار ملف فيديو صالح', 'danger');
            return;
        }
        
        // عرض معاينة الفيديو
        const videoElement = uploadPreview.querySelector('video');
        const fileURL = URL.createObjectURL(file);
        
        videoElement.src = fileURL;
        uploadPreview.classList.remove('d-none');
        dropzone.classList.add('d-none');
        
        // تفعيل زر الحفظ
        saveButton.disabled = false;
    }
}

// حفظ فيديو جديد
function saveNewVideo() {
    // الحصول على بيانات النموذج
    const title = document.getElementById('video-title').value;
    const description = document.getElementById('video-description').value;
    const propertyId = document.getElementById('video-property').value;
    const category = document.getElementById('video-category').value;
    const shareAfterUpload = document.getElementById('share-after-upload').checked;
    
    // التحقق من صحة البيانات
    if (!title || !description || !category) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'danger');
        return;
    }
    
    // الحصول على اسم ونوع العقار
    let propertyName = null;
    let propertyType = null;
    
    if (propertyId) {
        // في الإصدار الحقيقي، ستتم هذه العملية بطريقة أفضل باستخدام قاعدة بيانات
        const propertyMapping = {
            'PROP-001': { name: 'فيلا النرجس', type: 'فيلا' },
            'PROP-005': { name: 'شقة الياسمين', type: 'شقة' },
            'PROP-007': { name: 'فيلا الملقا', type: 'فيلا' },
            'PROP-010': { name: 'أرض طريق الملك فهد', type: 'أرض تجارية' }
        };
        
        if (propertyMapping[propertyId]) {
            propertyName = propertyMapping[propertyId].name;
            propertyType = propertyMapping[propertyId].type;
        }
    }
    
    // الحصول على تاريخ اليوم
    const today = new Date();
    const uploadDate = today.toISOString().split('T')[0];
    
    // إنشاء كائن الفيديو الجديد
    const newVideo = {
        title,
        description,
        propertyId,
        propertyName,
        propertyType,
        thumbnail: "../assets/img/videos/default_thumbnail.jpg", // صورة مصغرة افتراضية
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // رابط افتراضي
        duration: "0:00", // مدة افتراضية
        category,
        uploadDate,
        status: 'processing',
        featured: false
    };
    
    // إضافة الفيديو
    const addedVideo = window.videoManager.addVideo(newVideo);
    
    // إعادة تحميل الفيديوهات
    const activeCategory = document.querySelector('.category-filter button.active').dataset.category;
    const propertyFilter = document.getElementById('property-filter').value;
    loadVideos(activeCategory, propertyFilter);
    
    // إغلاق النافذة
    const modalElement = document.getElementById('uploadVideoModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // إعادة تعيين النموذج
    document.getElementById('video-form').reset();
    document.getElementById('upload-preview').classList.add('d-none');
    document.getElementById('dropzone').classList.remove('d-none');
    document.getElementById('save-video').disabled = true;
    
    // عرض إشعار نجاح
    if (shareAfterUpload) {
        showNotification('تم رفع الفيديو بنجاح وسيتم مشاركته تلقائياً بعد المعالجة', 'success');
    } else {
        showNotification('تم رفع الفيديو بنجاح وهو الآن قيد المعالجة', 'success');
    }
}

// مشاركة الفيديو
function shareVideo(platform, videoId) {
    const video = window.videoManager.getVideoById(videoId);
    
    if (!video) return;
    
    // في الإصدار الحقيقي، سيتم تنفيذ المشاركة الفعلية
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    let platformName = '';
    
    switch(platform) {
        case 'tiktok':
            platformName = 'TikTok';
            break;
        case 'instagram':
            platformName = 'Instagram';
            break;
        case 'facebook':
            platformName = 'Facebook';
            break;
        case 'twitter':
            platformName = 'Twitter';
            break;
        case 'whatsapp':
            platformName = 'WhatsApp';
            break;
        case 'any':
            platformName = 'وسائل التواصل';
            break;
    }
    
    showNotification(`تمت مشاركة الفيديو "${video.title}" على ${platformName} بنجاح`, 'success');
}

// نسخ رابط الفيديو
function copyVideoLink(videoId) {
    const video = window.videoManager.getVideoById(videoId);
    
    if (!video) return;
    
    // في الإصدار الحقيقي، سيتم نسخ الرابط الفعلي
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('تم نسخ رابط الفيديو إلى الحافظة', 'success');
}

// تعديل الفيديو
function editVideo(videoId) {
    const video = window.videoManager.getVideoById(videoId);
    
    if (!video) return;
    
    // في الإصدار الحقيقي، سيتم فتح نموذج التعديل مع بيانات الفيديو
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    alert(`تعديل الفيديو "${video.title}"`);
}

// حذف الفيديو
function deleteVideo(videoId) {
    const video = window.videoManager.getVideoById(videoId);
    
    if (!video) return;
    
    // في الإصدار الحقيقي، ستكون هناك نافذة تأكيد قبل الحذف
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    alert(`حذف الفيديو "${video.title}"`);
}

// تعيين وضع العرض (شبكة أو قائمة)
function setViewMode(mode) {
    const videosContainer = document.getElementById('videos-container');
    
    if (!videosContainer) return;
    
    const videoElements = videosContainer.querySelectorAll('.col-lg-4');
    
    if (mode === 'list') {
        // تغيير النمط إلى وضع القائمة
        videoElements.forEach(element => {
            element.className = 'col-12 mb-4';
            
            const videoCard = element.querySelector('.video-card');
            if (videoCard) {
                videoCard.classList.add('d-flex');
                
                const videoThumbnail = videoCard.querySelector('.video-thumbnail');
                if (videoThumbnail) {
                    videoThumbnail.style.width = '280px';
                    videoThumbnail.style.minWidth = '280px';
                }
            }
        });
    } else {
        // تغيير النمط إلى وضع الشبكة
        videoElements.forEach(element => {
            element.className = 'col-lg-4 col-md-6 mb-4';
            
            const videoCard = element.querySelector('.video-card');
            if (videoCard) {
                videoCard.classList.remove('d-flex');
                
                const videoThumbnail = videoCard.querySelector('.video-thumbnail');
                if (videoThumbnail) {
                    videoThumbnail.style.width = '';
                    videoThumbnail.style.minWidth = '';
                }
            }
        });
    }
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

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', options);
}

// تنسيق الأرقام الكبيرة
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
