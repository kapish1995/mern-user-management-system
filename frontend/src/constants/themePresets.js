
export const THEME_PRESETS = [
  {
    id: "ocean",
    label: "Ocean Blue",
    colors: {
      bg: "#F5F7FA",
      surface: "#FFFFFF",
      surfaceAlt: "#EDF1F7",
      text: "#1A2233",
      textMuted: "#5B6472",
      border: "#E1E5EB",
      accent: "#2F6FED",
      accentText: "#FFFFFF",
      danger: "#D64545",
      success: "#2F9E60",
    },
  },
  {
    id: "violet",
    label: "Violet Dusk",
    colors: {
      bg: "#F7F5FA",
      surface: "#FFFFFF",
      surfaceAlt: "#EFEAF6",
      text: "#241B2E",
      textMuted: "#6B5E78",
      border: "#E6E0F0",
      accent: "#7C4DFF",
      accentText: "#FFFFFF",
      danger: "#D64545",
      success: "#2F9E60",
    },
  },
  {
    id: "darcula",
    label: "Darcula",
    colors: {
      bg: "#1E1F22",
      surface: "#2B2D30",
      surfaceAlt: "#323438",
      text: "#D4D4D8",
      textMuted: "#8B8D93",
      border: "#3A3C41",
      accent: "#FF7A59",
      accentText: "#1E1F22",
      danger: "#E5675C",
      success: "#5FBF87",
    },
  },
  {
    id: "forest",
    label: "Forest",
    colors: {
      bg: "#F3F6F2",
      surface: "#FFFFFF",
      surfaceAlt: "#E9F0E7",
      text: "#1D2B1E",
      textMuted: "#57634F",
      border: "#DCE6DB",
      accent: "#2F8F5B",
      accentText: "#FFFFFF",
      danger: "#C74B3F",
      success: "#2F8F5B",
    },
  },
];

export const DEFAULT_PRESET_ID = THEME_PRESETS[0].id;

export function getPresetById(id) {
  return THEME_PRESETS.find((p) => p.id === id) || THEME_PRESETS[0];
}
