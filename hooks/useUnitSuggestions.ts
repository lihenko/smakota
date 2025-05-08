import { useEffect, useState } from 'react';

export type Unit = {
  id: string;
  name: string;
};

export const useUnitSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300 мс затримка

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 1) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/units?query=${debouncedQuery}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setSuggestions(data.units || []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error fetching unit suggestions');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [debouncedQuery]);

  return { suggestions, isLoading };
};
