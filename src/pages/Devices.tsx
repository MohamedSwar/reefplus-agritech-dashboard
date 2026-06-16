import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { devicesApi, farmsApi } from '../api';
import { Device, CreateDeviceDTO, Farm } from '../types';
import { Plus, Search, Smartphone, Activity, MapPin, Edit, Trash2, Eye, Settings } from 'lucide-react';

// Demo data directly in the component
const demoFarms: Farm[] = [
  {
    id: 'demo-farm-1',
    ownerId: 'demo-user-1',
    name: 'مزرعة النيل الأخضر',
    description: 'مزرعة حديثة تنتج الخضروات والفواكه',
    location: 'الجيزة، مصر',
    latitude: 29.97,
    longitude: 31.13,
    areaSize: 50,
    areaUnit: 'hectares',
    cropType: 'خضروات متنوعة',
    soilType: 'طيني',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-farm-2',
    ownerId: 'demo-user-1',
    name: 'مزرعة الوادي الخصيب',
    description: 'مزرعة متخصصة في إنتاج القمح',
    location: 'المنوفية، مصر',
    latitude: 30.47,
    longitude: 30.93,
    areaSize: 30,
    areaUnit: 'hectares',
    cropType: 'قمح',
    soilType: 'رملي',
    isActive: true,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
];

const demoDevices: Device[] = [
  {
    id: 'demo-device-1',
    name: 'جهاز التحكم الرئيسي',
    type: 'controller',
    status: 'ACTIVE',
    farmId: 'demo-farm-1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-device-2',
    name: 'بوابة الاتصال',
    type: 'gateway',
    status: 'ACTIVE',
    farmId: 'demo-farm-1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-device-3',
    name: 'جهاز مراقبة الطقس',
    type: 'monitor',
    status: 'ACTIVE',
    farmId: 'demo-farm-2',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
];

const Devices: React.FC = () => {
  const { accessToken } = useAuth();
  
  // Simple state - no complex loading logic
  const [devices, setDevices] = useState<Device[]>(demoDevices);
  const [farms, setFarms] = useState<Farm[]>(demoFarms);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarm, setSelectedFarm] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Form state
  const [formData, setFormData] = useState<CreateDeviceDTO>({
    name: '',
    type: '',
    status: 'ACTIVE',
    farmId: '',
  });

  const handleCreateDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newDevice = await devicesApi.createDevice(formData, accessToken!);
      setDevices(prev => [newDevice, ...prev]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        type: '',
        status: 'ACTIVE',
        farmId: '',
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create device');
    }
  };

  const handleDeleteDevice = async (deviceId: string) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await devicesApi.deleteDevice(deviceId, accessToken!);
        setDevices(prev => prev.filter(device => device.id !== deviceId));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to delete device');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'نشط';
      case 'INACTIVE': return 'غير نشط';
      case 'ERROR': return 'خطأ';
      case 'MAINTENANCE': return 'صيانة';
      default: return status;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFarm = selectedFarm === 'all' || device.farmId === selectedFarm;
    const matchesType = selectedType === 'all' || device.type === selectedType;
    
    return matchesSearch && matchesFarm && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الأجهزة</h1>
          <p className="text-gray-600">إدارة الأجهزة الذكية في مزارعك</p>
        </div>

        {/* Demo Mode Indicator */}
        {isDemoMode && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium text-blue-800">
                  وضع التجربة: البيانات المعروضة هي بيانات تجريبية
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">
            <p>Debug Info:</p>
            <p>Devices Count: {devices.length}</p>
            <p>Farms Count: {farms.length}</p>
            <p>Demo Mode: {isDemoMode ? 'true' : 'false'}</p>
            <p>Access Token: {accessToken ? 'Present' : 'None'}</p>
          </div>
        </div>

        {/* Search, Filters and Create */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في الأجهزة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">جميع المزارع</option>
            {farms.map(farm => (
              <option key={farm.id} value={farm.id}>{farm.name}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">جميع الأنواع</option>
            <option value="controller">جهاز تحكم</option>
            <option value="gateway">بوابة اتصال</option>
            <option value="monitor">جهاز مراقبة</option>
            <option value="actuator">مشغل</option>
            <option value="other">أخرى</option>
          </select>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة جهاز جديد
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Create Device Form */}
        {showCreateForm && (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">إضافة جهاز جديد</h3>
            <form onSubmit={handleCreateDevice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الجهاز *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع الجهاز *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">اختر نوع الجهاز</option>
                  <option value="controller">جهاز تحكم</option>
                  <option value="gateway">بوابة اتصال</option>
                  <option value="monitor">جهاز مراقبة</option>
                  <option value="actuator">مشغل</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="ACTIVE">نشط</option>
                  <option value="INACTIVE">غير نشط</option>
                  <option value="MAINTENANCE">صيانة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المزرعة</label>
                <select
                  value={formData.farmId}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">بدون مزرعة</option>
                  {farms.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  إنشاء الجهاز
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => {
            const farm = farms.find(f => f.id === device.farmId);
            return (
              <div key={device.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{device.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDevice(device)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Smartphone className="h-4 w-4" />
                    <span className="capitalize">{device.type}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Activity className="h-4 w-4" />
                    <span>{getStatusLabel(device.status)}</span>
                  </div>
                  
                  {farm && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{farm.name}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {getStatusLabel(device.status)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(device.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Smartphone className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أجهزة</h3>
            <p className="text-gray-600">ابدأ بإضافة جهاز جديد</p>
          </div>
        )}
      </div>

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDevice.name}</h2>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الجهاز</label>
                  <p className="text-gray-900 capitalize">{selectedDevice.type}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDevice.status)}`}>
                    {getStatusLabel(selectedDevice.status)}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المزرعة</label>
                  <p className="text-gray-900">
                    {farms.find(f => f.id === selectedDevice.farmId)?.name || 'بدون مزرعة'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإنشاء</label>
                  <p className="text-gray-900">{new Date(selectedDevice.createdAt).toLocaleDateString('ar-EG')}</p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  إعدادات الجهاز
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  تعديل الجهاز
                </button>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
