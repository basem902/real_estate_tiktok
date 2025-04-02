/**
 * وظائف مساعدة لنظام التقارير
 * تم إنشاؤه: 27/03/2025
 */

// وظائف تصدير التقارير ومشاركتها
const ReportUtils = {
    /**
     * تصدير التقرير كملف PDF
     * @param {string} reportId - معرف التقرير
     * @param {string} filename - اسم الملف المراد حفظه
     */
    exportToPDF: function(reportId, filename = 'تقرير') {
        console.log(`تصدير التقرير ${reportId} كملف PDF باسم ${filename}`);
        
        // في البيئة الحقيقية: استخدام مكتبة jsPDF مع html2canvas
        // هنا نعرض طريقة بسيطة للتوضيح فقط
        
        // تحديد محتوى التقرير
        const reportContent = document.getElementById('report-content');
        
        if (!reportContent) {
            console.error("لم يتم العثور على محتوى التقرير");
            return;
        }
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري تصدير التقرير كملف PDF...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            this.showToast('تم تصدير التقرير بنجاح!', 'success');
            
            // في البيئة الحقيقية: تنزيل الملف حقيقياً
            this.triggerFakeDownload(`${filename}.pdf`, 'application/pdf');
        }, 1500);
    },
    
    /**
     * تصدير التقرير كملف Excel
     * @param {string} reportId - معرف التقرير
     * @param {string} filename - اسم الملف المراد حفظه
     */
    exportToExcel: function(reportId, filename = 'تقرير') {
        console.log(`تصدير التقرير ${reportId} كملف Excel باسم ${filename}`);
        
        // في البيئة الحقيقية: استخدام مكتبة SheetJS/xlsx
        // هنا نعرض طريقة بسيطة للتوضيح فقط
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري تصدير التقرير كملف Excel...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            this.showToast('تم تصدير التقرير بنجاح!', 'success');
            
            // في البيئة الحقيقية: تنزيل الملف حقيقياً
            this.triggerFakeDownload(`${filename}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        }, 1500);
    },
    
    /**
     * تصدير التقرير كملف CSV
     * @param {string} reportId - معرف التقرير
     * @param {string} filename - اسم الملف المراد حفظه
     */
    exportToCSV: function(reportId, filename = 'تقرير') {
        console.log(`تصدير التقرير ${reportId} كملف CSV باسم ${filename}`);
        
        // في البيئة الحقيقية: تحويل البيانات إلى صيغة CSV
        // هنا نعرض طريقة بسيطة للتوضيح فقط
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري تصدير التقرير كملف CSV...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            this.showToast('تم تصدير التقرير بنجاح!', 'success');
            
            // في البيئة الحقيقية: تنزيل الملف حقيقياً
            this.triggerFakeDownload(`${filename}.csv`, 'text/csv');
        }, 1000);
    },
    
    /**
     * طباعة التقرير
     * @param {string} reportId - معرف التقرير
     */
    printReport: function(reportId) {
        console.log(`طباعة التقرير ${reportId}`);
        
        // تحديد محتوى التقرير
        const reportContent = document.getElementById('report-content');
        
        if (!reportContent) {
            console.error("لم يتم العثور على محتوى التقرير");
            return;
        }
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري تجهيز التقرير للطباعة...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            // في البيئة الحقيقية: استخدام window.print()
            // مع CSS مخصص للطباعة
            window.print();
        }, 1000);
    },
    
    /**
     * مشاركة التقرير عبر البريد الإلكتروني
     * @param {string} reportId - معرف التقرير
     * @param {string} email - البريد الإلكتروني للمستلم
     * @param {string} subject - عنوان الرسالة
     * @param {string} message - نص الرسالة
     */
    shareViaEmail: function(reportId, email, subject, message) {
        console.log(`مشاركة التقرير ${reportId} عبر البريد الإلكتروني إلى ${email}`);
        
        // التحقق من المدخلات
        if (!email || !subject) {
            this.showToast('يرجى إدخال البريد الإلكتروني وعنوان الرسالة', 'error');
            return;
        }
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري مشاركة التقرير...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            this.showToast('تم مشاركة التقرير بنجاح!', 'success');
            
            // في البيئة الحقيقية: إرسال التقرير عبر API للبريد الإلكتروني
            // هنا نغلق النافذة المنبثقة للمشاركة
            $('#shareReportModal').modal('hide');
        }, 1500);
    },
    
    /**
     * حفظ التقرير كمسودة
     * @param {Object} reportData - بيانات التقرير
     */
    saveAsDraft: function(reportData) {
        console.log('حفظ التقرير كمسودة:', reportData);
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري حفظ التقرير كمسودة...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            this.showToast('تم حفظ التقرير كمسودة بنجاح!', 'success');
            
            // في البيئة الحقيقية: حفظ البيانات في قاعدة البيانات
            // هنا نخزن في localStorage للعرض فقط
            const drafts = JSON.parse(localStorage.getItem('reportDrafts') || '[]');
            drafts.push({
                id: 'draft-' + Date.now(),
                title: reportData.title || 'تقرير بدون عنوان',
                date: new Date().toLocaleDateString('ar-EG'),
                data: reportData
            });
            localStorage.setItem('reportDrafts', JSON.stringify(drafts));
        }, 1000);
    },
    
    /**
     * جدولة تقرير لإرساله بشكل دوري
     * @param {Object} scheduleData - بيانات الجدولة
     */
    scheduleReport: function(scheduleData) {
        console.log('جدولة التقرير:', scheduleData);
        
        // التحقق من المدخلات
        if (!scheduleData.reportId || !scheduleData.frequency) {
            this.showToast('يرجى إدخال جميع البيانات المطلوبة للجدولة', 'error');
            return;
        }
        
        // إظهار رسالة للمستخدم
        this.showToast('جاري جدولة التقرير...', 'info');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            this.showToast('تم جدولة التقرير بنجاح!', 'success');
            
            // في البيئة الحقيقية: حفظ بيانات الجدولة في قاعدة البيانات
            // هنا نغلق النافذة المنبثقة للجدولة
            $('#scheduleReportModal').modal('hide');
            
            // إضافة التقرير المجدول إلى القائمة (في واجهة المستخدم)
            this.addScheduledReportToList(scheduleData);
        }, 1500);
    },
    
    /**
     * إضافة تقرير مجدول إلى القائمة في واجهة المستخدم
     * @param {Object} reportData - بيانات التقرير المجدول
     */
    addScheduledReportToList: function(reportData) {
        const scheduledList = document.getElementById('scheduled-reports-list');
        
        if (!scheduledList) {
            console.error("لم يتم العثور على قائمة التقارير المجدولة");
            return;
        }
        
        // إنشاء عنصر جديد للقائمة
        const listItem = document.createElement('div');
        listItem.className = 'card mb-2';
        listItem.innerHTML = `
            <div class="card-body p-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-0">${reportData.title || 'تقرير مجدول'}</h6>
                        <small class="text-muted">${reportData.frequency || 'أسبوعياً'} | ${new Date().toLocaleDateString('ar-EG')}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة العنصر إلى القائمة
        scheduledList.appendChild(listItem);
    },
    
    /**
     * مشاركة رابط التقرير
     * @param {string} reportId - معرف التقرير
     */
    shareReportLink: function(reportId) {
        console.log(`مشاركة رابط التقرير ${reportId}`);
        
        // في البيئة الحقيقية: إنشاء رابط مشاركة فريد
        const shareUrl = `${window.location.origin}/reports/view/${reportId}`;
        
        // نسخ الرابط إلى الحافظة
        this.copyToClipboard(shareUrl);
        
        // إظهار رسالة للمستخدم
        this.showToast('تم نسخ رابط التقرير إلى الحافظة', 'success');
    },
    
    /**
     * نسخ نص إلى الحافظة
     * @param {string} text - النص المراد نسخه
     */
    copyToClipboard: function(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    },
    
    /**
     * عرض رسالة توست للمستخدم
     * @param {string} message - نص الرسالة
     * @param {string} type - نوع الرسالة (success, error, info, warning)
     */
    showToast: function(message, type = 'info') {
        // التحقق من وجود مكتبة تنبيهات
        if (typeof Toastify === 'function') {
            // استخدام Toastify إذا كانت متوفرة
            Toastify({
                text: message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: this.getToastColor(type),
                stopOnFocus: true
            }).showToast();
        } else {
            // استخدام تنبيهات Bootstrap إذا كانت متوفرة
            if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
                const toastEl = document.createElement('div');
                toastEl.className = `toast align-items-center text-white bg-${this.getBootstrapColor(type)} border-0`;
                toastEl.setAttribute('role', 'alert');
                toastEl.setAttribute('aria-live', 'assertive');
                toastEl.setAttribute('aria-atomic', 'true');
                
                toastEl.innerHTML = `
                    <div class="d-flex">
                        <div class="toast-body">
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
                    </div>
                `;
                
                document.body.appendChild(toastEl);
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
                
                // إزالة العنصر بعد الإغلاق
                toastEl.addEventListener('hidden.bs.toast', function() {
                    document.body.removeChild(toastEl);
                });
            } else {
                // استخدام تنبيه بسيط إذا لم تتوفر المكتبات
                alert(message);
            }
        }
    },
    
    /**
     * الحصول على لون التوست حسب النوع
     * @param {string} type - نوع الرسالة
     * @returns {string} - رمز اللون
     */
    getToastColor: function(type) {
        switch (type) {
            case 'success': return '#28a745';
            case 'error': return '#dc3545';
            case 'warning': return '#ffc107';
            case 'info':
            default: return '#17a2b8';
        }
    },
    
    /**
     * الحصول على لون Bootstrap حسب النوع
     * @param {string} type - نوع الرسالة
     * @returns {string} - اسم لون Bootstrap
     */
    getBootstrapColor: function(type) {
        switch (type) {
            case 'success': return 'success';
            case 'error': return 'danger';
            case 'warning': return 'warning';
            case 'info':
            default: return 'info';
        }
    },
    
    /**
     * إطلاق تنزيل وهمي لمحاكاة تنزيل الملف
     * @param {string} filename - اسم الملف
     * @param {string} mimeType - نوع MIME للملف
     */
    triggerFakeDownload: function(filename, mimeType) {
        // إنشاء رابط وهمي للتنزيل
        const link = document.createElement('a');
        link.download = filename;
        
        // في البيئة الحقيقية: استخدام blob حقيقي
        // هنا نستخدم blob فارغاً للمحاكاة فقط
        const blob = new Blob(['محاكاة محتوى الملف'], { type: mimeType });
        link.href = URL.createObjectURL(blob);
        
        // إضافة الرابط مؤقتاً وإطلاق النقر عليه
        document.body.appendChild(link);
        link.click();
        
        // إزالة الرابط من المستند
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }, 100);
    }
};

// تهيئة وظائف التقارير عند تحميل المستند
$(document).ready(function() {
    console.log("تم تحميل وظائف التقارير");
    
    // إعداد أحداث لأزرار التصدير
    $('#export-pdf-btn').on('click', function() {
        const reportId = $(this).data('report-id') || 'current';
        const reportTitle = $('#report-title').text() || 'تقرير';
        ReportUtils.exportToPDF(reportId, reportTitle);
    });
    
    $('#export-excel-btn').on('click', function() {
        const reportId = $(this).data('report-id') || 'current';
        const reportTitle = $('#report-title').text() || 'تقرير';
        ReportUtils.exportToExcel(reportId, reportTitle);
    });
    
    $('#export-csv-btn').on('click', function() {
        const reportId = $(this).data('report-id') || 'current';
        const reportTitle = $('#report-title').text() || 'تقرير';
        ReportUtils.exportToCSV(reportId, reportTitle);
    });
    
    $('#print-report-btn').on('click', function() {
        const reportId = $(this).data('report-id') || 'current';
        ReportUtils.printReport(reportId);
    });
    
    $('#share-report-btn').on('click', function() {
        const reportId = $(this).data('report-id') || 'current';
        // في البيئة الحقيقية: فتح نافذة منبثقة للمشاركة
        $('#shareReportModal').modal('show');
    });
    
    $('#share-link-btn').on('click', function() {
        const reportId = $(this).data('report-id') || 'current';
        ReportUtils.shareReportLink(reportId);
    });
    
    // إعداد نموذج المشاركة
    $('#share-email-form').on('submit', function(e) {
        e.preventDefault();
        
        const reportId = $('#share-report-id').val() || 'current';
        const email = $('#share-email').val();
        const subject = $('#share-subject').val();
        const message = $('#share-message').val();
        
        ReportUtils.shareViaEmail(reportId, email, subject, message);
    });
    
    // إعداد نموذج الجدولة
    $('#schedule-report-form').on('submit', function(e) {
        e.preventDefault();
        
        const scheduleData = {
            reportId: $('#schedule-report-id').val() || 'current',
            title: $('#schedule-title').val(),
            frequency: $('#schedule-frequency').val(),
            startDate: $('#schedule-start-date').val(),
            recipients: $('#schedule-recipients').val().split(','),
            format: $('#schedule-format').val()
        };
        
        ReportUtils.scheduleReport(scheduleData);
    });
    
    // إعداد نموذج حفظ المسودة
    $('#save-draft-btn').on('click', function() {
        // جمع بيانات التقرير من النموذج
        const reportData = collectReportFormData();
        
        // حفظ كمسودة
        ReportUtils.saveAsDraft(reportData);
    });
});

/**
 * جمع بيانات التقرير من النموذج
 * @returns {Object} - بيانات التقرير
 */
function collectReportFormData() {
    // في البيئة الحقيقية: جمع البيانات من نموذج التقرير
    // هنا نستخدم بيانات وهمية للعرض فقط
    return {
        title: $('#report-title').val() || 'تقرير بدون عنوان',
        type: $('#report-type').val(),
        dateRange: {
            start: $('#date-range-start').val(),
            end: $('#date-range-end').val()
        },
        filters: {
            statuses: $('#filter-status').val(),
            ratings: $('#filter-rating').val()
        },
        components: {
            summary: $('#include-summary').is(':checked'),
            charts: $('#include-charts').is(':checked'),
            tables: $('#include-tables').is(':checked'),
            recommendations: $('#include-recommendations').is(':checked')
        }
    };
}
