# React TypeScript Authentication System

This is a complete React TypeScript authentication system that integrates with your Express backend API. The system provides secure authentication with JWT tokens, automatic token refresh, and HttpOnly cookies for enhanced security.

## Features

- ✅ **Secure Authentication**: JWT-based authentication with HttpOnly refresh tokens
- ✅ **Automatic Token Refresh**: Seamless token refresh using HttpOnly cookies
- ✅ **Memory-Only Storage**: Access tokens stored in memory only (not localStorage)
- ✅ **Protected Routes**: Route protection with automatic redirects
- ✅ **Form Validation**: Client-side validation with error handling
- ✅ **Loading States**: Proper loading indicators during auth operations
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **TypeScript**: Full TypeScript support with proper type definitions
- ✅ **Responsive UI**: Modern, responsive UI with Tailwind CSS

## File Structure

```
src/
├── api/
│   └── auth.ts                 # API layer for authentication requests
├── context/
│   └── AuthContext.tsx         # React Context for auth state management
├── components/
│   └── Auth/
│       ├── LoginForm.tsx       # Login form component
│       ├── RegisterForm.tsx    # Registration form component
│       ├── AuthPage.tsx        # Combined auth page with form switching
│       ├── ProtectedRoute.tsx  # Route protection component
│       └── UserProfile.tsx     # Example user profile component
├── utils/
│   └── authUtils.ts           # JWT utility functions
└── App.tsx                    # Main app with auth integration
```

## Backend API Requirements

Your Express backend should provide these endpoints:

### POST /api/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Cookies:** Sets HttpOnly refresh token cookie

### POST /api/auth/register
**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "farmer"
  }
}
```

### POST /api/auth/refresh
**Request:** No body (uses HttpOnly cookie)

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/logout
**Request:** Authorization header with access token

**Response:**
```json
{
  "success": true
}
```

**Cookies:** Clears refresh token cookie

## Usage

### 1. Setup Authentication Provider

Wrap your app with the `AuthProvider`:

```tsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

### 2. Use the useAuth Hook

```tsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { 
    user, 
    accessToken, 
    loading, 
    error, 
    login, 
    logout, 
    register 
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123'
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Protect Routes

```tsx
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### 4. Make Authenticated API Calls

```tsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { accessToken } = useAuth();

  const fetchData = async () => {
    const response = await fetch('/api/protected-endpoint', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });
    
    const data = await response.json();
  };
}
```

## API Layer

The `auth.ts` file provides a clean API layer:

```tsx
import { authApi } from './api/auth';

// Login
const response = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
const response = await authApi.register({
  name: 'John Doe',
  email: 'user@example.com',
  password: 'password123'
});

// Logout
await authApi.logout(accessToken);

// Refresh (automatic)
await authApi.refresh();
```

## JWT Utilities

The `authUtils.ts` file provides JWT token utilities:

```tsx
import { 
  decodeJWT, 
  isTokenExpired, 
  isTokenExpiringSoon 
} from './utils/authUtils';

// Check if token is expired
if (isTokenExpired(accessToken)) {
  // Token is expired, need to refresh
}

// Check if token will expire soon
if (isTokenExpiringSoon(accessToken)) {
  // Proactively refresh token
}

// Decode token payload
const payload = decodeJWT(accessToken);
console.log('User ID:', payload.sub);
```

## Security Features

### 1. HttpOnly Cookies
- Refresh tokens are stored in HttpOnly cookies
- Cannot be accessed by JavaScript (XSS protection)
- Automatically sent with requests

### 2. Memory-Only Storage
- Access tokens stored in React state only
- Not persisted to localStorage or sessionStorage
- Cleared on page refresh/logout

### 3. Automatic Token Refresh
- Seamless token refresh using HttpOnly cookies
- No user intervention required
- Handles expired tokens gracefully

### 4. Protected Routes
- Automatic redirects for unauthenticated users
- Loading states during authentication checks
- Preserves intended destination after login

## Error Handling

The system provides comprehensive error handling:

```tsx
const { error, clearError } = useAuth();

// Display errors
if (error) {
  return (
    <div className="error-message">
      {error}
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
}
```

## Customization

### 1. Styling
All components use Tailwind CSS classes and can be easily customized:

```tsx
// Custom button styles
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Custom Login
</button>
```

### 2. Form Validation
Add custom validation rules:

```tsx
const validateForm = () => {
  const errors = {};
  
  // Custom validation logic
  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return Object.keys(errors).length === 0;
};
```

### 3. API Configuration
Modify the API base URL in `auth.ts`:

```tsx
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/auth';
```

## Testing

### 1. Manual Testing
1. Start your backend server
2. Navigate to `/auth`
3. Try logging in with valid credentials
4. Test protected routes
5. Test logout functionality

### 2. Error Scenarios
- Invalid credentials
- Network errors
- Expired tokens
- Server errors

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend allows credentials
   - Check CORS configuration

2. **Cookie Issues**
   - Verify HttpOnly cookie settings
   - Check domain/path configuration

3. **Token Refresh Failures**
   - Check refresh token validity
   - Verify cookie expiration

4. **Protected Route Loops**
   - Ensure proper redirect logic
   - Check authentication state

## Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENVIRONMENT=development
```

## Dependencies

Make sure you have these dependencies installed:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.0",
    "tailwindcss": "^3.3.0"
  }
}
```

## Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include loading states
4. Test all authentication flows
5. Update documentation

## License

This authentication system is provided as-is for educational and development purposes.
