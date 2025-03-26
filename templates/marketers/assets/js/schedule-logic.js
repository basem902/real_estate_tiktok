/**
 * Real Estate TikTok - Marketers Dashboard
 * Schedule (Calendar) Logic
 * Version: 1.0.0
 */

// بيانات المواعيد التجريبية
let appointments = [
    {
        id: 1,
        title: "معاينة فيلا في حي النرجس",
        customerId: 1,
        customerName: "أحمد محمد",
        customerPhone: "0555123456",
        propertyId: "PROP-001",
        propertyType: "فيلا",
        location: "حي النرجس - شارع الأمير سلطان",
        start: "2025-03-24T10:00:00",
        end: "2025-03-24T11:30:00",
        notes: "العميل مهتم جداً ويريد معاينة المرافق بالتفصيل",
        status: "مؤكد",
        color: "#2ecc71" // أخضر
    },
    {
        id: 2,
        title: "اجتماع مع مستثمر عقاري",
        customerId: 3,
        customerName: "خالد العبدالله",
        customerPhone: "0555456789",
        propertyId: "PROP-010",
        propertyType: "أرض تجارية",
        location: "مكتب المبيعات الرئيسي",
        start: "2025-03-24T14:00:00",
        end: "2025-03-24T15:00:00",
        notes: "مناقشة فرص الاستثمار في القطاع التجاري",
        status: "مؤكد",
        color: "#2ecc71" // أخضر
    },
    {
        id: 3,
        title: "معاينة شقة في حي الياسمين",
        customerId: 2,
        customerName: "سارة علي",
        customerPhone: "0555789012",
        propertyId: "PROP-005",
        propertyType: "شقة",
        location: "حي الياسمين - مجمع الفردوس السكني",
        start: "2025-03-25T16:00:00",
        end: "2025-03-25T17:00:00",
        notes: "العميلة تبحث عن شقة لعائلة مكونة من 4 أفراد",
        status: "بانتظار التأكيد",
        color: "#f39c12" // برتقالي
    },
    {
        id: 4,
        title: "متابعة مع عميل محتمل",
        customerId: 5,
        customerName: "فهد العمر",
        customerPhone: "0555345678",
        propertyId: null,
        propertyType: "شقة",
        location: "اتصال هاتفي",
        start: "2025-03-26T09:30:00",
        end: "2025-03-26T10:00:00",
        notes: "متابعة بعد الزيارة الأولى واستكمال المناقشة حول خيارات التمويل",
        status: "مؤكد",
        color: "#2ecc71" // أخضر
    },
    {
        id: 5,
        title: "زيارة فيلا في حي الملقا",
        customerId: 4,
        customerName: "نورة سعد",
        customerPhone: "0555234567",
        propertyId: "PROP-007",
        propertyType: "فيلا",
        location: "حي الملقا - شارع الأمير محمد",
        start: "2025-03-27T11:00:00",
        end: "2025-03-27T12:30:00",
        notes: "العميلة مهتمة بالفيلا وتريد التأكد من مساحة الحديقة",
        status: "مؤكد",
        color: "#2ecc71" // أخضر
    }
];

// تهيئة التقويم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    setupEventListeners();
    loadUpcomingAppointments();
});

// تهيئة التقويم باستخدام FullCalendar
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    if (!calendarEl) return;
    
    // تحويل بيانات المواعيد إلى التنسيق المطلوب للتقويم
    const events = appointments.map(appointment => {
        return {
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            extendedProps: {
                customerId: appointment.customerId,
                customerName: appointment.customerName,
                propertyId: appointment.propertyId,
                propertyType: appointment.propertyType,
                location: appointment.location,
                notes: appointment.notes,
                status: appointment.status
            },
            backgroundColor: appointment.color,
            borderColor: appointment.color
        };
    });
    
    // إنشاء التقويم
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'ar',
        direction: 'rtl',
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        buttonText: {
            today: 'اليوم',
            month: 'شهر',
            week: 'أسبوع',
            day: 'يوم',
            list: 'قائمة'
        },
        events: events,
        height: 'auto',
        selectable: true,
        selectMirror: true,
        nowIndicator: true,
        dayMaxEvents: true,
        allDaySlot: false,
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        slotDuration: '00:30:00',
        navLinks: true,
        weekNumbers: true,
        weekNumberCalculation: 'ISO',
        editable: true,
        businessHours: {
            daysOfWeek: [0, 1, 2, 3, 4], // 0=الأحد, 1=الاثنين, ... 6=السبت
            startTime: '08:00',
            endTime: '17:00',
        },
        weekends: true,
        
        // الأحداث
        select: function(info) {
            openAppointmentModal(info);
        },
        eventClick: function(info) {
            openAppointmentModal(null, info.event);
        },
        eventDrop: function(info) {
            updateAppointmentTime(info.event);
        },
        eventResize: function(info) {
            updateAppointmentTime(info.event);
        }
    });
    
    calendar.render();
    
    // تخزين مرجع التقويم في متغير عام للوصول إليه لاحقاً
    window.calendarInstance = calendar;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمع لحدث حفظ الموعد
    const saveAppointmentBtn = document.getElementById('save-appointment');
    if (saveAppointmentBtn) {
        saveAppointmentBtn.addEventListener('click', saveAppointment);
    }
    
    // مستمع لحدث تغيير نوع الموعد
    const appointmentTypeSelect = document.getElementById('appointment-type');
    if (appointmentTypeSelect) {
        appointmentTypeSelect.addEventListener('change', updateLocationField);
    }
    
    // مستمع لحدث البحث في المواعيد القادمة
    const searchUpcomingInput = document.getElementById('search-upcoming');
    if (searchUpcomingInput) {
        searchUpcomingInput.addEventListener('input', function() {
            filterUpcomingAppointments(this.value);
        });
    }
    
    // مستمع لحدث تغيير وضع عرض التقويم
    const calendarViewButtons = document.querySelectorAll('.calendar-view-btn');
    calendarViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            if (window.calendarInstance && view) {
                window.calendarInstance.changeView(view);
                
                // تحديث حالة الأزرار النشطة
                calendarViewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // مستمع لحدث تصفية المواعيد حسب الحالة
    const statusFilter = document.getElementById('filter-status');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterCalendarEvents(this.value);
        });
    }
}

// فتح نافذة إضافة/تعديل موعد
function openAppointmentModal(selectionInfo = null, event = null) {
    // الحصول على مرجع النافذة
    const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    
    // إعادة تعيين النموذج
    resetAppointmentForm();
    
    if (event) {
        // تعديل موعد موجود
        fillAppointmentForm(event);
    } else if (selectionInfo) {
        // إضافة موعد جديد
        document.getElementById('appointment-start').value = formatDateTimeForInput(selectionInfo.start);
        document.getElementById('appointment-end').value = formatDateTimeForInput(selectionInfo.end);
    }
    
    // عرض النافذة
    appointmentModal.show();
}

// ملء نموذج الموعد بالبيانات
function fillAppointmentForm(event) {
    const appointment = appointments.find(a => a.id == event.id);
    
    if (!appointment) return;
    
    document.getElementById('appointment-id').value = appointment.id;
    document.getElementById('appointment-title').value = appointment.title;
    document.getElementById('appointment-customer').value = appointment.customerId;
    document.getElementById('appointment-property-type').value = appointment.propertyType;
    document.getElementById('appointment-property-id').value = appointment.propertyId || '';
    document.getElementById('appointment-type').value = appointment.location.includes('اتصال') ? 'call' : 'visit';
    document.getElementById('appointment-location').value = appointment.location;
    document.getElementById('appointment-start').value = formatDateTimeForInput(new Date(appointment.start));
    document.getElementById('appointment-end').value = formatDateTimeForInput(new Date(appointment.end));
    document.getElementById('appointment-status').value = appointment.status;
    document.getElementById('appointment-notes').value = appointment.notes;
    
    // تحديث عنوان النافذة
    document.getElementById('appointmentModalLabel').textContent = 'تعديل موعد';
    
    // تحديث حالة حقل الموقع
    updateLocationField();
}

// إعادة تعيين نموذج الموعد
function resetAppointmentForm() {
    document.getElementById('appointment-form').reset();
    document.getElementById('appointment-id').value = '';
    
    // تحديث عنوان النافذة
    document.getElementById('appointmentModalLabel').textContent = 'إضافة موعد جديد';
    
    // إعادة حقل الموقع إلى الحالة الافتراضية
    document.getElementById('location-field-group').classList.remove('d-none');
    document.getElementById('appointment-location').setAttribute('placeholder', 'أدخل عنوان الموقع');
}

// تحديث حالة حقل الموقع بناءً على نوع الموعد
function updateLocationField() {
    const appointmentType = document.getElementById('appointment-type').value;
    const locationField = document.getElementById('appointment-location');
    const locationFieldGroup = document.getElementById('location-field-group');
    
    if (appointmentType === 'call') {
        locationField.value = 'اتصال هاتفي';
        locationFieldGroup.classList.add('d-none');
    } else if (appointmentType === 'video') {
        locationField.value = 'اجتماع فيديو';
        locationFieldGroup.classList.add('d-none');
    } else {
        if (locationField.value === 'اتصال هاتفي' || locationField.value === 'اجتماع فيديو') {
            locationField.value = '';
        }
        locationFieldGroup.classList.remove('d-none');
        locationField.setAttribute('placeholder', appointmentType === 'office' ? 'أدخل موقع المكتب' : 'أدخل عنوان العقار');
    }
}

// حفظ بيانات الموعد
function saveAppointment() {
    const appointmentId = document.getElementById('appointment-id').value;
    const customerId = document.getElementById('appointment-customer').value;
    
    // العثور على معلومات العميل
    let customerName = "عميل جديد";
    let customerPhone = "غير متوفر";
    
    // البحث عن معلومات العميل (إذا كان متاحاً)
    if (window.customers && customerId) {
        const customer = window.customers.find(c => c.id == customerId);
        if (customer) {
            customerName = customer.name;
            customerPhone = customer.phone;
        }
    }
    
    const appointmentData = {
        title: document.getElementById('appointment-title').value,
        customerId: customerId ? parseInt(customerId) : null,
        customerName: customerName,
        customerPhone: customerPhone,
        propertyId: document.getElementById('appointment-property-id').value || null,
        propertyType: document.getElementById('appointment-property-type').value,
        location: document.getElementById('appointment-location').value,
        start: document.getElementById('appointment-start').value,
        end: document.getElementById('appointment-end').value,
        notes: document.getElementById('appointment-notes').value,
        status: document.getElementById('appointment-status').value,
        color: getStatusColor(document.getElementById('appointment-status').value)
    };
    
    if (appointmentId) {
        // تحديث موعد موجود
        appointmentData.id = parseInt(appointmentId);
        const index = appointments.findIndex(a => a.id == appointmentId);
        
        if (index !== -1) {
            appointments[index] = appointmentData;
        }
    } else {
        // إضافة موعد جديد
        appointmentData.id = Math.max(...appointments.map(a => a.id), 0) + 1;
        appointments.push(appointmentData);
    }
    
    // تحديث التقويم
    refreshCalendar();
    
    // تحديث قائمة المواعيد القادمة
    loadUpcomingAppointments();
    
    // إغلاق النافذة
    const modalElement = document.getElementById('appointmentModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    
    // عرض رسالة نجاح
    showNotification('تم حفظ الموعد بنجاح', 'success');
}

// تحديث وقت الموعد (بعد السحب أو تغيير الحجم)
function updateAppointmentTime(event) {
    const index = appointments.findIndex(a => a.id == event.id);
    
    if (index !== -1) {
        appointments[index].start = event.start.toISOString();
        appointments[index].end = event.end.toISOString();
        
        // تحديث قائمة المواعيد القادمة
        loadUpcomingAppointments();
        
        // عرض رسالة نجاح
        showNotification('تم تحديث وقت الموعد بنجاح', 'success');
    }
}

// تحديث التقويم
function refreshCalendar() {
    if (!window.calendarInstance) return;
    
    // إزالة جميع الأحداث
    window.calendarInstance.removeAllEvents();
    
    // إضافة الأحداث المحدثة
    const events = appointments.map(appointment => {
        return {
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            extendedProps: {
                customerId: appointment.customerId,
                customerName: appointment.customerName,
                propertyId: appointment.propertyId,
                propertyType: appointment.propertyType,
                location: appointment.location,
                notes: appointment.notes,
                status: appointment.status
            },
            backgroundColor: appointment.color,
            borderColor: appointment.color
        };
    });
    
    // إضافة الأحداث إلى التقويم
    window.calendarInstance.addEventSource(events);
}

// تصفية أحداث التقويم حسب الحالة
function filterCalendarEvents(status) {
    if (!window.calendarInstance) return;
    
    // إزالة جميع الأحداث
    window.calendarInstance.removeAllEvents();
    
    // تصفية المواعيد حسب الحالة
    let filteredAppointments = appointments;
    if (status && status !== 'all') {
        filteredAppointments = appointments.filter(a => a.status === status);
    }
    
    // إضافة الأحداث المصفاة
    const events = filteredAppointments.map(appointment => {
        return {
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            extendedProps: {
                customerId: appointment.customerId,
                customerName: appointment.customerName,
                propertyId: appointment.propertyId,
                propertyType: appointment.propertyType,
                location: appointment.location,
                notes: appointment.notes,
                status: appointment.status
            },
            backgroundColor: appointment.color,
            borderColor: appointment.color
        };
    });
    
    // إضافة الأحداث إلى التقويم
    window.calendarInstance.addEventSource(events);
}

// تحميل المواعيد القادمة
function loadUpcomingAppointments() {
    const upcomingContainer = document.getElementById('upcoming-appointments');
    
    if (!upcomingContainer) return;
    
    // الحصول على التاريخ الحالي
    const now = new Date();
    
    // تصفية المواعيد القادمة خلال الأسبوع القادم
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    
    const upcomingAppointments = appointments
        .filter(a => new Date(a.start) >= now && new Date(a.start) <= nextWeek)
        .sort((a, b) => new Date(a.start) - new Date(b.start));
    
    // تحديث عدد المواعيد القادمة
    document.getElementById('upcoming-count').textContent = upcomingAppointments.length;
    
    // عرض المواعيد القادمة
    upcomingContainer.innerHTML = '';
    
    if (upcomingAppointments.length === 0) {
        upcomingContainer.innerHTML = '<div class="text-center p-4"><p class="text-muted">لا توجد مواعيد قادمة خلال الأسبوع القادم</p></div>';
        return;
    }
    
    upcomingAppointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.start);
        const isToday = isSameDay(appointmentDate, now);
        
        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'upcoming-appointment p-3 mb-3 position-relative';
        appointmentElement.style.borderRight = `4px solid ${appointment.color}`;
        appointmentElement.dataset.id = appointment.id;
        
        appointmentElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="mb-0">${appointment.title}</h6>
                <span class="badge ${getStatusBadgeClass(appointment.status)}">${appointment.status}</span>
            </div>
            <div class="mb-2">
                <i class="fas fa-clock me-2 text-muted"></i>
                <span>${isToday ? 'اليوم' : formatDate(appointmentDate)} ${formatTime(appointmentDate)}</span>
            </div>
            <div class="mb-2">
                <i class="fas fa-user me-2 text-muted"></i>
                <span>${appointment.customerName}</span>
            </div>
            <div>
                <i class="fas fa-map-marker-alt me-2 text-muted"></i>
                <span>${appointment.location}</span>
            </div>
            <div class="mt-2 d-flex">
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editAppointment(${appointment.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-success me-2" onclick="confirmAppointment(${appointment.id})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-outline-info" onclick="callCustomer('${appointment.customerPhone}')">
                    <i class="fas fa-phone"></i>
                </button>
            </div>
        `;
        
        upcomingContainer.appendChild(appointmentElement);
    });
}

// تصفية المواعيد القادمة حسب النص
function filterUpcomingAppointments(searchText) {
    const upcomingItems = document.querySelectorAll('.upcoming-appointment');
    
    if (!searchText) {
        upcomingItems.forEach(item => item.style.display = 'block');
        return;
    }
    
    const searchLower = searchText.toLowerCase();
    
    upcomingItems.forEach(item => {
        const id = item.dataset.id;
        const appointment = appointments.find(a => a.id == id);
        
        if (!appointment) return;
        
        const matchesSearch = 
            appointment.title.toLowerCase().includes(searchLower) ||
            appointment.customerName.toLowerCase().includes(searchLower) ||
            appointment.location.toLowerCase().includes(searchLower) ||
            appointment.propertyType.toLowerCase().includes(searchLower);
        
        item.style.display = matchesSearch ? 'block' : 'none';
    });
}

// تحرير موعد
function editAppointment(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (!appointment) return;
    
    // إنشاء كائن حدث وهمي لاستخدامه في ملء النموذج
    const fakeEvent = {
        id: appointment.id,
        title: appointment.title
    };
    
    // فتح نافذة تعديل الموعد
    openAppointmentModal(null, fakeEvent);
}

// تأكيد موعد
function confirmAppointment(appointmentId) {
    const index = appointments.findIndex(a => a.id === appointmentId);
    
    if (index !== -1) {
        appointments[index].status = 'مؤكد';
        appointments[index].color = getStatusColor('مؤكد');
        
        // تحديث التقويم
        refreshCalendar();
        
        // تحديث قائمة المواعيد القادمة
        loadUpcomingAppointments();
        
        // عرض رسالة نجاح
        showNotification('تم تأكيد الموعد بنجاح', 'success');
    }
}

// اتصال بالعميل
function callCustomer(phoneNumber) {
    // في التطبيق الحقيقي، يمكن تنفيذ وظيفة الاتصال هنا
    alert(`جاري الاتصال بالرقم: ${phoneNumber}`);
}

// الحصول على لون حالة الموعد
function getStatusColor(status) {
    switch(status) {
        case 'مؤكد':
            return '#2ecc71'; // أخضر
        case 'بانتظار التأكيد':
            return '#f39c12'; // برتقالي
        case 'ملغي':
            return '#e74c3c'; // أحمر
        default:
            return '#3498db'; // أزرق
    }
}

// الحصول على فئة شارة الحالة
function getStatusBadgeClass(status) {
    switch(status) {
        case 'مؤكد':
            return 'bg-success';
        case 'بانتظار التأكيد':
            return 'bg-warning';
        case 'ملغي':
            return 'bg-danger';
        default:
            return 'bg-info';
    }
}

// التحقق ما إذا كان التاريخان في نفس اليوم
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// تنسيق التاريخ
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
}

// تنسيق الوقت
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('ar-SA', options);
}

// تنسيق التاريخ والوقت لحقول الإدخال
function formatDateTimeForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// عرض إشعار للمستخدم
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
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
    
    document.getElementById('notification-container').appendChild(notification);
    
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
