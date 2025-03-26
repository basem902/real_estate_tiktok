/**
 * Real Estate TikTok - Marketers Dashboard
 * Commissions & Payments UI - Core Functions
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة صفحة العمولات والمدفوعات
    initializeCommissionsPage();
});

// تهيئة صفحة العمولات والمدفوعات
function initializeCommissionsPage() {
    // تحديث الإحصائيات
    updateStatistics();
    
    // تهيئة الرسوم البيانية
    initializeCharts();
    
    // تحميل بيانات الجداول
    loadCommissionsTable();
    loadPaymentsTable();
    loadDocumentsTable();
    loadWithdrawalsTable();
    
    // إعداد مستمعي الأحداث
    setupEventListeners();
}

// تحديث إحصائيات العمولات
function updateStatistics() {
    const totalCommissions = window.commissionsManager.getTotalCommissions();
    const paidCommissions = window.commissionsManager.getTotalPaidCommissions();
    const pendingCommissions = window.commissionsManager.getTotalPendingCommissions();
    const totalDeals = window.commissionsManager.getTotalDeals();
    
    // تحديث العناصر في واجهة المستخدم
    document.getElementById('total-commissions').textContent = formatCurrency(totalCommissions) + ' ريال';
    document.getElementById('paid-commissions').textContent = formatCurrency(paidCommissions) + ' ريال';
    document.getElementById('pending-commissions').textContent = formatCurrency(pendingCommissions) + ' ريال';
    document.getElementById('total-deals').textContent = totalDeals;
    
    // تحديث المبلغ المتاح للسحب
    document.getElementById('available-balance').textContent = formatCurrency(pendingCommissions) + ' ريال';
    
    // تحديث الحد الأقصى للسحب
    const withdrawalAmountField = document.getElementById('withdrawal-amount');
    if (withdrawalAmountField) {
        withdrawalAmountField.max = pendingCommissions;
    }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمعي أحداث قائمة الفترة للرسم البياني
    const chartPeriodLinks = document.querySelectorAll('[data-period]');
    chartPeriodLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const period = this.dataset.period;
            
            // تحديث الرسم البياني حسب الفترة
            updateChart(period);
            
            // تحديث نص الزر المنسدل
            const dropdown = this.closest('.dropdown');
            if (dropdown) {
                const button = dropdown.querySelector('.dropdown-toggle');
                
                if (button) {
                    switch(period) {
                        case 'month':
                            button.textContent = 'هذا الشهر';
                            break;
                        case 'quarter':
                            button.textContent = 'هذا الربع';
                            break;
                        case 'year':
                            button.textContent = 'هذا العام';
                            break;
                        case 'all':
                            button.textContent = 'كل الفترات';
                            break;
                    }
                }
                
                // تحديث العنصر النشط
                dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // مستمعي أحداث قائمة فترة المدفوعات
    const paymentsPeriodLinks = document.querySelectorAll('#payments-period-dropdown + .dropdown-menu .dropdown-item');
    paymentsPeriodLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const period = this.dataset.period;
            
            // تحميل جدول المدفوعات حسب الفترة
            loadPaymentsTable(period);
            
            // تحديث نص الزر المنسدل
            const dropdown = this.closest('.dropdown');
            if (dropdown) {
                const button = dropdown.querySelector('.dropdown-toggle');
                
                if (button) {
                    switch(period) {
                        case 'month':
                            button.textContent = 'آخر شهر';
                            break;
                        case '3months':
                            button.textContent = 'آخر 3 أشهر';
                            break;
                        case '6months':
                            button.textContent = 'آخر 6 أشهر';
                            break;
                        case 'year':
                            button.textContent = 'آخر سنة';
                            break;
                        case 'all':
                            button.textContent = 'كل المدفوعات';
                            break;
                    }
                }
                
                // تحديث العنصر النشط
                dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // مستمع حدث تغيير طريقة السحب
    const withdrawalMethod = document.getElementById('withdrawal-method');
    if (withdrawalMethod) {
        withdrawalMethod.addEventListener('change', function() {
            const method = this.value;
            const bankDetails = document.getElementById('bank-details');
            const walletDetails = document.getElementById('wallet-details');
            
            if (method === 'bank') {
                bankDetails.classList.remove('d-none');
                walletDetails.classList.add('d-none');
            } else if (method === 'wallet') {
                bankDetails.classList.add('d-none');
                walletDetails.classList.remove('d-none');
            } else {
                bankDetails.classList.add('d-none');
                walletDetails.classList.add('d-none');
            }
        });
    }
    
    // مستمع حدث زر تأكيد طلب السحب
    const submitWithdrawalButton = document.getElementById('submit-withdrawal');
    if (submitWithdrawalButton) {
        submitWithdrawalButton.addEventListener('click', function() {
            submitWithdrawalRequest();
        });
    }
    
    // مستمع حدث زر رفع المستند
    const submitDocumentButton = document.getElementById('submit-document');
    if (submitDocumentButton) {
        submitDocumentButton.addEventListener('click', function() {
            submitDocument();
        });
    }
    
    // مستمع حدث للقائمة الجانبية
    setupSidebarToggle();
}

// إرسال طلب سحب جديد
function submitWithdrawalRequest() {
    // الحصول على بيانات النموذج
    const amount = parseFloat(document.getElementById('withdrawal-amount').value);
    const method = document.getElementById('withdrawal-method').value;
    const notes = document.getElementById('withdrawal-notes').value;
    
    // التحقق من صحة المدخلات
    if (isNaN(amount) || amount <= 0) {
        showNotification('يرجى إدخال مبلغ صحيح للسحب', 'danger');
        return;
    }
    
    if (!method) {
        showNotification('يرجى اختيار طريقة السحب', 'danger');
        return;
    }
    
    // إعداد كائن بيانات السحب
    const withdrawalData = {
        amount,
        method: method === 'bank' ? 'تحويل بنكي' : (method === 'wallet' ? 'محفظة إلكترونية' : 'استلام نقدي'),
        notes
    };
    
    // إضافة تفاصيل الطريقة
    if (method === 'bank') {
        withdrawalData.bankName = document.getElementById('bank-name').value;
        withdrawalData.accountNumber = document.getElementById('account-number').value;
        
        if (!withdrawalData.bankName || !withdrawalData.accountNumber) {
            showNotification('يرجى إدخال تفاصيل الحساب البنكي', 'danger');
            return;
        }
    } else if (method === 'wallet') {
        withdrawalData.walletType = document.getElementById('wallet-type').value;
        withdrawalData.walletNumber = document.getElementById('wallet-number').value;
        
        if (!withdrawalData.walletNumber) {
            showNotification('يرجى إدخال رقم المحفظة', 'danger');
            return;
        }
    }
    
    // إضافة طلب السحب
    const newRequest = window.commissionsManager.addWithdrawalRequest(withdrawalData);
    
    // تحديث جدول طلبات السحب
    loadWithdrawalsTable();
    
    // إغلاق النافذة
    const modalElement = document.getElementById('withdrawalRequestModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // إعادة تعيين النموذج
    document.getElementById('withdrawal-form').reset();
    document.getElementById('bank-details').classList.add('d-none');
    document.getElementById('wallet-details').classList.add('d-none');
    
    // عرض إشعار نجاح
    showNotification('تم إرسال طلب السحب بنجاح وسيتم معالجته قريباً', 'success');
}

// رفع مستند جديد
function submitDocument() {
    // الحصول على بيانات النموذج
    const name = document.getElementById('document-name').value;
    const type = document.getElementById('document-type').value;
    const notes = document.getElementById('document-notes').value;
    const file = document.getElementById('document-file').files[0];
    
    // التحقق من صحة المدخلات
    if (!name) {
        showNotification('يرجى إدخال اسم المستند', 'danger');
        return;
    }
    
    if (!type) {
        showNotification('يرجى اختيار نوع المستند', 'danger');
        return;
    }
    
    if (!file) {
        showNotification('يرجى اختيار ملف للرفع', 'danger');
        return;
    }
    
    // في الإصدار الحقيقي، سيتم رفع الملف إلى الخادم
    // هنا نقوم بمحاكاة عملية الرفع
    
    // إعداد كائن بيانات المستند
    const documentData = {
        name,
        type,
        notes,
        size: formatFileSize(file.size),
        extension: getFileExtension(file.name)
    };
    
    // إضافة المستند
    const newDocument = window.commissionsManager.addDocument(documentData);
    
    // تحديث جدول المستندات
    loadDocumentsTable();
    
    // إغلاق النافذة
    const modalElement = document.getElementById('uploadDocumentModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // إعادة تعيين النموذج
    document.getElementById('document-form').reset();
    
    // عرض إشعار نجاح
    showNotification('تم رفع المستند بنجاح', 'success');
}

// تهيئة مستمع حدث تبديل القائمة الجانبية
function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('main-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // إغلاق الشريط الجانبي عند النقر خارجه في الأجهزة المحمولة
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = sidebarToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }
}

// عرض إشعار للمستخدم
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) return;
    
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
    
    notificationContainer.appendChild(notification);
    
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

// تنسيق المبالغ المالية
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// تنسيق تاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', options);
}

// تنسيق حجم الملف
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// الحصول على امتداد الملف
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
}
