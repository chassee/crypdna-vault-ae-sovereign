import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'gradient';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const LuxuryThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to 'dark' for luxury mode
    const savedTheme = localStorage.getItem('luxury-theme') as Theme;
    
    const initialTheme = savedTheme || 'dark'; // Default to dark for mystery-first experience
    setTheme(initialTheme);
    
    // Apply theme to document with gradient and soft-white support
    document.documentElement.classList.remove('light', 'dark', 'soft-white', 'gradient');
    if (initialTheme === 'light') {
      document.documentElement.classList.add('soft-white');
    } else if (initialTheme === 'gradient') {
      document.documentElement.classList.add('gradient');
    } else {
      document.documentElement.classList.add(initialTheme);
    }
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('luxury-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark', 'soft-white', 'gradient');
    if (newTheme === 'light') {
      document.documentElement.classList.add('soft-white');
    } else if (newTheme === 'gradient') {
      document.documentElement.classList.add('gradient');
    } else {
      document.documentElement.classList.add(newTheme);
    }
  };

  const toggleTheme = () => {
    if (theme === 'dark') {
      updateTheme('gradient');
    } else if (theme === 'gradient') {
      updateTheme('dark');
    } else {
      updateTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};