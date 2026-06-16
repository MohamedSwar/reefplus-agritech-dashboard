import React from 'react';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

const Investment: React.FC = () => {
  const investments = [
    {
      id: '1',
      title: 'مشروع زراعة القمح - موسم 2024',
      description: 'استثمار في 100 فدان لزراعة القمح عالي الجودة',
      targetAmount: 500000,
      currentAmount: 350000,
      investorsCount: 45,
      duration: '6 أشهر',
      expectedReturn: '15%',
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'
    },
    {
      id: '2',
      title: 'مزرعة الطماطم الذكية',
      description: 'تطوير مزرعة طماطم بتقنيات الزراعة الذكية والري الحديث',
      targetAmount: 750000,
      currentAmount: 200000,
      investorsCount: 23,
      duration: '8 أشهر',
      expectedReturn: '20%',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">بوابة الاستثمار الزراعي</h1>
        <p className="text-gray-600 mt-1">استثمر في المشاريع الزراعية الواعدة واحصل على عوائد مجزية</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الاستثمارات</p>
              <p className="text-2xl font-bold text-gray-900">2.5 مليون</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">متوسط العائد</p>
              <p className="text-2xl font-bold text-gray-900">18%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المستثمرين النشطين</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المشاريع النشطة</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Opportunities */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">فرص الاستثمار المتاحة</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investments.map((investment) => (
            <div key={investment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={investment.image}
                alt={investment.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {investment.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {investment.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>تم جمع: {investment.currentAmount.toLocaleString('ar-EG')} جنيه</span>
                    <span>الهدف: {investment.targetAmount.toLocaleString('ar-EG')} جنيه</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(investment.currentAmount / investment.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Users className="w-4 h-4" />
                      <span>{investment.investorsCount} مستثمر</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{investment.duration}</span>
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold">
                    عائد متوقع: {investment.expectedReturn}
                  </div>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  استثمر الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Investment;