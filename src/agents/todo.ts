import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { createMemory } from "../utilities";

export const todoAgent = new Agent({
  name: "TODO Manager",
  instructions:
    "You are a TODO list manager. Update the todo list in working memory whenever tasks are added, completed, or modified.",
  model: openai("gpt-4o-mini"),
  memory: createMemory({
    workingMemory: {
      enabled: true,
      template: `
          <todos>
            <in-progress></in-progress>
            <pending></pending>
            <completed></completed>
          </todos>
        `,
    },
  }),
});
