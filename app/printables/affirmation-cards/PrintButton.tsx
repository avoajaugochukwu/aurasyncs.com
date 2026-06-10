'use client';

export function PrintButton() {
  return (
    <button type="button" className="page-btn" onClick={() => window.print()}>
      Print / Save as PDF
    </button>
  );
}
