"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useCloseOnEsc = () => {
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      router.push("/");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
