/**
 * ملف JavaScript للمساعد الذكي
 * يتحكم في وظائف المحادثة والتفاعلات ضمن صفحة المساعد الذكي
 */

document.addEventListener('DOMContentLoaded', function() {
    // عناصر واجهة المستخدم
    const messageContainer = document.getElementById('messageContainer');
    const messageInput = document.getElementById('messageInput');
    const chatForm = document.getElementById('chatForm');
    const typingIndicator = document.getElementById('typingIndicator');
    const toggleToolsBtn = document.getElementById('toggleToolsBtn');
    const toolsPanel = document.getElementById('toolsPanel');
    const historyBtn = document.getElementById('historyBtn');
    const chatHistoryModal = new bootstrap.Modal(document.getElementById('chatHistoryModal'));
    const newChatBtn = document.getElementById('newChatBtn');

    // بيانات المستخدم
    const userData = {
        name: "أحمد محمد",
        avatar: "../assets/img/user-avatar.jpg",
        role: "مسوق عقاري"
    };

    // سجل المحادثة الحالي
    let currentChat = [];

    // إضافة المحادثة الافتتاحية إلى سجل المحادثة
    currentChat.push({
        role: 'assistant',
        content: 'مرحباً بك في المساعد الذكي! أنا هنا لمساعدتك في جميع المهام المتعلقة بالتسويق العقاري. كيف يمكنني مساعدتك اليوم؟',
        timestamp: new Date()
    });

    // الاستماع إلى حدث تقديم نموذج الدردشة
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = messageInput.value.trim();
        
        if (message) {
            // إضافة رسالة المستخدم إلى واجهة المستخدم
            addUserMessage(message);
            
            // مسح حقل الإدخال
            messageInput.value = '';
            
            // إظهار مؤشر الكتابة
            showTypingIndicator();
            
            // محاكاة استجابة المساعد بعد فترة قصيرة
            setTimeout(function() {
                // إخفاء مؤشر الكتابة
                hideTypingIndicator();
                
                // الحصول على رد المساعد (سيتم استبداله بطلب API حقيقي لاحقًا)
                const response = getAIResponse(message);
                
                // إضافة رد المساعد إلى واجهة المستخدم
                addAIMessage(response);
            }, 1500);
        }
    });

    // إظهار/إخفاء لوحة الأدوات
    toggleToolsBtn.addEventListener('click', function() {
        toolsPanel.classList.toggle('d-none');
        
        // تغيير أيقونة الزر وفقًا لحالة اللوحة
        const icon = this.querySelector('i');
        if (toolsPanel.classList.contains('d-none')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-tools');
            this.querySelector('.me-1').nextSibling.textContent = ' الأدوات المساعدة';
        } else {
            icon.classList.remove('fa-tools');
            icon.classList.add('fa-times');
            this.querySelector('.me-1').nextSibling.textContent = ' إخفاء الأدوات';
        }
    });

    // عرض نافذة المحادثات السابقة
    historyBtn.addEventListener('click', function() {
        chatHistoryModal.show();
    });

    // بدء محادثة جديدة
    newChatBtn.addEventListener('click', function() {
        // مسح المحادثة الحالية
        clearChat();
        
        // إضافة رسالة افتتاحية جديدة
        const welcomeMessage = 'مرحباً بك في محادثة جديدة! كيف يمكنني مساعدتك اليوم؟';
        addAIMessage(welcomeMessage);
        
        // إعادة تعيين سجل المحادثة
        currentChat = [{
            role: 'assistant',
            content: welcomeMessage,
            timestamp: new Date()
        }];
    });

    // البحث في المحادثات السابقة
    document.getElementById('searchChatsBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchChats').value.trim().toLowerCase();
        const chatItems = document.querySelectorAll('#chatHistoryList a');
        
        chatItems.forEach(item => {
            const title = item.querySelector('h6').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // وظائف مساعدة

    // إضافة رسالة المستخدم إلى واجهة المستخدم
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        
        const messageContent = `
            <div class="d-flex justify-content-end">
                <div class="flex-grow-1 me-3">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="text-muted small">الآن</span>
                        <span class="fw-bold">${userData.name}</span>
                    </div>
                    <p class="mb-0">${message}</p>
                </div>
                <div class="flex-shrink-0">
                    <img src="${userData.avatar}" alt="User Avatar" class="rounded-circle" width="40" height="40">
                </div>
            </div>
        `;
        
        messageElement.innerHTML = messageContent;
        messageContainer.appendChild(messageElement);
        
        // تمرير إلى أسفل لعرض الرسالة الجديدة
        scrollToBottom();
        
        // إضافة الرسالة إلى سجل المحادثة
        currentChat.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });
    }

    // إضافة رسالة المساعد إلى واجهة المستخدم
    function addAIMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'ai-message';
        
        const messageContent = `
            <div class="d-flex">
                <div class="flex-shrink-0">
                    <div class="avatar-placeholder bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 40px; height: 40px;">
                        <i class="fas fa-robot"></i>
                    </div>
                </div>
                <div class="flex-grow-1 ms-3">
                    <div class="mb-1">
                        <span class="fw-bold">المساعد الذكي</span>
                        <span class="text-muted small ms-2">الآن</span>
                    </div>
                    <p class="mb-0">${message}</p>
                </div>
            </div>
        `;
        
        messageElement.innerHTML = messageContent;
        messageContainer.appendChild(messageElement);
        
        // تمرير إلى أسفل لعرض الرسالة الجديدة
        scrollToBottom();
        
        // إضافة الرسالة إلى سجل المحادثة
        currentChat.push({
            role: 'assistant',
            content: message,
            timestamp: new Date()
        });
    }

    // الحصول على استجابة المساعد (محاكاة)
    function getAIResponse(userMessage) {
        // هذه مجرد محاكاة بسيطة. سيتم استبدالها بطلب API حقيقي لاحقًا
        const responses = {
            'مرحبا': 'مرحباً بك! كيف يمكنني مساعدتك اليوم في مجال التسويق العقاري؟',
            'كيف حالك': 'أنا بخير، شكراً على سؤالك! أنا هنا لمساعدتك في أي استفسارات أو مهام تتعلق بالتسويق العقاري.',
            'ساعدني': 'بالتأكيد! يسعدني مساعدتك. هل يمكنك توضيح نوع المساعدة التي تحتاجها؟ هل هي متعلقة بكتابة محتوى، أو تحليل بيانات، أو استراتيجيات تسويقية، أو أي شيء آخر؟',
            'كيف يمكنني زيادة مبيعاتي': 'لزيادة مبيعاتك العقارية، يمكنك اتباع عدة استراتيجيات مثل:\n1. تحسين وجودك الرقمي عبر منصات التواصل الاجتماعي\n2. استخدام التصوير الاحترافي والجولات الافتراضية للعقارات\n3. بناء قاعدة بيانات للعملاء المحتملين وإنشاء حملات تسويقية مستهدفة\n4. تطوير مهارات التفاوض والإقناع\n5. العمل على المراجعات الإيجابية وتوصيات العملاء السابقين\n\nهل ترغب في معرفة المزيد عن أي من هذه الاستراتيجيات؟',
            'اكتب لي وصف عقار': 'بالتأكيد! لكتابة وصف عقار جذاب، أحتاج إلى بعض المعلومات عن العقار:\n- نوع العقار (شقة، فيلا، مكتب، إلخ)\n- المساحة والموقع\n- عدد الغرف والحمامات\n- المميزات الخاصة (إطلالة، حديقة، مسبح، إلخ)\n- سعر العقار أو قيمة الإيجار\n\nبمجرد توفير هذه المعلومات، يمكنني كتابة وصف احترافي وجذاب للعقار.'
        };
        
        // البحث عن كلمات مفتاحية في رسالة المستخدم
        const lowercaseMessage = userMessage.toLowerCase();
        let bestResponse = 'أشكرك على رسالتك! يمكنني مساعدتك في مجموعة متنوعة من المهام المتعلقة بالتسويق العقاري، مثل كتابة المحتوى، وتحليل البيانات، وتطوير استراتيجيات التسويق. ما هي المساعدة المحددة التي تبحث عنها؟';
        
        for (const keyword in responses) {
            if (lowercaseMessage.includes(keyword)) {
                bestResponse = responses[keyword];
                break;
            }
        }
        
        return bestResponse;
    }

    // إظهار مؤشر الكتابة
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }

    // إخفاء مؤشر الكتابة
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // التمرير إلى أسفل منطقة الرسائل
    function scrollToBottom() {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // مسح المحادثة الحالية
    function clearChat() {
        messageContainer.innerHTML = '';
    }

    // إدخال اقتراح إلى حقل الإدخال
    window.insertSuggestion = function(suggestion) {
        messageInput.value = suggestion;
        messageInput.focus();
    };

    // البحث عن المحادثات
    document.getElementById('searchChats').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('searchChatsBtn').click();
        }
    });

    // التعامل مع نقرات عناصر المحادثات السابقة
    document.querySelectorAll('#chatHistoryList a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const chatId = this.getAttribute('data-chat-id');
            // هنا يمكننا تحميل المحادثة المحددة
            // سيتم تنفيذ ذلك لاحقًا عند ربط البيانات بالAPI
            
            // إغلاق النافذة المنبثقة
            chatHistoryModal.hide();
        });
    });
});
