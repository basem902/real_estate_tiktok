// اسم مخبأ التطبيق
const CACHE_NAME = 'real-estate-tiktok-v1';

// قائمة بالملفات التي سيتم تخزينها في المخبأ
const CACHE_FILES = [
  '/',
  '/static/css/style.css',
  '/static/js/main.js',
  '/splash1',
  '/splash2',
  '/splash3',
  '/user_type',
  '/static/manifest.json'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('المخبأ مفتوح');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// تنشيط Service Worker
self.addEventListener('activate', event => {
  console.log('تم تنشيط Service Worker');
  
  // إزالة المخابئ القديمة
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('حذف المخبأ القديم', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية "المخبأ أولاً ثم الشبكة"
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجدنا الاستجابة في المخبأ، نعيدها
        if (response) {
          return response;
        }
        
        // غير ذلك، نقوم بجلب الطلب من الشبكة
        return fetch(event.request)
          .then(netResponse => {
            // التحقق من أن الاستجابة صالحة
            if (!netResponse || netResponse.status !== 200 || netResponse.type !== 'basic') {
              return netResponse;
            }
            
            // نسخ الاستجابة
            const responseToCache = netResponse.clone();
            
            // إضافة الاستجابة إلى المخبأ للاستخدام المستقبلي
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return netResponse;
          });
      })
      .catch(() => {
        // فشل الاتصال بالشبكة، يمكننا تقديم صفحة الخطأ أو الرجوع إلى المخبأ
        return caches.match('/static/html/offline.html');
      })
  );
});
