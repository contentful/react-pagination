import React from "react";
import { createRoot } from "react-dom/client"; // Updated import for React 18
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Get the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root for React 18

// Render the application
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
