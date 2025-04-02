from flask import (Flask, render_template, redirect, url_for, request, 
                   jsonify, make_response)

app = Flask(__name__)

# تعطيل التخزين المؤقت للصفحات
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response

@app.route('/')
def index():
    # توجيه المستخدم إلى صفحة البداية الأولى
    return render_template('splash/splash1.html')

@app.route('/splash1')
def splash1():
    return render_template('splash/splash1.html')

@app.route('/splash2')
def splash2():
    return render_template('splash/splash2.html')

@app.route('/splash3')
def splash3():
    return render_template('splash/splash3.html')

@app.route('/user_type')
def user_type():
    # صفحة اختيار نوع المستخدم
    return render_template('user_type/choose_user_type.html')

@app.route('/login/<user_type>')
def login(user_type):
    # توجيه المستخدم إلى صفحة تسجيل الدخول المناسبة حسب نوع المستخدم
    if user_type == 'developers':
        return render_template('developers/login_developers.html')
    elif user_type == 'marketers':
        return render_template('marketers/login_marketers.html')
    elif user_type == 'clients':
        return render_template('clients/login_clients.html')
    elif user_type == 'visitors':
        # الزوار يتم توجيههم مباشرة إلى صفحة الفيديوهات
        return redirect(url_for('videos'))
    else:
        # في حالة وجود خطأ نعيد توجيه المستخدم إلى صفحة اختيار نوع المستخدم
        return redirect(url_for('user_type'))

@app.route('/videos')
def videos():
    # صفحة الفيديوهات على طريقة تيك توك
    return render_template('visitors/videos.html')

@app.route('/visitors/feed')
def visitor_feed():
    # صفحة الفيديوهات على طريقة تيك توك للزوار
    # إنشاء بيانات العقارات لعرضها في الصفحة
    properties = [
        {
            'id': 1,
            'title': 'منزل عائلي فاخر',
            'location': 'الرياض، حي الروضة',
            'area': 420,
            'bedrooms': 5,
            'price': 2200000,
            'videos': ['https://player.vimeo.com/video/1052566570?h=60a627009b'],
            'agent_id': 1,
            'likes': 245,
            'comments': [{'id': 1}, {'id': 2}, {'id': 3}] * 6
        },
        {
            'id': 2,
            'title': 'شقة فاخرة بإطلالة بحرية',
            'location': 'جدة، حي الشاطئ',
            'area': 180,
            'bedrooms': 3,
            'price': 1800000,
            'videos': ['https://player.vimeo.com/video/1052566651?h=6b1774aec0'],
            'agent_id': 2,
            'likes': 189,
            'comments': [{'id': 1}, {'id': 2}] * 5
        },
        {
            'id': 3,
            'title': 'فيلا واسعة مع حديقة',
            'location': 'الدمام، حي النزهة',
            'area': 550,
            'bedrooms': 6,
            'price': 3100000,
            'videos': ['https://player.vimeo.com/video/1052566689?h=e7339c8b31'],
            'agent_id': 3,
            'likes': 320,
            'comments': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}] * 3
        },
        {
            'id': 4,
            'title': 'شاليه مميز بإطلالة خلابة',
            'location': 'الخبر، حي الشاطئ',
            'area': 280,
            'bedrooms': 4,
            'price': 1600000,
            'videos': ['https://player.vimeo.com/video/1052566714?h=2ec45d0872'],
            'agent_id': 1,
            'likes': 175,
            'comments': [{'id': 1}] * 7
        }
    ]
    
    # بيانات الوكلاء العقاريين
    agents = [
        {
            'id': 1,
            'name': 'خالد العقاري',
            'image': 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            'id': 2,
            'name': 'سارة الحميد',
            'image': 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            'id': 3,
            'name': 'أحمد الشمري',
            'image': 'https://randomuser.me/api/portraits/men/22.jpg'
        }
    ]
    
    # دالة لتنسيق السعر
    def format_price(price):
        return f"{price:,}"
    
    return render_template('visitors/visitor_feed.html', properties=properties, agents=agents, format_price=format_price)

@app.route('/clients/feed')
def client_feed():
    # صفحة الفيديوهات على طريقة تيك توك للعملاء المسجلين
    # استخدام نفس بيانات العقارات المستخدمة في صفحة الزوار
    properties = [
        {
            'id': 1,
            'title': 'منزل عائلي فاخر',
            'location': 'الرياض، حي الروضة',
            'area': 420,
            'bedrooms': 5,
            'price': 2200000,
            'videos': ['https://player.vimeo.com/video/1052566570?h=60a627009b'],
            'agent_id': 1,
            'likes': 245,
            'comments': [{'id': 1}, {'id': 2}, {'id': 3}] * 6
        },
        {
            'id': 2,
            'title': 'شقة فاخرة بإطلالة بحرية',
            'location': 'جدة، حي الشاطئ',
            'area': 180,
            'bedrooms': 3,
            'price': 1800000,
            'videos': ['https://player.vimeo.com/video/1052566651?h=6b1774aec0'],
            'agent_id': 2,
            'likes': 189,
            'comments': [{'id': 1}, {'id': 2}] * 5
        },
        {
            'id': 3,
            'title': 'فيلا واسعة مع حديقة',
            'location': 'الدمام، حي النزهة',
            'area': 550,
            'bedrooms': 6,
            'price': 3100000,
            'videos': ['https://player.vimeo.com/video/1052566689?h=e7339c8b31'],
            'agent_id': 3,
            'likes': 320,
            'comments': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}] * 3
        },
        {
            'id': 4,
            'title': 'شاليه مميز بإطلالة خلابة',
            'location': 'الخبر، حي الشاطئ',
            'area': 220,
            'bedrooms': 4,
            'price': 1500000,
            'videos': ['https://player.vimeo.com/video/1052566714?h=2ec45d0872'],
            'agent_id': 2,
            'likes': 156,
            'comments': [{'id': 1}, {'id': 2}] * 4
        }
    ]

    # إنشاء بيانات الوكلاء
    agents = [
        {
            'id': 1,
            'name': 'محمد الأحمد',
            'image': 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            'id': 2,
            'name': 'سارة الغامدي',
            'image': 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            'id': 3,
            'name': 'أحمد العنزي',
            'image': 'https://randomuser.me/api/portraits/men/22.jpg'
        }
    ]

    # دالة مساعدة لتنسيق الأسعار
    def format_price(price):
        return "{:,}".format(price)

    return render_template('clients/client_feed.html', 
                           properties=properties, 
                           agents=agents, 
                           format_price=format_price)

# إضافة مسار للملف الشخصي للعميل
@app.route('/clients/profile')
def client_profile():
    """صفحة الملف الشخصي للعميل"""
    # بيانات المستخدم الحالي (يمكن استبدالها بالبيانات من قاعدة البيانات لاحقًا)
    client = {
        'id': 1,
        'name': 'محمد الأحمد',
        'email': 'mohammed@example.com',
        'phone': '+966 50 123 4567',
        'address': 'الرياض، حي النزهة',
        'photo': url_for('static', filename='images/default-profile.png'),
        'liked_properties': 12,
        'saved_searches': 5,
        'recent_views': 24,
        'membership': 'عضوية ذهبية',
        'join_date': '2024-01-15'
    }
    
    return render_template('clients/client_profile.html', client=client)

# إضافة مسار جديد لعرض شريط التنقل الجانبي المستقل
@app.route('/clients/sidebar')
def client_sidebar():
    # صفحة عرض الشريط الجانبي للعميل
    return render_template('clients/client_sidebar.html')

# المسارات الخاصة بالعملاء
@app.route('/clients/likes')
def client_likes():
    """صفحة الإعجابات للعميل"""
    return render_template('clients/client_likes.html')

@app.route('/clients/messages')
def client_messages():
    """صفحة الرسائل للعميل"""
    return render_template('clients/client_messages.html')

@app.route('/clients/search')
def client_search():
    """صفحة البحث للعميل"""
    return render_template('clients/client_search.html')

@app.route('/developers/dashboard')
def developers_dashboard():
    # الصفحة الرئيسية للوحة تحكم المطورين العقاريين
    return render_template('developers/dashboard/developer_dashboard_main.html')

@app.route('/developers/profile')
def developers_profile():
    # صفحة بروفايل شركة التطوير
    return render_template('developers/dashboard/profile.html')

@app.route('/developers/scheduler')
def developers_scheduler():
    # صفحة إدارة المواعيد
    return render_template('developers/dashboard/scheduler.html')

@app.route('/developers/projects')
def developers_projects():
    # صفحة إدارة المشاريع
    return render_template('developers/dashboard/projects.html')

@app.route('/developers/ads')
def developers_ads():
    # صفحة إدارة الإعلانات
    return render_template('developers/dashboard/ads.html')

@app.route('/developers/marketers')
def developers_marketers():
    # صفحة إدارة المسوقين
    return render_template('developers/dashboard/marketers.html')

@app.route('/developers/social')
def developers_social():
    # صفحة التفاعل الاجتماعي
    return render_template('developers/dashboard/social.html')

@app.route('/developers/subscription')
def developers_subscription():
    # صفحة إدارة الاشتراك والباقات
    return render_template('developers/dashboard/subscription.html')

@app.route('/developers/analytics')
def developers_analytics():
    # صفحة التحليلات والإحصائيات
    return render_template('developers/dashboard/analytics.html')

@app.route('/developers/settings')
def developers_settings():
    # صفحة الإعدادات
    return render_template('developers/dashboard/settings.html')

# إضافة مسارات جديدة لصفحات المسوقين
@app.route('/marketers/login_marketers')
def marketers_login_direct():
    # صفحة تسجيل دخول المسوقين (طريقة مباشرة)
    return render_template('marketers/login_marketers.html')

@app.route('/marketers/dashboard/overview-panel', methods=['GET', 'POST'])
def marketers_dashboard_overview():
    # صفحة النظرة العامة للوحة تحكم المسوقين
    if request.method == 'POST':
        # يمكن معالجة بيانات تسجيل الدخول هنا (اسم المستخدم وكلمة المرور)
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        # هنا يمكن إضافة التحقق من صحة بيانات المستخدم
        
    return render_template('marketers/dashboard/overview-panel.html')

# مسار إضافي للوصول إلى صفحات لوحة تحكم المسوقين الأخرى
@app.route('/marketers/dashboard/<page>')
def marketers_dashboard(page):
    # توجيه ديناميكي إلى صفحات لوحة تحكم المسوقين
    if page == 'overview':
        return render_template('marketers/dashboard/overview-panel.html')
    return render_template(f'marketers/dashboard/{page}.html')

# إضافة مسارات للوصول إلى صفحات إدارة العملاء للمسوقين
@app.route('/marketers/crm/<page>')
def marketers_crm(page):
    # توجيه ديناميكي إلى صفحات إدارة العملاء (CRM)
    if page == 'customers':
        return render_template('marketers/crm/customer-list.html')
    return render_template(f'marketers/crm/{page}.html')

@app.route('/marketers/crm/customer-list.html')
def marketers_customer_list():
    # صفحة قائمة العملاء للمسوقين
    return render_template('marketers/crm/customer-list.html')

@app.route('/marketers/crm/add-customer.html')
def marketers_add_customer():
    # صفحة إضافة عميل جديد للمسوقين
    return render_template('marketers/crm/add-customer.html')

# إضافة مسارات جديدة لصفحات المسوقين
@app.route('/marketers/scheduler')
def marketers_scheduler():
    # صفحة جدولة المواعيد للمسوقين
    return render_template('marketers/schedule/calendar-view.html')

@app.route('/marketers/schedule/calendar-view.html')
def marketers_calendar_view():
    # صفحة عرض التقويم للمواعيد
    return render_template('marketers/schedule/calendar-view.html')

@app.route('/marketers/ads')
def marketers_ads():
    # صفحة إدارة الإعلانات للمسوقين
    return render_template('marketers/ads/ads-management.html')

@app.route('/marketers/ai-assistant')
def marketers_ai_assistant():
    # صفحة المساعد الذكي للمسوقين
    return render_template('marketers/ai-assistant/ai-assistant.html')

# إضافة مسارات جديدة للصفحات الفرعية للمساعد الذكي
@app.route('/marketers/ai-assistant/content-writer')
def marketers_ai_content_writer():
    # صفحة كاتب المحتوى
    return render_template('marketers/ai-assistant/content-writer.html')

@app.route('/marketers/ai-assistant/content-writer.html')
def marketers_ai_content_writer_html():
    # صفحة كاتب المحتوى - مسار بديل
    return render_template('marketers/ai-assistant/content-writer.html')

@app.route('/marketers/ai-assistant/ad-generator')
def marketers_ai_ad_generator():
    # صفحة مولّد الإعلانات
    return render_template('marketers/ai-assistant/ad-generator.html')

@app.route('/marketers/ai-assistant/ad-generator.html')
def marketers_ai_ad_generator_html():
    # صفحة مولّد الإعلانات - مسار بديل
    return render_template('marketers/ai-assistant/ad-generator.html')

@app.route('/marketers/ai-assistant/conversation-analyzer')
def marketers_ai_conversation_analyzer():
    # صفحة محلل المحادثات
    return render_template('marketers/ai-assistant/conversation-analyzer.html')

@app.route('/marketers/ai-assistant/conversation-analyzer.html')
def marketers_ai_conversation_analyzer_html():
    # صفحة محلل المحادثات - مسار بديل
    return render_template('marketers/ai-assistant/conversation-analyzer.html')

@app.route('/marketers/ai-assistant/market-analyzer')
def marketers_ai_market_analyzer():
    # صفحة محلل السوق
    return render_template('marketers/ai-assistant/market-analyzer.html')

@app.route('/marketers/ai-assistant/market-analyzer.html')
def marketers_ai_market_analyzer_html():
    # صفحة محلل السوق - مسار بديل
    return render_template('marketers/ai-assistant/market-analyzer.html')

@app.route('/marketers/video-gallery')
def marketers_video_gallery():
    # صفحة معرض الفيديوهات للمسوقين
    return render_template('marketers/video-gallery/video-library.html')

@app.route('/marketers/video-gallery/video-library.html')
def marketers_video_gallery_html():
    # صفحة معرض الفيديوهات - مسار بديل
    return render_template('marketers/video-gallery/video-library.html')

@app.route('/marketers/video-gallery/ad-tiktok')
def marketers_ad_tiktok():
    # صفحة فيديوهات الإعلانية بنمط تيك توك
    return render_template('marketers/video-gallery/ad-video-tiktok.html')

@app.route('/marketers/video-gallery/ad-tiktok.html')
def marketers_ad_tiktok_html():
    # صفحة فيديوهات الإعلانية بنمط تيك توك - مسار بديل
    return render_template('marketers/video-gallery/ad-video-tiktok.html')

@app.route('/marketers/commissions')
def marketers_commissions():
    # صفحة العمولات والمدفوعات للمسوقين
    return render_template('marketers/commissions/commissions-payments.html')

@app.route('/marketers/commissions/commissions-payments.html')
def marketers_commissions_html():
    # صفحة العمولات والمدفوعات - مسار بديل
    return render_template('marketers/commissions/commissions-payments.html')

@app.route('/marketers/social')
def marketers_social():
    # صفحة التفاعل الاجتماعي للمسوقين
    return render_template('marketers/social/social-hub.html')

@app.route('/marketers/social/social-hub.html')
def marketers_social_html():
    # صفحة التفاعل الاجتماعي - مسار بديل
    return render_template('marketers/social/social-hub.html')

@app.route('/marketers/social/review-manager')
def marketers_social_review():
    # صفحة إدارة التقييمات
    return render_template('marketers/social/review-manager.html')

@app.route('/marketers/social/review-manager.html')
def marketers_social_review_html():
    # صفحة إدارة التقييمات - مسار بديل
    return render_template('marketers/social/review-manager.html')

@app.route('/marketers/reviews/reviews_dashboard.html')
def marketers_reviews_dashboard():
    # صفحة لوحة التحكم للتقييمات - مسار قديم للتوافق
    return render_template('marketers/reviews/reviews_dashboard.html')

@app.route('/marketers/social/followers-manager')
def marketers_social_followers():
    # صفحة إدارة المتابعين
    return render_template('marketers/social/followers-manager.html')

@app.route('/marketers/social/followers-manager.html')
def marketers_social_followers_html():
    # صفحة إدارة المتابعين - مسار بديل
    return render_template('marketers/social/followers-manager.html')

@app.route('/marketers/social/likes-manager')
def marketers_social_likes():
    # صفحة إدارة الإعجابات
    return render_template('marketers/social/likes-manager.html')

@app.route('/marketers/social/likes-manager.html')
def marketers_social_likes_html():
    # صفحة إدارة الإعجابات - مسار بديل
    return render_template('marketers/social/likes-manager.html')

@app.route('/marketers/social/comments-manager')
def marketers_social_comments():
    # صفحة إدارة التعليقات
    return render_template('marketers/social/comments-manager.html')

@app.route('/marketers/social/comments-manager.html')
def marketers_social_comments_html():
    # صفحة إدارة التعليقات - مسار بديل
    return render_template('marketers/social/comments-manager.html')

@app.route('/marketers/social/chats-manager')
def marketers_social_chats():
    # صفحة المحادثات الداخلية
    return render_template('marketers/social/chats-manager.html')

@app.route('/marketers/social/chats-manager.html')
def marketers_social_chats_html():
    # صفحة المحادثات الداخلية - مسار بديل
    return render_template('marketers/social/chats-manager.html')

@app.route('/marketers/settings')
def marketers_settings():
    # صفحة الإعدادات للمسوقين
    return render_template('marketers/settings/settings.html')

@app.route('/marketers/settings/settings.html')
def marketers_settings_html():
    # صفحة الإعدادات - مسار بديل
    return render_template('marketers/settings/settings.html')

@app.route('/logout')
def logout():
    # تسجيل الخروج
    # هنا يمكن إضافة منطق تسجيل الخروج مثل حذف الجلسة
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
