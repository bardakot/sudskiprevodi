import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import i18n from "./i18n/config";
import "./index.css";

export async function render(url: string, language: "mk" | "en" | "sr") {
  await i18n.changeLanguage(language);

  return renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}
