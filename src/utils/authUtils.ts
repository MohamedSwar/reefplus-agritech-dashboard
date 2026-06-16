// Utility functions for JWT token handling

export interface JWTPayload {
  exp: number;
  iat: number;
  sub: string;
  [key: string]: any;
}

/**
 * Decode JWT token without verification (for client-side use only)
 * Note: This doesn't verify the signature, only decodes the payload
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) return true;
  
  // Add 30 seconds buffer to refresh before actual expiration
  const bufferTime = 30 * 1000; // 30 seconds in milliseconds
  return Date.now() >= (payload.exp * 1000) - bufferTime;
};

/**
 * Check if JWT token will expire soon (within 5 minutes)
 */
export const isTokenExpiringSoon = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) return true;
  
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() >= (payload.exp * 1000) - fiveMinutes;
};

/**
 * Get time until token expires in milliseconds
 */
export const getTimeUntilExpiry = (token: string): number => {
  const payload = decodeJWT(token);
  if (!payload) return 0;
  
  return (payload.exp * 1000) - Date.now();
};

/**
 * Create an authenticated fetch function that automatically handles token refresh
 */
export const createAuthenticatedFetch = (
  accessToken: string | null,
  refreshToken: () => Promise<void>
) => {
  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    // Add authorization header if token exists
    const headers = {
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Always include cookies
    });

    // If we get a 401 and have a token, try to refresh
    if (response.status === 401 && accessToken) {
      try {
        await refreshToken();
        // Retry the original request with new token
        // Note: You'll need to get the new token from your auth context
        // This is a simplified version - in practice, you might want to
        // return the new token from refreshToken or handle this differently
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            // You'll need to get the new token here
            // Authorization: `Bearer ${newToken}`,
          },
          credentials: 'include',
        });
      } catch (error) {
        // If refresh fails, the user will be redirected to login
        throw new Error('Authentication failed');
      }
    }

    return response;
  };
};
