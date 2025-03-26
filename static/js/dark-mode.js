// سكريبت التحكم في وضع الدارك مود

document.addEventListener('DOMContentLoaded', function() {
    // التحقق من إعدادات المستخدم المحفوظة
    const savedTheme = localStorage.getItem('theme');
    
    // زر تبديل وضع الدارك مود
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    
    // تطبيق الوضع المحفوظ عند تحميل الصفحة
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        if (themeToggleCheckbox) {
            themeToggleCheckbox.checked = true;
        }
    }
    
    // التبديل بين الوضعين عند النقر على الزر
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleDarkMode);
    }
    
    // التبديل بين الوضعين عند تغيير حالة الصندوق
    if (themeToggleCheckbox) {
        themeToggleCheckbox.addEventListener('change', function() {
            toggleDarkMode();
        });
    }
    
    // دالة تبديل وضع الدارك مود
    function toggleDarkMode() {
        // تبديل حالة عناصر الصفحة
        document.documentElement.classList.toggle('dark-mode');
        document.body.classList.toggle('dark-mode');
        
        // حفظ الإعدادات في متصفح المستخدم
        if (document.documentElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            if (themeToggleCheckbox) {
                themeToggleCheckbox.checked = true;
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (themeToggleCheckbox) {
                themeToggleCheckbox.checked = false;
            }
        }
    }
    
    // تبديل الوضع تلقائيًا حسب وضع الجهاز
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // تطبيق الوضع المفضل للمستخدم إذا لم يكن هناك إعدادات محفوظة
    if (!savedTheme) {
        if (prefersDarkScheme.matches) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            if (themeToggleCheckbox) {
                themeToggleCheckbox.checked = true;
            }
        }
    }
    
    // الاستجابة لتغييرات الوضع على مستوى النظام
    prefersDarkScheme.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
                if (themeToggleCheckbox) {
                    themeToggleCheckbox.checked = true;
                }
            } else {
                document.documentElement.classList.remove('dark-mode');
                document.body.classList.remove('dark-mode');
                if (themeToggleCheckbox) {
                    themeToggleCheckbox.checked = false;
                }
            }
        }
    });
});
