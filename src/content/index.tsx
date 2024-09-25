// main.js
import App from "./App";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TranscriptContextProvider from "./components/context/TranscriptProvider";
import ThemeProvider from "./components/context/ThemeProvider";

const queryClient = new QueryClient();

const init = () => {
  const YoutubeTranscriptAppRoot = document.createElement("div");
  YoutubeTranscriptAppRoot.id = "script-root";
  YoutubeTranscriptAppRoot.classList.add("script-root");
  document.body.appendChild(YoutubeTranscriptAppRoot);

  createRoot(YoutubeTranscriptAppRoot).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TranscriptContextProvider>
          <App />
        </TranscriptContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

!import.meta.env.DEV ? init() : null;

export default init;
