import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sensorsApi, farmsApi } from '../api';
import { Sensor, CreateSensorDTO, Farm } from '../types';
import { Plus, Search, Activity, Gauge, MapPin, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';

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

const demoSensors: Sensor[] = [
  {
    id: 'demo-sensor-1',
    farmId: 'demo-farm-1',
    deviceId: 'demo-device-1',
    name: 'مستشعر رطوبة التربة 1',
    type: 'SOIL_MOISTURE',
    unit: '%',
    location: 'القطعة الشمالية',
    latitude: 29.97,
    longitude: 31.13,
    status: 'ACTIVE',
    minThreshold: 20,
    maxThreshold: 80,
    lastReading: 45.6,
    lastReadingAt: '2024-01-20T12:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-20T12:30:00.000Z',
    isActive: true,
  },
  {
    id: 'demo-sensor-2',
    farmId: 'demo-farm-1',
    deviceId: 'demo-device-1',
    name: 'مستشعر درجة الحرارة',
    type: 'TEMPERATURE',
    unit: '°C',
    location: 'القطعة الوسطى',
    latitude: 29.97,
    longitude: 31.13,
    status: 'ACTIVE',
    minThreshold: 15,
    maxThreshold: 35,
    lastReading: 28.3,
    lastReadingAt: '2024-01-20T12:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-20T12:30:00.000Z',
    isActive: true,
  },
  {
    id: 'demo-sensor-3',
    farmId: 'demo-farm-1',
    deviceId: 'demo-device-2',
    name: 'مستشعر الرطوبة الجوية',
    type: 'HUMIDITY',
    unit: '%',
    location: 'القطعة الجنوبية',
    latitude: 29.97,
    longitude: 31.13,
    status: 'ACTIVE',
    minThreshold: 30,
    maxThreshold: 90,
    lastReading: 65.2,
    lastReadingAt: '2024-01-20T12:30:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-20T12:30:00.000Z',
    isActive: true,
  },
  {
    id: 'demo-sensor-4',
    farmId: 'demo-farm-2',
    deviceId: 'demo-device-3',
    name: 'مستشعر سرعة الرياح',
    type: 'WIND_SPEED',
    unit: 'km/h',
    location: 'البرج العلوي',
    latitude: 30.47,
    longitude: 30.93,
    status: 'ACTIVE',
    minThreshold: 0,
    maxThreshold: 50,
    lastReading: 12.8,
    lastReadingAt: '2024-01-20T12:30:00.000Z',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-20T12:30:00.000Z',
    isActive: true,
  },
];

const Sensors: React.FC = () => {
  const { accessToken } = useAuth();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarm, setSelectedFarm] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateSensorDTO>({
    name: '',
    type: 'SOIL_MOISTURE',
    unit: '%',
    farmId: '',
    deviceId: '',
    location: '',
    latitude: undefined,
    longitude: undefined,
    status: 'ACTIVE',
    minThreshold: undefined,
    maxThreshold: undefined,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Always start with demo data for now
      setSensors(demoSensors);
      setFarms(demoFarms);
      setIsDemoMode(true);
      setError(null);
      
      // Try to load from API if available
      if (accessToken) {
        try {
          const [sensorsResponse, farmsResponse] = await Promise.all([
            sensorsApi.listSensors(accessToken, { limit: 100 }),
            farmsApi.listFarms(accessToken, { limit: 100 })
          ]);
          
          setSensors(sensorsResponse.data);
          setFarms(farmsResponse.data);
          setIsDemoMode(false);
          setError(null);
        } catch (apiError: any) {
          console.warn('API failed, keeping demo data:', apiError.message);
          // Keep demo data, don't change anything
        }
      }
    } catch (err: any) {
      console.error('Failed to load data:', err);
      // Keep demo data, don't change anything
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSensor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDemoMode) {
      // Create demo sensor
      const newSensor: Sensor = {
        id: `demo-sensor-${Date.now()}`,
        farmId: formData.farmId,
        deviceId: formData.deviceId,
        name: formData.name,
        type: formData.type as any,
        unit: formData.unit,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        status: formData.status as any,
        minThreshold: formData.minThreshold,
        maxThreshold: formData.maxThreshold,
        lastReading: undefined,
        lastReadingAt: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };
      
      setSensors(prev => [newSensor, ...prev]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        type: 'SOIL_MOISTURE',
        unit: '%',
        farmId: '',
        deviceId: '',
        location: '',
        latitude: undefined,
        longitude: undefined,
        status: 'ACTIVE',
        minThreshold: undefined,
        maxThreshold: undefined,
      });
      setError(null);
      return;
    }

    try {
      const newSensor = await sensorsApi.createSensor(formData, accessToken!);
      setSensors(prev => [newSensor, ...prev]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        type: 'SOIL_MOISTURE',
        unit: '%',
        farmId: '',
        deviceId: '',
        location: '',
        latitude: undefined,
        longitude: undefined,
        status: 'ACTIVE',
        minThreshold: undefined,
        maxThreshold: undefined,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create sensor');
    }
  };

  const handleDeleteSensor = async (sensorId: string) => {
    if (window.confirm('Are you sure you want to delete this sensor?')) {
      if (isDemoMode) {
        // Delete demo sensor
        setSensors(prev => prev.filter(sensor => sensor.id !== sensorId));
        setError(null);
        return;
      }

      try {
        await sensorsApi.deleteSensor(sensorId, accessToken!);
        setSensors(prev => prev.filter(sensor => sensor.id !== sensorId));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to delete sensor');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800';
      case 'CALIBRATING': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'SOIL_MOISTURE': 'رطوبة التربة',
      'SOIL_PH': 'حموضة التربة',
      'TEMPERATURE': 'درجة الحرارة',
      'HUMIDITY': 'الرطوبة',
      'WATER_LEVEL': 'مستوى الماء',
      'LIGHT_INTENSITY': 'شدة الإضاءة',
      'RAINFALL': 'الأمطار',
      'WIND_SPEED': 'سرعة الرياح',
      'NUTRIENT_LEVEL': 'مستوى المغذيات',
      'OTHER': 'أخرى'
    };
    return typeLabels[type] || type;
  };

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getTypeLabel(sensor.type).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFarm = selectedFarm === 'all' || sensor.farmId === selectedFarm;
    
    return matchesSearch && matchesFarm;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة أجهزة الاستشعار</h1>
          <p className="text-gray-600">مراقبة وإدارة أجهزة الاستشعار في مزارعك</p>
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

        {/* Search, Filter and Create */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في أجهزة الاستشعار..."
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
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة جهاز استشعار
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Create Sensor Form */}
        {showCreateForm && (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">إضافة جهاز استشعار جديد</h3>
            <form onSubmit={handleCreateSensor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="SOIL_MOISTURE">رطوبة التربة</option>
                  <option value="SOIL_PH">حموضة التربة</option>
                  <option value="TEMPERATURE">درجة الحرارة</option>
                  <option value="HUMIDITY">الرطوبة</option>
                  <option value="WATER_LEVEL">مستوى الماء</option>
                  <option value="LIGHT_INTENSITY">شدة الإضاءة</option>
                  <option value="RAINFALL">الأمطار</option>
                  <option value="WIND_SPEED">سرعة الرياح</option>
                  <option value="NUTRIENT_LEVEL">مستوى المغذيات</option>
                  <option value="OTHER">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوحدة *</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المزرعة *</label>
                <select
                  required
                  value={formData.farmId}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">اختر المزرعة</option>
                  {farms.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
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
                  <option value="CALIBRATING">معايرة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأدنى</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.minThreshold || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, minThreshold: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.maxThreshold || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxThreshold: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  إنشاء جهاز الاستشعار
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

        {/* Sensors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSensors.map((sensor) => {
            const farm = farms.find(f => f.id === sensor.farmId);
            return (
              <div key={sensor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{sensor.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedSensor(sensor)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSensor(sensor.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Activity className="h-4 w-4" />
                    <span>{getTypeLabel(sensor.type)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Gauge className="h-4 w-4" />
                    <span>{sensor.unit}</span>
                  </div>
                  
                  {sensor.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{sensor.location}</span>
                    </div>
                  )}

                  {farm && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">المزرعة:</span> {farm.name}
                    </div>
                  )}

                  {sensor.lastReading !== undefined && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">آخر قراءة:</span>
                      <span className="ml-2 text-lg font-semibold text-green-600">
                        {sensor.lastReading} {sensor.unit}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                      {sensor.status === 'ACTIVE' ? 'نشط' : 
                       sensor.status === 'INACTIVE' ? 'غير نشط' :
                       sensor.status === 'ERROR' ? 'خطأ' :
                       sensor.status === 'MAINTENANCE' ? 'صيانة' :
                       sensor.status === 'CALIBRATING' ? 'معايرة' : sensor.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {sensor.lastReadingAt ? new Date(sensor.lastReadingAt).toLocaleDateString('ar-EG') : 'لا توجد قراءات'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSensors.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Activity className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أجهزة استشعار</h3>
            <p className="text-gray-600">ابدأ بإضافة جهاز استشعار جديد</p>
          </div>
        )}
      </div>

      {/* Sensor Details Modal */}
      {selectedSensor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedSensor.name}</h2>
                <button
                  onClick={() => setSelectedSensor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الجهاز</label>
                  <p className="text-gray-900">{getTypeLabel(selectedSensor.type)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوحدة</label>
                  <p className="text-gray-900">{selectedSensor.unit}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
                  <p className="text-gray-900">{selectedSensor.location || 'غير محدد'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSensor.status)}`}>
                    {selectedSensor.status === 'ACTIVE' ? 'نشط' : 
                     selectedSensor.status === 'INACTIVE' ? 'غير نشط' :
                     selectedSensor.status === 'ERROR' ? 'خطأ' :
                     selectedSensor.status === 'MAINTENANCE' ? 'صيانة' :
                     selectedSensor.status === 'CALIBRATING' ? 'معايرة' : selectedSensor.status}
                  </span>
                </div>
                
                {selectedSensor.minThreshold !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأدنى</label>
                    <p className="text-gray-900">{selectedSensor.minThreshold} {selectedSensor.unit}</p>
                  </div>
                )}
                
                {selectedSensor.maxThreshold !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى</label>
                    <p className="text-gray-900">{selectedSensor.maxThreshold} {selectedSensor.unit}</p>
                  </div>
                )}
              </div>
              
              {selectedSensor.lastReading !== undefined && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">آخر قراءة</h4>
                  <div className="text-2xl font-bold text-green-600">
                    {selectedSensor.lastReading} {selectedSensor.unit}
                  </div>
                  {selectedSensor.lastReadingAt && (
                    <div className="text-sm text-green-700 mt-1">
                      {new Date(selectedSensor.lastReadingAt).toLocaleString('ar-EG')}
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-6 flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  عرض القراءات
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  تعديل الجهاز
                </button>
                <button
                  onClick={() => setSelectedSensor(null)}
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

export default Sensors;
