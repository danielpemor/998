// src/components/security/TurnstileWidget.tsx
import { useEffect, useRef } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

export default function TurnstileWidget({ onVerify, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.turnstile || !containerRef.current) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
      callback: onVerify,
      'error-callback': onError,
      theme: 'light',
    });

    return () => {
      window.turnstile.remove(widgetId);
    };
  }, [onVerify, onError]);

  return (
    <>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      <div ref={containerRef} className="cf-turnstile"></div>
    </>
  );
}