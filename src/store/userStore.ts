import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateProfile: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);