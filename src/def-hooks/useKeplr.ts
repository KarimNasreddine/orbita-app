"use client";

import { useMemo } from "react";

export default function useKeplr() {
  const isKeplrAvailable = useMemo(
    () => (typeof window !== "undefined" ? !!window.keplr : false),
    []
  );

  return {
    isKeplrAvailable,
  };
}
