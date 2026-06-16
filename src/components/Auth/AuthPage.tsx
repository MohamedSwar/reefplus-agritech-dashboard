import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check if backend is available
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/health', {
          signal: AbortSignal.timeout(3000)
        });
        setIsDemoMode(!response.ok);
      } catch {
        setIsDemoMode(true);
      }
    };
    
    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'مرحباً بك في منصة ريف بلس الزراعية' 
              : 'انضم إلى منصة ريف بلس الزراعية'
            }
          </p>
        </div>

        {/* Demo mode indicator */}
        {isDemoMode && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            <strong>وضع التجربة:</strong> التطبيق يعمل في وضع التجربة. يمكنك استخدام أي بيانات للدخول.
          </div>
        )}

        {/* Debug info - remove in production */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          <strong>Debug Info:</strong> AuthPage loaded successfully
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {isLogin 
              ? 'ليس لديك حساب؟ إنشاء حساب جديد' 
              : 'لديك حساب بالفعل؟ تسجيل الدخول'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
