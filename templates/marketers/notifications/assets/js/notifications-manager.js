/**
 * notifications-manager.js
 * وظائف إدارة وعرض الإشعارات في الواجهة
 */

window.notificationsManager = (function() {
    // الإشارة إلى بيانات الإشعارات
    const notificationsData = window.notificationsData;
    
    // عناصر DOM الرئيسية
    let notificationsBell;
    let notificationsCounter;
    let notificationsDropdown;
    let notificationsPanel;
    let notificationsContainer;
    let notificationsTabContent;
    
    // تهيئة مدير الإشعارات
    function initialize() {
        // تحديد عناصر DOM
        notificationsBell = document.getElementById('notificationsBell');
        notificationsCounter = document.getElementById('notificationsCounter');
        notificationsDropdown = document.getElementById('notificationsDropdown');
        notificationsPanel = document.getElementById('notificationsPanel');
        
        if (notificationsPanel) {
            notificationsContainer = notificationsPanel.querySelector('.notifications-container');
            notificationsTabContent = notificationsPanel.querySelector('.tab-content');
        }
        
        // إضافة مستمعي الأحداث
        if (notificationsBell) {
            notificationsBell.addEventListener('click', handleBellClick);
        }
        
        // تحديث عداد الإشعارات عند التحميل
        updateNotificationsCounter();
        
        // إذا كنا في صفحة لوحة الإشعارات، قم بتحميل الإشعارات
        if (window.location.pathname.includes('notifications-panel.html')) {
            renderNotificationsPanel();
        } else {
            // قم بتحميل الإشعارات القصيرة فقط
            renderNotificationsDropdown();
        }
        
        // إعداد الخاصية للتحديث التلقائي للإشعارات كل دقيقة
        setInterval(checkForNewNotifications, 60000);
    }
    
    // التعامل مع النقر على زر الإشعارات
    function handleBellClick(event) {
        event.stopPropagation();
        
        if (notificationsDropdown) {
            notificationsDropdown.classList.toggle('show');
            
            // إذا تم فتح القائمة المنسدلة، قم بتحديث الإشعارات
            if (notificationsDropdown.classList.contains('show')) {
                renderNotificationsDropdown();
            }
        }
    }
    
    // تحديث عداد الإشعارات
    function updateNotificationsCounter() {
        const unreadCount = notificationsData.getUnreadNotifications().length;
        
        if (notificationsCounter) {
            notificationsCounter.textContent = unreadCount > 99 ? '99+' : unreadCount;
            notificationsCounter.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    // عرض الإشعارات في القائمة المنسدلة
    function renderNotificationsDropdown() {
        if (!notificationsDropdown) return;
        
        const notifications = notificationsData.getUnreadNotifications().slice(0, 5);
        const dropdownContainer = notificationsDropdown.querySelector('.notifications-dropdown-container');
        
        if (dropdownContainer) {
            // تفريغ الحاوية
            dropdownContainer.innerHTML = '';
            
            if (notifications.length === 0) {
                dropdownContainer.innerHTML = `
                    <div class="no-notifications">
                        <i class="fas fa-check-circle"></i>
                        <p>لا توجد إشعارات جديدة</p>
                    </div>
                `;
            } else {
                // إضافة الإشعارات
                notifications.forEach(notification => {
                    const notificationElement = createNotificationElement(notification, 'dropdown');
                    dropdownContainer.appendChild(notificationElement);
                });
                
                // إضافة زر "عرض الكل"
                const viewAllButton = document.createElement('div');
                viewAllButton.className = 'view-all-button';
                viewAllButton.innerHTML = '<a href="notifications-panel.html">عرض جميع الإشعارات</a>';
                dropdownContainer.appendChild(viewAllButton);
            }
        }
    }
    
    // عرض الإشعارات في لوحة الإشعارات الكاملة
    function renderNotificationsPanel() {
        if (!notificationsPanel) return;
        
        // تحديث العدادات
        updateTabCounters();
        
        // تحميل الإشعارات حسب التبويب النشط
        const activeTab = notificationsPanel.querySelector('.nav-link.active');
        if (activeTab) {
            const tabId = activeTab.getAttribute('data-tab');
            loadNotificationsByTab(tabId);
        } else {
            // افتراضيًا، قم بتحميل جميع الإشعارات
            loadNotificationsByTab('all');
        }
    }
    
    // تحديث عدادات التبويبات
    function updateTabCounters() {
        if (!notificationsPanel) return;
        
        const allTab = notificationsPanel.querySelector('[data-tab="all"] .badge');
        const unreadTab = notificationsPanel.querySelector('[data-tab="unread"] .badge');
        const importantTab = notificationsPanel.querySelector('[data-tab="important"] .badge');
        
        if (allTab) {
            allTab.textContent = notificationsData.getAllNotifications().length;
        }
        
        if (unreadTab) {
            unreadTab.textContent = notificationsData.getUnreadNotifications().length;
        }
        
        if (importantTab) {
            const importantNotifications = notificationsData.getAllNotifications().filter(
                n => n.priority === notificationsData.PRIORITIES.HIGH || 
                     n.priority === notificationsData.PRIORITIES.URGENT
            );
            importantTab.textContent = importantNotifications.length;
        }
    }
    
    // تحميل الإشعارات حسب التبويب المحدد
    function loadNotificationsByTab(tabId) {
        if (!notificationsContainer) return;
        
        // تفريغ الحاوية
        notificationsContainer.innerHTML = '';
        
        let notifications;
        
        switch (tabId) {
            case 'unread':
                notifications = notificationsData.getUnreadNotifications();
                break;
            case 'important':
                notifications = notificationsData.getAllNotifications().filter(
                    n => n.priority === notificationsData.PRIORITIES.HIGH || 
                         n.priority === notificationsData.PRIORITIES.URGENT
                );
                break;
            case 'tasks':
                notifications = notificationsData.getNotificationsByType(notificationsData.TYPES.TASK);
                break;
            case 'meetings':
                notifications = notificationsData.getNotificationsByType(notificationsData.TYPES.MEETING);
                break;
            case 'system':
                notifications = notificationsData.getAllNotifications().filter(
                    n => n.source === notificationsData.SOURCES.SYSTEM || 
                         n.source === notificationsData.SOURCES.ADMIN
                );
                break;
            case 'archived':
                notifications = notificationsData.getAllNotifications().filter(
                    n => n.status === notificationsData.STATUS.ARCHIVED
                );
                break;
            case 'all':
            default:
                notifications = notificationsData.getAllNotifications();
                break;
        }
        
        if (notifications.length === 0) {
            notificationsContainer.innerHTML = `
                <div class="no-notifications">
                    <i class="fas fa-bell-slash"></i>
                    <p>لا توجد إشعارات في هذه الفئة</p>
                </div>
            `;
        } else {
            // تجميع الإشعارات حسب التاريخ
            const groupedNotifications = groupNotificationsByDate(notifications);
            
            // إنشاء عناصر الإشعارات المجمعة
            Object.keys(groupedNotifications).forEach(date => {
                const dateGroup = document.createElement('div');
                dateGroup.className = 'notifications-date-group';
                
                const dateHeader = document.createElement('div');
                dateHeader.className = 'date-header';
                dateHeader.textContent = formatGroupDate(date);
                dateGroup.appendChild(dateHeader);
                
                const notificationsList = document.createElement('div');
                notificationsList.className = 'notifications-list';
                
                groupedNotifications[date].forEach(notification => {
                    const notificationElement = createNotificationElement(notification, 'panel');
                    notificationsList.appendChild(notificationElement);
                });
                
                dateGroup.appendChild(notificationsList);
                notificationsContainer.appendChild(dateGroup);
            });
        }
    }
    
    // تجميع الإشعارات حسب التاريخ
    function groupNotificationsByDate(notifications) {
        return notifications.reduce((groups, notification) => {
            const date = new Date(notification.dateCreated).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(notification);
            return groups;
        }, {});
    }
    
    // تنسيق تاريخ المجموعة
    function formatGroupDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'اليوم';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'الأمس';
        } else {
            // تنسيق التاريخ بالعربية
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('ar-SA', options);
        }
    }
    
    // إنشاء عنصر الإشعار
    function createNotificationElement(notification, type = 'dropdown') {
        const element = document.createElement('div');
        element.className = `notification-item ${notification.status} ${notification.priority}`;
        element.dataset.id = notification.id;
        
        // تحديد لون الأيقونة حسب نوع الإشعار
        let iconColor;
        switch (notification.type) {
            case notificationsData.TYPES.SUCCESS:
                iconColor = 'var(--success-color)';
                break;
            case notificationsData.TYPES.WARNING:
                iconColor = 'var(--warning-color)';
                break;
            case notificationsData.TYPES.DANGER:
                iconColor = 'var(--danger-color)';
                break;
            case notificationsData.TYPES.INFO:
                iconColor = 'var(--info-color)';
                break;
            case notificationsData.TYPES.TASK:
                iconColor = 'var(--primary-color)';
                break;
            case notificationsData.TYPES.MEETING:
                iconColor = 'var(--secondary-color)';
                break;
            default:
                iconColor = 'var(--primary-color)';
        }
        
        // تحديد نص الأولوية
        let priorityText = '';
        if (notification.priority === notificationsData.PRIORITIES.URGENT) {
            priorityText = '<span class="priority-badge urgent">عاجل</span>';
        } else if (notification.priority === notificationsData.PRIORITIES.HIGH) {
            priorityText = '<span class="priority-badge high">مهم</span>';
        }
        
        // تنسيق الوقت
        const timeFormatted = formatNotificationTime(notification.dateCreated);
        
        // محتوى مختلف حسب نوع العرض
        if (type === 'dropdown') {
            element.innerHTML = `
                <div class="notification-icon" style="background-color: ${iconColor}">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-header">
                        <h6 class="notification-title">${notification.title} ${priorityText}</h6>
                        <span class="notification-time">${timeFormatted}</span>
                    </div>
                    <p class="notification-text">${notification.content.substring(0, 60)}${notification.content.length > 60 ? '...' : ''}</p>
                </div>
            `;
        } else {
            element.innerHTML = `
                <div class="notification-icon" style="background-color: ${iconColor}">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-header">
                        <h6 class="notification-title">${notification.title} ${priorityText}</h6>
                        <span class="notification-time">${timeFormatted}</span>
                    </div>
                    <p class="notification-text">${notification.content}</p>
                    <div class="notification-footer">
                        <div class="notification-source">
                            <span class="badge source-badge ${notification.source}">${getSourceName(notification.source)}</span>
                        </div>
                        <div class="notification-actions">
                            ${notification.link ? `<a href="${notification.link}" class="btn btn-sm btn-link">فتح</a>` : ''}
                            <button class="btn btn-sm btn-outline-secondary mark-read" data-id="${notification.id}">
                                ${notification.status === notificationsData.STATUS.UNREAD ? 'تحديد كمقروء' : 'تحديد كغير مقروء'}
                            </button>
                            <button class="btn btn-sm btn-outline-secondary archive" data-id="${notification.id}">
                                ${notification.status === notificationsData.STATUS.ARCHIVED ? 'إلغاء الأرشفة' : 'أرشفة'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // إضافة مستمعي الأحداث للأزرار
            setTimeout(() => {
                const markReadBtn = element.querySelector('.mark-read');
                if (markReadBtn) {
                    markReadBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        toggleReadStatus(notification.id);
                    });
                }
                
                const archiveBtn = element.querySelector('.archive');
                if (archiveBtn) {
                    archiveBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        toggleArchiveStatus(notification.id);
                    });
                }
            }, 0);
        }
        
        // إضافة مستمع النقر على الإشعار نفسه
        element.addEventListener('click', () => {
            handleNotificationClick(notification);
        });
        
        return element;
    }
    
    // الحصول على اسم المصدر
    function getSourceName(source) {
        switch (source) {
            case notificationsData.SOURCES.CRM:
                return 'إدارة العملاء';
            case notificationsData.SOURCES.SALES:
                return 'المبيعات';
            case notificationsData.SOURCES.MARKETING:
                return 'التسويق';
            case notificationsData.SOURCES.TASK:
                return 'المهام';
            case notificationsData.SOURCES.APPOINTMENT:
                return 'المواعيد';
            case notificationsData.SOURCES.SYSTEM:
                return 'النظام';
            case notificationsData.SOURCES.ADMIN:
                return 'الإدارة';
            default:
                return source;
        }
    }
    
    // تنسيق وقت الإشعار
    function formatNotificationTime(dateCreated) {
        const notificationDate = new Date(dateCreated);
        const now = new Date();
        const diffTime = Math.abs(now - notificationDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
        if (diffMinutes < 1) {
            return 'الآن';
        } else if (diffMinutes < 60) {
            return `منذ ${diffMinutes} دقيقة`;
        } else if (diffHours < 24) {
            return `منذ ${diffHours} ساعة`;
        } else if (diffDays < 7) {
            return `منذ ${diffDays} يوم`;
        } else {
            return notificationDate.toLocaleDateString('ar-SA');
        }
    }
    
    // معالجة النقر على الإشعار
    function handleNotificationClick(notification) {
        // إذا كان الإشعار غير مقروء، قم بتعيينه كمقروء
        if (notification.status === notificationsData.STATUS.UNREAD) {
            notificationsData.updateNotificationStatus(notification.id, notificationsData.STATUS.READ);
            updateNotificationsCounter();
            
            // تحديث واجهة المستخدم
            if (window.location.pathname.includes('notifications-panel.html')) {
                renderNotificationsPanel();
            } else {
                renderNotificationsDropdown();
            }
        }
        
        // إذا كان هناك رابط، انتقل إليه
        if (notification.link) {
            window.location.href = notification.link;
        }
    }
    
    // تبديل حالة القراءة
    function toggleReadStatus(id) {
        const notification = notificationsData.getAllNotifications().find(n => n.id === parseInt(id));
        if (notification) {
            const newStatus = notification.status === notificationsData.STATUS.UNREAD 
                ? notificationsData.STATUS.READ 
                : notificationsData.STATUS.UNREAD;
            
            notificationsData.updateNotificationStatus(parseInt(id), newStatus);
            updateNotificationsCounter();
            renderNotificationsPanel();
        }
    }
    
    // تبديل حالة الأرشفة
    function toggleArchiveStatus(id) {
        const notification = notificationsData.getAllNotifications().find(n => n.id === parseInt(id));
        if (notification) {
            const newStatus = notification.status === notificationsData.STATUS.ARCHIVED 
                ? notificationsData.STATUS.READ 
                : notificationsData.STATUS.ARCHIVED;
            
            notificationsData.updateNotificationStatus(parseInt(id), newStatus);
            updateNotificationsCounter();
            renderNotificationsPanel();
        }
    }
    
    // التحقق من وجود إشعارات جديدة (في التطبيق الحقيقي سيتصل بالخادم)
    function checkForNewNotifications() {
        // هذه الدالة تحاكي استلام إشعار جديد كل 5 دقائق تقريبًا
        // في التطبيق الحقيقي سيتم استبدالها بطلب إلى الخادم
        
        // بفرصة 20% أضف إشعارًا جديدًا (للعرض التوضيحي فقط)
        if (Math.random() < 0.2) {
            const randomNotification = createRandomNotification();
            notificationsData.addNotification(randomNotification);
            updateNotificationsCounter();
            
            // عرض إشعار منبثق
            showToast(randomNotification);
            
            // تحديث واجهة المستخدم
            if (window.location.pathname.includes('notifications-panel.html')) {
                renderNotificationsPanel();
            }
        }
    }
    
    // إنشاء إشعار عشوائي للعرض التوضيحي
    function createRandomNotification() {
        const types = Object.values(notificationsData.TYPES);
        const priorities = Object.values(notificationsData.PRIORITIES);
        const sources = Object.values(notificationsData.SOURCES);
        
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        const randomSource = sources[Math.floor(Math.random() * sources.length)];
        
        let title, content, icon, link;
        
        switch (randomType) {
            case notificationsData.TYPES.TASK:
                title = 'مهمة جديدة تم تعيينها لك';
                content = 'تم تعيين مهمة جديدة لك من قبل المدير. يرجى مراجعتها في أقرب وقت.';
                icon = 'fas fa-tasks';
                link = '../tasks/task-details.html?id=new';
                break;
            case notificationsData.TYPES.MEETING:
                title = 'موعد جديد في الجدول';
                content = 'تم إضافة موعد جديد إلى جدولك ليوم غد الساعة 11:00 صباحًا.';
                icon = 'fas fa-calendar-check';
                link = '../schedule/calendar-view.html?date=tomorrow';
                break;
            case notificationsData.TYPES.MESSAGE:
                title = 'رسالة جديدة من العميل';
                content = 'لديك رسالة جديدة من أحد العملاء بخصوص استفسار عن عقار.';
                icon = 'fas fa-envelope';
                link = '../inbox/messages.html';
                break;
            default:
                title = 'تحديث من النظام';
                content = 'تم تحديث معلومات النظام. يرجى مراجعة التغييرات الجديدة.';
                icon = 'fas fa-info-circle';
                link = '../settings/system-updates.html';
        }
        
        return {
            type: randomType,
            priority: randomPriority,
            title,
            content,
            dateExpiry: new Date(Date.now() + 604800000).toISOString(), // أسبوع من الآن
            source: randomSource,
            link,
            icon
        };
    }
    
    // عرض إشعار توست منبثق
    function showToast(notification) {
        // التحقق من وجود عنصر الـ toasts container
        let toastsContainer = document.querySelector('.toasts-container');
        
        if (!toastsContainer) {
            toastsContainer = document.createElement('div');
            toastsContainer.className = 'toasts-container';
            document.body.appendChild(toastsContainer);
        }
        
        // إنشاء عنصر التوست
        const toast = document.createElement('div');
        toast.className = `toast ${notification.priority}`;
        
        // تحديد لون الأيقونة حسب نوع الإشعار
        let iconColor;
        switch (notification.type) {
            case notificationsData.TYPES.SUCCESS:
                iconColor = 'var(--success-color)';
                break;
            case notificationsData.TYPES.WARNING:
                iconColor = 'var(--warning-color)';
                break;
            case notificationsData.TYPES.DANGER:
                iconColor = 'var(--danger-color)';
                break;
            case notificationsData.TYPES.INFO:
                iconColor = 'var(--info-color)';
                break;
            default:
                iconColor = 'var(--primary-color)';
        }
        
        toast.innerHTML = `
            <div class="toast-icon" style="background-color: ${iconColor}">
                <i class="${notification.icon}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-header">
                    <h6 class="toast-title">${notification.title}</h6>
                    <button class="toast-close">&times;</button>
                </div>
                <p class="toast-text">${notification.content.substring(0, 100)}${notification.content.length > 100 ? '...' : ''}</p>
            </div>
        `;
        
        // إضافة مستمع حدث للإغلاق
        const closeButton = toast.querySelector('.toast-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                toast.classList.add('hiding');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            });
        }
        
        // إضافة مستمع النقر على التوست نفسه
        toast.addEventListener('click', () => {
            if (notification.link) {
                window.location.href = notification.link;
            }
        });
        
        // إضافة التوست إلى الحاوية
        toastsContainer.appendChild(toast);
        
        // إظهار التوست بتأثير
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // إخفاء التوست تلقائيًا بعد 5 ثوانٍ
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
    
    // تصدير الواجهة العامة
    return {
        initialize,
        updateNotificationsCounter,
        renderNotificationsDropdown,
        renderNotificationsPanel,
        showToast
    };
})();
