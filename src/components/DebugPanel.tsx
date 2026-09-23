import { useMotion } from "../motion/useMotion";

export function DebugPanel() {
  const { debugEnabled, reducedMotion, section, settings, setSettings, step } = useMotion();

  if (!debugEnabled) {
    return null;
  }

  return (
    <aside className="debug-panel" aria-label="Painel de teste">
      <strong>Debug</strong>
      <label>
        <input
          type="checkbox"
          checked={settings.animations}
          onChange={(event) =>
            setSettings((value) => ({ ...value, animations: event.target.checked }))
          }
        />
        Animacoes
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.parallax}
          onChange={(event) =>
            setSettings((value) => ({ ...value, parallax: event.target.checked }))
          }
        />
        Parallax
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.loops}
          onChange={(event) =>
            setSettings((value) => ({ ...value, loops: event.target.checked }))
          }
        />
        Loops
      </label>
      <p>Secao: {section}</p>
      <p>Etapa: {step}</p>
      <p>Movimento reduzido: {reducedMotion ? "sim" : "nao"}</p>
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}>
        Voltar ao inicio
      </button>
    </aside>
  );
}
