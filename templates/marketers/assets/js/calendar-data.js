/**
 * calendar-data.js
 * ملف إدارة بيانات المواعيد لشاشة جدولة المواعيد
 */

window.calendarData = (function() {
    // بيانات المواعيد
    const appointmentData = {
        appointments: [
            {
                id: 1,
                title: "زيارة فيلا السالمية",
                description: "زيارة عميل محتمل لمعاينة الفيلا الواقعة في منطقة السالمية",
                start: "2025-03-24T10:00:00",
                end: "2025-03-24T11:00:00",
                location: "السالمية، شارع الخليج، فيلا رقم 24",
                customerId: 3,
                customerName: "محمد العلي",
                customerPhone: "965-555-3214",
                propertyId: 5,
                propertyTitle: "فيلا فاخرة بالسالمية",
                type: "زيارة عقار",
                status: "مؤكد",
                color: "#4CAF50",
                notes: "العميل مهتم جداً ويرغب في معاينة المطبخ والحديقة بشكل خاص",
                reminders: [
                    { id: 1, time: "2025-03-24T09:30:00", sent: false }
                ],
                createdBy: "أحمد"
            },
            {
                id: 2,
                title: "اجتماع مع عائلة الصباح",
                description: "مناقشة خيارات الاستثمار العقاري",
                start: "2025-03-25T14:00:00",
                end: "2025-03-25T15:30:00",
                location: "مكتب المبيعات الرئيسي",
                customerId: 5,
                customerName: "فهد الصباح",
                customerPhone: "965-555-4272",
                propertyId: null,
                propertyTitle: null,
                type: "اجتماع استشاري",
                status: "مؤكد",
                color: "#2196F3",
                notes: "العملاء يبحثون عن استثمار طويل الأمد في العقارات التجارية",
                reminders: [
                    { id: 2, time: "2025-03-25T13:30:00", sent: false }
                ],
                createdBy: "أحمد"
            },
            {
                id: 3,
                title: "متابعة هاتفية - سارة المنصور",
                description: "متابعة اهتمام العميلة بالشقة البحرية",
                start: "2025-03-26T11:00:00",
                end: "2025-03-26T11:30:00",
                location: "مكالمة هاتفية",
                customerId: 7,
                customerName: "سارة المنصور",
                customerPhone: "965-555-8910",
                propertyId: 12,
                propertyTitle: "شقة بإطلالة بحرية",
                type: "متابعة هاتفية",
                status: "مؤكد",
                color: "#9C27B0",
                notes: "متابعة بعد زيارة العقار الأسبوع الماضي، العميلة طلبت وقتاً للتفكير",
                reminders: [
                    { id: 3, time: "2025-03-26T10:45:00", sent: false }
                ],
                createdBy: "أحمد"
            },
            {
                id: 4,
                title: "توقيع عقد - محمد الخالد",
                description: "توقيع عقد شراء الشقة الاستثمارية",
                start: "2025-03-27T13:00:00",
                end: "2025-03-27T14:00:00",
                location: "مكتب المبيعات الرئيسي",
                customerId: 9,
                customerName: "محمد الخالد",
                customerPhone: "965-555-3652",
                propertyId: 8,
                propertyTitle: "شقة استثمارية بالعاصمة",
                type: "توقيع عقد",
                status: "مؤكد",
                color: "#FF5722",
                notes: "تم الاتفاق على جميع التفاصيل، العميل سيحضر مع محاميه",
                reminders: [
                    { id: 4, time: "2025-03-27T12:00:00", sent: false }
                ],
                createdBy: "أحمد"
            },
            {
                id: 5,
                title: "جلسة تصوير - فيلا الخيران",
                description: "تصوير فيلا جديدة للإعلان",
                start: "2025-03-28T09:00:00",
                end: "2025-03-28T12:00:00",
                location: "الخيران، قطعة 5، شارع 8",
                customerId: null,
                customerName: null,
                customerPhone: null,
                propertyId: 15,
                propertyTitle: "فيلا الخيران الساحلية",
                type: "مهمة داخلية",
                status: "مؤكد",
                color: "#795548",
                notes: "التنسيق مع المصور والتأكد من جاهزية الفيلا للتصوير",
                reminders: [
                    { id: 5, time: "2025-03-28T08:00:00", sent: false }
                ],
                createdBy: "أحمد"
            }
        ],
        
        // قائمة أنواع المواعيد
        appointmentTypes: [
            "زيارة عقار",
            "اجتماع استشاري",
            "متابعة هاتفية",
            "توقيع عقد",
            "تقييم عقار",
            "عرض عقار",
            "مهمة داخلية",
            "أخرى"
        ],
        
        // قائمة حالات المواعيد
        appointmentStatuses: [
            "مؤكد",
            "في انتظار التأكيد",
            "ملغي",
            "تم إعادة جدولته",
            "تم الانتهاء"
        ],
        
        // قائمة ألوان المواعيد
        appointmentColors: [
            { name: "أخضر", value: "#4CAF50" },
            { name: "أزرق", value: "#2196F3" },
            { name: "بنفسجي", value: "#9C27B0" },
            { name: "برتقالي", value: "#FF5722" },
            { name: "بني", value: "#795548" },
            { name: "أحمر", value: "#F44336" },
            { name: "أصفر", value: "#FFC107" },
            { name: "رمادي", value: "#607D8B" }
        ]
    };
    
    // الحصول على جميع المواعيد
    function getAllAppointments() {
        return appointmentData.appointments;
    }
    
    // الحصول على موعد محدد بواسطة المعرف
    function getAppointmentById(id) {
        return appointmentData.appointments.find(appt => appt.id === id) || null;
    }
    
    // الحصول على المواعيد حسب العميل
    function getAppointmentsByCustomer(customerId) {
        return appointmentData.appointments.filter(appt => appt.customerId === customerId);
    }
    
    // الحصول على المواعيد حسب العقار
    function getAppointmentsByProperty(propertyId) {
        return appointmentData.appointments.filter(appt => appt.propertyId === propertyId);
    }
    
    // الحصول على المواعيد حسب النوع
    function getAppointmentsByType(type) {
        return appointmentData.appointments.filter(appt => appt.type === type);
    }
    
    // الحصول على المواعيد حسب الحالة
    function getAppointmentsByStatus(status) {
        return appointmentData.appointments.filter(appt => appt.status === status);
    }
    
    // الحصول على المواعيد حسب الفترة الزمنية
    function getAppointmentsByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return appointmentData.appointments.filter(appt => {
            const apptStart = new Date(appt.start);
            return apptStart >= start && apptStart <= end;
        });
    }
    
    // الحصول على المواعيد القادمة
    function getUpcomingAppointments(count = 5) {
        const now = new Date();
        const upcoming = appointmentData.appointments.filter(appt => new Date(appt.start) > now);
        
        // ترتيب المواعيد حسب وقت البداية
        upcoming.sort((a, b) => new Date(a.start) - new Date(b.start));
        
        return upcoming.slice(0, count);
    }
    
    // إضافة موعد جديد
    function addAppointment(appointmentObj) {
        // إنشاء معرف جديد
        const newId = appointmentData.appointments.length > 0 
            ? Math.max(...appointmentData.appointments.map(a => a.id)) + 1 
            : 1;
        
        appointmentObj.id = newId;
        
        // إضافة إلى قائمة المواعيد
        appointmentData.appointments.push(appointmentObj);
        
        return newId;
    }
    
    // تحديث موعد موجود
    function updateAppointment(appointmentObj) {
        const index = appointmentData.appointments.findIndex(appt => appt.id === appointmentObj.id);
        
        if (index !== -1) {
            appointmentData.appointments[index] = appointmentObj;
            return true;
        }
        
        return false;
    }
    
    // حذف موعد
    function deleteAppointment(id) {
        const index = appointmentData.appointments.findIndex(appt => appt.id === id);
        
        if (index !== -1) {
            appointmentData.appointments.splice(index, 1);
            return true;
        }
        
        return false;
    }
    
    // إضافة تذكير لموعد
    function addReminder(appointmentId, reminderTime) {
        const appointment = getAppointmentById(appointmentId);
        
        if (appointment) {
            // إنشاء معرف جديد للتذكير
            const newReminderId = appointment.reminders.length > 0 
                ? Math.max(...appointment.reminders.map(r => r.id)) + 1 
                : 1;
            
            appointment.reminders.push({
                id: newReminderId,
                time: reminderTime,
                sent: false
            });
            
            return newReminderId;
        }
        
        return null;
    }
    
    // الحصول على جميع أنواع المواعيد
    function getAppointmentTypes() {
        return appointmentData.appointmentTypes;
    }
    
    // الحصول على جميع حالات المواعيد
    function getAppointmentStatuses() {
        return appointmentData.appointmentStatuses;
    }
    
    // الحصول على جميع ألوان المواعيد
    function getAppointmentColors() {
        return appointmentData.appointmentColors;
    }
    
    // واجهة برمجة التطبيقات العامة
    return {
        getAllAppointments,
        getAppointmentById,
        getAppointmentsByCustomer,
        getAppointmentsByProperty,
        getAppointmentsByType,
        getAppointmentsByStatus,
        getAppointmentsByDateRange,
        getUpcomingAppointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        addReminder,
        getAppointmentTypes,
        getAppointmentStatuses,
        getAppointmentColors
    };
})();
