import api from './api';

const APP_CODE = 'LIME-MEDICAL-2024';

export const authService = {
  async login(): Promise<string> {
    const response = await api.post<{ token: string }>('/auth/login', { appCode: APP_CODE });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  removeToken(): void {
    localStorage.removeItem('token');
  }
}; 