const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// Create headers with authorization
const createHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// API service object
const apiService = {
    // Get current user (for dashboard greeting)
    getCurrentUser: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/me`, {
                method: 'GET',
                headers: createHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            return await response.json();
        } catch (error) {
            console.error('getCurrentUser error:', error);
            throw error;
        }
    },

    // Get full user profile
    getUserProfile: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'GET',
                headers: createHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            return await response.json();
        } catch (error) {
            console.error('getUserProfile error:', error);
            throw error;
        }
    },

    // Update user profile
    updateUserProfile: async (profileData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: createHeaders(),
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            return await response.json();
        } catch (error) {
            console.error('updateUserProfile error:', error);
            throw error;
        }
    }
};

export default apiService;