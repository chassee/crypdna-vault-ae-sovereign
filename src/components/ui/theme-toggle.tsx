import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  // cycle: light -> dark -> system -> light ...
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="luxury-transition"
      aria-label="Toggle color theme"
      title={`Theme: ${theme} (applied: ${actualTheme})`}
    >
      {actualTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="ml-2 text-xs font-medium">
        {theme === "system" ? "Auto" : theme === "dark" ? "Dark" : "Light"}
      </span>
    </Button>
  );
}
