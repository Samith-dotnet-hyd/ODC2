import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ProfileSettings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Settings</h2>

      <button className="save-btn" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </div>
  );
}
