"use client";

interface DeleteFormProps {
  id: string;
  label: string;
  action: (formData: FormData) => Promise<void>;
}

export function DeleteForm({ id, label, action }: DeleteFormProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Excluir "${label}"? Esta ação não pode ser desfeita.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 rounded-sm"
        aria-label={`Excluir: ${label}`}
      >
        Excluir
      </button>
    </form>
  );
}
