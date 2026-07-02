"use client";

import { useEffect, useRef, useState } from "react";

interface A11ySettings {
  fontSize: 0 | 1 | 2;
  highContrast: boolean;
  dyslexiaFont: boolean;
  increasedSpacing: boolean;
  grayscale: boolean;
  tdahMode: boolean;
  elderlyMode: boolean;
  lowVisionMode: boolean;
  magnifierMode: boolean;
}

const DEFAULT: A11ySettings = {
  fontSize: 0,
  highContrast: false,
  dyslexiaFont: false,
  increasedSpacing: false,
  grayscale: false,
  tdahMode: false,
  elderlyMode: false,
  lowVisionMode: false,
  magnifierMode: false,
};

const STORAGE_KEY = "a11y-settings";
const FONT_SCALES = ["100%", "115%", "130%"];
const FONT_LABELS = ["Normal", "Grande", "Extra grande"];

function load(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

function applySettings(s: A11ySettings) {
  const html = document.documentElement;
  html.style.fontSize = FONT_SCALES[s.fontSize];
  html.classList.toggle("a11y-high-contrast", s.highContrast);
  html.classList.toggle("a11y-dyslexia-font", s.dyslexiaFont);
  html.classList.toggle("a11y-increased-spacing", s.increasedSpacing);
  html.classList.toggle("a11y-grayscale", s.grayscale);
  html.classList.toggle("a11y-elderly", s.elderlyMode);
  html.classList.toggle("a11y-low-vision", s.lowVisionMode);
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-gray-800">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 ${
          checked ? "bg-blue-700" : "bg-gray-300"
        }`}
      >
        <span className="sr-only">{checked ? "Ativado" : "Desativado"}</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

const TEXT_TAGS = new Set(["P","H1","H2","H3","H4","H5","H6","LI","SPAN","A","TD","LABEL","BUTTON","STRONG","EM","TIME","FIGCAPTION"]);

function TextMagnifierOverlay() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (boxRef.current) {
        const x = Math.min(e.clientX + 20, window.innerWidth - 540);
        const y = Math.max(e.clientY - 140, 8);
        boxRef.current.style.left = `${x}px`;
        boxRef.current.style.top = `${y}px`;
      }

      // caretRangeFromPoint bypasses CSS overlays (stretched links etc.)
      const doc = document as Document & {
        caretRangeFromPoint?: (x: number, y: number) => Range | null;
        caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
      };
      const range = doc.caretRangeFromPoint?.(e.clientX, e.clientY);
      const container = range?.startContainer
        ?? doc.caretPositionFromPoint?.(e.clientX, e.clientY)?.offsetNode
        ?? null;

      if (!container) { setText(""); return; }

      let node: Node | null = container;
      while (node && node.nodeType !== Node.ELEMENT_NODE) node = node.parentNode;

      let target: Element | null = node as Element | null;
      while (target) {
        if (TEXT_TAGS.has(target.tagName)) {
          const t = (target.textContent ?? "").trim();
          if (t.length >= 4) { setText(t); return; }
        }
        target = target.parentElement;
      }
      setText("");
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        zIndex: 49,
        pointerEvents: "none",
        display: text ? "block" : "none",
        width: "auto",
        maxWidth: "min(520px, calc(100vw - 40px))",
        padding: "12px 16px",
        background: "#fff",
        border: "2px solid #1d4ed8",
        borderRadius: "10px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        fontSize: "1.4rem",
        lineHeight: 1.45,
        color: "#111827",
        top: "50px",
        left: "50px",
      }}
    >
      {text}
    </div>
  );
}

function LowVisionOverlay() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        zIndex: 49,
        pointerEvents: "none",
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        border: "3px solid #1d4ed8",
        outline: "2px solid rgba(255,255,255,0.9)",
        outlineOffset: "2px",
        transform: "translate(-50%, -50%)",
        top: "50vh",
        left: "50vw",
      }}
    >
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#1d4ed8",
        outline: "2px solid rgba(255,255,255,0.9)",
        outlineOffset: "1px",
      }} />
    </div>
  );
}

function ElderlyOverlay() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (barRef.current) {
        barRef.current.style.top = `${e.clientY}px`;
        barRef.current.style.left = `${e.clientX}px`;
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 49, pointerEvents: "none" }}
    >
      <div
        ref={barRef}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(36rem, calc(50% - 1.5rem))",
          top: "50vh",
          height: "16px",
          background: "#1d4ed8",
          border: "5px solid rgba(0, 0, 0, 0.75)",
          borderRadius: "9999px",
        }}
      />
    </div>
  );
}

function TDAHOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      ref.current?.style.setProperty("--y", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 49,
        pointerEvents: "none",
        background:
          "linear-gradient(to bottom," +
          "rgba(0,0,0,0.6) 0px," +
          "rgba(0,0,0,0.6) calc(var(--y, 50vh) - 90px)," +
          "transparent calc(var(--y, 50vh) - 90px)," +
          "transparent calc(var(--y, 50vh) + 90px)," +
          "rgba(0,0,0,0.6) calc(var(--y, 50vh) + 90px)," +
          "rgba(0,0,0,0.6) 100%)",
      }}
    />
  );
}

export function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = load();
    setSettings(saved);
    applySettings(saved);
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Close on Escape or click outside
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  // Move focus into panel when opened
  useEffect(() => {
    if (open) {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      firstFocusable?.focus();
    }
  }, [open]);

  function update<K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setSettings(DEFAULT);
  }

  return (
    <>
    {settings.magnifierMode && <TextMagnifierOverlay />}
    {settings.lowVisionMode && <LowVisionOverlay />}
    {settings.elderlyMode && <ElderlyOverlay />}
    {settings.tdahMode && <TDAHOverlay />}
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ferramentas de acessibilidade"
          className="w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-3">
            <h2 className="text-sm font-semibold">Acessibilidade</h2>
            <button
              type="button"
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
              aria-label="Fechar painel de acessibilidade"
              className="rounded p-0.5 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-5">
            {/* Font size */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Tamanho do texto
              </p>
              <div className="flex gap-2">
                {([0, 1, 2] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => update("fontSize", level)}
                    aria-pressed={settings.fontSize === level}
                    aria-label={`Fonte ${FONT_LABELS[level]}`}
                    className={`flex-1 py-1.5 rounded-md border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 ${
                      settings.fontSize === level
                        ? "bg-blue-700 border-blue-700 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{ fontSize: `${0.75 + level * 0.1}rem` }}
                  >
                    A
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                {FONT_LABELS[settings.fontSize]}
              </p>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Opções visuais
              </p>
              <Toggle
                label="Alto contraste"
                checked={settings.highContrast}
                onChange={(v) => update("highContrast", v)}
              />
              <Toggle
                label="Fonte para dislexia"
                checked={settings.dyslexiaFont}
                onChange={(v) => update("dyslexiaFont", v)}
              />
              <Toggle
                label="Espaçamento aumentado"
                checked={settings.increasedSpacing}
                onChange={(v) => update("increasedSpacing", v)}
              />
              <Toggle
                label="Escala de cinza"
                checked={settings.grayscale}
                onChange={(v) => update("grayscale", v)}
              />
              <Toggle
                label="Amigável a TDAH (faixa de foco)"
                checked={settings.tdahMode}
                onChange={(v) => update("tdahMode", v)}
              />
              <Toggle
                label="Guia de leitura"
                checked={settings.elderlyMode}
                onChange={(v) => update("elderlyMode", v)}
              />
              <Toggle
                label="Baixa visão (cursor ampliado)"
                checked={settings.lowVisionMode}
                onChange={(v) => update("lowVisionMode", v)}
              />
              <Toggle
                label="Lupa de texto"
                checked={settings.magnifierMode}
                onChange={(v) => update("magnifierMode", v)}
              />
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={reset}
              className="w-full text-xs text-gray-500 border border-gray-200 rounded-md py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Redefinir padrões
            </button>
          </div>
        </div>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Abrir ferramentas de acessibilidade"
        className="w-14 h-14 bg-white text-blue-700 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.35)] border-4 border-blue-700 flex items-center justify-center hover:bg-blue-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-all"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
          <circle cx="12" cy="4" r="2" />
          <line x1="12" y1="6" x2="12" y2="15" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="12" y1="15" x2="7" y2="22" />
          <line x1="12" y1="15" x2="17" y2="22" />
        </svg>
      </button>
    </div>
    </>
  );
}
