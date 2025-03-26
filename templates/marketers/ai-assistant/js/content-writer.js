/**
 * ملف JavaScript لكاتب المحتوى
 * يتحكم في وظائف إنشاء المحتوى والتفاعلات ضمن صفحة كاتب المحتوى
 */

document.addEventListener('DOMContentLoaded', function() {
    // عناصر واجهة المستخدم
    const contentToolCards = document.querySelectorAll('.content-tool-card');
    const toolForms = document.querySelectorAll('.tool-form');
    const contentOutput = document.getElementById('content-output');
    const toolTitle = document.getElementById('toolTitle');
    const copyBtn = document.getElementById('copyBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const saveContentBtn = document.getElementById('saveContentBtn');
    
    // الأداة الحالية والمحتوى المنشأ
    let currentTool = null;
    let generatedContent = '';
    
    // إخفاء زري النسخ وإعادة الإنشاء في البداية
    copyBtn.style.display = 'none';
    regenerateBtn.style.display = 'none';
    
    // إضافة مستمعات الأحداث لبطاقات الأدوات
    contentToolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolId = this.getAttribute('data-tool');
            selectTool(toolId);
        });
    });
    
    // وظيفة اختيار الأداة
    function selectTool(toolId) {
        // تحديث الأداة الحالية
        currentTool = toolId;
        
        // تحديث عنوان الأداة
        const toolTitle = document.getElementById('toolTitle');
        switch(toolId) {
            case 'property-description':
                toolTitle.textContent = 'إنشاء وصف عقار';
                break;
            case 'social-post':
                toolTitle.textContent = 'إنشاء منشور اجتماعي';
                break;
            case 'email-template':
                toolTitle.textContent = 'إنشاء قالب بريد إلكتروني';
                break;
            case 'ad-copy':
                toolTitle.textContent = 'إنشاء نص إعلاني';
                break;
            case 'seo-content':
                toolTitle.textContent = 'إنشاء محتوى SEO';
                break;
            case 'headline-generator':
                toolTitle.textContent = 'إنشاء عناوين جذابة';
                break;
            default:
                toolTitle.textContent = 'أداة غير معروفة';
        }
        
        // إخفاء جميع النماذج
        toolForms.forEach(form => {
            form.style.display = 'none';
        });
        
        // إظهار النموذج المحدد
        const selectedForm = document.getElementById(`${toolId}-form`);
        if (selectedForm) {
            selectedForm.style.display = 'block';
            
            // إعادة تعيين منطقة الإخراج
            contentOutput.innerHTML = '<div class="alert alert-info"><i class="fas fa-info-circle me-2"></i>أدخل المعلومات المطلوبة واضغط على زر الإنشاء</div>';
            
            // إخفاء زري النسخ وإعادة الإنشاء
            copyBtn.style.display = 'none';
            regenerateBtn.style.display = 'none';
        }
    }
    
    // وظيفة إنشاء وصف العقار
    document.getElementById('generatePropertyDescription')?.addEventListener('click', function() {
        const propertyType = document.getElementById('propertyType').value;
        const location = document.getElementById('propertyLocation').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const area = document.getElementById('area').value;
        const features = document.getElementById('features').value;
        const price = document.getElementById('price').value;
        const tone = document.getElementById('tone').value;
        
        // التحقق من صحة المدخلات
        if (!location || !area) {
            contentOutput.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle me-2"></i>يرجى تحديد الموقع والمساحة على الأقل</div>';
            return;
        }
        
        // إظهار مؤشر التحميل
        contentOutput.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">جاري الإنشاء...</span></div><div class="ms-3">جاري إنشاء وصف العقار...</div></div>';
        
        // محاكاة تأخير الاستجابة من API
        setTimeout(() => {
            // إنشاء الوصف (سيتم استبداله بطلب API حقيقي)
            generatedContent = generatePropertyDescription(propertyType, location, bedrooms, bathrooms, area, features, price, tone);
            
            // عرض المحتوى المنشأ
            contentOutput.innerHTML = `
                <div class="card">
                    <div class="card-header bg-white">
                        <h6 class="mb-0">الوصف المنشأ</h6>
                    </div>
                    <div class="card-body">
                        <div class="editor-container p-3 bg-light">
                            ${generatedContent}
                        </div>
                    </div>
                </div>
            `;
            
            // إظهار زري النسخ وإعادة الإنشاء
            copyBtn.style.display = 'inline-block';
            regenerateBtn.style.display = 'inline-block';
        }, 2000);
    });
    
    // وظيفة إنشاء منشور اجتماعي
    document.getElementById('generateSocialPost')?.addEventListener('click', function() {
        const platform = document.getElementById('socialPlatform').value;
        const topic = document.getElementById('postTopic').value;
        const goal = document.getElementById('postGoal').value;
        const audience = document.getElementById('targetAudience').value;
        const callToAction = document.getElementById('callToAction').value;
        const length = document.getElementById('postLength').value;
        
        // التحقق من صحة المدخلات
        if (!topic) {
            contentOutput.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle me-2"></i>يرجى تحديد موضوع المنشور على الأقل</div>';
            return;
        }
        
        // إظهار مؤشر التحميل
        contentOutput.innerHTML = '<div class="d-flex justify-content-center my-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">جاري الإنشاء...</span></div><div class="ms-3">جاري إنشاء المنشور الاجتماعي...</div></div>';
        
        // محاكاة تأخير الاستجابة من API
        setTimeout(() => {
            // إنشاء المنشور (سيتم استبداله بطلب API حقيقي)
            generatedContent = generateSocialPost(platform, topic, goal, audience, callToAction, length);
            
            // عرض المحتوى المنشأ
            contentOutput.innerHTML = `
                <div class="card">
                    <div class="card-header bg-white">
                        <h6 class="mb-0">المنشور المنشأ (${platform})</h6>
                    </div>
                    <div class="card-body">
                        <div class="editor-container p-3 bg-light">
                            ${generatedContent}
                        </div>
                        <div class="mt-3">
                            <small class="text-muted"><i class="fas fa-info-circle me-1"></i> تعليمات: يمكن إضافة هاشتاجات مناسبة للمنشور حسب الفئة المستهدفة</small>
                        </div>
                    </div>
                </div>
            `;
            
            // إظهار زري النسخ وإعادة الإنشاء
            copyBtn.style.display = 'inline-block';
            regenerateBtn.style.display = 'inline-block';
        }, 2000);
    });
    
    // زر نسخ المحتوى
    copyBtn.addEventListener('click', function() {
        if (generatedContent) {
            // إنشاء عنصر نصي مؤقت
            const textArea = document.createElement('textarea');
            textArea.value = generatedContent.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]*>/g, '');
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                // نسخ النص إلى الحافظة
                document.execCommand('copy');
                
                // إظهار رسالة نجاح
                alert('تم نسخ المحتوى بنجاح!');
            } catch (err) {
                console.error('فشل في نسخ النص: ', err);
                alert('فشل في نسخ النص. الرجاء المحاولة مرة أخرى.');
            } finally {
                // إزالة العنصر المؤقت
                document.body.removeChild(textArea);
            }
        }
    });
    
    // زر إعادة إنشاء المحتوى
    regenerateBtn.addEventListener('click', function() {
        if (currentTool === 'property-description') {
            document.getElementById('generatePropertyDescription').click();
        } else if (currentTool === 'social-post') {
            document.getElementById('generateSocialPost').click();
        }
        // إضافة حالات للأدوات الأخرى
    });
    
    // زر حفظ المحتوى
    saveContentBtn.addEventListener('click', function() {
        if (!generatedContent) {
            alert('لا يوجد محتوى لحفظه. الرجاء إنشاء المحتوى أولاً.');
            return;
        }
        
        // هنا يمكن تنفيذ منطق حفظ المحتوى (سيتم تنفيذه عند ربط النظام بالAPI)
        alert('تم حفظ المحتوى بنجاح!');
    });
    
    // عناصر المحتوى المحفوظ
    document.querySelectorAll('.list-group-item[data-saved-id]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const savedId = this.getAttribute('data-saved-id');
            
            // هنا يمكن تحميل المحتوى المحفوظ (سيتم تنفيذه عند ربط النظام بالAPI)
            alert(`تم تحميل المحتوى المحفوظ رقم ${savedId}`);
        });
    });
    
    // زر استخدام القالب
    document.querySelectorAll('.template-card .btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const templateTitle = this.closest('.template-card').querySelector('.card-title').textContent;
            
            // هنا يمكن تحميل القالب المحدد (سيتم تنفيذه عند ربط النظام بالAPI)
            alert(`تم اختيار القالب: ${templateTitle}`);
        });
    });
    
    /**
     * وظائف إنشاء المحتوى
     */
    
    // وظيفة إنشاء وصف العقار
    function generatePropertyDescription(type, location, bedrooms, bathrooms, area, features, price, tone) {
        // محاكاة استجابة API - إنشاء وصف عقار بناءً على المدخلات
        const propertyNames = {
            apartment: 'شقة',
            villa: 'فيلا',
            office: 'مكتب',
            land: 'أرض',
            commercial: 'عقار تجاري'
        };
        
        const toneAdjectives = {
            professional: ['راقية', 'متميزة', 'ذات جودة عالية', 'احترافية'],
            luxurious: ['فاخرة', 'رائعة', 'استثنائية', 'ساحرة'],
            friendly: ['مريحة', 'دافئة', 'لطيفة', 'مناسبة'],
            persuasive: ['لا تُفوت', 'نادرة', 'فرصة استثمارية', 'قيمة ممتازة']
        };
        
        const selectedToneAdjectives = toneAdjectives[tone] || toneAdjectives.professional;
        const randomAdj = () => selectedToneAdjectives[Math.floor(Math.random() * selectedToneAdjectives.length)];
        
        let description = '';
        
        if (type === 'apartment') {
            description = `<p><strong>${propertyNames[type]} ${randomAdj()} للبيع في ${location}</strong></p>`;
            description += `<p>نقدم لكم شقة ${randomAdj()} بمساحة ${area} متر مربع`;
            
            if (bedrooms && bathrooms) {
                description += ` تتكون من ${bedrooms} غرف نوم و${bathrooms} حمامات`;
            } else if (bedrooms) {
                description += ` تتكون من ${bedrooms} غرف نوم`;
            }
            
            description += ` في موقع متميز بمنطقة ${location}.</p>`;
            
            if (features) {
                description += `<p>تتميز الشقة بـ ${features}، مما يجعلها خيارًا مثاليًا للباحثين عن الراحة والرفاهية.</p>`;
            }
            
            if (price) {
                description += `<p>السعر: ${price} - فرصة استثمارية لا تعوض!</p>`;
            }
            
            description += `<p>اتصل بنا الآن لمشاهدة هذه الشقة ${randomAdj()} والاستمتاع بتجربة سكنية فريدة.</p>`;
        } else if (type === 'villa') {
            description = `<p><strong>فيلا ${randomAdj()} للبيع في ${location}</strong></p>`;
            description += `<p>نقدم لكم فيلا ${randomAdj()} بمساحة ${area} متر مربع`;
            
            if (bedrooms && bathrooms) {
                description += ` تتكون من ${bedrooms} غرف نوم و${bathrooms} حمامات`;
            } else if (bedrooms) {
                description += ` تتكون من ${bedrooms} غرف نوم`;
            }
            
            description += ` في موقع استثنائي بمنطقة ${location}.</p>`;
            
            if (features) {
                description += `<p>تتميز الفيلا بـ ${features}، مما يوفر أسلوب حياة فاخر يستحق التجربة.</p>`;
            }
            
            if (price) {
                description += `<p>السعر: ${price} - استثمار يجمع بين الفخامة والقيمة!</p>`;
            }
            
            description += `<p>اتصل بنا الآن لترتيب جولة في هذه الفيلا ${randomAdj()} والاستمتاع بتجربة سكن لا مثيل لها.</p>`;
        } else {
            // نماذج مشابهة للأنواع الأخرى من العقارات
            description = `<p><strong>${propertyNames[type] || 'عقار'} ${randomAdj()} في ${location}</strong></p>`;
            description += `<p>نقدم لكم ${propertyNames[type] || 'عقار'} ${randomAdj()} بمساحة ${area} متر مربع في موقع متميز بمنطقة ${location}.</p>`;
            
            if (features) {
                description += `<p>من أهم مميزات هذا العقار: ${features}.</p>`;
            }
            
            if (price) {
                description += `<p>السعر: ${price} - فرصة استثمارية مميزة!</p>`;
            }
            
            description += `<p>اتصل بنا الآن للحصول على مزيد من المعلومات.</p>`;
        }
        
        return description;
    }
    
    // وظيفة إنشاء منشور اجتماعي
    function generateSocialPost(platform, topic, goal, audience, callToAction, length) {
        // محاكاة استجابة API - إنشاء منشور اجتماعي بناءً على المدخلات
        let post = '';
        const hashtags = ['#عقارات', '#استثمار_عقاري', '#فرص_استثمارية', '#الرياض', '#السعودية', '#عقار'];
        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        const openers = [
            'هل تبحث عن',
            'فرصة لا تعوض!',
            'عرض محدود!',
            'لكل من يبحث عن',
            'حصريًا ولفترة محدودة!',
            'أطلقنا اليوم',
            'مع ارتفاع الطلب على العقارات،'
        ];
        
        const closers = [
            'اتصل بنا الآن!',
            'لا تفوت الفرصة!',
            'سارع بالحجز الآن!',
            'التفاصيل في الرابط بالتعليقات',
            'تواصل معنا للتفاصيل',
            'محدود الكمية، احجز الآن'
        ];
        
        switch (platform) {
            case 'facebook':
                if (length === 'short') {
                    post = `<p>${random(openers)} ${topic}؟</p><p>${callToAction || random(closers)}</p><p>${hashtags.slice(0, 3).join(' ')}</p>`;
                } else if (length === 'medium') {
                    post = `<p>${random(openers)} ${topic}؟</p><p>نحن في شركتنا نقدم لك أفضل الخيارات التي تلبي احتياجاتك وتطلعاتك.</p><p>${audience ? 'خصيصًا لـ ' + audience : 'فرصة لا تفوت لكل مستثمر ذكي'}</p><p>${callToAction || random(closers)}</p><p>${hashtags.slice(0, 5).join(' ')}</p>`;
                } else {
                    post = `<p>${random(openers)} ${topic}؟</p><p>نحن في شركتنا العقارية نفهم احتياجاتك ونسعى لتقديم أفضل الخيارات والحلول المناسبة لك.</p><p>نقدم لك اليوم فرصة استثنائية ${topic} بمواصفات وميزات فريدة تضمن لك تحقيق أهدافك.</p><p>${audience ? 'هذا العرض مصمم خصيصًا لـ ' + audience : 'هذا العرض مناسب لجميع المستثمرين الباحثين عن قيمة حقيقية'}</p><p>${callToAction || random(closers)}</p><p>${hashtags.join(' ')}</p>`;
                }
                break;
                
            case 'instagram':
                if (length === 'short') {
                    post = `<p>✨ ${topic} ✨</p><p>${callToAction || random(closers)}</p><p>.</p><p>.</p><p>.</p><p>${hashtags.slice(0, 10).join(' ')} #${topic.replace(/\s+/g, '_')}</p>`;
                } else {
                    post = `<p>✨ ${topic} ✨</p><p>نقدم لكم اليوم ${goal === 'lead-generation' ? 'عرضًا خاصًا' : 'محتوى مميزًا'} حول ${topic}</p><p>${audience ? 'مصمم خصيصًا لـ ' + audience : 'مناسب للجميع'}</p><p>${callToAction || random(closers)}</p><p>.</p><p>.</p><p>${hashtags.slice(0, 15).join(' ')} #${topic.replace(/\s+/g, '_')}</p>`;
                }
                break;
                
            case 'twitter':
                post = `<p>${random(openers)} ${topic}؟ ${audience ? 'مثالي لـ ' + audience + '!' : ''} ${callToAction || random(closers)}</p><p>${hashtags.slice(0, 2).join(' ')} #${topic.replace(/\s+/g, '_')}</p>`;
                break;
                
            case 'linkedin':
                if (length === 'short') {
                    post = `<p>نشارككم اليوم ${topic}</p><p>${callToAction || 'للتفاصيل، يرجى التواصل معنا مباشرة.'}</p>`;
                } else {
                    post = `<p>أعزائي متابعي لينكد إن،</p><p>يسرنا أن نشارككم اليوم ${topic}. في عالم العقارات المتغير باستمرار، نحن نسعى دائمًا لتقديم أفضل الحلول والفرص لعملائنا.</p><p>${audience ? 'هذه الفرصة مناسبة تمامًا لـ ' + audience : 'هذه الفرصة مناسبة للمستثمرين والباحثين عن قيمة حقيقية'}</p><p>${callToAction || 'للمزيد من المعلومات، يرجى التواصل معنا أو زيارة موقعنا الإلكتروني.'}</p><p>#${topic.replace(/\s+/g, '_')} ${hashtags.slice(0, 3).join(' ')}</p>`;
                }
                break;
                
            default:
                post = `<p>${topic}</p><p>${callToAction || 'تواصل معنا للمزيد من المعلومات.'}</p>`;
        }
        
        return post;
    }
});
