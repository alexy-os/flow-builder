import { Moon, Sun } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// Определяем тип состояния
interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

// Создаем store с персистентностью
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage', // имя в localStorage
    }
  )
);

export function ThemeToggle() {
  const { isDark, toggle } = useThemeStore();

  // Эффект для синхронизации с DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed bottom-4 left-4 z-50"
      onClick={toggle}
    >
      {isDark ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 