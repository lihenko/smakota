
"use client";

import React from "react";
import { useEffect } from "react";

export default function ChatbotEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.async = true;
    script.src =
      "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("zapier-interfaces-chatbot-embed", {
    "is-popup": "true",
    "chatbot-id": "cmiepslfi004812ap7dqh5jdr",
  });
}
