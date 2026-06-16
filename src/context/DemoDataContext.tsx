import React, { createContext, useContext, ReactNode } from 'react';
import { Farm, Sensor, Device, SensorReading } from '../types';

interface DemoDataContextType {
  demoFarms: Farm[];
  demoSensors: Sensor[];
  demoDevices: Device[];
  demoReadings: SensorReading[];
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export const useDemoData = () => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
};

interface DemoDataProviderProps {
  children: ReactNode;
}

export const DemoDataProvider: React.FC<DemoDataProviderProps> = ({ children }) => {
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

  const demoReadings: SensorReading[] = [
    {
      id: 'demo-reading-1',
      sensorId: 'demo-sensor-1',
      value: 45.6,
      unit: '%',
      recordedAt: '2024-01-20T12:30:00.000Z',
      createdAt: '2024-01-20T12:30:05.000Z',
    },
    {
      id: 'demo-reading-2',
      sensorId: 'demo-sensor-1',
      value: 44.2,
      unit: '%',
      recordedAt: '2024-01-20T11:30:00.000Z',
      createdAt: '2024-01-20T11:30:05.000Z',
    },
    {
      id: 'demo-reading-3',
      sensorId: 'demo-sensor-2',
      value: 28.3,
      unit: '°C',
      recordedAt: '2024-01-20T12:30:00.000Z',
      createdAt: '2024-01-20T12:30:05.000Z',
    },
    {
      id: 'demo-reading-4',
      sensorId: 'demo-sensor-3',
      value: 65.2,
      unit: '%',
      recordedAt: '2024-01-20T12:30:00.000Z',
      createdAt: '2024-01-20T12:30:05.000Z',
    },
    {
      id: 'demo-reading-5',
      sensorId: 'demo-sensor-4',
      value: 12.8,
      unit: 'km/h',
      recordedAt: '2024-01-20T12:30:00.000Z',
      createdAt: '2024-01-20T12:30:05.000Z',
    },
  ];

  return (
    <DemoDataContext.Provider
      value={{
        demoFarms,
        demoSensors,
        demoDevices,
        demoReadings,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};
