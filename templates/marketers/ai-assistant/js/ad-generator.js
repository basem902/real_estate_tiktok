/**
 * مولد الإعلانات - ملف JavaScript
 * يدعم وظائف صفحة مولد الإعلانات الذكي
 */

document.addEventListener('DOMContentLoaded', function() {
    // المتغيرات العامة
    const adTypeBtns = document.querySelectorAll('.ad-type-card');
    const adTypeTitle = document.getElementById('adTypeTitle');
    const generateAdBtn = document.getElementById('generateAdBtn');
    const resetAdBtn = document.getElementById('resetAdBtn');
    const adForms = document.querySelectorAll('.ad-form');
    const adPreviewSection = document.querySelector('.ad-preview-section');
    const adPreviewContent = document.getElementById('adPreviewContent');
    const editGeneratedAdBtn = document.getElementById('editGeneratedAdBtn');
    const copyAdBtn = document.getElementById('copyAdBtn');
    const useAdBtn = document.getElementById('useAdBtn');
    const platformBtns = document.querySelectorAll('.platform-btn');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const templateCards = document.querySelectorAll('.template-card');
    
    // تفعيل أزرار اختيار نوع الإعلان
    adTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة الكلاس "active" من جميع الأزرار
            adTypeBtns.forEach(b => b.classList.remove('active'));
            
            // إضافة الكلاس "active" للزر المختار
            this.classList.add('active');
            
            // الحصول على نوع الإعلان من البيانات الوصفية
            const adType = this.getAttribute('data-ad-type');
            
            // تحديث عنوان القسم حسب نوع الإعلان
            updateFormTitle(adType);
            
            // إظهار النموذج المناسب وإخفاء البقية
            showFormByType(adType);
            
            // إخفاء قسم المعاينة إذا كان ظاهراً
            if (adPreviewSection.style.display !== 'none') {
                adPreviewSection.style.display = 'none';
            }
        });
    });
    
    // وظيفة تحديث عنوان القسم
    function updateFormTitle(adType) {
        let title = 'إنشاء ';
        
        switch(adType) {
            case 'text':
                title += 'إعلان نصي';
                break;
            case 'social':
                title += 'منشور اجتماعي';
                break;
            case 'image':
                title += 'إعلان مصور';
                break;
            case 'video':
                title += 'إعلان فيديو';
                break;
            case 'email':
                title += 'حملة بريدية';
                break;
            default:
                title += 'إعلان جديد';
        }
        
        adTypeTitle.textContent = title;
    }
    
    // وظيفة إظهار النموذج المناسب
    function showFormByType(adType) {
        adForms.forEach(form => {
            form.style.display = 'none';
        });
        
        const formId = adType + '-ad-form';
        const targetForm = document.getElementById(formId);
        
        if (targetForm) {
            targetForm.style.display = 'block';
        } else {
            // إذا لم يتم العثور على النموذج، نعرض النموذج النصي كافتراضي
            document.getElementById('text-ad-form').style.display = 'block';
            console.log('لم يتم العثور على النموذج: ' + formId);
        }
    }
    
    // تفعيل أزرار المنصات الاجتماعية
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            }
        });
    });
    
    // تفعيل مربعات اللون
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // زر توليد الإعلان
    generateAdBtn.addEventListener('click', function() {
        // نوع الإعلان الحالي
        const activeAdType = document.querySelector('.ad-type-card.active').getAttribute('data-ad-type');
        
        // محتوى الإعلان المُولّد (سيتم استبداله بالاتصال بالواجهة الخلفية)
        const generatedContent = generateAdContent(activeAdType);
        
        // عرض قسم المعاينة
        adPreviewSection.style.display = 'block';
        
        // تحديث محتوى المعاينة
        adPreviewContent.innerHTML = generatedContent;
        
        // التمرير إلى قسم المعاينة
        adPreviewSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // محاكاة توليد المحتوى (سيتم استبداله بالاتصال بالواجهة الخلفية)
    function generateAdContent(adType) {
        let content = '';
        
        switch(adType) {
            case 'text':
                const propertyType = document.getElementById('propertyType').value || 'فيلا';
                const adPurpose = document.getElementById('adPurpose').value || 'بيع';
                const location = document.getElementById('propertyLocation').value || 'شمال الرياض';
                const features = document.getElementById('propertyFeatures').value || '4 غرف، 3 حمامات، مسبح، حديقة';
                
                content = `
                    <div class="generated-text-ad">
                        <h4 class="mb-3">فرصة مميزة! ${propertyType} فاخرة لل${adPurpose} في ${location}</h4>
                        <p class="mb-3">
                            نقدم لكم ${propertyType} فاخرة بموقع استراتيجي في ${location}، مثالية للعائلات الراقية والباحثين عن التميز.
                        </p>
                        <p class="mb-3">
                            تتميز بـ: ${features}
                        </p>
                        <p class="mb-3">
                            لا تفوت هذه الفرصة الاستثنائية واحجز معاينتك الآن! متاح تمويل عقاري بأفضل الشروط.
                        </p>
                        <p class="mb-2 fw-bold">
                            للتواصل والاستفسار: 0555-123456
                        </p>
                        <div class="text-muted small">#عقارات_مميزة #استثمار_آمن #فرص_عقارية</div>
                    </div>
                `;
                break;
                
            case 'social':
                const platforms = Array.from(document.querySelectorAll('.platform-btn.active'))
                    .map(btn => btn.getAttribute('data-platform'))
                    .join(', ');
                const socialDetails = document.getElementById('socialPropertyDetails').value || 'شقة فاخرة بتصميم عصري وإطلالة مميزة';
                const hashtags = document.getElementById('socialHashtags').value || '#عقارات #استثمار #فلل_للبيع';
                
                content = `
                    <div class="generated-social-post">
                        <div class="social-post-header mb-3">
                            <span class="badge bg-primary me-1">منشور اجتماعي</span>
                            <span class="text-muted">منصات: ${platforms || 'جميع المنصات'}</span>
                        </div>
                        <div class="social-post-content mb-3">
                            <p>✨ فرصة لا تعوض! ✨</p>
                            <p>${socialDetails}</p>
                            <p>🏠 موقع استراتيجي في قلب المدينة</p>
                            <p>💰 بأسعار منافسة وتسهيلات في السداد</p>
                            <p>📱 للاستفسار والحجز: 0555-123456</p>
                            <p class="mt-2">${hashtags}</p>
                        </div>
                    </div>
                `;
                break;
                
            case 'image':
                const adSize = document.getElementById('imageAdSize').value || 'مربع';
                const adStyle = document.getElementById('imageAdStyle').value || 'عصري';
                const adTitle = document.getElementById('imageAdTitle').value || 'فلل فاخرة للبيع';
                
                content = `
                    <div class="generated-image-ad">
                        <div class="text-center mb-3">
                            <span class="badge bg-secondary me-1">حجم: ${adSize}</span>
                            <span class="badge bg-secondary me-1">نمط: ${adStyle}</span>
                        </div>
                        <div class="image-ad-mockup border p-4 mb-3 text-center bg-light">
                            <div class="mb-2"><i class="fas fa-image fa-5x text-muted"></i></div>
                            <h4 class="my-3">${adTitle}</h4>
                            <p class="mb-3">وصف العقار بشكل جذاب ومختصر</p>
                            <div class="btn btn-primary btn-sm mt-2">تواصل معنا</div>
                            <div class="mt-3"><small class="text-muted">شعار الشركة</small></div>
                        </div>
                        <div class="text-muted small">* هذه معاينة للتصميم. الإعلان النهائي سيتم إنشاؤه بواسطة فريق التصميم.</div>
                    </div>
                `;
                break;
                
            default:
                content = `
                    <div class="alert alert-info">
                        لم يتم تنفيذ نموذج توليد محتوى لهذا النوع من الإعلانات بعد. سيتم إضافته قريباً.
                    </div>
                `;
        }
        
        return content;
    }
    
    // زر إعادة تعيين النموذج
    resetAdBtn.addEventListener('click', function() {
        // الحصول على نوع الإعلان الحالي
        const activeAdType = document.querySelector('.ad-type-card.active').getAttribute('data-ad-type');
        const formId = activeAdType + '-ad-form';
        const form = document.getElementById(formId);
        
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.type === 'button' || input.type === 'submit') {
                    return;
                }
                
                if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                } else {
                    input.value = '';
                }
            });
        }
        
        // إخفاء قسم المعاينة
        adPreviewSection.style.display = 'none';
    });
    
    // زر نسخ الإعلان
    copyAdBtn.addEventListener('click', function() {
        // يمكن استخدام API النسخ للحافظة
        const textToCopy = adPreviewContent.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(function() {
            // تنبيه المستخدم بأنه تم النسخ بنجاح
            copyAdBtn.innerHTML = '<i class="fas fa-check me-1"></i> تم النسخ';
            setTimeout(() => {
                copyAdBtn.innerHTML = '<i class="fas fa-copy me-1"></i> نسخ';
            }, 2000);
        }).catch(function(err) {
            console.error('فشل في النسخ: ', err);
        });
    });
    
    // زر تحرير الإعلان المُولّد
    editGeneratedAdBtn.addEventListener('click', function() {
        // محاكاة فتح نافذة تحرير
        alert('سيتم تنفيذ هذه الميزة قريباً: فتح الإعلان في محرر متقدم');
    });
    
    // زر استخدام الإعلان
    useAdBtn.addEventListener('click', function() {
        // محاكاة حفظ الإعلان أو مشاركته
        alert('تم حفظ الإعلان بنجاح في قائمة الإعلانات المحفوظة!');
    });
    
    // التفاعل مع قوالب الإعلانات
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // محاكاة تحميل قالب معد مسبقاً
            const templateTitle = this.querySelector('.card-title').textContent;
            alert('سيتم تحميل القالب: ' + templateTitle);
        });
    });
});
