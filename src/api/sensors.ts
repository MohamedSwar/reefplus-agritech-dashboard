import { Sensor, CreateSensorDTO, UpdateSensorDTO, SensorReading, CreateReadingDTO, ReadingStats, PaginatedResponse, ApiResponse } from '../types';

const API_BASE_URL = "http://localhost:3000/api";

// Helper function to handle API errors
const handleApiError = async (response: Response, defaultMessage: string) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || defaultMessage);
    } catch {
      throw new Error(defaultMessage);
    }
  }
  return response;
};

export const sensorsApi = {
  // Create a new sensor
  async createSensor(sensorData: CreateSensorDTO, accessToken: string): Promise<Sensor> {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(sensorData),
      });

      await handleApiError(res, "Failed to create sensor");
      const response: ApiResponse<Sensor> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Create sensor API error:", error);
      throw error;
    }
  },

  // List sensors with filters
  async listSensors(
    accessToken: string,
    params?: {
      farmId?: string;
      deviceId?: string;
      type?: string;
      status?: string;
      search?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<PaginatedResponse<Sensor>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.farmId) queryParams.append('farmId', params.farmId);
      if (params?.deviceId) queryParams.append('deviceId', params.deviceId);
      if (params?.type) queryParams.append('type', params.type);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const url = `${API_BASE_URL}/sensors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch sensors");
      const response: ApiResponse<PaginatedResponse<Sensor>> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("List sensors API error:", error);
      throw error;
    }
  },

  // Get a specific sensor by ID
  async getSensor(sensorId: string, accessToken: string): Promise<Sensor> {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/${sensorId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Sensor not found");
      const response: ApiResponse<Sensor> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get sensor API error:", error);
      throw error;
    }
  },

  // Update a sensor
  async updateSensor(sensorId: string, sensorData: UpdateSensorDTO, accessToken: string): Promise<Sensor> {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/${sensorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(sensorData),
      });

      await handleApiError(res, "Failed to update sensor");
      const response: ApiResponse<Sensor> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Update sensor API error:", error);
      throw error;
    }
  },

  // Delete a sensor
  async deleteSensor(sensorId: string, accessToken: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/${sensorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to delete sensor");
    } catch (error) {
      console.error("Delete sensor API error:", error);
      throw error;
    }
  },

  // Get sensors by farm ID
  async getFarmSensors(farmId: string, accessToken: string): Promise<Sensor[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${farmId}/sensors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch farm sensors");
      const response: ApiResponse<Sensor[]> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get farm sensors API error:", error);
      throw error;
    }
  },

  // Get sensors by device ID
  async getDeviceSensors(deviceId: string, accessToken: string): Promise<Sensor[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/devices/${deviceId}/sensors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch device sensors");
      const response: ApiResponse<Sensor[]> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get device sensors API error:", error);
      throw error;
    }
  },

  // Create a sensor reading
  async createReading(sensorId: string, readingData: CreateReadingDTO, accessToken: string): Promise<SensorReading> {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/${sensorId}/readings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(readingData),
      });

      await handleApiError(res, "Failed to create reading");
      const response: ApiResponse<SensorReading> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Create reading API error:", error);
      throw error;
    }
  },

  // Get sensor readings
  async getReadings(
    sensorId: string,
    accessToken: string,
    params?: {
      startDate?: string;
      endDate?: string;
      limit?: number;
    }
  ): Promise<SensorReading[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const url = `${API_BASE_URL}/sensors/${sensorId}/readings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch readings");
      const response: ApiResponse<SensorReading[]> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get readings API error:", error);
      throw error;
    }
  },

  // Get latest reading for a sensor
  async getLatestReading(sensorId: string, accessToken: string): Promise<SensorReading> {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/${sensorId}/readings/latest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "No readings found for this sensor");
      const response: ApiResponse<SensorReading> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get latest reading API error:", error);
      throw error;
    }
  },

  // Get reading statistics
  async getReadingStats(
    sensorId: string,
    accessToken: string,
    params?: {
      startDate?: string;
      endDate?: string;
    }
  ): Promise<ReadingStats> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const url = `${API_BASE_URL}/sensors/${sensorId}/readings/stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch reading stats");
      const response: ApiResponse<ReadingStats> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get reading stats API error:", error);
      throw error;
    }
  },
};
