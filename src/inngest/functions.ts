import { gemini, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "codeAgent",
      system:
        "You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js and React snippets, no need to give a lot of description just do the task as soon as posible and provide the code.",
      model: gemini({ model: "gemini-2.5-pro" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    console.log(output);

    return { output };
  }
);
