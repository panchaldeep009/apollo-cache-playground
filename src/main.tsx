import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <main className="bg-slate-800 h-[100dvh] w-full text-slate-100 flex items-center justify-center">
        <App />
      </main>
    </ApolloProvider>
  </React.StrictMode>
);
