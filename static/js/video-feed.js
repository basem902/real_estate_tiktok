/**
 * مشغل فيديوهات العقارات - نمط تيك توك
 * هذا الملف يتعامل مع تشغيل فيديوهات العقارات وتفاعلات المستخدم في الصفحة
 */

// متغيرات عامة
let isScriptLoaded = false;
let firstVideoPlayed = false;
let isMuted = false; // حالة الصوت الافتراضية (غير مكتوم)
let vimeoPlayers = [];
let playerStates = {}; // لتخزين حالة كل فيديو (وقت التوقف)
let currentVideoIndex = 0;
let isScrolling = false;
let readyVideosCount = 0;
let playersInitialized = false;
let videoObserver; // مراقب ظهور الفيديوهات على الشاشة

// نافذة تحميل لإظهار حالة تحميل الفيديوهات
function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    
    const spinner = document.createElement('div');
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '5px solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderTop = '5px solid #D4AF37';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    
    const text = document.createElement('div');
    text.textContent = 'جاري تحميل الفيديوهات...';
    text.style.color = 'white';
    text.style.fontFamily = 'Cairo, sans-serif';
    text.style.fontSize = '18px';
    text.style.marginTop = '20px';
    text.style.position = 'absolute';
    text.style.bottom = '30%';
    
    overlay.appendChild(spinner);
    overlay.appendChild(text);
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    return overlay;
}

function hideLoadingOverlay(overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 500);
}

// بدء التشغيل بمجرد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log("الصفحة محملة، جاري التحقق من Vimeo API");
    
    // إظهار نافذة التحميل
    const loadingOverlay = showLoadingOverlay();
    
    // تهيئة أزرار التفاعل
    setupInteractionButtons();

    // تهيئة مراقب ظهور الفيديوهات
    setupVideoVisibilityObserver();
    
    // محاولة تشغيل الفيديوهات مباشرة من HTML
    setTimeout(() => {
        hideLoadingOverlay(loadingOverlay);
    }, 2000);
});

// إعداد مراقب ظهور الفيديوهات
function setupVideoVisibilityObserver() {
    // خيارات المراقب
    const options = {
        root: null, // استخدام نافذة المتصفح كإطار مرجعي
        rootMargin: '0px',
        threshold: 0.7 // العنصر يعتبر مرئياً عندما يكون 70% منه ظاهراً
    };
    
    // إنشاء مراقب جديد
    videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const videoContainer = entry.target;
            const iframe = videoContainer.querySelector('iframe.property-video');
            const propertyId = videoContainer.dataset.propertyId;
            
            if (entry.isIntersecting) {
                // الفيديو ظاهر على الشاشة - تشغيله
                console.log(`الفيديو ${propertyId} ظاهر الآن، جاري التشغيل`);
                playVideo(iframe, propertyId);
            } else {
                // الفيديو غير ظاهر - إيقافه وكتم صوته
                console.log(`الفيديو ${propertyId} غير ظاهر، جاري الإيقاف وكتم الصوت`);
                pauseAndMuteVideo(iframe, propertyId);
            }
        });
    }, options);
    
    // بدء مراقبة جميع الفيديوهات
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        videoObserver.observe(container);
    });
}

// تشغيل فيديو عندما يظهر على الشاشة
function playVideo(iframe, propertyId) {
    try {
        // استخدام Vimeo Player API
        const player = new Vimeo.Player(iframe);
        
        // إذا كان الفيديو قد توقف سابقاً، استأنفه من نفس النقطة
        if (playerStates[propertyId]) {
            player.setCurrentTime(playerStates[propertyId]).then(() => {
                player.play();
            });
        } else {
            player.play();
        }
        
        // تعيين حالة الصوت بناءً على الحالة العامة
        player.setVolume(isMuted ? 0 : 1);
        
        // تحديث حالة زر كتم الصوت
        const muteButton = iframe.parentElement.querySelector('.mute-button i');
        if (muteButton) {
            muteButton.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        }
    } catch (e) {
        console.error("خطأ عند تشغيل الفيديو:", e);
    }
}

// إيقاف وكتم صوت الفيديو عندما يختفي عن الشاشة
function pauseAndMuteVideo(iframe, propertyId) {
    try {
        // استخدام Vimeo Player API
        const player = new Vimeo.Player(iframe);
        
        // حفظ الوقت الحالي للفيديو قبل إيقافه
        player.getCurrentTime().then(time => {
            playerStates[propertyId] = time;
        });
        
        // إيقاف الفيديو وكتم صوته
        player.pause();
        player.setVolume(0);
    } catch (e) {
        console.error("خطأ عند إيقاف الفيديو:", e);
    }
}

// وظائف التفاعل
function setupInteractionButtons() {
    // تهيئة أزرار الإعجاب والتعليقات والمشاركة والحفظ
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // معرفة نوع الزر من خلال الكلاس
            const buttonType = this.classList.contains('like-button') ? 'الإعجاب' :
                              this.classList.contains('comment-button') ? 'التعليق' :
                              this.classList.contains('share-button') ? 'المشاركة' : 'الحفظ';
            
            showLoginPrompt(event, buttonType);
        });
    });
    
    // تهيئة أزرار كتم الصوت
    const muteButtons = document.querySelectorAll('.mute-button');
    muteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMute(this);
        });
    });
    
    // تهيئة منطقة النقر للتشغيل/الإيقاف
    const toggleAreas = document.querySelectorAll('.click-toggle');
    toggleAreas.forEach(area => {
        area.addEventListener('click', function() {
            const videoContainer = this.closest('.video-container');
            const iframe = videoContainer.querySelector('iframe');
            togglePlayPause(iframe);
        });
    });
}

// تبديل حالة كتم الصوت
function toggleMute(muteButton) {
    const icon = muteButton.querySelector('i');
    isMuted = !isMuted;
    
    if (isMuted) {
        icon.className = 'fas fa-volume-mute';
    } else {
        icon.className = 'fas fa-volume-up';
    }
    
    // تحديث حالة كتم الصوت على الفيديو الحالي المرئي
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        const iframe = container.querySelector('iframe.property-video');
        try {
            const player = new Vimeo.Player(iframe);
            player.setVolume(isMuted ? 0 : 1);
        } catch (e) {
            console.error("خطأ عند تحديث حالة كتم الصوت:", e);
        }
    });
    
    // تحديث جميع أزرار كتم الصوت
    document.querySelectorAll('.mute-button i').forEach(i => {
        i.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });
}

// تبديل بين تشغيل وإيقاف الفيديو
function togglePlayPause(iframe) {
    try {
        const player = new Vimeo.Player(iframe);
        player.getPaused().then(paused => {
            if (paused) {
                player.play();
            } else {
                player.pause();
            }
        });
    } catch (e) {
        console.error("خطأ عند التبديل بين التشغيل والإيقاف:", e);
    }
}

// إظهار نافذة تسجيل الدخول
function showLoginPrompt(event, featureType) {
    event.stopPropagation();
    
    const prompt = document.getElementById('loginPrompt');
    const featureNameElement = document.getElementById('featureName');
    
    if (prompt && featureNameElement) {
        featureNameElement.textContent = featureType;
        prompt.style.display = 'block';
    }
}

// إخفاء نافذة تسجيل الدخول
function hideLoginPrompt() {
    const prompt = document.getElementById('loginPrompt');
    if (prompt) {
        prompt.style.display = 'none';
    }
}

// إعداد التمرير العمودي للفيديوهات
document.addEventListener('DOMContentLoaded', function() {
    const videoFeed = document.getElementById('videoFeed');
    const videoContainers = document.querySelectorAll('.video-container');
    
    if (!videoFeed || videoContainers.length === 0) return;
    
    // تنفيذ التمرير العمودي
    videoFeed.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (isScrolling) return;
        isScrolling = true;
        
        if (e.deltaY > 0 && currentVideoIndex < videoContainers.length - 1) {
            // التمرير لأسفل
            currentVideoIndex++;
            videoContainers[currentVideoIndex].scrollIntoView({ behavior: 'smooth' });
        } else if (e.deltaY < 0 && currentVideoIndex > 0) {
            // التمرير لأعلى
            currentVideoIndex--;
            videoContainers[currentVideoIndex].scrollIntoView({ behavior: 'smooth' });
        }
        
        // منع التمرير المتكرر
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    });
});
