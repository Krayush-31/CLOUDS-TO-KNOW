import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export function useTranslations(language) {
  const [t, setT] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${API_BASE}/api/translations?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setT(data);
      })
      .catch(() => {
        if (!cancelled) setT({});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  return { t, loading };
}
