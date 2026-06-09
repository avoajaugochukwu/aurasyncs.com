"use client";

import { useCallback, useState } from "react";

/** Shared copy-to-clipboard state: tracks which key was last copied. */
export function useCopied(): [string | null, (text: string, key: string) => void] {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback((text: string, key: string) => {
    const payload = text;
    const done = () => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(payload).then(done).catch(done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = payload;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
      done();
    }
  }, []);

  return [copiedKey, copy];
}

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="5" y="5" width="8" height="9" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3.5 10.5h-.2A1.3 1.3 0 0 1 2 9.2V3.3A1.3 1.3 0 0 1 3.3 2h5.9A1.3 1.3 0 0 1 10.5 3.3v.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export function CopyButton({
  onClick,
  copied,
  label = "Copy",
}: {
  onClick: () => void;
  copied: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      className={"copy-btn" + (copied ? " is-copied" : "")}
      onClick={onClick}
      aria-label="Copy affirmation"
    >
      <span className="copy-ico">{copied ? <CheckIcon /> : <CopyIcon />}</span>
      <span className="copy-txt">{copied ? "Copied" : label}</span>
    </button>
  );
}

export { CheckIcon, CopyIcon };
