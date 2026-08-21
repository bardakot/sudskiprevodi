import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import i18n from "./i18n/config.ts";
import "./index.css";

async function bootstrap() {
  const language = window.location.pathname.startsWith("/en/")
    ? "en"
    : window.location.pathname.startsWith("/sr/")
      ? "sr"
      : "mk";

  await i18n.changeLanguage(language);

  const root = document.getElementById("root")!;
  if (root.hasChildNodes()) {
    hydrateRoot(root, <App />);
  } else {
    createRoot(root).render(<App />);
  }
}

void bootstrap();
