import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'vibrant';

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
    
    const initialTheme = savedTheme || 'dark'; // Default to dark for billionaire experience
    setTheme(initialTheme);
    
    // Apply theme to document
    document.documentElement.classList.remove('dark', 'vibrant');
    document.documentElement.classList.add(initialTheme);
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('luxury-theme', newTheme);
    document.documentElement.classList.remove('dark', 'vibrant');
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    updateTheme(theme === 'dark' ? 'vibrant' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};