export interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "buyer" | "admin";
  location?: string;
  phone?: string;
}

// Farm Types
export interface CreateFarmDTO {
  name: string;
  description?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  areaSize: number;
  areaUnit: string;
  cropType: string;
  soilType?: string;
  isActive: boolean;
}

export interface UpdateFarmDTO {
  name?: string;
  description?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  areaSize?: number;
  areaUnit?: string;
  cropType?: string;
  soilType?: string;
  isActive?: boolean;
}

export interface Farm {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  areaSize: number;
  areaUnit: string;
  cropType: string;
  soilType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FarmStats {
  totalSensors: number;
  totalDevices: number;
  activeSensors: number;
  inactiveSensors: number;
}

// Device Types
export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'MAINTENANCE';
  farmId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeviceDTO {
  name: string;
  type: string;
  status: string;
  farmId?: string;
}

export interface UpdateDeviceDTO {
  name?: string;
  type?: string;
  status?: string;
  farmId?: string;
}

// Sensor Types
export interface Sensor {
  id: string;
  farmId: string;
  deviceId?: string;
  name: string;
  type: 'SOIL_MOISTURE' | 'SOIL_PH' | 'TEMPERATURE' | 'HUMIDITY' | 'WATER_LEVEL' | 'LIGHT_INTENSITY' | 'RAINFALL' | 'WIND_SPEED' | 'NUTRIENT_LEVEL' | 'OTHER';
  unit: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'MAINTENANCE' | 'CALIBRATING';
  minThreshold?: number;
  maxThreshold?: number;
  lastReading?: number;
  lastReadingAt?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CreateSensorDTO {
  name: string;
  type: string;
  unit: string;
  farmId: string;
  deviceId?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
  minThreshold?: number;
  maxThreshold?: number;
}

export interface UpdateSensorDTO {
  name?: string;
  type?: string;
  unit?: string;
  farmId?: string;
  deviceId?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
  minThreshold?: number;
  maxThreshold?: number;
}

// Sensor Reading Types
export interface SensorReading {
  id: string;
  sensorId: string;
  value: number;
  unit: string;
  recordedAt: string;
  createdAt: string;
}

export interface CreateReadingDTO {
  value: number;
  unit: string;
  recordedAt?: string;
}

export interface ReadingStats {
  average: number;
  min: number;
  max: number;
  count: number;
  latest: number;
  timeRange: {
    start: string;
    end: string;
  };
}

// Legacy types (keeping for backward compatibility)
export interface SensorData {
  id: string;
  type: 'soil_moisture' | 'water_quality' | 'nutrients' | 'temperature' | 'humidity';
  value: number;
  unit: string;
  timestamp: Date;
  farmId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  farmerId: string;
  images: string[];
  quantity: number;
  location: string;
  harvestDate: Date;
}

export interface Alert {
  id: string;
  type: 'irrigation' | 'fertilization' | 'pest' | 'weather';
  severity: 'low' | 'medium' | 'high';
  message: string;
  farmId: string;
  timestamp: Date;
  resolved: boolean;
}

export interface Recommendation {
  id: string;
  type: 'irrigation' | 'fertilization' | 'pesticide';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  farmId: string;
  timestamp: Date;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}