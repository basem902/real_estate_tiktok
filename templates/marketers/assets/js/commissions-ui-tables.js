/**
 * Real Estate TikTok - Marketers Dashboard
 * Commissions & Payments UI - Tables
 * Version: 1.0.0
 */

// تحميل جدول العمولات المستحقة
function loadCommissionsTable() {
    const tableBody = document.getElementById('commissions-table-body');
    
    if (!tableBody) return;
    
    // الحصول على بيانات العمولات
    const commissions = window.commissionsManager.commissions;
    
    // إفراغ الجدول
    tableBody.innerHTML = '';
    
    // تعبئة الجدول بالبيانات
    commissions.forEach((commission, index) => {
        const row = document.createElement('tr');
        
        // تحديد لون الصف حسب الحالة
        if (commission.status === 'معلقة') {
            row.classList.add('table-warning');
        } else if (commission.status === 'مدفوعة') {
            row.classList.add('table-success');
        }
        
        // إنشاء محتوى الصف
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="property-icon me-2">
                        <i class="${getPropertyIcon(commission.propertyType)}"></i>
                    </div>
                    <div>
                        <span class="fw-bold">${commission.propertyName}</span>
                        <small class="d-block text-muted">${commission.propertyType}</small>
                    </div>
                </div>
            </td>
            <td>${commission.clientName}</td>
            <td>
                <span class="badge ${commission.dealType === 'بيع' ? 'bg-primary' : 'bg-info'}">${commission.dealType}</span>
            </td>
            <td>${formatCurrency(commission.dealValue)} ريال</td>
            <td>
                <div class="commission-amount">
                    <span class="fw-bold">${formatCurrency(commission.commissionAmount)} ريال</span>
                    <small class="d-block text-muted">${commission.commissionRate}%</small>
                </div>
            </td>
            <td>${formatDate(commission.dealDate)}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(commission.status)}">${commission.status}</span>
            </td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary" type="button" id="commission-actions-${commission.id}" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="commission-actions-${commission.id}">
                        <li><a class="dropdown-item" href="#" onclick="viewCommissionDetails(${commission.id})"><i class="fas fa-eye me-2"></i> عرض التفاصيل</a></li>
                        <li><a class="dropdown-item" href="#" onclick="viewRelatedDocuments(${commission.id})"><i class="fas fa-file me-2"></i> المستندات المرتبطة</a></li>
                        ${commission.status === 'معلقة' ? `<li><a class="dropdown-item" href="#" onclick="markAsPaid(${commission.id})"><i class="fas fa-check me-2"></i> تحديد كمدفوعة</a></li>` : ''}
                        <li><a class="dropdown-item" href="#" onclick="exportAsPDF(${commission.id})"><i class="fas fa-download me-2"></i> تصدير PDF</a></li>
                    </ul>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل جدول سجل المدفوعات
function loadPaymentsTable(period = '6months') {
    const tableBody = document.getElementById('payments-table-body');
    
    if (!tableBody) return;
    
    // الحصول على بيانات المدفوعات حسب الفترة
    const payments = window.commissionsManager.getPaymentsByPeriod(period);
    
    // إفراغ الجدول
    tableBody.innerHTML = '';
    
    // تعبئة الجدول بالبيانات
    payments.forEach((payment, index) => {
        const row = document.createElement('tr');
        
        // إنشاء محتوى الصف
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${payment.reference}</td>
            <td>${formatCurrency(payment.amount)} ريال</td>
            <td>
                <span class="${getPaymentMethodClass(payment.method)}">
                    <i class="${getPaymentMethodIcon(payment.method)} me-1"></i>
                    ${payment.method}
                </span>
            </td>
            <td>${formatDate(payment.date)}</td>
            <td>${payment.description}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary" type="button" id="payment-actions-${payment.id}" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="payment-actions-${payment.id}">
                        <li><a class="dropdown-item" href="#" onclick="viewPaymentDetails('${payment.id}')"><i class="fas fa-eye me-2"></i> عرض التفاصيل</a></li>
                        <li><a class="dropdown-item" href="#" onclick="printReceipt('${payment.id}')"><i class="fas fa-print me-2"></i> طباعة الإيصال</a></li>
                        <li><a class="dropdown-item" href="#" onclick="exportPaymentAsPDF('${payment.id}')"><i class="fas fa-download me-2"></i> تصدير PDF</a></li>
                    </ul>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل جدول المستندات
function loadDocumentsTable() {
    const tableBody = document.getElementById('documents-table-body');
    
    if (!tableBody) return;
    
    // الحصول على بيانات المستندات
    const documents = window.commissionsManager.documents;
    
    // إفراغ الجدول
    tableBody.innerHTML = '';
    
    // تعبئة الجدول بالبيانات
    documents.forEach((document, index) => {
        const row = document.document('tr');
        
        // إنشاء محتوى الصف
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="document-icon me-2">
                        <i class="${getDocumentIcon(document.extension)}"></i>
                    </div>
                    <div>
                        <span class="fw-bold">${document.name}</span>
                        <small class="d-block text-muted">${document.extension.toUpperCase()}</small>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge ${getDocumentTypeBadgeClass(document.type)}">${getDocumentTypeName(document.type)}</span>
            </td>
            <td>${formatDate(document.uploadDate)}</td>
            <td>${document.size}</td>
            <td>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="viewDocument(${document.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-success" onclick="downloadDocument(${document.id})">
                        <i class="fas fa-download"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteDocument(${document.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل جدول طلبات السحب
function loadWithdrawalsTable() {
    const tableBody = document.getElementById('withdrawals-table-body');
    
    if (!tableBody) return;
    
    // الحصول على بيانات طلبات السحب
    const withdrawalRequests = window.commissionsManager.withdrawalRequests;
    
    // إفراغ الجدول
    tableBody.innerHTML = '';
    
    // تعبئة الجدول بالبيانات
    withdrawalRequests.forEach((request, index) => {
        const row = document.createElement('tr');
        
        // تحديد لون الصف حسب الحالة
        if (request.status === 'قيد المعالجة') {
            row.classList.add('table-warning');
        } else if (request.status === 'مكتمل') {
            row.classList.add('table-success');
        } else if (request.status === 'مرفوض') {
            row.classList.add('table-danger');
        }
        
        // إنشاء محتوى الصف
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatCurrency(request.amount)} ريال</td>
            <td>${formatDate(request.requestDate)}</td>
            <td>
                <span class="${getPaymentMethodClass(request.method)}">
                    <i class="${getPaymentMethodIcon(request.method)} me-1"></i>
                    ${request.method}
                </span>
            </td>
            <td>
                <span class="badge ${getWithdrawalStatusBadgeClass(request.status)}">${request.status}</span>
            </td>
            <td>${formatDate(request.updateDate)}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary" type="button" id="withdrawal-actions-${request.id}" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="withdrawal-actions-${request.id}">
                        <li><a class="dropdown-item" href="#" onclick="viewWithdrawalDetails(${request.id})"><i class="fas fa-eye me-2"></i> عرض التفاصيل</a></li>
                        ${request.status === 'قيد المعالجة' ? `
                            <li><a class="dropdown-item" href="#" onclick="cancelWithdrawal(${request.id})"><i class="fas fa-times me-2"></i> إلغاء الطلب</a></li>
                        ` : ''}
                        ${request.status === 'مكتمل' ? `
                            <li><a class="dropdown-item" href="#" onclick="downloadWithdrawalReceipt(${request.id})"><i class="fas fa-download me-2"></i> تنزيل الإيصال</a></li>
                        ` : ''}
                    </ul>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// دوال عرض التفاصيل

// عرض تفاصيل العمولة
function viewCommissionDetails(commissionId) {
    // في الإصدار الحقيقي، سيتم تنفيذ عرض التفاصيل
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    const commission = window.commissionsManager.commissions.find(c => c.id === commissionId);
    if (commission) {
        alert(`تفاصيل العمولة: ${commission.propertyName} - ${commission.clientName} - ${formatCurrency(commission.commissionAmount)} ريال`);
    }
}

// عرض المستندات المرتبطة
function viewRelatedDocuments(commissionId) {
    // في الإصدار الحقيقي، سيتم تنفيذ عرض المستندات المرتبطة
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    const documents = window.commissionsManager.getDocumentsByCommission(commissionId);
    
    if (documents.length > 0) {
        alert(`عدد المستندات المرتبطة: ${documents.length} مستند`);
    } else {
        alert('لا توجد مستندات مرتبطة بهذه العمولة');
    }
}

// تحديد العمولة كمدفوعة
function markAsPaid(commissionId) {
    // في الإصدار الحقيقي، سيتم تنفيذ تحديث حالة العمولة
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    const commission = window.commissionsManager.commissions.find(c => c.id === commissionId);
    
    if (commission) {
        commission.status = 'مدفوعة';
        commission.paymentId = 'PMT-NEW';
        commission.paymentDate = new Date().toISOString().split('T')[0];
        
        // تحديث الجدول
        loadCommissionsTable();
        
        // تحديث الإحصائيات
        updateStatistics();
        
        // عرض إشعار نجاح
        showNotification('تم تحديث حالة العمولة إلى مدفوعة بنجاح', 'success');
    }
}

// تصدير العمولة كملف PDF
function exportAsPDF(commissionId) {
    // في الإصدار الحقيقي، سيتم تنفيذ تصدير الملف
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('تم تصدير العمولة كملف PDF بنجاح', 'success');
}

// عرض تفاصيل الدفع
function viewPaymentDetails(paymentId) {
    // في الإصدار الحقيقي، سيتم تنفيذ عرض التفاصيل
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    const payment = window.commissionsManager.payments.find(p => p.id === paymentId);
    
    if (payment) {
        alert(`تفاصيل الدفع: ${payment.reference} - ${formatCurrency(payment.amount)} ريال - ${payment.description}`);
    }
}

// طباعة إيصال الدفع
function printReceipt(paymentId) {
    // في الإصدار الحقيقي، سيتم تنفيذ طباعة الإيصال
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('تم إرسال الإيصال للطباعة', 'success');
}

// تصدير الدفع كملف PDF
function exportPaymentAsPDF(paymentId) {
    // في الإصدار الحقيقي، سيتم تنفيذ تصدير الملف
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('تم تصدير الدفع كملف PDF بنجاح', 'success');
}

// عرض المستند
function viewDocument(documentId) {
    // في الإصدار الحقيقي، سيتم تنفيذ عرض المستند
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('جاري فتح المستند...', 'info');
}

// تنزيل المستند
function downloadDocument(documentId) {
    // في الإصدار الحقيقي، سيتم تنفيذ تنزيل المستند
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('تم تنزيل المستند بنجاح', 'success');
}

// حذف المستند
function deleteDocument(documentId) {
    // في الإصدار الحقيقي، سيتم تنفيذ حذف المستند بعد تأكيد من المستخدم
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المستند؟')) {
        showNotification('تم حذف المستند بنجاح', 'success');
        
        // تحديث الجدول
        loadDocumentsTable();
    }
}

// عرض تفاصيل طلب السحب
function viewWithdrawalDetails(withdrawalId) {
    // في الإصدار الحقيقي، سيتم تنفيذ عرض التفاصيل
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    const withdrawal = window.commissionsManager.withdrawalRequests.find(w => w.id === withdrawalId);
    
    if (withdrawal) {
        let detailsMessage = `مبلغ السحب: ${formatCurrency(withdrawal.amount)} ريال\n`;
        detailsMessage += `تاريخ الطلب: ${formatDate(withdrawal.requestDate)}\n`;
        detailsMessage += `طريقة الاستلام: ${withdrawal.method}\n`;
        
        if (withdrawal.method === 'تحويل بنكي') {
            detailsMessage += `البنك: ${withdrawal.bankName}\n`;
            detailsMessage += `رقم الحساب: ${withdrawal.accountNumber}\n`;
        } else if (withdrawal.method === 'محفظة إلكترونية') {
            detailsMessage += `نوع المحفظة: ${withdrawal.walletType}\n`;
            detailsMessage += `رقم المحفظة: ${withdrawal.walletNumber}\n`;
        }
        
        alert(detailsMessage);
    }
}

// إلغاء طلب السحب
function cancelWithdrawal(withdrawalId) {
    // في الإصدار الحقيقي، سيتم تنفيذ إلغاء الطلب بعد تأكيد من المستخدم
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    if (confirm('هل أنت متأكد من رغبتك في إلغاء طلب السحب هذا؟')) {
        const withdrawal = window.commissionsManager.withdrawalRequests.find(w => w.id === withdrawalId);
        
        if (withdrawal) {
            // تحديث حالة الطلب
            withdrawal.status = 'ملغي';
            withdrawal.updateDate = new Date().toISOString().split('T')[0];
            
            // تحديث الجدول
            loadWithdrawalsTable();
            
            // عرض إشعار نجاح
            showNotification('تم إلغاء طلب السحب بنجاح', 'success');
        }
    }
}

// تنزيل إيصال السحب
function downloadWithdrawalReceipt(withdrawalId) {
    // في الإصدار الحقيقي، سيتم تنفيذ تنزيل إيصال السحب
    // هنا نعرض فقط إشعاراً لأغراض العرض
    
    showNotification('تم تنزيل إيصال السحب بنجاح', 'success');
}

// دوال مساعدة

// الحصول على أيقونة نوع العقار
function getPropertyIcon(propertyType) {
    switch (propertyType) {
        case 'فيلا':
            return 'fas fa-home';
        case 'شقة':
            return 'fas fa-building';
        case 'أرض تجارية':
        case 'أرض سكنية':
            return 'fas fa-map-marked-alt';
        case 'مكتب':
            return 'fas fa-briefcase';
        case 'محل تجاري':
            return 'fas fa-store';
        default:
            return 'fas fa-landmark';
    }
}

// الحصول على صنف badge الحالة
function getStatusBadgeClass(status) {
    switch (status) {
        case 'مدفوعة':
            return 'bg-success';
        case 'معلقة':
            return 'bg-warning text-dark';
        case 'ملغية':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

// الحصول على صنف طريقة الدفع
function getPaymentMethodClass(method) {
    switch (method) {
        case 'تحويل بنكي':
            return 'text-primary';
        case 'محفظة إلكترونية':
            return 'text-success';
        case 'نقدي':
            return 'text-warning';
        default:
            return 'text-muted';
    }
}

// الحصول على أيقونة طريقة الدفع
function getPaymentMethodIcon(method) {
    switch (method) {
        case 'تحويل بنكي':
            return 'fas fa-university';
        case 'محفظة إلكترونية':
            return 'fas fa-wallet';
        case 'نقدي':
            return 'fas fa-money-bill-wave';
        default:
            return 'fas fa-money-check';
    }
}

// الحصول على أيقونة نوع المستند
function getDocumentIcon(extension) {
    switch (extension.toLowerCase()) {
        case 'pdf':
            return 'far fa-file-pdf';
        case 'doc':
        case 'docx':
            return 'far fa-file-word';
        case 'xls':
        case 'xlsx':
            return 'far fa-file-excel';
        case 'jpg':
        case 'jpeg':
        case 'png':
            return 'far fa-file-image';
        default:
            return 'far fa-file';
    }
}

// الحصول على صنف badge نوع المستند
function getDocumentTypeBadgeClass(type) {
    switch (type) {
        case 'invoice':
            return 'bg-primary';
        case 'receipt':
            return 'bg-success';
        case 'contract':
            return 'bg-info';
        case 'id':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

// الحصول على اسم نوع المستند
function getDocumentTypeName(type) {
    switch (type) {
        case 'invoice':
            return 'فاتورة';
        case 'receipt':
            return 'إيصال';
        case 'contract':
            return 'عقد';
        case 'id':
            return 'وثيقة هوية';
        default:
            return 'أخرى';
    }
}

// الحصول على صنف badge حالة طلب السحب
function getWithdrawalStatusBadgeClass(status) {
    switch (status) {
        case 'مكتمل':
            return 'bg-success';
        case 'قيد المعالجة':
            return 'bg-warning text-dark';
        case 'مرفوض':
            return 'bg-danger';
        case 'ملغي':
            return 'bg-secondary';
        default:
            return 'bg-secondary';
    }
}
