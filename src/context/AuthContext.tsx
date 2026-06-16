// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, LoginCredentials, RegisterCredentials, User } from "../api/auth";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  initializing: boolean;
  actionLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<string | null>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

interface AuthProviderProps {
  children: ReactNode;
}

function parseError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unexpected error";
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bootstrap session
  useEffect(() => {
    const init = async () => {
      try {
        const res = await authApi.refresh();
        console.log(res)
        setAccessToken(res.accessToken);
        const user = await authApi.getProfile(res.accessToken)
        setUser(user.user);
        console.log('context user ', user)
      } catch (err) {
        setUser(null);
        setAccessToken(null);
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await authApi.login(credentials);
      setAccessToken(res.accessToken);
      const user = await authApi.getProfile(res.accessToken)
      setUser(user.user);
    } catch (err) {
      const msg = parseError(err);
      setError(msg);
      throw new Error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await authApi.register(credentials);
      setAccessToken(res.accessToken);
      setUser(res.user);
      console.log(accessToken)
      console.log(user)
      await setTimeout('3000')
    } catch (err) {
      const msg = parseError(err);
      setError(msg);
      throw new Error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const logout = async () => {
    setActionLoading(true);
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setAccessToken(null);
      setActionLoading(false);
    }
  };

  const refresh = async (): Promise<string | null> => {
    try {
      const res = await authApi.refresh();
      setAccessToken(res.accessToken);
      setUser(res.user);
      return res.accessToken;
    } catch {
      setUser(null);
      setAccessToken(null);
      return null;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        initializing,
        actionLoading,
        error,
        login,
        register,
        logout,
        refresh,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
