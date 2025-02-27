import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";
import { weatherAgent } from "./agents/weather";
import { todoAgent } from "./agents/todo";
import { LangfuseExporter } from "langfuse-vercel";

export const mastra = new Mastra({
  agents: { weatherAgent, todoAgent },
  logger: createLogger({
    name: "Mastra",
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  }),
  telemetry: {
    serviceName: "ai",
    enabled: true,
    export: {
      type: "custom",
      exporter: new LangfuseExporter({
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        baseUrl: process.env.LANGFUSE_BASEURL,
      }),
    },
  },
});

export { createMemory } from "./utilities";
