import { useState, useEffect, useCallback } from "react";

export function useLeetCode(username: string, submissionLimit = 10) {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/leetcode?username=${username}&limit=${submissionLimit}`);
      if (!res.ok) throw new Error("Failed to fetch LeetCode data");
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setLastFetched(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, submissionLimit]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...data, loading, error, lastFetched, refetch };
}
