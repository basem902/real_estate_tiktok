/**
 * Real Estate TikTok - Marketers Dashboard
 * Progressive Web App Setup
 * Version: 1.0.0
 */

// تسجيل خدمة العامل إذا كانت متوفرة في المتصفح
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // المسار إلى ملف خدمة العامل
        const swPath = '/service-worker.js';

        navigator.serviceWorker.register(swPath)
            .then(function(registration) {
                console.log('تم تسجيل خدمة العامل بنجاح. النطاق: ', registration.scope);
            })
            .catch(function(error) {
                console.error('فشل تسجيل خدمة العامل: ', error);
            });
    });
}

// كود للتعامل مع تثبيت التطبيق (Add to Home Screen)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // منع ظهور الرسالة التلقائية
    e.preventDefault();
    // تخزين الحدث للاستخدام لاحقًا
    deferredPrompt = e;
    
    // إظهار زر التثبيت
    const installButton = document.getElementById('install-button');
    if (installButton) {
        installButton.style.display = 'block';
        
        // إضافة مستمع لحدث النقر على زر التثبيت
        installButton.addEventListener('click', () => {
            // عرض واجهة التثبيت
            deferredPrompt.prompt();
            
            // انتظار اختيار المستخدم
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('تم قبول تثبيت التطبيق');
                    // إخفاء زر التثبيت بعد القبول
                    installButton.style.display = 'none';
                } else {
                    console.log('تم رفض تثبيت التطبيق');
                }
                // إعادة تعيين المتغير
                deferredPrompt = null;
            });
        });
    }
});

// التعامل مع حالة الاتصال بالإنترنت
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
    const condition = navigator.onLine ? "متصل" : "غير متصل";
    const statusElement = document.getElementById('connection-status');
    
    if (statusElement) {
        if (navigator.onLine) {
            statusElement.textContent = 'متصل';
            statusElement.classList.remove('offline');
            statusElement.classList.add('online');
            
            // تزامن البيانات المخزنة محليًا عند استعادة الاتصال
            syncData();
        } else {
            statusElement.textContent = 'غير متصل';
            statusElement.classList.remove('online');
            statusElement.classList.add('offline');
            
            // إظهار إشعار للمستخدم بأنه غير متصل
            showOfflineNotification();
        }
    }
    
    console.log(`التطبيق الآن ${condition} بالإنترنت`);
}

// تزامن البيانات عند استعادة الاتصال
function syncData() {
    // الحصول على البيانات المخزنة في IndexedDB
    const pendingData = getPendingData();
    
    if (pendingData && pendingData.length > 0) {
        console.log('جاري مزامنة البيانات...');
        // هنا سيتم إضافة كود لإرسال البيانات إلى الخادم
    }
}

// الحصول على البيانات المعلقة (تنفيذ هذه الدالة سيعتمد على التنفيذ الفعلي)
function getPendingData() {
    // هذه دالة وهمية، ستحتاج إلى استبدالها بالتنفيذ الفعلي
    return [];
}

// إظهار إشعار للمستخدم عندما يكون غير متصل
function showOfflineNotification() {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'offline-notification';
    notification.innerHTML = `
        <i class="fas fa-wifi-slash"></i>
        <span>أنت غير متصل بالإنترنت. سيتم حفظ تغييراتك محليًا ومزامنتها عند استعادة الاتصال.</span>
        <button class="close-notification"><i class="fas fa-times"></i></button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeButton = notification.querySelector('.close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // إخفاء الإشعار تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, 5000);
}
