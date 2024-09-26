"use client";
import { useCallback, useState } from "react";

type Handlers<TData> = Partial<{
  onSuccess: (data: TData) => void;
  onError: () => void;
  onFinish: () => void;
}>;

export type Status = "idle" | "loading" | "success" | "error";

export function useFetch<T>(fn: () => Promise<T>, handlers?: Handlers<T>) {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fn();
      setData(response);
      setStatus("success");
      handlers?.onSuccess?.(response);
    } catch (error) {
      setStatus("error");
      handlers?.onError?.();
    } finally {
      handlers?.onFinish?.();
    }
  }, [fn, handlers]);

  return { fetchData, status, data };
}
