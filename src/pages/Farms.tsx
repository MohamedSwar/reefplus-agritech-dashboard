import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { farmsApi } from '../api/farms';
import { Farm, CreateFarmDTO } from '../types';
import { Plus, Search, MapPin, Crop, Ruler, Edit, Trash2, Eye } from 'lucide-react';

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

const Farms: React.FC = () => {
  const { accessToken } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateFarmDTO>({
    name: '',
    description: '',
    location: '',
    latitude: undefined,
    longitude: undefined,
    areaSize: 0,
    areaUnit: 'hectares',
    cropType: '',
    soilType: '',
    isActive: true,
  });

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      setLoading(true);
      
      // Always start with demo data for now
      setFarms(demoFarms);
      setIsDemoMode(true);
      setError(null);
      
      // Try to load from API if available
      if (accessToken) {
        try {
          const response = await farmsApi.listFarms(accessToken, {
            search: searchTerm || undefined,
            limit: 50,
          });
          setFarms(response.data);
          setIsDemoMode(false);
          setError(null);
        } catch (apiError: any) {
          console.warn('API failed, keeping demo data:', apiError.message);
          // Keep demo data, don't change anything
        }
      }
    } catch (err: any) {
      console.error('Failed to load farms:', err);
      // Keep demo data, don't change anything
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDemoMode) {
      // Create demo farm
      const newFarm: Farm = {
        id: `demo-farm-${Date.now()}`,
        ownerId: 'demo-user-1',
        name: formData.name,
        description: formData.description,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        areaSize: formData.areaSize,
        areaUnit: formData.areaUnit,
        cropType: formData.cropType,
        soilType: formData.soilType,
        isActive: formData.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setFarms(prev => [newFarm, ...prev]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        location: '',
        latitude: undefined,
        longitude: undefined,
        areaSize: 0,
        areaUnit: 'hectares',
        cropType: '',
        soilType: '',
        isActive: true,
      });
      setError(null);
      return;
    }

    try {
      const newFarm = await farmsApi.createFarm(formData, accessToken!);
      setFarms(prev => [newFarm, ...prev]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        location: '',
        latitude: undefined,
        longitude: undefined,
        areaSize: 0,
        areaUnit: 'hectares',
        cropType: '',
        soilType: '',
        isActive: true,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create farm');
    }
  };

  const handleDeleteFarm = async (farmId: string) => {
    if (window.confirm('Are you sure you want to delete this farm?')) {
      if (isDemoMode) {
        // Delete demo farm
        setFarms(prev => prev.filter(farm => farm.id !== farmId));
        setError(null);
        return;
      }

      try {
        await farmsApi.deleteFarm(farmId, accessToken!);
        setFarms(prev => prev.filter(farm => farm.id !== farmId));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to delete farm');
      }
    }
  };

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المزارع</h1>
          <p className="text-gray-600">إدارة مزارعك وأراضيك الزراعية</p>
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

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في المزارع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة مزرعة جديدة
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Create Farm Form */}
        {showCreateForm && (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">إضافة مزرعة جديدة</h3>
            <form onSubmit={handleCreateFarm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم المزرعة *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الموقع *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع المحصول *</label>
                <input
                  type="text"
                  required
                  value={formData.cropType}
                  onChange={(e) => setFormData(prev => ({ ...prev, cropType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المساحة *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.areaSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, areaSize: parseFloat(e.target.value) }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select
                    value={formData.areaUnit}
                    onChange={(e) => setFormData(prev => ({ ...prev, areaUnit: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="hectares">هكتار</option>
                    <option value="acres">فدان</option>
                    <option value="square_meters">متر مربع</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع التربة</label>
                <input
                  type="text"
                  value={formData.soilType || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  إنشاء المزرعة
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

        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{farm.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedFarm(farm)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFarm(farm.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{farm.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Crop className="h-4 w-4" />
                  <span>{farm.cropType}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Ruler className="h-4 w-4" />
                  <span>{farm.areaSize} {farm.areaUnit}</span>
                </div>

                {farm.description && (
                  <p className="text-gray-600 text-sm">{farm.description}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    farm.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {farm.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(farm.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFarms.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مزارع</h3>
            <p className="text-gray-600">ابدأ بإنشاء مزرعتك الأولى</p>
          </div>
        )}
      </div>

      {/* Farm Details Modal */}
      {selectedFarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedFarm.name}</h2>
                <button
                  onClick={() => setSelectedFarm(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
                  <p className="text-gray-900">{selectedFarm.location}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع المحصول</label>
                  <p className="text-gray-900">{selectedFarm.cropType}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المساحة</label>
                  <p className="text-gray-900">{selectedFarm.areaSize} {selectedFarm.areaUnit}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع التربة</label>
                  <p className="text-gray-900">{selectedFarm.soilType || 'غير محدد'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedFarm.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedFarm.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإنشاء</label>
                  <p className="text-gray-900">{new Date(selectedFarm.createdAt).toLocaleDateString('ar-EG')}</p>
                </div>
              </div>
              
              {selectedFarm.description && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <p className="text-gray-900">{selectedFarm.description}</p>
                </div>
              )}
              
              <div className="mt-6 flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  تعديل المزرعة
                </button>
                <button
                  onClick={() => setSelectedFarm(null)}
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

export default Farms;
