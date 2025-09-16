"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // кэшируй и считай «свежими» 10 минут
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
      // не рефетчить самопроизвольно
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      // мягко ограничим ретраи: 429 — без ретраев
      retry: (failureCount, error: any) => {
        const msg = String(error?.message ?? "");
        if (msg.includes("429")) return false;
        return failureCount < 1; // максимум 1 попытка
      },
      retryDelay: (attempt) => Math.min(30000, 2 ** attempt * 1000),
    },
  },
});

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
