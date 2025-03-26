/**
 * خدمة العامل (Service Worker) للوحة تحكم شركات التطوير العقاري
 * يتيح هذا الملف تجربة تصفح دون اتصال بالإنترنت وتحسين الأداء
 */

// إصدار الذاكرة المؤقتة للتحكم في التحديثات
const CACHE_VERSION = 'v1.0.0';

// أسماء الذاكرة المؤقتة
const CACHE_NAMES = {
  static: `static-cache-${CACHE_VERSION}`,
  dynamic: `dynamic-cache-${CACHE_VERSION}`,
  assets: `assets-cache-${CACHE_VERSION}`
};

// محتوى يتم تخزينه مسبقًا
const STATIC_CACHE_URLS = [
  '/',
  '/developers/login',
  '/developers/dashboard',
  '/static/css/dashboard.css',
  '/static/js/dashboard.js',
  '/static/manifest.json',
  '/static/images/logo-192x192.png',
  '/static/images/logo-512x512.png',
  '/static/js/chart.min.js',
  '/static/js/fullcalendar.min.js',
  '/static/css/bootstrap.rtl.min.css',
  '/static/js/bootstrap.bundle.min.js',
  '/static/js/jquery.min.js',
  '/static/js/datatables.min.js',
  '/static/js/ar-datatables.json',
  '/static/webfonts/tajawal-regular.woff2',
  '/static/webfonts/tajawal-bold.woff2',
  '/static/webfonts/tajawal-medium.woff2',
  '/offline'
];

// إعداد أقصى عدد من الملفات في الذاكرة المؤقتة الديناميكية
const DYNAMIC_CACHE_SIZE = 50;

// تثبيت خدمة العامل
self.addEventListener('install', event => {
  console.log('[Service Worker] تثبيت خدمة العامل');
  
  // تخزين الملفات الأساسية مسبقًا
  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        console.log('[Service Worker] تخزين المحتوى في الذاكرة المؤقتة');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[Service Worker] تم الانتهاء من التخزين المسبق');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] خطأ في التخزين المسبق:', error);
      })
  );
});

// تنشيط خدمة العامل وإزالة الذاكرة المؤقتة القديمة
self.addEventListener('activate', event => {
  console.log('[Service Worker] تنشيط خدمة العامل');
  
  // حذف الإصدارات القديمة من التخزين المؤقت
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // حذف الذاكرة المؤقتة غير المطلوبة
            if (
              cacheName !== CACHE_NAMES.static &&
              cacheName !== CACHE_NAMES.dynamic &&
              cacheName !== CACHE_NAMES.assets
            ) {
              console.log('[Service Worker] حذف الذاكرة المؤقتة القديمة:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // تأكيد التنشيط والتحكم في العملاء
        console.log('[Service Worker] تم التنشيط');
        return self.clients.claim();
      })
  );
});

// استراتيجية الشبكة أولاً مع الاحتياط من التخزين المؤقت
self.addEventListener('fetch', event => {
  // التعامل فقط مع طلبات GET
  if (event.request.method !== 'GET') return;
  
  // استبعاد طلبات API وطلبات البيانات الديناميكية
  if (event.request.url.includes('/api/') || event.request.url.includes('/data/')) {
    return;
  }
  
  const requestUrl = new URL(event.request.url);
  
  // استراتيجية مخصصة لملفات الوسائط والصور
  if (
    requestUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) ||
    requestUrl.pathname.includes('/images/') ||
    requestUrl.pathname.includes('/webfonts/')
  ) {
    return event.respondWith(cacheFirst(event.request, CACHE_NAMES.assets));
  }
  
  // استراتيجية الشبكة أولاً مع الاحتياط من التخزين المؤقت
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // تخزين نسخة من الاستجابة في التخزين المؤقت
        const clonedResponse = response.clone();
        
        caches.open(CACHE_NAMES.dynamic)
          .then(cache => {
            // تخزين الاستجابة في الذاكرة المؤقتة الديناميكية
            cache.put(event.request, clonedResponse)
              .then(() => {
                // تقييد حجم التخزين المؤقت الديناميكي
                limitCacheSize(CACHE_NAMES.dynamic, DYNAMIC_CACHE_SIZE);
              });
          });
        
        return response;
      })
      .catch(() => {
        // استخدام التخزين المؤقت إذا فشلت الشبكة
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // للطلبات HTML، قم بإرجاع صفحة عدم الاتصال
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline');
            }
            
            // في حالة فشل كل شيء، يمكننا إرجاع صورة بديلة للصور
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
              return caches.match('/static/images/offline-image.png');
            }
            
            // إرجاع استجابة فارغة إذا لم نتمكن من تقديم شيء آخر
            return new Response('', {
              status: 408,
              statusText: 'لا يوجد اتصال بالإنترنت'
            });
          });
      })
  );
});

// استراتيجية التخزين المؤقت أولاً
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    // في حالة الصور، يمكننا إرجاع صورة بديلة
    if (request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
      return caches.match('/static/images/offline-image.png');
    }
    
    throw error;
  }
}

// تقييد حجم التخزين المؤقت
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    // حذف العناصر الأقدم حتى يصبح عدد العناصر ضمن الحد
    await cache.delete(keys[0]);
    limitCacheSize(cacheName, maxItems);
  }
}

// الاستماع لرسائل من النافذة الرئيسية
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// الإشعارات المنبثقة
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: data.icon || '/static/images/notification-icon.png',
    badge: data.badge || '/static/images/badge-icon.png',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// التفاعل مع الإشعار المنبثق
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const url = event.notification.data.url;
  
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then(windowClients => {
        // إذا كانت النافذة مفتوحة بالفعل، ركز عليها
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // إذا لم تكن النافذة مفتوحة، افتح نافذة جديدة
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
