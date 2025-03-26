// تبديل الوضع المظلم/الفاتح
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement;
    const themeColor = document.getElementById('theme-color');
    
    // التحقق من تفضيلات المستخدم المحفوظة
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // تنفيذ تبديل الوضع عند النقر على الزر
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // دالة تعيين الوضع
    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeColor.content = '#212529';
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeColor.content = '#ffffff';
        }
    }
    
    // التنقل بين شاشات البداية (Splash)
    const splashScreens = document.querySelectorAll('.splash-screen');
    let currentSplashIndex = 0;
    
    // إذا كنا في شاشة البداية
    if (splashScreens.length > 0) {
        // إخفاء جميع الشاشات ما عدا الأولى
        splashScreens.forEach((screen, index) => {
            if (index > 0) {
                screen.style.display = 'none';
            }
        });
        
        // بدء الانتقال التلقائي بين الشاشات
        const autoSplashInterval = setInterval(nextSplash, 3000);
        
        // دالة الانتقال للشاشة التالية
        function nextSplash() {
            // إخفاء الشاشة الحالية
            splashScreens[currentSplashIndex].style.display = 'none';
            
            // زيادة المؤشر
            currentSplashIndex++;
            
            // إذا وصلنا للشاشة الأخيرة ننتقل إلى صفحة اختيار نوع المستخدم
            if (currentSplashIndex >= splashScreens.length) {
                clearInterval(autoSplashInterval);
                window.location.href = '/user_type';
                return;
            }
            
            // إظهار الشاشة التالية
            splashScreens[currentSplashIndex].style.display = 'flex';
        }
        
        // إضافة وظيفة لزر التخطي
        const skipButton = document.querySelector('.skip-button');
        if (skipButton) {
            skipButton.addEventListener('click', function() {
                clearInterval(autoSplashInterval);
                window.location.href = '/user_type';
            });
        }
    }
    
    // صفحة اختيار نوع المستخدم
    const userTypeCards = document.querySelectorAll('.user-type-card');
    userTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const userType = this.getAttribute('data-user-type');
            window.location.href = `/login/${userType}`;
        });
    });
    
    // صفحة الفيديوهات
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        // تنفيذ السحب لأعلى/أسفل للتنقل بين الفيديوهات
        let startY = 0;
        let endY = 0;
        
        videoContainer.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });
        
        videoContainer.addEventListener('touchend', function(e) {
            endY = e.changedTouches[0].clientY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const diff = startY - endY;
            const threshold = 100; // عتبة السحب
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // سحب لأعلى - عرض الفيديو التالي
                    nextVideo();
                } else {
                    // سحب لأسفل - عرض الفيديو السابق
                    prevVideo();
                }
            }
        }
        
        function nextVideo() {
            // هنا يتم تنفيذ الانتقال للفيديو التالي
            // سيتم تنفيذه بالتفصيل عند تطوير صفحة الفيديوهات
            console.log('Next video');
        }
        
        function prevVideo() {
            // هنا يتم تنفيذ الانتقال للفيديو السابق
            console.log('Previous video');
        }
    }
});
