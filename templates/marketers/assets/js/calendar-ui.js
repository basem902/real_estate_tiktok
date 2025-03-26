/**
 * calendar-ui.js
 * ملف إدارة واجهة المستخدم لشاشة جدولة المواعيد
 */

window.calendarUI = (function() {
    // إعدادات التقويم
    let calendar;
    let currentView = 'dayGridMonth';
    let activeAppointment = null;
    
    // تهيئة التقويم
    function initCalendar() {
        // الحصول على لغة المتصفح
        const lang = 'ar';
        
        // الحصول على عنصر التقويم
        const calendarEl = document.getElementById('calendar');
        
        if (!calendarEl) {
            console.error('لم يتم العثور على عنصر التقويم!');
            return;
        }
        
        // إنشاء كائن التقويم
        calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            initialView: currentView,
            locale: lang,
            direction: 'rtl',
            themeSystem: 'bootstrap5',
            height: 'auto',
            allDaySlot: false,
            nowIndicator: true,
            dayMaxEvents: true,
            navLinks: true,
            weekNumbers: false,
            editable: true,
            selectable: true,
            selectMirror: true,
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false
            },
            businessHours: {
                daysOfWeek: [0, 1, 2, 3, 4], // 0=الأحد, 1=الإثنين, ..., 6=السبت
                startTime: '08:00',
                endTime: '18:00',
            },
            slotMinTime: '08:00',
            slotMaxTime: '18:00',
            
            // التعامل مع النقر على يوم معين لإضافة موعد
            select: function(info) {
                openAppointmentModal({
                    start: info.startStr,
                    end: info.endStr
                });
                calendar.unselect();
            },
            
            // التعامل مع النقر على موعد
            eventClick: function(info) {
                const appointmentId = parseInt(info.event.id);
                const appointment = window.calendarData.getAppointmentById(appointmentId);
                
                if (appointment) {
                    openAppointmentModal(appointment, true);
                }
            },
            
            // التعامل مع تحريك المواعيد أو تغيير حجمها
            eventDrop: function(info) {
                updateAppointmentDates(info);
            },
            eventResize: function(info) {
                updateAppointmentDates(info);
            },
            
            // تخصيص محتوى الموعد
            eventContent: function(info) {
                const eventTitle = info.event.title;
                const timeText = info.timeText;
                
                return {
                    html: `
                        <div class="fc-content">
                            <div class="fc-time">${timeText}</div>
                            <div class="fc-title">${eventTitle}</div>
                        </div>
                    `
                };
            }
        });
        
        // عرض التقويم
        calendar.render();
        
        // تحميل المواعيد
        loadAppointments();
        
        // تحميل المواعيد القادمة في الشريط الجانبي
        loadUpcomingAppointments();
        
        // إضافة مستمعي الأحداث للعناصر الأخرى
        setupEventListeners();
    }
    
    // تحميل المواعيد من مصدر البيانات
    function loadAppointments() {
        const appointments = window.calendarData.getAllAppointments();
        
        // تحويل البيانات إلى تنسيق مناسب للتقويم
        const events = appointments.map(appt => ({
            id: appt.id.toString(),
            title: appt.title,
            start: appt.start,
            end: appt.end,
            color: appt.color,
            extendedProps: {
                description: appt.description,
                location: appt.location,
                customerId: appt.customerId,
                customerName: appt.customerName,
                propertyId: appt.propertyId,
                propertyTitle: appt.propertyTitle,
                type: appt.type,
                status: appt.status,
                notes: appt.notes
            }
        }));
        
        // إضافة المواعيد إلى التقويم
        calendar.removeAllEvents();
        events.forEach(event => calendar.addEvent(event));
    }
    
    // تحميل المواعيد القادمة في الشريط الجانبي
    function loadUpcomingAppointments() {
        const upcomingAppointments = window.calendarData.getUpcomingAppointments(5);
        const upcomingContainer = document.getElementById('upcoming-appointments');
        
        if (!upcomingContainer) {
            console.error('لم يتم العثور على حاوية المواعيد القادمة!');
            return;
        }
        
        upcomingContainer.innerHTML = '';
        
        if (upcomingAppointments.length === 0) {
            upcomingContainer.innerHTML = `
                <div class="text-center py-4">
                    <p class="text-muted">لا توجد مواعيد قادمة</p>
                </div>
            `;
            return;
        }
        
        upcomingAppointments.forEach(appt => {
            const apptDate = new Date(appt.start);
            const formattedDate = apptDate.toLocaleDateString('ar-SA', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            });
            
            const formattedTime = apptDate.toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            const customerInfo = appt.customerName 
                ? `<div class="d-flex align-items-center mb-1">
                    <i class="fas fa-user text-muted me-2"></i>
                    <span>${appt.customerName}</span>
                   </div>`
                : '';
                
            const locationInfo = appt.location
                ? `<div class="d-flex align-items-center mb-1">
                    <i class="fas fa-map-marker-alt text-muted me-2"></i>
                    <span>${appt.location}</span>
                   </div>`
                : '';
            
            const statusBadge = getStatusBadge(appt.status);
            
            const appointmentCard = document.createElement('div');
            appointmentCard.className = 'upcoming-appointment p-3 mb-3';
            appointmentCard.innerHTML = `
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="mb-0">${appt.title}</h6>
                    ${statusBadge}
                </div>
                <div class="d-flex align-items-center mb-2">
                    <i class="far fa-calendar text-muted me-2"></i>
                    <span>${formattedDate}</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <i class="far fa-clock text-muted me-2"></i>
                    <span>${formattedTime}</span>
                </div>
                ${customerInfo}
                ${locationInfo}
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary view-appointment" data-id="${appt.id}">
                        <i class="far fa-eye"></i> عرض التفاصيل
                    </button>
                </div>
            `;
            
            upcomingContainer.appendChild(appointmentCard);
        });
        
        // إضافة مستمعي الأحداث لأزرار عرض التفاصيل
        document.querySelectorAll('.view-appointment').forEach(btn => {
            btn.addEventListener('click', function() {
                const appointmentId = parseInt(this.dataset.id);
                const appointment = window.calendarData.getAppointmentById(appointmentId);
                
                if (appointment) {
                    openAppointmentModal(appointment, true);
                }
            });
        });
    }

    // إضافة شارة الحالة بالألوان المناسبة
    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        
        switch (status) {
            case 'مؤكد':
                badgeClass = 'bg-success';
                break;
            case 'في انتظار التأكيد':
                badgeClass = 'bg-warning text-dark';
                break;
            case 'ملغي':
                badgeClass = 'bg-danger';
                break;
            case 'تم إعادة جدولته':
                badgeClass = 'bg-info text-dark';
                break;
            case 'تم الانتهاء':
                badgeClass = 'bg-primary';
                break;
        }
        
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }
    
    // فتح نافذة إضافة/تعديل موعد
    function openAppointmentModal(appointment, isEdit = false) {
        const modal = new bootstrap.Modal(document.getElementById('appointmentModal'));
        const modalTitle = document.getElementById('appointmentModalLabel');
        const form = document.getElementById('appointment-form');
        
        if (!modal || !modalTitle || !form) {
            console.error('لم يتم العثور على عناصر النافذة المنبثقة!');
            return;
        }
        
        // تحديث عنوان النافذة
        modalTitle.textContent = isEdit ? 'تعديل الموعد' : 'إضافة موعد جديد';
        
        // الاحتفاظ بالموعد النشط
        activeAppointment = appointment;
        
        // ملء النموذج بالبيانات
        document.getElementById('appointment-id').value = isEdit ? appointment.id : '';
        document.getElementById('appointment-title').value = isEdit ? appointment.title : '';
        document.getElementById('appointment-description').value = isEdit ? appointment.description : '';
        
        // تحديد التاريخ والوقت
        const startDate = isEdit ? new Date(appointment.start) : new Date(appointment.start || '');
        const endDate = isEdit ? new Date(appointment.end) : new Date(appointment.end || '');
        
        // تنسيق التاريخ والوقت للحقول
        const startDateStr = startDate.toISOString().split('T')[0];
        const startTimeStr = startDate.toTimeString().substr(0, 5);
        const endDateStr = endDate.toISOString().split('T')[0];
        const endTimeStr = endDate.toTimeString().substr(0, 5);
        
        document.getElementById('appointment-start-date').value = startDateStr;
        document.getElementById('appointment-start-time').value = startTimeStr;
        document.getElementById('appointment-end-date').value = endDateStr;
        document.getElementById('appointment-end-time').value = endTimeStr;
        
        // تعبئة بقية البيانات
        document.getElementById('appointment-location').value = isEdit ? appointment.location || '' : '';
        document.getElementById('appointment-customer').value = isEdit ? appointment.customerName || '' : '';
        document.getElementById('appointment-customer-phone').value = isEdit ? appointment.customerPhone || '' : '';
        document.getElementById('appointment-property').value = isEdit ? appointment.propertyTitle || '' : '';
        document.getElementById('appointment-notes').value = isEdit ? appointment.notes || '' : '';
        
        // تعبئة القوائم المنسدلة
        fillDropdowns(isEdit ? appointment : null);
        
        // إظهار زر الحذف للمواعيد الموجودة فقط
        const deleteButton = document.getElementById('delete-appointment');
        if (deleteButton) {
            deleteButton.style.display = isEdit ? 'block' : 'none';
        }
        
        // عرض النافذة المنبثقة
        modal.show();
    }
    
    // ملء القوائم المنسدلة بالبيانات
    function fillDropdowns(appointment = null) {
        // ملء قائمة أنواع المواعيد
        const typeSelect = document.getElementById('appointment-type');
        if (typeSelect) {
            typeSelect.innerHTML = '';
            window.calendarData.getAppointmentTypes().forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                typeSelect.appendChild(option);
            });
            
            if (appointment && appointment.type) {
                typeSelect.value = appointment.type;
            }
        }
        
        // ملء قائمة حالات المواعيد
        const statusSelect = document.getElementById('appointment-status');
        if (statusSelect) {
            statusSelect.innerHTML = '';
            window.calendarData.getAppointmentStatuses().forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                statusSelect.appendChild(option);
            });
            
            if (appointment && appointment.status) {
                statusSelect.value = appointment.status;
            }
        }
        
        // ملء قائمة ألوان المواعيد
        const colorSelect = document.getElementById('appointment-color');
        if (colorSelect) {
            colorSelect.innerHTML = '';
            window.calendarData.getAppointmentColors().forEach(color => {
                const option = document.createElement('option');
                option.value = color.value;
                option.textContent = color.name;
                option.style.backgroundColor = color.value;
                option.style.color = getContrastColor(color.value);
                colorSelect.appendChild(option);
            });
            
            if (appointment && appointment.color) {
                colorSelect.value = appointment.color;
            }
        }
    }
    
    // الحصول على لون مقابل للخلفية
    function getContrastColor(hexColor) {
        // تحويل اللون السداسي إلى RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        // حساب درجة سطوع اللون (من 0 إلى 255)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // إرجاع لون أبيض أو أسود بناءً على السطوع
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }
    
    // حفظ الموعد
    function saveAppointment() {
        const id = document.getElementById('appointment-id').value;
        const isEdit = id !== '';
        
        // جمع البيانات من النموذج
        const title = document.getElementById('appointment-title').value;
        const description = document.getElementById('appointment-description').value;
        const startDate = document.getElementById('appointment-start-date').value;
        const startTime = document.getElementById('appointment-start-time').value;
        const endDate = document.getElementById('appointment-end-date').value;
        const endTime = document.getElementById('appointment-end-time').value;
        const location = document.getElementById('appointment-location').value;
        const customerName = document.getElementById('appointment-customer').value;
        const customerPhone = document.getElementById('appointment-customer-phone').value;
        const propertyTitle = document.getElementById('appointment-property').value;
        const type = document.getElementById('appointment-type').value;
        const status = document.getElementById('appointment-status').value;
        const color = document.getElementById('appointment-color').value;
        const notes = document.getElementById('appointment-notes').value;
        
        // التحقق من صحة البيانات
        if (!title) {
            showNotification('يرجى إدخال عنوان الموعد', 'error');
            return;
        }
        
        if (!startDate || !startTime || !endDate || !endTime) {
            showNotification('يرجى إدخال تاريخ ووقت الموعد', 'error');
            return;
        }
        
        // تحويل التاريخ والوقت إلى صيغة ISO
        const start = `${startDate}T${startTime}:00`;
        const end = `${endDate}T${endTime}:00`;
        
        // التحقق من صحة التاريخ والوقت
        if (new Date(end) <= new Date(start)) {
            showNotification('يجب أن يكون وقت الانتهاء بعد وقت البدء', 'error');
            return;
        }
        
        // إنشاء كائن الموعد
        const appointmentObj = {
            title,
            description,
            start,
            end,
            location,
            customerName,
            customerPhone,
            propertyTitle,
            type,
            status,
            color,
            notes,
            // الاحتفاظ بالبيانات الأخرى إذا كان التعديل
            customerId: isEdit && activeAppointment ? activeAppointment.customerId : null,
            propertyId: isEdit && activeAppointment ? activeAppointment.propertyId : null,
            reminders: isEdit && activeAppointment ? activeAppointment.reminders : [],
            createdBy: "أحمد" // اسم المستخدم الحالي
        };
        
        if (isEdit) {
            // تحديث موعد موجود
            appointmentObj.id = parseInt(id);
            window.calendarData.updateAppointment(appointmentObj);
            showNotification('تم تحديث الموعد بنجاح', 'success');
        } else {
            // إضافة موعد جديد
            window.calendarData.addAppointment(appointmentObj);
            showNotification('تم إضافة الموعد بنجاح', 'success');
        }
        
        // إغلاق النافذة المنبثقة
        bootstrap.Modal.getInstance(document.getElementById('appointmentModal')).hide();
        
        // إعادة تحميل التقويم والمواعيد القادمة
        loadAppointments();
        loadUpcomingAppointments();
    }
    
    // حذف موعد
    function deleteAppointment() {
        if (!activeAppointment || !activeAppointment.id) {
            return;
        }
        
        // تأكيد الحذف
        if (confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
            window.calendarData.deleteAppointment(activeAppointment.id);
            
            // إغلاق النافذة المنبثقة
            bootstrap.Modal.getInstance(document.getElementById('appointmentModal')).hide();
            
            // إعادة تحميل التقويم والمواعيد القادمة
            loadAppointments();
            loadUpcomingAppointments();
            
            showNotification('تم حذف الموعد بنجاح', 'success');
        }
    }
    
    // تحديث مواعيد الموعد عند السحب أو تغيير الحجم
    function updateAppointmentDates(info) {
        const appointmentId = parseInt(info.event.id);
        const appointment = window.calendarData.getAppointmentById(appointmentId);
        
        if (appointment) {
            appointment.start = info.event.startStr;
            appointment.end = info.event.endStr;
            
            window.calendarData.updateAppointment(appointment);
            loadUpcomingAppointments();
            
            showNotification('تم تحديث الموعد بنجاح', 'success');
        }
    }
    
    // إعداد مستمعي الأحداث
    function setupEventListeners() {
        // زر حفظ الموعد
        const saveButton = document.getElementById('save-appointment');
        if (saveButton) {
            saveButton.addEventListener('click', saveAppointment);
        }
        
        // زر حذف الموعد
        const deleteButton = document.getElementById('delete-appointment');
        if (deleteButton) {
            deleteButton.addEventListener('click', deleteAppointment);
        }
        
        // أزرار تغيير عرض التقويم
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const view = this.dataset.view;
                calendar.changeView(view);
                currentView = view;
                
                // تحديث الزر النشط
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // زر اليوم
        const todayButton = document.getElementById('today-btn');
        if (todayButton) {
            todayButton.addEventListener('click', function() {
                calendar.today();
            });
        }
        
        // حقل البحث
        const searchInput = document.getElementById('appointment-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const events = calendar.getEvents();
                
                events.forEach(event => {
                    const title = event.title.toLowerCase();
                    const customer = event.extendedProps.customerName ? event.extendedProps.customerName.toLowerCase() : '';
                    const location = event.extendedProps.location ? event.extendedProps.location.toLowerCase() : '';
                    const description = event.extendedProps.description ? event.extendedProps.description.toLowerCase() : '';
                    
                    // إظهار أو إخفاء الحدث بناءً على البحث
                    if (searchTerm === '' || 
                        title.includes(searchTerm) || 
                        customer.includes(searchTerm) || 
                        location.includes(searchTerm) || 
                        description.includes(searchTerm)) {
                        event.setProp('display', 'auto');
                    } else {
                        event.setProp('display', 'none');
                    }
                });
            });
        }
    }
    
    // إظهار إشعار
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        
        if (!container) {
            console.error('لم يتم العثور على حاوية الإشعارات!');
            return;
        }
        
        const notification = document.createElement('div');
        notification.className = `toast align-items-center border-0 show`;
        notification.classList.add(`bg-${type === 'error' ? 'danger' : type}`);
        notification.classList.add(type === 'error' || type === 'danger' ? 'text-white' : '');
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
        
        container.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثوان
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // الدوال المتاحة للاستخدام الخارجي
    return {
        initCalendar,
        loadAppointments,
        loadUpcomingAppointments,
        openAppointmentModal,
        saveAppointment,
        deleteAppointment
    };
})();

// تنفيذ التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.calendarUI.initCalendar();
});
