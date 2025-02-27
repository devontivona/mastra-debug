import { openai } from "@ai-sdk/openai";
import { Memory } from "@mastra/memory";
import { PostgresStore, PgVector } from "@mastra/pg";

type MemoryOptions = NonNullable<
  ConstructorParameters<typeof Memory>[0]
>["options"];

const storage = new PostgresStore({
  connectionString: process.env.DATABASE_URL!,
});

const vector = new PgVector(process.env.DATABASE_URL!);

export const createMemory = (options?: MemoryOptions) => {
  return new Memory({
    embedder: openai.embedding("text-embedding-3-small"),
    storage,
    vector,
    options,
  });
};
