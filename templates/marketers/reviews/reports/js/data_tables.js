/**
 * مكونات الجداول التفاعلية لنظام التقارير
 * تم إنشاؤه: 27/03/2025
 */

// تهيئة جميع الجداول التفاعلية للتقرير
function initReportTables() {
    console.log("تهيئة الجداول التفاعلية للتقرير");
    
    // تهيئة الجداول المختلفة
    initDetailedDataTable();
    initSummaryTable();
    initComparisonTable();
    
    // إضافة أحداث التفاعل للجداول
    setupTableInteractions();
}

// تهيئة جدول البيانات التفصيلية
function initDetailedDataTable() {
    const tableElement = $('#detailed-data-table');
    
    // التحقق من وجود عنصر الجدول
    if (tableElement.length === 0) {
        console.error("لم يتم العثور على عنصر detailed-data-table");
        return;
    }
    
    // إعداد الجدول مع DataTables
    const detailedTable = tableElement.DataTable({
        language: {
            // تعريب واجهة الجدول
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/ar.json'
        },
        data: getSampleDetailedData(),
        columns: [
            { title: "رقم التقييم", data: "id" },
            { title: "العميل", data: "customer" },
            { title: "التقييم", data: "rating", 
              render: function(data) {
                  return `<div class="stars-container">${renderStars(data)}</div>`;
              }
            },
            { title: "التاريخ", data: "date" },
            { title: "التعليق", data: "comment" },
            { title: "الحالة", data: "status",
              render: function(data) {
                  let badgeClass = '';
                  switch(data) {
                      case 'تم الرد': badgeClass = 'bg-success'; break;
                      case 'قيد المراجعة': badgeClass = 'bg-warning text-dark'; break;
                      case 'جديد': badgeClass = 'bg-info'; break;
                      default: badgeClass = 'bg-secondary';
                  }
                  return `<span class="badge ${badgeClass}">${data}</span>`;
              }
            },
            { title: "إجراءات", data: null, 
              defaultContent: `
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary view-review-btn"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-outline-secondary reply-review-btn"><i class="fas fa-reply"></i></button>
                </div>
              `,
              orderable: false
            }
        ],
        responsive: true,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copy',
                text: 'نسخ',
                className: 'btn btn-sm btn-outline-secondary'
            },
            {
                extend: 'excel',
                text: 'Excel',
                className: 'btn btn-sm btn-outline-success'
            },
            {
                extend: 'pdf',
                text: 'PDF',
                className: 'btn btn-sm btn-outline-danger'
            },
            {
                extend: 'print',
                text: 'طباعة',
                className: 'btn btn-sm btn-outline-primary'
            }
        ],
        order: [[3, 'desc']], // ترتيب حسب التاريخ تنازلياً بشكل افتراضي
        pageLength: 10,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "الكل"]]
    });
    
    // إضافة أحداث للأزرار في الجدول
    $('#detailed-data-table tbody').on('click', '.view-review-btn', function() {
        const data = detailedTable.row($(this).parents('tr')).data();
        viewReviewDetails(data);
    });
    
    $('#detailed-data-table tbody').on('click', '.reply-review-btn', function() {
        const data = detailedTable.row($(this).parents('tr')).data();
        replyToReview(data);
    });
    
    return detailedTable;
}

// تهيئة جدول الملخص
function initSummaryTable() {
    const tableElement = $('#summary-table');
    
    // التحقق من وجود عنصر الجدول
    if (tableElement.length === 0) {
        console.error("لم يتم العثور على عنصر summary-table");
        return;
    }
    
    // إعداد جدول الملخص
    const summaryTable = tableElement.DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/ar.json'
        },
        data: getSampleSummaryData(),
        columns: [
            { title: "المعيار", data: "criteria" },
            { title: "متوسط التقييم", data: "average", 
              render: function(data) {
                  return `<div class="text-center"><strong>${data}</strong> ${renderStars(data)}</div>`;
              }
            },
            { title: "عدد التقييمات", data: "count" },
            { title: "التغيير", data: "change", 
              render: function(data) {
                  const icon = data >= 0 ? 
                    '<i class="fas fa-arrow-up text-success"></i>' : 
                    '<i class="fas fa-arrow-down text-danger"></i>';
                  return `<div class="text-center">${icon} ${Math.abs(data).toFixed(1)}%</div>`;
              }
            },
            { title: "الاتجاه", data: "trend", 
              render: function(data) {
                  return `<div class="text-center"><small>${renderTrendSparkline(data)}</small></div>`;
              }
            }
        ],
        responsive: true,
        paging: false,
        searching: false,
        info: false
    });
    
    return summaryTable;
}

// تهيئة جدول المقارنة
function initComparisonTable() {
    const tableElement = $('#comparison-table');
    
    // التحقق من وجود عنصر الجدول
    if (tableElement.length === 0) {
        console.error("لم يتم العثور على عنصر comparison-table");
        return;
    }
    
    // إعداد جدول المقارنة
    const comparisonTable = tableElement.DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/ar.json'
        },
        data: getSampleComparisonData(),
        columns: [
            { title: "المعيار", data: "criteria" },
            { title: "الفترة الحالية", data: "current", 
              render: function(data) {
                  return `<div class="text-center"><strong>${data}</strong> ${renderStars(data)}</div>`;
              }
            },
            { title: "الفترة السابقة", data: "previous", 
              render: function(data) {
                  return `<div class="text-center"><strong>${data}</strong> ${renderStars(data)}</div>`;
              }
            },
            { title: "التغيير", data: "change", 
              render: function(data) {
                  const icon = data >= 0 ? 
                    '<i class="fas fa-arrow-up text-success"></i>' : 
                    '<i class="fas fa-arrow-down text-danger"></i>';
                  const cls = data >= 0 ? 'text-success' : 'text-danger';
                  return `<div class="text-center ${cls}">${icon} ${Math.abs(data).toFixed(1)}%</div>`;
              }
            }
        ],
        responsive: true,
        paging: false,
        searching: false,
        info: false
    });
    
    return comparisonTable;
}

// إعداد التفاعلات للجداول
function setupTableInteractions() {
    // فلتر النطاق الزمني
    $('#table-period-filter').on('change', function() {
        updateTablesData($(this).val());
    });
    
    // فلتر حالة التقييمات
    $('#table-status-filter').on('change', function() {
        const status = $(this).val();
        filterTableByStatus('detailed-data-table', status);
    });
    
    // فلتر تقييم النجوم
    $('#table-rating-filter').on('change', function() {
        const rating = $(this).val();
        filterTableByRating('detailed-data-table', rating);
    });
}

// فلترة الجدول حسب الحالة
function filterTableByStatus(tableId, status) {
    const table = $('#' + tableId).DataTable();
    
    if (table) {
        if (status === 'all') {
            table.column(5).search('').draw();
        } else {
            table.column(5).search(status).draw();
        }
    }
}

// فلترة الجدول حسب التقييم
function filterTableByRating(tableId, rating) {
    const table = $('#' + tableId).DataTable();
    
    if (table) {
        if (rating === 'all') {
            table.column(2).search('').draw();
        } else {
            // البحث عن عدد النجوم المحدد
            const searchTerm = Array(parseInt(rating) + 1).join('★');
            table.column(2).search(searchTerm).draw();
        }
    }
}

// عرض تفاصيل التقييم
function viewReviewDetails(reviewData) {
    console.log("عرض تفاصيل التقييم:", reviewData);
    
    // في البيئة الحقيقية: عرض تفاصيل التقييم في نافذة منبثقة أو توجيه المستخدم إلى صفحة التفاصيل
    alert(`عرض تفاصيل التقييم: ${reviewData.id} - ${reviewData.customer}`);
}

// الرد على التقييم
function replyToReview(reviewData) {
    console.log("الرد على التقييم:", reviewData);
    
    // في البيئة الحقيقية: فتح نافذة منبثقة للرد على التقييم
    const reply = prompt(`أدخل ردك على تقييم ${reviewData.customer}:`);
    
    if (reply) {
        alert(`تم إرسال الرد: ${reply}`);
    }
}

// عرض النجوم التقييمية
function renderStars(rating) {
    rating = parseFloat(rating);
    let stars = '';
    
    // نجوم ممتلئة
    for (let i = 1; i <= Math.floor(rating); i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
    
    // نصف نجمة إذا كان التقييم له كسر
    if (rating % 1 >= 0.5) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    // نجوم فارغة
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 1; i <= emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }
    
    return stars;
}

// عرض الاتجاه كرسم بياني مصغر
function renderTrendSparkline(trendData) {
    // في البيئة الحقيقية: استخدام مكتبة مثل jquery.sparkline.js
    // هنا للعرض فقط نستخدم تمثيل بسيط
    const min = Math.min(...trendData);
    const max = Math.max(...trendData);
    const range = max - min;
    
    let sparkline = '<svg width="100" height="20" class="sparkline">';
    
    for (let i = 0; i < trendData.length; i++) {
        const x = (i / (trendData.length - 1)) * 100;
        const normalizedValue = range === 0 ? 0.5 : (trendData[i] - min) / range;
        const y = 20 - (normalizedValue * 20);
        
        if (i === 0) {
            sparkline += `<path d="M${x},${y}`;
        } else {
            sparkline += ` L${x},${y}`;
        }
    }
    
    sparkline += '" stroke="#007bff" stroke-width="1.5" fill="none" />';
    
    // إضافة النقاط
    for (let i = 0; i < trendData.length; i++) {
        const x = (i / (trendData.length - 1)) * 100;
        const normalizedValue = range === 0 ? 0.5 : (trendData[i] - min) / range;
        const y = 20 - (normalizedValue * 20);
        
        sparkline += `<circle cx="${x}" cy="${y}" r="2" fill="#007bff" />`;
    }
    
    sparkline += '</svg>';
    
    return sparkline;
}

// تحديث بيانات الجداول بناءً على الفترة المحددة
function updateTablesData(period) {
    console.log(`تحديث بيانات الجداول للفترة: ${period}`);
    
    // في البيئة الحقيقية: استدعاء API للحصول على البيانات حسب الفترة المحددة
    // هنا سيتم استخدام بيانات تجريبية فقط للعرض
    
    let detailedData, summaryData, comparisonData;
    
    switch (period) {
        case 'week':
            detailedData = getSampleDetailedData('week');
            summaryData = getSampleSummaryData('week');
            comparisonData = getSampleComparisonData('week');
            break;
        case 'month':
            detailedData = getSampleDetailedData('month');
            summaryData = getSampleSummaryData('month');
            comparisonData = getSampleComparisonData('month');
            break;
        case 'quarter':
            detailedData = getSampleDetailedData('quarter');
            summaryData = getSampleSummaryData('quarter');
            comparisonData = getSampleComparisonData('quarter');
            break;
        case 'year':
            detailedData = getSampleDetailedData('year');
            summaryData = getSampleSummaryData('year');
            comparisonData = getSampleComparisonData('year');
            break;
        default:
            // استخدام البيانات الافتراضية
            return;
    }
    
    // تحديث جدول البيانات التفصيلية
    updateDetailedDataTable(detailedData);
    
    // تحديث جدول الملخص
    updateSummaryTable(summaryData);
    
    // تحديث جدول المقارنة
    updateComparisonTable(comparisonData);
}

// تحديث جدول البيانات التفصيلية
function updateDetailedDataTable(data) {
    const table = $('#detailed-data-table').DataTable();
    
    if (table) {
        table.clear().rows.add(data).draw();
    }
}

// تحديث جدول الملخص
function updateSummaryTable(data) {
    const table = $('#summary-table').DataTable();
    
    if (table) {
        table.clear().rows.add(data).draw();
    }
}

// تحديث جدول المقارنة
function updateComparisonTable(data) {
    const table = $('#comparison-table').DataTable();
    
    if (table) {
        table.clear().rows.add(data).draw();
    }
}

// بيانات تجريبية للجداول

// بيانات تفصيلية
function getSampleDetailedData(period = 'month') {
    // نفس البيانات لجميع الفترات في هذه النسخة التجريبية
    // في البيئة الحقيقية: تغيير البيانات حسب الفترة
    
    return [
        {
            id: "REV001",
            customer: "أحمد محمد",
            rating: 5,
            date: "27/03/2025",
            comment: "خدمة ممتازة وسرعة في الاستجابة. العقار كان مطابقًا تمامًا للمواصفات المعلنة.",
            status: "تم الرد"
        },
        {
            id: "REV002",
            customer: "فاطمة علي",
            rating: 4,
            date: "26/03/2025",
            comment: "تجربة جيدة جدًا، لكن كان هناك بعض التأخير في الرد على استفساراتي.",
            status: "تم الرد"
        },
        {
            id: "REV003",
            customer: "خالد عمر",
            rating: 3,
            date: "25/03/2025",
            comment: "العقار جيد ولكن كانت هناك بعض الاختلافات البسيطة عن الإعلان.",
            status: "قيد المراجعة"
        },
        {
            id: "REV004",
            customer: "سارة أحمد",
            rating: 5,
            date: "24/03/2025",
            comment: "تجربة رائعة من البداية للنهاية. شكرًا للمسوق العقاري على المهنية العالية.",
            status: "جديد"
        },
        {
            id: "REV005",
            customer: "محمود حسن",
            rating: 4.5,
            date: "23/03/2025",
            comment: "العقار كان أفضل مما توقعت. فقط كان هناك تأخير بسيط في تسليم المفاتيح.",
            status: "تم الرد"
        },
        {
            id: "REV006",
            customer: "ليلى سمير",
            rating: 2,
            date: "22/03/2025",
            comment: "لم يكن العقار كما هو موضح في الإعلان. أشعر بخيبة أمل من هذه التجربة.",
            status: "قيد المراجعة"
        },
        {
            id: "REV007",
            customer: "عمر خالد",
            rating: 5,
            date: "21/03/2025",
            comment: "أفضل خدمة عقارية تعاملت معها. شفافية تامة ودقة في المعلومات.",
            status: "تم الرد"
        },
        {
            id: "REV008",
            customer: "نورا محمد",
            rating: 4,
            date: "20/03/2025",
            comment: "سعيدة بالتعامل مع هذه الشركة. العقار جميل والخدمة كانت ممتازة.",
            status: "جديد"
        }
    ];
}

// بيانات الملخص
function getSampleSummaryData(period = 'month') {
    return [
        {
            criteria: "جودة الخدمة",
            average: 4.7,
            count: 45,
            change: 3.5,
            trend: [4.3, 4.4, 4.5, 4.6, 4.7]
        },
        {
            criteria: "سرعة الاستجابة",
            average: 4.5,
            count: 45,
            change: 2.2,
            trend: [4.2, 4.3, 4.2, 4.4, 4.5]
        },
        {
            criteria: "دقة المعلومات",
            average: 4.8,
            count: 45,
            change: 5.0,
            trend: [4.5, 4.6, 4.7, 4.7, 4.8]
        },
        {
            criteria: "مظهر العقار",
            average: 4.6,
            count: 45,
            change: 1.8,
            trend: [4.4, 4.5, 4.5, 4.6, 4.6]
        },
        {
            criteria: "القيمة مقابل السعر",
            average: 4.3,
            count: 45,
            change: -0.5,
            trend: [4.5, 4.4, 4.3, 4.2, 4.3]
        }
    ];
}

// بيانات المقارنة
function getSampleComparisonData(period = 'month') {
    return [
        {
            criteria: "جودة الخدمة",
            current: 4.7,
            previous: 4.4,
            change: 6.8
        },
        {
            criteria: "سرعة الاستجابة",
            current: 4.5,
            previous: 4.2,
            change: 7.1
        },
        {
            criteria: "دقة المعلومات",
            current: 4.8,
            previous: 4.6,
            change: 4.3
        },
        {
            criteria: "مظهر العقار",
            current: 4.6,
            previous: 4.5,
            change: 2.2
        },
        {
            criteria: "القيمة مقابل السعر",
            current: 4.3,
            previous: 4.1,
            change: 4.9
        }
    ];
}

// تصدير البيانات لملف Excel
function exportToExcel(tableId, fileName = 'report-data') {
    // في البيئة الحقيقية: استخدام SheetJS لتصدير البيانات
    // هنا للعرض فقط نستخدم تصدير DataTables المدمج
    
    const table = $('#' + tableId).DataTable();
    
    if (table) {
        const excelButton = table.buttons('.buttons-excel');
        if (excelButton.length > 0) {
            excelButton.trigger();
        }
    }
}

// تصدير البيانات لملف PDF
function exportToPDF(tableId, fileName = 'report-data') {
    // في البيئة الحقيقية: استخدام jsPDF لتصدير البيانات
    // هنا للعرض فقط نستخدم تصدير DataTables المدمج
    
    const table = $('#' + tableId).DataTable();
    
    if (table) {
        const pdfButton = table.buttons('.buttons-pdf');
        if (pdfButton.length > 0) {
            pdfButton.trigger();
        }
    }
}

// طباعة الجدول
function printTable(tableId) {
    const table = $('#' + tableId).DataTable();
    
    if (table) {
        const printButton = table.buttons('.buttons-print');
        if (printButton.length > 0) {
            printButton.trigger();
        }
    }
}
