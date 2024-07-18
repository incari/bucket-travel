"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Container } from "../components/Container";

/* export const metadata = {
  title: "Bucket Travel",
  description: "Your place to plan your next adventure",
}; */

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
