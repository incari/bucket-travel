"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Container } from "../components/Container";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <div className="text-center">
      <QueryClientProvider client={queryClient}>
        <Container />
      </QueryClientProvider>
    </div>
  );
}
