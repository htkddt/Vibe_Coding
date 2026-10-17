import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUrlTab(valid, fallback) {
  const [params, setParams] = useSearchParams();
  const raw = params.get('tab');
  const tab = valid.includes(raw) ? raw : fallback;
  useEffect(() => {
    if (raw !== tab) { const next = new URLSearchParams(params); next.set('tab', tab); setParams(next, { replace: true }); }
  }, [raw, tab, params, setParams]);
  function setTab(value) { const next = new URLSearchParams(params); next.set('tab', value); setParams(next); }
  return [tab, setTab];
}
