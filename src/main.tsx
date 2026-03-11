// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import store from "./Redux/store";
import { getTotals } from "./Redux/CartSlice";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create React Query client
const queryClient = new QueryClient();
// 🔧 React Query client instance
// 📌 Handles caching, background refetching, and request lifecycle

store.dispatch(getTotals());
// 🔧 Dispatch Redux action on startup
// 📌 Ensures cart totals are calculated when the app loads

const rootElement = document.getElementById("root") as HTMLElement;
// 🔧 Added type assertion
// 📌 TypeScript thinks getElementById can return `HTMLElement | null`
// 📌 ReactDOM requires a non-null HTMLElement

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Redux Provider */}
      <QueryClientProvider client={queryClient}>
        {/* 🔧 Added React Query Provider
            📌 Makes React Query available across the entire app */}

        <App />

        <ReactQueryDevtools initialIsOpen={false} />
        {/* 🔧 React Query Devtools
            📌 Allows debugging queries, cache, and refetch behavior */}
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
