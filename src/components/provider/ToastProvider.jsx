"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1c1917",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
          fontWeight: "600",
        },
        success: {
          iconTheme: {
            primary: "#f97316",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}