// api/auth.ts
const API_BASE_URL = "http://localhost:3000/api/auth";

const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "buyer" | "admin";
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  user: User;
}

const handleApiError = async (response: Response, defaultMessage: string) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || defaultMessage);
    } catch {
      throw new Error(defaultMessage);
    }
  }
  return response;
};

const mockUser: User = {
  id: "demo-1",
  name: "أحمد محمد",
  email: "demo@reefplus.com",
  role: "farmer",
};

const mockToken = "demo-token-" + Date.now();

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (await isBackendAvailable()) {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // refresh cookie set here
        body: JSON.stringify(credentials),
      });

      await handleApiError(res, "Invalid login credentials");
      const data = await res.json(); // should contain accessToken + user
      return { success: true, accessToken: data.accessToken, user: data.user };
    } else {
      return { success: true, accessToken: mockToken, user: mockUser };
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    if (await isBackendAvailable()) {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      await handleApiError(res, "Registration failed");
      const data = await res.json();
      return { success: true, accessToken: data.accessToken, user: data.user };
    } else {
      return {
        success: true,
        accessToken: mockToken,
        user: { id: "demo-" + Date.now(), ...credentials, role: "farmer" },
      };
    }
  },

  async refresh(): Promise<AuthResponse> {
    if (await isBackendAvailable()) {
      const res = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        credentials: "include", // cookie used here
      });

      await handleApiError(res, "Refresh failed");
      const data = await res.json();
      return { success: true, accessToken: data.accessToken, user: data.user };
    } else {
      return { success: true, accessToken: mockToken, user: mockUser };
    }
  },

  async logout(): Promise<void> {
    if (await isBackendAvailable()) {
      const res = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // clears cookie
      });
      if (!res.ok) console.warn("Logout failed");
    }
  },

  async getProfile(accessToken: string): Promise<{ user: User }> {
    if (await isBackendAvailable()) {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });

      await handleApiError(res, "Failed to fetch profile");
      const data = await res.json();
      return { user: data.data };
    } else {
      return { user: mockUser };
    }
  },
};
