/**
 * Real Estate TikTok - Marketers Dashboard
 * CRM (Customer Relationship Management) Logic
 * Version: 1.0.0
 */

// بيانات العملاء (نموذج بيانات وهمية للتطوير)
let customers = [
    {
        id: 1,
        name: "أحمد محمد",
        phone: "0555123456",
        email: "ahmed@example.com",
        status: "محتمل",
        interest: "فيلا",
        budget: "1,000,000 - 1,500,000",
        location: "حي النرجس",
        lastContact: "2025-03-20",
        notes: "مهتم بالفلل الحديثة مع مسبح",
        tags: ["VIP", "جاد"]
    },
    {
        id: 2,
        name: "سارة علي",
        phone: "0555789012",
        email: "sara@example.com",
        status: "فعّال",
        interest: "شقة",
        budget: "500,000 - 800,000",
        location: "حي الياسمين",
        lastContact: "2025-03-22",
        notes: "تبحث عن شقة لعائلة من 4 أفراد",
        tags: ["عميل جديد"]
    },
    {
        id: 3,
        name: "خالد العبدالله",
        phone: "0555456789",
        email: "khalid@example.com",
        status: "معلق",
        interest: "أرض تجارية",
        budget: "2,000,000+",
        location: "وسط المدينة",
        lastContact: "2025-03-15",
        notes: "يبحث عن استثمار تجاري",
        tags: ["مستثمر"]
    },
    {
        id: 4,
        name: "نورة سعد",
        phone: "0555234567",
        email: "noura@example.com",
        status: "فعّال",
        interest: "فيلا",
        budget: "1,500,000 - 2,000,000",
        location: "حي الملقا",
        lastContact: "2025-03-23",
        notes: "تريد فيلا مع حديقة كبيرة",
        tags: ["VIP", "جاد"]
    },
    {
        id: 5,
        name: "فهد العمر",
        phone: "0555345678",
        email: "fahad@example.com",
        status: "محتمل",
        interest: "شقة",
        budget: "400,000 - 600,000",
        location: "حي المروج",
        lastContact: "2025-03-18",
        notes: "يبحث عن شقة للعائلة",
        tags: ["جديد"]
    }
];

// تحميل بيانات العملاء
document.addEventListener('DOMContentLoaded', function() {
    loadCustomers();
    setupEventListeners();
});

// تحميل بيانات العملاء في الجدول
function loadCustomers(filteredData) {
    const customersData = filteredData || customers;
    const customerTableBody = document.getElementById('customer-table-body');
    
    if (!customerTableBody) return;
    
    customerTableBody.innerHTML = '';
    
    customersData.forEach(customer => {
        const row = document.createElement('tr');
        
        // تعيين صف التحديد
        if (customer.status === "فعّال") {
            row.classList.add('table-success-light');
        } else if (customer.status === "محتمل") {
            row.classList.add('table-warning-light');
        } else if (customer.status === "معلق") {
            row.classList.add('table-secondary-light');
        }
        
        row.innerHTML = `
            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${customer.id}" id="customer-${customer.id}">
                    <label class="form-check-label" for="customer-${customer.id}"></label>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar-circle d-flex justify-content-center align-items-center me-2">
                        ${getInitials(customer.name)}
                    </div>
                    <div>
                        <h6 class="mb-0">${customer.name}</h6>
                        <small class="text-muted">${customer.phone}</small>
                    </div>
                </div>
            </td>
            <td>${customer.email}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(customer.status)}">${customer.status}</span>
            </td>
            <td>${customer.interest}</td>
            <td>${customer.budget}</td>
            <td>${customer.location}</td>
            <td>${formatDate(customer.lastContact)}</td>
            <td>
                <div class="tags-container">
                    ${renderTags(customer.tags)}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#customerModal" data-customer-id="${customer.id}" title="تحرير">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info me-1" title="اتصال سريع">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success" title="إضافة ملاحظة">
                        <i class="fas fa-sticky-note"></i>
                    </button>
                </div>
            </td>
        `;
        
        customerTableBody.appendChild(row);
    });
    
    // تحديث عدد العملاء
    updateCustomerCount(customersData.length);
}

// الحصول على الأحرف الأولى للاسم
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// الحصول على فئة شارة الحالة
function getStatusBadgeClass(status) {
    switch(status) {
        case 'فعّال':
            return 'bg-success';
        case 'محتمل':
            return 'bg-warning';
        case 'معلق':
            return 'bg-secondary';
        default:
            return 'bg-info';
    }
}

// عرض العلامات
function renderTags(tags) {
    if (!tags || tags.length === 0) return '';
    
    return tags.map(tag => `<span class="badge bg-info-light text-info me-1">${tag}</span>`).join('');
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
}

// تحديث عدد العملاء
function updateCustomerCount(count) {
    const customerCountElement = document.getElementById('customer-count');
    if (customerCountElement) {
        customerCountElement.textContent = count;
    }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمع لحدث تغيير البحث
    const searchInput = document.getElementById('search-customers');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterCustomers(searchTerm);
        });
    }
    
    // مستمع لحدث تغيير التصفية حسب الحالة
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterCustomersByStatus(this.value);
        });
    }
    
    // مستمع لحدث فتح نافذة تعديل العميل
    const customerModal = document.getElementById('customerModal');
    if (customerModal) {
        customerModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const customerId = button.getAttribute('data-customer-id');
            
            if (customerId) {
                // تحرير عميل موجود
                const customer = customers.find(c => c.id == customerId);
                if (customer) {
                    fillCustomerForm(customer);
                }
            } else {
                // إضافة عميل جديد
                resetCustomerForm();
            }
        });
    }
    
    // مستمع لحدث حفظ العميل
    const saveCustomerBtn = document.getElementById('save-customer');
    if (saveCustomerBtn) {
        saveCustomerBtn.addEventListener('click', saveCustomer);
    }
    
    // مستمع لحدث تحديد الكل
    const selectAllCheckbox = document.getElementById('select-all-customers');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#customer-table-body input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            
            // تحديث عرض زر الإجراءات الجماعية
            updateBulkActionsVisibility();
        });
    }
    
    // مستمع لأحداث التحديد الفردية
    document.addEventListener('change', function(event) {
        if (event.target.matches('#customer-table-body input[type="checkbox"]')) {
            updateBulkActionsVisibility();
        }
    });
}

// تصفية العملاء حسب مصطلح البحث
function filterCustomers(searchTerm) {
    if (!searchTerm) {
        loadCustomers();
        return;
    }
    
    const filteredCustomers = customers.filter(customer => {
        return (
            customer.name.toLowerCase().includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm) ||
            customer.location.toLowerCase().includes(searchTerm) ||
            customer.interest.toLowerCase().includes(searchTerm) ||
            customer.notes.toLowerCase().includes(searchTerm)
        );
    });
    
    loadCustomers(filteredCustomers);
}

// تصفية العملاء حسب الحالة
function filterCustomersByStatus(status) {
    if (!status || status === 'الكل') {
        loadCustomers();
        return;
    }
    
    const filteredCustomers = customers.filter(customer => customer.status === status);
    loadCustomers(filteredCustomers);
}

// ملء نموذج العميل بالبيانات
function fillCustomerForm(customer) {
    document.getElementById('customer-id').value = customer.id;
    document.getElementById('customer-name').value = customer.name;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-email').value = customer.email;
    document.getElementById('customer-status').value = customer.status;
    document.getElementById('customer-interest').value = customer.interest;
    document.getElementById('customer-budget').value = customer.budget;
    document.getElementById('customer-location').value = customer.location;
    document.getElementById('customer-lastContact').value = customer.lastContact;
    document.getElementById('customer-notes').value = customer.notes;
    
    // تحديث عنوان النافذة
    document.getElementById('customerModalLabel').textContent = 'تحرير بيانات العميل';
}

// إعادة تعيين نموذج العميل
function resetCustomerForm() {
    document.getElementById('customer-form').reset();
    document.getElementById('customer-id').value = '';
    
    // تحديث عنوان النافذة
    document.getElementById('customerModalLabel').textContent = 'إضافة عميل جديد';
}

// حفظ بيانات العميل
function saveCustomer() {
    const customerId = document.getElementById('customer-id').value;
    
    const customerData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        status: document.getElementById('customer-status').value,
        interest: document.getElementById('customer-interest').value,
        budget: document.getElementById('customer-budget').value,
        location: document.getElementById('customer-location').value,
        lastContact: document.getElementById('customer-lastContact').value,
        notes: document.getElementById('customer-notes').value,
        tags: [] // سيتم تنفيذ نظام العلامات لاحقاً
    };
    
    if (customerId) {
        // تحديث عميل موجود
        const index = customers.findIndex(c => c.id == customerId);
        if (index !== -1) {
            customerData.id = parseInt(customerId);
            customerData.tags = customers[index].tags; // الاحتفاظ بالعلامات الحالية
            customers[index] = customerData;
        }
    } else {
        // إضافة عميل جديد
        customerData.id = Math.max(...customers.map(c => c.id), 0) + 1;
        customers.push(customerData);
    }
    
    // إعادة تحميل البيانات وإخفاء النافذة
    loadCustomers();
    
    const modalElement = document.getElementById('customerModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    
    // عرض رسالة نجاح
    showNotification('تم حفظ بيانات العميل بنجاح', 'success');
}

// تحديث ظهور قسم الإجراءات الجماعية
function updateBulkActionsVisibility() {
    const bulkActionsSection = document.getElementById('bulk-actions');
    const selectedCheckboxes = document.querySelectorAll('#customer-table-body input[type="checkbox"]:checked');
    
    if (bulkActionsSection) {
        if (selectedCheckboxes.length > 0) {
            bulkActionsSection.classList.remove('d-none');
            document.getElementById('selected-count').textContent = selectedCheckboxes.length;
        } else {
            bulkActionsSection.classList.add('d-none');
        }
    }
}

// عرض إشعارات للمستخدم
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
