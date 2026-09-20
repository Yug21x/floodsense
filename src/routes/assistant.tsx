import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, MessageCircle, RotateCcw, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";
import { ASSISTANT_QA } from "@/lib/floodsense-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "FloodSense AI Assistant — Flood Safety Answers" },
      {
        name: "description",
        content:
          "Ask the FloodSense assistant what to do during a flood warning, what to pack, and how to prepare your family.",
      },
      { property: "og:title", content: "FloodSense AI Assistant" },
      {
        property: "og:description",
        content: "Guided flood safety answers built from standard preparedness guidance.",
      },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "bot"; text: string; bullets?: string[] };

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi, I'm the FloodSense assistant. Pick a question below and I'll share safety guidance. I don't issue live emergency alerts — always follow official instructions in a real emergency.",
    },
  ]);

  const ask = (id: string) => {
    const qa = ASSISTANT_QA.find((x) => x.id === id);
    if (!qa) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: qa.q },
      { role: "bot", text: `Here's what preparedness guidance recommends:`, bullets: qa.a },
    ]);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <MessageCircle className="h-7 w-7 text-primary" /> FloodSense Assistant
        </h1>
        <p className="text-sm text-muted-foreground">
          Guided flood safety answers based on standard preparedness advice.
        </p>
      </header>

      <SimulatedNotice text="This assistant answers from a fixed set of preparedness guidance. It does not issue live emergency alerts or read real-time conditions." />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="surface-card flex h-[520px] flex-col lg:col-span-2">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                {m.role === "bot" && (
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Bot className="h-4 w-4" />
                  </span>
                )}
                <div
                  className={
                    m.role === "user"
                      ? "flex max-w-[80%] items-center gap-2 rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-surface px-4 py-3 text-sm"
                  }
                >
                  {m.role === "user" && <User className="h-3.5 w-3.5" />}
                  <div>
                    <p>{m.text}</p>
                    {m.bullets && (
                      <ul className="mt-2 space-y-1.5">
                        {m.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setMessages([
                  {
                    role: "bot",
                    text: "Conversation cleared. Pick a question to start again.",
                  },
                ])
              }
            >
              <RotateCcw className="mr-2 h-3.5 w-3.5" /> Clear conversation
            </Button>
          </div>
        </section>

        <aside className="surface-card space-y-3 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Suggested questions
          </h2>
          {ASSISTANT_QA.map((qa) => (
            <button
              key={qa.id}
              onClick={() => ask(qa.id)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-3 text-left text-sm transition-colors hover:border-primary/60 hover:bg-surface-2"
            >
              {qa.q}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}
