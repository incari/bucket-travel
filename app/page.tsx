"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Container } from "../components/Container";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <div className="text-center">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <Container />
      </QueryClientProvider>
    </div>
  );
}
