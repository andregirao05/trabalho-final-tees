"use client";

import { useRef, useState } from "react";

const inputClass =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700";

const toolbarBtnClass =
  "px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 text-gray-700 disabled:opacity-40";

// ---- toolbar actions ----

type InlineAction = {
  kind: "inline";
  label: string;
  title: string;
  prefix: string;
  suffix: string;
  placeholder: string;
  className?: string;
};

type BlockAction = {
  kind: "block";
  label: string;
  title: string;
  linePrefix: string;
  placeholder: string;
};

type InsertAction = {
  kind: "insert";
  label: string;
  title: string;
  text: string;
};

type ToolbarAction = InlineAction | BlockAction | InsertAction;

const TOOLBAR: ToolbarAction[] = [
  { kind: "inline", label: "B",  title: "Negrito",         prefix: "**", suffix: "**", placeholder: "texto em negrito",  className: "font-bold" },
  { kind: "inline", label: "I",  title: "Itálico",         prefix: "*",  suffix: "*",  placeholder: "texto em itálico",   className: "italic" },
  { kind: "inline", label: "S",  title: "Tachado",         prefix: "~~", suffix: "~~", placeholder: "texto tachado",      className: "line-through" },
  { kind: "inline", label: "`",  title: "Código inline",   prefix: "`",  suffix: "`",  placeholder: "código" },
  { kind: "block",  label: "H2", title: "Título (H2)",     linePrefix: "## ",  placeholder: "Título" },
  { kind: "block",  label: "H3", title: "Subtítulo (H3)",  linePrefix: "### ", placeholder: "Subtítulo" },
  { kind: "block",  label: "❝",  title: "Citação",         linePrefix: "> ",   placeholder: "citação" },
  { kind: "block",  label: "•",  title: "Lista",           linePrefix: "- ",   placeholder: "item" },
  { kind: "block",  label: "1.", title: "Lista numerada",  linePrefix: "1. ",  placeholder: "item" },
  { kind: "insert", label: "—",  title: "Linha horizontal", text: "\n\n---\n\n" },
];

function applyInline(ta: HTMLTextAreaElement, action: InlineAction) {
  const { prefix, suffix, placeholder } = action;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const selected = ta.value.substring(start, end) || placeholder;
  const replacement = prefix + selected + suffix;
  ta.setRangeText(replacement, start, end, "select");
  ta.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
  ta.focus();
}

function applyBlock(ta: HTMLTextAreaElement, action: BlockAction) {
  const { linePrefix, placeholder } = action;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const selected = ta.value.substring(start, end);

  if (selected) {
    const lined = selected.split("\n").map((l) => linePrefix + l).join("\n");
    ta.setRangeText(lined, start, end, "select");
  } else {
    const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = ta.value.indexOf("\n", start);
    const lineText = ta.value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
    if (lineText.trim() === "") {
      const ins = linePrefix + placeholder;
      ta.setRangeText(ins, lineStart, lineEnd === -1 ? ta.value.length : lineEnd, "end");
    } else {
      ta.setRangeText(linePrefix, lineStart, lineStart, "end");
    }
  }
  ta.focus();
}

function applyInsert(ta: HTMLTextAreaElement, action: InsertAction) {
  const pos = ta.selectionEnd;
  ta.setRangeText(action.text, pos, pos, "end");
  ta.focus();
}

// ---- form types ----

interface ImageForm { url: string; alt: string; caption: string; }
interface LinkForm  { url: string; text: string; }

const emptyImage: ImageForm = { url: "", alt: "", caption: "" };
const emptyLink: LinkForm   = { url: "", text: "" };

type ActiveForm = "none" | "image" | "link";

// ---- component ----

export function ArticleContentEditor({
  defaultValue,
  name = "content",
  label = "Conteúdo do artigo",
}: {
  defaultValue?: string;
  name?: string;
  label?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeForm, setActiveForm] = useState<ActiveForm>("none");
  const [image, setImage] = useState<ImageForm>(emptyImage);
  const [link, setLink]   = useState<LinkForm>(emptyLink);

  function handleToolbar(action: ToolbarAction) {
    const ta = textareaRef.current;
    if (!ta) return;
    if (action.kind === "inline") applyInline(ta, action);
    else if (action.kind === "block") applyBlock(ta, action);
    else applyInsert(ta, action);
  }

  function openImageForm() {
    setActiveForm((f) => (f === "image" ? "none" : "image"));
  }

  function openLinkForm() {
    const ta = textareaRef.current;
    const selected = ta ? ta.value.substring(ta.selectionStart, ta.selectionEnd) : "";
    setLink({ url: "", text: selected });
    setActiveForm((f) => (f === "link" ? "none" : "link"));
  }

  // ---- insert image ----

  function handleInsertImage() {
    const ta = textareaRef.current;
    if (!ta) return;
    const markdown = `![${image.alt}](${image.url} "${image.caption}")`;
    const start = ta.selectionStart;
    const before = ta.value.substring(0, start);
    const after  = ta.value.substring(ta.selectionEnd);
    const prefix = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
    const suffix = after  === "" || after.startsWith("\n")  ? "" : "\n\n";
    ta.value = before + prefix + markdown + suffix + after;
    const cursor = (before + prefix + markdown).length;
    ta.setSelectionRange(cursor, cursor);
    ta.focus();
    setActiveForm("none");
    setImage(emptyImage);
  }

  // ---- insert link ----

  function handleInsertLink() {
    const ta = textareaRef.current;
    if (!ta) return;
    const markdown = `[${link.text}](${link.url})`;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    ta.setRangeText(markdown, start, end, "end");
    ta.focus();
    setActiveForm("none");
    setLink(emptyLink);
  }

  const canInsertImage =
    image.url.trim() !== "" && image.alt.trim() !== "" && image.caption.trim() !== "";

  const canInsertLink =
    link.url.trim() !== "" && link.text.trim() !== "";

  return (
    <div>
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
        {label}{" "}
        <span className="text-gray-400 font-normal">(Markdown)</span>
      </label>

      {/* Toolbar */}
      <div
        role="toolbar"
        aria-label="Formatação do conteúdo"
        className="flex flex-wrap items-center gap-1 border border-gray-300 border-b-0 rounded-t-md bg-gray-50 px-2 py-1.5"
      >
        {TOOLBAR.map((action) => (
          <button
            key={action.title}
            type="button"
            title={action.title}
            aria-label={action.title}
            onClick={() => handleToolbar(action)}
            className={`${toolbarBtnClass} ${"className" in action && action.className ? action.className : ""}`}
          >
            {action.label}
          </button>
        ))}

        <span aria-hidden="true" className="text-gray-300 mx-1">|</span>

        <button
          type="button"
          title="Inserir link"
          aria-label="Inserir link"
          aria-expanded={activeForm === "link"}
          onClick={openLinkForm}
          className={`${toolbarBtnClass} flex items-center gap-1`}
        >
          <span aria-hidden="true">🔗</span> Link
        </button>

        <button
          type="button"
          title="Inserir imagem"
          aria-label="Inserir imagem"
          aria-expanded={activeForm === "image"}
          onClick={openImageForm}
          className={`${toolbarBtnClass} flex items-center gap-1`}
        >
          <span aria-hidden="true">🖼️</span> Imagem
        </button>
      </div>

      {/* Link form */}
      {activeForm === "link" && (
        <div
          role="group"
          aria-label="Formulário de inserção de link"
          className="border border-gray-300 border-b-0 bg-blue-50 px-4 py-3 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="lnk-text" className="block text-xs font-medium text-gray-700 mb-1">
                Texto do link <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="lnk-text"
                type="text"
                value={link.text}
                onChange={(e) => setLink((f) => ({ ...f, text: e.target.value }))}
                placeholder="Ex: Saiba mais sobre fotossíntese"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Use um texto descritivo — evite "clique aqui" ou "saiba mais" sem contexto.
              </p>
            </div>
            <div>
              <label htmlFor="lnk-url" className="block text-xs font-medium text-gray-700 mb-1">
                URL <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="lnk-url"
                type="url"
                value={link.url}
                onChange={(e) => setLink((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleInsertLink}
              disabled={!canInsertLink}
              className="text-sm bg-blue-700 text-white px-4 py-1.5 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Inserir
            </button>
            <button
              type="button"
              onClick={() => { setActiveForm("none"); setLink(emptyLink); }}
              className="text-sm border border-gray-300 text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Image form */}
      {activeForm === "image" && (
        <div
          role="group"
          aria-label="Formulário de inserção de imagem"
          className="border border-gray-300 border-b-0 bg-blue-50 px-4 py-3 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="img-url" className="block text-xs font-medium text-gray-700 mb-1">
                URL da imagem <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="img-url"
                type="url"
                value={image.url}
                onChange={(e) => setImage((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="img-alt" className="block text-xs font-medium text-gray-700 mb-1">
                Texto alternativo <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="img-alt"
                type="text"
                value={image.alt}
                onChange={(e) => setImage((f) => ({ ...f, alt: e.target.value }))}
                placeholder="Descrição para leitores de tela"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="img-caption" className="block text-xs font-medium text-gray-700 mb-1">
                Legenda <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="img-caption"
                type="text"
                value={image.caption}
                onChange={(e) => setImage((f) => ({ ...f, caption: e.target.value }))}
                placeholder="Texto exibido abaixo da imagem"
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleInsertImage}
              disabled={!canInsertImage}
              className="text-sm bg-blue-700 text-white px-4 py-1.5 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Inserir
            </button>
            <button
              type="button"
              onClick={() => { setActiveForm("none"); setImage(emptyImage); }}
              className="text-sm border border-gray-300 text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        id="content"
        name={name}
        rows={16}
        defaultValue={defaultValue}
        placeholder={"## Introdução\n\nEscreva o conteúdo aqui..."}
        className="w-full border border-gray-300 rounded-b-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-700 resize-y"
      />
    </div>
  );
}
