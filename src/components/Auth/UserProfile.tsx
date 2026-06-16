import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, accessToken, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لم يتم تسجيل الدخول</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-green-600">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
          {user.role === 'farmer' ? 'مزارع' : user.role === 'buyer' ? 'مشتري' : 'مدير'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">معلومات الحساب</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">الاسم:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">البريد الإلكتروني:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الدور:</span>
              <span className="font-medium">
                {user.role === 'farmer' ? 'مزارع' : user.role === 'buyer' ? 'مشتري' : 'مدير'}
              </span>
            </div>
            {user.location && (
              <div className="flex justify-between">
                <span className="text-gray-600">الموقع:</span>
                <span className="font-medium">{user.location}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex justify-between">
                <span className="text-gray-600">الهاتف:</span>
                <span className="font-medium">{user.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">معلومات الجلسة</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">معرف المستخدم:</span>
              <span className="font-mono text-sm">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">رمز الوصول:</span>
              <span className="font-mono text-sm text-green-600">
                {accessToken ? 'متوفر' : 'غير متوفر'}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
