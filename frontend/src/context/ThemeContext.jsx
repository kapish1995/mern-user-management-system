import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { THEME_PRESETS, DEFAULT_PRESET_ID, getPresetById } from "../constants/themePresets";
import { loadThemePreferences, saveThemePreferences, clearThemePreferences } from "../hooks/useThemePersistence";


const CUSTOM_FONT_FAMILY = "AppUploadedFont";

const ThemeContext = createContext(null);

function buildFontFace(dataUrl) {
  return new FontFace(CUSTOM_FONT_FAMILY, `url(${dataUrl})`);
}

export function ThemeProvider({ children }) {
  const stored = loadThemePreferences();

  const [presetId, setPresetIdState] = useState(stored?.presetId || DEFAULT_PRESET_ID);
  const [buttonColor, setButtonColorState] = useState(stored?.buttonColor || null);
  const [font, setFontState] = useState(
    stored?.fontDataUrl ? { name: stored.fontName, dataUrl: stored.fontDataUrl } : null
  );
  const [fontStatus, setFontStatus] = useState(font ? "loading" : "idle"); 
  const [fontError, setFontError] = useState(null);


  useEffect(() => {
    if (!font?.dataUrl) return;

    let cancelled = false;
    setFontStatus("loading");

    buildFontFace(font.dataUrl)
      .load()
      .then((loadedFace) => {
        if (cancelled) return;
        document.fonts.add(loadedFace);
        setFontStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load custom font:", err);
        setFontError("Could not load that font file. Falling back to the default typeface.");
        setFontStatus("error");
      });

    return () => {
      cancelled = true;
    };
  
  }, [font?.dataUrl]);

  const activePreset = useMemo(() => getPresetById(presetId), [presetId]);

  const activeTheme = useMemo(() => {
    const colors = { ...activePreset.colors };
    if (buttonColor) {
      colors.accent = buttonColor;
    }
    return {
      presetId: activePreset.id,
      presetLabel: activePreset.label,
      colors,
      fontFamily:
        fontStatus === "ready"
          ? `"${CUSTOM_FONT_FAMILY}", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
          : `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    };
  }, [activePreset, buttonColor, fontStatus]);

  
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(activeTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${camelToKebab(key)}`, value);
    });
    root.style.setProperty("--font-family-app", activeTheme.fontFamily);
    root.dataset.theme = activeTheme.presetId;
  }, [activeTheme]);

  
  useEffect(() => {
    saveThemePreferences({
      presetId,
      buttonColor,
      fontName: font?.name || null,
      fontDataUrl: font?.dataUrl || null,
    });
  }, [presetId, buttonColor, font]);

  const setPresetId = useCallback((id) => setPresetIdState(id), []);
  const setButtonColor = useCallback((hex) => setButtonColorState(hex), []);
  const resetButtonColor = useCallback(() => setButtonColorState(null), []);

  const uploadFont = useCallback((file) => {
    setFontError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setFontState({ name: file.name, dataUrl: reader.result });
    };
    reader.onerror = () => {
      setFontError("Could not read that file.");
    };
    reader.readAsDataURL(file);
  }, []);

  const resetFont = useCallback(() => {
    setFontState(null);
    setFontStatus("idle");
    setFontError(null);
  }, []);

  const resetAll = useCallback(() => {
    setPresetIdState(DEFAULT_PRESET_ID);
    setButtonColorState(null);
    setFontState(null);
    setFontStatus("idle");
    setFontError(null);
    clearThemePreferences();
  }, []);

  const value = {
    presets: THEME_PRESETS,
    presetId,
    buttonColor,
    font,
    fontStatus,
    fontError,
    activeTheme,
    setPresetId,
    setButtonColor,
    resetButtonColor,
    uploadFont,
    resetFont,
    resetAll,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
