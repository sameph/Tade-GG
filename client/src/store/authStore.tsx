import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";

interface User {
  id: string;
  _id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  message: string | null;

  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  verifyEmail: (code: string) => Promise<any>;
  resendVerificationToken: (email: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  changePassword: (name: string, password: string, email: string) => Promise<void>;
}

const API_URL =
  `${import.meta.env.VITE_API_URL ?? "http://localhost:5000"}/api/auth`;

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/signup`, { email, password, name });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Signup failed",
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return res.data.user;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Login failed",
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: "Logout failed" });
      throw error;
    }
  },

  googleLogin: async () => {
    set({ isLoading: true, error: null });
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post(`${API_URL}/google`, {
        email: result.user.email,
        idToken,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Google login failed",
      });
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Verification failed",
      });
      throw error;
    }
  },

  resendVerificationToken: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/resend-verification`, { email });
      set({ message: res.data.message, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Resend failed",
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/check-auth`);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: res.data.message, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Forgot password failed",
      });
      throw error;
    }
  },

  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: res.data.message, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Reset failed",
      });
      throw error;
    }
  },

  changePassword: async (name: string, password: string, email: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/change-password`, {
        name,
        password,
        email,
      });
      set({ message: res.data.message, isLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || "Change password failed",
      });
      throw error;
    }
  },
}));
