import { Device, CreateDeviceDTO, UpdateDeviceDTO, ApiResponse } from '../types';

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

export const devicesApi = {
  // Create a new device
  async createDevice(deviceData: CreateDeviceDTO, accessToken: string): Promise<Device> {
    try {
      const res = await fetch(`${API_BASE_URL}/devices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(deviceData),
      });

      await handleApiError(res, "Failed to create device");
      const response: ApiResponse<Device> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Create device API error:", error);
      throw error;
    }
  },

  // Get a specific device by ID
  async getDevice(deviceId: string, accessToken: string): Promise<Device> {
    try {
      const res = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Device not found");
      const response: ApiResponse<Device> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get device API error:", error);
      throw error;
    }
  },

  // Update a device
  async updateDevice(deviceId: string, deviceData: UpdateDeviceDTO, accessToken: string): Promise<Device> {
    try {
      const res = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(deviceData),
      });

      await handleApiError(res, "Failed to update device");
      const response: ApiResponse<Device> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Update device API error:", error);
      throw error;
    }
  },

  // Delete a device
  async deleteDevice(deviceId: string, accessToken: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to delete device");
    } catch (error) {
      console.error("Delete device API error:", error);
      throw error;
    }
  },

  // List all devices with optional filters
  async listDevices(
    accessToken: string,
    params?: {
      type?: string;
      status?: string;
      farmId?: string;
    }
  ): Promise<Device[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.type) queryParams.append('type', params.type);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.farmId) queryParams.append('farmId', params.farmId);

      const url = `${API_BASE_URL}/devices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch devices");
      const response: ApiResponse<Device[]> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("List devices API error:", error);
      throw error;
    }
  },
};
