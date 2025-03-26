/**
 * جدولة المحتوى لوسائل التواصل الاجتماعي
 * يتعامل هذا الملف مع جدولة ونشر المحتوى على منصات التواصل الاجتماعي
 */

// بيانات نموذجية للمنشورات المجدولة (يمكن استبدالها بطلبات API فعلية)
const scheduledPosts = [
    {
        id: 1,
        content: 'فرصة استثمارية رائعة! شقق فاخرة للبيع في أرقى أحياء المدينة بأسعار تنافسية وتسهيلات في الدفع. تواصلوا معنا الآن للمزيد من التفاصيل. #عقارات #استثمار',
        media: ['property1.jpg'],
        date: '2025-03-25T10:00:00',
        platforms: ['facebook', 'instagram', 'twitter'],
        status: 'scheduled',
        author: 'أحمد محمد'
    },
    {
        id: 2,
        content: 'شاهد الفيديو الجديد لجولة داخل الفيلا الفاخرة بمنطقة الشاطئ. مساحات واسعة، إطلالة بحرية، وتصميم عصري. متاحة الآن للبيع! #فلل_فاخرة #إطلالة_بحرية',
        media: ['villa_tour.mp4'],
        date: '2025-03-27T15:30:00',
        platforms: ['facebook', 'instagram'],
        status: 'scheduled',
        author: 'سارة عبدالله'
    },
    {
        id: 3,
        content: 'نصائح مهمة قبل شراء العقار الاستثماري! تابعونا في البث المباشر يوم الخميس الساعة 8 مساءً للتعرف على أهم الفرص الاستثمارية المتاحة حالياً. #نصائح_عقارية',
        media: [],
        date: '2025-03-30T20:00:00',
        platforms: ['facebook', 'tiktok'],
        status: 'scheduled',
        author: 'خالد العامري'
    }
];

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة تقويم المحتوى
    initializeContentCalendar();
    
    // تحميل المنشورات القادمة
    loadUpcomingPosts();
    
    // إعداد نافذة جدولة المنشورات
    setupSchedulePostModal();
});

/**
 * تهيئة تقويم المحتوى
 */
function initializeContentCalendar() {
    const calendarEl = document.getElementById('contentCalendar');
    
    if (!calendarEl) return;
    
    // تحويل بيانات المنشورات المجدولة إلى تنسيق مناسب للتقويم
    const events = scheduledPosts.map(post => {
        // تحديد لون الحدث بناءً على المنصات
        const colorClass = getEventColorClass(post.platforms);
        
        return {
            id: post.id,
            title: truncateText(post.content, 30),
            start: post.date,
            className: colorClass,
            extendedProps: {
                platforms: post.platforms,
                content: post.content,
                media: post.media,
                status: post.status
            }
        };
    });
    
    // إنشاء التقويم
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ar',
        direction: 'rtl',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        buttonText: {
            today: 'اليوم',
            month: 'شهر',
            week: 'أسبوع',
            list: 'قائمة'
        },
        events: events,
        eventClick: function(info) {
            showPostDetails(info.event);
        },
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        }
    });
    
    calendar.render();
}

/**
 * تحديد لون حدث التقويم بناءً على المنصات
 */
function getEventColorClass(platforms) {
    if (platforms.includes('facebook') && platforms.length === 1) {
        return 'fc-event-facebook';
    } else if (platforms.includes('instagram') && platforms.length === 1) {
        return 'fc-event-instagram';
    } else if (platforms.includes('twitter') && platforms.length === 1) {
        return 'fc-event-twitter';
    } else if (platforms.includes('tiktok') && platforms.length === 1) {
        return 'fc-event-tiktok';
    } else {
        // للمنشورات المتعددة المنصات
        return 'fc-event-multiple';
    }
}

/**
 * عرض تفاصيل المنشور عند النقر على حدث في التقويم
 */
function showPostDetails(event) {
    const postId = parseInt(event.id);
    const post = scheduledPosts.find(p => p.id === postId);
    
    if (!post) return;
    
    // في التطبيق الحقيقي، يمكن إظهار نافذة منبثقة أو صفحة تفاصيل
    console.log('تفاصيل المنشور:', post);
    
    // هنا يمكن إنشاء نافذة منبثقة لعرض التفاصيل
    // يمكن تطوير هذه الوظيفة في المستقبل
    alert(`
        عنوان المنشور: ${truncateText(post.content, 50)}
        التاريخ: ${new Date(post.date).toLocaleString('ar-SA')}
        المنصات: ${formatPlatforms(post.platforms)}
        الحالة: ${getStatusText(post.status)}
    `);
}

/**
 * تحميل المنشورات القادمة
 */
function loadUpcomingPosts() {
    const upcomingPostsList = document.getElementById('upcomingPostsList');
    
    if (!upcomingPostsList) return;
    
    // الحصول على التاريخ الحالي
    const now = new Date();
    
    // تصفية المنشورات القادمة (التي لم يتم نشرها بعد)
    const upcoming = scheduledPosts
        .filter(post => new Date(post.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // ترتيب حسب التاريخ
        .slice(0, 5); // أخذ أول 5 منشورات
    
    // إذا لم تكن هناك منشورات قادمة
    if (upcoming.length === 0) {
        upcomingPostsList.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-calendar-day fa-2x mb-2"></i>
                <p>لا توجد منشورات مجدولة قادمة</p>
            </div>
        `;
        return;
    }
    
    // إنشاء عناصر HTML للمنشورات القادمة
    let html = '';
    upcoming.forEach(post => {
        const postDate = new Date(post.date);
        const formattedDate = postDate.toLocaleDateString('ar-SA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = postDate.toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // تحديد فئة CSS بناءً على المنصة الأولى
        const platformClass = post.platforms[0] || 'facebook';
        
        html += `
            <div class="post-item ${platformClass}" data-post-id="${post.id}">
                <div class="post-date">
                    <i class="far fa-calendar-alt me-1"></i> ${formattedDate} - ${formattedTime}
                </div>
                <div class="post-content">${truncateText(post.content, 80)}</div>
                <div class="post-platforms">
                    ${post.platforms.map(platform => `
                        <span class="platform-badge bg-light text-dark">
                            <i class="fab fa-${platform}"></i> ${getPlatformName(platform)}
                        </span>
                    `).join('')}
                </div>
                <div class="d-flex justify-content-end mt-2">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="editScheduledPost(${post.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteScheduledPost(${post.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    upcomingPostsList.innerHTML = html;
}

/**
 * إعداد نافذة جدولة المنشورات
 */
function setupSchedulePostModal() {
    const modal = document.getElementById('schedulePostModal');
    if (!modal) return;
    
    const form = document.getElementById('schedulePostForm');
    const contentTextarea = document.getElementById('postContent');
    const charCount = document.getElementById('charCount');
    const saveBtn = document.getElementById('saveScheduleBtn');
    const mediaUpload = document.getElementById('mediaUpload');
    const mediaPreview = document.getElementById('mediaPreview');
    
    // عدّاد الأحرف
    if (contentTextarea && charCount) {
        contentTextarea.addEventListener('input', function() {
            const remaining = 280 - this.value.length;
            charCount.textContent = remaining.toString();
            
            // تغيير لون العداد إذا كان العدد منخفضًا أو سالبًا
            if (remaining < 0) {
                charCount.classList.add('text-danger');
                saveBtn.disabled = true;
            } else if (remaining < 20) {
                charCount.classList.add('text-warning');
                charCount.classList.remove('text-danger');
                saveBtn.disabled = false;
            } else {
                charCount.classList.remove('text-warning', 'text-danger');
                saveBtn.disabled = false;
            }
        });
    }
    
    // معالجة رفع الوسائط
    if (mediaUpload && mediaPreview) {
        const dropzone = document.querySelector('.dropzone-upload');
        
        // النقر على منطقة السحب والإفلات
        if (dropzone) {
            dropzone.addEventListener('click', function() {
                mediaUpload.click();
            });
            
            // معالجة حدث السحب والإفلات
            dropzone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            
            dropzone.addEventListener('dragleave', function() {
                this.classList.remove('dragover');
            });
            
            dropzone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                
                if (e.dataTransfer.files.length) {
                    mediaUpload.files = e.dataTransfer.files;
                    handleMediaFiles(mediaUpload.files);
                }
            });
        }
        
        // معالجة اختيار الملفات
        mediaUpload.addEventListener('change', function() {
            handleMediaFiles(this.files);
        });
    }
    
    // معالجة حفظ المنشور
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveScheduledPost();
        });
    }
}

/**
 * معالجة ملفات الوسائط المختارة
 */
function handleMediaFiles(files) {
    const mediaPreview = document.getElementById('mediaPreview');
    if (!mediaPreview) return;
    
    mediaPreview.innerHTML = '';
    
    // إنشاء معاينة لكل ملف
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        const div = document.createElement('div');
        div.className = 'col-4 media-preview-item';
        
        reader.onload = function(e) {
            let mediaElement = '';
            
            // التحقق من نوع الملف
            if (file.type.startsWith('image/')) {
                mediaElement = `<img src="${e.target.result}" alt="Media Preview" class="img-fluid">`;
            } else if (file.type.startsWith('video/')) {
                mediaElement = `<video src="${e.target.result}" controls class="img-fluid"></video>`;
            } else {
                mediaElement = `<div class="p-3 bg-light text-center">ملف غير مدعوم</div>`;
            }
            
            div.innerHTML = `
                ${mediaElement}
                <div class="media-remove-btn" onclick="removeMedia(this)">
                    <i class="fas fa-times"></i>
                </div>
            `;
        };
        
        reader.readAsDataURL(file);
        mediaPreview.appendChild(div);
    });
}

/**
 * إزالة معاينة وسائط
 */
function removeMedia(element) {
    const mediaItem = element.closest('.media-preview-item');
    if (mediaItem) {
        mediaItem.remove();
    }
}

/**
 * حفظ المنشور المجدول
 */
function saveScheduledPost() {
    // الحصول على قيم النموذج
    const postContent = document.getElementById('postContent').value;
    const scheduleDate = document.getElementById('scheduleDate').value;
    const scheduleTime = document.getElementById('scheduleTime').value;
    const postTags = document.getElementById('postTags').value;
    
    // الحصول على المنصات المحددة
    const selectedPlatforms = [];
    document.querySelectorAll('.platform-selection input:checked').forEach(checkbox => {
        selectedPlatforms.push(checkbox.value);
    });
    
    // التحقق من صحة البيانات
    if (!postContent) {
        alert('الرجاء إدخال محتوى المنشور');
        return;
    }
    
    if (!scheduleDate || !scheduleTime) {
        alert('الرجاء تحديد تاريخ ووقت النشر');
        return;
    }
    
    if (selectedPlatforms.length === 0) {
        alert('الرجاء اختيار منصة واحدة على الأقل');
        return;
    }
    
    // إنشاء كائن التاريخ من التاريخ والوقت
    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
    
    // التحقق من أن التاريخ في المستقبل
    if (scheduledDateTime <= new Date()) {
        alert('يجب أن يكون تاريخ النشر في المستقبل');
        return;
    }
    
    // إنشاء المنشور الجديد
    const newPost = {
        id: scheduledPosts.length + 1,
        content: postContent,
        media: [], // في التطبيق الحقيقي، سيتم رفع الملفات ووضع روابطها هنا
        date: scheduledDateTime.toISOString(),
        platforms: selectedPlatforms,
        status: 'scheduled',
        author: 'المستخدم الحالي', // في التطبيق الحقيقي، استخدم اسم المستخدم
        tags: postTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    // إضافة المنشور إلى القائمة
    scheduledPosts.push(newPost);
    
    // إغلاق النافذة المنبثقة
    const modal = bootstrap.Modal.getInstance(document.getElementById('schedulePostModal'));
    modal.hide();
    
    // تحديث التقويم والمنشورات القادمة
    initializeContentCalendar();
    loadUpcomingPosts();
    
    // إظهار إشعار بنجاح العملية
    showNotification('تم جدولة المنشور بنجاح!', 'success');
    
    // إرسال إشعار باستخدام نظام الإشعارات
    if (typeof NotificationsManager !== 'undefined') {
        NotificationsManager.addNotification({
            title: 'تم جدولة منشور جديد',
            content: `تم جدولة منشور جديد للنشر على ${selectedPlatforms.length} منصات بتاريخ ${new Date(newPost.date).toLocaleDateString('ar-SA')}.`,
            type: 'content_scheduled',
            priority: 'normal',
            timestamp: new Date().toISOString(),
            isRead: false,
            actions: [
                {
                    label: 'عرض التفاصيل',
                    action: 'viewPost',
                    data: { postId: newPost.id }
                }
            ]
        });
    }
    
    // إعادة تعيين النموذج
    document.getElementById('schedulePostForm').reset();
    document.getElementById('mediaPreview').innerHTML = '';
    document.getElementById('charCount').textContent = '280';
}

/**
 * تعديل منشور مجدول
 */
function editScheduledPost(postId) {
    const post = scheduledPosts.find(p => p.id === postId);
    
    if (!post) {
        console.error(`لم يتم العثور على المنشور رقم ${postId}`);
        return;
    }
    
    // فتح نافذة جدولة المنشورات
    const modal = new bootstrap.Modal(document.getElementById('schedulePostModal'));
    modal.show();
    
    // ملء النموذج ببيانات المنشور
    document.getElementById('postContent').value = post.content;
    
    // تحديث عداد الأحرف
    const charCount = document.getElementById('charCount');
    charCount.textContent = (280 - post.content.length).toString();
    
    // استخراج التاريخ والوقت
    const postDate = new Date(post.date);
    const dateStr = postDate.toISOString().split('T')[0];
    const timeStr = postDate.toTimeString().slice(0, 5);
    
    document.getElementById('scheduleDate').value = dateStr;
    document.getElementById('scheduleTime').value = timeStr;
    
    // تحديد المنصات
    document.querySelectorAll('.platform-selection input').forEach(checkbox => {
        checkbox.checked = post.platforms.includes(checkbox.value);
    });
    
    // إعداد الوسوم إذا كانت موجودة
    if (post.tags) {
        document.getElementById('postTags').value = post.tags.join(', ');
    }
    
    // إعادة تنسيق زر الحفظ
    const saveBtn = document.getElementById('saveScheduleBtn');
    saveBtn.textContent = 'تحديث المنشور';
    saveBtn.dataset.editId = postId;
    
    // إعادة تعيين الوظيفة لزر الحفظ
    saveBtn.onclick = function() {
        updateScheduledPost(postId);
    };
}

/**
 * تحديث منشور مجدول
 */
function updateScheduledPost(postId) {
    const post = scheduledPosts.find(p => p.id === postId);
    
    if (!post) {
        console.error(`لم يتم العثور على المنشور رقم ${postId}`);
        return;
    }
    
    // الحصول على القيم المحدثة
    const postContent = document.getElementById('postContent').value;
    const scheduleDate = document.getElementById('scheduleDate').value;
    const scheduleTime = document.getElementById('scheduleTime').value;
    const postTags = document.getElementById('postTags').value;
    
    // الحصول على المنصات المحددة
    const selectedPlatforms = [];
    document.querySelectorAll('.platform-selection input:checked').forEach(checkbox => {
        selectedPlatforms.push(checkbox.value);
    });
    
    // نفس فحوصات الصلاحية كما في saveScheduledPost
    if (!postContent || !scheduleDate || !scheduleTime || selectedPlatforms.length === 0) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }
    
    // تحديث المنشور
    post.content = postContent;
    post.date = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
    post.platforms = selectedPlatforms;
    post.tags = postTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // إغلاق النافذة المنبثقة
    const modal = bootstrap.Modal.getInstance(document.getElementById('schedulePostModal'));
    modal.hide();
    
    // إعادة تعيين زر الحفظ
    const saveBtn = document.getElementById('saveScheduleBtn');
    saveBtn.textContent = 'حفظ وجدولة';
    saveBtn.dataset.editId = '';
    saveBtn.onclick = saveScheduledPost;
    
    // تحديث التقويم والمنشورات القادمة
    initializeContentCalendar();
    loadUpcomingPosts();
    
    // إظهار إشعار
    showNotification('تم تحديث المنشور بنجاح!', 'success');
}

/**
 * حذف منشور مجدول
 */
function deleteScheduledPost(postId) {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنشور المجدول؟')) {
        // البحث عن المنشور في المصفوفة
        const index = scheduledPosts.findIndex(p => p.id === postId);
        
        if (index !== -1) {
            // حذف المنشور من المصفوفة
            scheduledPosts.splice(index, 1);
            
            // تحديث التقويم والمنشورات القادمة
            initializeContentCalendar();
            loadUpcomingPosts();
            
            // إظهار إشعار
            showNotification('تم حذف المنشور بنجاح!', 'success');
        }
    }
}

/**
 * اختصار النص إذا كان طويلًا
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * تنسيق أسماء المنصات للعرض
 */
function formatPlatforms(platforms) {
    return platforms.map(p => getPlatformName(p)).join(', ');
}

/**
 * الحصول على اسم المنصة بالعربية
 */
function getPlatformName(platform) {
    switch (platform) {
        case 'facebook':
            return 'فيسبوك';
        case 'instagram':
            return 'انستجرام';
        case 'twitter':
            return 'تويتر';
        case 'tiktok':
            return 'تيك توك';
        default:
            return platform;
    }
}

/**
 * الحصول على نص الحالة بالعربية
 */
function getStatusText(status) {
    switch (status) {
        case 'scheduled':
            return 'مجدول';
        case 'published':
            return 'منشور';
        case 'failed':
            return 'فشل النشر';
        case 'draft':
            return 'مسودة';
        default:
            return status;
    }
}

/**
 * إظهار إشعار
 */
function showNotification(message, type = 'info') {
    // التحقق مما إذا كان هناك نظام إشعارات مخصص
    if (typeof toast === 'function') {
        toast(message, type);
        return;
    }
    
    // استخدام نفس وظيفة الإشعارات من social-accounts.js
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
