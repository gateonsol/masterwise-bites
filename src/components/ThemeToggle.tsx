
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className="rounded-full w-8 h-8"
    >
      {theme === "light" ? (
        <Moon size={18} className="transition-transform" />
      ) : (
        <Sun size={18} className="transition-transform" />
      )}
    </Button>
  );
}
