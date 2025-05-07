import {ThemeMode} from '@/types';
import {create} from 'zustand';

interface ThemeState {
  theme: ThemeMode;
  isSystem: boolean;
  setTheme: (theme: ThemeMode) => void;
  setSystemTheme: (flag: boolean) => void;
}

const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  isSystem: false,
  setTheme: (theme: 'light' | 'dark') => {
    set({theme});
  },
  setSystemTheme: (flag: boolean) => {
    set(state => ({...state, isSystem: flag}));
  },
}));

export default useThemeStore;
