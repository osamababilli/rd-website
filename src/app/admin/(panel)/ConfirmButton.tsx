'use client';

import type { ReactNode } from 'react';

/** Submit button that asks for confirmation before a destructive action. */
export function ConfirmButton({ message, children }: { message: string; children: ReactNode }) {
  return (
    <button
      type="submit"
      className="adm-delete"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
