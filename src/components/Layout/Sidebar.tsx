import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  MessageSquare,
  TrendingUp,
  Map,
  Store,
  Users,
  BarChart3,
  Bell,
  Leaf,
  MapPin,
  Activity,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/' },
    { icon: MapPin, label: 'المزارع', path: '/farms' },
    { icon: Activity, label: 'أجهزة الاستشعار', path: '/sensors' },
    { icon: Smartphone, label: 'الأجهزة', path: '/devices' },
    { icon: ShoppingCart, label: 'السوق الزراعي', path: '/marketplace' },
    { icon: TrendingUp, label: 'الاستثمار', path: '/investment' },
    { icon: Map, label: 'الخريطة', path: '/map' },
    { icon: Store, label: 'متاجر المستلزمات', path: '/stores' },
    { icon: MessageSquare, label: 'الدعم الفني', path: '/support' },
    { icon: Bell, label: 'الإشعارات', path: '/notifications' },
  ];

  const adminItems = [
    { icon: Users, label: 'إدارة المستخدمين', path: '/admin/users' },
    { icon: BarChart3, label: 'التقارير', path: '/admin/reports' },
    { icon: Settings, label: 'إعدادات النظام', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed right-0 top-0 z-40 border-l border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">ريف بلس</h1>
            <p className="text-sm text-gray-500">الزراعة الذكية</p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center px-6 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-5 h-5 ml-3" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {user?.role === 'admin' && (
          <div className="mt-8">
            <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              إدارة النظام
            </h3>
            <div className="mt-2 space-y-1">
              {adminItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      'flex items-center px-6 py-3 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-5 h-5 ml-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;