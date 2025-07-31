// Utility functions for authentication

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        // Decode JWT token to check expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp < currentTime) {
            removeToken(); // Remove expired token
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking token:', error);
        removeToken(); // Remove invalid token
        return false;
    }
};

export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.id,
            role: payload.role,
            fullName: payload.fullName,
            email: payload.email,
            phone: payload.phone
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const logout = () => {
    removeToken();
    window.location.href = '/login';
};