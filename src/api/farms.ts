import { Farm, CreateFarmDTO, UpdateFarmDTO, FarmStats, PaginatedResponse, ApiResponse } from '../types';

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

export const farmsApi = {
  // Create a new farm
  async createFarm(farmData: CreateFarmDTO, accessToken: string): Promise<Farm> {
    try {
      const res = await fetch(`${API_BASE_URL}/farms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(farmData),
      });

      await handleApiError(res, "Failed to create farm");
      const response: ApiResponse<Farm> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Create farm API error:", error);
      throw error;
    }
  },

  // List farms for the current user
  async listFarms(
    accessToken: string,
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      isActive?: boolean;
    }
  ): Promise<PaginatedResponse<Farm>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

      const url = `${API_BASE_URL}/farms${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch farms");
      const response: PaginatedResponse<Farm> = await res.json();
      return response;
    } catch (error) {
      console.error("List farms API error:", error);
      throw error;
    }
  },

  // Get a specific farm by ID
  async getFarm(farmId: string, accessToken: string): Promise<Farm> {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${farmId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Farm not found");
      const response: ApiResponse<Farm> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get farm API error:", error);
      throw error;
    }
  },

  // Update a farm
  async updateFarm(farmId: string, farmData: UpdateFarmDTO, accessToken: string): Promise<Farm> {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${farmId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(farmData),
      });

      await handleApiError(res, "Failed to update farm");
      const response: ApiResponse<Farm> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Update farm API error:", error);
      throw error;
    }
  },

  // Delete a farm (soft delete)
  async deleteFarm(farmId: string, accessToken: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${farmId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to delete farm");
    } catch (error) {
      console.error("Delete farm API error:", error);
      throw error;
    }
  },

  // Get farm statistics
  async getFarmStats(farmId: string, accessToken: string): Promise<FarmStats> {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${farmId}/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleApiError(res, "Failed to fetch farm stats");
      const response: ApiResponse<FarmStats> = await res.json();
      return response.data!;
    } catch (error) {
      console.error("Get farm stats API error:", error);
      throw error;
    }
  },
};
