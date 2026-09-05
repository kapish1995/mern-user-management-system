import { useTheme } from "../context/ThemeContext.jsx";

const ACCEPTED_FONT_TYPES = ".ttf,.otf,.woff,.woff2";

export default function ThemeDrawer({ onClose }) {
  const {
    presets,
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
  } = useTheme();

  function handleFontChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeMb = 3;
    if (file.size > maxSizeMb * 1024 * 1024) {
      alert(`That font file is a bit large - please pick one under ${maxSizeMb}MB.`);
      e.target.value = "";
      return;
    }

    uploadFont(file);
    e.target.value = "";
  }

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer" role="dialog" aria-label="Theme settings">
        <div className="drawer-header">
          <h2>Theme settings</h2>
          <button className="btn-ghost btn" onClick={onClose} type="button" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <section className="drawer-section">
            <h3>Preset</h3>
            <div className="preset-grid">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`preset-option${preset.id === presetId ? " selected" : ""}`}
                  onClick={() => setPresetId(preset.id)}
                >
                  <span className="preset-swatches">
                    <span className="preset-swatch" style={{ background: preset.colors.bg }} />
                    <span className="preset-swatch" style={{ background: preset.colors.surface }} />
                    <span className="preset-swatch" style={{ background: preset.colors.accent }} />
                  </span>
                  <span className="preset-option-label">{preset.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="drawer-section">
            <h3>Button color</h3>
            <div className="color-row">
              <input
                type="color"
                value={buttonColor || activeTheme.colors.accent}
                onChange={(e) => setButtonColor(e.target.value)}
                aria-label="Pick a button color"
              />
              <input
                type="text"
                value={buttonColor || activeTheme.colors.accent}
                onChange={(e) => setButtonColor(e.target.value)}
              />
            </div>
            {buttonColor && (
              <button className="link-btn" style={{ marginTop: 8 }} onClick={resetButtonColor} type="button">
                Reset to preset default
              </button>
            )}
          </section>

          <section className="drawer-section">
            <h3>Custom font</h3>
            <div className="dropzone">
              <input type="file" accept={ACCEPTED_FONT_TYPES} onChange={handleFontChange} />
              Drop a .ttf, .otf or .woff file, or click to browse
            </div>

            {font && (
              <div className="font-status">
                <span className="cell-muted">
                  {fontStatus === "loading" && `Loading ${font.name}…`}
                  {fontStatus === "ready" && `Using ${font.name}`}
                  {fontStatus === "error" && (fontError || "Could not load that font")}
                </span>
                <button className="link-btn" onClick={resetFont} type="button">
                  Remove
                </button>
              </div>
            )}

            <div className="font-preview">The quick brown fox jumps over the lazy dog — Aa Bb 123</div>
          </section>

          <button className="link-btn" onClick={resetAll} type="button">
            Reset everything to defaults
          </button>
        </div>

        <div className="drawer-footer">
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={onClose} type="button">
            Done
          </button>
        </div>
      </div>
    </>
  );
}
