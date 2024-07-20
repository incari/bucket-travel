// test-utils.tsx
import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

const queryClient = new QueryClient();

const WrapperProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouterProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouterProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: WrapperProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
