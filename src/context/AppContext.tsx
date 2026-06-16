import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Farm, Alert, Recommendation, Product } from '../types';

interface AppContextType {
  farms: Farm[];
  setFarms: (farms: Farm[]) => void;
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>([
    {
      id: '1',
      name: 'مزرعة النيل الأخضر',
      location: 'الجيزة',
      area: 50,
      cropType: 'قمح',
      ownerId: '1',
      sensors: []
    }
  ]);
  
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'irrigation',
      severity: 'high',
      message: 'مستوى رطوبة التربة منخفض في القطعة الشمالية',
      farmId: '1',
      timestamp: new Date(),
      resolved: false
    },
    {
      id: '2',
      type: 'pest',
      severity: 'medium',
      message: 'تم اكتشاف نشاط حشري في القطعة الجنوبية',
      farmId: '1',
      timestamp: new Date(),
      resolved: false
    }
  ]);
  
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'irrigation',
      title: 'ري فوري مطلوب',
      description: 'يُنصح بري القطعة الشمالية بكمية 200 لتر/متر مربع',
      priority: 'high',
      farmId: '1',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'fertilization',
      title: 'تسميد بالنيتروجين',
      description: 'أضف 50 كيلو نيتروجين للفدان لتحسين النمو',
      priority: 'medium',
      farmId: '1',
      timestamp: new Date()
    }
  ]);
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'قمح بلدي عالي الجودة',
      description: 'قمح محلي من مزارع الجيزة، خالي من المبيدات',
      price: 8500,
      unit: 'طن',
      category: 'حبوب',
      farmerId: '1',
      images: ['https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'],
      quantity: 10,
      location: 'الجيزة',
      harvestDate: new Date()
    },
    {
      id: '2',
      name: 'طماطم طازجة',
      description: 'طماطم حمراء طازجة، مزروعة بالطرق الحديثة',
      price: 12,
      unit: 'كيلو',
      category: 'خضروات',
      farmerId: '1',
      images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'],
      quantity: 500,
      location: 'الجيزة',
      harvestDate: new Date()
    }
  ]);
  
  const [notifications, setNotifications] = useState<any[]>([]);

  return (
    <AppContext.Provider
      value={{
        farms,
        setFarms,
        alerts,
        setAlerts,
        recommendations,
        setRecommendations,
        products,
        setProducts,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};