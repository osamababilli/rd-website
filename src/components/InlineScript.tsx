'use client';

/**
 * Runs `code` once from the server HTML before first paint. On the client the tag is inert
 * (text/plain), which avoids React's dev warning about rendering <script> elements.
 */
export function InlineScript({ code }: { code: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
