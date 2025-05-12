import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";

interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<any>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
}

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api/auth" 
  : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || "Error signing up", 
        isLoading: false 
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
				error: err.response?.data?.message || err.message || "Unexpected error logging in", 
				isLoading: false 
			});			
      throw error;
    }
  },

  googleLogin: async () => {
    set({ isLoading: true, error: null });
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const idToken = await resultsFromGoogle.user.getIdToken();

      const response = await axios.post(`${API_URL}/google`, { 
        email: resultsFromGoogle.user.email,
        idToken 
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || "Error with Google authentication", 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || "Error verifying email", 
        isLoading: false 
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },
}));