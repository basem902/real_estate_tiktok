/**
 * Real Estate TikTok - Marketers Dashboard
 * Theme Switcher
 * Version: 1.0.0
 */

// تهيئة محول السمة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود تفضيل السمة في التخزين المحلي
    const savedTheme = localStorage.getItem('theme');
    
    // التحقق من تفضيلات النظام
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // تعيين السمة الافتراضية
    if (savedTheme) {
        // استخدام السمة المحفوظة إذا كانت موجودة
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        // استخدام الوضع الداكن إذا كان المستخدم يفضله على مستوى النظام
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        // الوضع الفاتح كافتراضي
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // تحديث حالة زر التبديل (إن وجد)
    updateToggleState();
    
    // إضافة مستمع حدث لزر تبديل السمة
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

/**
 * تبديل السمة بين الوضع الداكن والفاتح
 */
function toggleTheme() {
    // الحصول على السمة الحالية
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // تبديل السمة
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // تطبيق السمة الجديدة
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // حفظ التفضيل في التخزين المحلي
    localStorage.setItem('theme', newTheme);
    
    // تحديث حالة زر التبديل
    updateToggleState();
}

/**
 * تحديث حالة زر التبديل استنادًا إلى السمة الحالية
 */
function updateToggleState() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // تحديث أيقونة الزر
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', 'التبديل إلى الوضع الفاتح');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('title', 'التبديل إلى الوضع الداكن');
        }
    }
}

/**
 * دالة للتحقق من السمة الحالية
 * @returns {string} 'dark' أو 'light'
 */
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

/**
 * دالة لتعيين السمة برمجيًا
 * @param {string} theme - السمة المراد تعيينها ('dark' أو 'light')
 */
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleState();
    } else {
        console.error('السمة غير صالحة، استخدم "dark" أو "light" فقط');
    }
}
