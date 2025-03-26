/**
 * crm-ui.js
 * ملف واجهة المستخدم لإدارة العملاء للمسوقين العقاريين
 * تاريخ الإنشاء: 23 مارس 2025
 */

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initializeCRMPage();
});

// تهيئة صفحة إدارة العملاء
function initializeCRMPage() {
    loadCustomerTable();
    setupFilters();
    setupCustomerForm();
    setupEventListeners();
    initializeStatistics();
}

// تحميل بيانات العملاء وعرضها في الجدول
function loadCustomerTable(filters = {}) {
    const tableBody = document.querySelector('#customers-table tbody');
    
    // الحصول على بيانات العملاء
    let customers = window.crmData.getAllCustomers();
    
    // تطبيق الفلاتر
    customers = applyFilters(customers, filters);
    
    // مسح الجدول الحالي
    tableBody.innerHTML = '';
    
    // إذا لم توجد بيانات
    if (customers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4">
                    <i class="fas fa-users-slash fa-2x mb-3 text-muted"></i>
                    <p>لا يوجد عملاء متطابقين مع معايير البحث</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // إنشاء صفوف الجدول
    customers.forEach(customer => {
        // الحصول على حالة العميل وفئة التنسيق
        const status = window.crmData.getCustomerStatuses().find(s => s.id === customer.status);
        const interestLevel = window.crmData.getInterestLevels().find(i => i.id === customer.interestLevel);
        
        // إنشاء سطر جديد
        const row = document.createElement('tr');
        
        // تحديد لون الخلفية حسب الحالة
        if (customer.status === 'customer') {
            row.classList.add('table-success-light');
        } else if (customer.status === 'lead') {
            row.classList.add('table-warning-light');
        } else {
            row.classList.add('table-secondary-light');
        }
        
        // إنشاء الأحرف الأولى من اسم العميل للعرض
        const initials = customer.name.split(' ').map(n => n[0]).slice(0, 2).join('');
        
        row.innerHTML = `
            <td>
                <div class="form-check">
                    <input class="form-check-input customer-select" type="checkbox" value="${customer.id}">
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar-circle d-flex align-items-center justify-content-center me-2">
                        ${initials}
                    </div>
                    <div>
                        <a href="#" class="customer-profile-link" data-id="${customer.id}">${customer.name}</a>
                        <div class="small text-muted">${customer.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge bg-${status.color}-light text-${status.color} rounded-pill px-3 py-2">
                    ${status.name}
                </span>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="rating me-2">
                        ${createInterestStars(customer.interestLevel)}
                    </div>
                    <span class="small">${interestLevel.name}</span>
                </div>
            </td>
            <td>${customer.source}</td>
            <td>${customer.budget}</td>
            <td>${formatDate(customer.lastContact)}</td>
            <td>
                <div class="tags-container">
                    ${createTagsHtml(customer.tags)}
                </div>
            </td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm dropdown-toggle no-arrow" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item edit-customer" href="#" data-id="${customer.id}"><i class="fas fa-edit me-2"></i>تعديل</a></li>
                        <li><a class="dropdown-item add-interaction" href="#" data-id="${customer.id}"><i class="fas fa-comment-alt me-2"></i>إضافة تفاعل</a></li>
                        <li><a class="dropdown-item view-profile" href="#" data-id="${customer.id}"><i class="fas fa-user me-2"></i>عرض الملف الشخصي</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger delete-customer" href="#" data-id="${customer.id}"><i class="fas fa-trash-alt me-2"></i>حذف</a></li>
                    </ul>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // تحديث عداد العملاء
    document.getElementById('customer-count').textContent = customers.length;
}

// إنشاء نجوم تقييم مستوى الاهتمام
function createInterestStars(level) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= level) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-muted"></i>';
        }
    }
    return stars;
}

// إنشاء HTML للوسوم
function createTagsHtml(tags) {
    if (!tags || !tags.length) return '<span class="text-muted small">-</span>';
    
    return tags.map(tag => 
        `<span class="badge rounded-pill bg-info-light text-info me-1">${tag}</span>`
    ).join('');
}

// تنسيق التاريخ
function formatDate(dateString) {
    if (!dateString) return '-';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', options);
}

// تطبيق الفلاتر على مصفوفة العملاء
function applyFilters(customers, filters) {
    // إذا لم توجد فلاتر نشطة
    if (Object.keys(filters).length === 0) {
        return customers;
    }
    
    return customers.filter(customer => {
        let match = true;
        
        // فلتر الحالة
        if (filters.status && filters.status !== 'all') {
            match = match && customer.status === filters.status;
        }
        
        // فلتر مستوى الاهتمام
        if (filters.interestLevel && filters.interestLevel !== 'all') {
            match = match && customer.interestLevel >= parseInt(filters.interestLevel);
        }
        
        // فلتر المصدر
        if (filters.source && filters.source !== 'all') {
            match = match && customer.source === filters.source;
        }
        
        // فلتر الموظف
        if (filters.assignedTo && filters.assignedTo !== 'all') {
            match = match && customer.assignedTo === filters.assignedTo;
        }
        
        // فلتر البحث
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const searchIn = [
                customer.name.toLowerCase(),
                customer.email.toLowerCase(),
                customer.phone,
                (customer.notes || '').toLowerCase()
            ];
            match = match && searchIn.some(field => field.includes(searchTerm));
        }
        
        return match;
    });
}

// إعداد فلاتر البحث والتصفية
function setupFilters() {
    // تحميل قائمة المصادر
    const sourceFilter = document.getElementById('source-filter');
    if (sourceFilter) {
        const sources = window.crmData.getCustomerSources();
        sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            sourceFilter.appendChild(option);
        });
    }
    
    // تحميل قائمة الحالات
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        const statuses = window.crmData.getCustomerStatuses();
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status.id;
            option.textContent = status.name;
            statusFilter.appendChild(option);
        });
    }
    
    // تحميل قائمة مستويات الاهتمام
    const interestFilter = document.getElementById('interest-filter');
    if (interestFilter) {
        const interests = window.crmData.getInterestLevels();
        interests.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.id;
            option.textContent = interest.name;
            interestFilter.appendChild(option);
        });
    }
    
    // تحميل قائمة الموظفين
    const assigneeFilter = document.getElementById('assignee-filter');
    if (assigneeFilter) {
        const assignees = window.crmData.getAssignees();
        assignees.forEach(assignee => {
            const option = document.createElement('option');
            option.value = assignee.id;
            option.textContent = assignee.name;
            assigneeFilter.appendChild(option);
        });
    }
    
    // إضافة مستمعي الأحداث للفلاتر
    const filterInputs = document.querySelectorAll('.filter-control');
    filterInputs.forEach(input => {
        input.addEventListener('change', applyUserFilters);
    });
    
    // إضافة مستمع حدث للبحث
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyUserFilters, 300));
    }
}

// تطبيق الفلاتر عند تغيير قيم الحقول
function applyUserFilters() {
    const filters = {
        status: document.getElementById('status-filter')?.value,
        interestLevel: document.getElementById('interest-filter')?.value,
        source: document.getElementById('source-filter')?.value,
        assignedTo: document.getElementById('assignee-filter')?.value,
        search: document.getElementById('search-input')?.value
    };
    
    // تحديث الجدول مع الفلاتر الجديدة
    loadCustomerTable(filters);
}

// تأخير تنفيذ الدالة (لمنع التنفيذ المتكرر أثناء الكتابة)
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// إعداد نموذج إضافة/تعديل العميل
function setupCustomerForm() {
    const form = document.getElementById('customer-form');
    
    // تحميل قائمة المصادر
    const sourceSelect = document.getElementById('customer-source');
    if (sourceSelect) {
        const sources = window.crmData.getCustomerSources();
        sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            sourceSelect.appendChild(option);
        });
    }
    
    // تحميل قائمة الحالات
    const statusSelect = document.getElementById('customer-status');
    if (statusSelect) {
        const statuses = window.crmData.getCustomerStatuses();
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status.id;
            option.textContent = status.name;
            statusSelect.appendChild(option);
        });
    }
    
    // تحميل قائمة مستويات الاهتمام
    const interestSelect = document.getElementById('customer-interest');
    if (interestSelect) {
        const interests = window.crmData.getInterestLevels();
        interests.forEach(interest => {
            const option = document.createElement('option');
            option.value = interest.id;
            option.textContent = interest.name;
            interestSelect.appendChild(option);
        });
    }
    
    // تحميل قائمة الموظفين
    const assigneeSelect = document.getElementById('customer-assignee');
    if (assigneeSelect) {
        const assignees = window.crmData.getAssignees();
        assignees.forEach(assignee => {
            const option = document.createElement('option');
            option.value = assignee.id;
            option.textContent = assignee.name;
            assigneeSelect.appendChild(option);
        });
    }
}

// تحميل بيانات عميل محدد في النموذج
function loadCustomerData(customerId) {
    const customer = window.crmData.getCustomerById(parseInt(customerId));
    if (!customer) return;
    
    // تعيين عنوان النافذة المنبثقة
    document.getElementById('customerModalLabel').textContent = 'تعديل بيانات العميل';
    
    // تعبئة حقول النموذج
    document.getElementById('customer-id').value = customer.id;
    document.getElementById('customer-name').value = customer.name;
    document.getElementById('customer-email').value = customer.email;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-status').value = customer.status;
    document.getElementById('customer-source').value = customer.source;
    document.getElementById('customer-interest').value = customer.interestLevel;
    document.getElementById('customer-budget').value = customer.budget;
    document.getElementById('customer-locations').value = customer.preferredLocations?.join(', ') || '';
    document.getElementById('customer-property-types').value = customer.propertyType?.join(', ') || '';
    document.getElementById('customer-tags').value = customer.tags?.join(', ') || '';
    document.getElementById('customer-notes').value = customer.notes || '';
    document.getElementById('customer-assignee').value = customer.assignedTo || '';
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إضافة عميل جديد
    const addButton = document.getElementById('add-customer-btn');
    if (addButton) {
        addButton.addEventListener('click', () => {
            // إعادة تعيين النموذج
            document.getElementById('customer-form').reset();
            document.getElementById('customer-id').value = '';
            document.getElementById('customerModalLabel').textContent = 'إضافة عميل جديد';
            
            // عرض النافذة المنبثقة
            const modal = new bootstrap.Modal(document.getElementById('customerModal'));
            modal.show();
        });
    }
    
    // أزرار تعديل العميل
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-customer')) {
            e.preventDefault();
            const customerId = e.target.closest('.edit-customer').dataset.id;
            loadCustomerData(customerId);
            
            // عرض النافذة المنبثقة
            const modal = new bootstrap.Modal(document.getElementById('customerModal'));
            modal.show();
        }
    });
    
    // حفظ بيانات العميل
    const saveButton = document.getElementById('save-customer');
    if (saveButton) {
        saveButton.addEventListener('click', saveCustomerData);
    }
    
    // تحديد/إلغاء تحديد جميع العملاء
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.customer-select');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            
            // تحديث قسم الإجراءات المجمعة
            updateBulkActionsVisibility();
        });
    }
    
    // مراقبة صناديق اختيار العملاء
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('customer-select')) {
            updateBulkActionsVisibility();
        }
    });
    
    // إظهار/إخفاء فلاتر البحث
    const toggleFilters = document.getElementById('toggle-filters');
    if (toggleFilters) {
        toggleFilters.addEventListener('click', function() {
            const filterSection = document.querySelector('.filter-section');
            filterSection.classList.toggle('d-none');
            
            // تغيير نص الزر
            if (filterSection.classList.contains('d-none')) {
                this.innerHTML = '<i class="fas fa-filter me-1"></i> إظهار الفلاتر';
            } else {
                this.innerHTML = '<i class="fas fa-times me-1"></i> إخفاء الفلاتر';
            }
        });
    }
}

// حفظ بيانات العميل
function saveCustomerData() {
    // جمع بيانات النموذج
    const customerId = document.getElementById('customer-id').value;
    const customerData = {
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        status: document.getElementById('customer-status').value,
        source: document.getElementById('customer-source').value,
        interestLevel: parseInt(document.getElementById('customer-interest').value),
        budget: document.getElementById('customer-budget').value,
        preferredLocations: document.getElementById('customer-locations').value.split(',').map(item => item.trim()).filter(Boolean),
        propertyType: document.getElementById('customer-property-types').value.split(',').map(item => item.trim()).filter(Boolean),
        tags: document.getElementById('customer-tags').value.split(',').map(item => item.trim()).filter(Boolean),
        notes: document.getElementById('customer-notes').value,
        assignedTo: document.getElementById('customer-assignee').value
    };
    
    // التحقق إذا كان هذا عميل حالي أو عميل جديد
    if (customerId) {
        // تحديث عميل موجود
        customerData.id = parseInt(customerId);
        const success = window.crmData.updateCustomer(customerData);
        if (success) {
            showNotification('success', 'تم تحديث بيانات العميل بنجاح');
        } else {
            showNotification('danger', 'حدث خطأ أثناء تحديث بيانات العميل');
        }
    } else {
        // إضافة عميل جديد
        const newId = window.crmData.addCustomer(customerData);
        if (newId) {
            showNotification('success', 'تمت إضافة العميل الجديد بنجاح');
        } else {
            showNotification('danger', 'حدث خطأ أثناء إضافة العميل الجديد');
        }
    }
    
    // إغلاق النافذة المنبثقة
    const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'));
    modal.hide();
    
    // إعادة تحميل الجدول
    loadCustomerTable();
    
    // تحديث الإحصائيات
    initializeStatistics();
}

// تحديث ظهور قسم الإجراءات المجمعة
function updateBulkActionsVisibility() {
    const checkboxes = document.querySelectorAll('.customer-select:checked');
    const bulkActions = document.querySelector('.bulk-actions');
    
    if (checkboxes.length > 0) {
        bulkActions.classList.remove('d-none');
        document.getElementById('selected-count').textContent = checkboxes.length;
    } else {
        bulkActions.classList.add('d-none');
    }
}

// عرض إشعار للمستخدم
function showNotification(type, message) {
    const container = document.getElementById('notification-container');
    const id = `toast-${Date.now()}`;
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.id = id;
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
        </div>
    `;
    
    container.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast, {
        delay: 3000
    });
    bsToast.show();
    
    // حذف الإشعار بعد الإغلاق
    toast.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// تهيئة إحصائيات العملاء
function initializeStatistics() {
    const customers = window.crmData.getAllCustomers();
    
    // عدد العملاء حسب الحالة
    const leads = customers.filter(c => c.status === 'lead').length;
    const activeCustomers = customers.filter(c => c.status === 'customer').length;
    const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
    
    // عدد العملاء حسب مصدر الاستحواذ
    const sourceStats = {};
    window.crmData.getCustomerSources().forEach(source => {
        sourceStats[source] = customers.filter(c => c.source === source).length;
    });
    
    // عملاء ذوو اهتمام عالي
    const highInterest = customers.filter(c => c.interestLevel >= 4).length;
    
    // تحديث العناصر في الواجهة
    document.getElementById('leads-count').textContent = leads;
    document.getElementById('customers-count').textContent = activeCustomers;
    document.getElementById('inactive-count').textContent = inactiveCustomers;
    document.getElementById('high-interest-count').textContent = highInterest;
    
    // تحديث نسب مصادر العملاء - إذا كان لدينا مخطط بياني
    if (typeof Chart !== 'undefined' && document.getElementById('sourcesChart')) {
        updateSourcesChart(sourceStats);
    }
}

// تحديث مخطط مصادر العملاء
function updateSourcesChart(sourceStats) {
    const ctx = document.getElementById('sourcesChart').getContext('2d');
    
    // إذا كان المخطط موجوداً بالفعل، قم بتدميره
    if (window.sourcesChart) {
        window.sourcesChart.destroy();
    }
    
    // إنشاء البيانات للمخطط
    const labels = Object.keys(sourceStats);
    const data = Object.values(sourceStats);
    
    // إنشاء مخطط جديد
    window.sourcesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc',
                    '#f6c23e',
                    '#e74a3b',
                    '#5a5c69',
                    '#858796',
                    '#3498db',
                    '#9b59b6',
                    '#2ecc71'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            cutout: '60%'
        }
    });
}
