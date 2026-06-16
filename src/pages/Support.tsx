import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Book, Video, Search } from 'lucide-react';

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const faqs = [
    {
      question: 'كيف أقوم بتثبيت أجهزة الاستشعار في مزرعتي؟',
      answer: 'يمكنك تثبيت أجهزة الاستشعار بسهولة باتباع الدليل المرفق. نوفر فريق فني لمساعدتك في التثبيت مجاناً.'
    },
    {
      question: 'كيف يمكنني تفسير البيانات الواردة من أجهزة الاستشعار؟',
      answer: 'توفر المنصة تفسيراً تلقائياً للبيانات مع توصيات واضحة. كما يمكنك الرجوع لقسم التعليمات أو التواصل مع فريق الدعم.'
    },
    {
      question: 'ما هي تكلفة استخدام المنصة؟',
      answer: 'نوفر خطة مجانية للمزارعين الصغار وخطط مدفوعة للمزارع الكبيرة. يمكنك الاطلاع على جدول الأسعار في قسم الاشتراكات.'
    }
  ];

  const tutorials = [
    {
      title: 'دليل البدء السريع',
      description: 'تعلم كيفية إعداد حسابك وربط أجهزة الاستشعار',
      duration: '10 دقائق',
      type: 'video'
    },
    {
      title: 'فهم بيانات التربة',
      description: 'كيفية قراءة وتفسير بيانات رطوبة التربة والحموضة',
      duration: '15 دقيقة',
      type: 'article'
    },
    {
      title: 'نظام الري الذكي',
      description: 'إعداد نظام الري التلقائي بناءً على بيانات الاستشعار',
      duration: '20 دقيقة',
      type: 'video'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">الدعم الفني</h1>
        <p className="text-gray-600 mt-1">نحن هنا لمساعدتك في كل خطوة من رحلتك الزراعية</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">الدردشة المباشرة</h3>
          <p className="text-gray-600 mb-4">تحدث مع فريق الدعم مباشرة</p>
          <button 
            onClick={() => setActiveTab('chat')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            بدء محادثة
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">الهاتف</h3>
          <p className="text-gray-600 mb-4">اتصل بنا مباشرة للدعم العاجل</p>
          <p className="font-medium text-gray-900">16555</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">البريد الإلكتروني</h3>
          <p className="text-gray-600 mb-4">راسلنا للاستفسارات التفصيلية</p>
          <p className="font-medium text-gray-900">support@reefplus.com</p>
        </div>
      </div>

      {/* Chat Interface */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">الدردشة المباشرة</h3>
          </div>
          
          <div className="h-96 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">د</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">مرحباً! كيف يمكنني مساعدتك اليوم؟</p>
                </div>
              </div>
              
              <div className="flex items-start justify-end space-x-3 space-x-reverse">
                <div className="bg-primary-500 text-white rounded-lg p-3 max-w-xs">
                  <p className="text-sm">أحتاج مساعدة في فهم بيانات أجهزة الاستشعار</p>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">أ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2 space-x-reverse">
              <input
                type="text"
                placeholder="اكتب رسالتك..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">مصادر التعلم</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                {tutorial.type === 'video' ? (
                  <Video className="w-6 h-6 text-red-500" />
                ) : (
                  <Book className="w-6 h-6 text-blue-500" />
                )}
                <span className="text-sm text-gray-500">{tutorial.duration}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tutorial.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {tutorial.description}
              </p>
              
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                ابدأ التعلم ←
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;